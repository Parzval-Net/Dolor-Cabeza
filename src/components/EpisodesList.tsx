
import { useState } from 'react';
import { HeadacheEntry } from '@/types/headache';
import EditEpisodeDialog from './EditEpisodeDialog';
import { useToast } from '@/hooks/use-toast';
import EpisodesHeader from './episodes/EpisodesHeader';
import EmptyEpisodesState from './episodes/EmptyEpisodesState';
import EpisodeCard from './episodes/EpisodeCard';

interface EpisodesListProps {
  entries: HeadacheEntry[];
  onUpdateEntry: (entry: HeadacheEntry) => void;
  onDeleteEntry: (entryId: string) => void;
}

const EpisodesList = ({ entries, onUpdateEntry, onDeleteEntry }: EpisodesListProps) => {
  const [editingEntry, setEditingEntry] = useState<HeadacheEntry | null>(null);
  const { toast } = useToast();

  const handleDelete = (entryId: string) => {
    onDeleteEntry(entryId);
    toast({
      title: "Episodio eliminado",
      description: "El episodio ha sido eliminado exitosamente.",
    });
  };

  const handleEdit = (entry: HeadacheEntry) => {
    setEditingEntry(entry);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <EpisodesHeader entryCount={entries.length} />

      {entries.length === 0 ? (
        <EmptyEpisodesState />
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {entries.map((entry) => (
            <EpisodeCard
              key={entry.id}
              entry={entry}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {editingEntry && (
        <EditEpisodeDialog
          entry={editingEntry}
          onSave={(updatedEntry) => {
            onUpdateEntry(updatedEntry);
            setEditingEntry(null);
          }}
          onCancel={() => setEditingEntry(null)}
        />
      )}
    </div>
  );
};

export default EpisodesList;
