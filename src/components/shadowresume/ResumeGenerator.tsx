import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Download, Copy, Share2, LogOut } from 'lucide-react';
import { User } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { ActivityLogger } from './ActivityLogger';
import { ResumeView } from './ResumeView';
import { StatsPanel } from './StatsPanel';

interface ResumeGeneratorProps {
  user: User;
  onNavigate: (screen: string) => void;
}

export interface Activity {
  id: string;
  title: string;
  type: 'caregiving' | 'community' | 'mentoring' | 'household' | 'volunteering' | 'organizing';
  description: string;
  duration: number; // in minutes
  skillTags: string[];
  timestamp: Date;
  impact?: string;
}

export interface ResumeStats {
  totalActivities: number;
  totalHours: number;
  uniqueSkills: number;
  categoriesUsed: string[];
}

export function ResumeGenerator({ user, onNavigate }: ResumeGeneratorProps) {
  const { signOut } = useAuth();
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('shadow_activities');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeTab, setActiveTab] = useState<'log' | 'resume'>('log');

  const handleActivityAdd = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity: Activity = {
      ...activity,
      id: `activity_${Date.now()}`,
      timestamp: new Date()
    };
    
    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    localStorage.setItem('shadow_activities', JSON.stringify(updatedActivities));
  };

  const handleActivityDelete = (activityId: string) => {
    const updatedActivities = activities.filter(a => a.id !== activityId);
    setActivities(updatedActivities);
    localStorage.setItem('shadow_activities', JSON.stringify(updatedActivities));
  };

  const handleLogout = async () => {
    await signOut();
  };

  const stats: ResumeStats = {
    totalActivities: activities.length,
    totalHours: Math.round(activities.reduce((sum, a) => sum + a.duration, 0) / 60),
    uniqueSkills: new Set(activities.flatMap(a => a.skillTags)).size,
    categoriesUsed: [...new Set(activities.map(a => a.type))]
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-50 via-white to-secondary-50">
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
                    Shadow Resume
                  </h1>
                  <p className="text-base text-gray-600">
                    Turn invisible work into career capital
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

              {/* Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex bg-gray-100 rounded-xl p-1 mb-8"
              >
                <button
                  onClick={() => setActiveTab('log')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-lg text-base font-medium transition-all ${
                    activeTab === 'log'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Log Activity</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('resume')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-lg text-base font-medium transition-all ${
                    activeTab === 'resume'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Download className="w-5 h-5" />
                  <span>View Resume</span>
                </button>
              </motion.div>

              {/* Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'log' && (
                  <ActivityLogger onActivityAdd={handleActivityAdd} />
                )}
                
                {activeTab === 'resume' && (
                  <ResumeView 
                    activities={activities} 
                    onActivityDelete={handleActivityDelete}
                  />
                )}
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
                <StatsPanel stats={stats} />
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
                Shadow Resume
              </h1>
              <p className="text-sm text-gray-600">
                Turn invisible work into career capital
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

          {/* Stats Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatsPanel stats={stats} />
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex bg-gray-100 rounded-xl p-1 mb-6"
          >
            <button
              onClick={() => setActiveTab('log')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'log'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Log Activity</span>
            </button>
            
            <button
              onClick={() => setActiveTab('resume')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'resume'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>View Resume</span>
            </button>
          </motion.div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'log' && (
              <ActivityLogger onActivityAdd={handleActivityAdd} />
            )}
            
            {activeTab === 'resume' && (
              <ResumeView 
                activities={activities} 
                onActivityDelete={handleActivityDelete}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}