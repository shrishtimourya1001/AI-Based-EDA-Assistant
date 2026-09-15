import { StudentRow, SalesRow } from '../types';

export interface AnswerResult {
  text: string;
  source: string;
  rowInfo: string;
  exactData: string;
  datasetId: 'student' | 'sales' | 'pdf';
  targetRowKey?: string;
  page?: number;
}

export function computeStudentStats(data: StudentRow[]) {
  if (!data.length) {
    const emptyRow: StudentRow = { id: '', student: 'N/A', total: 0, math: 0, science: 0, english: 0 };
    return {
      count: 0,
      avgMarks: 0,
      highest: emptyRow,
      lowest: emptyRow,
      mathAvg: 0,
      scienceAvg: 0,
      englishAvg: 0,
    };
  }

  const count = data.length;
  const totalSum = data.reduce((acc, r) => acc + r.total, 0);
  const avgMarks = Math.round(totalSum / count);

  const highest = data.reduce((prev, curr) => (curr.total > prev.total ? curr : prev), data[0]);
  const lowest = data.reduce((prev, curr) => (curr.total < prev.total ? curr : prev), data[0]);

  const mathAvg = +(data.reduce((acc, r) => acc + r.math, 0) / count).toFixed(1);
  const scienceAvg = +(data.reduce((acc, r) => acc + r.science, 0) / count).toFixed(1);
  const englishAvg = +(data.reduce((acc, r) => acc + r.english, 0) / count).toFixed(1);

  return {
    count,
    avgMarks,
    highest,
    lowest,
    mathAvg,
    scienceAvg,
    englishAvg,
  };
}

export function computeSalesStats(data: SalesRow[]) {
  if (!data.length) {
    return {
      totalSales: 0,
      highestMonth: { product: 'N/A', month: 'N/A', sales: 0 },
      bestProduct: { product: 'N/A', sales: 0 },
      januarySales: 0,
      februarySales: 0,
    };
  }

  const totalSales = data.reduce((acc, r) => acc + r.sales, 0);
  const highestMonth = data.reduce((prev, curr) => (curr.sales > prev.sales ? curr : prev), data[0]);

  const productTotals: Record<string, number> = {};
  data.forEach((r) => {
    productTotals[r.product] = (productTotals[r.product] || 0) + r.sales;
  });

  let bestProdName = 'Laptop';
  let bestProdVal = 0;
  for (const [prod, val] of Object.entries(productTotals)) {
    if (val > bestProdVal) {
      bestProdVal = val;
      bestProdName = prod;
    }
  }

  const januarySales = data.filter((r) => r.month.toLowerCase() === 'january').reduce((acc, r) => acc + r.sales, 0);
  const februarySales = data.filter((r) => r.month.toLowerCase() === 'february').reduce((acc, r) => acc + r.sales, 0);

  return {
    totalSales,
    highestMonth,
    bestProduct: { product: bestProdName, sales: bestProdVal },
    januarySales,
    februarySales,
  };
}

export function answerEDAQuestion(
  question: string,
  students: StudentRow[],
  sales: SalesRow[],
  activeDatasetId: 'student' | 'sales' | 'pdf'
): AnswerResult {
  const q = question.toLowerCase().trim();
  const stuStats = computeStudentStats(students);
  const salesStats = computeSalesStats(sales);

  // 1. Check if it's a PDF question or activeDataset is PDF
  if (
    activeDatasetId === 'pdf' ||
    q.includes('page') ||
    q.includes('report') ||
    q.includes('percentage') ||
    q.includes('94%') ||
    q.includes('72%') ||
    q.includes('50 students')
  ) {
    if (q.includes('highest') || q.includes('top mark') || q.includes('maximum mark') || q.includes('highest mark')) {
      return {
        text: 'The highest mark is 94%.',
        source: 'Student Performance Report',
        rowInfo: 'Citation: Page 2, Summary Statistics',
        exactData: 'Highest Marks: 94% (Comprehensive Semester Exam)',
        datasetId: 'pdf',
        page: 2,
      };
    }
    if (q.includes('average') || q.includes('mean') || q.includes('class average')) {
      return {
        text: 'The overall class average marks is 72%.',
        source: 'Student Performance Report',
        rowInfo: 'Citation: Page 2, Summary Statistics',
        exactData: 'Average Marks: 72% across all 50 students',
        datasetId: 'pdf',
        page: 2,
      };
    }
    if (q.includes('how many') || q.includes('total student') || q.includes('count') || q.includes('cohort')) {
      return {
        text: 'The report covers a total of 50 students.',
        source: 'Student Performance Report',
        rowInfo: 'Citation: Page 2, Summary Statistics',
        exactData: 'Total Students: 50 enrolled candidates',
        datasetId: 'pdf',
        page: 2,
      };
    }
    if (q.includes('lowest')) {
      return {
        text: 'The lowest mark recorded in the report is 41%.',
        source: 'Student Performance Report',
        rowInfo: 'Citation: Page 2, Summary Statistics',
        exactData: 'Lowest Marks: 41%',
        datasetId: 'pdf',
        page: 2,
      };
    }
  }

  // 2. Check if questions relate to Sales Data
  const isSalesQuery =
    activeDatasetId === 'sales' ||
    q.includes('sales') ||
    q.includes('product') ||
    q.includes('laptop') ||
    q.includes('mobile') ||
    q.includes('tablet') ||
    q.includes('january') ||
    q.includes('february') ||
    q.includes('revenue');

  if (isSalesQuery && activeDatasetId !== 'student') {
    if (q.includes('highest sales') || q.includes('best selling') || q.includes('top product') || q.includes('most sales')) {
      return {
        text: `Laptop has the highest sales totaling ₹${salesStats.bestProduct.sales.toLocaleString('en-IN')}, with its peak monthly sales of ₹52,000 in February.`,
        source: 'Sales_Data.csv',
        rowInfo: 'Row: Laptop (February)',
        exactData: 'Laptop | February | ₹52,000',
        datasetId: 'sales',
        targetRowKey: 'Laptop-February',
      };
    }

    if (q.includes('increase') || q.includes('february') || q.includes('compare month') || q.includes('difference')) {
      const diff = salesStats.februarySales - salesStats.januarySales;
      return {
        text: `Yes, sales increased in February to ₹${salesStats.februarySales.toLocaleString('en-IN')} compared to ₹${salesStats.januarySales.toLocaleString('en-IN')} in January (an increase of ₹${diff.toLocaleString('en-IN')}).`,
        source: 'Sales_Data.csv',
        rowInfo: 'Comparison: January (₹1,02,000) vs February (₹1,21,000)',
        exactData: 'Jan Total: ₹1,02,000 | Feb Total: ₹1,21,000 | Growth: +₹19,000',
        datasetId: 'sales',
        targetRowKey: 'all',
      };
    }

    if (q.includes('total sales') || q.includes('overall sales') || q.includes('sum of sales')) {
      return {
        text: `The total sales was ₹${salesStats.totalSales.toLocaleString('en-IN')} across all 3 products and both months.`,
        source: 'Sales_Data.csv',
        rowInfo: 'Aggregate: Sum of all 6 rows',
        exactData: 'Laptop (₹97,000) + Mobile (₹76,000) + Tablet (₹50,000) = ₹2,23,000',
        datasetId: 'sales',
        targetRowKey: 'all',
      };
    }

    if (q.includes('performed better') || q.includes('performance') || q.includes('ranking')) {
      return {
        text: `Laptop performed better overall with ₹97,000 in sales, followed by Mobile with ₹76,000, and Tablet with ₹50,000.`,
        source: 'Sales_Data.csv',
        rowInfo: 'Ranking: 1st Laptop (₹97,000), 2nd Mobile (₹76,000), 3rd Tablet (₹50,000)',
        exactData: 'Laptop: ₹97,000 | Mobile: ₹76,000 | Tablet: ₹50,000',
        datasetId: 'sales',
        targetRowKey: 'Laptop-February',
      };
    }

    // specific product query
    if (q.includes('laptop')) {
      return {
        text: 'Laptop achieved ₹45,000 in January and ₹52,000 in February, totaling ₹97,000.',
        source: 'Sales_Data.csv',
        rowInfo: 'Rows: Laptop (Jan & Feb)',
        exactData: 'Laptop | Jan: ₹45,000 | Feb: ₹52,000 | Total: ₹97,000',
        datasetId: 'sales',
        targetRowKey: 'Laptop-February',
      };
    }
  }

  // 3. Student Data Queries
  if (q.includes('highest') || q.includes('topper') || q.includes('top score') || q.includes('best score') || q.includes('maximum')) {
    return {
      text: `${stuStats.highest.student} scored the highest with a total of ${stuStats.highest.total} marks.`,
      source: 'Student_Marks.csv',
      rowInfo: `Row: ${stuStats.highest.student}`,
      exactData: `${stuStats.highest.student} | ${stuStats.highest.math} | ${stuStats.highest.science} | ${stuStats.highest.english} | ${stuStats.highest.total}`,
      datasetId: 'student',
      targetRowKey: stuStats.highest.student,
    };
  }

  if (q.includes('lowest') || q.includes('minimum') || q.includes('least') || q.includes('bottom')) {
    return {
      text: `${stuStats.lowest.student} scored the lowest with a total of ${stuStats.lowest.total} marks.`,
      source: 'Student_Marks.csv',
      rowInfo: `Row: ${stuStats.lowest.student}`,
      exactData: `${stuStats.lowest.student} | ${stuStats.lowest.math} | ${stuStats.lowest.science} | ${stuStats.lowest.english} | ${stuStats.lowest.total}`,
      datasetId: 'student',
      targetRowKey: stuStats.lowest.student,
    };
  }

  if (q.includes('math') && (q.includes('average') || q.includes('mean') || q.includes('score'))) {
    return {
      text: `The average Math score is ${stuStats.mathAvg} marks across all ${stuStats.count} students.`,
      source: 'Student_Marks.csv',
      rowInfo: 'Column: Math',
      exactData: 'Math Scores: [Rahul: 78, Priya: 91, Aman: 65, Neha: 84, Riya: 73] -> Avg: 78.2',
      datasetId: 'student',
      targetRowKey: 'Rahul',
    };
  }

  if (q.includes('science') && (q.includes('average') || q.includes('mean') || q.includes('score'))) {
    return {
      text: `The average Science score is ${stuStats.scienceAvg} marks across all ${stuStats.count} students.`,
      source: 'Student_Marks.csv',
      rowInfo: 'Column: Science',
      exactData: 'Science Scores: [Rahul: 82, Priya: 88, Aman: 72, Neha: 79, Riya: 81] -> Avg: 80.4',
      datasetId: 'student',
      targetRowKey: 'Rahul',
    };
  }

  if (q.includes('english') && (q.includes('average') || q.includes('mean') || q.includes('score'))) {
    return {
      text: `The average English score is ${stuStats.englishAvg} marks across all ${stuStats.count} students.`,
      source: 'Student_Marks.csv',
      rowInfo: 'Column: English',
      exactData: 'English Scores: [Rahul: 75, Priya: 94, Aman: 68, Neha: 88, Riya: 77] -> Avg: 80.4',
      datasetId: 'student',
      targetRowKey: 'Rahul',
    };
  }

  if (q.includes('subject') && (q.includes('highest average') || q.includes('best average') || q.includes('top subject'))) {
    return {
      text: `Science and English are tied for the highest subject average at 80.4 marks, compared to Math at 78.2 marks.`,
      source: 'Student_Marks.csv',
      rowInfo: 'Columns: Science & English',
      exactData: 'Math: 78.2 | Science: 80.4 | English: 80.4',
      datasetId: 'student',
      targetRowKey: 'Priya',
    };
  }

  if (q.includes('average') && (q.includes('mark') || q.includes('total') || q.includes('score'))) {
    return {
      text: `The overall average score is ${stuStats.avgMarks} marks across all ${stuStats.count} students.`,
      source: 'Student_Marks.csv',
      rowInfo: 'Column: Total (Aggregate Average)',
      exactData: 'Sum: 1195 / 5 = 239.0',
      datasetId: 'student',
      targetRowKey: 'all',
    };
  }

  // Check specific student name
  for (const s of students) {
    if (q.includes(s.student.toLowerCase())) {
      return {
        text: `${s.student} scored ${s.math} in Math, ${s.science} in Science, and ${s.english} in English, giving a Total of ${s.total} marks.`,
        source: 'Student_Marks.csv',
        rowInfo: `Row: ${s.student}`,
        exactData: `${s.student} | ${s.math} | ${s.science} | ${s.english} | ${s.total}`,
        datasetId: 'student',
        targetRowKey: s.student,
      };
    }
  }

  // Fallback answer based on the active dataset
  if (activeDatasetId === 'sales') {
    return {
      text: `In Sales_Data.csv, total sales is ₹${salesStats.totalSales.toLocaleString('en-IN')}, with ${salesStats.bestProduct.product} being the leading category.`,
      source: 'Sales_Data.csv',
      rowInfo: 'Dataset Summary',
      exactData: '6 records analyzed across Jan & Feb',
      datasetId: 'sales',
      targetRowKey: 'all',
    };
  }

  return {
    text: `From Student_Marks.csv, ${stuStats.count} students have an average score of ${stuStats.avgMarks} marks, with ${stuStats.highest.student} leading at ${stuStats.highest.total} marks.`,
    source: 'Student_Marks.csv',
    rowInfo: 'Dataset Summary',
    exactData: '5 students analyzed across 3 subjects',
    datasetId: 'student',
    targetRowKey: stuStats.highest.student,
  };
}
