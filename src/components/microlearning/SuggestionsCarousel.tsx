import React from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Clock, Award } from 'lucide-react';
import { Card } from '../ui/Card';
import { Lesson } from './LearningHub';

interface SuggestionsCarouselProps {
  category: string;
  onLessonSelect: (lesson: Lesson) => void;
}

const mockSuggestions: Lesson[] = [
  {
    id: 'lesson_2',
    title: 'Canva Basics for Non-Designers',
    description: 'Create professional graphics in minutes',
    duration: 5,
    category: 'design',
    skillTags: ['Graphic Design', 'Canva', 'Visual Communication'],
    hasAudio: true,
    hasText: true,
    completed: false,
    bookmarked: false,
    xpReward: 20
  },
  {
    id: 'lesson_3',
    title: 'Confidence in Virtual Meetings',
    description: 'Speak up and stand out in video calls',
    duration: 3,
    category: 'confidence',
    skillTags: ['Public Speaking', 'Virtual Communication', 'Confidence'],
    hasAudio: true,
    hasText: false,
    completed: false,
    bookmarked: true,
    xpReward: 15
  },
  {
    id: 'lesson_4',
    title: 'Email Marketing Fundamentals',
    description: 'Build and engage your email list',
    duration: 6,
    category: 'business',
    skillTags: ['Email Marketing', 'Customer Engagement', 'Digital Marketing'],
    hasAudio: false,
    hasText: true,
    completed: true,
    bookmarked: false,
    xpReward: 30
  },
  {
    id: 'lesson_5',
    title: 'Introduction to No-Code Tools',
    description: 'Build websites without coding',
    duration: 4,
    category: 'tech',
    skillTags: ['No-Code Development', 'Web Design', 'Automation'],
    hasAudio: true,
    hasText: true,
    completed: false,
    bookmarked: false,
    xpReward: 25
  }
];

export function SuggestionsCarousel({ category, onLessonSelect }: SuggestionsCarouselProps) {
  const filteredLessons = category === 'all' 
    ? mockSuggestions 
    : mockSuggestions.filter(lesson => lesson.category === category);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {category === 'all' ? 'Recommended for You' : `${category.charAt(0).toUpperCase() + category.slice(1)} Lessons`}
        </h3>
        <span className="text-sm text-gray-500">
          {filteredLessons.length} lessons
        </span>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {filteredLessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="flex-shrink-0 w-64"
          >
            <Card
              hover
              onClick={() => onLessonSelect(lesson)}
              className={`p-4 h-32 ${lesson.completed ? 'bg-green-50 border-green-200' : ''}`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.duration}m</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-primary-600">
                      <Award className="w-3 h-3" />
                      <span>{lesson.xpReward}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    {lesson.hasAudio && (
                      <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
                        <Play className="w-3 h-3 text-primary-600" />
                      </div>
                    )}
                    {lesson.hasText && (
                      <div className="w-5 h-5 bg-secondary-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-3 h-3 text-secondary-600" />
                      </div>
                    )}
                  </div>
                </div>
                
                <h4 className={`font-semibold text-sm mb-1 line-clamp-2 ${
                  lesson.completed ? 'text-green-800' : 'text-gray-900'
                }`}>
                  {lesson.title}
                </h4>
                
                <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-1">
                  {lesson.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {lesson.skillTags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {lesson.skillTags.length > 2 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                      +{lesson.skillTags.length - 2}
                    </span>
                  )}
                </div>
                
                {lesson.completed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <Award className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <p className="text-gray-500">No lessons found for this category.</p>
          <p className="text-sm text-gray-400 mt-1">Try selecting "All" to see more options.</p>
        </motion.div>
      )}
    </div>
  );
}