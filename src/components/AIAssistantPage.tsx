import React, { useState } from 'react';
import { StudentRow, SalesRow, ChatMessage, PageId } from '../types';
import { answerEDAQuestion } from '../utils/edaEngine';
import { SAMPLE_QUESTIONS } from '../data/mockData';
import { Send, Bot, User, ArrowRight, ShieldCheck, Database, FileText, Sparkles } from 'lucide-react';

interface AIAssistantPageProps {
  students: StudentRow[];
  sales: SalesRow[];
  chatHistory: ChatMessage[];
  onAddChatMessage: (msg: ChatMessage) => void;
  onNavigateToDataWithHighlight: (dataset: 'student' | 'sales', rowKey: string) => void;
  onNavigateToEvidence: (evidenceTarget?: string) => void;
  onOpenPdfModal: (page?: number) => void;
  activeDatasetId: 'student' | 'sales' | 'pdf';
  onSetActiveDatasetId: (id: 'student' | 'sales' | 'pdf') => void;
}

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({
  students,
  sales,
  chatHistory,
  onAddChatMessage,
  onNavigateToDataWithHighlight,
  onNavigateToEvidence,
  onOpenPdfModal,
  activeDatasetId,
  onSetActiveDatasetId,
}) => {
  const [inputQuestion, setInputQuestion] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleAsk = (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    // 1. Add User message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    onAddChatMessage(userMsg);
    setInputQuestion('');
    setIsThinking(true);

    // 2. Compute grounded answer
    setTimeout(() => {
      const result = answerEDAQuestion(trimmed, students, sales, activeDatasetId);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: result.text,
        source: result.source,
        rowInfo: result.rowInfo,
        exactData: result.exactData,
        datasetId: result.datasetId,
        targetRowKey: result.targetRowKey,
        page: result.page,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      onAddChatMessage(aiMsg);
      setIsThinking(false);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#E6F2FF] pb-6 space-y-2 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#173B65]">AI Assistant</h1>
        <p className="text-base text-[#2563EB] font-medium">
          Ask questions about your data
        </p>
        <p className="text-xs text-[#6B7280]">
          Every answer is strictly grounded in your verified documents. Click an example question or enter your own query.
        </p>
      </div>

      {/* Dataset Context Selector */}
      <div className="bg-white border border-[#BFDBFE] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#173B65]">
          <span className="text-[#6B7280]">Active Dataset Focus:</span>
          <span className="font-mono text-[#2563EB] bg-[#E6F2FF] px-2.5 py-1 rounded">
            {activeDatasetId === 'student'
              ? 'Student_Marks.csv'
              : activeDatasetId === 'sales'
              ? 'Sales_Data.csv'
              : 'Project_Report.pdf'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => onSetActiveDatasetId('student')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeDatasetId === 'student'
                ? 'bg-[#2563EB] text-white'
                : 'bg-[#F4F9FF] text-[#173B65] hover:bg-[#E6F2FF]'
            }`}
          >
            Student Marks
          </button>
          <button
            onClick={() => onSetActiveDatasetId('sales')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeDatasetId === 'sales'
                ? 'bg-[#2563EB] text-white'
                : 'bg-[#F4F9FF] text-[#173B65] hover:bg-[#E6F2FF]'
            }`}
          >
            Sales Data
          </button>
          <button
            onClick={() => onSetActiveDatasetId('pdf')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeDatasetId === 'pdf'
                ? 'bg-[#2563EB] text-white'
                : 'bg-[#F4F9FF] text-[#173B65] hover:bg-[#E6F2FF]'
            }`}
          >
            PDF Report
          </button>
        </div>
      </div>

      {/* Clickable Example Questions */}
      <div className="bg-white border border-[#E6F2FF] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E6F2FF] pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
            <h3 className="text-sm font-bold text-[#173B65]">Recommended Example Questions</h3>
          </div>
          <span className="text-[11px] text-[#6B7280]">Click any question to ask instantly</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Student Questions */}
          <div className="space-y-2">
            <div className="font-bold text-[#173B65] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Student Data</span>
            </div>
            <div className="space-y-1.5">
              {SAMPLE_QUESTIONS.student.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    onSetActiveDatasetId('student');
                    handleAsk(q);
                  }}
                  className="w-full text-left p-2 rounded-lg bg-[#F4F9FF] hover:bg-[#E6F2FF] text-[#173B65] border border-[#BFDBFE]/60 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <span>{q}</span>
                  <ArrowRight className="w-3 h-3 text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Sales Questions & PDF */}
          <div className="space-y-2">
            <div className="font-bold text-[#173B65] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Sales & PDF Documents</span>
            </div>
            <div className="space-y-1.5">
              {SAMPLE_QUESTIONS.sales.slice(0, 2).map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    onSetActiveDatasetId('sales');
                    handleAsk(q);
                  }}
                  className="w-full text-left p-2 rounded-lg bg-[#F4F9FF] hover:bg-[#E6F2FF] text-[#173B65] border border-[#BFDBFE]/60 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <span>{q}</span>
                  <ArrowRight className="w-3 h-3 text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
              {SAMPLE_QUESTIONS.pdf.slice(0, 2).map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    onSetActiveDatasetId('pdf');
                    handleAsk(q);
                  }}
                  className="w-full text-left p-2 rounded-lg bg-[#F4F9FF] hover:bg-[#E6F2FF] text-[#173B65] border border-[#BFDBFE]/60 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <span>{q}</span>
                  <ArrowRight className="w-3 h-3 text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat / Answers List */}
      <div className="space-y-4">
        {chatHistory.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex items-start justify-end gap-2.5">
                <div className="bg-[#2563EB] text-white rounded-2xl rounded-tr-xs px-4 py-2.5 text-sm max-w-lg shadow-2xs">
                  <div className="font-medium">{msg.text}</div>
                  <div className="text-[10px] text-blue-100 text-right mt-1 font-mono">
                    {msg.timestamp}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#BFDBFE] text-[#173B65] flex items-center justify-center shrink-0 text-xs font-semibold">
                  <User className="w-4 h-4" />
                </div>
              </div>
            );
          }

          // AI Response
          return (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E6F2FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#BFDBFE]">
                <Bot className="w-4 h-4" />
              </div>

              <div className="bg-white border border-[#BFDBFE] rounded-2xl rounded-tl-xs p-5 text-sm max-w-2xl shadow-xs space-y-3">
                {/* Direct Answer Text */}
                <div className="text-[#173B65] text-base font-semibold leading-relaxed">
                  {msg.text}
                </div>

                {/* Source Verification Block */}
                {(msg.source || msg.rowInfo) && (
                  <div className="bg-[#F4F9FF] border border-[#E6F2FF] rounded-lg p-3 space-y-1.5 text-xs">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#173B65]">
                      {msg.source && (
                        <div>
                          <span className="text-[#6B7280]">Source: </span>
                          <strong className="font-mono text-[#173B65]">{msg.source}</strong>
                        </div>
                      )}
                      {msg.rowInfo && (
                        <div>
                          <span className="text-[#6B7280]">Location: </span>
                          <strong className="font-mono text-[#2563EB]">{msg.rowInfo}</strong>
                        </div>
                      )}
                    </div>

                    {msg.exactData && (
                      <div className="text-[#6B7280] font-mono text-[11px] pt-1 border-t border-[#E6F2FF]">
                        <span className="text-[#173B65] font-bold">Data: </span>
                        {msg.exactData}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons to Verify Evidence or Data */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {msg.datasetId === 'pdf' ? (
                    <button
                      onClick={() => onOpenPdfModal(msg.page || 2)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#E6F2FF] text-[#2563EB] text-xs font-semibold hover:bg-[#2563EB] hover:text-white transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Open Citation (Page {msg.page || 2})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const targetDataset = msg.datasetId === 'sales' ? 'sales' : 'student';
                        onNavigateToDataWithHighlight(
                          targetDataset,
                          msg.targetRowKey || ''
                        );
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#E6F2FF] text-[#2563EB] text-xs font-semibold hover:bg-[#2563EB] hover:text-white transition-colors cursor-pointer"
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>View in Data Table</span>
                    </button>
                  )}

                  <button
                    onClick={() => onNavigateToEvidence(msg.text)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-[#BFDBFE] text-[#173B65] text-xs font-semibold hover:bg-[#F4F9FF] transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Check Source & Evidence</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {isThinking && (
          <div className="flex items-center gap-3 text-xs text-[#6B7280]">
            <div className="w-8 h-8 rounded-full bg-[#E6F2FF] text-[#2563EB] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="bg-white border border-[#BFDBFE] rounded-lg px-4 py-2.5 font-mono">
              Searching verified dataset rows...
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(inputQuestion);
        }}
        className="sticky bottom-4 bg-white border border-[#BFDBFE] rounded-xl p-2 shadow-md flex items-center gap-2"
      >
        <input
          type="text"
          id="input-ai-question"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="Ask a question (e.g. 'Who scored the highest?' or 'What was the total sales?')..."
          className="flex-1 px-4 py-2.5 text-sm text-[#173B65] placeholder-[#6B7280] outline-none bg-transparent"
        />
        <button
          type="submit"
          id="btn-send-question"
          disabled={!inputQuestion.trim() || isThinking}
          className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1D4ED8] transition-colors disabled:opacity-50 cursor-pointer shrink-0"
        >
          <span>Ask</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
