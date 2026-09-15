import React, { useState } from 'react';
import { PDF_REPORT_PAGES } from '../data/mockData';
import { X, FileText, ChevronLeft, ChevronRight, CheckCircle2, Bookmark } from 'lucide-react';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPage?: number;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  initialPage = 2,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  if (!isOpen) return null;

  const pageData = PDF_REPORT_PAGES.find((p) => p.pageNumber === currentPage) || PDF_REPORT_PAGES[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#173B65]/40 backdrop-blur-2xs">
      <div className="bg-white rounded-xl border border-[#BFDBFE] shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E6F2FF] bg-[#F4F9FF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E6F2FF] flex items-center justify-center text-[#2563EB]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#173B65]">Project_Report.pdf</h3>
              <p className="text-xs text-[#6B7280]">Student Performance Report · Document Viewer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B7280] hover:text-[#173B65] hover:bg-[#E6F2FF] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Page Content / Reader */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#FFFFFF]">
          {/* Top page indicator */}
          <div className="flex items-center justify-between border-b border-[#E6F2FF] pb-3 text-xs">
            <span className="font-mono text-[#2563EB] bg-[#E6F2FF] px-2.5 py-1 rounded font-semibold">
              PAGE {currentPage} OF {PDF_REPORT_PAGES.length}
            </span>
            <span className="text-[#6B7280]">Academic Year 2025-2026</span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xl font-bold text-[#173B65]">{pageData.title}</h4>
            <p className="text-xs text-[#6B7280]">{pageData.subtitle}</p>
          </div>

          {/* If page has stats (Page 2) */}
          {pageData.stats && (
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2563EB]">
                <Bookmark className="w-4 h-4" />
                <span>Verified Statistical Summary Cited by AI</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {pageData.stats.map((st) => {
                  const isHighlighted = st.label.includes('Highest Marks');
                  return (
                    <div
                      key={st.label}
                      className={`p-3.5 rounded-lg border text-center ${
                        isHighlighted
                          ? 'bg-[#E6F2FF] border-[#2563EB] ring-2 ring-[#BFDBFE]'
                          : 'bg-[#F4F9FF] border-[#E6F2FF]'
                      }`}
                    >
                      <div className="text-[11px] text-[#6B7280] font-medium">{st.label}</div>
                      <div className="text-2xl font-bold font-mono text-[#2563EB] mt-1">
                        {st.value}
                      </div>
                      {isHighlighted && (
                        <div className="text-[10px] font-mono text-[#2563EB] font-bold mt-1">
                          [Citation Match]
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Paragraphs */}
          <div className="space-y-3 pt-2 text-sm text-[#173B65] leading-relaxed">
            {pageData.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={
                  p.includes('Highest mark recorded across the cohort is 94%')
                    ? 'p-3 bg-[#E6F2FF] border-l-4 border-[#2563EB] rounded-r-md font-medium text-[#173B65]'
                    : ''
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3 border-t border-[#E6F2FF] bg-[#F4F9FF] flex items-center justify-between text-xs">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-[#BFDBFE] bg-white text-[#173B65] hover:bg-[#E6F2FF] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Page
          </button>
          <span className="font-mono text-[#6B7280]">
            Page {currentPage} of {PDF_REPORT_PAGES.length}
          </span>
          <button
            disabled={currentPage >= PDF_REPORT_PAGES.length}
            onClick={() => setCurrentPage((p) => Math.min(PDF_REPORT_PAGES.length, p + 1))}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-[#BFDBFE] bg-white text-[#173B65] hover:bg-[#E6F2FF] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Next Page
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
