import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { User } from '../../types';
import { GoalPrompt } from './GoalPrompt';
import { JourneyTimeline } from './JourneyTimeline';
import { WeeklyGoals } from './WeeklyGoals';
import { SuggestionsPanel } from './SuggestionsPanel';

interface GoalMapperProps {
  user: User;
  onNavigate: (screen: string) => void;
}

export interface Journey {
  id: string;
  title: string;
  pace: 'light' | 'medium' | 'intense';
  milestones: Milestone[];
  weeklyTasks: WeeklyTask[];
  estimatedDays: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  week: number;
  completed: boolean;
  skills: string[];
}

export interface WeeklyTask {
  id: string;
  title: string;
  week: number;
  completed: boolean;
  estimatedMinutes: number;
}

export function GoalMapper({ user, onNavigate }: GoalMapperProps) {
  const [currentStep, setCurrentStep] = useState<'prompt' | 'journey' | 'customize'>('prompt');
  const [journey, setJourney] = useState<Journey | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGoalSubmit = async (goalTitle: string, pace: 'light' | 'medium' | 'intense') => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock AI journey based on goal and pace
    const mockJourney = generateMockJourney(goalTitle, pace, user.available_minutes_per_day);
    setJourney(mockJourney);
    setIsGenerating(false);
    setCurrentStep('journey');
  };

  const handleCustomize = () => {
    setCurrentStep('customize');
  };

  const handleStartJourney = () => {
    if (journey) {
      // Save journey to localStorage or send to backend
      localStorage.setItem('user_journey', JSON.stringify(journey));
      onNavigate('learning');
    }
  };

  const handleTaskToggle = (taskId: string) => {
    if (!journey) return;
    
    setJourney(prev => ({
      ...prev!,
      weeklyTasks: prev!.weeklyTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-10">
        <div className="max-w-screen-xl mx-auto w-full">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-8">
              {/* Main Content */}
              <div className="col-span-8">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between mb-8"
                >
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow"
                  >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                  </button>
                  
                  <div className="text-center">
                    <h1 className="text-2xl lg:text-3xl font-serif font-semibold text-gray-900">
                      AI Goal Mapper
                    </h1>
                    <p className="text-base text-gray-600">
                      Turn dreams into actionable plans
                    </p>
                  </div>
                  
                  <div className="w-12 h-12" /> {/* Spacer */}
                </motion.div>

                {/* Progress Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center mb-8"
                >
                  {['prompt', 'journey', 'customize'].map((step, index) => (
                    <div
                      key={step}
                      className={`w-4 h-4 rounded-full mx-2 transition-colors ${
                        currentStep === step || 
                        (['journey', 'customize'].includes(currentStep) && step === 'prompt') ||
                        (currentStep === 'customize' && step === 'journey')
                          ? 'bg-primary-500' 
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </motion.div>

                {/* Content */}
                {currentStep === 'prompt' && (
                  <GoalPrompt
                    user={user}
                    onSubmit={handleGoalSubmit}
                    isGenerating={isGenerating}
                  />
                )}

                {currentStep === 'journey' && journey && (
                  <JourneyTimeline
                    journey={journey}
                    onCustomize={handleCustomize}
                    onStart={handleStartJourney}
                  />
                )}

                {currentStep === 'customize' && journey && (
                  <WeeklyGoals
                    journey={journey}
                    onTaskToggle={handleTaskToggle}
                    onSave={handleStartJourney}
                  />
                )}
              </div>

              {/* Sidebar */}
              <div className="col-span-4">
                {currentStep === 'prompt' && (
                  <div className="sticky top-6">
                    <SuggestionsPanel onSuggestionSelect={handleGoalSubmit} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile & Tablet Layout */}
          <div className="lg:hidden">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-6"
            >
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="text-center">
                <h1 className="text-xl font-serif font-semibold text-gray-900">
                  AI Goal Mapper
                </h1>
                <p className="text-sm text-gray-600">
                  Turn dreams into actionable plans
                </p>
              </div>
              
              <div className="w-10 h-10" /> {/* Spacer */}
            </motion.div>

            {/* Progress Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              {['prompt', 'journey', 'customize'].map((step, index) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                    currentStep === step || 
                    (['journey', 'customize'].includes(currentStep) && step === 'prompt') ||
                    (currentStep === 'customize' && step === 'journey')
                      ? 'bg-primary-500' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </motion.div>

            {/* Content */}
            {currentStep === 'prompt' && (
              <GoalPrompt
                user={user}
                onSubmit={handleGoalSubmit}
                isGenerating={isGenerating}
              />
            )}

            {currentStep === 'journey' && journey && (
              <JourneyTimeline
                journey={journey}
                onCustomize={handleCustomize}
                onStart={handleStartJourney}
              />
            )}

            {currentStep === 'customize' && journey && (
              <WeeklyGoals
                journey={journey}
                onTaskToggle={handleTaskToggle}
                onSave={handleStartJourney}
              />
            )}

            {/* Suggestions Panel - Always visible at bottom on mobile */}
            {currentStep === 'prompt' && (
              <SuggestionsPanel onSuggestionSelect={handleGoalSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock AI journey generator
function generateMockJourney(goalTitle: string, pace: 'light' | 'medium' | 'intense', availableMinutes: number): Journey {
  const paceMultiplier = { light: 0.7, medium: 1, intense: 1.5 };
  const baseWeeks = 4;
  const totalWeeks = Math.ceil(baseWeeks / paceMultiplier[pace]);

  const milestones: Milestone[] = [
    {
      id: '1',
      title: 'Foundation Setup',
      description: 'Build your basic toolkit and understanding',
      week: 1,
      completed: false,
      skills: ['Research', 'Planning', 'Goal Setting']
    },
    {
      id: '2',
      title: 'Skill Development',
      description: 'Learn core competencies for your goal',
      week: 2,
      completed: false,
      skills: ['Technical Skills', 'Industry Knowledge']
    },
    {
      id: '3',
      title: 'Portfolio Building',
      description: 'Create tangible proof of your capabilities',
      week: 3,
      completed: false,
      skills: ['Portfolio Creation', 'Documentation']
    },
    {
      id: '4',
      title: 'Network & Launch',
      description: 'Connect with others and take action',
      week: 4,
      completed: false,
      skills: ['Networking', 'Communication', 'Launch Strategy']
    }
  ];

  const weeklyTasks: WeeklyTask[] = [
    // Week 1
    { id: 't1', title: 'Research industry trends and requirements', week: 1, completed: false, estimatedMinutes: availableMinutes * 2 },
    { id: 't2', title: 'Set up workspace and tools', week: 1, completed: false, estimatedMinutes: availableMinutes },
    { id: 't3', title: 'Create learning schedule', week: 1, completed: false, estimatedMinutes: availableMinutes },
    
    // Week 2
    { id: 't4', title: 'Complete foundational course/tutorial', week: 2, completed: false, estimatedMinutes: availableMinutes * 3 },
    { id: 't5', title: 'Practice core skills daily', week: 2, completed: false, estimatedMinutes: availableMinutes },
    { id: 't6', title: 'Join relevant online communities', week: 2, completed: false, estimatedMinutes: availableMinutes },
    
    // Week 3
    { id: 't7', title: 'Start first portfolio project', week: 3, completed: false, estimatedMinutes: availableMinutes * 2 },
    { id: 't8', title: 'Document your learning journey', week: 3, completed: false, estimatedMinutes: availableMinutes },
    { id: 't9', title: 'Seek feedback from peers', week: 3, completed: false, estimatedMinutes: availableMinutes },
    
    // Week 4
    { id: 't10', title: 'Complete and showcase portfolio', week: 4, completed: false, estimatedMinutes: availableMinutes * 2 },
    { id: 't11', title: 'Reach out to 3 people in your field', week: 4, completed: false, estimatedMinutes: availableMinutes },
    { id: 't12', title: 'Apply for first opportunity', week: 4, completed: false, estimatedMinutes: availableMinutes }
  ];

  return {
    id: `journey_${Date.now()}`,
    title: goalTitle,
    pace,
    milestones,
    weeklyTasks,
    estimatedDays: totalWeeks * 7
  };
}