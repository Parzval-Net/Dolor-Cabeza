
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Sparkles } from 'lucide-react';
import { getRandomQuote } from '@/data/principitoQuotes';

const QuoteSection = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const handleNewQuote = () => {
    setQuote(getRandomQuote());
  };

  return (
    <Card className="glass-card-dark border border-amber-200/50 bg-gradient-to-r from-amber-50/80 to-orange-50/80 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Quote className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-amber-800">El Principito</h3>
            </div>
            <blockquote className="text-sm italic text-slate-700 leading-relaxed">
              "{quote}"
            </blockquote>
            <button
              onClick={handleNewQuote}
              className="text-xs text-amber-700 hover:text-amber-800 font-medium transition-colors"
            >
              Nueva cita ✨
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteSection;
