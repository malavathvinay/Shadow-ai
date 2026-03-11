import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, Tag, Sparkles, Heart, Users, Home, Award } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Activity } from './ResumeGenerator';

interface ActivityLoggerProps {
  onActivityAdd: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
}

const activityTypes = [
  {
    id: 'caregiving',
    label: 'Caregiving',
    icon: Heart,
    color: 'from-pink-400 to-rose-500',
    examples: ['Child care', 'Elder care', 'Pet care', 'Medical support']
  },
  {
    id: 'community',
    label: 'Community Work',
    icon: Users,
    color: 'from-secondary-400 to-secondary-500',
    examples: ['Neighborhood organizing', 'Local events', 'Community garden', 'Block parties']
  },
  {
    id: 'volunteering',
    label: 'Volunteering',
    icon: Award,
    color: 'from-primary-400 to-primary-500',
    examples: ['Charity work', 'School volunteering', 'Food bank', 'Fundraising']
  },
  {
    id: 'mentoring',
    label: 'Mentoring',
    icon: Users,
    color: 'from-accent-400 to-accent-500',
    examples: ['Coaching others', 'Teaching skills', 'Career guidance', 'Life advice']
  },
  {
    id: 'organizing',
    label: 'Event Organizing',
    icon: Sparkles,
    color: 'from-peach-400 to-peach-500',
    examples: ['Party planning', 'Coordinating events', 'Managing logistics', 'Team building']
  },
  {
    id: 'household',
    label: 'Household Management',
    icon: Home,
    color: 'from-indigo-400 to-blue-500',
    examples: ['Budget management', 'Scheduling', 'Home maintenance', 'Family coordination']
  }
];

const skillSuggestions = {
  caregiving: ['Patience', 'Empathy', 'Time Management', 'Crisis Management', 'Communication', 'Multitasking'],
  community: ['Leadership', 'Event Planning', 'Public Speaking', 'Networking', 'Collaboration', 'Problem Solving'],
  volunteering: ['Project Management', 'Teamwork', 'Fundraising', 'Public Relations', 'Organization', 'Dedication'],
  mentoring: ['Teaching', 'Coaching', 'Active Listening', 'Guidance', 'Motivation', 'Knowledge Transfer'],
  organizing: ['Event Management', 'Logistics', 'Coordination', 'Planning', 'Attention to Detail', 'Creativity'],
  household: ['Budget Management', 'Scheduling', 'Resource Management', 'Negotiation', 'Efficiency', 'Planning']
};

export function ActivityLogger({ onActivityAdd }: ActivityLoggerProps) {
  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState<Activity['type'] | ''>('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [impact, setImpact] = useState('');
  const [skillTags, setSkillTags] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !selectedType || !description.trim() || !duration) {
      return;
    }

    const activity: Omit<Activity, 'id' | 'timestamp'> = {
      title: title.trim(),
      type: selectedType,
      description: description.trim(),
      duration: parseInt(duration),
      skillTags,
      impact: impact.trim() || undefined
    };

    onActivityAdd(activity);

    // Reset form
    setTitle('');
    setSelectedType('');
    setDescription('');
    setDuration('');
    setImpact('');
    setSkillTags([]);
    setCustomSkill('');

    // Show success animation
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const addSkillTag = (skill: string) => {
    if (!skillTags.includes(skill)) {
      setSkillTags([...skillTags, skill]);
    }
  };

  const removeSkillTag = (skill: string) => {
    setSkillTags(skillTags.filter(s => s !== skill));
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !skillTags.includes(customSkill.trim())) {
      setSkillTags([...skillTags, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const selectedTypeData = activityTypes.find(t => t.id === selectedType);

  return (
    <div className="space-y-6">
      {/* Success Animation */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Activity logged! 🎉</span>
          </div>
        </motion.div>
      )}

      {/* Activity Title */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What did you do?</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Organized community fundraiser"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
      </Card>

      {/* Activity Type Selection */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What type of work was this?</h3>
        <div className="grid grid-cols-2 gap-3">
          {activityTypes.map((type, index) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            
            return (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedType(type.id as Activity['type'])}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-primary-300 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-200 bg-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mb-2`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 text-sm">{type.label}</h4>
              </motion.button>
            );
          })}
        </div>
      </Card>

      {/* Description */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tell us more about it</h3>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what you did, who you helped, and how you made a difference..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
        />
      </Card>

      {/* Time and Impact */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Time Spent
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="60"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="text-sm text-gray-500">minutes</span>
          </div>
        </Card>

        <Card className="p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Impact (optional)
          </label>
          <input
            type="text"
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
            placeholder="e.g., Raised $500"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </Card>
      </div>

      {/* Skills */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          <Tag className="w-5 h-5 inline mr-2" />
          What skills did you use?
        </h3>
        
        {/* Suggested Skills */}
        {selectedTypeData && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Suggested for {selectedTypeData.label}:</p>
            <div className="flex flex-wrap gap-2">
              {skillSuggestions[selectedType as keyof typeof skillSuggestions]?.map(skill => (
                <motion.button
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addSkillTag(skill)}
                  disabled={skillTags.includes(skill)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    skillTags.includes(skill)
                      ? 'bg-primary-100 text-primary-700 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {skillTags.includes(skill) ? '✓ ' : '+ '}{skill}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Custom Skill Input */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
            placeholder="Add custom skill..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Button
            onClick={addCustomSkill}
            size="sm"
            disabled={!customSkill.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Selected Skills */}
        {skillTags.length > 0 && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Selected skills:</p>
            <div className="flex flex-wrap gap-2">
              {skillTags.map(skill => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium flex items-center space-x-1"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkillTag(skill)}
                    className="text-primary-500 hover:text-primary-700"
                  >
                    ×
                  </button>
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        size="lg"
        className="w-full"
        disabled={!title.trim() || !selectedType || !description.trim() || !duration}
      >
        <Plus className="w-5 h-5 mr-2" />
        Log This Activity
      </Button>
    </div>
  );
}