import { validateField } from "./validateField";

export function validateForm(formData, schema) {
  const errorObj = {};

  schema.fields.forEach((field) => {
    const value = formData[field.name];
    const fieldErrors = validateField(value, field);

    if (fieldErrors.length > 0) {
      errorObj[field.name] = fieldErrors[0]; // only first error
    }
  });

  return errorObj;
}
