"use client";

import { DEFAULT_LANG } from "@/config";
import { useEffect, useMemo, useState } from "react";
import { getCf7FormSchema, submitCf7Direct, submitCf7FormProxy } from "@/lib/wp";

function Field({ field, value, setValue, error }) {
  const common =
    "w-full rounded-md border px-4 py-3 text-sm outline-none " +
    (error ? "border-red-500" : "border-black/15 focus:border-black/30");

  const label = field.label || field.key;

  if (field.type === "textarea") {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">
          {label} {field.required ? "*" : ""}
        </label>
        <textarea
          className={common + " min-h-[140px]"}
          value={value || ""}
          placeholder={field.placeholder || ""}
          onChange={(e) => setValue(field.key, e.target.value)}
        />
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">
          {label} {field.required ? "*" : ""}
        </label>
        <select
          className={common}
          value={value || ""}
          onChange={(e) => setValue(field.key, e.target.value)}
        >
          <option value="">{field.placeholder || "Select"}</option>
          {(field.options || []).map((opt, idx) => (
            <option key={idx} value={opt.label}>
              {opt.label}
            </option>
          ))}
        </select>
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
      </div>
    );
  }

  // default input: text/email/tel/url
  const type = ["email", "tel", "url"].includes(field.type) ? field.type : "text";

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label} {field.required ? "*" : ""}
      </label>
      <input
        className={common}
        type={type}
        value={value || ""}
        placeholder={field.placeholder || ""}
        onChange={(e) => setValue(field.key, e.target.value)}
      />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

export default function ContactForm({ formId = 982, lang = DEFAULT_LANG }) {
  const [schema, setSchema] = useState(null);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ loading: true, submitting: false, ok: false, msg: "" });

  const fields = useMemo(() => schema?.fields || [], [schema]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setState({ loading: true, submitting: false, ok: false, msg: "" });
        const data = await getCf7FormSchema(formId, lang);
        if (!alive) return;

        setSchema(data);

        const initial = {};
        (data.fields || []).forEach((f) => (initial[f.key] = ""));
        setValues(initial);

        setState({ loading: false, submitting: false, ok: false, msg: "" });
      } catch (e) {
        setState({ loading: false, submitting: false, ok: false, msg: "Failed to load form." });
      }
    })();

    return () => {
      alive = false;
    };
  }, [formId, lang]);

  function setValue(key, val) {
    setValues((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: "" }));
  }

  function validate() {
    const next = {};
    for (const f of fields) {
      if (!f.required) continue;
      const v = (values[f.key] || "").toString().trim();
      if (!v) next[f.key] = "This field is required";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setState((s) => ({ ...s, submitting: true, ok: false, msg: "" }));

    if (!validate()) {
      setState((s) => ({ ...s, submitting: false, ok: false, msg: "Please fill required fields." }));
      return;
    }

    // Transform payload to match backend expectations
    const transformedValues = Object.keys(values).reduce((acc, key) => {
      acc[key] = values[key]?.toString().trim();
      return acc;
    }, {});

    try {
      let res;
      try {
        // Primary: direct CF7 submit
        res = await submitCf7Direct(formId, schema?.hidden || {}, transformedValues);
      } catch (directErr) {
        const directStatus = directErr?.cf7?.status;
        const directMessage = (directErr?.message || "").toLowerCase();
        const isNetworkError =
          directErr?.name === "TypeError" ||
          directMessage.includes("failed to fetch") ||
          directMessage.includes("networkerror");

        if (directStatus || !isNetworkError) {
          throw directErr;
        }

        // Fallback: proxy submit (only if direct failed due to network/CORS)
        res = await submitCf7FormProxy(formId, {
          lang,
          values: transformedValues,
        });
      }

      const okMessage =
        res?.message ||
        res?.cf7?.message ||
        schema?.settings?.successMessage ||
        "Sent!";

      setState({
        loading: false,
        submitting: false,
        ok: true,
        msg: okMessage,
      });

      // Reset form values
      const reset = {};
      fields.forEach((f) => (reset[f.key] = ""));
      setValues(reset);
    } catch (err) {
      // If CF7 validation errors come back, map them
      const cf7 = err?.cf7;
      if (cf7?.status === "validation_failed" && Array.isArray(cf7?.invalid_fields)) {
        const next = {};
        cf7.invalid_fields.forEach((f) => {
          if (f?.field) next[f.field] = f?.message || "Invalid";
        });
        setErrors(next);
      }

      setState({
        loading: false,
        submitting: false,
        ok: false,
        msg: err?.message || err?.error || "Failed to send. Please try again.",
      });
    }
  }

  if (state.loading) return <div>Loading form…</div>;

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {fields.map((f) => (
        <Field key={f.key} field={f} value={values[f.key]} setValue={setValue} error={errors[f.key]} />
      ))}

      <button
        type="submit"
        disabled={state.submitting}
        className="mt-2 inline-flex w-[300px] items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-white disabled:opacity-60"
      >
        {state.submitting ? "Sending…" : "Send Message"}
      </button>

      {state.msg ? (
        <p className={`text-sm ${state.ok ? "text-green-700" : "text-red-700"}`}>{state.msg}</p>
      ) : null}
    </form>
  );
}
