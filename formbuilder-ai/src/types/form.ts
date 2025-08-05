import { z } from 'zod';

// Types pour les champs de formulaire
export type FieldType = 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[]; // Pour les select et radio
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface GeneratedForm {
  title: string;
  description?: string;
  fields: FormField[];
}

// Schémas Zod pour la validation
export const FormFieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum(['text', 'email', 'number', 'textarea', 'select', 'checkbox', 'radio']),
  required: z.boolean().optional(),
  placeholder: z.string().optional(),
  options: z.array(z.string()).optional(),
  validation: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
  }).optional(),
});

export const GeneratedFormSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  fields: z.array(FormFieldSchema),
});

// Type pour les données de soumission du formulaire
export type FormData = Record<string, string | string[] | boolean>;

// Type pour les erreurs de validation
export type FormErrors = Record<string, string>;