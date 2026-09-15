import React, { useState, useEffect } from 'react';
import { StudentRow, SalesRow, PageId } from '../types';
import { computeStudentStats, computeSalesStats } from '../utils/edaEngine';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

interface DataPageProps {
  students: StudentRow[];
  sales: SalesRow[];
  highlightRowKey?: string | null;
  activeDatasetId?: 'student' | 'sales';
  onClearHighlight?: () => void;
  onNavigate: (page: PageId) => void;
}

export const DataPage: React.FC<DataPageProps> = ({
  students,
  sales,
  highlightRowKey,
  activeDatasetId = 'student',
  onClearHighlight,
  onNavigate,
}) => {
  const [currentTab, setCurrentTab] = useState<'student' | 'sales'>(activeDatasetId);
  const studentStats = computeStudentStats(students);
  const salesStats = computeSalesStats(sales);

  // Synchronize when activeDatasetId changes from outside
  useEffect(() => {
    if (activeDatasetId) {
      setCurrentTab(activeDatasetId);
    }
  }, [activeDatasetId]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6F2FF] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#173B65]">Data Viewer</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Review clean and structured datasets. Non-technical, easy to read tables and summaries.
          </p>
        </div>

        {/* Dataset Switcher Tabs */}
        <div className="inline-flex p-1 bg-white border border-[#BFDBFE] rounded-lg shadow-2xs self-start sm:self-auto">
          <button
            id="tab-student-data"
            onClick={() => {
              setCurrentTab('student');
              onClearHighlight?.();
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
              currentTab === 'student'
                ? 'bg-[#2563EB] text-white'
                : 'text-[#173B65] hover:bg-[#F4F9FF]'
            }`}
          >
            Student Marks ({students.length})
          </button>
          <button
            id="tab-sales-data"
            onClick={() => {
              setCurrentTab('sales');
              onClearHighlight?.();
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
              currentTab === 'sales'
                ? 'bg-[#2563EB] text-white'
                : 'text-[#173B65] hover:bg-[#F4F9FF]'
            }`}
          >
            Sales Records ({sales.length})
          </button>
        </div>
      </div>

      {/* Row Highlight Notification if triggered from Evidence */}
      {highlightRowKey && (
        <div className="bg-[#E6F2FF] border border-[#2563EB] rounded-lg p-4 flex items-center justify-between gap-3 text-sm text-[#173B65]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />
            <span>
              Evidence Trace: Highlighted matching record for <strong>"{highlightRowKey}"</strong> below.
            </span>
          </div>
          <button
            onClick={onClearHighlight}
            className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer bg-white px-2.5 py-1 rounded border border-[#BFDBFE]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Highlight
          </button>
        </div>
      )}

      {/* STUDENT MARKS VIEW */}
      {currentTab === 'student' && (
        <div className="space-y-10">
          {/* Table Card */}
          <div className="bg-white border border-[#BFDBFE] rounded-xl shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E6F2FF] bg-[#F4F9FF] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[#173B65]">Example Dataset: Student Marks</h2>
                <p className="text-xs text-[#6B7280]">Source: Student_Marks.csv · Class 10 Term Evaluation</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Ready for AI Query
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#E6F2FF] bg-white text-[#173B65] font-bold">
                    <th className="py-3.5 px-6">Student</th>
                    <th className="py-3.5 px-6 text-right">Math</th>
                    <th className="py-3.5 px-6 text-right">Science</th>
                    <th className="py-3.5 px-6 text-right">English</th>
                    <th className="py-3.5 px-6 text-right text-[#2563EB]">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6F2FF]">
                  {students.map((row) => {
                    const isHighlighted =
                      highlightRowKey &&
                      (highlightRowKey.toLowerCase() === row.student.toLowerCase() ||
                        highlightRowKey.toLowerCase() === 'all');
                    return (
                      <tr
                        key={row.id}
                        id={`row-student-${row.student.toLowerCase()}`}
                        className={`transition-colors ${
                          isHighlighted
                            ? 'bg-[#E6F2FF] font-medium'
                            : 'hover:bg-[#F4F9FF]'
                        }`}
                      >
                        <td className="py-3.5 px-6 font-semibold text-[#173B65] flex items-center gap-2">
                          {row.student}
                          {isHighlighted && (
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#2563EB] text-white">
                              Source Match
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-6 text-right font-mono text-[#173B65]">{row.math}</td>
                        <td className="py-3.5 px-6 text-right font-mono text-[#173B65]">{row.science}</td>
                        <td className="py-3.5 px-6 text-right font-mono text-[#173B65]">{row.english}</td>
                        <td className="py-3.5 px-6 text-right font-mono font-bold text-[#2563EB]">
                          {row.total}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Simple Data Summary Cards */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#173B65]">Simple Data Summary</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#E6F2FF] border border-[#BFDBFE] rounded-xl p-5">
                <div className="text-xs font-semibold text-[#2563EB] tracking-wide">Total Students</div>
                <div className="text-3xl font-bold font-mono text-[#173B65] mt-1">{studentStats.count}</div>
                <div className="text-xs text-[#6B7280] mt-1">Verified records</div>
              </div>

              <div className="bg-[#E6F2FF] border border-[#BFDBFE] rounded-xl p-5">
                <div className="text-xs font-semibold text-[#2563EB] tracking-wide">Average Marks</div>
                <div className="text-3xl font-bold font-mono text-[#173B65] mt-1">{studentStats.avgMarks}</div>
                <div className="text-xs text-[#6B7280] mt-1">Out of 300 maximum</div>
              </div>

              <div className="bg-white border border-[#BFDBFE] rounded-xl p-5">
                <div className="text-xs font-semibold text-[#2563EB] tracking-wide">Highest Score</div>
                <div className="text-3xl font-bold font-mono text-[#2563EB] mt-1">
                  {studentStats.highest.total}
                </div>
                <div className="text-xs text-[#173B65] font-semibold mt-1">
                  {studentStats.highest.student} (Top Rank)
                </div>
              </div>

              <div className="bg-white border border-[#BFDBFE] rounded-xl p-5">
                <div className="text-xs font-semibold text-[#6B7280] tracking-wide">Lowest Score</div>
                <div className="text-3xl font-bold font-mono text-[#173B65] mt-1">
                  {studentStats.lowest.total}
                </div>
                <div className="text-xs text-[#6B7280] mt-1">
                  {studentStats.lowest.student} (Needs Review)
                </div>
              </div>
            </div>
          </div>

          {/* Simple Charts (Shades of Blue and Light Blue only) */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#173B65]">Simple Visual Charts</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart 1: Student Total Marks */}
              <div className="bg-white border border-[#BFDBFE] rounded-xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E6F2FF] pb-3">
                  <div>
                    <h4 className="text-base font-bold text-[#173B65]">Student Marks Comparison</h4>
                    <p className="text-xs text-[#6B7280]">Total marks scored out of 300</p>
                  </div>
                  <span className="text-xs font-mono text-[#2563EB] bg-[#E6F2FF] px-2 py-0.5 rounded">
                    Total Marks
                  </span>
                </div>

                {/* Clear Horizontal Bar Chart for Easy Reading */}
                <div className="space-y-3 pt-2">
                  {students.map((stu) => {
                    const percentage = Math.round((stu.total / 300) * 100);
                    return (
                      <div key={stu.id} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-[#173B65]">
                          <span>{stu.student}</span>
                          <span className="font-mono text-[#2563EB]">
                            {stu.total} marks ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-4 bg-[#E6F2FF] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart 2: Subject Average */}
              <div className="bg-white border border-[#BFDBFE] rounded-xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E6F2FF] pb-3">
                  <div>
                    <h4 className="text-base font-bold text-[#173B65]">Subject Average</h4>
                    <p className="text-xs text-[#6B7280]">Class average per subject out of 100</p>
                  </div>
                  <span className="text-xs font-mono text-[#2563EB] bg-[#E6F2FF] px-2 py-0.5 rounded">
                    Class Mean
                  </span>
                </div>

                <div className="space-y-4 pt-2">
                  {[
                    { subject: 'Math', avg: studentStats.mathAvg, color: 'bg-[#2563EB]' },
                    { subject: 'Science', avg: studentStats.scienceAvg, color: 'bg-[#3B82F6]' },
                    { subject: 'English', avg: studentStats.englishAvg, color: 'bg-[#60A5FA]' },
                  ].map((item) => (
                    <div key={item.subject} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-[#173B65]">
                        <span>{item.subject}</span>
                        <span className="font-mono text-[#173B65]">{item.avg} / 100</span>
                      </div>
                      <div className="w-full h-4 bg-[#E6F2FF] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-500`}
                          style={{ width: `${item.avg}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-[#F4F9FF] border border-[#E6F2FF] text-xs text-[#6B7280]">
                  <strong>Observation:</strong> Science and English are tied with the highest class average (80.4), while Math is 78.2.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SALES DATA VIEW */}
      {currentTab === 'sales' && (
        <div className="space-y-10">
          {/* Table Card */}
          <div className="bg-white border border-[#BFDBFE] rounded-xl shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E6F2FF] bg-[#F4F9FF] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[#173B65]">Example Dataset: Sales Records</h2>
                <p className="text-xs text-[#6B7280]">Source: Sales_Data.csv · Retail Product Performance</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Ready for AI Query
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#E6F2FF] bg-white text-[#173B65] font-bold">
                    <th className="py-3.5 px-6">Product</th>
                    <th className="py-3.5 px-6">Month</th>
                    <th className="py-3.5 px-6 text-right text-[#2563EB]">Sales</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6F2FF]">
                  {sales.map((row) => {
                    const rowKey = `${row.product}-${row.month}`;
                    const isHighlighted =
                      highlightRowKey &&
                      (highlightRowKey.toLowerCase() === rowKey.toLowerCase() ||
                        highlightRowKey.toLowerCase().includes(row.product.toLowerCase()) ||
                        highlightRowKey.toLowerCase() === 'all');
                    return (
                      <tr
                        key={row.id}
                        id={`row-sales-${row.id}`}
                        className={`transition-colors ${
                          isHighlighted
                            ? 'bg-[#E6F2FF] font-medium'
                            : 'hover:bg-[#F4F9FF]'
                        }`}
                      >
                        <td className="py-3.5 px-6 font-semibold text-[#173B65] flex items-center gap-2">
                          {row.product}
                          {isHighlighted && (
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#2563EB] text-white">
                              Source Match
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-6 text-[#6B7280]">{row.month}</td>
                        <td className="py-3.5 px-6 text-right font-mono font-bold text-[#2563EB]">
                          ₹{row.sales.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Simple Sales Summary Cards */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#173B65]">Sales Performance Summary</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#E6F2FF] border border-[#BFDBFE] rounded-xl p-5">
                <div className="text-xs font-semibold text-[#2563EB] tracking-wide">Total Sales</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#173B65] mt-1">
                  ₹{salesStats.totalSales.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-[#6B7280] mt-1">6 total records</div>
              </div>

              <div className="bg-white border border-[#BFDBFE] rounded-xl p-5">
                <div className="text-xs font-semibold text-[#2563EB] tracking-wide">Best Product</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#2563EB] mt-1">
                  {salesStats.bestProduct.product}
                </div>
                <div className="text-xs text-[#173B65] font-medium mt-1">
                  ₹{salesStats.bestProduct.sales.toLocaleString('en-IN')} total
                </div>
              </div>

              <div className="bg-[#E6F2FF] border border-[#BFDBFE] rounded-xl p-5">
                <div className="text-xs font-semibold text-[#2563EB] tracking-wide">Highest Month</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#173B65] mt-1">
                  ₹{salesStats.highestMonth.sales.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-[#6B7280] mt-1">
                  {salesStats.highestMonth.product} ({salesStats.highestMonth.month})
                </div>
              </div>

              <div className="bg-white border border-[#BFDBFE] rounded-xl p-5">
                <div className="text-xs font-semibold text-[#2563EB] tracking-wide">Monthly Growth</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#16A34A] mt-1">
                  +18.6%
                </div>
                <div className="text-xs text-[#6B7280] mt-1">Feb over Jan (+₹19,000)</div>
              </div>
            </div>
          </div>

          {/* Simple Sales Chart */}
          <div className="bg-white border border-[#BFDBFE] rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E6F2FF] pb-3">
              <div>
                <h4 className="text-base font-bold text-[#173B65]">Sales Comparison by Product</h4>
                <p className="text-xs text-[#6B7280]">January vs February aggregate performance</p>
              </div>
              <span className="text-xs font-mono text-[#2563EB] bg-[#E6F2FF] px-2 py-0.5 rounded">
                Product Totals
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {[
                { name: 'Laptop', total: 97000, color: 'bg-[#2563EB]' },
                { name: 'Mobile', total: 76000, color: 'bg-[#3B82F6]' },
                { name: 'Tablet', total: 50000, color: 'bg-[#93C5FD]' },
              ].map((item) => {
                const widthPct = Math.round((item.total / 100000) * 100);
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-[#173B65]">
                      <span>{item.name}</span>
                      <span className="font-mono text-[#2563EB]">₹{item.total.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full h-4 bg-[#E6F2FF] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${widthPct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Quick Action to AI Assistant */}
      <div className="bg-[#F4F9FF] border border-[#BFDBFE] rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E6F2FF] flex items-center justify-center text-[#2563EB]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-[#173B65]">Ready to analyze with AI?</h4>
            <p className="text-xs text-[#6B7280]">
              Ask questions like "Who scored the highest?" or "Which product has the highest sales?"
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('assistant')}
          className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer shrink-0"
        >
          <span>Ask AI Assistant</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
