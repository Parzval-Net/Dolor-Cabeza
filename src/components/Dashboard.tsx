
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import EpisodeCountCard from './dashboard/EpisodeCountCard';
import AverageIntensityCard from './dashboard/AverageIntensityCard';
import TopMedicationCard from './dashboard/TopMedicationCard';
import RecentEpisodesList from './dashboard/RecentEpisodesList';
import TopDayCard from './dashboard/TopDayCard';
import QuoteSection from './dashboard/QuoteSection';
import { HeadacheEntry } from '@/types/headache';

interface DashboardProps {
  entries: HeadacheEntry[];
}

const Dashboard = ({ entries }: DashboardProps) => {
  const [dashboardDescription, setDashboardDescription] = useState('Conoce mejor tus patrones de dolor y toma decisiones informadas para tu bienestar');

  useEffect(() => {
    const loadDashboardDescription = () => {
      const savedSettings = localStorage.getItem('admin-settings');
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          if (settings.dashboardDescription) {
            setDashboardDescription(settings.dashboardDescription);
          }
        } catch (error) {
          console.error('Error loading dashboard description:', error);
        }
      }
    };

    loadDashboardDescription();

    const handleSettingsUpdate = (event: CustomEvent) => {
      if (event.detail?.dashboardDescription) {
        setDashboardDescription(event.detail.dashboardDescription);
      }
    };

    window.addEventListener('admin-settings-updated', handleSettingsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('admin-settings-updated', handleSettingsUpdate as EventListener);
    };
  }, []);

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  
  const monthlyEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate.getMonth() === thisMonth && entryDate.getFullYear() === thisYear;
  });

  const averageIntensity = monthlyEntries.length > 0 
    ? monthlyEntries.reduce((sum, entry) => sum + entry.intensity, 0) / monthlyEntries.length
    : 0;

  const mostUsedMedication = monthlyEntries
    .flatMap(entry => entry.medications)
    .reduce((acc, med) => {
      acc[med] = (acc[med] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topMedication = Object.entries(mostUsedMedication)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Ninguno';

  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime())
    .slice(0, 3);

  const getIntensityGradient = (intensity: number) => {
    if (intensity <= 3) return 'from-violet-400 to-purple-500';
    if (intensity <= 6) return 'from-fuchsia-400 to-pink-400';
    if (intensity <= 8) return 'from-rose-400 to-pink-500';
    return 'from-purple-700 to-fuchsia-700';
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center space-x-3 glass-card rounded-full px-6 py-3 mb-4">
          <Sparkles className="w-5 h-5 text-violet-500" />
          <span className="text-sm font-medium text-slate-600">Panel de Bienestar</span>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
          Tu salud en perspectiva
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {dashboardDescription}
        </p>
      </div>

      {/* Quote Section */}
      <QuoteSection />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <EpisodeCountCard count={monthlyEntries.length} />
        <AverageIntensityCard averageIntensity={averageIntensity} />
        <TopMedicationCard medication={topMedication} />
        <TopDayCard entries={entries} />
      </div>

      {/* Recent Episodes */}
      <div className="grid grid-cols-1 gap-8">
        <RecentEpisodesList entries={recentEntries} getIntensityGradient={getIntensityGradient} />
      </div>
    </div>
  );
};

export default Dashboard;
