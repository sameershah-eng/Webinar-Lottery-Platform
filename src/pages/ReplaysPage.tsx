import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tv, Clock, Trophy, Play, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ReplaysPage: React.FC = () => {
  const { webinars } = useStore();
  const [search, setSearch] = useState('');

  const replays = webinars.filter((w) => w.status === 'replay');
  const filteredReplays = replays.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-[#23262C] pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-[#C9A227] uppercase font-bold">
              30-DAY ARCHIVE VAULT
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
              Published in under 5 mins
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Broadcast Session Replays
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl font-sans">
            Missed the live broadcast? All webinar teardowns, live range footage, audience Q&amp;A, and sealed lottery draw ceremonies remain available for 30 days.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search past replays..."
            className="w-full bg-[#14161A] border border-[#23262C] focus:border-[#C9A227] focus:outline-none rounded pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-zinc-500"
          />
        </div>
      </div>

      {/* Grid of Replay Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReplays.map((rep) => (
          <div
            key={rep.id}
            className="bg-[#14161A] border border-[#23262C] hover:border-[#C9A227]/60 rounded-lg overflow-hidden flex flex-col transition-all duration-300 group hover:shadow-[0_4px_25px_rgba(201,162,39,0.15)]"
          >
            {/* Thumbnail Frame */}
            <div className="relative aspect-[16/10] bg-[#0E1013] overflow-hidden">
              <img
                src={rep.images[0]}
                alt={rep.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play Badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#C9A227]/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-black ml-0.5" />
                </div>
              </div>

              {/* Duration in bottom right */}
              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 font-mono text-xs text-white">
                {rep.replayDuration}
              </div>

              {/* Winner in top left */}
              {rep.winnerSeats && rep.winnerSeats.length > 0 && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#181B22]/90 border border-[#C9A227]/50 font-mono text-xs text-[#C9A227] flex items-center gap-1.5 backdrop-blur-sm">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Winning Seat: #{rep.winnerSeats[0]}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#C9A227] uppercase">
                  {rep.category}
                </span>
                <h3 className="font-heading text-xl font-bold text-white tracking-wide mt-1 line-clamp-1">
                  {rep.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {rep.subtitle}
                </p>
              </div>

              {/* Chapters list preview */}
              <div className="space-y-1.5 font-mono text-[11px] text-zinc-400 pt-2 border-t border-[#1C1F26]">
                <div className="text-zinc-500 text-[10px] uppercase">Chapters included:</div>
                <div className="flex flex-wrap gap-1">
                  {rep.chapters.slice(0, 3).map((ch) => (
                    <span
                      key={ch.title}
                      className="px-2 py-0.5 rounded bg-[#0E1013] border border-[#23262C] text-zinc-300 truncate max-w-[150px]"
                    >
                      {ch.title}
                    </span>
                  ))}
                  {rep.chapters.length > 3 && (
                    <span className="px-1 text-zinc-500">+{rep.chapters.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Watch CTA */}
              <Link
                to={`/webinars/${rep.id}?tab=replay`}
                className="w-full py-2.5 px-4 rounded bg-[#181B22] hover:bg-[#C9A227] hover:text-black border border-[#282D36] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Launch Replay &bull; Draw Results</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
