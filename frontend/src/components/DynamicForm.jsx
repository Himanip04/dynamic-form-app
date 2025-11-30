
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSchema, submitForm } from "../services/formService";
import FieldRenderer from "./FieldRenderer";
import { useNavigate } from "react-router-dom";

function validateBySchema(schema, values) {
  const errors = {};
  (schema.fields || []).forEach((f) => {
    const v = values[f.name];
    const label = f.label || f.name;

    if (f.required) {
      if (
        v === undefined ||
        v === null ||
        v === "" ||
        (Array.isArray(v) && v.length === 0)
      ) {
        errors[f.name] = `${label} is required`;
        return;
      }
    }

    const rules = f.validations || {};

    if (f.type === "text" || f.type === "textarea") {
      if (v && v.length > 0) {
        if (rules.minLength && v.length < rules.minLength)
          errors[f.name] = `${label} must be at least ${rules.minLength} characters`;

        if (rules.maxLength && v.length > rules.maxLength)
          errors[f.name] = `${label} must be at most ${rules.maxLength} characters`;

        if (rules.regex) {
          try {
            const re = new RegExp(rules.regex);
            if (!re.test(v)) errors[f.name] = `${label} format is invalid`;
          } catch {}
        }
      }
    }

    if (f.type === "number") {
      if (v !== undefined && v !== "" && v !== null) {
        const num = Number(v);
        if (isNaN(num)) {
          errors[f.name] = `${label} must be a number`;
        } else {
          if (rules.min !== undefined && num < rules.min)
            errors[f.name] = `${label} must be at least ${rules.min}`;

          if (rules.max !== undefined && num > rules.max)
            errors[f.name] = `${label} must be at most ${rules.max}`;
        }
      }
    }

    if (f.type === "multi-select" || f.type === "multiSelect") {
      const arr = Array.isArray(v) ? v : [];
      if (rules.minSelected && arr.length < rules.minSelected)
        errors[f.name] = `Select at least ${rules.minSelected} options`;
      if (rules.maxSelected && arr.length > rules.maxSelected)
        errors[f.name] = `Select up to ${rules.maxSelected} options`;
    }

    if (f.type === "date" && rules.minDate && v) {
      if (String(v) < rules.minDate)
        errors[f.name] = `${label} must be on/after ${rules.minDate}`;
    }
  });
  return errors;
}

export default function DynamicForm() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { data: schema, isLoading } = useQuery({
    queryKey: ["form-schema"],
    queryFn: fetchSchema,
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: (payload) => submitForm(payload),
    onSuccess: () => {
      qc.invalidateQueries(["submissions"]);
      setTimeout(() => navigate("/submissions"), 800);
    },
  });

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  React.useEffect(() => {
    if (!schema) return;

    const initial = {};
    (schema.fields || []).forEach((f) => {
      if (f.type === "multi-select" || f.type === "multiSelect")
        initial[f.name] = [];
      else if (f.type === "switch")
        initial[f.name] = false;
      else initial[f.name] = "";
    });

    setValues(initial);
    setErrors({});
  }, [schema]);

  if (isLoading) return <p className="p-4">Loading form…</p>;
  if (!schema) return <p className="p-4 text-red-500">Form schema not available</p>;

  const onChange = (name, value) => {
    setValues((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vErrors = validateBySchema(schema, values);
    if (Object.keys(vErrors).length > 0) {
      setErrors(vErrors);
      return;
    }

    setSubmitStatus("loading");
    try {
      await mutation.mutateAsync(values);
      setSubmitStatus("success");
    } catch (err) {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{schema.title}</h1>
      <p className="mb-4 text-gray-600">{schema.description}</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
      >
        {schema.fields.map((field) => (
          <FieldRenderer
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={onChange}
            error={errors[field.name]} // ⭐ Error passed to component
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          disabled={submitStatus === "loading"}
        >
          {submitStatus === "loading" ? "Submitting…" : "Submit"}
        </button>

        {submitStatus === "success" && (
          <p className="text-green-600 text-sm mt-2">
            Form submitted successfully — redirecting…
          </p>
        )}
        {submitStatus === "error" && (
          <p className="text-red-600 text-sm mt-2">Failed to submit. Try again.</p>
        )}
      </form>
    </div>
  );
}
