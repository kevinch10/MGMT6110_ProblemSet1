import { useState } from 'react';
import { TOMORROW_CLIENTS } from './data';
import { Client } from './types';
import { Header } from './components/Header';
import { CallsListScreen } from './components/CallsListScreen';
import { ClientBriefScreen } from './components/ClientBriefScreen';

export default function App() {
  // Screen state: null means Tomorrow's Calls list, a clientId means Client Brief
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Set of talking point IDs marked as "Raised on the call"
  const [raisedPointIds, setRaisedPointIds] = useState<Set<string>>(new Set());

  // Find selected client if active
  const selectedClient = TOMORROW_CLIENTS.find(c => c.id === selectedClientId) || null;

  const handleSelectClient = (client: Client) => {
    setSelectedClientId(client.id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToCalls = () => {
    setSelectedClientId(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleToggleRaised = (pointId: string) => {
    setRaisedPointIds(prev => {
      const next = new Set(prev);
      if (next.has(pointId)) {
        next.delete(pointId);
      } else {
        next.add(pointId);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 antialiased flex flex-col">
      {/* Top Header */}
      <Header
        activeClientName={selectedClient?.clientName}
        onBack={selectedClient ? handleBackToCalls : undefined}
      />

      {/* Main Content Area: Screen 1 or Screen 2 */}
      <main className="flex-1 w-full">
        {selectedClient ? (
          <ClientBriefScreen
            client={selectedClient}
            raisedPointIds={raisedPointIds}
            onToggleRaised={handleToggleRaised}
            onBack={handleBackToCalls}
          />
        ) : (
          <CallsListScreen
            clients={TOMORROW_CLIENTS}
            raisedPointIds={raisedPointIds}
            onSelectClient={handleSelectClient}
          />
        )}
      </main>
    </div>
  );
}
