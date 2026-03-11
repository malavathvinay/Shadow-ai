import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, Award, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressRing } from '../ui/ProgressRing';
import { LearningProgress } from './LearningHub';

interface ProgressPanelProps {
  progress: LearningProgress;
}

export function ProgressPanel({ progress }: ProgressPanelProps) {
  const weeklyProgressPercent = (progress.weeklyMinutes / progress.weeklyTarget) * 100;

  const stats = [
    {
      icon: Flame,
      value: progress.streakDays,
      label: 'Day Streak',
      color: '#f97316',
      suffix: ''
    },
    {
      icon: Clock,
      value: progress.weeklyMinutes,
      label: 'This Week',
      color: '#8b5cf6',
      suffix: 'min'
    },
    {
      icon: Award,
      value: progress.skillsEarned.length,
      label: 'Skills Earned',
      color: '#14b8a6',
      suffix: ''
    }
  ];

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Your Progress</h3>
        <div className="flex items-center space-x-1 text-sm text-primary-600">
          <TrendingUp className="w-4 h-4" />
          <span>{progress.xpTotal} XP</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="text-center"
            >
              <div className="flex flex-col items-center space-y-2">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (index * 0.1) + 0.3, duration: 0.3 }}
                    className="text-lg font-bold text-gray-900"
                  >
                    {stat.value}{stat.suffix}
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

      {/* Weekly Progress Ring */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="flex items-center justify-between pt-4 border-t border-gray-100"
      >
        <div>
          <p className="text-sm font-medium text-gray-900">Weekly Goal</p>
          <p className="text-xs text-gray-500">
            {progress.weeklyMinutes} of {progress.weeklyTarget} minutes
          </p>
        </div>
        
        <ProgressRing
          progress={weeklyProgressPercent}
          size={50}
          strokeWidth={3}
          color="#8b5cf6"
        />
      </motion.div>

      {/* Motivational Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg text-center"
      >
        <p className="text-sm text-gray-700">
          {progress.streakDays >= 7 ? (
            <>🔥 Amazing! You're on fire with a {progress.streakDays}-day streak!</>
          ) : progress.weeklyMinutes >= progress.weeklyTarget ? (
            <>🎉 Fantastic! You've hit your weekly goal!</>
          ) : (
            <>💪 Keep going! You're {progress.weeklyTarget - progress.weeklyMinutes} minutes away from your weekly goal</>
          )}
        </p>
      </motion.div>
    </Card>
  );
}