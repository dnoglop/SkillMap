import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center p-6 my-8 bg-white rounded-lg shadow-md">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mb-3"></div>
      <p className="text-lg text-slate-700 font-medium">Analisando necessidades e gerando sua trilha de treinamento...</p>
      <p className="text-sm text-slate-500">Isso pode levar um momento.</p>
    </div>
  );
};