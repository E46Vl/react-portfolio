import { useState, useCallback } from 'react';

interface ValidationRule<T> {
  validate: (value: T) => boolean | string;
  message?: string;
}

interface UseFormValidationOptions<T> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule<T[keyof T]>[]>>;
  onSubmit?: (values: T) => void | Promise<void>;
}

export const useFormValidation = <T extends Record<string, any>>(
  options: UseFormValidationOptions<T>
) => {
  const { initialValues, validationRules = {} as Partial<Record<keyof T, ValidationRule<T[keyof T]>[]>>, onSubmit } = options;
  
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback((field: keyof T, value: T[keyof T]): string | null => {
    const fieldRules = validationRules[field];
    if (!fieldRules) return null;

    for (const rule of fieldRules) {
      const result = rule.validate(value);
      if (result !== true) {
        return typeof result === 'string' ? result : rule.message || 'Invalid value';
      }
    }
    return null;
  }, [validationRules]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(values).forEach((key) => {
      const fieldKey = key as keyof T;
      const error = validateField(fieldKey, values[fieldKey]);
      if (error) {
        newErrors[fieldKey] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);

  const handleChange = useCallback((field: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: error || undefined,
      }));
    }
  }, [errors, validateField]);

  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    const error = validateField(field, values[field]);
    setErrors(prev => ({
      ...prev,
      [field]: error || undefined,
    }));
  }, [values, validateField]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit?.(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const hasErrors = Object.keys(errors).length > 0;
  const isFormValid = !hasErrors && Object.keys(touched).length > 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    hasErrors,
    isFormValid,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
    setErrors,
  };
}; 