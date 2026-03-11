import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Card } from '../ui/Card';

interface FiltersPanelProps {
  selectedFilters: string[];
  onFiltersChange: (filters: string[]) => void;
}

const filterCategories = [
  {
    title: 'Work Type',
    filters: ['Remote', 'Hybrid', 'Onsite']
  },
  {
    title: 'Employment',
    filters: ['Full-time', 'Part-time', 'Contract', 'Internship']
  },
  {
    title: 'Opportunities',
    filters: ['Grant', 'Returnship', 'Women-Friendly', 'Flexible Hours']
  },
  {
    title: 'Experience',
    filters: ['Entry Level', 'Mid Level', 'Senior Level', 'No Experience']
  },
  {
    title: 'Industry',
    filters: ['Tech', 'Design', 'Marketing', 'Education', 'Healthcare', 'Finance']
  }
];

export function FiltersPanel({ selectedFilters, onFiltersChange }: FiltersPanelProps) {
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      onFiltersChange(selectedFilters.filter(f => f !== filter));
    } else {
      onFiltersChange([...selectedFilters, filter]);
    }
  };

  const clearAllFilters = () => {
    onFiltersChange([]);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        {selectedFilters.length > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Selected Filters */}
      {selectedFilters.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Selected:</p>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter, index) => (
              <motion.div
                key={filter}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center space-x-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                <span>{filter}</span>
                <button
                  onClick={() => toggleFilter(filter)}
                  className="hover:bg-primary-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Categories */}
      <div className="space-y-4">
        {filterCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              {category.title}
            </h4>
            <div className="flex flex-wrap gap-2">
              {category.filters.map((filter, filterIndex) => {
                const isSelected = selectedFilters.includes(filter);
                
                return (
                  <motion.button
                    key={filter}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (categoryIndex * 0.1) + (filterIndex * 0.02) }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleFilter(filter)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}