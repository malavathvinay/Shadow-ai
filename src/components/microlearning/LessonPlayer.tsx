import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, CheckCircle, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Lesson } from './LearningHub';

interface LessonPlayerProps {
  lesson: Lesson;
  format: 'audio' | 'text';
  onComplete: () => void;
  onClose: () => void;
}

const mockAudioContent = {
  duration: 240, // 4 minutes in seconds
  transcript: `
    Welcome to today's lesson on building your personal brand on LinkedIn. 
    
    In the next 4 minutes, we'll cover three key strategies that will help you stand out in your industry and attract the right opportunities.
    
    First, let's talk about your headline. Your LinkedIn headline is prime real estate - it's one of the first things people see when they visit your profile. Instead of just listing your job title, use this space to communicate your value proposition.
    
    For example, instead of "Marketing Manager," try "Marketing Manager | Helping B2B Companies Increase Lead Generation by 40% | Content Strategy Expert."
    
    Second, optimize your summary section. This is where you tell your professional story. Start with a hook that grabs attention, then explain what you do, who you help, and what makes you unique.
    
    Finally, be consistent with your posting. Share insights, comment thoughtfully on others' posts, and engage authentically with your network. Consistency builds visibility and credibility over time.
    
    Remember, personal branding isn't about being perfect - it's about being authentic and valuable to your audience. Start with these three strategies and watch your professional presence grow.
  `
};

const mockTextContent = `
# Building Your Personal Brand on LinkedIn

## Introduction
Your LinkedIn profile is your digital business card and professional story all in one. In today's competitive job market, a strong personal brand can be the difference between being overlooked and being sought after.

## 1. Craft a Compelling Headline
Your headline is prime real estate - make it count:
- **Don't just list your job title**
- **Communicate your value proposition**
- **Include keywords for your industry**

**Example:** Instead of "Marketing Manager," try "Marketing Manager | Helping B2B Companies Increase Lead Generation by 40% | Content Strategy Expert"

## 2. Optimize Your Summary
Your summary should tell your professional story:
- Start with a compelling hook
- Explain what you do and who you help
- Highlight what makes you unique
- Include a call-to-action

## 3. Be Consistently Active
Building a brand requires consistent effort:
- Share valuable insights regularly
- Comment thoughtfully on others' posts
- Engage authentically with your network
- Post 2-3 times per week minimum

## Key Takeaway
Personal branding isn't about perfection - it's about authenticity and providing value to your audience. Start with these fundamentals and build from there.
`;

export function LessonPlayer({ lesson, format, onComplete, onClose }: LessonPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showCompleteButton, setShowCompleteButton] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && format === 'audio') {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          const newProgress = (newTime / mockAudioContent.duration) * 100;
          setProgress(newProgress);
          
          if (newTime >= mockAudioContent.duration) {
            setIsPlaying(false);
            setShowCompleteButton(true);
          }
          
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, format]);

  useEffect(() => {
    if (format === 'text') {
      // For text format, show complete button after a short delay
      const timer = setTimeout(() => {
        setShowCompleteButton(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [format]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (direction: 'forward' | 'backward') => {
    const seekAmount = 15; // seconds
    setCurrentTime(prev => {
      const newTime = direction === 'forward' 
        ? Math.min(prev + seekAmount, mockAudioContent.duration)
        : Math.max(prev - seekAmount, 0);
      setProgress((newTime / mockAudioContent.duration) * 100);
      return newTime;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="border-t border-gray-100"
    >
      <div className="p-6 bg-gray-50">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {format === 'audio' && (
          <div className="space-y-4">
            {/* Audio Controls */}
            <div className="flex items-center justify-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSeek('backward')}
                className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:text-primary-600"
              >
                <SkipBack className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlayPause}
                className="w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-lg flex items-center justify-center text-white"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSeek('forward')}
                className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:text-primary-600"
              >
                <SkipForward className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(mockAudioContent.duration)}</span>
              </div>
            </div>

            {/* Volume */}
            <div className="flex items-center justify-center space-x-2">
              <Volume2 className="w-4 h-4 text-gray-400" />
              <div className="w-20 bg-gray-200 rounded-full h-1">
                <div className="bg-primary-500 h-1 rounded-full w-3/4" />
              </div>
            </div>

            {/* Transcript */}
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-4 bg-white rounded-lg border border-gray-200"
              >
                <h4 className="font-medium text-gray-900 mb-2">Transcript</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {mockAudioContent.transcript}
                </p>
              </motion.div>
            )}
          </div>
        )}

        {format === 'text' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose prose-sm max-w-none"
          >
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div dangerouslySetInnerHTML={{ 
                __html: mockTextContent.replace(/\n/g, '<br>').replace(/## /g, '<h3>').replace(/# /g, '<h2>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }} />
            </div>
          </motion.div>
        )}

        {/* Complete Button */}
        {showCompleteButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Button
              onClick={onComplete}
              className="w-full"
              size="lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Mark as Complete
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}