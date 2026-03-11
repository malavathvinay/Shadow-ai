import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';

interface Mood {
  emoji: string;
  label: string;
  color: string;
  bgColor: string;
}

const moods: Mood[] = [
  { emoji: '😊', label: 'Great', color: 'text-green-600', bgColor: 'bg-green-100' },
  { emoji: '🙂', label: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { emoji: '😐', label: 'Okay', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  { emoji: '😔', label: 'Low', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { emoji: '😢', label: 'Struggling', color: 'text-red-600', bgColor: 'bg-red-100' }
];

export function MoodCheck() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodHistory, setMoodHistory] = useState<number[]>([2, 1, 3, 2, 1]); // Last 5 days
  const [showSuccess, setShowSuccess] = useState(false);

  const handleMoodSelect = (moodIndex: number) => {
    setSelectedMood(moodIndex);
    setMoodHistory(prev => [moodIndex, ...prev.slice(0, 4)]);
    setShowSuccess(true);
    
    // Save to localStorage
    const today = new Date().toDateString();
    localStorage.setItem(`mood_${today}`, moodIndex.toString());
    
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const averageMood = moodHistory.reduce((sum, mood) => sum + mood, 0) / moodHistory.length;
  const moodTrend = moodHistory[0] - moodHistory[1];

  return (
    <Card className="p-4 mb-6">
      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center"
        >
          <p className="text-sm text-green-700 font-medium">
            Mood logged! Thank you for checking in with yourself 💚
          </p>
        </motion.div>
      )}

      <div className="flex items-center space-x-2 mb-4">
        <Heart className="w-5 h-5 text-pink-500" />
        <h3 className="font-semibold text-gray-900">How are you feeling today?</h3>
      </div>

      {/* Mood Selection */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {moods.map((mood, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleMoodSelect(index)}
            className={`p-3 rounded-xl text-center transition-all ${
              selectedMood === index
                ? `${mood.bgColor} ${mood.color} ring-2 ring-offset-2 ring-pink-300`
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="text-2xl mb-1">{mood.emoji}</div>
            <div className="text-xs font-medium text-gray-700">{mood.label}</div>
          </motion.button>
        ))}
      </div>

      {/* Mood Insights */}
      {moodHistory.length > 1 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="pt-4 border-t border-gray-100"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">5-Day Average</span>
              </div>
              <div className="text-2xl">{moods[Math.round(averageMood)].emoji}</div>
              <div className="text-xs text-gray-500">{moods[Math.round(averageMood)].label}</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <TrendingUp className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Trend</span>
              </div>
              <div className="text-2xl">
                {moodTrend > 0 ? '📈' : moodTrend < 0 ? '📉' : '➡️'}
              </div>
              <div className="text-xs text-gray-500">
                {moodTrend > 0 ? 'Improving' : moodTrend < 0 ? 'Declining' : 'Stable'}
              </div>
            </div>
          </div>

          {/* Mood History Visualization */}
          <div className="mt-4">
            <p className="text-xs text-gray-600 mb-2">Last 5 days:</p>
            <div className="flex space-x-1">
              {moodHistory.map((mood, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex-1 h-2 rounded-full ${moods[mood].bgColor}`}
                />
              ))}
            </div>
          </div>

          {/* Encouraging Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-3 bg-pink-50 rounded-lg text-center"
          >
            <p className="text-sm text-pink-700">
              {averageMood >= 2 
                ? "You're doing great! Keep nurturing your emotional wellbeing 🌸"
                : "Remember, it's okay to have difficult days. You're not alone in this journey 💜"
              }
            </p>
          </motion.div>
        </motion.div>
      )}
    </Card>
  );
}