
import { GoogleGenAI } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";
import type { FormData, NivelMaturidade } from '../types';

let ai: GoogleGenAI | null = null; // Module-level cache for the initialized client
let lastInitializationError: Error | null = null; // Store the last error during initialization attempt

// Helper to get the API key from window.SKILLMAP_CONFIG
const getApiKeyFromConfig = (): { key: string | undefined, source: string, placeholderDetected: boolean } => {
  if (typeof window !== 'undefined' && (window as any).SKILLMAP_CONFIG) {
    const configKey = (window as any).SKILLMAP_CONFIG.API_KEY;
    if (typeof configKey === 'string' && configKey.trim() !== '') {
      if (configKey.trim() === "__MANUAL_API_KEY_PLACEHOLDER__") {
        return { key: undefined, source: "window.SKILLMAP_CONFIG.API_KEY (placeholder)", placeholderDetected: true };
      }
      return { key: configKey, source: "window.SKILLMAP_CONFIG.API_KEY (do index.html)", placeholderDetected: false };
    }
  }
  return { key: undefined, source: "Não encontrada ou inválida", placeholderDetected: false };
};

const getAiClient = (): GoogleGenAI => {
  if (ai) {
    // console.log("INFO (geminiService - getAiClient): Retornando cliente GoogleGenAI cacheado.");
    return ai; 
  }

  lastInitializationError = null; 
  const { key: apiKeyString, source: apiKeySourceString, placeholderDetected } = getApiKeyFromConfig();

  if (apiKeyString) {
    console.info(`INFO (geminiService - getAiClient): Tentando inicializar GoogleGenAI. Fonte da chave: ${apiKeySourceString}. (Valor omitido)`);
    try {
      ai = new GoogleGenAI({ apiKey: apiKeyString });
      console.info("INFO (geminiService - getAiClient): Cliente GoogleGenAI inicializado com sucesso.");
      return ai;
    } catch (e) {
      console.error(`ERRO CRÍTICO (geminiService - getAiClient): Falha ao inicializar o cliente GoogleGenAI com a API_KEY obtida de ${apiKeySourceString}. Detalhes:`, e);
      if (e instanceof Error) {
        lastInitializationError = e;
      } else {
        lastInitializationError = new Error(String(e));
      }
      ai = null; 
      throw new Error(`Falha na inicialização do serviço Gemini: ${lastInitializationError.message}`);
    }
  } else {
    let errorMsg = "";
    if (placeholderDetected) {
        errorMsg = "A Chave de API (API_KEY) em window.SKILLMAP_CONFIG.API_KEY ainda contém o valor placeholder '__MANUAL_API_KEY_PLACEHOLDER__'. \n" +
                   "Isso indica que a substituição da chave durante o processo de build no Vercel (ou sua plataforma de deploy) falhou ou não foi configurada corretamente. \n" +
                   "Verifique: \n" +
                   "  1. Se a variável de ambiente (ex: NEXT_PUBLIC_API_KEY) está definida no seu projeto Vercel. \n" +
                   "  2. Se o 'Build Command' no Vercel (ex: `sed -i \"s|__MANUAL_API_KEY_PLACEHOLDER__|\${NEXT_PUBLIC_API_KEY}|g\" index.html`) está correto e sendo executado. \n" +
                   "  3. Os logs de build do Vercel para quaisquer erros durante a substituição.";
    } else {
        errorMsg = "A Chave de API (API_KEY) não foi encontrada em window.SKILLMAP_CONFIG.API_KEY no momento da utilização. \n" +
                   "Isso pode ocorrer se a chave não foi injetada corretamente no 'index.html' ou se 'window.SKILLMAP_CONFIG' não está acessível. \n" +
                   "Verifique as etapas de configuração da API Key mencionadas anteriormente e os logs do 'API Key injector (index.tsx)' no console.";
    }
    console.warn("AVISO (geminiService - getAiClient): " + errorMsg);
    lastInitializationError = new Error(errorMsg);
    throw new Error("Chave de API não configurada ou inválida para o serviço Gemini.");
  }
};

function nivelMaturidadeLabel(nivel?: NivelMaturidade): string {
  if (nivel === undefined) return 'Não especificado';
  switch (nivel) {
    case 1: return "1 - Totalmente iniciantes";
    case 2: return "2";
    case 3: return "3";
    case 4: return "4";
    case 5: return "5 - Muito experientes, precisam de atualização pontual";
    default: return 'Não especificado';
  }
}

function buildPrompt(data: FormData, analyzedObservationsSummary?: string): string {
  const sanitize = (text?: string): string => text ? text.replace(/\n+/g, '\n').trim() : 'Não especificado';

  let additionalInsightsSection = "";
  if (analyzedObservationsSummary &&
      analyzedObservationsSummary.trim() !== "" &&
      analyzedObservationsSummary.trim() !== "Nenhuma observação adicional fornecida para análise.") {
    additionalInsightsSection = `

## Insights Adicionais Derivados das Observações do Usuário
A análise das observações adicionais fornecidas pelo usuário destacou os seguintes pontos:
${analyzedObservationsSummary}
Considere estes pontos ao formular sua sugestão de trilha.
`;
  }

  const introPart = `Você é um conselheiro especialista em treinamento corporativo e Design de Experiência de Aprendizagem (LXD). Sua tarefa é gerar uma sugestão de trilha de treinamento personalizada com base nas seguintes informações da equipe. A resposta DEVE ser em Português do Brasil. Adote um tom de voz que ofereça dicas e possibilidades de melhoria, como um mentor experiente.`;

  const teamInfoPart = `Informações da Equipe Fornecidas:
- Time/Departamento: ${sanitize(data.timeDepartamento)}
- Principal Objetivo com o Treinamento: ${sanitize(data.objetivoPrincipal)}
- Perfil da Maioria dos Colaboradores: ${sanitize(data.perfilEquipe)}
- Nível Atual de Maturidade da Equipe no Tema: ${nivelMaturidadeLabel(data.maturidadeEquipe)}
- Tempo Semanal Dedicado ao Treinamento: ${sanitize(data.tempoSemanalDedicado)}
- Formatos que Mais Engajam a Equipe: ${data.formatosEngajadores.length > 0 ? data.formatosEngajadores.join(', ') : 'Não especificado'}
- Experiência Anterior com Treinamentos: ${sanitize(data.experienciaTreinamentosAnteriores)}
- Método Desejado para Avaliar Impacto: ${sanitize(data.metodoAvaliacaoImpacto)}
- Urgência para Aplicar o Treinamento: ${sanitize(data.urgenciaAplicacao)}
- Competências Chave a Desenvolver: ${data.competenciasDesenvolver.length > 0 ? data.competenciasDesenvolver.join(', ') : 'Não especificado'}
- Observações Adicionais do Usuário: ${sanitize(data.observacoesAdicionais) || "Nenhuma observação adicional fornecida."}`;

  const mainPromptStructure = `# Prompt Otimizado para Geração de Trilha de Treinamento

## Contexto
Você é um especialista em design instrucional que criará uma trilha de treinamento personalizada com base nos dados fornecidos. Use metodologias reconhecidas (ADDIE, LXD, Kirkpatrick) e mantenha foco prático e acionável.

## Instruções de Formato
- Use markdown simples: ## para seções, ### para módulos, * para listas.
- Tom profissional, consultivo e encorajador.
- Respostas em português brasileiro.
- Mantenha clareza e objetividade.
- Parágrafos de aproximadamente 4 linhas.
- Não use negrito, nenhuma edição no texto.
- A cada final de parágrafo, deixe uma linha de distancia do próximo parágrafo.

## Estrutura da Resposta

### 1. Introdução (2-3 linhas)
Comece com um resumo breve e introdutório de como a trilha gerada vai ajudar. Conecte aos objetivos identificados.

### 2. Análise do Contexto
- Apresente seu entendimento das necessidades mapeadas.
- Destaque pontos críticos que a trilha endereçará.
- Descreva o perfil do público-alvo e suas implicações para o design da trilha.

### 3. Trilha de Treinamento Sugerida (Recomende de 3 a 5 módulos)

Para cada módulo, inclua:

**### [Nome Conciso e Impactante do Módulo]**

**Propósito:** Qual o objetivo principal deste módulo? Qual sua relevância para o objetivo geral do treinamento e que resultados os participantes podem esperar ao concluí-lo?

**Principais Tópicos/Atividades:**
* [Tópico chave 1: Descrição concisa e o que será coberto]
* [Tópico chave 2: Inclua sugestão de atividade prática ou estudo de caso relevante]
* [Tópico chave 3: Foco em como aplicar o conhecimento no dia a dia]

**Metodologias de Transmissão do Conhecimento:**
* [Sugestão de como aplicar princípios de design de aprendizagem (ex: LXD, microlearning) neste módulo]
* [Técnicas específicas (ex: gamificação leve, simulações, debates guiados, storytelling)]
* [Estratégias para engajamento e retenção de conhecimento (ex: perguntas reflexivas, feedback imediato)]

**Observação Adicional:** (Opcional: Se houver alguma consideração específica para este módulo, como pré-requisitos, ferramentas úteis, ou tempo estimado se diferir do padrão)

## Implementação e Avaliação

INÍCIO DO BLOCO DE RESUMO DO DIAGNÓSTICO:
[Forneça aqui uma síntese das principais oportunidades de desenvolvimento identificadas e como a trilha proposta as aborda.]

INÍCIO DO BLOCO DE DICAS PRÁTICAS:
[Apresente as seguintes dicas em formato de lista com bullets (*)]
* Orientações práticas para a execução efetiva da trilha no dia a dia da equipe.
* Preparação necessária antes de iniciar (comunicação, agendamento, materiais).
* Como comunicar a trilha para a equipe de forma engajadora.
* Recursos ou suportes adicionais que podem ser úteis.

INÍCIO DO BLOCO DE AVALIAÇÃO KIRKPATRICK:
[Explique cada nível do modelo de Kirkpatrick, relacionando com o método de avaliação escolhido pelo usuário (${data.metodoAvaliacaoImpacto}), e use bullets (*). Para cada nível, adicione sub-bullets para exemplos práticos.]
* **Nível 1 - Reação:** Como medir a satisfação e percepção inicial dos participantes.
  * Exemplo: Pesquisas de feedback curtas ao final de cada módulo.

* **Nível 2 - Aprendizado:** Como avaliar o conhecimento e habilidades adquiridas.
  * Exemplo: Quizzes rápidos ou testes práticos baseados nos tópicos.

* **Nível 3 - Comportamento:** Como observar se o aprendizado está sendo aplicado no trabalho.
  * Exemplo: Observação direta de comportamentos no dia a dia.

* **Nível 4 - Resultados:** Como medir o impacto da trilha nos objetivos do negócio.
  * Exemplo: Análise de KPIs organizacionais relevantes (produtividade, qualidade, engajamento).

INÍCIO DO BLOCO DE ACOMPANHAMENTO CONTÍNUO:
[Descreva estratégias para um ciclo de melhoria contínua e como fazer ajustes necessários na trilha ao longo do tempo. Por exemplo, reuniões de follow-up, revisão periódica dos materiais, etc.]

FRASE DE MOTIVAÇÃO: [Crie uma frase de motivação e incentivo, usando o contexto do time/departamento ${data.timeDepartamento} e o objetivo do treinamento ${data.objetivoPrincipal}. Faça ser inspiradora e encorajadora.]
`;
}

export const suggestTrainingPath = async (formData: FormData, analyzedObservationsSummary?: string): Promise<string> => {
  let currentAiClient: GoogleGenAI;
  try {
    currentAiClient = getAiClient();
  } catch (initError: any) {
    // Erro originado de getAiClient (chave não encontrada ou falha na inicialização)
    // lastInitializationError já deve estar definido por getAiClient
    const reason = lastInitializationError?.message || initError.message || "Erro desconhecido durante a configuração do serviço de IA.";
    throw new Error(`O serviço SkillMap AI não está disponível. Razão: ${reason}`);
  }
  
  const prompt = buildPrompt(formData, analyzedObservationsSummary);
  
  try {
    const generationConfig = {
        temperature: 0.65, 
        maxOutputTokens: 8000, 
        topP: 0.9, 
        topK: 45, 
    };
    const response: GenerateContentResponse = await currentAiClient.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: [{ role: "user", parts: [{text: prompt}] }],
      generationConfig: generationConfig,
    });
    
    let textResponse = response.text; 

    if (!textResponse || textResponse.trim() === "") {
      console.warn("API Gemini retornou uma resposta vazia ou apenas com espaços em branco para o prompt:", prompt);
      const troubleshootingMsg = "A IA gerou uma resposta vazia. Isso pode ser devido a uma entrada excessivamente restritiva, um problema temporário com o serviço de IA ou dados inesperados. Por favor, tente refinar sua entrada ou tente novamente mais tarde. Se o problema persistir, verifique os logs da aplicação.";
      throw new Error(troubleshootingMsg);
    }
    
    textResponse = textResponse.replace(/\*\*\*\*/g, '').replace(/\*\*/g, '');

    return textResponse;

  } catch (e: any) {
    console.error("Erro ao chamar a API Gemini:", e);

    // Se o erro já é o nosso erro customizado de 'serviço não disponível' vindo de getAiClient, apenas relança.
    if (e instanceof Error && e.message.startsWith("O serviço SkillMap AI não está disponível")) {
      throw e;
    }
    // Se o erro veio da falha de inicialização dentro de getAiClient, mas não foi encapsulado acima.
    if (lastInitializationError && e.message === `Falha na inicialização do serviço Gemini: ${lastInitializationError.message}`) {
        throw new Error(`O serviço SkillMap AI não está disponível. Razão: ${lastInitializationError.message}`);
    }


    let detailedErrorMessage: string;

    if (e instanceof Error) {
      detailedErrorMessage = `Falha ao gerar trilha de treinamento: ${e.message}`;
    } else if (typeof e === 'string') {
      detailedErrorMessage = `Falha ao gerar trilha de treinamento: ${e}`;
    } else {
      detailedErrorMessage = "Falha ao gerar trilha de treinamento devido a um erro desconhecido durante a chamada da API.";
    }
    
    // Adiciona informações sobre problemas comuns da API Key se detectados na mensagem de erro original
    const errorMessageLower = e?.message?.toLowerCase() || e?.toString().toLowerCase();
    if (errorMessageLower.includes('api key') || errorMessageLower.includes('api key not valid') || errorMessageLower.includes('permission denied')) {
        detailedErrorMessage += ` Detalhe da API: Problema com a Chave de API (pode ser inválida, não autorizada, com permissões incorretas ou com cotas excedidas). Verifique as configurações da chave no Google Cloud Console.`;
    } else if (e?.message) { 
        if (!detailedErrorMessage.includes(e.message)) { 
            detailedErrorMessage += ` Detalhe da API: ${e.message}`;
        }
    }

    detailedErrorMessage += " Por favor, verifique também as cotas da sua chave de API, conexão de rede e detalhes de entrada. Se o problema continuar, contate o suporte ou verifique o status do serviço Gemini.";
    throw new Error(detailedErrorMessage);
  }
};

export const analyzeObservations = async (observations: string): Promise<string> => {
  if (!observations || observations.trim() === "") {
    return "Nenhuma observação adicional fornecida para análise.";
  }

  let currentAiClient: GoogleGenAI;
  try {
    currentAiClient = getAiClient();
  } catch (initError: any) {
    const reason = lastInitializationError?.message || initError.message || "Erro desconhecido durante a configuração do serviço de IA.";
    throw new Error(`Serviço de análise de observações não disponível. Razão: ${reason}`);
  }

  const analysisPrompt = `Você é um assistente de IA especializado em identificar os pontos cruciais em textos. Analise as seguintes observações de um usuário e retorne um resumo conciso dos temas principais, preocupações ou solicitações específicas em Português do Brasil. Formate como bullet points curtos se possível, ou um pequeno parágrafo se fizer mais sentido. Observações: "${observations}"`;

  try {
    const response: GenerateContentResponse = await currentAiClient.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17', // Consistent with suggestTrainingPath
      contents: [{ role: "user", parts: [{ text: analysisPrompt }] }], // Corrected contents format
      generationConfig: { // Corrected config property name
        temperature: 0.5,
        maxOutputTokens: 500,
        topP: 0.9,
        topK: 40,
      }
    });

    const textResponse = response.text;

    if (!textResponse || textResponse.trim() === "") {
      console.warn("API Gemini retornou uma resposta vazia ou apenas com espaços em branco para a análise de observações:", analysisPrompt);
      throw new Error("A IA gerou uma resposta vazia para a análise das observações.");
    }

    return textResponse.trim();

  } catch (e: any) {
    console.error("Erro ao chamar a API Gemini para analisar observações:", e);
    if (e instanceof Error && e.message.startsWith("Serviço de análise de observações não disponível")) {
      throw e;
    }
    if (lastInitializationError && e.message === `Falha na inicialização do serviço Gemini: ${lastInitializationError.message}`) {
        throw new Error(`Serviço de análise de observações não disponível. Razão: ${lastInitializationError.message}`);
    }

    let detailedErrorMessage: string;
    if (e instanceof Error) {
      detailedErrorMessage = `Falha ao analisar observações: ${e.message}`;
    } else if (typeof e === 'string') {
      detailedErrorMessage = `Falha ao analisar observações: ${e}`;
    } else {
      detailedErrorMessage = "Falha ao analisar observações devido a um erro desconhecido durante a chamada da API.";
    }

    const errorMessageLower = e?.message?.toLowerCase() || e?.toString().toLowerCase();
    if (errorMessageLower.includes('api key') || errorMessageLower.includes('api key not valid') || errorMessageLower.includes('permission denied')) {
        detailedErrorMessage += ` Detalhe da API: Problema com a Chave de API.`;
    } else if (e?.message) {
        if (!detailedErrorMessage.includes(e.message)) {
            detailedErrorMessage += ` Detalhe da API: ${e.message}`;
        }
    }
    throw new Error(detailedErrorMessage);
  }
};