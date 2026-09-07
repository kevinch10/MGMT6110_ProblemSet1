import React from 'react';
import { Client } from '../types';
import { Clock, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';

interface CallsListScreenProps {
  clients: Client[];
  raisedPointIds: Set<string>;
  onSelectClient: (client: Client) => void;
}

export const CallsListScreen: React.FC<CallsListScreenProps> = ({
  clients,
  raisedPointIds,
  onSelectClient,
}) => {
  return (
    <div id="screen-tomorrows-calls" className="max-w-xl mx-auto px-4 py-4 pb-12">
      {/* Screen Title & Sub-header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Tomorrow's Calls
        </h2>
        <p className="text-base text-slate-600 mt-1">
          12 clients scheduled • Earliest first • Tap any client to open their brief
        </p>
      </div>

      {/* 12 Scheduled Client Rows */}
      <div className="space-y-3" role="list">
        {clients.map((client, index) => {
          // Check how many of the 3 points are raised
          const raisedCount = client.talkingPoints.filter(tp => raisedPointIds.has(tp.id)).length;

          return (
            <button
              key={client.id}
              id={`client-row-${client.id}`}
              onClick={() => onSelectClient(client)}
              className="w-full text-left bg-white rounded-xl border border-slate-200 hover:border-slate-400 active:bg-slate-50 transition-all p-4 shadow-xs touch-manipulation cursor-pointer block group focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              {/* Row Top: Call Time & Last Contact */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-base">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{client.callTime}</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Last contact: {client.lastContact}</span>
                </div>
              </div>

              {/* Client Name & Chevron / Raised Status */}
              <div className="flex items-center justify-between gap-3 my-1">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-slate-950">
                  {client.clientName}
                </h3>
                <div className="flex items-center gap-1.5 shrink-0">
                  {raisedCount > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {raisedCount}/3 raised
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>
              </div>

              {/* One line on why this call is on the list */}
              <div className="mt-1.5 pt-2 border-t border-slate-100">
                <p className="text-base text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">Why on list: </span>
                  {client.callReason}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
