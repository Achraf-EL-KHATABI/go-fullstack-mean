import type { GeneratedForm } from '../types/form';

// Mock API pour simuler l'appel à OpenAI
export const generateFormFromPrompt = async (prompt: string): Promise<GeneratedForm> => {
  // Simuler un délai d'API
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Exemples de formulaires prédéfinis basés sur des mots-clés
  const formTemplates: Record<string, GeneratedForm> = {
    contact: {
      title: 'Formulaire de Contact',
      description: 'Contactez-nous pour toute question ou demande d\'information',
      fields: [
        {
          id: 'name',
          label: 'Nom complet',
          type: 'text',
          required: true,
          placeholder: 'Votre nom et prénom'
        },
        {
          id: 'email',
          label: 'Adresse email',
          type: 'email',
          required: true,
          placeholder: 'votre.email@exemple.com'
        },
        {
          id: 'subject',
          label: 'Sujet',
          type: 'select',
          required: true,
          options: ['Question générale', 'Support technique', 'Demande commerciale', 'Autre']
        },
        {
          id: 'message',
          label: 'Message',
          type: 'textarea',
          required: true,
          placeholder: 'Décrivez votre demande...'
        },
        {
          id: 'newsletter',
          label: 'S\'abonner à la newsletter',
          type: 'checkbox',
          required: false
        }
      ]
    },
    survey: {
      title: 'Enquête de Satisfaction',
      description: 'Aidez-nous à améliorer nos services',
      fields: [
        {
          id: 'satisfaction',
          label: 'Niveau de satisfaction général',
          type: 'radio',
          required: true,
          options: ['Très satisfait', 'Satisfait', 'Neutre', 'Insatisfait', 'Très insatisfait']
        },
        {
          id: 'recommendation',
          label: 'Note de recommandation (0-10)',
          type: 'number',
          required: true,
          validation: { min: 0, max: 10 }
        },
        {
          id: 'improvements',
          label: 'Suggestions d\'amélioration',
          type: 'textarea',
          required: false,
          placeholder: 'Que pourrions-nous améliorer ?'
        }
      ]
    },
    registration: {
      title: 'Inscription à l\'Événement',
      description: 'Inscrivez-vous à notre prochain événement',
      fields: [
        {
          id: 'firstName',
          label: 'Prénom',
          type: 'text',
          required: true
        },
        {
          id: 'lastName',
          label: 'Nom',
          type: 'text',
          required: true
        },
        {
          id: 'email',
          label: 'Email',
          type: 'email',
          required: true
        },
        {
          id: 'company',
          label: 'Entreprise',
          type: 'text',
          required: false
        },
        {
          id: 'dietary',
          label: 'Restrictions alimentaires',
          type: 'select',
          required: false,
          options: ['Aucune', 'Végétarien', 'Végétalien', 'Sans gluten', 'Autre']
        },
        {
          id: 'terms',
          label: 'J\'accepte les conditions d\'utilisation',
          type: 'checkbox',
          required: true
        }
      ]
    }
  };

  // Détecter le type de formulaire basé sur le prompt
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('contact') || lowerPrompt.includes('contacter')) {
    return formTemplates.contact!;
  } else if (lowerPrompt.includes('enquête') || lowerPrompt.includes('satisfaction') || lowerPrompt.includes('sondage')) {
    return formTemplates.survey!;
  } else if (lowerPrompt.includes('inscription') || lowerPrompt.includes('événement') || lowerPrompt.includes('register')) {
    return formTemplates.registration!;
  }

  // Formulaire générique par défaut
  return {
    title: 'Formulaire Personnalisé',
    description: `Formulaire généré à partir de: "${prompt}"`,
    fields: [
      {
        id: 'name',
        label: 'Nom',
        type: 'text',
        required: true,
        placeholder: 'Votre nom'
      },
      {
        id: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'votre@email.com'
      },
      {
        id: 'feedback',
        label: 'Commentaires',
        type: 'textarea',
        required: false,
        placeholder: 'Vos commentaires...'
      },
      {
        id: 'agree',
        label: 'Je suis d\'accord avec les termes',
        type: 'checkbox',
        required: true
      }
    ]
  };
};