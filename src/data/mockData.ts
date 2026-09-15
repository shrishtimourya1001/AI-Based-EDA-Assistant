import { StudentRow, SalesRow, DocumentItem, EvidenceItem } from '../types';

export const INITIAL_STUDENT_DATA: StudentRow[] = [
  { id: '1', student: 'Rahul', math: 78, science: 82, english: 75, total: 235 },
  { id: '2', student: 'Priya', math: 91, science: 88, english: 94, total: 273 },
  { id: '3', student: 'Aman', math: 65, science: 72, english: 68, total: 205 },
  { id: '4', student: 'Neha', math: 84, science: 79, english: 88, total: 251 },
  { id: '5', student: 'Riya', math: 73, science: 81, english: 77, total: 231 },
];

export const INITIAL_SALES_DATA: SalesRow[] = [
  { id: 's1', product: 'Laptop', month: 'January', sales: 45000 },
  { id: 's2', product: 'Laptop', month: 'February', sales: 52000 },
  { id: 's3', product: 'Mobile', month: 'January', sales: 35000 },
  { id: 's4', product: 'Mobile', month: 'February', sales: 41000 },
  { id: 's5', product: 'Tablet', month: 'January', sales: 22000 },
  { id: 's6', product: 'Tablet', month: 'February', sales: 28000 },
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-student-marks',
    name: 'Student_Marks.csv',
    type: 'csv',
    details: '5 students · 3 subjects',
    status: 'Ready',
    size: '1.2 KB',
    uploadDate: 'Today, 10:15 AM',
    description: 'Internal examination marks for Class 10 section A across Math, Science, and English.',
  },
  {
    id: 'doc-sales-data',
    name: 'Sales_Data.csv',
    type: 'csv',
    details: '6 records · 3 columns',
    status: 'Ready',
    size: '1.8 KB',
    uploadDate: 'Today, 10:18 AM',
    description: 'Quarterly retail product revenue comparison for laptops, mobiles, and tablets across January and February.',
  },
  {
    id: 'doc-project-report',
    name: 'Project_Report.pdf',
    type: 'pdf',
    details: '12 pages',
    status: 'Ready',
    size: '480 KB',
    uploadDate: 'Today, 10:20 AM',
    description: 'Student Performance Report summarizing institutional academic trends, overall averages, and student quartiles.',
  },
];

export const SAMPLE_QUESTIONS = {
  student: [
    'Who scored the highest?',
    'What is the average Math score?',
    'Which student scored the lowest?',
    'Which subject has the highest average?',
  ],
  sales: [
    'Which product has the highest sales?',
    'Did sales increase in February?',
    'What was the total sales?',
    'Which product performed better?',
  ],
  pdf: [
    'What is the highest mark?',
    'What is the class average?',
    'How many total students are in the report?',
  ],
};

export const INITIAL_EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'ev-1',
    question: 'Who scored the highest?',
    answer: 'Priya scored the highest with a total of 273 marks.',
    source: 'Student_Marks.csv',
    rowInfo: 'Row: Priya',
    exactData: 'Priya | 91 | 88 | 94 | 273',
    citationId: 'CIT-STU-002',
    datasetId: 'student',
    targetRowKey: 'Priya',
  },
  {
    id: 'ev-2',
    question: 'Which product has the highest sales?',
    answer: 'Laptop had the highest monthly sales of ₹52,000 in February and total sales of ₹97,000.',
    source: 'Sales_Data.csv',
    rowInfo: 'Row: Laptop (February)',
    exactData: 'Laptop | February | ₹52,000',
    citationId: 'CIT-SALES-002',
    datasetId: 'sales',
    targetRowKey: 'Laptop-February',
  },
  {
    id: 'ev-3',
    question: 'What is the highest mark?',
    answer: 'The highest mark is 94%.',
    source: 'Student Performance Report',
    rowInfo: 'Citation: Page 2, Summary Statistics',
    exactData: 'Highest Marks: 94% (Scored in Final Examination)',
    citationId: 'CIT-PDF-P02',
    datasetId: 'pdf',
    page: 2,
  },
  {
    id: 'ev-4',
    question: 'Which student scored the lowest?',
    answer: 'Aman scored the lowest with a total of 205 marks.',
    source: 'Student_Marks.csv',
    rowInfo: 'Row: Aman',
    exactData: 'Aman | 65 | 72 | 68 | 205',
    citationId: 'CIT-STU-003',
    datasetId: 'student',
    targetRowKey: 'Aman',
  },
  {
    id: 'ev-5',
    question: 'What was the total sales?',
    answer: 'The total sales was ₹2,23,000 across all three product categories for January and February.',
    source: 'Sales_Data.csv',
    rowInfo: 'Aggregation: All Rows (6 records)',
    exactData: 'Sum: 45,000 + 52,000 + 35,000 + 41,000 + 22,000 + 28,000 = ₹2,23,000',
    citationId: 'CIT-SALES-ALL',
    datasetId: 'sales',
    targetRowKey: 'all',
  },
];

export const PDF_REPORT_PAGES = [
  {
    pageNumber: 1,
    title: 'Section 1: Executive Overview & Academic Scope',
    subtitle: 'Institutional Evaluation & Class Assessment 2026',
    paragraphs: [
      'This report summarizes the academic performance of the secondary batch across standard coursework evaluations.',
      'The objective of this exploratory data evaluation is to provide faculty and department heads with transparent, verifiable metrics on student competencies.',
      'All records compiled in this document reflect verified grade-sheets certified by the academic controller office.',
    ],
  },
  {
    pageNumber: 2,
    title: 'Section 2: Key Academic Summary Statistics',
    subtitle: 'Core Metrics and Cohort Benchmark',
    stats: [
      { label: 'Total Students', value: '50' },
      { label: 'Average Marks', value: '72%' },
      { label: 'Highest Marks', value: '94%' },
      { label: 'Lowest Marks', value: '41%' },
    ],
    paragraphs: [
      'Summary findings indicate consistent progress in STEM subjects with a median performance of 73.5%.',
      'The highest mark recorded across the cohort is 94%, attained during the comprehensive semester final.',
      'The cohort achieved an overall passing rate of 96%, with targeted remedial support scheduled for students scoring below the 45% threshold.',
    ],
  },
  {
    pageNumber: 3,
    title: 'Section 3: Departmental Recommendations & Next Steps',
    subtitle: 'Guidance for Teachers & Academic Mentors',
    paragraphs: [
      '1. Encourage peer learning circles for mathematical problem solving.',
      '2. Implement weekly formative reviews for students scoring in the lower quartile.',
      '3. Re-evaluate practical lab modules to sustain high science benchmarks.',
    ],
  },
];
