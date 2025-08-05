import React, { useState } from 'react';
import type { GeneratedForm, FormData, FormErrors } from '../types/form';
import { FormField } from './FormField';

interface DynamicFormProps {
  form: GeneratedForm;
  onSubmit: (data: FormData) => void;
  onBack?: () => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ form, onSubmit, onBack }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFieldValue = (fieldId: string, value: string | string[] | boolean) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    // Supprimer l'erreur quand l'utilisateur modifie le champ
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    form.fields.forEach(field => {
      const value = formData[field.id];

      // Validation des champs requis
      if (field.required) {
        if (field.type === 'checkbox') {
          if (!value) {
            newErrors[field.id] = 'Ce champ est obligatoire';
          }
        } else if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[field.id] = 'Ce champ est obligatoire';
        }
      }

      // Validation spécifique par type
      if (value && typeof value === 'string' && value.trim() !== '') {
        if (field.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            newErrors[field.id] = 'Veuillez entrer une adresse email valide';
          }
        }

        if (field.type === 'number') {
          const numValue = parseFloat(value);
          if (isNaN(numValue)) {
            newErrors[field.id] = 'Veuillez entrer un nombre valide';
          } else {
            if (field.validation?.min !== undefined && numValue < field.validation.min) {
              newErrors[field.id] = `La valeur doit être supérieure ou égale à ${field.validation.min}`;
            }
            if (field.validation?.max !== undefined && numValue > field.validation.max) {
              newErrors[field.id] = `La valeur doit être inférieure ou égale à ${field.validation.max}`;
            }
          }
        }

        if (field.validation?.pattern) {
          const regex = new RegExp(field.validation.pattern);
          if (!regex.test(value)) {
            newErrors[field.id] = 'Le format de ce champ n\'est pas valide';
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simuler un délai de soumission
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(formData);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldValue = (fieldId: string) => {
    const field = form.fields.find(f => f.id === fieldId);
    const value = formData[fieldId];
    
    if (field?.type === 'checkbox') {
      return Boolean(value);
    }
    
    return value || '';
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{form.title}</h2>
        {form.description && (
          <p className="text-gray-600">{form.description}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {form.fields.map(field => (
          <FormField
            key={field.id}
            field={field}
            value={getFieldValue(field.id)}
            onChange={(value) => updateFieldValue(field.id, value)}
            error={errors[field.id]}
          />
        ))}

        <div className="flex gap-4 pt-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Retour
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </>
            ) : (
              'Soumettre'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};