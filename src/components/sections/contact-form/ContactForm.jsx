import { useState, useEffect } from 'react';
import { WP_BASE } from "@/config";

export default function DynamicContactForm({ formId = "965" }) {
  const [formConfig, setFormConfig] = useState(null);
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Fetch form configuration dynamically from the backend
    const fetchFormConfig = async () => {
      try {
        const response = await fetch(`${WP_BASE}/custom-api/v1/form-config/${formId}`);
        const data = await response.json();
        console.log("Fetched form configuration:", data);
        setFormConfig(data);

        // Initialize form data with empty values based on fields
        const initialData = {};
        Object.keys(data.fields).forEach((fieldKey) => {
          initialData[fieldKey] = "";
        });
        setFormData(initialData);
      } catch (error) {
        console.error("Error fetching form configuration:", error);
      }
    };

    fetchFormConfig();
  }, [formId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", formData);
      const response = await fetch(`${WP_BASE}/custom-api/v1/submit-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Form submission response:", result);
      if (response.ok) {
        setStatus("Message sent successfully");
      } else {
        setStatus(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error occurred while sending message:", error);
      setStatus("Error occurred while sending message");
    }
  };

  if (!formConfig) {
    return <p>Loading form...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="dynamic-form max-w-2xl">
      {Object.keys(formConfig.fields).map((fieldKey) => (
        <div key={fieldKey} className="form-group">
          <label>{formConfig.fields[fieldKey].label}</label>
          {formConfig.fields[fieldKey].type === "textarea" ? (
            <textarea
              className='mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              name={fieldKey}
              value={formData[fieldKey]}
              onChange={handleChange}
              required={formConfig.fields[fieldKey].required}
            ></textarea>
          ) : (
            <input
              className='mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              type={formConfig.fields[fieldKey].type || "text"}
              name={fieldKey}
              value={formData[fieldKey]}
              onChange={handleChange}
              required={formConfig.fields[fieldKey].required}
            />
          )}
        </div>
      ))}
      <button type="submit" className='cursor-pointer mt-5 w-[300px] bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>Send Message</button>
      {status && <p>{status}</p>}
    </form>
  );
}