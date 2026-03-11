import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter } from 'lucide-react';
import { User } from '../../types';
import { DailyLesson } from './DailyLesson';
import { ProgressPanel } from './ProgressPanel';
import { SuggestionsCarousel } from './SuggestionsCarousel';
import { ResumeSyncCard } from './ResumeSyncCard';

interface LearningHubProps {
  user: User;
  onNavigate: (screen: string) => void;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: 'design' | 'business' | 'tech' | 'confidence';
  skillTags: string[];
  hasAudio: boolean;
  hasText: boolean;
  completed: boolean;
  bookmarked: boolean;
  xpReward: number;
}

export interface LearningProgress {
  streakDays: number;
  weeklyMinutes: number;
  weeklyTarget: number;
  skillsEarned: string[];
  xpTotal: number;
  lessonsCompleted: number;
}

const mockTodaysLesson: Lesson = {
  id: 'lesson_1',
  title: 'Building Your Personal Brand on LinkedIn',
  description: 'Learn how to craft a compelling LinkedIn profile that attracts opportunities',
  duration: 4,
  category: 'business',
  skillTags: ['Personal Branding', 'LinkedIn Optimization', 'Professional Networking'],
  hasAudio: true,
  hasText: true,
  completed: false,
  bookmarked: false,
  xpReward: 25
};

const mockProgress: LearningProgress = {
  streakDays: 7,
  weeklyMinutes: 28,
  weeklyTarget: 35,
  skillsEarned: ['Digital Marketing', 'Content Creation', 'Time Management', 'Communication'],
  xpTotal: 340,
  lessonsCompleted: 12
};

const categories = [
  { id: 'all', label: 'All', color: 'from-gray-400 to-gray-500' },
  { id: 'design', label: 'Design', color: 'from-primary-400 to-primary-500' },
  { id: 'business', label: 'Business', color: 'from-secondary-400 to-secondary-500' },
  { id: 'tech', label: 'Tech', color: 'from-accent-400 to-accent-500' },
  { id: 'confidence', label: 'Confidence', color: 'from-peach-400 to-peach-500' }
];

export function LearningHub({ user, onNavigate }: LearningHubProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [todaysLesson, setTodaysLesson] = useState(mockTodaysLesson);
  const [progress, setProgress] = useState(mockProgress);

  const handleLessonComplete = (lessonId: string, skillTags: string[], xpReward: number) => {
    setTodaysLesson(prev => ({ ...prev, completed: true }));
    setProgress(prev => ({
      ...prev,
      skillsEarned: [...new Set([...prev.skillsEarned, ...skillTags])],
      xpTotal: prev.xpTotal + xpReward,
      lessonsCompleted: prev.lessonsCompleted + 1,
      weeklyMinutes: prev.weeklyMinutes + todaysLesson.duration
    }));
  };

  const handleBookmark = (lessonId: string) => {
    setTodaysLesson(prev => ({ ...prev, bookmarked: !prev.bookmarked }));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-10">
        <div className="max-w-screen-xl mx-auto w-full">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-8">
              {/* Main Content */}
              <div className="col-span-8 space-y-8">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between"
                >
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow"
                  >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                  </button>
                  
                  <div className="text-center">
                    <h1 className="text-2xl lg:text-3xl font-serif font-semibold text-gray-900">
                      Learn in 5 Minutes
                    </h1>
                    <p className="text-base text-gray-600">
                      Build skills that matter
                    </p>
                  </div>
                  
                  <button className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow">
                    <Filter className="w-6 h-6 text-gray-600" />
                  </button>
                </motion.div>

                {/* Today's Lesson */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Lesson</h2>
                  <DailyLesson
                    lesson={todaysLesson}
                    onComplete={handleLessonComplete}
                    onBookmark={handleBookmark}
                  />
                </motion.div>

                {/* Resume Sync Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <ResumeSyncCard skillTags={todaysLesson.skillTags} />
                </motion.div>

                {/* Category Filter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {categories.map((category, index) => (
                      <motion.button
                        key={category.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + (index * 0.05) }}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                          selectedCategory === category.id
                            ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        {category.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Suggestions Carousel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <SuggestionsCarousel
                    category={selectedCategory}
                    onLessonSelect={(lesson) => console.log('Selected lesson:', lesson)}
                  />
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="col-span-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="sticky top-6"
                >
                  <ProgressPanel progress={progress} />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile & Tablet Layout */}
          <div className="lg:hidden space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="text-center">
                <h1 className="text-xl font-serif font-semibold text-gray-900">
                  Learn in 5 Minutes
                </h1>
                <p className="text-sm text-gray-600">
                  Build skills that matter
                </p>
              </div>
              
              <button className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </motion.div>

            {/* Progress Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ProgressPanel progress={progress} />
            </motion.div>

            {/* Today's Lesson */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Lesson</h2>
              <DailyLesson
                lesson={todaysLesson}
                onComplete={handleLessonComplete}
                onBookmark={handleBookmark}
              />
            </motion.div>

            {/* Resume Sync Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ResumeSyncCard skillTags={todaysLesson.skillTags} />
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + (index * 0.05) }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Suggestions Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <SuggestionsCarousel
                category={selectedCategory}
                onLessonSelect={(lesson) => console.log('Selected lesson:', lesson)}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}