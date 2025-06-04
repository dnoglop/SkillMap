
import React, { useState, useCallback } from 'react';
import { SkillForm } from './components/SkillForm';
import { TrainingPathDisplay } from './components/TrainingPathDisplay'; // Corrected/Verified path
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { LandingPage } from './components/LandingPage'; // Import LandingPage
import { suggestTrainingPath } from './services/geminiService';
import type { FormData, TrainingPath } from './types';

const App: React.FC = () => {
  const [trainingPath, setTrainingPath] = useState<TrainingPath | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false); // Form not shown initially
  const [showLandingPage, setShowLandingPage] = useState<boolean>(true); // Landing page shown initially

  const handleFormSubmit = useCallback(async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setTrainingPath(null);
    try {
      const path = await suggestTrainingPath(formData);
      setTrainingPath(path);
      setShowForm(false); // Hide form and show results
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado ao processar sua solicitação.');
      }
      setShowForm(true); // Keep form visible on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStartNewDiagnosis = () => { // From results page
    setTrainingPath(null);
    setError(null);
    setIsLoading(false);
    setShowForm(true); // Go back to form
    setShowLandingPage(false); // Ensure landing page stays hidden
  };

  const handleStartDiagnosisFromLanding = () => {
    setShowLandingPage(false);
    setShowForm(true);
    setTrainingPath(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {showLandingPage ? (
        <LandingPage onStartDiagnosis={handleStartDiagnosisFromLanding} />
      ) : (
        <div className="container mx-auto p-4 md:p-8 max-w-4xl flex-grow">
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
              SkillMap AI
            </h1>
            <p className="text-lg text-slate-600 mt-2">
              Diagnostique as necessidades da sua equipe e receba sugestões de trilhas de treinamento personalizadas com IA.
            </p>
          </header>

          <main>
            {showForm && <SkillForm onSubmit={handleFormSubmit} isLoading={isLoading} />}
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {trainingPath && !isLoading && !error && (
              <>
                <TrainingPathDisplay path={trainingPath} />
                <div className="text-center mt-8">
                  <button
                    onClick={handleStartNewDiagnosis}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                    aria-label="Iniciar Novo Diagnóstico"
                  >
                    Iniciar Novo Diagnóstico
                  </button>
                </div>
              </>
            )}
          </main>
        </div>
      )}
      
      <footer className={`text-center py-6 border-t border-slate-300 ${showLandingPage ? 'bg-white' : ''}`}>
        <p className="text-sm text-slate-500">
          SkillMap AI | 2025 | Feito com 🧡 pela educação e treinamento.
        </p>
      </footer>
    </div>
  );
};

export default App;