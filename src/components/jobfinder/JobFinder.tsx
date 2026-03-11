import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, MapPin, Clock, DollarSign, LogOut } from 'lucide-react';
import { User } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { JobCard } from './JobCard';
import { FiltersPanel } from './FiltersPanel';
import { NotificationBanner } from './NotificationBanner';

interface JobFinderProps {
  user: User;
  onNavigate: (screen: string) => void;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'remote' | 'hybrid' | 'onsite';
  workType: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: string;
  tags: string[];
  description: string;
  isGrant: boolean;
  womenFriendly: boolean;
  applicationDeadline?: string;
  postedDate: string;
  saved: boolean;
}

const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Remote Virtual Assistant',
    company: 'SheSupport Co.',
    location: 'Remote',
    type: 'remote',
    workType: 'part-time',
    salary: '₹15,000-25,000/month',
    tags: ['Flexible Hours', 'Entry Level', 'Women-Led'],
    description: 'Support busy entrepreneurs with admin tasks. Perfect for mothers returning to work.',
    isGrant: false,
    womenFriendly: true,
    postedDate: '2 days ago',
    saved: false
  },
  {
    id: '2',
    title: 'Tech Returnship Program',
    company: 'WomenInTech Foundation',
    location: 'Bangalore',
    type: 'hybrid',
    workType: 'internship',
    salary: '₹40,000/month',
    tags: ['Returnship', 'Tech', 'Mentorship'],
    description: '6-month program for women returning to tech after career breaks.',
    isGrant: false,
    womenFriendly: true,
    applicationDeadline: 'Dec 15, 2024',
    postedDate: '1 week ago',
    saved: true
  },
  {
    id: '3',
    title: 'Women Entrepreneur Grant',
    company: 'Government of India',
    location: 'Pan India',
    type: 'remote',
    workType: 'contract',
    salary: '₹2,00,000 funding',
    tags: ['Grant', 'Startup', 'Women-Only'],
    description: 'Funding for women-led startups in technology and social impact sectors.',
    isGrant: true,
    womenFriendly: true,
    applicationDeadline: 'Jan 31, 2025',
    postedDate: '3 days ago',
    saved: false
  },
  {
    id: '4',
    title: 'Freelance Content Writer',
    company: 'Digital Marketing Agency',
    location: 'Remote',
    type: 'remote',
    workType: 'contract',
    salary: '₹500-800/article',
    tags: ['Freelance', 'Writing', 'Flexible'],
    description: 'Create engaging content for women-focused brands. Work on your schedule.',
    isGrant: false,
    womenFriendly: true,
    postedDate: '5 days ago',
    saved: false
  },
  {
    id: '5',
    title: 'UX Design Mentorship',
    company: 'Design Sisters',
    location: 'Mumbai',
    type: 'hybrid',
    workType: 'part-time',
    salary: '₹30,000/month',
    tags: ['Design', 'Mentorship', 'Portfolio Building'],
    description: 'Learn UX design while working on real projects. Perfect for career changers.',
    isGrant: false,
    womenFriendly: true,
    postedDate: '1 day ago',
    saved: false
  },
  {
    id: '6',
    title: 'Rural Women Skill Grant',
    company: 'NRLM Foundation',
    location: 'Rural Areas',
    type: 'onsite',
    workType: 'contract',
    salary: '₹50,000 training fund',
    tags: ['Grant', 'Skill Development', 'Rural'],
    description: 'Funding for skill development programs for rural women entrepreneurs.',
    isGrant: true,
    womenFriendly: true,
    applicationDeadline: 'Dec 31, 2024',
    postedDate: '1 week ago',
    saved: false
  }
];

export function JobFinder({ user, onNavigate }: JobFinderProps) {
  const { signOut } = useAuth();
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSaveJob = (jobId: string) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, saved: !job.saved } : job
      )
    );
  };

  const handleLogout = async () => {
    await signOut();
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => 
                            job.tags.includes(filter) || 
                            job.type === filter.toLowerCase() ||
                            job.workType === filter.toLowerCase() ||
                            (filter === 'Grant' && job.isGrant) ||
                            (filter === 'Women-Friendly' && job.womenFriendly)
                          );
    
    return matchesSearch && matchesFilters;
  });

  const savedJobs = jobs.filter(job => job.saved);
  const grantOpportunities = jobs.filter(job => job.isGrant);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="col-span-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-8"
              >
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                
                <div className="text-center">
                  <h1 className="text-2xl lg:text-3xl font-serif font-semibold text-gray-900">
                    Jobs & Grants
                  </h1>
                  <p className="text-base text-gray-600">
                    Opportunities made for you
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow"
                  >
                    <Filter className="w-6 h-6 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow text-red-500 hover:text-red-600"
                    title="Sign Out"
                  >
                    <LogOut className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative mb-6"
              >
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs, companies, or skills..."
                  className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base"
                />
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-6 mb-8"
              >
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-primary-600">{filteredJobs.length}</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-secondary-600">{savedJobs.length}</div>
                  <div className="text-sm text-gray-600">Saved</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-accent-600">{grantOpportunities.length}</div>
                  <div className="text-sm text-gray-600">Grants</div>
                </div>
              </motion.div>

              {/* Notification Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <NotificationBanner />
              </motion.div>

              {/* Job Listings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedFilters.length > 0 ? 'Filtered Results' : 'Recommended for You'}
                  </h2>
                  <span className="text-base text-gray-500">
                    {filteredJobs.length} opportunities
                  </span>
                </div>

                {filteredJobs.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">No opportunities found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search or filters
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedFilters([]);
                      }}
                      className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </motion.div>
                ) : (
                  filteredJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                    >
                      <JobCard
                        job={job}
                        onSave={() => handleSaveJob(job.id)}
                      />
                    </motion.div>
                  ))
                )}
              </motion.div>

              {/* Load More Button */}
              {filteredJobs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center mt-12"
                >
                  <button className="px-8 py-4 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                    Load More Opportunities
                  </button>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-span-4">
              {showFilters && (
                <div className="sticky top-6">
                  <FiltersPanel
                    selectedFilters={selectedFilters}
                    onFiltersChange={setSelectedFilters}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Layout */}
        <div className="lg:hidden">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="text-center">
              <h1 className="text-xl font-serif font-semibold text-gray-900">
                Jobs & Grants
              </h1>
              <p className="text-sm text-gray-600">
                Opportunities made for you
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center"
              >
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              
              <button
                onClick={handleLogout}
                className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center text-red-500 hover:text-red-600"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-4"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, companies, or skills..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </motion.div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <FiltersPanel
                selectedFilters={selectedFilters}
                onFiltersChange={setSelectedFilters}
              />
            </motion.div>
          )}

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4 mb-6"
          >
            <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-primary-600">{filteredJobs.length}</div>
              <div className="text-xs text-gray-600">Available</div>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-secondary-600">{savedJobs.length}</div>
              <div className="text-xs text-gray-600">Saved</div>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-accent-600">{grantOpportunities.length}</div>
              <div className="text-xs text-gray-600">Grants</div>
            </div>
          </motion.div>

          {/* Notification Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <NotificationBanner />
          </motion.div>

          {/* Job Listings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedFilters.length > 0 ? 'Filtered Results' : 'Recommended for You'}
              </h2>
              <span className="text-sm text-gray-500">
                {filteredJobs.length} opportunities
              </span>
            </div>

            {filteredJobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No opportunities found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilters([]);
                  }}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                >
                  <JobCard
                    job={job}
                    onSave={() => handleSaveJob(job.id)}
                  />
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Load More Button */}
          {filteredJobs.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-8"
            >
              <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                Load More Opportunities
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}