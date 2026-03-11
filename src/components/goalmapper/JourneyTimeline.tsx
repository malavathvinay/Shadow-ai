import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Calendar, Clock, Award } from 'lucide-react';
import { Journey } from './GoalMapper';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface JourneyTimelineProps {
  journey: Journey;
  onCustomize: () => void;
  onStart: () => void;
}

export function JourneyTimeline({ journey, onCustomize, onStart }: JourneyTimelineProps) {
  const totalTasks = journey.weeklyTasks.length;
  const estimatedHours = Math.round(
    journey.weeklyTasks.reduce((sum, task) => sum + task.estimatedMinutes, 0) / 60
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Journey Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-gray-900 mb-2">
          Your Journey to
        </h2>
        <h3 className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 font-semibold mb-4">
          {journey.title}
        </h3>
        
        <div className="flex justify-center space-x-4 sm:space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{journey.estimatedDays} days</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>~{estimatedHours}h total</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="w-4 h-4" />
            <span>{totalTasks} tasks</span>
          </div>
        </div>
      </motion.div>

      {/* Timeline - Horizontal scroll on mobile */}
      <div className="relative">
        {/* Desktop Timeline */}
        <div className="hidden md:block">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-secondary-200 to-accent-200" />
          
          <div className="space-y-6">
            {journey.milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (index * 0.2) + 0.3, type: "spring" }}
                  className="absolute left-4 w-4 h-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full border-4 border-white shadow-lg z-10"
                />
                
                {/* Milestone Card */}
                <div className="ml-12">
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Week {milestone.week}: {milestone.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {milestone.description}
                        </p>
                      </div>
                      {milestone.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                    
                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {milestone.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (index * 0.2) + (skillIndex * 0.1) + 0.5 }}
                          className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline - Horizontal Scroll */}
        <div className="md:hidden">
          <div className="overflow-x-auto snap-x snap-mandatory">
            <div className="flex space-x-4 pb-4">
              {journey.milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="snap-center w-72 flex-shrink-0"
                >
                  <Card className="p-4 h-full">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">
                          Week {milestone.week}: {milestone.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {milestone.description}
                        </p>
                      </div>
                      {milestone.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                    
                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {milestone.skills.map((skill, skillIndex) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="space-y-3 pt-6"
      >
        <Button
          onClick={onStart}
          size="lg"
          className="w-full"
        >
          Start My Journey
        </Button>
        
        <Button
          onClick={onCustomize}
          variant="outline"
          size="lg"
          className="w-full"
        >
          Customize Plan
        </Button>
      </motion.div>

      {/* Encouragement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl"
      >
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Remember:</span> Every small step counts. 
          You're building something amazing, one day at a time. 🌟
        </p>
      </motion.div>
    </motion.div>
  );
}