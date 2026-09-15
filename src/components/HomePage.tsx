import React from 'react';
import { PageId } from '../types';
import { UploadCloud, MessageSquareText, FileSearch, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 space-y-16">
      {/* College Project Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F2FF] text-[#2563EB] text-xs font-semibold tracking-wide border border-[#BFDBFE]">
          <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
          Department of Computer Science & Data Applications
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173B65] tracking-tight">
          AI-Based EDA Assistant
        </h1>
        <p className="text-lg sm:text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
          Upload your data, understand it easily, and ask AI questions about it.
        </p>
        <div className="pt-2">
          <button
            id="btn-home-get-started"
            onClick={() => onNavigate('data')}
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-[#1D4ED8] transition-colors shadow-sm cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Three Simple Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Upload Data */}
        <div className="bg-white border border-[#BFDBFE] rounded-xl p-6 shadow-xs flex flex-col justify-between hover:border-[#2563EB] transition-colors">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-[#E6F2FF] flex items-center justify-center text-[#2563EB]">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#173B65]">Upload Data</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Upload CSV or Excel files. View clear tabular records without complex configuration.
            </p>
          </div>
          <div className="pt-5 border-t border-[#F4F9FF]">
            <button
              id="btn-card-data"
              onClick={() => onNavigate('data')}
              className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Datasets</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: Ask AI */}
        <div className="bg-white border border-[#BFDBFE] rounded-xl p-6 shadow-xs flex flex-col justify-between hover:border-[#2563EB] transition-colors">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-[#E6F2FF] flex items-center justify-center text-[#2563EB]">
              <MessageSquareText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#173B65]">Ask AI</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Ask questions about your data in plain English. Get direct, non-technical answers instantly.
            </p>
          </div>
          <div className="pt-5 border-t border-[#F4F9FF]">
            <button
              id="btn-card-ai"
              onClick={() => onNavigate('assistant')}
              className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 cursor-pointer"
            >
              <span>Try AI Questions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 3: Get Evidence */}
        <div className="bg-white border border-[#BFDBFE] rounded-xl p-6 shadow-xs flex flex-col justify-between hover:border-[#2563EB] transition-colors">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-[#E6F2FF] flex items-center justify-center text-[#2563EB]">
              <FileSearch className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#173B65]">Get Evidence</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              See where the AI got its answer from. Every response links directly to its source row or citation.
            </p>
          </div>
          <div className="pt-5 border-t border-[#F4F9FF]">
            <button
              id="btn-card-evidence"
              onClick={() => onNavigate('evidence')}
              className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 cursor-pointer"
            >
              <span>Verify Sources</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Teacher-Friendly 6-Step Workflow Explanation */}
      <div className="bg-white border border-[#E6F2FF] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E6F2FF] pb-4">
          <h2 className="text-xl font-bold text-[#173B65]">How It Works (Teacher-Friendly Guide)</h2>
          <p className="text-sm text-[#6B7280] mt-1">
            Designed for teachers and non-technical staff to understand EDA (Exploratory Data Analysis) with complete trust.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: '1', title: 'Upload Data', desc: 'CSV, Excel, or PDF' },
            { step: '2', title: 'View Data', desc: 'Clean student tables' },
            { step: '3', title: 'Ask AI', desc: 'Simple questions' },
            { step: '4', title: 'Simple Answer', desc: 'Direct, clear facts' },
            { step: '5', title: 'Check Source', desc: 'Exact row citation' },
            { step: '6', title: 'See Result', desc: 'Charts & summaries' },
          ].map((item) => (
            <div key={item.step} className="bg-[#F4F9FF] border border-[#E6F2FF] rounded-lg p-3 text-center space-y-1">
              <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white font-mono text-xs font-semibold mx-auto flex items-center justify-center">
                {item.step}
              </div>
              <div className="text-xs font-bold text-[#173B65]">{item.title}</div>
              <div className="text-[11px] text-[#6B7280]">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#E6F2FF] rounded-lg p-4 flex items-start gap-3 text-sm text-[#173B65]">
          <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Trust & Transparency Guarantee:</span> Unlike opaque chat models that might hallucinate or fabricate facts, this assistant strictly traces every insight back to an exact row in your spreadsheet or a verified page in your document.
          </div>
        </div>
      </div>
    </div>
  );
};
