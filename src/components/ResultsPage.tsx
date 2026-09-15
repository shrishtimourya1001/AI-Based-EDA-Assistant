import React from 'react';
import { StudentRow, SalesRow, PageId } from '../types';
import { computeStudentStats, computeSalesStats } from '../utils/edaEngine';
import { Award, TrendingUp, BarChart2, BookOpen, ArrowRight } from 'lucide-react';

interface ResultsPageProps {
  students: StudentRow[];
  sales: SalesRow[];
  onNavigateToData: (dataset: 'student' | 'sales') => void;
  onNavigateToAssistant: (dataset: 'student' | 'sales') => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  students,
  sales,
  onNavigateToData,
  onNavigateToAssistant,
}) => {
  const studentStats = computeStudentStats(students);
  const salesStats = computeSalesStats(sales);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-12">
      {/* Page Header */}
      <div className="border-b border-[#E6F2FF] pb-6 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#173B65]">Results & Analysis</h1>
        <p className="text-sm text-[#6B7280]">
          Executive summary and visual findings generated from your verified datasets.
        </p>
      </div>

      {/* SECTION 1: STUDENT PERFORMANCE */}
      <div className="bg-white border border-[#BFDBFE] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E6F2FF] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E6F2FF] text-[#2563EB] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#173B65]">Student Performance</h2>
              <p className="text-xs text-[#6B7280]">Analysis from Student_Marks.csv</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToData('student')}
            className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>View Full Marks Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#F4F9FF] border border-[#BFDBFE] rounded-lg p-4">
            <div className="text-xs font-medium text-[#6B7280]">Highest Score</div>
            <div className="text-xl font-bold text-[#2563EB] mt-1 font-mono">
              {studentStats.highest.student} — {studentStats.highest.total}
            </div>
            <div className="text-[11px] text-[#173B65] mt-1">Top performer in the class</div>
          </div>

          <div className="bg-[#F4F9FF] border border-[#BFDBFE] rounded-lg p-4">
            <div className="text-xs font-medium text-[#6B7280]">Lowest Score</div>
            <div className="text-xl font-bold text-[#173B65] mt-1 font-mono">
              {studentStats.lowest.student} — {studentStats.lowest.total}
            </div>
            <div className="text-[11px] text-[#6B7280] mt-1">Recommended for mentor review</div>
          </div>

          <div className="bg-[#E6F2FF] border border-[#BFDBFE] rounded-lg p-4">
            <div className="text-xs font-medium text-[#2563EB]">Average Score</div>
            <div className="text-xl font-bold text-[#173B65] mt-1 font-mono">
              {studentStats.avgMarks}
            </div>
            <div className="text-[11px] text-[#6B7280] mt-1">Class average across 5 students</div>
          </div>
        </div>

        {/* Simple Blue Bar Chart */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-[#6B7280]">
            <span className="font-semibold text-[#173B65]">Student Total Marks Comparison</span>
            <span className="font-mono text-[#2563EB]">Max score: 300</span>
          </div>

          <div className="space-y-2.5">
            {students.map((stu) => {
              const pct = Math.round((stu.total / 300) * 100);
              const isTop = stu.student === studentStats.highest.student;
              return (
                <div key={stu.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className={isTop ? 'font-bold text-[#2563EB]' : 'text-[#173B65]'}>
                      {stu.student} {isTop && '★ (Highest)'}
                    </span>
                    <span className="font-mono text-[#2563EB]">{stu.total}</span>
                  </div>
                  <div className="w-full h-3.5 bg-[#E6F2FF] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isTop ? 'bg-[#2563EB]' : 'bg-[#60A5FA]'
                      }`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 2: SALES PERFORMANCE */}
      <div className="bg-white border border-[#BFDBFE] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E6F2FF] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E6F2FF] text-[#2563EB] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#173B65]">Sales Performance</h2>
              <p className="text-xs text-[#6B7280]">Analysis from Sales_Data.csv</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToData('sales')}
            className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>View Full Sales Records</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#F4F9FF] border border-[#BFDBFE] rounded-lg p-4">
            <div className="text-xs font-medium text-[#6B7280]">Best Product</div>
            <div className="text-xl font-bold text-[#2563EB] mt-1 font-mono">
              {salesStats.bestProduct.product}
            </div>
            <div className="text-[11px] text-[#173B65] mt-1">₹97,000 cumulative sales</div>
          </div>

          <div className="bg-[#F4F9FF] border border-[#BFDBFE] rounded-lg p-4">
            <div className="text-xs font-medium text-[#6B7280]">Highest Monthly Sales</div>
            <div className="text-xl font-bold text-[#173B65] mt-1 font-mono">
              ₹52,000
            </div>
            <div className="text-[11px] text-[#6B7280] mt-1">Laptop in February</div>
          </div>

          <div className="bg-[#E6F2FF] border border-[#BFDBFE] rounded-lg p-4">
            <div className="text-xs font-medium text-[#2563EB]">Total Sales</div>
            <div className="text-xl font-bold text-[#173B65] mt-1 font-mono">
              ₹2,23,000
            </div>
            <div className="text-[11px] text-[#6B7280] mt-1">Across 6 records in Jan & Feb</div>
          </div>
        </div>

        {/* Simple Blue Bar Chart for Sales */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-[#6B7280]">
            <span className="font-semibold text-[#173B65]">Product Total Sales Comparison</span>
            <span className="font-mono text-[#2563EB]">Target: ₹1,00,000</span>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Laptop', sales: 97000, color: 'bg-[#2563EB]' },
              { label: 'Mobile', sales: 76000, color: 'bg-[#3B82F6]' },
              { label: 'Tablet', sales: 50000, color: 'bg-[#93C5FD]' },
            ].map((p) => {
              const widthPct = Math.round((p.sales / 100000) * 100);
              return (
                <div key={p.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-[#173B65]">
                    <span>{p.label}</span>
                    <span className="font-mono font-bold text-[#2563EB]">
                      ₹{p.sales.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="w-full h-3.5 bg-[#E6F2FF] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${p.color} rounded-full transition-all duration-500`}
                      style={{ width: `${widthPct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
