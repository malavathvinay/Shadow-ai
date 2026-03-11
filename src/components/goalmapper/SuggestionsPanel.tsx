import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Heart } from 'lucide-react';
import { Card } from '../ui/Card';

interface SuggestionsPanelProps {
  onSuggestionSelect: (goalTitle: string, pace: 'light' | 'medium' | 'intense') => void;
}

const popularJourneys = [
  {
    title: 'Freelance Designer',
    description: 'Build a portfolio and find clients',
    users: 1247,
    pace: 'medium' as const,
    icon: TrendingUp,
    color: 'from-primary-400 to-primary-500'
  },
  {
    title: 'Virtual Assistant',
    description: 'Start offering admin services',
    users: 892,
    pace: 'light' as const,
    icon: Users,
    color: 'from-secondary-400 to-secondary-500'
  },
  {
    title: 'Life Coach',
    description: 'Help others while growing yourself',
    users: 634,
    pace: 'medium' as const,
    icon: Heart,
    color: 'from-peach-400 to-accent-500'
  }
];

export function SuggestionsPanel({ onSuggestionSelect }: SuggestionsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-8"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Popular Journeys
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        See what other women are building
      </p>
      
      <div className="space-y-3">
        {popularJourneys.map((journey, index) => {
          const Icon = journey.icon;
          
          return (
            <motion.div
              key={journey.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
            >
              <Card
                hover
                onClick={() => onSuggestionSelect(journey.title, journey.pace)}
                className="p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${journey.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {journey.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {journey.description}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500">
                      {journey.users.toLocaleString()} women
                    </div>
                    <div className="text-xs text-primary-600 font-medium">
                      {journey.pace} pace
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl text-center"
      >
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Join the community</span> of women quietly building their dreams ✨
        </p>
      </motion.div>
    </motion.div>
  );
}