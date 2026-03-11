import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Calendar, Bookmark, BookmarkCheck, ExternalLink, Award, Heart } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Job } from './JobFinder';

interface JobCardProps {
  job: Job;
  onSave: () => void;
}

export function JobCard({ job, onSave }: JobCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'remote': return 'bg-green-100 text-green-700';
      case 'hybrid': return 'bg-blue-100 text-blue-700';
      case 'onsite': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getWorkTypeColor = (workType: string) => {
    switch (workType) {
      case 'full-time': return 'bg-primary-100 text-primary-700';
      case 'part-time': return 'bg-secondary-100 text-secondary-700';
      case 'contract': return 'bg-accent-100 text-accent-700';
      case 'internship': return 'bg-peach-100 text-peach-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="p-6 relative overflow-hidden">
      {/* Grant Badge */}
      {job.isGrant && (
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-accent-400 to-accent-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Award className="w-3 h-3" />
            <span>Grant</span>
          </div>
        </div>
      )}

      {/* Women-Friendly Badge */}
      {job.womenFriendly && !job.isGrant && (
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-pink-400 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Heart className="w-3 h-3" />
            <span>Women-Friendly</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {job.title}
            </h3>
            <p className="text-secondary-600 font-medium">
              {job.company}
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onSave}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              job.saved
                ? 'bg-primary-100 text-primary-600'
                : 'bg-gray-100 text-gray-400 hover:text-primary-500'
            }`}
          >
            {job.saved ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {/* Job Details */}
        <div className="flex flex-wrap gap-2 text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          
          {job.salary && (
            <div className="flex items-center space-x-1 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{job.postedDate}</span>
          </div>
        </div>

        {/* Type and Work Type Badges */}
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
            {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getWorkTypeColor(job.workType)}`}>
            {job.workType.charAt(0).toUpperCase() + job.workType.slice(1).replace('-', ' ')}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {job.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Application Deadline */}
        {job.applicationDeadline && (
          <div className="flex items-center space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-amber-800">
              <span className="font-medium">Deadline:</span> {job.applicationDeadline}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Details
          </Button>
          
          <Button
            size="sm"
            className="flex-1"
          >
            {job.isGrant ? 'Apply for Grant' : 'Apply Now'}
          </Button>
        </div>
      </div>
    </Card>
  );
}