import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, BookOpen, Sparkles, LogOut } from 'lucide-react';
import { User } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { DailyAffirmationCard } from './DailyAffirmationCard';
import { ChatInterface } from './ChatInterface';
import { MoodCheck } from './MoodCheck';
import { ReflectionJournal } from './ReflectionJournal';
import { ConfidenceStats } from './ConfidenceStats';

interface ConfidenceCompanionProps {
  user: User;
  onNavigate: (screen: string) => void;
}

export function ConfidenceCompanion({ user, onNavigate }: ConfidenceCompanionProps) {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'chat' | 'journal' | 'affirmations'>('chat');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-peach-50 via-pink-50 to-purple-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
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
                    Confidence Companion
                  </h1>
                  <p className="text-base text-gray-600">
                    Your safe space for strength
                  </p>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow text-red-500 hover:text-red-600"
                  title="Sign Out"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </motion.div>

              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-8"
              >
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                  {getGreeting()}, {user.name.split(' ')[0]} 💜
                </h2>
                <p className="text-base text-gray-600">
                  How are you feeling today? I'm here to listen and support you.
                </p>
              </motion.div>

              {/* Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex bg-white rounded-xl p-1 mb-8 shadow-sm border border-gray-100"
              >
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-lg text-base font-medium transition-all ${
                    activeTab === 'chat'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('journal')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-lg text-base font-medium transition-all ${
                    activeTab === 'journal'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Journal</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('affirmations')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-lg text-base font-medium transition-all ${
                    activeTab === 'affirmations'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Inspire</span>
                </button>
              </motion.div>

              {/* Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'chat' && <ChatInterface user={user} />}
                {activeTab === 'journal' && <ReflectionJournal />}
                {activeTab === 'affirmations' && <DailyAffirmationCard expanded />}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="col-span-4 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-6"
              >
                <DailyAffirmationCard />
                <MoodCheck />
                <ConfidenceStats />
              </motion.div>
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
                Confidence Companion
              </h1>
              <p className="text-sm text-gray-600">
                Your safe space for strength
              </p>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center text-red-500 hover:text-red-600"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-6"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-1">
              {getGreeting()}, {user.name.split(' ')[0]} 💜
            </h2>
            <p className="text-sm text-gray-600">
              How are you feeling today? I'm here to listen and support you.
            </p>
          </motion.div>

          {/* Daily Affirmation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DailyAffirmationCard />
          </motion.div>

          {/* Mood Check */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MoodCheck />
          </motion.div>

          {/* Confidence Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ConfidenceStats />
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex bg-white rounded-xl p-1 mb-6 shadow-sm border border-gray-100"
          >
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat</span>
            </button>
            
            <button
              onClick={() => setActiveTab('journal')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'journal'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Journal</span>
            </button>
            
            <button
              onClick={() => setActiveTab('affirmations')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'affirmations'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Inspire</span>
            </button>
          </motion.div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'chat' && <ChatInterface user={user} />}
            {activeTab === 'journal' && <ReflectionJournal />}
            {activeTab === 'affirmations' && <DailyAffirmationCard expanded />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}