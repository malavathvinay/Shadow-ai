import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
  animated?: boolean;
}

const sizeClasses = {
  sm: { container: 'h-8', icon: 'w-6 h-6', text: 'text-lg' },
  md: { container: 'h-10', icon: 'w-8 h-8', text: 'text-xl' },
  lg: { container: 'h-12', icon: 'w-10 h-10', text: 'text-2xl' },
  xl: { container: 'h-16', icon: 'w-12 h-12', text: 'text-3xl' }
};

export function Logo({ size = 'md', variant = 'full', className = '', animated = false }: LogoProps) {
  const sizes = sizeClasses[size];

  const IconComponent = () => (
    <motion.div
      initial={animated ? { scale: 0, rotate: -180 } : false}
      animate={animated ? { scale: 1, rotate: 0 } : false}
      transition={animated ? { duration: 0.8, type: "spring", stiffness: 100 } : false}
      className={`${sizes.icon} relative flex items-center justify-center`}
    >
      {/* Outer gradient circle */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-full shadow-lg">
        {/* Inner shadow effect */}
        <div className="absolute inset-1 bg-gradient-to-tr from-primary-400 to-secondary-400 rounded-full opacity-80"></div>
      </div>
      
      {/* Shadow icon - stylized 'S' with subtle shadow effect */}
      <motion.svg
        initial={animated ? { opacity: 0 } : false}
        animate={animated ? { opacity: 1 } : false}
        transition={animated ? { delay: 0.5, duration: 0.5 } : false}
        viewBox="0 0 24 24"
        className="relative z-10 w-3/5 h-3/5 text-white"
        fill="currentColor"
      >
        {/* Main 'S' shape */}
        <path d="M12 2C8.5 2 6 4.5 6 8c0 2 1 3.5 2.5 4.5C7 13.5 6 15 6 17c0 3.5 2.5 6 6 6s6-2.5 6-6c0-2-1-3.5-2.5-4.5C17 11.5 18 10 18 8c0-3.5-2.5-6-6-6zm0 2c2.5 0 4 1.5 4 4 0 1.5-1 2.5-2 3-1-.5-2-1.5-2-3s1-2.5 2-3c-1-.5-2-1.5-2-3zm0 8c-1 .5-2 1.5-2 3s1 2.5 2 3c1-.5 2-1.5-2-3s-1-2.5-2-3z" />
        
        {/* Subtle highlight */}
        <path 
          d="M12 4c1.5 0 2.5 1 2.5 2.5S13.5 9 12 9s-2.5-1-2.5-2.5S10.5 4 12 4z" 
          fill="rgba(255,255,255,0.3)"
        />
      </motion.svg>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full blur-sm opacity-30 -z-10 scale-110"></div>
    </motion.div>
  );

  const TextComponent = () => (
    <motion.div
      initial={animated ? { opacity: 0, x: -20 } : false}
      animate={animated ? { opacity: 1, x: 0 } : false}
      transition={animated ? { delay: 0.3, duration: 0.6 } : false}
      className="flex flex-col"
    >
      <span className={`${sizes.text} font-serif font-bold text-gray-900 leading-none`}>
        Shadow
      </span>
      <motion.span
        initial={animated ? { opacity: 0, y: 10 } : false}
        animate={animated ? { opacity: 1, y: 0 } : false}
        transition={animated ? { delay: 0.6, duration: 0.4 } : false}
        className="text-xs font-medium text-gray-500 tracking-wider uppercase leading-none"
      >
        Quietly Powered
      </motion.span>
    </motion.div>
  );

  if (variant === 'icon') {
    return (
      <div className={`${sizes.container} ${className}`}>
        <IconComponent />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`${className}`}>
        <TextComponent />
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <IconComponent />
      <TextComponent />
    </div>
  );
}

// Simplified logo for favicons and small spaces
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <div className={`w-8 h-8 relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg shadow-md">
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full p-1.5 text-white"
          fill="currentColor"
        >
          <path d="M12 2C8.5 2 6 4.5 6 8c0 2 1 3.5 2.5 4.5C7 13.5 6 15 6 17c0 3.5 2.5 6 6 6s6-2.5 6-6c0-2-1-3.5-2.5-4.5C17 11.5 18 10 18 8c0-3.5-2.5-6-6-6zm0 2c2.5 0 4 1.5 4 4 0 1.5-1 2.5-2 3-1-.5-2-1.5-2-3s1-2.5 2-3c-1-.5-2-1.5-2-3zm0 8c-1 .5-2 1.5-2 3s1 2.5 2 3c1-.5 2-1.5-2-3s-1-2.5-2-3z" />
        </svg>
      </div>
    </div>
  );
}