import React, { useState } from 'react';
import { PageId, StudentRow, SalesRow, DocumentItem, ChatMessage, EvidenceItem } from './types';
import {
  INITIAL_STUDENT_DATA,
  INITIAL_SALES_DATA,
  INITIAL_DOCUMENTS,
  INITIAL_EVIDENCE_ITEMS,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { DataPage } from './components/DataPage';
import { DocumentsPage } from './components/DocumentsPage';
import { AIAssistantPage } from './components/AIAssistantPage';
import { ResultsPage } from './components/ResultsPage';
import { EvidencePage } from './components/EvidencePage';
import { DocumentModal } from './components/DocumentModal';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [students] = useState<StudentRow[]>(INITIAL_STUDENT_DATA);
  const [sales] = useState<SalesRow[]>(INITIAL_SALES_DATA);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>(INITIAL_EVIDENCE_ITEMS);

  // Highlighting state for Data view
  const [highlightRowKey, setHighlightRowKey] = useState<string | null>(null);
  const [dataDatasetSelection, setDataDatasetSelection] = useState<'student' | 'sales'>('student');

  // AI Assistant active dataset focus
  const [assistantDataset, setAssistantDataset] = useState<'student' | 'sales' | 'pdf'>('student');

  // PDF modal viewer
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfPage, setPdfPage] = useState(2);

  // Chat message history with realistic initial verified QA
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'init-msg-1',
      sender: 'user',
      text: 'Who scored the highest?',
      timestamp: '10:15 AM',
    },
    {
      id: 'init-msg-2',
      sender: 'ai',
      text: 'Priya scored the highest with a total of 273 marks.',
      source: 'Student_Marks.csv',
      rowInfo: 'Row: Priya',
      exactData: 'Priya | 91 | 88 | 94 | 273',
      datasetId: 'student',
      targetRowKey: 'Priya',
      timestamp: '10:15 AM',
    },
  ]);

  const handleAddChatMessage = (msg: ChatMessage) => {
    setChatHistory((prev) => [...prev, msg]);

    // If it's an AI message with grounding, also append to Evidence & Sources list
    if (msg.sender === 'ai' && msg.source && msg.exactData) {
      const newEv: EvidenceItem = {
        id: `ev-${Date.now()}`,
        question: chatHistory[chatHistory.length - 1]?.text || 'Query',
        answer: msg.text,
        source: msg.source,
        rowInfo: msg.rowInfo || 'Verified row',
        exactData: msg.exactData,
        citationId: `CIT-${Date.now().toString().slice(-4)}`,
        datasetId: msg.datasetId || 'student',
        targetRowKey: msg.targetRowKey,
        page: msg.page,
      };
      setEvidenceList((prev) => [newEv, ...prev]);
    }
  };

  const handleUploadDocument = (newDoc: DocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleNavigateToDataWithHighlight = (
    dataset: 'student' | 'sales',
    rowKey: string
  ) => {
    setDataDatasetSelection(dataset);
    setHighlightRowKey(rowKey);
    setActivePage('data');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPdfModal = (pageNumber = 2) => {
    setPdfPage(pageNumber);
    setIsPdfModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F9FF] text-[#173B65]">
      {/* Top Navigation */}
      <Navbar activePage={activePage} onSelectPage={setActivePage} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage onNavigate={setActivePage} />}

        {activePage === 'data' && (
          <DataPage
            students={students}
            sales={sales}
            highlightRowKey={highlightRowKey}
            activeDatasetId={dataDatasetSelection}
            onClearHighlight={() => setHighlightRowKey(null)}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'documents' && (
          <DocumentsPage
            documents={documents}
            onUploadDocument={handleUploadDocument}
            onSelectDatasetForData={(ds) => {
              setDataDatasetSelection(ds);
              setHighlightRowKey(null);
            }}
            onSelectDatasetForAssistant={(ds) => setAssistantDataset(ds)}
            onOpenPdfModal={handleOpenPdfModal}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'assistant' && (
          <AIAssistantPage
            students={students}
            sales={sales}
            chatHistory={chatHistory}
            onAddChatMessage={handleAddChatMessage}
            onNavigateToDataWithHighlight={handleNavigateToDataWithHighlight}
            onNavigateToEvidence={() => setActivePage('evidence')}
            onOpenPdfModal={handleOpenPdfModal}
            activeDatasetId={assistantDataset}
            onSetActiveDatasetId={setAssistantDataset}
          />
        )}

        {activePage === 'results' && (
          <ResultsPage
            students={students}
            sales={sales}
            onNavigateToData={(ds) => {
              setDataDatasetSelection(ds);
              setHighlightRowKey(null);
              setActivePage('data');
            }}
            onNavigateToAssistant={(ds) => {
              setAssistantDataset(ds);
              setActivePage('assistant');
            }}
          />
        )}

        {activePage === 'evidence' && (
          <EvidencePage
            evidenceList={evidenceList}
            onNavigateToDataWithHighlight={handleNavigateToDataWithHighlight}
            onOpenPdfModal={handleOpenPdfModal}
            onNavigate={setActivePage}
          />
        )}
      </main>

      {/* PDF Document Inspection Modal */}
      <DocumentModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        initialPage={pdfPage}
      />

      {/* College Project Footer */}
      <footer className="mt-16 bg-white border-t border-[#E6F2FF] py-8 text-center text-xs text-[#6B7280]">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <div className="font-bold text-[#173B65] text-sm">
            AI-Based EDA Assistant
          </div>
          <p>
            Final Year Academic Project · Simple, Transparent, and Teacher-Friendly Exploratory Data Analysis
          </p>
          <div className="flex justify-center items-center gap-4 pt-1 font-mono text-[11px] text-[#2563EB]">
            <span>Theme: White & Light Blue</span>
            <span>·</span>
            <span>Grounding: 100% Verified Citations</span>
            <span>·</span>
            <span>Status: Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
