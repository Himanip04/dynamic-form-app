export default function FormField({ field, register, errors }) {
  const { name, label, type, placeholder, options, required } = field;

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {/* TEXT FIELD */}
      {type === "text" && (
        <input
          {...register(name)}
          placeholder={placeholder}
          className="w-full border p-2 rounded"
        />
      )}

      {/* NUMBER FIELD */}
      {type === "number" && (
        <input
          type="number"
          {...register(name)}
          placeholder={placeholder}
          className="w-full border p-2 rounded"
        />
      )}

      {/* SELECT */}
      {type === "select" && (
        <select
          {...register(name)}
          className="w-full border p-2 rounded"
          defaultValue=""
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options?.map((op, idx) => (
            <option key={idx} value={op}>
              {op}
            </option>
          ))}
        </select>
      )}

      {/* MULTI-SELECT */}
      {type === "multi-select" && (
        <select
          {...register(name)}
          multiple
          className="w-full border p-2 rounded h-28"
        >
          {options?.map((op, idx) => (
            <option key={idx} value={op}>
              {op}
            </option>
          ))}
        </select>
      )}

      {/* DATE */}
      {type === "date" && (
        <input
          type="date"
          {...register(name)}
          className="w-full border p-2 rounded"
        />
      )}

      {/* TEXTAREA */}
      {type === "textarea" && (
        <textarea
          {...register(name)}
          placeholder={placeholder}
          rows={4}
          className="w-full border p-2 rounded"
        ></textarea>
      )}

      {/* SWITCH */}
      {type === "switch" && (
        <input type="checkbox" {...register(name)} className="h-5 w-5" />
      )}

      {/* ERROR MESSAGE */}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
