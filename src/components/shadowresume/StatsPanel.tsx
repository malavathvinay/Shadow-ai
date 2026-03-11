import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, Award, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { ResumeStats } from './ResumeGenerator';

interface StatsPanelProps {
  stats: ResumeStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const statItems = [
    {
      icon: FileText,
      value: stats.totalActivities,
      label: 'Activities',
      color: '#8b5cf6',
      suffix: ''
    },
    {
      icon: Clock,
      value: stats.totalHours,
      label: 'Hours',
      color: '#14b8a6',
      suffix: ''
    },
    {
      icon: Award,
      value: stats.uniqueSkills,
      label: 'Skills',
      color: '#f97316',
      suffix: ''
    },
    {
      icon: TrendingUp,
      value: stats.categoriesUsed.length,
      label: 'Categories',
      color: '#ec4899',
      suffix: ''
    }
  ];

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Your Impact</h3>
        {stats.totalActivities > 0 && (
          <span className="text-sm text-primary-600 font-medium">
            Building career capital ✨
          </span>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {statItems.map((stat, index) => {
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
                  className="w-10 h-10 rounded-full flex items-center justify-center"
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

      {stats.totalActivities === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 bg-primary-50 rounded-lg text-center"
        >
          <p className="text-sm text-primary-700">
            Start logging your invisible labor to see your impact grow! 🌱
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg text-center"
        >
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Amazing!</span> You've documented{' '}
            <span className="font-semibold text-primary-600">{stats.totalHours} hours</span> of valuable work.
            Keep building your career capital! 💪
          </p>
        </motion.div>
      )}
    </Card>
  );
}