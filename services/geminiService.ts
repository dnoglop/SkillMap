
import { GoogleGenAI } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";
import type { FormData, NivelMaturidade, MetodoAvaliacaoImpacto } from '../types';

let apiKeyFromEnv: string | undefined = undefined;
let apiKeyFound: boolean = false;
let genAiInitializationError: Error | null = null;

// Try to get API_KEY, then common prefixed versions
if (typeof process !== 'undefined' && process.env) {
  if (typeof process.env.API_KEY === 'string' && process.env.API_KEY.trim() !== '') {
    apiKeyFromEnv = process.env.API_KEY;
    console.info("INFO: Usando API_KEY de process.env.API_KEY.");
  } else if (typeof process.env.NEXT_PUBLIC_API_KEY === 'string' && process.env.NEXT_PUBLIC_API_KEY.trim() !== '') {
    apiKeyFromEnv = process.env.NEXT_PUBLIC_API_KEY;
    console.info("INFO: Usando API_KEY de process.env.NEXT_PUBLIC_API_KEY.");
  } else if (typeof process.env.VITE_API_KEY === 'string' && process.env.VITE_API_KEY.trim() !== '') {
    apiKeyFromEnv = process.env.VITE_API_KEY;
    console.info("INFO: Usando API_KEY de process.env.VITE_API_KEY.");
  } else if (typeof process.env.REACT_APP_API_KEY === 'string' && process.env.REACT_APP_API_KEY.trim() !== '') {
    apiKeyFromEnv = process.env.REACT_APP_API_KEY;
    console.info("INFO: Usando API_KEY de process.env.REACT_APP_API_KEY.");
  }
}


let ai: GoogleGenAI | null = null;

if (apiKeyFromEnv) {
  apiKeyFound = true;
  try {
    ai = new GoogleGenAI({ apiKey: apiKeyFromEnv });
    console.info("INFO: Cliente GoogleGenAI inicializado com sucesso.");
  } catch (e) {
    console.error("ERRO CRÍTICO: Falha ao inicializar o cliente GoogleGenAI com a API_KEY fornecida. Detalhes:", e);
    if (e instanceof Error) {
        genAiInitializationError = e;
    } else {
        genAiInitializationError = new Error(String(e));
    }
    ai = null; // Ensure ai is null if initialization fails
  }
} else {
  apiKeyFound = false;
  console.warn(
    "AVISO: A variável de ambiente API_KEY (ou suas variações prefixadas como NEXT_PUBLIC_API_KEY, VITE_API_KEY) não foi encontrada ou 'process.env' não está acessível. " +
    "O serviço SkillMap AI necessita da API_KEY para funcionar. " +
    "Se esta mensagem aparece no browser, garanta que API_KEY (ou uma de suas versões prefixadas) é injetada no ambiente de execução do Vercel (ou sua plataforma de deploy), " +
    "ou o serviço de IA não funcionará."
  );
}

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

function buildPrompt(data: FormData): string {
  const sanitize = (text?: string): string => text ? text.replace(/\n+/g, '\n').trim() : 'Não especificado';

  return `Você é um conselheiro especialista em treinamento corporativo e Design de Experiência de Aprendizagem (LXD). Sua tarefa é gerar uma sugestão de trilha de treinamento personalizada com base nas seguintes informações da equipe. A resposta DEVE ser em Português do Brasil. Adote um tom de voz que ofereça dicas e possibilidades de melhoria, como um mentor experiente.

Informações da Equipe Fornecidas:
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
- Observações Adicionais do Usuário: ${sanitize(data.observacoesAdicionais) || "Nenhuma observação adicional fornecida."}

# Prompt Otimizado para Geração de Trilha de Treinamento

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

export const suggestTrainingPath = async (formData: FormData): Promise<string> => {
  if (!ai) {
    let specificReason = "";
    if (!apiKeyFound) {
      specificReason = "A Chave de API (API_KEY ou suas variações prefixadas como NEXT_PUBLIC_API_KEY) não foi encontrada no ambiente de execução. Verifique as configurações de variáveis de ambiente no Vercel (ou sua plataforma de deploy) e os logs do console. Certifique-se que a variável (ex: NEXT_PUBLIC_API_KEY) está corretamente definida e que um novo deploy foi feito após a alteração.";
    } else if (genAiInitializationError) {
      specificReason = `A Chave de API foi encontrada, mas a inicialização do serviço de IA falhou. Detalhe do erro: '${genAiInitializationError.message}'. Isso pode ser devido a uma chave inválida, API não habilitada no projeto Google Cloud, problemas de cota/faturamento, ou configuração incorreta da chave. Verifique os logs do console para mais detalhes e as configurações da sua chave no Google AI Studio ou Google Cloud Console.`;
    } else {
      // This case should ideally not be hit if the logic above is correct
      specificReason = "O serviço de IA não está inicializado por um motivo desconhecido, embora a chave de API pareça ter sido encontrada. Verifique os logs do console para mensagens de erro detalhadas.";
    }
    throw new Error(`O serviço SkillMap AI não está disponível. Causa provável: ${specificReason}`);
  }
  
  const prompt = buildPrompt(formData);
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17', 
      contents: prompt, 
      config: { 
        temperature: 0.65, 
        maxOutputTokens: 8000, 
        topP: 0.9, 
        topK: 45, 
      }
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

    // If the error was already one of our specific initialization errors, re-throw it.
    if (e instanceof Error && e.message.startsWith("O serviço SkillMap AI não está disponível")) {
      throw e;
    }

    let detailedErrorMessage: string;

    if (e instanceof Error) {
      detailedErrorMessage = `Falha ao gerar trilha de treinamento: ${e.message}`;
    } else if (typeof e === 'string') {
      detailedErrorMessage = `Falha ao gerar trilha de treinamento: ${e}`;
    } else {
      detailedErrorMessage = "Falha ao gerar trilha de treinamento devido a um erro desconhecido durante a chamada da API.";
    }
    
    if (e?.message?.toLowerCase().includes('api key') || e?.toString().toLowerCase().includes('api key not valid')) {
        detailedErrorMessage += ` Detalhe da API: Problema com a Chave de API (pode ser inválida, não autorizada ou com cotas excedidas).`;
    } else if (e?.message) {
        // Include specific API error message if available and not already part of the main message
        if (!detailedErrorMessage.includes(e.message)) {
            detailedErrorMessage += ` Detalhe da API: ${e.message}`;
        }
    }

    detailedErrorMessage += " Por favor, verifique as cotas da sua chave de API, conexão de rede e detalhes de entrada. Se o problema continuar, contate o suporte ou verifique o status do serviço.";
    throw new Error(detailedErrorMessage);
  }
};
