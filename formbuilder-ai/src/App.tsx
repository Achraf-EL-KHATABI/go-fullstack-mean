import React, { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { FormGenerator } from './components/FormGenerator';
import { DynamicForm } from './components/DynamicForm';
import { GeneratedForm, FormData } from './types/form';

type AppState = 'home' | 'generator' | 'form' | 'success';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [generatedForm, setGeneratedForm] = useState<GeneratedForm | null>(null);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleCreateForm = () => {
    setCurrentState('generator');
  };

  const handleFormGenerated = (form: GeneratedForm) => {
    setGeneratedForm(form);
    setCurrentState('form');
  };

  const handleFormSubmit = (data: FormData) => {
    setSubmittedData(data);
    setCurrentState('success');
    console.log('Données du formulaire soumises:', data);
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setGeneratedForm(null);
    setSubmittedData(null);
  };

  const handleBackToGenerator = () => {
    setCurrentState('generator');
  };

  const handleCreateAnother = () => {
    setCurrentState('generator');
    setGeneratedForm(null);
    setSubmittedData(null);
  };

  const renderContent = () => {
    switch (currentState) {
      case 'home':
        return <HomePage onCreateForm={handleCreateForm} />;
      
      case 'generator':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
            <FormGenerator 
              onFormGenerated={handleFormGenerated}
              onBack={handleBackToHome}
            />
          </div>
        );
      
      case 'form':
        return generatedForm ? (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
            <DynamicForm 
              form={generatedForm}
              onSubmit={handleFormSubmit}
              onBack={handleBackToGenerator}
            />
          </div>
        ) : null;
      
      case 'success':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Formulaire soumis avec succès !</h2>
                <p className="text-gray-600">Vos données ont été envoyées et sont visibles dans la console du navigateur.</p>
              </div>

              {submittedData && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Données soumises :</h3>
                  <pre className="text-sm text-gray-700 bg-white p-3 rounded border overflow-auto">
                    {JSON.stringify(submittedData, null, 2)}
                  </pre>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleBackToHome}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Retour à l'accueil
                </button>
                <button
                  onClick={handleCreateAnother}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Créer un autre formulaire
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return <HomePage onCreateForm={handleCreateForm} />;
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
