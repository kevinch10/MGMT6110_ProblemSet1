import React from 'react';
import { Client } from '../types';
import { Clock, Quote, CheckCircle2, ArrowLeft, Tag } from 'lucide-react';

interface ClientBriefScreenProps {
  client: Client;
  raisedPointIds: Set<string>;
  onToggleRaised: (pointId: string) => void;
  onBack: () => void;
}

export const ClientBriefScreen: React.FC<ClientBriefScreenProps> = ({
  client,
  raisedPointIds,
  onToggleRaised,
  onBack,
}) => {
  return (
    <div id="screen-client-brief" className="max-w-xl mx-auto px-4 py-4 pb-16">
      {/* Top quick back link for phone navigation */}
      <button
        id="client-brief-back-link"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 active:text-slate-950 font-medium text-base mb-3 py-1 cursor-pointer touch-manipulation"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Tomorrow's Calls</span>
      </button>

      {/* Above the cards: Client's name, call time, and stated priority in their own words */}
      <div id="brief-client-header" className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs mb-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Client Brief</span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              {client.clientName}
            </h2>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold text-base shrink-0">
            <Clock className="w-4 h-4 text-amber-700" />
            <span>{client.callTime}</span>
          </div>
        </div>

        {/* Stated Priority in their own words */}
        <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50 rounded-lg p-3.5 border">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
            <Quote className="w-3.5 h-3.5 text-slate-400" />
            <span>Stated Priority (in their own words)</span>
          </div>
          <p className="text-base font-medium text-slate-800 italic leading-relaxed">
            "{client.statedPriority}"
          </p>
        </div>
      </div>

      {/* Brief section label */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-base font-bold uppercase tracking-wider text-slate-600">
          3 Things Worth Mentioning
        </h3>
        <span className="text-sm font-semibold text-slate-500">
          {client.talkingPoints.filter(tp => raisedPointIds.has(tp.id)).length} of 3 raised
        </span>
      </div>

      {/* Exactly three talking-point cards */}
      <div className="space-y-4" role="list">
        {client.talkingPoints.map((tp, idx) => {
          const isRaised = raisedPointIds.has(tp.id);

          return (
            <div
              key={tp.id}
              id={`talking-point-card-${idx + 1}`}
              className={`bg-white rounded-xl border transition-all p-5 shadow-xs ${
                isRaised
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/30'
                  : 'border-slate-200'
              }`}
            >
              {/* Card number badge & Source label with date */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-sm">
                  {idx + 1}
                </span>

                {/* Plain text source label and date */}
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  <Tag className="w-3 h-3 text-slate-400" />
                  <span className="truncate max-w-[260px]">{tp.source}</span>
                </div>
              </div>

              {/* 1) The point in one sentence */}
              <div className="mb-3">
                <h4 className="text-lg font-bold text-slate-900 leading-snug">
                  {tp.point}
                </h4>
              </div>

              {/* 2) The reason it matters to this client in one sentence */}
              <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-base text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900">Why it matters: </span>
                  {tp.reason}
                </p>
              </div>

              {/* 3) Tapped "Raised on the call" button */}
              <button
                id={`btn-raised-${tp.id}`}
                onClick={() => onToggleRaised(tp.id)}
                className={`w-full min-h-[48px] px-4 py-3 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition-all cursor-pointer touch-manipulation ${
                  isRaised
                    ? 'bg-emerald-700 text-white shadow-xs hover:bg-emerald-800 active:bg-emerald-900'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 border border-slate-300'
                }`}
                aria-pressed={isRaised}
              >
                {isRaised ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                    <span>Raised on the call</span>
                  </>
                ) : (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-slate-400 inline-block"></span>
                    <span>Raised on the call</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Return to calls list navigation at the bottom of the phone screen */}
      <div className="mt-8 pt-4 border-t border-slate-200 text-center">
        <button
          id="bottom-back-button"
          onClick={onBack}
          className="w-full min-h-[48px] py-3 px-4 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-base rounded-xl transition-colors cursor-pointer touch-manipulation"
        >
          Return to Tomorrow's Calls (12)
        </button>
      </div>
    </div>
  );
};
