import React from 'react';
import { EvidenceItem, PageId } from '../types';
import { ShieldCheck, CheckCircle2, ArrowRight, FileText, Database, ExternalLink, Bookmark } from 'lucide-react';

interface EvidencePageProps {
  evidenceList: EvidenceItem[];
  onNavigateToDataWithHighlight: (dataset: 'student' | 'sales', rowKey: string) => void;
  onOpenPdfModal: (page?: number) => void;
  onNavigate: (page: PageId) => void;
}

export const EvidencePage: React.FC<EvidencePageProps> = ({
  evidenceList,
  onNavigateToDataWithHighlight,
  onOpenPdfModal,
  onNavigate,
}) => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#E6F2FF] pb-6 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#173B65]">Evidence & Sources</h1>
        <p className="text-sm text-[#6B7280]">
          Understand where AI answers came from. Every deduction is traced directly to raw data rows or document pages.
        </p>
      </div>

      {/* Core Principle Banner: AI Answer -> Source -> Exact Data */}
      <div className="bg-white border border-[#2563EB] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB]">
          <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
          <span>Core Verification Pipeline</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center items-center">
          <div className="p-4 rounded-lg bg-[#F4F9FF] border border-[#BFDBFE]">
            <div className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">Step 1</div>
            <div className="text-base font-bold text-[#173B65] mt-1">AI Answer</div>
            <div className="text-xs text-[#6B7280] mt-1">Natural language response</div>
          </div>

          <div className="p-4 rounded-lg bg-[#E6F2FF] border border-[#2563EB]">
            <div className="text-xs text-[#2563EB] font-bold uppercase tracking-wider">Step 2</div>
            <div className="text-base font-bold text-[#2563EB] mt-1">Source File</div>
            <div className="text-xs text-[#173B65] mt-1">Exact file & row location</div>
          </div>

          <div className="p-4 rounded-lg bg-[#F4F9FF] border border-[#BFDBFE]">
            <div className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">Step 3</div>
            <div className="text-base font-bold text-[#173B65] mt-1">Exact Raw Data</div>
            <div className="text-xs text-[#6B7280] mt-1">Immutable ground truth</div>
          </div>
        </div>

        <p className="text-xs text-[#6B7280] text-center">
          The purpose of this architecture is to make every AI answer <strong>100% trustworthy and verifiable</strong> for teachers and evaluators.
        </p>
      </div>

      {/* Evidence Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#173B65]">Verified Answer Traces</h2>
          <span className="text-xs font-mono text-[#2563EB]">
            {evidenceList.length} Verified Citations
          </span>
        </div>

        <div className="space-y-4">
          {evidenceList.map((item) => {
            const isPdf = item.datasetId === 'pdf';
            return (
              <div
                key={item.id}
                className="bg-white border border-[#BFDBFE] rounded-xl p-5 shadow-xs hover:border-[#2563EB] transition-colors space-y-4"
              >
                {/* Header with question and citation badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6F2FF] pb-3">
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium text-[#6B7280]">Question Asked:</div>
                    <div className="text-sm font-bold text-[#173B65]">"{item.question}"</div>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#E6F2FF] text-[#2563EB] border border-[#BFDBFE] self-start sm:self-auto">
                    {item.citationId}
                  </span>
                </div>

                {/* AI Answer & Source Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Left: AI Answer */}
                  <div className="p-3 rounded-lg bg-[#F4F9FF] border border-[#E6F2FF] space-y-1">
                    <div className="font-semibold text-[#6B7280] uppercase tracking-wider text-[10px]">
                      AI Answer Generated
                    </div>
                    <div className="text-sm font-bold text-[#173B65]">{item.answer}</div>
                  </div>

                  {/* Right: Source & Location */}
                  <div className="p-3 rounded-lg bg-[#E6F2FF] border border-[#BFDBFE] space-y-1">
                    <div className="font-semibold text-[#2563EB] uppercase tracking-wider text-[10px]">
                      Document & Location
                    </div>
                    <div className="text-sm font-bold text-[#173B65] flex items-center gap-1.5">
                      {isPdf ? (
                        <FileText className="w-4 h-4 text-[#2563EB]" />
                      ) : (
                        <Database className="w-4 h-4 text-[#2563EB]" />
                      )}
                      <span>{item.source}</span>
                    </div>
                    <div className="text-xs text-[#6B7280] font-mono">{item.rowInfo}</div>
                  </div>
                </div>

                {/* Exact Data Row Block */}
                <div className="bg-[#FFFFFF] border border-[#BFDBFE] rounded-lg p-3 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">
                    Exact Grounding Record:
                  </div>
                  <div className="font-mono text-xs text-[#173B65] bg-[#F4F9FF] p-2 rounded border border-[#E6F2FF]">
                    {item.exactData}
                  </div>
                </div>

                {/* Action Button: View Data or Open PDF */}
                <div className="flex justify-end pt-1">
                  {isPdf ? (
                    <button
                      onClick={() => onOpenPdfModal(item.page || 2)}
                      className="inline-flex items-center gap-1.5 bg-[#2563EB] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Open Document (Page {item.page || 2})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const targetDataset = item.datasetId === 'sales' ? 'sales' : 'student';
                        onNavigateToDataWithHighlight(
                          targetDataset,
                          item.targetRowKey || ''
                        );
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#2563EB] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer"
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>View Data</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
