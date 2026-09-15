export type PageId = 'home' | 'data' | 'documents' | 'assistant' | 'results' | 'evidence';

export interface StudentRow {
  id: string;
  student: string;
  math: number;
  science: number;
  english: number;
  total: number;
}

export interface SalesRow {
  id: string;
  product: string;
  month: string;
  sales: number;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'csv' | 'excel' | 'pdf';
  details: string;
  status: 'Ready';
  size: string;
  uploadDate: string;
  description: string;
}

export interface EvidenceItem {
  id: string;
  question: string;
  answer: string;
  source: string;
  rowInfo: string;
  exactData: string;
  citationId: string;
  datasetId: 'student' | 'sales' | 'pdf';
  targetRowKey?: string;
  page?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  source?: string;
  rowInfo?: string;
  exactData?: string;
  datasetId?: 'student' | 'sales' | 'pdf';
  targetRowKey?: string;
  page?: number;
  timestamp: string;
}
