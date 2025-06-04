
import React, { useState, useEffect } from 'react';

// SkillMap Logo Component
const SkillMapLogo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      SkillMap AI
    </span>
  </div>
);

// Icon Components
const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
  </svg>
);

const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const DocumentArrowDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125 1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const LightningBoltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const PuzzlePieceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-6.75 3h9.75m-1.5 3h3M5.25 12H2.25m3 3h3M5.25 15H2.25m15.75-3H18m3 3h-3m-3.75 3h9.75M10.5 18H2.25m3.75-3.75c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V9.75c0-.621-.504-1.125-1.125-1.125h-2.25A1.125 1.125 0 006.75 9.75v2.25zm4.5 1.5h.008v.008h-.008V12.75zm-.75-1.5h.008v.008h-.008V9.75zm-1.5 1.5h.008v.008h-.008V12.75zm-.75-1.5h.008v.008H9V9.75zm-1.5 1.5H7.5v.008h.008V12.75zm-.75-1.5h.008v.008H6V9.75z" />
  </svg>
);

const CheckBadgeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DocumentTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h4.5m-4.5 0H5.625c-.621 0-1.125-.504-1.125-1.125V5.625c0-.621.504-1.125 1.125-1.125h12.75c.621 0 1.125.504 1.125 1.125v12.75c0 .621-.504 1.125-1.125 1.125h-1.5m-10.5-9.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008z" />
  </svg>
);

const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const ArrowPathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311V21m-3.75 0q.104.02.214.044M12 3c-3.866 0-7 3.134-7 7 0 1.894.743 3.63 1.969 4.92L6.5 16.5h11l-1.469-1.58A6.965 6.965 0 0019 10c0-3.866-3.134-7-7-7z" />
  </svg>
);

const TrendUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

// Animated Particles Background
const ParticlesBackground: React.FC = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({length: 20}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-blue-400 opacity-20 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.id * 0.2}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

// Animated Counter
const AnimatedCounter: React.FC<{target: number, suffix?: string}> = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const step = target / (duration / 50);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}{suffix}</span>;
};

// Floating Card Component
const FloatingCard: React.FC<{children: React.ReactNode, delay?: number}> = ({ children, delay = 0 }) => {
  return (
    <div 
      className="transform transition-all duration-700 hover:scale-105 hover:-translate-y-2"
      // Removed style={{ animation: `float ...` }} as @keyframes float is no longer defined here
      // animationDelay is also removed as it requires an animation name.
    >
      {children}
      {/* <style jsx> tag and its content removed */}
    </div>
  );
};

interface LandingPageProps {
  onStartDiagnosis: () => void;
}

const features = [
  {
    icon: <LightningBoltIcon className="w-7 h-7 text-blue-500" />,
    bgColor: "bg-blue-100",
    title: "Rápido e Eficiente",
    description: "Crie trilhas de treinamento personalizadas em minutos, não em dias ou semanas.",
    hoverColor: "hover:bg-blue-200",
  },
  {
    icon: <PuzzlePieceIcon className="w-7 h-7 text-purple-500" />,
    bgColor: "bg-purple-100",
    title: "Personalização Inteligente",
    description: "Trilhas adaptadas às necessidades específicas da sua equipe e objetivos de negócio.",
    hoverColor: "hover:bg-purple-200",
  },
  {
    icon: <CheckBadgeIcon className="w-7 h-7 text-green-500" />,
    bgColor: "bg-green-100",
    title: "Baseado em Evidências",
    description: "Recomendações fundamentadas em práticas pedagógicas e de desenvolvimento comprovadas.",
    hoverColor: "hover:bg-green-200",
  },
  {
    icon: <DocumentTextIcon className="w-7 h-7 text-orange-500" />,
    bgColor: "bg-orange-100",
    title: "Fácil Implementação",
    description: "Exporte trilhas em PDF ou receba por e-mail para compartilhar e aplicar com sua equipe.",
    hoverColor: "hover:bg-orange-200",
  },
  {
    icon: <ChartBarIcon className="w-7 h-7 text-pink-500" />,
    bgColor: "bg-pink-100",
    title: "Métricas de Impacto",
    description: "Sugestões de como avaliar o impacto dos treinamentos e otimizar resultados futuros.",
    hoverColor: "hover:bg-pink-200",
  },
  {
    icon: <ArrowPathIcon className="w-7 h-7 text-teal-500" />,
    bgColor: "bg-teal-100",
    title: "Atualizações Constantes",
    description: "Biblioteca de recursos e conteúdos em evolução para manter sua equipe sempre à frente.",
    hoverColor: "hover:bg-teal-200",
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onStartDiagnosis }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mockUIStep, setMockUIStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);
    
    // Animate mock UI
    const interval = setInterval(() => {
      setMockUIStep(prev => (prev + 1) % 4);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
        <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="transform transition-transform duration-300 hover:scale-105">
            <SkillMapLogo />
          </div>
          <div className="space-x-6">
            <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105 inline-block relative group">
              Como funciona
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105 inline-block relative group">
              Contato
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-16 md:py-24 lg:py-28 overflow-hidden">
          <ParticlesBackground />
          <div 
            className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Left Column - Text Content */}
              <div className={`text-center md:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 !leading-tight">
                  Crie sua trilha de treinamento{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
                    personalizada
                  </span>{' '}
                  em 2 minutos
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-xl mx-auto md:mx-0"> {/* Removed animate-fade-in-up class */}
                  Diagnóstico rápido das necessidades da sua equipe com sugestão automática de trilha de desenvolvimento personalizada.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 justify-center md:justify-start">
                  <button
                    onClick={onStartDiagnosis}
                    className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center text-lg relative overflow-hidden"
                    aria-label="Começar Diagnóstico"
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    <PlayIcon className="w-5 h-5 mr-2.5 group-hover:animate-bounce" />
                    Começar Diagnóstico
                  </button>
                  <button 
                    className="group bg-white text-slate-700 font-semibold py-3.5 px-8 rounded-lg border-2 border-slate-300 hover:border-blue-500 hover:bg-slate-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg"
                    aria-label="Saiba mais sobre o SkillMap AI"
                  >
                    <span className="group-hover:text-blue-600 transition-colors duration-300">Saiba mais</span>
                  </button>
                </div>
                <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5 transform hover:scale-105 transition-transform duration-300">
                    <ClockIcon className="w-5 h-5 text-blue-600 animate-pulse" />
                    <span>2 minutos</span>
                  </div>
                  <div className="flex items-center gap-1.5 transform hover:scale-105 transition-transform duration-300">
                    <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                    <span>100% gratuito</span>
                  </div>
                  <div className="flex items-center gap-1.5 transform hover:scale-105 transition-transform duration-300">
                    <DocumentArrowDownIcon className="w-5 h-5 text-purple-600" />
                    <span>PDF pronto</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Enhanced Mock UI */}
              <div className={`flex justify-center items-center mt-10 md:mt-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <FloatingCard>
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden border border-white/20">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-slate-800">Diagnóstico Rápido</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 animate-pulse">
                        <LightbulbIcon className="w-4 h-4 mr-1 text-green-600"/>
                        2 min
                      </span>
                    </div>

                    <div className="space-y-5">
                      <div className={`transition-all duration-500 ${mockUIStep >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <p className="text-sm font-medium text-slate-600 mb-1.5">Qual é o principal objetivo com esse treinamento?</p>
                        <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-blue-500 ring-2 ring-blue-200 rounded-lg p-3 flex items-center space-x-2 shadow-sm transform hover:scale-105 transition-transform duration-300">
                          <TrendUpIcon className="w-5 h-5 text-blue-600"/>
                          <span className="text-sm text-slate-700">Melhorar a performance técnica</span>
                        </div>
                      </div>

                      <div className={`transition-all duration-500 delay-300 ${mockUIStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <p className="text-sm font-medium text-slate-600 mb-1.5">Qual o perfil da maioria dos colaboradores da equipe?</p>
                        <div className="flex space-x-2">
                          <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-md transform hover:scale-105 transition-transform duration-300">
                            Analistas iniciantes
                          </span>
                          <span className="px-3 py-1 text-xs font-medium bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300 transition-colors duration-300">
                            Analistas experientes
                          </span>
                          <span className="px-3 py-1 text-xs font-medium bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300 transition-colors duration-300">
                            Líderes
                          </span>
                        </div>
                      </div>
                      
                      <div className={`transition-all duration-500 delay-600 ${mockUIStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                          <p className="text-sm font-medium text-slate-600 mb-1.5">Qual o nível atual de maturidade da equipe nesse tema?</p>
                          <div className="relative pt-1">
                              <div className="flex mb-1 items-center justify-between text-xs text-slate-500">
                                  <div>Totalmente iniciantes</div>
                                  <div>Muito experientes</div>
                              </div>
                              <div className="overflow-hidden h-3 mb-2 text-xs flex rounded-full bg-slate-200">
                                  <div 
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000 ease-out rounded-full"
                                    style={{ width: mockUIStep >= 2 ? "40%" : "0%" }}
                                  ></div>
                              </div>
                               <div className="text-right text-xs font-semibold text-blue-600">2/5</div>
                          </div>
                      </div>

                      <div className={`text-sm text-slate-500 pt-1 transition-all duration-500 delay-900 ${mockUIStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                          <span>Análise de competências...</span>
                        </div>
                      </div>
                    </div>

                    <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center text-sm transform hover:scale-105 transition-all duration-300 group">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">Continuar</span>
                      <ArrowRightIcon className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-300"/>
                    </button>
                  </div>
                </FloatingCard>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter target={2} />min
                </div>
                <p className="text-slate-600">Tempo médio de diagnóstico</p>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter target={94} suffix="%" />
                </div>
                <p className="text-slate-600">Precisão das recomendações</p>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter target={1500} />+
                </div>
                <p className="text-slate-600">Trilhas já criadas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose SkillMap Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
                Por que escolher o SkillMap AI?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Otimize o desenvolvimento de sua equipe com nossa plataforma intuitiva
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FloatingCard key={index} delay={index * 0.1}>
                  <div className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-slate-200 group cursor-pointer`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${feature.bgColor} ${feature.hoverColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </FloatingCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Pronto para transformar sua equipe?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Comece agora mesmo e veja como é simples criar trilhas de treinamento eficazes
              </p>
              <button
                onClick={onStartDiagnosis}
                className="group bg-white text-blue-600 hover:text-blue-700 font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center text-lg mx-auto relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-50 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                <PlayIcon className="w-5 h-5 mr-2.5 group-hover:animate-bounce relative z-10" />
                <span className="relative z-10">Começar Agora</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
