import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, BookOpen, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';

export function ConfidenceStats() {
  // In a real app, these would come from user data
  const stats = [
    {
      icon: MessageCircle,
      value: 12,
      label: 'Chats',
      color: '#ec4899',
      bgColor: '#fdf2f8'
    },
    {
      icon: BookOpen,
      value: 8,
      label: 'Reflections',
      color: '#8b5cf6',
      bgColor: '#f3e8ff'
    },
    {
      icon: Heart,
      value: 5,
      label: 'Day Streak',
      color: '#f97316',
      bgColor: '#fff7ed'
    },
    {
      icon: TrendingUp,
      value: 85,
      label: 'Confidence',
      color: '#14b8a6',
      bgColor: '#f0fdfa'
    }
  ];

  return (
    <Card className="p-4 mb-6">
      <h3 className="font-semibold text-gray-900 mb-4">Your Confidence Journey</h3>
      
      <div className="grid grid-cols-4 gap-3">
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
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                style={{ backgroundColor: stat.bgColor }}
              >
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (index * 0.1) + 0.3, duration: 0.3 }}
                className="text-lg font-bold text-gray-900"
              >
                {stat.value}{stat.label === 'Confidence' ? '%' : ''}
              </motion.div>
              
              <p className="text-xs text-gray-500 font-medium">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg text-center"
      >
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Amazing progress!</span> You're building emotional strength every day 💪
        </p>
      </motion.div>
    </Card>
  );
}