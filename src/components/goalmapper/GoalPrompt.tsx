import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Zap, Target } from 'lucide-react';
import { User } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface GoalPromptProps {
  user: User;
  onSubmit: (goalTitle: string, pace: 'light' | 'medium' | 'intense') => void;
  isGenerating: boolean;
}

const goalSuggestions = [
  'Freelance Graphic Designer',
  'Start a Consulting Business',
  'Return to Tech Career',
  'Launch Online Course',
  'Become a Virtual Assistant',
  'Start a Blog/Newsletter',
  'Learn Digital Marketing',
  'Build an E-commerce Store'
];

const paceOptions = [
  {
    id: 'light',
    title: 'Light Pace',
    description: 'Perfect for busy schedules',
    icon: Clock,
    color: 'from-secondary-400 to-secondary-500',
    minutes: '5-10 min/day'
  },
  {
    id: 'medium',
    title: 'Medium Pace',
    description: 'Steady, consistent progress',
    icon: Target,
    color: 'from-primary-400 to-primary-500',
    minutes: '10-20 min/day'
  },
  {
    id: 'intense',
    title: 'Intense Pace',
    description: 'Fast-track your goals',
    icon: Zap,
    color: 'from-accent-400 to-accent-500',
    minutes: '20+ min/day'
  }
];

export function GoalPrompt({ user, onSubmit, isGenerating }: GoalPromptProps) {
  const [goalTitle, setGoalTitle] = useState('');
  const [selectedPace, setSelectedPace] = useState<'light' | 'medium' | 'intense'>('medium');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = () => {
    if (goalTitle.trim()) {
      onSubmit(goalTitle.trim(), selectedPace);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setGoalTitle(suggestion);
    setShowSuggestions(false);
  };

  if (isGenerating) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        
        <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
          Creating Your Journey
        </h3>
        <p className="text-gray-600 mb-4">
          AI is mapping your personalized 30-day roadmap...
        </p>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto max-w-xs"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Goal Input */}
      <Card className="p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What do you want to achieve?
          </label>
          <div className="relative">
            <input
              type="text"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="e.g., Start freelancing as a designer"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="absolute right-3 top-3 text-primary-500 hover:text-primary-600"
            >
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Goal Suggestions */}
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <p className="text-sm text-gray-600 mb-3">Popular goals:</p>
            <div className="flex flex-wrap gap-2">
              {goalSuggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm hover:bg-primary-100 transition-colors"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </Card>

      {/* Pace Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Choose your pace
        </h3>
        <div className="space-y-3">
          {paceOptions.map((option, index) => {
            const Icon = option.icon;
            const isSelected = selectedPace === option.id;
            
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  hover
                  onClick={() => setSelectedPace(option.id as 'light' | 'medium' | 'intense')}
                  className={`p-4 border-2 transition-all ${
                    isSelected
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {option.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                      <p className="text-xs text-primary-600 font-medium mt-1">
                        {option.minutes}
                      </p>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                      >
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Generate Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={handleSubmit}
          size="lg"
          className="w-full"
          disabled={!goalTitle.trim()}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Generate My Journey
        </Button>
      </motion.div>
    </motion.div>
  );
}