
import React, { useState, useMemo, useCallback } from 'react';
import { ObjetivoPrincipal, NivelMaturidade } from '../types';
import type { FormData, PerfilEquipe, TempoDisponivel, FormatoEngajador, ExperienciaTreinamentosAnteriores, MetodoAvaliacaoImpacto, UrgenciaAplicacao, CompetenciasChave } from '../types';
import {
  ALL_OBJETIVOS_PRINCIPAIS,
  ALL_PERFIS_EQUIPE,
  ALL_NIVEIS_MATURIDADE,
  ALL_TEMPOS_DISPONIVEIS,
  ALL_FORMATOS_ENGAJADORES,
  ALL_EXPERIENCIAS_TREINAMENTOS_ANTERIORES,
  ALL_METODOS_AVALIACAO_IMPACTO,
  ALL_URGENCIAS_APLICACAO,
  ALL_COMPETENCIAS_CHAVE,
} from '../constants';

// --- Icons for SkillForm ---
const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const ArrowRightFormIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

// Icons for ObjetivoPrincipal options
const TrendUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);
const LightBulbIconForm: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( 
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311V21m-3.75 0q.104.02.214.044M12 3c-3.866 0-7 3.134-7 7 0 1.894.743 3.63 1.969 4.92L6.5 16.5h11l-1.469-1.58A6.965 6.965 0 0019 10c0-3.866-3.134-7-7-7z" />
  </svg>
);
const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-3.741-5.702m-3.74 0a3 3 0 00-5.703 0m5.703 0a3 3 0 01-5.703 0M9.75 6.75a3 3 0 11-6 0 3 3 0 016 0zM17.25 9.75a3 3 0 11-6 0 3 3 0 016 0zM13.5 18.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const RocketLaunchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a12.026 12.026 0 01-5.84 7.38m0-17.07a12.026 12.026 0 00-5.84 7.38m5.84-7.38L15.59 7.13m0 0a6 6 0 015.23 2.48m-5.23-2.48L10.36 1m0 0L7.13 4.63m3.23-3.63a6 6 0 00-5.84 7.38m0 0L1 10.36m9.36-9.36l3.23 3.63m-3.23-3.63L7.13 1M1 10.36l2.48 5.23m0 0l2.48-5.23m0 0a6 6 0 017.38-5.84m0 0a6 6 0 012.48 5.23M18.13 1a6 6 0 00-5.84 7.38m5.84-7.38L22.87 4.63m0 0L19.64 1m0 0l-2.48 5.23m0 0L14.37 1m0 0l-2.48 5.23" />
    </svg>
);
const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V14.15M17.25 9.75V6.375A2.25 2.25 0 0015 4.125H9A2.25 2.25 0 006.75 6.375v3.375M14.25 9.75h-4.5a2.25 2.25 0 000 4.5h4.5a2.25 2.25 0 000-4.5z" />
    </svg>
);

const objetivoIcons: Record<ObjetivoPrincipal, React.ReactNode> = {
  [ObjetivoPrincipal.MelhorarPerformanceTecnica]: <TrendUpIcon className="w-6 h-6" />,
  [ObjetivoPrincipal.DesenvolverSoftSkills]: <LightBulbIconForm className="w-6 h-6" />,
  [ObjetivoPrincipal.EngajarMotivarEquipe]: <UsersIcon className="w-6 h-6" />,
  [ObjetivoPrincipal.AumentarProdutividadeFoco]: <RocketLaunchIcon className="w-6 h-6" />,
  [ObjetivoPrincipal.PrepararNovaFuncao]: <BriefcaseIcon className="w-6 h-6" />,
};


interface SkillFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

interface QuestionConfig {
  id: keyof FormData;
  questionText: string;
  type: 'text' | 'radio' | 'checkbox' | 'textarea' | 'range';
  options?: readonly any[];
  valueKey?: string; 
  labelKey?: string;  
  limit?: number; 
  isRequired: boolean;
  helpText?: string;
  placeholder?: string;
  isCountedForProgress: boolean; 
  stage: StageName; 
  min?: number; 
  max?: number; 
  rangeLabels?: { min: string, max: string }; 
}

type StageName = "Contexto do Time" | "Tempo e Formato" | "Avaliação" | "Competências";

const stagesConfig: { name: StageName; questions: (keyof FormData)[] }[] = [
  { name: "Contexto do Time", questions: ['timeDepartamento', 'objetivoPrincipal', 'perfilEquipe', 'maturidadeEquipe'] },
  { name: "Tempo e Formato", questions: ['tempoSemanalDedicado', 'formatosEngajadores', 'experienciaTreinamentosAnteriores'] },
  { name: "Avaliação", questions: ['metodoAvaliacaoImpacto', 'urgenciaAplicacao'] },
  { name: "Competências", questions: ['competenciasDesenvolver', 'observacoesAdicionais'] }
];

const initialFormData: FormData = {
  timeDepartamento: '',
  objetivoPrincipal: undefined,
  perfilEquipe: undefined,
  maturidadeEquipe: NivelMaturidade.Intermediario, 
  tempoSemanalDedicado: undefined,
  formatosEngajadores: [],
  experienciaTreinamentosAnteriores: undefined,
  metodoAvaliacaoImpacto: undefined,
  urgenciaAplicacao: undefined,
  competenciasDesenvolver: [],
  observacoesAdicionais: '',
};

const questionsConfig: QuestionConfig[] = [
  { id: 'timeDepartamento', questionText: "Qual o time/departamento?", type: 'text', isRequired: true, placeholder: "Ex: Marketing, Vendas, TI, RH", isCountedForProgress: true, stage: "Contexto do Time" },
  { id: 'objetivoPrincipal', questionText: "Qual é o principal objetivo com esse treinamento?", type: 'radio', options: ALL_OBJETIVOS_PRINCIPAIS, isRequired: true, helpText: "(Escolha uma opção)", isCountedForProgress: true, stage: "Contexto do Time" },
  { id: 'perfilEquipe', questionText: "Qual o perfil da maioria dos colaboradores da equipe?", type: 'radio', options: ALL_PERFIS_EQUIPE, isRequired: true, helpText: "(Escolha uma opção)", isCountedForProgress: true, stage: "Contexto do Time" },
  { id: 'maturidadeEquipe', questionText: "Qual o nível atual de maturidade da equipe nesse tema?", type: 'range', options: ALL_NIVEIS_MATURIDADE, valueKey: "value", labelKey: "label", isRequired: true, helpText: "(Deslize para selecionar)", isCountedForProgress: true, stage: "Contexto do Time", min: 1, max: 5, rangeLabels: {min: "Totalmente iniciantes", max: "Muito experientes"} },
  { id: 'tempoSemanalDedicado', questionText: "Quanto tempo por semana a equipe pode dedicar ao treinamento?", type: 'radio', options: ALL_TEMPOS_DISPONIVEIS, isRequired: true, isCountedForProgress: true, stage: "Tempo e Formato" },
  { id: 'formatosEngajadores', questionText: "Qual formato você acredita que mais engaja sua equipe?", type: 'checkbox', options: ALL_FORMATOS_ENGAJADORES, limit: 2, isRequired: true, helpText: "(Escolha até 2)", isCountedForProgress: true, stage: "Tempo e Formato" },
  { id: 'experienciaTreinamentosAnteriores', questionText: "A equipe já participou de treinamentos anteriores?", type: 'radio', options: ALL_EXPERIENCIAS_TREINAMENTOS_ANTERIORES, isRequired: true, isCountedForProgress: true, stage: "Tempo e Formato" },
  { id: 'metodoAvaliacaoImpacto', questionText: "Como você gostaria de avaliar o impacto do treinamento?", type: 'radio', options: ALL_METODOS_AVALIACAO_IMPACTO, isRequired: true, isCountedForProgress: true, stage: "Avaliação" },
  { id: 'urgenciaAplicacao', questionText: "Qual a urgência para aplicar esse treinamento?", type: 'radio', options: ALL_URGENCIAS_APLICACAO, isRequired: true, isCountedForProgress: true, stage: "Avaliação" },
  { id: 'competenciasDesenvolver', questionText: "Quais competências você gostaria de desenvolver?", type: 'checkbox', options: ALL_COMPETENCIAS_CHAVE, limit: 2, isRequired: true, helpText: "(Escolha até 2)", isCountedForProgress: true, stage: "Competências" },
  { id: 'observacoesAdicionais', questionText: "Tem algum comentário ou observação que seja importante para o diagnóstico? (Opcional)", type: 'textarea', isRequired: false, placeholder: "Ex: dinâmicas específicas da equipe, sucessos/falhas de treinamentos passados, etc.", isCountedForProgress: false, stage: "Competências" },
];

const TOTAL_QUESTIONS_FORM = questionsConfig.length;

export const SkillForm: React.FC<SkillFormProps> = ({ onSubmit, isLoading }) => {
  const [formState, setFormState] = useState<FormData>(initialFormData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestionConfig = questionsConfig[currentQuestionIndex];
  const currentStageName = currentQuestionConfig.stage;
  const currentStageIndex = stagesConfig.findIndex(s => s.name === currentStageName);
  const lastQuestionIndex = TOTAL_QUESTIONS_FORM - 1;

  const isCurrentQuestionAnswered = useCallback(() => {
    if (!currentQuestionConfig.isRequired) return true;
    const value = formState[currentQuestionConfig.id];
    if (currentQuestionConfig.type === 'checkbox') {
      return Array.isArray(value) && value.length > 0;
    }
    if (currentQuestionConfig.type === 'text' || currentQuestionConfig.type === 'textarea') {
      return typeof value === 'string' && value.trim() !== '';
    }
    return value !== undefined && value !== null && String(value).trim() !== '';
  }, [formState, currentQuestionConfig]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: parseInt(value) as NivelMaturidade }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
     setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const fieldName = currentQuestionConfig.id as 'formatosEngajadores' | 'competenciasDesenvolver';
    const limit = currentQuestionConfig.limit || 0;
    const typedValue = value as FormatoEngajador | CompetenciasChave;

    setFormState(prevState => {
      const currentValues = prevState[fieldName] || [];
      let newValues;
      if (checked) {
        if (currentValues.length < limit) {
          newValues = [...currentValues, typedValue];
        } else {
          return prevState; 
        }
      } else {
        newValues = currentValues.filter(item => item !== typedValue);
      }
      return { ...prevState, [fieldName]: newValues };
    });
  };

  const handleNext = () => {
    if (isCurrentQuestionAnswered()) {
      if (currentQuestionIndex < TOTAL_QUESTIONS_FORM - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    } else {
        alert("Por favor, responda a pergunta atual para continuar.");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1); // Corrected: was prev + 1
    }
  };

  const handleAttemptSubmit = () => {
    console.log("[SkillForm Debug] handleAttemptSubmit CALLED. Current Index:", currentQuestionIndex, "Question ID:", currentQuestionConfig.id);
    
    const firstUnansweredRequiredQuestion = questionsConfig.find(q => {
        if (!q.isRequired) return false;
        const value = formState[q.id];
        if (q.type === 'checkbox') return !(Array.isArray(value) && value.length > 0);
        if (q.type === 'text' || q.type === 'textarea') return !(typeof value === 'string' && value.trim() !== '');
        return value === undefined || value === null || String(value).trim() === '';
    });

    if (firstUnansweredRequiredQuestion) {
        const questionIndexOfUnanswered = questionsConfig.findIndex(q => q.id === firstUnansweredRequiredQuestion.id);
        if (questionIndexOfUnanswered !== currentQuestionIndex) {
             if (!confirm(`A pergunta "${firstUnansweredRequiredQuestion.questionText}" (etapa ${firstUnansweredRequiredQuestion.stage}) é obrigatória mas não foi respondida. Deseja continuar mesmo assim e submeter o formulário?`)) {
                setCurrentQuestionIndex(questionIndexOfUnanswered); 
                return;
            }
        } else if (!isCurrentQuestionAnswered()){ 
            alert("Por favor, responda a pergunta atual para submeter.");
            return;
        }
    }
    onSubmit(formState);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Always prevent default for form's onSubmit
    console.log("[SkillForm Debug] FORM onSubmit (handleSubmit) Triggered. Delegating to handleAttemptSubmit. Current Index:", currentQuestionIndex, "Question ID:", currentQuestionConfig.id);
    handleAttemptSubmit();
  };

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
        const target = e.target as HTMLElement;
        
        if ((target.tagName === 'INPUT' && 
             (target as HTMLInputElement).type !== 'button' && 
             (target as HTMLInputElement).type !== 'submit' &&
             (target as HTMLInputElement).type !== 'checkbox' && 
             (target as HTMLInputElement).type !== 'radio'      
            ) || target.tagName === 'TEXTAREA') {
            
            if (currentQuestionIndex < lastQuestionIndex) {
                e.preventDefault(); 
                if (isCurrentQuestionAnswered()) {
                    handleNext();
                } else {
                    alert("Por favor, responda a pergunta atual para continuar.");
                }
            } else { // IS the last question
                // If Enter is pressed in TEXTAREA of question 11, allow default (newline).
                // Since "Gerar Trilha" is type="button", this won't submit the form.
                if (target.tagName === 'TEXTAREA' && currentQuestionConfig.id === 'observacoesAdicionais') {
                    // Default behavior (newline) is desired and should not submit.
                }
            }
        }
    }
  };
  
  const renderInput = () => {
    const { id, type, placeholder, options, valueKey, labelKey, min, max, rangeLabels } = currentQuestionConfig;
    const formValue = formState[id];

    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            id={String(id)}
            name={String(id)}
            value={(formValue as string) || ''}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={isLoading}
            className="w-full p-4 border border-slate-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-lg disabled:bg-slate-100"
          />
        );
      case 'textarea':
        return (
          <textarea
            id={String(id)}
            name={String(id)}
            rows={5}
            value={(formValue as string) || ''}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={isLoading}
            className="w-full p-4 border border-slate-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-lg disabled:bg-slate-100"
          />
        );
      case 'range':
        return (
            <div className="w-full px-2">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>{rangeLabels?.min}</span>
                    <span>{rangeLabels?.max}</span>
                </div>
                <input
                    type="range"
                    id={String(id)}
                    name={String(id)}
                    min={min}
                    max={max}
                    value={formValue as number || min}
                    onChange={handleRangeChange}
                    disabled={isLoading}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
                <div className="text-center text-blue-600 font-semibold mt-2 text-lg">{formValue as number || min}</div>
            </div>
        );
      case 'radio':
        if (id === 'objetivoPrincipal') {
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(options as ObjetivoPrincipal[])?.map(option => {
                const isChecked = formState[id] === option;
                return (
                  <label key={option} htmlFor={`${String(id)}-${option}`} 
                         className={`flex flex-col items-center justify-center text-center space-y-2 p-4 border rounded-xl cursor-pointer transition-all duration-150 ease-in-out
                                     ${isChecked ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50 shadow-md' : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/50'}
                                     ${isLoading ? 'bg-slate-100 cursor-not-allowed opacity-70' : ''}`}>
                    <input
                      type="radio"
                      id={`${String(id)}-${option}`}
                      name={String(id)}
                      value={option}
                      checked={isChecked}
                      onChange={handleRadioChange}
                      disabled={isLoading}
                      className="sr-only"
                    />
                    <span className={`p-2 rounded-full ${isChecked ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                        {objetivoIcons[option as ObjetivoPrincipal]}
                    </span>
                    <span className={`font-medium text-sm ${isChecked ? 'text-blue-700' : 'text-slate-700'}`}>{option}</span>
                  </label>
                );
              })}
            </div>
          );
        }
        return (
          <div className="space-y-3">
            {(options as any[])?.map(option => {
              const radioVal = valueKey ? option[valueKey] : option;
              const radioLabel = labelKey ? option[labelKey] : option;
              const isChecked = String(formState[id]) === String(radioVal);
              return (
                <label key={String(radioVal)} htmlFor={`${String(id)}-${radioVal}`} 
                       className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-all duration-150 ease-in-out
                                   ${isChecked ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50 shadow-sm' : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/50'}
                                   ${isLoading ? 'bg-slate-100 cursor-not-allowed opacity-70' : ''}`}>
                  <input
                    type="radio"
                    id={`${String(id)}-${radioVal}`}
                    name={String(id)}
                    value={String(radioVal)}
                    checked={isChecked}
                    onChange={handleRadioChange}
                    disabled={isLoading}
                    className="h-5 w-5 text-blue-600 border-slate-400 focus:ring-blue-500 focus:ring-offset-0 disabled:bg-slate-200"
                  />
                  <span className={`text-lg ${isChecked ? 'text-blue-700 font-medium' : 'text-slate-800'}`}>{radioLabel}</span>
                </label>
              );
            })}
          </div>
        );
        case 'checkbox':
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(options as any[])?.map(option => {
                const checkboxVal = option; 
                const isChecked = (formState[id] as any[])?.includes(checkboxVal);
                const isDisabled = isLoading || ((formState[id] as any[])?.length >= (currentQuestionConfig.limit || Infinity) && !isChecked);
                return (
                  <label key={checkboxVal} htmlFor={`${String(id)}-${checkboxVal}`} 
                         className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-all duration-150 ease-in-out
                                     ${isChecked ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50 shadow-sm' : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/50'}
                                     ${isDisabled ? 'bg-slate-100 cursor-not-allowed opacity-70' : ''}`}>
                    <input
                      type="checkbox"
                      id={`${String(id)}-${checkboxVal}`}
                      name={String(id)}
                      value={checkboxVal}
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      disabled={isDisabled}
                      className="h-5 w-5 text-blue-600 border-slate-400 rounded focus:ring-blue-500 focus:ring-offset-0 disabled:bg-slate-200"
                    />
                    <span className={`text-lg ${isChecked ? 'text-blue-700 font-medium' : 'text-slate-800'} ${isDisabled && !isChecked ? 'text-slate-400' : ''}`}>{checkboxVal}</span>
                  </label>
                );
              })}
            </div>
          );
      default:
        return null;
    }
  };
  
  return (
    <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} className="bg-white p-6 md:p-8 rounded-xl shadow-2xl space-y-6 mb-8">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-slate-800 mb-1">Diagnóstico de Necessidades</h2>
        <p className="text-slate-600 text-sm">Progresso: {currentStageIndex + 1}/{stagesConfig.length}</p>
      </div>
      
      <div className="my-6">
        <div className="flex justify-between items-center mb-2 px-1">
            {stagesConfig.map((stage, index) => (
                <div key={stage.name} className={`flex-1 text-center ${index <= currentStageIndex ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>
                    <span className="text-xs sm:text-sm">{stage.name}</span>
                </div>
            ))}
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5 relative">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${((currentStageIndex + 1) / stagesConfig.length) * 100}%` }}
            role="progressbar"
            aria-valuenow={currentStageIndex + 1}
            aria-valuemin={1}
            aria-valuemax={stagesConfig.length}
            aria-label={`Progresso do diagnóstico: Etapa ${currentStageIndex + 1} de ${stagesConfig.length}, ${currentStageName}`}
          ></div>
           {stagesConfig.map((_, index) => (
                <div key={`dot-${index}`} 
                     className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2
                                ${index <= currentStageIndex ? 'bg-blue-600 border-white' : 'bg-slate-300 border-slate-100'}`}
                     style={{ left: `calc(${(index / (stagesConfig.length -1 )) * 100}% - 8px)` }} 
                ></div>
            ))}
        </div>
      </div>

      <div className="p-6 bg-slate-50 rounded-xl shadow-inner min-h-[300px] flex flex-col justify-center">
        <p className="text-sm text-blue-600 font-semibold mb-2">Pergunta {currentQuestionIndex + 1} de {TOTAL_QUESTIONS_FORM}</p>
        <label htmlFor={String(currentQuestionConfig.id)} className="block text-xl font-semibold text-slate-700 mb-3">
          {currentQuestionConfig.questionText}
        </label>
        {currentQuestionConfig.helpText && <p className="text-sm text-slate-500 mb-4">{currentQuestionConfig.helpText}</p>}
        {renderInput()}
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={isLoading || currentQuestionIndex === 0}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2"/> 
          Voltar
        </button>
        
        {currentQuestionIndex < lastQuestionIndex ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={isLoading || !isCurrentQuestionAnswered()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center"
          >
            Próximo
            <ArrowRightFormIcon className="w-5 h-5 ml-2"/> 
          </button>
        ) : (
          <button
            type="button" // Changed from type="submit"
            onClick={handleAttemptSubmit} // Added onClick handler
            disabled={isLoading || !isCurrentQuestionAnswered()} 
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
            aria-live="polite"
          >
            {isLoading ? 'Analisando...' : 'Gerar Trilha'}
          </button>
        )}
      </div>
    </form>
  );
};
