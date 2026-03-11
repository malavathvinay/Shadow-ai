import React from 'react';
import { motion } from 'framer-motion';
import { Target, Headphones, FileText, MessageCircle, Briefcase, Award } from 'lucide-react';
import { Card } from '../ui/Card';

interface QuickAccessGridProps {
  onNavigate: (screen: string) => void;
}

const quickAccessItems = [
  {
    id: 'goal-mapper',
    title: 'Goal Journey',
    icon: Target,
    color: 'from-primary-500 to-primary-600',
    description: 'AI-powered career planning',
  },
  {
    id: 'learning',
    title: 'Learn in 5 Mins',
    icon: Headphones,
    color: 'from-secondary-500 to-secondary-600',
    description: 'Micro-learning sessions',
  },
  {
    id: 'resume',
    title: 'Shadow Resume',
    icon: FileText,
    color: 'from-peach-400 to-accent-500',
    description: 'Track invisible labor',
  },
  {
    id: 'confidence',
    title: 'Confidence Chat',
    icon: MessageCircle,
    color: 'from-pink-400 to-rose-500',
    description: 'AI emotional support',
  },
  {
    id: 'jobs',
    title: 'Jobs & Grants',
    icon: Briefcase,
    color: 'from-indigo-500 to-blue-600',
    description: 'Women-first opportunities',
  },
  {
    id: 'progress',
    title: 'Progress & Badges',
    icon: Award,
    color: 'from-amber-400 to-orange-500',
    description: 'Track your growth',
  },
];

export function QuickAccessGrid({ onNavigate }: QuickAccessGridProps) {
  return (
    <div>
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Quick Access</h2>
      
      {/* Mobile: 2 columns, Tablet: 3 columns, Desktop: 3 columns */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {quickAccessItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card
                hover
                onClick={() => onNavigate(item.id)}
                className="p-3 sm:p-4 lg:p-6 h-24 sm:h-28 lg:h-32 flex flex-col justify-between"
              >
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-xs lg:text-sm text-gray-500 mt-1 leading-tight line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}