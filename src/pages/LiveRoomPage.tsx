import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Radio,
  Eye,
  Clock,
  Send,
  ThumbsUp,
  Pin,
  CheckCircle2,
  Trophy,
  Lock,
  MessageSquare,
  BarChart2,
  Sparkles,
  Users,
  Shield,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { LotteryDrawModal } from '../components/draw/LotteryDrawModal';

export const LiveRoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    webinars,
    user,
    openAuthModal,
    qaQuestions,
    addQAQuestion,
    upvoteQAQuestion,
    simulateIncomingQuestion,
    polls,
    votePoll,
    activePollPopup,
    setActivePollPopup,
    liveViewerCount,
    setLiveViewerCount,
    demoMode,
    activeDrawWebinarId,
    setActiveDrawWebinarId,
  } = useStore();

  const [activeSideTab, setActiveSideTab] = useState<'qa' | 'polls'>('qa');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(1480); // 24:40 in
  const [showDrawTakeover, setShowDrawTakeover] = useState(false);

  const webinar = webinars.find((w) => w.id === id) || webinars[0];

  // Viewer fluctuation and clock simulation
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    const viewerInterval = setInterval(() => {
      if (!demoMode) return;
      const delta = Math.floor(Math.random() * 5) - 2;
      setLiveViewerCount(Math.max(250, liveViewerCount + delta));
    }, 5000);

    // Simulate questions arriving every 12 seconds in demo mode
    const questionInterval = setInterval(() => {
      if (demoMode && webinar) {
        simulateIncomingQuestion(webinar.id);
      }
    }, 12000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(viewerInterval);
      clearInterval(questionInterval);
    };
  }, [demoMode, liveViewerCount, setLiveViewerCount, simulateIncomingQuestion, webinar]);

  const formatElapsed = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    addQAQuestion(webinar.id, newQuestionText.trim());
    setNewQuestionText('');
  };

  const currentWebinarQuestions = qaQuestions.filter(
    (q) => q.webinarId === webinar.id || q.webinarId === 'webinar-live-01'
  );

  const pinnedQuestions = currentWebinarQuestions.filter((q) => q.isPinned);
  const unansweredQuestions = currentWebinarQuestions.filter((q) => !q.answered && !q.isPinned);
  const answeredQuestions = currentWebinarQuestions.filter((q) => q.answered && !q.isPinned);

  const activePoll = polls.find((p) => p.active) || polls[0];

  // Locked state for guests
  if (!user) {
    return (
      <div className="pt-32 pb-24 max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#181B22] border-2 border-[#C9A227] text-[#C9A227] flex items-center justify-center mx-auto shadow-2xl">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-[#C9A227] uppercase">
            RESTRICTED LIVE BROADCAST
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide uppercase">
            Member Registration Required
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            Guest viewing is locked to protect member seat integrity. Register with your email to enter the live armory room, participate in real-time Q&amp;A, and access on-air draws.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => openAuthModal(webinar.id)}
            className="animate-shimmer px-8 py-3.5 rounded bg-gradient-to-r from-[#C9A227] via-[#DDB735] to-[#C9A227] text-black font-heading font-extrabold text-base tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(201,162,39,0.3)]"
          >
            Register / Sign In With Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Stream Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-[#14161A] border border-[#23262C]">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5383B] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E5383B]" />
          </span>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#E5383B] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                LIVE ON AIR
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {webinar.category.toUpperCase()} &bull; ELAPSED: {formatElapsed(elapsedSeconds)}
              </span>
            </div>
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-wide mt-0.5">
              {webinar.title}
            </h1>
          </div>
        </div>

        {/* Viewers & Draw Trigger Quick Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0E1013] border border-[#23262C] font-mono text-xs text-white">
            <Eye className="w-3.5 h-3.5 text-[#E5383B]" />
            <span>{liveViewerCount} Verified Viewers</span>
          </div>

          <button
            onClick={() => setShowDrawTakeover(true)}
            className="px-4 py-2 rounded bg-gradient-to-r from-[#C9A227] to-[#DBB22E] hover:brightness-110 text-black font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(201,162,39,0.25)]"
          >
            <Trophy className="w-4 h-4 fill-black" />
            <span>Launch Draw Ceremony</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Video Player (8 cols) + Interactive Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 16:9 Stream Player Area */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-video bg-black rounded-lg border border-[#23262C] overflow-hidden shadow-2xl">
            {/* Stream Player Placeholder */}
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1"
              title="Live Armory Stream"
              className="w-full h-full object-cover pointer-events-none opacity-80"
              allow="autoplay; encrypted-media"
            />

            {/* Tactical Broadcast Overlay Over Video */}
            <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-[#E5383B]/50 text-white font-mono text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E5383B] animate-pulse" />
                BROADCAST FEED 01
              </span>
              <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-zinc-300 font-mono text-xs">
                1080p 60FPS
              </span>
            </div>

            {/* Bottom Stream Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-xs font-mono text-zinc-300 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="text-[#C9A227] font-bold">SENTINEL LIVE RANGE:</span>
                <span>Sub-MOA testing in progress</span>
              </div>
              <div>
                <span className="text-zinc-400">Total Seats: </span>
                <span className="text-[#C9A227] font-bold">{webinar.soldSeats}/{webinar.totalSeats}</span>
              </div>
            </div>
          </div>

          {/* Stream Quick Info & Link to Claim Seats */}
          <div className="p-4 rounded-lg bg-[#14161A] border border-[#23262C] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C9A227]" />
              <span className="text-zinc-300">
                Holding a seat? Your number is automatically in the upcoming draw reel.
              </span>
            </div>

            <Link
              to={`/webinars/${webinar.id}`}
              className="px-4 py-1.5 rounded bg-[#1C1F26] hover:bg-[#C9A227] hover:text-black border border-[#2E333B] text-zinc-200 transition-colors"
            >
              Open Seat Grid ({webinar.totalSeats - webinar.soldSeats} Left)
            </Link>
          </div>
        </div>

        {/* Right: Interactive Sidebar with Q&A and Polls */}
        <div className="lg:col-span-4 rounded-lg bg-[#14161A] border border-[#23262C] flex flex-col h-[580px] overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center border-b border-[#23262C] bg-[#0E1013]">
            <button
              onClick={() => setActiveSideTab('qa')}
              className={`flex-1 py-3 text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors ${
                activeSideTab === 'qa'
                  ? 'bg-[#14161A] text-[#C9A227] border-b-2 border-[#C9A227]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Q&amp;A ({currentWebinarQuestions.length})</span>
            </button>

            <button
              onClick={() => setActiveSideTab('polls')}
              className={`flex-1 py-3 text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors relative ${
                activeSideTab === 'polls'
                  ? 'bg-[#14161A] text-[#C9A227] border-b-2 border-[#C9A227]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Polls</span>
              {activePoll?.active && (
                <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse" />
              )}
            </button>
          </div>

          {/* Tab 1: Q&A Panel */}
          {activeSideTab === 'qa' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              {/* Question list scrollable */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {/* Pinned Question */}
                {pinnedQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-3 rounded bg-[#181B22] border border-[#C9A227]/40 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#C9A227]">
                      <div className="flex items-center gap-1">
                        <Pin className="w-3 h-3 fill-[#C9A227]" />
                        <span>PINNED QUESTION</span>
                      </div>
                      <span className="text-zinc-500">{q.timestamp}</span>
                    </div>

                    <p className="text-xs font-sans text-white font-medium">
                      {q.question}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>By {q.userEmail}</span>
                      <button
                        onClick={() => upvoteQAQuestion(q.id)}
                        className="flex items-center gap-1 text-[#C9A227] hover:underline"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{q.upvotes}</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Unanswered Questions */}
                {unansweredQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-3 rounded bg-[#0E1013] border border-[#23262C] space-y-2 hover:border-[#2E333C] transition-colors"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span>{q.userEmail}</span>
                      <span>{q.timestamp}</span>
                    </div>

                    <p className="text-xs font-sans text-zinc-200">
                      {q.question}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span>In Armorer Queue</span>
                      <button
                        onClick={() => upvoteQAQuestion(q.id)}
                        className={`flex items-center gap-1 hover:text-[#C9A227] transition-colors ${
                          q.hasUpvoted ? 'text-[#C9A227]' : 'text-zinc-400'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{q.upvotes}</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Answered Section */}
                {answeredQuestions.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase font-bold block mb-2">
                      Answered on air ({answeredQuestions.length})
                    </span>
                    {answeredQuestions.map((q) => (
                      <div
                        key={q.id}
                        className="p-2.5 rounded bg-[#101512] border border-emerald-900/40 text-xs text-zinc-300 font-sans mb-2"
                      >
                        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] mb-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Answered by Host</span>
                        </div>
                        <p className="text-zinc-300">{q.question}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Input Form at bottom */}
              <form onSubmit={handlePostQuestion} className="p-3 bg-[#0E1013] border-t border-[#23262C] flex items-center gap-2">
                <input
                  type="text"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="Ask a question on air..."
                  className="flex-1 bg-[#14161A] border border-[#23262C] focus:border-[#C9A227] focus:outline-none rounded px-3 py-2 text-xs text-white placeholder-zinc-500 font-sans"
                />
                <button
                  type="submit"
                  className="p-2 rounded bg-[#C9A227] hover:bg-[#DBB22E] text-black transition-colors shrink-0"
                  aria-label="Send question"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Tab 2: Polls Panel */}
          {activeSideTab === 'polls' && (
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {polls.map((poll) => {
                const hasVoted = Boolean(poll.userVotedOptionId);

                return (
                  <div
                    key={poll.id}
                    className="p-4 rounded-lg bg-[#0E1013] border border-[#23262C] space-y-3 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#C9A227] uppercase font-bold">
                        {poll.active ? 'ACTIVE AUDIENCE POLL' : 'CONCLUDED POLL'}
                      </span>
                      <span className="text-zinc-500">{poll.totalVotes} Total Votes</span>
                    </div>

                    <h4 className="font-heading text-base font-bold text-white tracking-wide">
                      {poll.question}
                    </h4>

                    {/* Options & Animated Results */}
                    <div className="space-y-2">
                      {poll.options.map((opt) => {
                        const pct = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
                        const isUserChoice = poll.userVotedOptionId === opt.id;

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            disabled={!poll.active || hasVoted}
                            onClick={() => votePoll(poll.id, opt.id)}
                            className={`w-full p-2.5 rounded border text-left relative overflow-hidden transition-all ${
                              isUserChoice
                                ? 'border-[#C9A227] bg-[#1C1F26]'
                                : 'border-[#23262C] bg-[#14161A] hover:border-zinc-500'
                            }`}
                          >
                            {/* Animated bar fill */}
                            {hasVoted && (
                              <div
                                className={`absolute inset-y-0 left-0 opacity-20 transition-all duration-700 ${
                                  isUserChoice ? 'bg-[#C9A227]' : 'bg-white'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            )}

                            <div className="relative z-10 flex items-center justify-between text-xs">
                              <span className={isUserChoice ? 'text-[#C9A227] font-bold' : 'text-zinc-200'}>
                                {opt.text}
                              </span>

                              {hasVoted && (
                                <span className="font-mono text-zinc-400 font-bold ml-2">
                                  {pct}% ({opt.votes})
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* LOTTERY DRAW TAKEOVER OVERLAY */}
      <AnimatePresence>
        {showDrawTakeover && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl"
            >
              <LotteryDrawModal
                webinar={webinar}
                onClose={() => setShowDrawTakeover(false)}
                isStandalone={false}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
