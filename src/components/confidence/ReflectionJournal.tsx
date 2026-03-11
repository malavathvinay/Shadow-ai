import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Save, Calendar, Sparkles, Heart, Target } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  prompts: {
    gratitude: string;
    achievement: string;
    challenge: string;
    tomorrow: string;
  };
}

const journalPrompts = [
  {
    icon: Heart,
    label: "What am I grateful for today?",
    key: "gratitude" as const,
    placeholder: "Three things that brought me joy or peace today..."
  },
  {
    icon: Sparkles,
    label: "What did I accomplish today?",
    key: "achievement" as const,
    placeholder: "Even small wins count - what am I proud of?"
  },
  {
    icon: Target,
    label: "What challenged me today?",
    key: "challenge" as const,
    placeholder: "How did I grow or what did I learn from difficulties?"
  },
  {
    icon: Calendar,
    label: "What do I hope for tomorrow?",
    key: "tomorrow" as const,
    placeholder: "One intention or goal for tomorrow..."
  }
];

export function ReflectionJournal() {
  const [currentEntry, setCurrentEntry] = useState<JournalEntry>({
    id: '',
    date: new Date().toDateString(),
    content: '',
    prompts: {
      gratitude: '',
      achievement: '',
      challenge: '',
      tomorrow: ''
    }
  });
  const [savedEntries, setSavedEntries] = useState<JournalEntry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activePrompt, setActivePrompt] = useState<number>(0);

  useEffect(() => {
    // Load saved entries from localStorage
    const saved = localStorage.getItem('journal_entries');
    if (saved) {
      setSavedEntries(JSON.parse(saved));
    }

    // Load today's entry if it exists
    const today = new Date().toDateString();
    const todayEntry = saved ? JSON.parse(saved).find((entry: JournalEntry) => entry.date === today) : null;
    if (todayEntry) {
      setCurrentEntry(todayEntry);
    }
  }, []);

  const handleSave = () => {
    const entryToSave = {
      ...currentEntry,
      id: currentEntry.id || `entry_${Date.now()}`,
      date: new Date().toDateString()
    };

    const updatedEntries = savedEntries.filter(entry => entry.date !== entryToSave.date);
    updatedEntries.unshift(entryToSave);

    setSavedEntries(updatedEntries);
    localStorage.setItem('journal_entries', JSON.stringify(updatedEntries));
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const updatePrompt = (key: keyof JournalEntry['prompts'], value: string) => {
    setCurrentEntry(prev => ({
      ...prev,
      prompts: {
        ...prev.prompts,
        [key]: value
      }
    }));
  };

  const hasContent = Object.values(currentEntry.prompts).some(value => value.trim().length > 0) || 
                    currentEntry.content.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Reflection saved! 🌟</span>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Daily Reflection</h3>
            <p className="text-sm text-gray-600">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>
      </Card>

      {/* Guided Prompts */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Guided Reflection</h4>
          <div className="flex space-x-1">
            {journalPrompts.map((_, index) => (
              <button
                key={index}
                onClick={() => setActivePrompt(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activePrompt ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          key={activePrompt}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {journalPrompts.map((prompt, index) => {
            if (index !== activePrompt) return null;
            
            const Icon = prompt.icon;
            
            return (
              <div key={prompt.key} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon className="w-4 h-4 text-purple-600" />
                  </div>
                  <h5 className="font-medium text-gray-900">{prompt.label}</h5>
                </div>
                
                <textarea
                  value={currentEntry.prompts[prompt.key]}
                  onChange={(e) => updatePrompt(prompt.key, e.target.value)}
                  placeholder={prompt.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  rows={4}
                />
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setActivePrompt(Math.max(0, activePrompt - 1))}
                    disabled={activePrompt === 0}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={() => setActivePrompt(Math.min(journalPrompts.length - 1, activePrompt + 1))}
                    disabled={activePrompt === journalPrompts.length - 1}
                    className="px-4 py-2 text-sm text-purple-600 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            );
          })}
        </motion.div>
      </Card>

      {/* Free Writing */}
      <Card className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Free Writing</h4>
        <textarea
          value={currentEntry.content}
          onChange={(e) => setCurrentEntry(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Write freely about anything on your mind... your thoughts, feelings, dreams, or worries. This is your safe space."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
          rows={6}
        />
      </Card>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        size="lg"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        disabled={!hasContent}
      >
        <Save className="w-5 h-5 mr-2" />
        Save Today's Reflection
      </Button>

      {/* Recent Entries */}
      {savedEntries.length > 0 && (
        <Card className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Recent Reflections</h4>
          <div className="space-y-3">
            {savedEntries.slice(0, 3).map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {new Date(entry.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {entry.content || Object.values(entry.prompts).find(p => p.trim()) || 'No content'}
                </p>
              </motion.div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}