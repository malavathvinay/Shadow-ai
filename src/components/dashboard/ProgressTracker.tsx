import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Flame } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressRing } from '../ui/ProgressRing';
import { useProgress } from '../../hooks/useProgress';
import { User } from '../../types';

interface ProgressTrackerProps {
  user: User;
}

export function ProgressTracker({ user }: ProgressTrackerProps) {
  const { progress, loading } = useProgress(user.id);

  if (loading || !progress) {
    return (
      <Card className="p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-8 mx-auto mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-12 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  const stats = [
    {
      label: 'Learning Minutes',
      value: progress.learning_minutes_today,
      target: user.available_minutes_per_day || 20,
      icon: Clock,
      color: '#8b5cf6',
    },
    {
      label: 'Skills Earned',
      value: progress.resume_skill_count,
      target: 10,
      icon: BookOpen,
      color: '#14b8a6',
    },
    {
      label: 'Day Streak',
      value: progress.streak_days_count,
      target: 30,
      icon: Flame,
      color: '#f97316',
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Progress</h2>
      
      <Card className="p-4">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const progressPercent = Math.min((stat.value / stat.target) * 100, 100);
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="text-center"
              >
                <div className="flex flex-col items-center space-y-2">
                  <ProgressRing
                    progress={progressPercent}
                    size={50}
                    strokeWidth={3}
                    color={stat.color}
                  />
                  
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (index * 0.1) + 0.5, duration: 0.3 }}
                      className="flex items-center justify-center space-x-1 mb-1"
                    >
                      <Icon className="w-3 h-3 text-gray-500" />
                      <span className="text-lg font-bold text-gray-900">
                        {stat.value}
                      </span>
                    </motion.div>
                    
                    <p className="text-xs text-gray-500 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-100 text-center"
        >
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-primary-600">{progress.xp_earned_total} XP</span>
            {' '}earned total • Keep going! 🌟
          </p>
        </motion.div>
      </Card>
    </div>
  );
}