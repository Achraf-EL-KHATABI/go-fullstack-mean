import React from 'react';
import { FormField as FormFieldType, FormData, FormErrors } from '../types/form';

interface FormFieldProps {
  field: FormFieldType;
  value: string | string[] | boolean;
  onChange: (value: string | string[] | boolean) => void;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ field, value, onChange, error }) => {
  const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "";

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={field.type}
            id={field.id}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            min={field.validation?.min}
            max={field.validation?.max}
            pattern={field.validation?.pattern}
            className={`${baseClasses} ${errorClasses}`}
          />
        );

      case 'textarea':
        return (
          <textarea
            id={field.id}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            className={`${baseClasses} ${errorClasses} resize-vertical`}
          />
        );

      case 'select':
        return (
          <select
            id={field.id}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            className={`${baseClasses} ${errorClasses}`}
          >
            <option value="">Sélectionnez une option</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(e.target.value)}
                  required={field.required}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={field.id}
              checked={value as boolean}
              onChange={(e) => onChange(e.target.checked)}
              required={field.required}
              className="text-blue-600 focus:ring-blue-500 rounded"
            />
            <span className="text-gray-700">{field.label}</span>
          </label>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      {field.type !== 'checkbox' && (
        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderField()}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};