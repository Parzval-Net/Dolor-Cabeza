
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import CalendarView from '@/components/CalendarView';
import TrendsView from '@/components/TrendsView';
import HeadacheForm from '@/components/HeadacheForm';
import { HeadacheEntry } from '@/types/headache';

const Index = () => {
  const [entries, setEntries] = useState<HeadacheEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'calendar' | 'trends'>('dashboard');
  const { toast } = useToast();

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('headache-entries');
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries);
        setEntries(parsedEntries);
      } catch (error) {
        console.error('Error loading saved entries:', error);
      }
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('headache-entries', JSON.stringify(entries));
  }, [entries]);

  const handleSaveEntry = (entry: HeadacheEntry) => {
    setEntries(prev => [entry, ...prev]);
    setShowForm(false);
    toast({
      title: "Registro guardado",
      description: "Tu episodio de migraña ha sido registrado exitosamente.",
    });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'calendar':
        return <CalendarView entries={entries} />;
      case 'trends':
        return <TrendsView entries={entries} />;
      default:
        return <Dashboard entries={entries} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-lavender-50 to-coral-50">
      <Header 
        onNewEntry={() => setShowForm(true)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="max-w-6xl mx-auto p-4 pb-8">
        {renderCurrentView()}
      </main>

      {showForm && (
        <HeadacheForm
          onSave={handleSaveEntry}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Index;
