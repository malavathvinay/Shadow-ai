import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';

interface ResumeSyncCardProps {
  skillTags: string[];
}

export function ResumeSyncCard({ skillTags }: ResumeSyncCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="p-4 bg-gradient-to-r from-secondary-50 to-primary-50 border-secondary-200">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-gray-900">Shadow Resume Sync</h4>
              <Sparkles className="w-4 h-4 text-secondary-500" />
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              This lesson will add these skills to your resume:
            </p>
            
            <div className="flex flex-wrap gap-2">
              {skillTags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                  className="flex items-center space-x-1 px-2 py-1 bg-white rounded-full border border-secondary-200"
                >
                  <Plus className="w-3 h-3 text-secondary-600" />
                  <span className="text-xs font-medium text-gray-700">{tag}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-3 pt-3 border-t border-secondary-200"
        >
          <p className="text-xs text-gray-500 text-center">
            Complete the lesson to automatically update your Shadow Resume ✨
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
}