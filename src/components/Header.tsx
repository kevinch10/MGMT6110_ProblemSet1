import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  activeClientName?: string;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeClientName, onBack }) => {
  return (
    <header id="app-header" className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 px-4 py-3 shadow-sm">
      <div className="max-w-xl mx-auto flex items-center justify-between min-h-11">
        {activeClientName && onBack ? (
          <button
            id="back-to-calls-button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 active:text-amber-100 font-medium text-base py-1 px-2 -ml-2 rounded-lg transition-colors touch-manipulation cursor-pointer"
            aria-label="Back to Tomorrow's Calls"
          >
            <ChevronLeft className="w-5 h-5 shrink-0" />
            <span>Tomorrow's Calls</span>
          </button>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white leading-none">TALKPOINTS</h1>
              <p className="text-xs text-slate-400 mt-0.5">Private Wealth Singapore • Call Briefs</p>
            </div>
          </div>
        )}

        <div className="text-right">
          <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Tomorrow
          </span>
        </div>
      </div>
    </header>
  );
};
