import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Radio, Clock, Tv, X, Layers, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { WebinarCard } from '../components/common/WebinarCard';
import { WebinarCategory, WebinarStatus } from '../types';

export const WebinarsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { webinars } = useStore();

  const activeCategoryParam = (searchParams.get('category') as WebinarCategory) || 'all';
  const activeTabParam = (searchParams.get('tab') as WebinarStatus | 'all') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategoryParam);
  const [selectedStatus, setSelectedStatus] = useState<string>(activeTabParam);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'rifle', label: 'Precision Rifle' },
    { id: 'pistol', label: 'Custom Pistol' },
    { id: 'shotgun', label: 'Combat Shotgun' },
    { id: 'ammo', label: 'Bulk Ammo' },
    { id: 'accessories', label: 'Optics & Gear' },
  ];

  const statusTabs = [
    { id: 'all', label: 'All Sessions', count: webinars.length },
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: Clock,
      count: webinars.filter((w) => w.status === 'upcoming').length,
    },
    {
      id: 'live',
      label: 'Live Now',
      icon: Radio,
      count: webinars.filter((w) => w.status === 'live').length,
      isLive: true,
    },
    {
      id: 'replay',
      label: 'Replays',
      icon: Tv,
      count: webinars.filter((w) => w.status === 'replay').length,
    },
  ];

  // Filtered webinars
  const filteredWebinars = useMemo(() => {
    return webinars.filter((webinar) => {
      // Category check
      if (selectedCategory !== 'all' && webinar.category !== selectedCategory) {
        return false;
      }
      // Status check
      if (selectedStatus !== 'all' && webinar.status !== selectedStatus) {
        return false;
      }
      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = webinar.title.toLowerCase().includes(query);
        const matchesSubtitle = webinar.subtitle.toLowerCase().includes(query);
        const matchesCategory = webinar.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSubtitle && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [webinars, selectedCategory, selectedStatus, searchQuery]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    const newParams = new URLSearchParams(searchParams);
    if (status === 'all') {
      newParams.delete('tab');
    } else {
      newParams.set('tab', status);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono tracking-widest text-[#C9A227] uppercase font-bold">
          TACTICAL ALLOCATION DIRECTORY
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
          Webinars &amp; Seat Lotteries
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl font-sans">
          Select any available session to review weapon specifications, inspect high-resolution imagery, claim numbered seats, and enter on-air draws.
        </p>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#23262C] pb-4">
        {statusTabs.map((tab) => {
          const isActive = selectedStatus === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleStatusChange(tab.id)}
              className={`px-4 py-2 rounded text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-[#C9A227] text-black font-bold shadow-[0_0_12px_rgba(201,162,39,0.3)]'
                  : 'bg-[#14161A] text-zinc-400 hover:text-white border border-[#23262C]'
              }`}
            >
              {tab.isLive && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5383B] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E5383B]" />
                </span>
              )}
              {tab.icon && !tab.isLive && <tab.icon className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-black/20 text-black' : 'bg-[#1C1F26] text-zinc-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Category Filter Chips */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#14161A] text-zinc-400 hover:text-zinc-200 border border-[#23262C]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search weapons, ammo, optics..."
            className="w-full bg-[#14161A] border border-[#23262C] focus:border-[#C9A227] focus:outline-none rounded pl-9 pr-8 py-2 text-xs font-mono text-white placeholder-zinc-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of Webinar Cards */}
      {filteredWebinars.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredWebinars.map((webinar) => (
              <motion.div
                key={webinar.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <WebinarCard webinar={webinar} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center rounded-xl bg-[#14161A]/50 border border-[#23262C] space-y-3">
          <AlertCircle className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="font-heading text-2xl font-bold text-white uppercase">
            No Webinars Match Your Filters
          </h3>
          <p className="text-xs text-zinc-400 font-mono max-w-sm mx-auto">
            Try resetting your search query or switching categories.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedStatus('all');
              setSearchQuery('');
              setSearchParams(new URLSearchParams());
            }}
            className="mt-2 px-4 py-2 rounded bg-[#1C1F26] border border-[#2E333B] hover:border-[#C9A227] text-xs font-mono text-[#C9A227]"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
