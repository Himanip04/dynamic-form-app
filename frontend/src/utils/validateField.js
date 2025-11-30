export function validateField(value, field) {
  const errors = [];

  if (field.required) {
    const empty =
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0);

    if (empty) {
      errors.push(`${field.label} is required`);
      return errors;
    }
  }

  if (field.minLength && value.length < field.minLength) {
    errors.push(`${field.label} must be at least ${field.minLength} characters`);
  }

  if (field.maxLength && value.length > field.maxLength) {
    errors.push(`${field.label} cannot exceed ${field.maxLength} characters`);
  }


  if (field.regex) {
    const pattern = new RegExp(field.regex);
    if (!pattern.test(value)) {
      errors.push(`${field.label} is invalid`);
    }
  }

  if (field.min !== undefined && Number(value) < field.min) {
    errors.push(`${field.label} must be >= ${field.min}`);
  }

  if (field.max !== undefined && Number(value) > field.max) {
    errors.push(`${field.label} must be <= ${field.max}`);
  }


  if (field.minDate) {
    const selected = new Date(value);
    const minDate = new Date(field.minDate);

    if (selected < minDate) {
      errors.push(
        `${field.label} cannot be earlier than ${field.minDate}`
      );
    }
  }

  if (field.type === "multi-select") {
    if (field.minSelected && value.length < field.minSelected) {
      errors.push(
        `${field.label} must have at least ${field.minSelected} selections`
      );
    }

    if (field.maxSelected && value.length > field.maxSelected) {
      errors.push(
        `${field.label} cannot have more than ${field.maxSelected} selections`
      );
    }
  }

  return errors;
}
