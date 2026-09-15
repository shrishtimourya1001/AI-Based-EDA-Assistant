import React, { useState, useRef } from 'react';
import { DocumentItem, PageId } from '../types';
import { UploadCloud, FileText, CheckCircle2, FileSpreadsheet, Eye, MessageSquare, Plus } from 'lucide-react';

interface DocumentsPageProps {
  documents: DocumentItem[];
  onUploadDocument: (doc: DocumentItem) => void;
  onSelectDatasetForData: (datasetId: 'student' | 'sales') => void;
  onSelectDatasetForAssistant: (datasetId: 'student' | 'sales' | 'pdf') => void;
  onOpenPdfModal: (pageNumber?: number) => void;
  onNavigate: (page: PageId) => void;
}

export const DocumentsPage: React.FC<DocumentsPageProps> = ({
  documents,
  onUploadDocument,
  onSelectDatasetForData,
  onSelectDatasetForAssistant,
  onOpenPdfModal,
  onNavigate,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const isPdf = file.name.endsWith('.pdf');
    const isCsv = file.name.endsWith('.csv');
    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      name: file.name,
      type: isPdf ? 'pdf' : isCsv ? 'csv' : 'excel',
      details: isPdf ? 'Multi-page report' : 'Uploaded table data',
      status: 'Ready',
      size: `${(file.size / 1024).toFixed(1)} KB`,
      uploadDate: 'Just now',
      description: `Uploaded user dataset: ${file.name}. Indexed and ready for EDA questions.`,
    };

    onUploadDocument(newDoc);
    setUploadSuccessMessage(`Successfully uploaded "${file.name}"! Status: Ready.`);
    setTimeout(() => setUploadSuccessMessage(null), 4000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#E6F2FF] pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#173B65]">My Documents</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Manage your uploaded files and verified project datasets.
        </p>
      </div>

      {/* Upload File Zone */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#173B65]">Upload File</h2>
          <span className="text-xs font-mono text-[#6B7280]">
            Supported files: <strong className="text-[#173B65]">PDF · CSV · Excel</strong>
          </span>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 sm:p-10 text-center transition-colors cursor-pointer bg-white ${
            isDragging
              ? 'border-[#2563EB] bg-[#E6F2FF]'
              : 'border-[#BFDBFE] hover:border-[#2563EB] hover:bg-[#F4F9FF]'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".csv,.xlsx,.xls,.pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E6F2FF] text-[#2563EB] mx-auto flex items-center justify-center">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-semibold text-[#173B65]">
                Click to browse or drag and drop your file here
              </div>
              <div className="text-xs text-[#6B7280] mt-1">
                Accepted formats: .csv, .xlsx, .xls, .pdf (Max size 10MB)
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#2563EB] text-white text-xs font-semibold shadow-2xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Choose Document File</span>
            </div>
          </div>
        </div>

        {uploadSuccessMessage && (
          <div className="bg-[#E6F2FF] border border-[#2563EB] rounded-lg p-3.5 text-sm text-[#173B65] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
            <span>{uploadSuccessMessage}</span>
          </div>
        )}
      </div>

      {/* Document Cards List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#173B65]">Available Project Documents</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documents.map((doc) => {
            const isPdf = doc.type === 'pdf';
            const isStudent = doc.name.toLowerCase().includes('student');
            const isSales = doc.name.toLowerCase().includes('sales');

            return (
              <div
                key={doc.id}
                className="bg-white border border-[#BFDBFE] rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-[#2563EB] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#E6F2FF] text-[#2563EB] flex items-center justify-center">
                      {isPdf ? (
                        <FileText className="w-5 h-5" />
                      ) : (
                        <FileSpreadsheet className="w-5 h-5" />
                      )}
                    </div>

                    {/* Small Green Ready Indicator strictly as required */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                      <span className="font-semibold">{doc.status}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#173B65] break-all">{doc.name}</h3>
                    <div className="text-xs text-[#2563EB] font-mono mt-0.5">{doc.details}</div>
                  </div>

                  <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-3">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E6F2FF] space-y-2">
                  <div className="flex justify-between text-[11px] text-[#6B7280] font-mono">
                    <span>Size: {doc.size}</span>
                    <span>{doc.uploadDate}</span>
                  </div>

                  <div className="flex gap-2 pt-1">
                    {isPdf ? (
                      <button
                        id="btn-preview-pdf"
                        onClick={() => onOpenPdfModal(2)}
                        className="flex-1 inline-flex items-center justify-center gap-1 bg-[#E6F2FF] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview PDF</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onSelectDatasetForData(isSales ? 'sales' : 'student');
                          onNavigate('data');
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1 bg-[#E6F2FF] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Data</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onSelectDatasetForAssistant(
                          isPdf ? 'pdf' : isSales ? 'sales' : 'student'
                        );
                        onNavigate('assistant');
                      }}
                      className="inline-flex items-center justify-center gap-1 bg-white border border-[#BFDBFE] text-[#173B65] hover:bg-[#F4F9FF] px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                      title="Ask questions using this document"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Ask AI</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
