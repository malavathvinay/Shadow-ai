import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onNavigate: (screen: string) => void;
}

export function FloatingActionButton({ onNavigate }: FloatingActionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onNavigate('log-activity')}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow-lg flex items-center justify-center z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
    >
      <Plus className="w-6 h-6 text-white" />
    </motion.button>
  );
}