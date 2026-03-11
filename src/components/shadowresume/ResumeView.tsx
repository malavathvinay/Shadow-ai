import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Copy, Share2, Eye, List, Trash2, Calendar, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Activity } from './ResumeGenerator';

interface ResumeViewProps {
  activities: Activity[];
  onActivityDelete: (activityId: string) => void;
}

type ViewMode = 'resume' | 'timeline';

export function ResumeView({ activities, onActivityDelete }: ResumeViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('resume');
  const [copiedText, setCopiedText] = useState('');

  // Group activities by skill for resume view
  const groupedBySkill = activities.reduce((acc, activity) => {
    activity.skillTags.forEach(skill => {
      if (!acc[skill]) {
        acc[skill] = [];
      }
      acc[skill].push(activity);
    });
    return acc;
  }, {} as Record<string, Activity[]>);

  // Group activities by type for better organization
  const groupedByType = activities.reduce((acc, activity) => {
    if (!acc[activity.type]) {
      acc[activity.type] = [];
    }
    acc[activity.type].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  const generateResumeText = () => {
    let resumeText = "SHADOW RESUME - INVISIBLE LABOR & SKILLS\n\n";
    
    Object.entries(groupedBySkill).forEach(([skill, skillActivities]) => {
      resumeText += `${skill.toUpperCase()}\n`;
      skillActivities.forEach(activity => {
        const impact = activity.impact ? ` (${activity.impact})` : '';
        resumeText += `• ${activity.title}: ${activity.description}${impact}\n`;
      });
      resumeText += "\n";
    });

    return resumeText;
  };

  const handleCopyResume = async () => {
    const resumeText = generateResumeText();
    try {
      await navigator.clipboard.writeText(resumeText);
      setCopiedText('Resume copied to clipboard!');
      setTimeout(() => setCopiedText(''), 2000);
    } catch (err) {
      setCopiedText('Failed to copy');
      setTimeout(() => setCopiedText(''), 2000);
    }
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate a proper PDF
    const resumeText = generateResumeText();
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shadow-resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const typeLabels = {
    caregiving: 'Caregiving',
    community: 'Community Work',
    mentoring: 'Mentoring',
    household: 'Household Management',
    volunteering: 'Volunteering',
    organizing: 'Event Organizing'
  };

  if (activities.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities logged yet</h3>
        <p className="text-gray-600 mb-6">
          Start logging your invisible labor to build your Shadow Resume
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Copy Success Message */}
      {copiedText && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
        >
          {copiedText}
        </motion.div>
      )}

      {/* View Mode Toggle */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('resume')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'resume'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Resume View</span>
            </button>
            
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'timeline'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
              <span>Timeline</span>
            </button>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleCopyResume}
              size="sm"
              variant="outline"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            
            <Button
              onClick={handleDownloadPDF}
              size="sm"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Resume View */}
      {viewMode === 'resume' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card className="p-6">
            <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">
              Shadow Resume - Skills & Experience
            </h2>
            
            {Object.entries(groupedBySkill).map(([skill, skillActivities], index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-6 last:mb-0"
              >
                <h3 className="text-lg font-semibold text-primary-700 mb-3 border-b border-primary-100 pb-1">
                  {skill}
                </h3>
                
                <div className="space-y-3">
                  {skillActivities.map(activity => (
                    <div key={activity.id} className="pl-4 border-l-2 border-gray-200">
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      {activity.impact && (
                        <p className="text-sm text-secondary-600 font-medium mt-1">
                          Impact: {activity.impact}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{typeLabels[activity.type]}</span>
                        <span>{Math.round(activity.duration / 60)} hours</span>
                        <span>{formatDate(activity.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </Card>
        </motion.div>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          {activities
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                          {typeLabels[activity.type]}
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(activity.timestamp)}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{activity.duration} min</span>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                      
                      {activity.impact && (
                        <p className="text-sm text-secondary-600 font-medium mb-3">
                          Impact: {activity.impact}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-1">
                        {activity.skillTags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-secondary-50 text-secondary-700 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onActivityDelete(activity.id)}
                      className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            ))}
        </motion.div>
      )}

      {/* Export Options */}
      <Card className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50">
        <h3 className="font-semibold text-gray-900 mb-2">Ready to use your Shadow Resume?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Export your invisible labor as professional experience for job applications, LinkedIn, or networking.
        </p>
        
        <div className="flex space-x-2">
          <Button
            onClick={handleCopyResume}
            size="sm"
            variant="outline"
            className="flex-1"
          >
            <Copy className="w-4 h-4 mr-1" />
            Copy Text
          </Button>
          
          <Button
            onClick={handleDownloadPDF}
            size="sm"
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </Card>
    </div>
  );
}