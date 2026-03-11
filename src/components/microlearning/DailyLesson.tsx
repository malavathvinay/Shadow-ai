import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, BookOpen, Bookmark, BookmarkCheck, Clock, Award } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Lesson } from './LearningHub';
import { LessonPlayer } from './LessonPlayer';

interface DailyLessonProps {
  lesson: Lesson;
  onComplete: (lessonId: string, skillTags: string[], xpReward: number) => void;
  onBookmark: (lessonId: string) => void;
}

export function DailyLesson({ lesson, onComplete, onBookmark }: DailyLessonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'audio' | 'text'>('audio');
  const [showPlayer, setShowPlayer] = useState(false);

  const handleStartLesson = () => {
    setShowPlayer(true);
  };

  const handleFormatToggle = (format: 'audio' | 'text') => {
    setSelectedFormat(format);
  };

  const handleLessonComplete = () => {
    onComplete(lesson.id, lesson.skillTags, lesson.xpReward);
    setShowPlayer(false);
    setIsPlaying(false);
  };

  return (
    <Card className="overflow-hidden">
      {/* Lesson Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{lesson.duration} min</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-primary-600">
                <Award className="w-4 h-4" />
                <span>{lesson.xpReward} XP</span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {lesson.title}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              {lesson.description}
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onBookmark(lesson.id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              lesson.bookmarked
                ? 'bg-primary-100 text-primary-600'
                : 'bg-gray-100 text-gray-400 hover:text-primary-500'
            }`}
          >
            {lesson.bookmarked ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {/* Format Toggle */}
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-sm font-medium text-gray-700">Format:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {lesson.hasAudio && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFormatToggle('audio')}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  selectedFormat === 'audio'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Play className="w-4 h-4" />
                <span>Audio</span>
              </motion.button>
            )}
            {lesson.hasText && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFormatToggle('text')}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  selectedFormat === 'text'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Text</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {lesson.skillTags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Start Button */}
        {!showPlayer && !lesson.completed && (
          <Button
            onClick={handleStartLesson}
            className="w-full"
            size="lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Start {selectedFormat === 'audio' ? 'Listening' : 'Reading'}
          </Button>
        )}

        {/* Completed State */}
        {lesson.completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-green-800 mb-1">Lesson Complete!</h4>
            <p className="text-sm text-green-600">+{lesson.xpReward} XP earned</p>
          </motion.div>
        )}
      </div>

      {/* Lesson Player */}
      <AnimatePresence>
        {showPlayer && !lesson.completed && (
          <LessonPlayer
            lesson={lesson}
            format={selectedFormat}
            onComplete={handleLessonComplete}
            onClose={() => setShowPlayer(false)}
          />
        )}
      </AnimatePresence>
    </Card>
  );
}