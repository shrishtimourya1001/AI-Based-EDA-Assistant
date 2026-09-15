import React from 'react';
import { PageId } from '../types';
import { Database, FileText, Bot, BarChart3, ShieldCheck, Home } from 'lucide-react';

interface NavbarProps {
  activePage: PageId;
  onSelectPage: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onSelectPage }) => {
  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'data', label: 'Data', icon: <Database className="w-4 h-4" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
    { id: 'assistant', label: 'AI Assistant', icon: <Bot className="w-4 h-4" /> },
    { id: 'results', label: 'Results', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'evidence', label: 'Evidence', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E6F2FF] shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Project Title and Human College Tag */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectPage('home')}>
            <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-xs font-semibold">
              <span className="text-base font-bold font-mono">EDA</span>
            </div>
            <div>
              <div className="text-lg font-bold text-[#173B65] tracking-tight leading-tight">
                AI-Based EDA Assistant
              </div>
              <div className="text-xs text-[#6B7280]">
                College Academic Project · Teacher-Friendly EDA
              </div>
            </div>
          </div>

          {/* Clean Navigation Menu */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => onSelectPage(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#E6F2FF] text-[#2563EB] font-semibold border-b-2 border-[#2563EB]'
                      : 'text-[#173B65] hover:bg-[#F4F9FF] hover:text-[#2563EB]'
                  }`}
                >
                  <span className={isActive ? 'text-[#2563EB]' : 'text-[#6B7280]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
