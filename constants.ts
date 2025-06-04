import { 
  ObjetivoPrincipal,
  PerfilEquipe,
  NivelMaturidade,
  TempoDisponivel,
  FormatoEngajador,
  ExperienciaTreinamentosAnteriores,
  MetodoAvaliacaoImpacto,
  UrgenciaAplicacao,
  CompetenciasChave
} from './types';

export const ALL_OBJETIVOS_PRINCIPAIS: ObjetivoPrincipal[] = Object.values(ObjetivoPrincipal);
export const ALL_PERFIS_EQUIPE: PerfilEquipe[] = Object.values(PerfilEquipe);
export const ALL_NIVEIS_MATURIDADE: { value: NivelMaturidade, label: string }[] = [
  { value: NivelMaturidade.Iniciantes, label: "1 - Totalmente iniciantes" },
  { value: NivelMaturidade.PoucoExperientes, label: "2" },
  { value: NivelMaturidade.Intermediario, label: "3" },
  { value: NivelMaturidade.Experientes, label: "4" },
  { value: NivelMaturidade.MuitoExperientes, label: "5 - Muito experientes, precisam de atualização pontual" },
];
export const ALL_TEMPOS_DISPONIVEIS: TempoDisponivel[] = Object.values(TempoDisponivel);
export const ALL_FORMATOS_ENGAJADORES: FormatoEngajador[] = Object.values(FormatoEngajador);
export const ALL_EXPERIENCIAS_TREINAMENTOS_ANTERIORES: ExperienciaTreinamentosAnteriores[] = Object.values(ExperienciaTreinamentosAnteriores);
export const ALL_METODOS_AVALIACAO_IMPACTO: MetodoAvaliacaoImpacto[] = Object.values(MetodoAvaliacaoImpacto);
export const ALL_URGENCIAS_APLICACAO: UrgenciaAplicacao[] = Object.values(UrgenciaAplicacao);
export const ALL_COMPETENCIAS_CHAVE: CompetenciasChave[] = Object.values(CompetenciasChave);

export const TOTAL_PROGRESS_QUESTIONS = 10; // Q1 a Q9 + Nova pergunta "timeDepartamento" (Q0 ou Q1.1)