import React from "react";
import ValidationMessage from "./ValidationMessage";

export default function FieldRenderer({ field, value, onChange, error }) {
  const { name, label, type, placeholder, options } = field;

  const commonClass = "w-full border rounded p-2 text-sm";

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">
        {label} {field.required && <span className="text-red-500">*</span>}
      </label>

      {type === "text" && (
        <input
          type="text"
          className={commonClass}
          placeholder={placeholder || ""}
          value={value ?? ""}
          onChange={(e) => onChange(name, e.target.value)}
        />
      )}


      {type === "number" && (
        <input
          type="number"
          className={commonClass}
          placeholder={placeholder || ""}
          value={value ?? ""}
          onChange={(e) => onChange(name, e.target.value === "" ? "" : Number(e.target.value))}
        />
      )}


      {type === "select" && (
        <select
          className={commonClass}
          value={value ?? ""}
          onChange={(e) => onChange(name, e.target.value)}
        >
          <option value="">{placeholder || "Select"}</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}


    {field.type === "multi-select" && (
  <div className="flex flex-wrap gap-4">
    {field.options?.map((opt, idx) => (
      <label key={`${field.name}-${idx}`} className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={value?.includes(opt) || false}
          onChange={(e) => {
            const newSelected = value ? [...value] : [];
            if (e.target.checked) {
              newSelected.push(opt);
            } else {
              const index = newSelected.indexOf(opt);
              if (index > -1) newSelected.splice(index, 1);
            }
            onChange(field.name, newSelected);
          }}
        />
        {opt}
      </label>
    ))}
   
  </div>
)}

      {type === "textarea" && (
        <textarea
          className={commonClass}
          placeholder={placeholder || ""}
          rows={4}
          value={value ?? ""}
          onChange={(e) => onChange(name, e.target.value)}
        />
      )}


      {type === "date" && (
        <input
          type="date"
          className={commonClass}
          value={value ?? ""}
          onChange={(e) => onChange(name, e.target.value)}
        />
      )}

      {type === "switch" && (
        <div className="flex items-center gap-2">
          <input
            id={name}
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(name, e.target.checked)}
          />
          <label htmlFor={name} className="text-sm">{placeholder || ""}</label>
        </div>
      )}

      <ValidationMessage>{error}</ValidationMessage>
    </div>
  );
}
