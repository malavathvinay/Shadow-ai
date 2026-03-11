import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';

interface DailyNudgeCardProps {
  onNavigate: (screen: string) => void;
}

export function DailyNudgeCard({ onNavigate }: DailyNudgeCardProps) {
  const todaysNudge = {
    title: "Your invisible efforts matter",
    message: "Every small step you take while managing your family is building your future. Today, let's capture one skill you've gained from your daily responsibilities.",
    hasAudio: true,
  };

  return (
    <Card 
      hover 
      onClick={() => onNavigate('confidence')}
      className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6 border-0"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">Today's Nudge</span>
        </div>
        
        {todaysNudge.hasAudio && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
          >
            <Play className="w-4 h-4 ml-0.5" />
          </motion.button>
        )}
      </div>
      
      <h3 className="font-semibold mb-2 text-lg">
        {todaysNudge.title}
      </h3>
      
      <p className="text-white/90 text-sm leading-relaxed">
        {todaysNudge.message}
      </p>
      
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="h-1 bg-white/30 rounded-full mt-4 overflow-hidden"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.7 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="h-full bg-white rounded-full origin-left"
        />
      </motion.div>
    </Card>
  );
}