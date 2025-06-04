
import React, { useMemo, useEffect, useState } from 'react';
import { jsPDF, TextOptionsLight } from 'jspdf'; // Added TextOptionsLight for text alignment

// --- Helper Icons for TrainingPathDisplay ---

const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const UsersIconDisplay: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-3.741-5.702m-3.74 0a3 3 0 00-5.703 0m5.703 0a3 3 0 01-5.703 0M9.75 6.75a3 3 0 11-6 0 3 3 0 016 0zM17.25 9.75a3 3 0 11-6 0 3 3 0 016 0zM13.5 18.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 12h9.75M10.5 18h9.75M3.75 6.75h.008v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12.75h.008v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 18.75h.008v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const ClipboardCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.828 4.972A4.506 4.506 0 007.5 4.5h-1.5a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 006 19.5h1.5m4.328-14.528A4.506 4.506 0 0113.5 4.5h1.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-1.5m-4.328-14.528V19.5M9 9.75l3 3m0 0l3-3m-3 3V3.75" />
  </svg>
);

const TargetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.75a3 3 0 11-6 0 3 3 0 016 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ListBulletIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 17.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);

const AcademicCapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
);

const InformationCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);

const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311V21m-3.75 0q.104.02.214.044M12 3c-3.866 0-7 3.134-7 7 0 1.894.743 3.63 1.969 4.92L6.5 16.5h11l-1.469-1.58A6.965 6.965 0 0019 10c0-3.866-3.134-7-7-7z" />
    </svg>
);
  
const PresentationChartLineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 21h16.5M11.25 3.75h1.5m3.75 0h1.5M5.25 3.75h1.5M7.5 21v-5.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.25m19.5 0h-2.25m0 0l-1.875-3.75M12 13.5l.778-1.556a2.251 2.251 0 012.966-.778l.222.111a2.25 2.25 0 002.966-.778L21 9.75M12 13.5V21" />
    </svg>
);

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17.437 9.154a4.5 4.5 0 01-3.09-3.09L12 1.25l-.813 2.846a4.5 4.5 0 01-3.09 3.09L5.25 9l2.846.813a4.5 4.5 0 013.09 3.09L12 15.75l.813-2.846a4.5 4.5 0 013.09-3.09L22.75 9l-2.846-.813a4.5 4.5 0 01-3.09-3.09L15 1.25l-.813 2.846a4.5 4.5 0 01-3.09 3.09L9 5.25" />
    </svg>
);

const ArrowPathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
// --- End Helper Icons ---

interface TrainingPathDisplayProps {
  path: string;
}

const PDF_PARSE_KEYWORDS = { 
  SECTION_TITLE_H2: "## ",
  MODULE_TITLE_H3: "### ",
  LIST_ITEM: "* ",
  PURPOSE: "propósito:",
  METHODOLOGIES: "metodologias de transmissão do conhecimento:",
  ADDITIONAL_NOTE: "observação adicional:",
};

const IMPLEMENTATION_BLOCK_KEYWORDS = {
    RESUMO_DIAGNOSTICO: "INÍCIO DO BLOCO DE RESUMO DO DIAGNÓSTICO:",
    DICAS_PRATICAS: "INÍCIO DO BLOCO DE DICAS PRÁTICAS:",
    AVALIACAO_KIRKPATRICK: "INÍCIO DO BLOCO DE AVALIAÇÃO KIRKPATRICK:",
    ACOMPANHAMENTO_CONTINUO: "INÍCIO DO BLOCO DE ACOMPANHAMENTO CONTÍNUO:",
};

const MOTIVATIONAL_PHRASE_KEYWORD = "FRASE DE MOTIVAÇÃO:";

type ImplementationBlockKey = keyof typeof IMPLEMENTATION_BLOCK_KEYWORDS;

interface ImplementationBlock {
  titleKey: ImplementationBlockKey;
  title: string;
  content: string[];
  icon?: React.ReactNode; // Web icon, not directly used in PDF
}

interface ParsedItem {
  type: 'intro' | 'section' | 'module' | 'paragraph' | 'subheading' | 'motivational';
  title?: string; 
  content?: string; 
  items?: string[]; 
  moduleParts?: { 
    purpose?: string[];
    topics?: string[];
    methodologies?: string[];
    additionalNote?: string[];
  };
  icon?: React.ReactNode; // Web icon
  implementationBlocks?: ImplementationBlock[];
}

const parseContentToStructuredNodes = (rawContent: string): ParsedItem[] => {
  const content = rawContent.replace(/\*\*\*\*/g, '').replace(/\*\*/g, '');
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const structuredItems: ParsedItem[] = [];
  
  let currentModule: ParsedItem | null = null;
  let currentModulePart: keyof NonNullable<ParsedItem['moduleParts']> | null = null;
  let isFirstParagraph = true;
  let currentImplementationSection: ParsedItem | null = null;
  let currentImplementationBlockKey: ImplementationBlockKey | null = null;

  const implementationBlockConfig: Record<ImplementationBlockKey, {title: string, icon: React.ReactNode}> = {
    RESUMO_DIAGNOSTICO: { title: "Resumo do Diagnóstico", icon: <ClipboardCheckIcon className="w-6 h-6" /> },
    DICAS_PRATICAS: { title: "Dicas Práticas para Implementação", icon: <LightBulbIcon className="w-6 h-6" /> },
    AVALIACAO_KIRKPATRICK: { title: "Avaliando o Sucesso da Trilha (Modelo Kirkpatrick)", icon: <PresentationChartLineIcon className="w-6 h-6" /> },
    ACOMPANHAMENTO_CONTINUO: { title: "Acompanhamento Contínuo", icon: <ArrowPathIcon className="w-6 h-6" /> },
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith(MOTIVATIONAL_PHRASE_KEYWORD)) {
        if (currentModule) { structuredItems.push(currentModule); currentModule = null; }
        if (currentImplementationSection) { structuredItems.push(currentImplementationSection); currentImplementationSection = null; }
        structuredItems.push({ type: 'motivational', content: trimmedLine.substring(MOTIVATIONAL_PHRASE_KEYWORD.length).trim() });
        continue;
    }
    
    if (currentImplementationSection) {
        let keywordFound = false;
        for (const key in IMPLEMENTATION_BLOCK_KEYWORDS) {
            const typedKey = key as ImplementationBlockKey;
            const keyword = IMPLEMENTATION_BLOCK_KEYWORDS[typedKey];
            if (trimmedLine.startsWith(keyword)) {
                currentImplementationBlockKey = typedKey;
                const config = implementationBlockConfig[typedKey];
                currentImplementationSection.implementationBlocks?.push({ 
                    titleKey: typedKey, 
                    title: config.title, 
                    content: [], 
                    icon: config.icon 
                });
                const contentAfterKeyword = trimmedLine.substring(keyword.length).trim();
                if (contentAfterKeyword && currentImplementationSection.implementationBlocks?.length) {
                    currentImplementationSection.implementationBlocks[currentImplementationSection.implementationBlocks.length - 1].content.push(contentAfterKeyword);
                }
                keywordFound = true;
                break;
            }
        }
        if (keywordFound) continue;

        if (currentImplementationBlockKey && currentImplementationSection.implementationBlocks?.length) {
            const block = currentImplementationSection.implementationBlocks[currentImplementationSection.implementationBlocks.length - 1];
            if (trimmedLine.startsWith("* ")) {
                block.content.push(trimmedLine); 
            } else {
                if (block.content.length > 0 && !trimmedLine.startsWith("* ") && block.content[block.content.length-1].startsWith("* ")) {
                    block.content.push(trimmedLine); // New paragraph after list
                } else if (block.content.length > 0 && !block.content[block.content.length-1].startsWith("* ")) {
                     block.content[block.content.length-1] += `\n${trimmedLine}`; // Continue paragraph
                } else {
                     block.content.push(trimmedLine); // Start new paragraph
                }
            }
            continue;
        }
    }


    if (isFirstParagraph && !trimmedLine.startsWith(PDF_PARSE_KEYWORDS.SECTION_TITLE_H2)) {
        if (structuredItems.findIndex(item => item.type === 'intro') === -1) {
            structuredItems.push({ type: 'intro', content: trimmedLine });
        } else if (structuredItems[structuredItems.length -1].type === 'intro') {
            (structuredItems[structuredItems.length -1] as ParsedItem).content += `\n${trimmedLine}`;
        }
        continue; 
    }
    isFirstParagraph = false; 


    if (trimmedLine.startsWith(PDF_PARSE_KEYWORDS.SECTION_TITLE_H2)) {
      if (currentModule) { structuredItems.push(currentModule); currentModule = null; }
      if (currentImplementationSection) { structuredItems.push(currentImplementationSection); currentImplementationSection = null; }
      
      const title = trimmedLine.substring(PDF_PARSE_KEYWORDS.SECTION_TITLE_H2.length).trim();
      let icon: React.ReactNode;
      if (title.toLowerCase().includes("análise do contexto")) icon = <EyeIcon className="w-6 h-6"/>;
      else if (title.toLowerCase().includes("análise do público")) icon = <UsersIconDisplay className="w-6 h-6"/>;
      else if (title.toLowerCase().includes("trilha de treinamento sugerida")) icon = <PathIcon className="w-6 h-6"/>;
      else if (title.toLowerCase().includes("implementação e avaliação")) {
          icon = <ClipboardCheckIcon className="w-6 h-6"/>; 
          currentImplementationSection = { type: 'section', title, icon, implementationBlocks: [] };
          currentImplementationBlockKey = null; 
          continue; 
      } else {
         icon = <InformationCircleIcon className="w-6 h-6" />; 
      }
      structuredItems.push({ type: 'section', title, icon });
      currentModulePart = null;
    } else if (trimmedLine.startsWith(PDF_PARSE_KEYWORDS.MODULE_TITLE_H3)) {
      if (currentModule) { structuredItems.push(currentModule); }
      if (currentImplementationSection) { structuredItems.push(currentImplementationSection); currentImplementationSection = null; } 
      currentModule = {
        type: 'module',
        title: trimmedLine.substring(PDF_PARSE_KEYWORDS.MODULE_TITLE_H3.length).trim(),
        moduleParts: { purpose: [], topics: [], methodologies: [], additionalNote: [] }
      };
      currentModulePart = null; 
    } else if (currentModule) {
      const lowerLine = trimmedLine.toLowerCase();
      if (lowerLine.startsWith(PDF_PARSE_KEYWORDS.PURPOSE)) {
        currentModulePart = 'purpose';
        const content = trimmedLine.substring(PDF_PARSE_KEYWORDS.PURPOSE.length).trim();
        if (content && currentModule.moduleParts?.purpose) currentModule.moduleParts.purpose.push(content);
      } else if (lowerLine.startsWith("principais tópicos/atividades:")) {
        currentModulePart = 'topics';
         const content = trimmedLine.substring("principais tópicos/atividades:".length).trim();
         if (content && currentModule.moduleParts?.topics) currentModule.moduleParts.topics.push(content); 
      } else if (lowerLine.startsWith(PDF_PARSE_KEYWORDS.METHODOLOGIES)) {
        currentModulePart = 'methodologies';
        const content = trimmedLine.substring(PDF_PARSE_KEYWORDS.METHODOLOGIES.length).trim();
        if (content && currentModule.moduleParts?.methodologies) currentModule.moduleParts.methodologies.push(content);
      } else if (lowerLine.startsWith(PDF_PARSE_KEYWORDS.ADDITIONAL_NOTE)) {
        currentModulePart = 'additionalNote';
        const content = trimmedLine.substring(PDF_PARSE_KEYWORDS.ADDITIONAL_NOTE.length).trim();
        if (content && currentModule.moduleParts?.additionalNote) currentModule.moduleParts.additionalNote.push(content);
      } else if (trimmedLine.startsWith(PDF_PARSE_KEYWORDS.LIST_ITEM)) {
        const itemContent = trimmedLine.substring(PDF_PARSE_KEYWORDS.LIST_ITEM.length).trim();
        if (currentModulePart && currentModule.moduleParts?.[currentModulePart]) {
          currentModule.moduleParts[currentModulePart]?.push(`${PDF_PARSE_KEYWORDS.LIST_ITEM}${itemContent}`);
        } else if (currentModule.moduleParts?.topics) { 
          currentModule.moduleParts.topics.push(`${PDF_PARSE_KEYWORDS.LIST_ITEM}${itemContent}`);
        }
      } else { 
        if (currentModulePart && currentModule.moduleParts?.[currentModulePart]) {
            const partArray = currentModule.moduleParts[currentModulePart];
            if (partArray && partArray.length > 0 && !partArray[partArray.length -1].startsWith(PDF_PARSE_KEYWORDS.LIST_ITEM)){ 
                 partArray[partArray.length -1] += `\n${trimmedLine}`;
            } else {
                 partArray?.push(trimmedLine);
            }
        } else if (currentModule.moduleParts?.purpose && currentModule.moduleParts.purpose.length === 0) {
           currentModule.moduleParts.purpose.push(trimmedLine); 
        }
      }
    } else if (structuredItems.length > 0 && structuredItems[structuredItems.length -1].type === 'section' && !currentImplementationSection) {
       const lastItem = structuredItems[structuredItems.length -1];
       if(lastItem.content) lastItem.content += `\n${trimmedLine}`;
       else lastItem.content = trimmedLine;

    } else if (!currentImplementationSection) { 
      structuredItems.push({ type: 'paragraph', content: trimmedLine });
    }
  }

  if (currentModule) structuredItems.push(currentModule);
  if (currentImplementationSection) structuredItems.push(currentImplementationSection);
  
  return structuredItems;
};


const generatePdf = (reportTitle: string, nodes: ParsedItem[]) => {
  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  
  // Simplified Styles
  const MARGIN = 10; // mm
  const FONT_SIZE_MAIN_TITLE = 18; 
  const FONT_SIZE_SECTION_TITLE = 14; 
  const FONT_SIZE_MODULE_TITLE = 12; 
  const FONT_SIZE_SUB_HEADING = 10;
  const FONT_SIZE_NORMAL_TEXT = 10; 
  const FONT_SIZE_MOTIVATIONAL = 11;

  const ptToMm = (pt: number) => pt * 0.352778;

  const LINE_HEIGHT_FACTOR_TITLE = 1.3;
  const LINE_HEIGHT_FACTOR_TEXT = 1.4;

  const LINE_HEIGHT_MAIN_TITLE = ptToMm(FONT_SIZE_MAIN_TITLE * LINE_HEIGHT_FACTOR_TITLE);
  const LINE_HEIGHT_SECTION_TITLE = ptToMm(FONT_SIZE_SECTION_TITLE * LINE_HEIGHT_FACTOR_TITLE);
  const LINE_HEIGHT_MODULE_TITLE = ptToMm(FONT_SIZE_MODULE_TITLE * LINE_HEIGHT_FACTOR_TITLE);
  const LINE_HEIGHT_SUB_HEADING = ptToMm(FONT_SIZE_SUB_HEADING * LINE_HEIGHT_FACTOR_TITLE);
  const LINE_HEIGHT_NORMAL_TEXT = ptToMm(FONT_SIZE_NORMAL_TEXT * LINE_HEIGHT_FACTOR_TEXT);
  const LINE_HEIGHT_MOTIVATIONAL = ptToMm(FONT_SIZE_MOTIVATIONAL * LINE_HEIGHT_FACTOR_TEXT);

  const GAP_AFTER_MAIN_TITLE = LINE_HEIGHT_NORMAL_TEXT * 1.0;
  const GAP_AFTER_SECTION_TITLE = LINE_HEIGHT_NORMAL_TEXT * 0.5;
  const GAP_AFTER_MODULE_TITLE = LINE_HEIGHT_NORMAL_TEXT * 0.5;
  const GAP_AFTER_SUB_HEADING = LINE_HEIGHT_NORMAL_TEXT * 0.25;
  const GAP_BETWEEN_PARAGRAPHS = LINE_HEIGHT_NORMAL_TEXT * 0.5; 
  const GAP_AFTER_CONTENT_LINE = LINE_HEIGHT_NORMAL_TEXT * 0.1; // Small gap after each "line" from parsed content, if it's a list item or paragraph within a block
  const GAP_BEFORE_NEW_SECTION_OR_MODULE = LINE_HEIGHT_NORMAL_TEXT * 1.0;
  const LIST_INDENT = 5; // mm
  
  const COLOR_MAIN_TITLE = '#1E3A8A'; 
  const COLOR_SECTION_TITLE = '#1D4ED8';
  const COLOR_MODULE_TITLE = '#2563EB'; 
  const COLOR_SUB_HEADING = '#374151'; 
  const COLOR_NORMAL_TEXT = '#4B5563'; 
  const COLOR_MOTIVATIONAL_TEXT = '#DB2777'; 
  const COLOR_LIST_BULLET = COLOR_MODULE_TITLE;


  let y = MARGIN;

  const checkAndAddPage = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - MARGIN) {
      doc.addPage();
      y = MARGIN;
      return true; 
    }
    return false; 
  };

  const renderText = (
    text: string, 
    x: number, 
    currentY: number, 
    maxWidth: number, 
    fontSize: number, 
    fontStyle: 'normal' | 'bold' | 'italic', 
    color: string, 
    lineHeight: number,
    align: 'left' | 'center' | 'right' = 'left'
  ): number => { 
    doc.setFontSize(fontSize);
    doc.setFont(undefined, fontStyle);
    doc.setTextColor(color);
    const splitText = doc.splitTextToSize(text, maxWidth);
    
    for (let i = 0; i < splitText.length; i++) {
        if (checkAndAddPage(lineHeight)) { 
            currentY = MARGIN; 
        }
        const textOptions: TextOptionsLight = { align };
        doc.text(splitText[i], align === 'center' ? pageWidth / 2 : x, currentY, textOptions);
        currentY += lineHeight;
    }
    return currentY;
  };
  
  y = renderText(reportTitle, MARGIN, y, pageWidth - 2 * MARGIN, FONT_SIZE_MAIN_TITLE, 'bold', COLOR_MAIN_TITLE, LINE_HEIGHT_MAIN_TITLE, 'center');
  y += GAP_AFTER_MAIN_TITLE;

  nodes.forEach((item, index) => {
    if (index > 0) {
        y += GAP_BEFORE_NEW_SECTION_OR_MODULE;
    }
    // Removed the aggressive checkAndAddPage that was here

    switch (item.type) {
      case 'intro':
        if (item.content) {
          // Use normal text styling for intro
          y = renderText(item.content, MARGIN, y, pageWidth - 2 * MARGIN, FONT_SIZE_NORMAL_TEXT, 'normal', COLOR_NORMAL_TEXT, LINE_HEIGHT_NORMAL_TEXT);
          y += GAP_BETWEEN_PARAGRAPHS;
        }
        break;

      case 'section':
        if (item.title) {
          y = renderText(item.title, MARGIN, y, pageWidth - 2 * MARGIN, FONT_SIZE_SECTION_TITLE, 'bold', COLOR_SECTION_TITLE, LINE_HEIGHT_SECTION_TITLE);
          y += GAP_AFTER_SECTION_TITLE;
        }
        if (item.content) {
          y = renderText(item.content, MARGIN, y, pageWidth - 2 * MARGIN, FONT_SIZE_NORMAL_TEXT, 'normal', COLOR_NORMAL_TEXT, LINE_HEIGHT_NORMAL_TEXT);
          y += GAP_BETWEEN_PARAGRAPHS;
        }
        if (item.implementationBlocks) {
          item.implementationBlocks.forEach(block => {
            y += GAP_BETWEEN_PARAGRAPHS * 0.5; 
            y = renderText(block.title, MARGIN, y, pageWidth - 2 * MARGIN, FONT_SIZE_SUB_HEADING, 'bold', COLOR_SUB_HEADING, LINE_HEIGHT_SUB_HEADING);
            y += GAP_AFTER_SUB_HEADING;
            
            block.content.forEach(line => {
              const isListItem = line.startsWith("* ");
              const text = isListItem ? `• ${line.substring(2)}` : line;
              const indent = isListItem ? MARGIN + LIST_INDENT : MARGIN;
              const lineWidth = isListItem ? pageWidth - MARGIN - indent : pageWidth - 2 * MARGIN;
              
              y = renderText(text, indent, y, lineWidth, FONT_SIZE_NORMAL_TEXT, 'normal', COLOR_NORMAL_TEXT, LINE_HEIGHT_NORMAL_TEXT);
              y += GAP_AFTER_CONTENT_LINE; // Add small gap after each line in block content
            });
          });
        }
        break;

      case 'module':
        if (item.title) {
          y = renderText(item.title, MARGIN, y, pageWidth - 2 * MARGIN, FONT_SIZE_MODULE_TITLE, 'bold', COLOR_MODULE_TITLE, LINE_HEIGHT_MODULE_TITLE);
          y += GAP_AFTER_MODULE_TITLE;
        }
        const renderModulePartPdf = (partTitle: string, partContent?: string[]) => {
          if (partContent && partContent.length > 0) {
            y += GAP_BETWEEN_PARAGRAPHS * 0.5;
            y = renderText(partTitle, MARGIN, y, pageWidth - 2 * MARGIN, FONT_SIZE_SUB_HEADING, 'bold', COLOR_SUB_HEADING, LINE_HEIGHT_SUB_HEADING);
            y += GAP_AFTER_SUB_HEADING;
            partContent.forEach(line => {
               const isListItem = line.startsWith("* ");
               const text = isListItem ? `• ${line.substring(2)}` : line;
               const indent = isListItem ? MARGIN + LIST_INDENT : MARGIN;
               const lineWidth = isListItem ? pageWidth - MARGIN - indent : pageWidth - 2 * MARGIN;
               y = renderText(text, indent, y, lineWidth, FONT_SIZE_NORMAL_TEXT, 'normal', COLOR_NORMAL_TEXT, LINE_HEIGHT_NORMAL_TEXT);
               y += GAP_AFTER_CONTENT_LINE; // Add small gap after each line in module part
            });
          }
        };
        renderModulePartPdf("Propósito:", item.moduleParts?.purpose);
        renderModulePartPdf("Principais Tópicos/Atividades:", item.moduleParts?.topics);
        renderModulePartPdf("Metodologias de Transmissão do Conhecimento:", item.moduleParts?.methodologies);
        renderModulePartPdf("Observação Adicional:", item.moduleParts?.additionalNote);
        break;

      case 'paragraph':
        if (item.content) {
          y = renderText(item.content, MARGIN, y, pageWidth - 2 * MARGIN, FONT_SIZE_NORMAL_TEXT, 'normal', COLOR_NORMAL_TEXT, LINE_HEIGHT_NORMAL_TEXT);
          y += GAP_BETWEEN_PARAGRAPHS;
        }
        break;
      
      case 'motivational':
        if (item.content) {
          y += GAP_BEFORE_NEW_SECTION_OR_MODULE * 1.5; 
          checkAndAddPage(LINE_HEIGHT_MOTIVATIONAL * 2); // Ensure space for centered motivational text
          y = renderText(`"${item.content}"`, MARGIN, y, pageWidth - 2 * MARGIN, FONT_SIZE_MOTIVATIONAL, 'italic', COLOR_MOTIVATIONAL_TEXT, LINE_HEIGHT_MOTIVATIONAL, 'center');
        }
        break;
    }
  });

  doc.save('SkillMap_Trilha_Treinamento.pdf');
};


export const TrainingPathDisplay: React.FC<TrainingPathDisplayProps> = ({ path }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const structuredNodes = useMemo(() => {
    if (!path) return [];
    return parseContentToStructuredNodes(path);
  }, [path]);

  if (!path) {
    return null;
  }
  
  const pathTitle = "Sugestão de Trilha de Treinamento Personalizada";

  const handleDownloadPdf = () => {
    try {
      generatePdf(pathTitle, structuredNodes); 
    } catch (error) {
      console.error("Falha ao gerar PDF:", error);
      alert("Desculpe, ocorreu um erro ao gerar o PDF. Por favor, tente novamente ou verifique o console para detalhes.");
    }
  };

  const renderLines = (lines: string[] | undefined, isList: boolean) => {
    if (!lines || lines.length === 0) return null;
    return lines.map((line, idx) => {
        if (isList && line.startsWith("* ")) {
            return (
                <li key={idx} className="text-slate-600 leading-relaxed flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>{line.substring(2)}</span>
                </li>
            );
        }
        return line.split('\n').map((paragraphLine, pIdx) => (
             <p key={`${idx}-${pIdx}`} className="text-slate-600 leading-relaxed mb-2">{paragraphLine}</p>
        ));
    });
};


  const renderModulePart = (title: string, content: string[] | undefined, icon: React.ReactNode, defaultText: string = "Não especificado.") => {
    if (!content || content.length === 0 || (content.length === 1 && content[0].trim() === "")) return null;
    
    let actualContent = [...content];
    if (actualContent.length > 0 && actualContent[0].toLowerCase().startsWith(title.toLowerCase().split('(')[0].trim())) {
        actualContent[0] = actualContent[0].substring(title.length).replace(/^[:\s]*/, ''); 
        if(actualContent[0].trim() === "") actualContent.shift(); 
    }

    const isListPart = title.includes("Tópicos/Atividades") || title.includes("Metodologias");

    return (
      <div className="mt-4">
        <div className="flex items-center text-lg font-semibold text-slate-700 mb-2">
          <span className="mr-2 text-blue-600">{icon}</span>
          {title}
        </div>
        {actualContent.length > 0 ? (
             isListPart ? (
                <ul className="list-none pl-0 space-y-1">{renderLines(actualContent, true)}</ul>
             ) : (
                renderLines(actualContent, false)
             )
        ) : (
          <p className="text-slate-500 italic">{defaultText}</p>
        )}
      </div>
    );
  };


  return (
    <div className={`bg-white shadow-2xl rounded-xl p-6 md:p-8 mt-10 transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-slate-200 pb-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
          {pathTitle}
        </h2>
        <button
          onClick={handleDownloadPdf}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out flex items-center text-sm"
          aria-label="Baixar trilha de treinamento como PDF"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-2">
            <path d="M10 3a1 1 0 00-1 1v5.586L6.707 7.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 9.586V4a1 1 0 00-1-1z" />
            <path d="M3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" />
          </svg>
          Baixar em PDF
        </button>
      </div>
      
      <div className="space-y-8">
        {structuredNodes.map((item, index) => {
          const itemDelay = `${index * 100}ms`;
          const itemStyle = { animationDelay: itemDelay };

          switch (item.type) {
            case 'intro':
              return (
                <div key={index} className={`bg-blue-50 p-6 rounded-lg shadow-sm transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={itemStyle}>
                   <p className="text-blue-800 text-lg leading-relaxed whitespace-pre-line">{item.content}</p> {/* Kept blue italic for intro in web view for stylistic difference, PDF will be normal */}
                </div>
              );
            case 'section':
              return (
                <div key={index} className={`bg-slate-50 p-6 rounded-xl shadow-lg transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={itemStyle}>
                  <div className="flex items-center text-2xl font-bold text-slate-800 mb-4">
                    <span className="mr-3 text-blue-600">{item.icon}</span>
                    {item.title}
                  </div>
                  {item.content && !item.implementationBlocks && <p className="text-slate-700 leading-relaxed whitespace-pre-line">{item.content}</p>}
                  {item.implementationBlocks && (
                    <div className="space-y-6 mt-4">
                      {item.implementationBlocks.map((block, subIndex) => (
                        <div key={subIndex} className="bg-white p-5 rounded-lg shadow-md border border-slate-200">
                          <div className="flex items-center text-xl font-semibold text-slate-700 mb-3">
                            <span className="mr-2.5 text-indigo-600">{block.icon}</span>
                            {block.title}
                          </div>
                          <div className={`space-y-1 ${block.titleKey === 'DICAS_PRATICAS' || block.titleKey === 'AVALIACAO_KIRKPATRICK' ? 'pl-0 list-none' : ''}`}>
                             {renderLines(block.content, block.titleKey === 'DICAS_PRATICAS' || block.titleKey === 'AVALIACAO_KIRKPATRICK')}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            case 'module':
              return (
                <div key={index} className={`border border-indigo-200 bg-white p-6 rounded-xl shadow-lg relative transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={itemStyle}>
                   { index < structuredNodes.length -1 && structuredNodes[index+1].type === 'module' &&
                    <div className="absolute left-0 top-full h-8 w-px bg-indigo-300 ml-[calc(1.5rem+0.5rem)] " aria-hidden="true"></div> 
                  }
                  <div className="flex items-center mb-1">
                     <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 shadow-md">
                        {structuredNodes.filter(n => n.type ==='module').indexOf(item) + 1}
                     </span>
                    <h3 className="text-xl font-semibold text-indigo-700">{item.title}</h3>
                  </div>

                  {renderModulePart("Propósito", item.moduleParts?.purpose, <TargetIcon className="w-5 h-5" />)}
                  {renderModulePart("Principais Tópicos/Atividades", item.moduleParts?.topics, <ListBulletIcon className="w-5 h-5" />)}
                  {renderModulePart("Metodologias de Transmissão do Conhecimento", item.moduleParts?.methodologies, <AcademicCapIcon className="w-5 h-5" />)}
                  {renderModulePart("Observação Adicional", item.moduleParts?.additionalNote, <InformationCircleIcon className="w-5 h-5" />, "Nenhuma observação adicional.")}
                </div>
              );
            case 'paragraph': 
              return <p key={index} className={`text-slate-700 my-2 leading-relaxed transition-opacity duration-500 ease-out whitespace-pre-line ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={itemStyle}>{item.content}</p>;
            case 'motivational':
                return (
                    <div key={index} className={`mt-10 pt-8 border-t border-dashed border-slate-300 text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={itemStyle}>
                        <SparklesIcon className="w-10 h-10 text-yellow-400 mx-auto mb-4 animate-pulse"/>
                        <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 italic leading-relaxed">
                            "{item.content}"
                        </p>
                    </div>
                );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};
