import React, { useState } from 'react';
import { generateFormFromPrompt } from '../lib/openai-mock';
import type { GeneratedForm } from '../types/form';

interface FormGeneratorProps {
  onFormGenerated: (form: GeneratedForm) => void;
  onBack?: () => void;
}

export const FormGenerator: React.FC<FormGeneratorProps> = ({ onFormGenerated, onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Veuillez entrer une description du formulaire');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const generatedForm = await generateFormFromPrompt(prompt);
      onFormGenerated(generatedForm);
    } catch (err) {
      setError('Erreur lors de la génération du formulaire. Veuillez réessayer.');
      console.error('Erreur génération:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Générateur de Formulaire IA
        </h2>
        <p className="text-gray-600">
          Décrivez le type de formulaire que vous souhaitez créer et notre IA le générera pour vous.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Description du formulaire <span className="text-red-500">*</span>
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Exemple: Créer un formulaire de contact avec nom, email, sujet et message..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            disabled={isGenerating}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <div className="bg-blue-50 p-4 rounded-md">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Exemples de prompts :</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• "Formulaire de contact avec nom, email et message"</li>
            <li>• "Enquête de satisfaction client"</li>
            <li>• "Inscription à un événement avec informations personnelles"</li>
            <li>• "Formulaire de candidature avec CV et lettre de motivation"</li>
          </ul>
        </div>

        <div className="flex gap-4 pt-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              disabled={isGenerating}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              Retour
            </button>
          )}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Génération en cours...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Générer le formulaire
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};