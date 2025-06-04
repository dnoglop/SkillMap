export enum ObjetivoPrincipal {
  MelhorarPerformanceTecnica = "Melhorar a performance técnica",
  DesenvolverSoftSkills = "Desenvolver soft skills (liderança, comunicação, etc.)",
  EngajarMotivarEquipe = "Engajar e motivar a equipe",
  AumentarProdutividadeFoco = "Aumentar produtividade e foco",
  PrepararNovaFuncao = "Preparar para uma nova função",
}

export enum PerfilEquipe {
  JovensAprendizesEstagiarios = "Jovens aprendizes / Estagiários",
  AnalistasIniciantes = "Analistas iniciantes",
  AnalistasExperientes = "Analistas experientes",
  CoordenadoresLideres = "Coordenadores ou líderes",
  Multinivel = "Multinível (misturado)",
}

export enum NivelMaturidade {
  Iniciantes = 1,
  PoucoExperientes = 2,
  Intermediario = 3,
  Experientes = 4,
  MuitoExperientes = 5,
}

export enum TempoDisponivel {
  Menos30Min = "Menos de 30 minutos",
  De30MinA1Hora = "30 minutos a 1 hora",
  De1A2Horas = "1 a 2 horas",
  MaisDe2Horas = "Mais de 2 horas",
}

export enum FormatoEngajador {
  VideosCurtos = "Vídeos curtos e dinâmicos",
  JogosQuizzes = "Jogos, quizzes e interações",
  LeituraTextosArtigos = "Leitura de textos/artigos",
  OficinasPresenciaisOnline = "Oficinas presenciais ou online",
  PodcastsAudios = "Podcasts ou áudios rápidos",
}

export enum ExperienciaTreinamentosAnteriores {
  SimRegularmente = "Sim, regularmente",
  SimEsporadicamente = "Sim, mas de forma esporádica",
  NaoPrimeiraVez = "Não, será a primeira vez",
}

export enum MetodoAvaliacaoImpacto {
  TestesQuizzes = "Testes ou quizzes de conhecimento",
  AvaliacaoDesempenhoPosTreinamento = "Avaliação de desempenho pós-treinamento",
  AutoavaliacaoParticipantes = "Autoavaliação dos participantes",
  Feedback360 = "Feedback 360º (liderança/equipe)",
  NaoSeiAvaliar = "Não sei como avaliar ainda",
}

export enum UrgenciaAplicacao {
  Alta = "Alta (até 1 semana)",
  Media = "Média (1 a 2 semanas)",
  Baixa = "Baixa (sem prazo definido)",
}

export enum CompetenciasChave {
  Lideranca = "Liderança",
  Comunicacao = "Comunicação",
  TrabalhoEmEquipe = "Trabalho em equipe",
  ResolucaoDeProblemas = "Resolução de problemas",
  InteligenciaEmocional = "Inteligência emocional",
  AtendimentoAoCliente = "Atendimento ao cliente",
  CriatividadeInovacao = "Criatividade e inovação",
  PensamentoAnalitico = "Pensamento analítico",
}

export interface FormData {
  // Bloco 1: Contexto do Time
  timeDepartamento?: string; // Nova pergunta
  objetivoPrincipal?: ObjetivoPrincipal;
  perfilEquipe?: PerfilEquipe;
  maturidadeEquipe?: NivelMaturidade;

  // Bloco 2: Tempo e Formato
  tempoSemanalDedicado?: TempoDisponivel;
  formatosEngajadores: FormatoEngajador[]; // Max 2
  experienciaTreinamentosAnteriores?: ExperienciaTreinamentosAnteriores;

  // Bloco 3: Avaliação e Resultados
  metodoAvaliacaoImpacto?: MetodoAvaliacaoImpacto;
  urgenciaAplicacao?: UrgenciaAplicacao;

  // Bloco 4: Prioridade de Competências
  competenciasDesenvolver: CompetenciasChave[]; // Max 2
  observacoesAdicionais: string;
}

export type TrainingPath = string; // Raw string output from Gemini