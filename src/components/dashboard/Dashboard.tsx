import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../../types';
import { DashboardHeader } from './DashboardHeader';
import { DailyNudgeCard } from './DailyNudgeCard';
import { QuickAccessGrid } from './QuickAccessGrid';
import { ProgressTracker } from './ProgressTracker';
import { FloatingActionButton } from './FloatingActionButton';

interface DashboardProps {
  user: User;
  onNavigate: (screen: string) => void;
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
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
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <DashboardHeader 
                    greeting={`${getGreeting()}, ${user.name.split(' ')[0]}`}
                    onNavigate={onNavigate}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <DailyNudgeCard onNavigate={onNavigate} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <QuickAccessGrid onNavigate={onNavigate} />
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="col-span-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="sticky top-6"
                >
                  <ProgressTracker user={user} />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile & Tablet Layout */}
          <div className="lg:hidden space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DashboardHeader 
                greeting={`${getGreeting()}, ${user.name.split(' ')[0]}`}
                onNavigate={onNavigate}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <DailyNudgeCard onNavigate={onNavigate} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <QuickAccessGrid onNavigate={onNavigate} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <ProgressTracker user={user} />
            </motion.div>
          </div>

          <FloatingActionButton onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}