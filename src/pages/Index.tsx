
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import Dashboard from '@/components/Dashboard';
import CalendarView from '@/components/CalendarView';
import TrendsView from '@/components/TrendsView';
import EpisodesList from '@/components/EpisodesList';
import AdminPanel from '@/components/AdminPanel';
import SimpleHeadacheForm from '@/components/SimpleHeadacheForm';
import { HeadacheEntry } from '@/types/headache';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const Index = () => {
  const [entries, setEntries] = useState<HeadacheEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'calendar' | 'trends' | 'episodes' | 'admin'>('dashboard');
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

  // PWA Installation and mobile optimizations
  useEffect(() => {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Handle PWA install prompt
    let deferredPrompt: BeforeInstallPromptEvent | null;
    window.addEventListener('beforeinstallprompt', (e) => {
      deferredPrompt = e;
      console.log('PWA install prompt available');
    });

    // Check for new entry shortcut
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('action') === 'new') {
      setShowForm(true);
    }
  }, []);

  // Enhanced viewport height handling for mobile (especially Safari)
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', () => {
      setTimeout(setVH, 100); // Delay for Safari
    });

    // Prevent body scroll when modal is open
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
      document.body.style.overflow = 'unset';
    };
  }, [showForm]);

  const handleSaveEntry = (entry: HeadacheEntry) => {
    setEntries(prev => [entry, ...prev]);
    setShowForm(false);
    toast({
      title: "Registro guardado",
      description: "Tu episodio de migraña ha sido registrado exitosamente.",
    });

    // Haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  };

  const handleUpdateEntry = (updatedEntry: HeadacheEntry) => {
    setEntries(prev => prev.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry));
  };

  const handleDeleteEntry = (entryId: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== entryId));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'episodes':
        return (
          <EpisodesList 
            entries={entries} 
            onUpdateEntry={handleUpdateEntry}
            onDeleteEntry={handleDeleteEntry}
          />
        );
      case 'calendar':
        return <CalendarView entries={entries} />;
      case 'trends':
        return <TrendsView entries={entries} />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard entries={entries} />;
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-rose-50 via-lavender-50 to-coral-50 overflow-x-hidden" 
      style={{ 
        minHeight: 'calc(var(--vh, 1vh) * 100)',
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
    >
      <Header onNewEntry={() => setShowForm(true)} />
      
      <main className="max-w-6xl mx-auto p-3 lg:p-4 pb-20 lg:pb-8">
        <div className="animate-fade-in">
          {renderCurrentView()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {showForm && (
        <SimpleHeadacheForm
          onSave={handleSaveEntry}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Index;
