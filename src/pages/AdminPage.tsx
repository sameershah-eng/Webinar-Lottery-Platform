import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Radio,
  Layers,
  BarChart2,
  MessageSquare,
  Trophy,
  Mail,
  Users,
  Settings,
  Plus,
  Trash2,
  Pin,
  CheckCircle2,
  Play,
  Square,
  Download,
  Eye,
  Clock,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Send,
  AlertCircle,
  FileSpreadsheet,
  Check,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useStore } from '../store/useStore';
import { WebinarCategory, WebinarStatus, SpecField, Webinar } from '../types';
import { exportDrawsToCsv } from '../lib/csv';
import { INITIAL_ATTENDEES, INITIAL_ANALYTICS } from '../data/mockData';
import { SeatGrid } from '../components/common/SeatGrid';

type AdminTab =
  | 'overview'
  | 'webinars'
  | 'live_control'
  | 'polls'
  | 'qa'
  | 'draws'
  | 'emails'
  | 'analytics'
  | 'attendees';

export const AdminPage: React.FC = () => {
  const {
    webinars,
    createWebinar,
    updateWebinarStatus,
    qaQuestions,
    toggleAnswerQAQuestion,
    togglePinQAQuestion,
    deleteQAQuestion,
    polls,
    createPoll,
    togglePollActive,
    drawRecords,
    executeWebinarDraw,
    demoMode,
    toggleDemoMode,
    liveViewerCount,
    setLiveViewerCount,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [replayProcessing, setReplayProcessing] = useState(false);
  const [replayProgress, setReplayProgress] = useState(0);

  // Email Template Viewer state
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<
    'signup' | 'reminder' | 'replay' | 'winner'
  >('signup');

  // New Webinar Builder State
  const [isCreatingWebinar, setIsCreatingWebinar] = useState(false);
  const [newTitle, setNewTitle] = useState('CUSTOM PRECISION BOLT 6.5 CREEDMOOR');
  const [newSubtitle, setNewSubtitle] = useState('Proof Research Carbon Barrel & Leupold Mark 5HD');
  const [newCategory, setNewCategory] = useState<WebinarCategory>('rifle');
  const [newPrice, setNewPrice] = useState<number>(30);
  const [newSeats, setNewSeats] = useState<number>(45);
  const [newStreamUrl, setNewStreamUrl] = useState('');
  const [newStatus, setNewStatus] = useState<WebinarStatus>('upcoming');
  const [newSpecs, setNewSpecs] = useState<SpecField[]>([
    { id: '1', key: 'Manufacturer', value: 'Sentinel Precision Custom' },
    { id: '2', key: 'Model', value: 'Carbon Recon Mk III' },
    { id: '3', key: 'Caliber', value: '6.5 Creedmoor Match' },
    { id: '4', key: 'Barrel', value: '22" Proof Research Carbon Fiber Wrapped' },
    { id: '5', key: 'Optic Glass', value: 'Leupold Mark 5HD 5-25x56 PR2-MIL' },
    { id: '6', key: 'MSRP Package', value: '$6,250.00 USD' },
    {
      id: '7',
      key: 'Chassis Blueprint',
      value: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=800&q=80',
      isImage: true,
    },
  ]);

  // New Poll form state
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOption1, setPollOption1] = useState('');
  const [pollOption2, setPollOption2] = useState('');
  const [pollOption3, setPollOption3] = useState('');

  // Attendees search
  const [attendeeSearch, setAttendeeSearch] = useState('');

  const liveWebinar = webinars.find((w) => w.status === 'live') || webinars[0];

  // Helper for adding specs
  const handleAddSpecField = () => {
    if (newSpecs.length >= 15) return;
    const hasImageField = newSpecs.some((s) => s.isImage);
    const id = Date.now().toString();
    setNewSpecs([
      ...newSpecs,
      { id, key: 'Custom Field', value: 'Specification Value', isImage: !hasImageField && false },
    ]);
  };

  const handleRemoveSpec = (id: string) => {
    setNewSpecs(newSpecs.filter((s) => s.id !== id));
  };

  const handleUpdateSpec = (id: string, updates: Partial<SpecField>) => {
    // If setting isImage true, make sure no other field is image
    if (updates.isImage) {
      setNewSpecs(
        newSpecs.map((s) => (s.id === id ? { ...s, ...updates } : { ...s, isImage: false }))
      );
    } else {
      setNewSpecs(newSpecs.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    }
  };

  const handleSaveWebinar = (e: React.FormEvent) => {
    e.preventDefault();
    createWebinar({
      title: newTitle,
      subtitle: newSubtitle,
      category: newCategory,
      pricePerSeat: Number(newPrice),
      totalSeats: Number(newSeats),
      status: newStatus,
      specs: newSpecs,
      liveStreamUrl: newStreamUrl,
    });
    setIsCreatingWebinar(false);
  };

  const handleEndLiveSession = () => {
    if (!liveWebinar) return;
    setReplayProcessing(true);
    setReplayProgress(15);

    const interval = setInterval(() => {
      setReplayProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setReplayProcessing(false);
          updateWebinarStatus(liveWebinar.id, 'replay');
          showToast(`Replay published in under 5 minutes for "${liveWebinar.title}"`, 'gold');
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const handleCreatePollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pollQuestion.trim()) return;
    const options = [pollOption1, pollOption2, pollOption3].filter((o) => o.trim().length > 0);
    if (options.length < 2) {
      showToast('Poll must have at least 2 options', 'info');
      return;
    }
    createPoll(liveWebinar.id, pollQuestion, options);
    setPollQuestion('');
    setPollOption1('');
    setPollOption2('');
    setPollOption3('');
  };

  const handleExportAllDraws = () => {
    exportDrawsToCsv(drawRecords, 'sentinel-live-all-draws-audit.csv');
  };

  // Nav items for sidebar
  const sidebarItems = [
    { id: 'overview', label: 'Overview Control', icon: Shield },
    { id: 'webinars', label: 'Webinars & Seat Specs', icon: Layers },
    { id: 'live_control', label: 'Live Broadcast Room', icon: Radio, isLive: true },
    { id: 'polls', label: 'Interactive Polls', icon: BarChart2 },
    { id: 'qa', label: 'Q&A Moderation', icon: MessageSquare },
    { id: 'draws', label: 'Provably Fair Draws', icon: Trophy },
    { id: 'emails', label: 'Email Dispatches', icon: Mail },
    { id: 'analytics', label: 'Audience Analytics', icon: BarChart2 },
    { id: 'attendees', label: 'Member Roster', icon: Users },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#08090B]">
      {/* Top Admin Control Bar */}
      <div className="border-b border-[#23262C] bg-[#0E1013] sticky top-16 z-30 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#181B22] border border-[#C9A227]/50 flex items-center justify-center text-[#C9A227]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-bold text-white tracking-wider">
                  SENTINEL CONTROL ROOM
                </span>
                <span className="px-2 py-0.5 rounded bg-[#C9A227]/20 border border-[#C9A227]/50 text-[10px] font-mono text-[#C9A227] font-bold">
                  MASTER ARMORER
                </span>
              </div>
              <div className="text-[10px] font-mono text-zinc-500">
                Studio Node: US-EAST-01 &bull; SHA-256 Entropy Feed Active
              </div>
            </div>
          </div>

          {/* Right Header Actions: Demo Mode Toggle & Status */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDemoMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono transition-all ${
                demoMode
                  ? 'bg-amber-950/40 border-[#C9A227] text-[#C9A227]'
                  : 'bg-[#14161A] border-[#23262C] text-zinc-400'
              }`}
            >
              <span>Demo Simulation:</span>
              <span className="font-bold">{demoMode ? 'ON' : 'OFF'}</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#14161A] border border-[#23262C] text-xs font-mono text-white">
              <Eye className="w-3.5 h-3.5 text-[#E5383B]" />
              <span>{liveViewerCount} Live Viewers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Active Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar (3 cols) */}
          <div className="lg:col-span-3 bg-[#14161A] border border-[#23262C] rounded-lg p-2 space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono tracking-widest text-[#8A8F98] uppercase">
              Control Modules
            </div>

            {sidebarItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={`w-full p-2.5 rounded text-xs font-mono text-left flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#1C1F26] text-[#C9A227] font-bold border-l-2 border-[#C9A227]'
                      : 'text-zinc-400 hover:text-white hover:bg-[#181B22]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className="w-4 h-4 text-[#C9A227]" />
                    <span>{item.label}</span>
                  </div>

                  {item.isLive && (
                    <span className="w-2 h-2 rounded-full bg-[#E5383B] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Main Stage (9 cols) */}
          <div className="lg:col-span-9 bg-[#14161A] border border-[#23262C] rounded-lg p-6 sm:p-8 space-y-6">
            {/* 1. OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
                    Studio Overview &amp; Health
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Real-time operational heartbeat for Sentinel Live webinars.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded bg-[#0E1013] border border-[#23262C]">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Total Revenue</span>
                    <div className="font-mono text-2xl font-black text-[#C9A227] mt-1">$284,550</div>
                  </div>
                  <div className="p-4 rounded bg-[#0E1013] border border-[#23262C]">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Seats Claimed</span>
                    <div className="font-mono text-2xl font-black text-white mt-1">8,420</div>
                  </div>
                  <div className="p-4 rounded bg-[#0E1013] border border-[#23262C]">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Live Viewers</span>
                    <div className="font-mono text-2xl font-black text-[#E5383B] mt-1">{liveViewerCount}</div>
                  </div>
                  <div className="p-4 rounded bg-[#0E1013] border border-[#23262C]">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Fill Rate</span>
                    <div className="font-mono text-2xl font-black text-emerald-400 mt-1">98.2%</div>
                  </div>
                </div>

                {/* Quick actions row */}
                <div className="p-5 rounded-lg bg-[#0E1013] border border-[#23262C] space-y-3">
                  <span className="text-[11px] font-mono text-[#C9A227] uppercase font-bold">
                    Quick Operational Shortcuts
                  </span>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab('live_control')}
                      className="px-4 py-2 rounded bg-[#E5383B] hover:bg-[#F04A4D] text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>Control Room Live</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('webinars');
                        setIsCreatingWebinar(true);
                      }}
                      className="px-4 py-2 rounded bg-[#C9A227] hover:bg-[#DBB22E] text-black font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create New Webinar</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('draws')}
                      className="px-4 py-2 rounded bg-[#1C1F26] border border-[#2E333B] text-zinc-300 font-mono text-xs flex items-center gap-1.5"
                    >
                      <Trophy className="w-3.5 h-3.5 text-[#C9A227]" />
                      <span>Review Audit Logs</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. WEBINARS & SPEC BUILDER */}
            {activeTab === 'webinars' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#23262C]">
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
                      Webinar Catalog Management
                    </h2>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      Create webinars and customize up to 15 weapon specs with live seat grid preview.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsCreatingWebinar(!isCreatingWebinar)}
                    className="px-4 py-2 rounded bg-[#C9A227] text-black font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isCreatingWebinar ? 'Close Builder' : 'Create Webinar'}</span>
                  </button>
                </div>

                {/* CREATE WEBINAR FORM MODAL/PANEL */}
                {isCreatingWebinar && (
                  <form onSubmit={handleSaveWebinar} className="p-6 rounded-lg bg-[#0E1013] border border-[#C9A227]/40 space-y-6">
                    <span className="text-xs font-mono text-[#C9A227] uppercase font-bold block">
                      New Tactical Webinar Configuration
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <label className="text-zinc-400 block mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="w-full p-2.5 rounded bg-[#14161A] border border-[#23262C] text-white focus:border-[#C9A227] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-zinc-400 block mb-1">Subtitle</label>
                        <input
                          type="text"
                          required
                          value={newSubtitle}
                          onChange={(e) => setNewSubtitle(e.target.value)}
                          className="w-full p-2.5 rounded bg-[#14161A] border border-[#23262C] text-white focus:border-[#C9A227] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-zinc-400 block mb-1">Category</label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value as WebinarCategory)}
                          className="w-full p-2.5 rounded bg-[#14161A] border border-[#23262C] text-white focus:border-[#C9A227] focus:outline-none cursor-pointer"
                        >
                          <option value="rifle">Precision Rifle</option>
                          <option value="pistol">Custom Pistol</option>
                          <option value="shotgun">Combat Shotgun</option>
                          <option value="ammo">Bulk Ammo</option>
                          <option value="accessories">Optics &amp; Accessories</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-zinc-400 block mb-1">Price Per Seat ($ USD)</label>
                        <input
                          type="number"
                          min={5}
                          max={500}
                          value={newPrice}
                          onChange={(e) => setNewPrice(Number(e.target.value))}
                          className="w-full p-2.5 rounded bg-[#14161A] border border-[#23262C] text-white focus:border-[#C9A227] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-zinc-400 block mb-1">
                          Total Seats: <span className="text-[#C9A227] font-bold">{newSeats}</span>
                        </label>
                        <input
                          type="range"
                          min={21}
                          max={100}
                          value={newSeats}
                          onChange={(e) => setNewSeats(Number(e.target.value))}
                          className="w-full accent-[#C9A227] cursor-pointer"
                        />
                        <span className="text-[10px] text-zinc-500">
                          Seat grid preview renders dynamically below.
                        </span>
                      </div>

                      <div>
                        <label className="text-zinc-400 block mb-1">Initial Status</label>
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value as WebinarStatus)}
                          className="w-full p-2.5 rounded bg-[#14161A] border border-[#23262C] text-white focus:border-[#C9A227] focus:outline-none"
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="live">Live Now</option>
                        </select>
                      </div>
                    </div>

                    {/* LIVE DYNAMIC SEAT GRID PREVIEW BESIDE THE FORM */}
                    <div className="p-4 rounded bg-[#14161A] border border-[#23262C] space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-300 font-bold">
                          Live Dynamic Seat Grid Preview ({newSeats} Seats)
                        </span>
                        <span className="text-[#C9A227]">${newPrice}/seat &bull; Max Pool: ${newSeats * newPrice}</span>
                      </div>
                      <div className="max-h-48 overflow-y-auto p-2 bg-[#0E1013] rounded">
                        <SeatGrid
                          totalSeats={newSeats}
                          claimedSeats={[]}
                          selectedSeats={[]}
                          pricePerSeat={newPrice}
                          onToggleSeat={() => {}}
                          disabled={true}
                        />
                      </div>
                    </div>

                    {/* ITEM DETAILS SPEC BUILDER (UP TO 15 FIELDS) */}
                    <div className="space-y-3 pt-2 border-t border-[#1C1F26]">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono font-bold text-white uppercase">
                            Item Details Spec Builder ({newSpecs.length}/15 Fields)
                          </span>
                          <p className="text-[10px] text-zinc-500 font-mono">
                            Exactly one field can be marked as an Image preview.
                          </p>
                        </div>

                        <button
                          type="button"
                          disabled={newSpecs.length >= 15}
                          onClick={handleAddSpecField}
                          className="px-3 py-1.5 rounded bg-[#1C1F26] border border-[#2E333B] hover:border-[#C9A227] text-xs font-mono text-[#C9A227] disabled:opacity-40"
                        >
                          + Add Field ({newSpecs.length}/15)
                        </button>
                      </div>

                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {newSpecs.map((spec) => (
                          <div
                            key={spec.id}
                            className="p-2.5 rounded bg-[#14161A] border border-[#23262C] flex items-center gap-2 text-xs font-mono"
                          >
                            <input
                              type="text"
                              value={spec.key}
                              placeholder="Key (e.g. Barrel)"
                              onChange={(e) => handleUpdateSpec(spec.id, { key: e.target.value })}
                              className="w-1/3 p-1.5 rounded bg-[#0E1013] border border-[#23262C] text-white"
                            />

                            <input
                              type="text"
                              value={spec.value}
                              placeholder="Value or Image URL"
                              onChange={(e) => handleUpdateSpec(spec.id, { value: e.target.value })}
                              className="flex-1 p-1.5 rounded bg-[#0E1013] border border-[#23262C] text-white"
                            />

                            {/* Mark as image checkbox */}
                            <label className="flex items-center gap-1 text-[11px] text-zinc-400 shrink-0 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Boolean(spec.isImage)}
                                onChange={(e) =>
                                  handleUpdateSpec(spec.id, { isImage: e.target.checked })
                                }
                                className="accent-[#C9A227]"
                              />
                              <ImageIcon className="w-3.5 h-3.5 text-[#C9A227]" />
                              <span>Image</span>
                            </label>

                            <button
                              type="button"
                              onClick={() => handleRemoveSpec(spec.id)}
                              className="text-zinc-500 hover:text-red-400 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsCreatingWebinar(false)}
                        className="px-4 py-2 rounded text-xs font-mono text-zinc-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded bg-[#C9A227] hover:bg-[#DBB22E] text-black font-heading font-bold text-sm uppercase tracking-wider"
                      >
                        Publish Webinar
                      </button>
                    </div>
                  </form>
                )}

                {/* List of existing webinars */}
                <div className="space-y-3">
                  {webinars.map((w) => (
                    <div
                      key={w.id}
                      className="p-4 rounded-lg bg-[#0E1013] border border-[#23262C] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded bg-[#14161A] overflow-hidden border border-[#23262C] shrink-0">
                          <img src={w.images[0]} alt={w.title} className="w-full h-full object-cover" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-sans font-bold text-white text-sm">{w.title}</span>
                            <span
                              className={`px-1.5 py-0.2 rounded text-[10px] uppercase ${
                                w.status === 'live'
                                  ? 'bg-[#E5383B] text-white font-bold'
                                  : w.status === 'upcoming'
                                  ? 'bg-[#1C1F26] text-[#C9A227]'
                                  : 'bg-zinc-800 text-zinc-400'
                              }`}
                            >
                              {w.status}
                            </span>
                          </div>
                          <div className="text-zinc-500 text-[11px] mt-0.5">
                            {w.soldSeats}/{w.totalSeats} seats sold &bull; ${w.pricePerSeat}/seat &bull; {w.specs.length} specs
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {w.status === 'upcoming' && (
                          <button
                            onClick={() => updateWebinarStatus(w.id, 'live')}
                            className="px-3 py-1.5 rounded bg-[#E5383B] hover:bg-[#F04A4D] text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1"
                          >
                            <Play className="w-3 h-3 fill-white" />
                            <span>Go Live</span>
                          </button>
                        )}
                        {w.status === 'live' && (
                          <button
                            onClick={handleEndLiveSession}
                            className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1"
                          >
                            <Square className="w-3 h-3 fill-zinc-200" />
                            <span>End Session</span>
                          </button>
                        )}
                        <button
                          onClick={() => executeWebinarDraw(w.id)}
                          className="px-3 py-1.5 rounded bg-[#1C1F26] hover:bg-[#252A33] border border-[#2E333C] text-[#C9A227] font-mono text-xs flex items-center gap-1"
                        >
                          <Trophy className="w-3 h-3" />
                          <span>Trigger Draw</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. LIVE BROADCAST CONTROL */}
            {activeTab === 'live_control' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
                    Live Broadcast Control Room
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Real-time triggers for on-air hosts: Launch draws, push polls, and manage stream state.
                  </p>
                </div>

                {/* Live stream status bar */}
                <div className="p-5 rounded-lg bg-[#0E1013] border border-[#E5383B]/50 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5383B] opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E5383B]" />
                    </span>
                    <div>
                      <div className="text-xs font-mono text-[#E5383B] font-bold uppercase">
                        ACTIVE BROADCAST: {liveWebinar?.title}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-400">
                        {liveViewerCount} active viewers &bull; {liveWebinar?.soldSeats} seats confirmed
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleEndLiveSession}
                      disabled={replayProcessing}
                      className="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-heading font-bold text-xs uppercase tracking-wider"
                    >
                      {replayProcessing ? `Processing Replay (${replayProgress}%)...` : 'End Broadcast & Publish Replay'}
                    </button>
                  </div>
                </div>

                {/* 1-Click Triggers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Draw launcher */}
                  <div className="p-5 rounded-lg bg-[#0E1013] border border-[#23262C] space-y-3 font-mono text-xs">
                    <div className="flex items-center gap-2 text-[#C9A227] font-bold">
                      <Trophy className="w-4 h-4" />
                      <span>ON-AIR LOTTERY DRAW</span>
                    </div>
                    <p className="text-zinc-400 text-[11px]">
                      Executes deterministic Mulberry32 PRNG and displays winner card on all member screens.
                    </p>
                    <button
                      onClick={() => executeWebinarDraw(liveWebinar.id, 1)}
                      className="w-full py-2.5 rounded bg-gradient-to-r from-[#C9A227] to-[#DBB22E] text-black font-heading font-bold text-xs uppercase tracking-wider"
                    >
                      Draw 1 Winner Now
                    </button>
                  </div>

                  {/* 1-Click Poll trigger */}
                  <div className="p-5 rounded-lg bg-[#0E1013] border border-[#23262C] space-y-3 font-mono text-xs">
                    <div className="flex items-center gap-2 text-sky-400 font-bold">
                      <BarChart2 className="w-4 h-4" />
                      <span>LAUNCH AUDIENCE POLL</span>
                    </div>
                    <p className="text-zinc-400 text-[11px]">
                      Broadcasts live voting modal to all viewers without page reload.
                    </p>
                    <button
                      onClick={() =>
                        createPoll(
                          liveWebinar.id,
                          'Which distance steel target do you want tested next?',
                          ['500 Yards Wind Drift', '800 Yards Rapid Bolt', '1,000 Yards Cold Bore']
                        )
                      }
                      className="w-full py-2.5 rounded bg-[#1C1F26] hover:bg-[#252A33] border border-[#2E333B] text-white font-heading font-bold text-xs uppercase tracking-wider"
                    >
                      Push Quick Steel Target Poll
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. POLLS BUILDER */}
            {activeTab === 'polls' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
                    Interactive Polls Manager
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Create dynamic voting options and see live percentages animate in real-time.
                  </p>
                </div>

                {/* Create poll form */}
                <form onSubmit={handleCreatePollSubmit} className="p-5 rounded-lg bg-[#0E1013] border border-[#23262C] space-y-3 font-mono text-xs">
                  <span className="text-[#C9A227] uppercase font-bold block">
                    Create New Broadcast Poll
                  </span>

                  <div>
                    <label className="text-zinc-400 block mb-1">Question</label>
                    <input
                      type="text"
                      required
                      value={pollQuestion}
                      onChange={(e) => setPollQuestion(e.target.value)}
                      placeholder="e.g. Which optic mount height do you prefer?"
                      className="w-full p-2.5 rounded bg-[#14161A] border border-[#23262C] text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      value={pollOption1}
                      onChange={(e) => setPollOption1(e.target.value)}
                      placeholder="Option 1"
                      className="p-2 rounded bg-[#14161A] border border-[#23262C] text-white"
                    />
                    <input
                      type="text"
                      required
                      value={pollOption2}
                      onChange={(e) => setPollOption2(e.target.value)}
                      placeholder="Option 2"
                      className="p-2 rounded bg-[#14161A] border border-[#23262C] text-white"
                    />
                    <input
                      type="text"
                      value={pollOption3}
                      onChange={(e) => setPollOption3(e.target.value)}
                      placeholder="Option 3 (Optional)"
                      className="p-2 rounded bg-[#14161A] border border-[#23262C] text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded bg-[#C9A227] text-black font-heading font-bold text-xs uppercase tracking-wider"
                  >
                    Publish Poll to Stream
                  </button>
                </form>

                {/* Polls list */}
                <div className="space-y-3">
                  {polls.map((p) => (
                    <div key={p.id} className="p-4 rounded bg-[#0E1013] border border-[#23262C] space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{p.question}</span>
                        <button
                          onClick={() => togglePollActive(p.id)}
                          className={`px-2 py-0.5 rounded text-[10px] ${
                            p.active ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {p.active ? 'Active' : 'Closed'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        {p.options.map((opt) => (
                          <div key={opt.id} className="p-2 rounded bg-[#14161A] border border-[#23262C] text-zinc-300">
                            <div>{opt.text}</div>
                            <div className="text-[11px] text-[#C9A227] font-bold mt-0.5">
                              {opt.votes} votes ({p.totalVotes > 0 ? Math.round((opt.votes / p.totalVotes) * 100) : 0}%)
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Q&A MODERATION */}
            {activeTab === 'qa' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
                    Live Q&amp;A Moderation Desk
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Approve, pin to broadcast screen, mark as answered, or hide incoming questions.
                  </p>
                </div>

                <div className="space-y-3">
                  {qaQuestions.map((q) => (
                    <div
                      key={q.id}
                      className="p-4 rounded-lg bg-[#0E1013] border border-[#23262C] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-500">{q.userEmail}</span>
                          <span className="text-[10px] text-[#C9A227] font-bold">
                            &bull; {q.upvotes} Upvotes
                          </span>
                          {q.isPinned && (
                            <span className="px-1.5 py-0.2 rounded bg-[#C9A227]/20 border border-[#C9A227]/50 text-[#C9A227] text-[9px]">
                              PINNED
                            </span>
                          )}
                          {q.answered && (
                            <span className="px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[9px]">
                              ANSWERED
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-white text-sm font-medium">{q.question}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => togglePinQAQuestion(q.id)}
                          className="p-2 rounded bg-[#14161A] hover:bg-[#1C1F26] border border-[#23262C] text-zinc-300"
                          title="Pin question to stream"
                        >
                          <Pin className={`w-3.5 h-3.5 ${q.isPinned ? 'fill-[#C9A227] text-[#C9A227]' : ''}`} />
                        </button>

                        <button
                          onClick={() => toggleAnswerQAQuestion(q.id)}
                          className={`px-3 py-1.5 rounded text-xs ${
                            q.answered
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                              : 'bg-[#1C1F26] border border-[#2E333B] text-zinc-300'
                          }`}
                        >
                          {q.answered ? 'Answered' : 'Mark Answered'}
                        </button>

                        <button
                          onClick={() => deleteQAQuestion(q.id)}
                          className="p-2 rounded text-zinc-500 hover:text-red-400"
                          title="Remove question"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. DRAWS & CSV EXPORT */}
            {activeTab === 'draws' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#23262C]">
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
                      Cryptographic Draw History &amp; Audits
                    </h2>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      Export immutable audit logs of PRNG seeds, SHA-256 hashes, and winning tickets.
                    </p>
                  </div>

                  <button
                    onClick={handleExportAllDraws}
                    className="px-4 py-2 rounded bg-[#C9A227] text-black font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export All Draws CSV</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="text-zinc-500 text-[10px] uppercase border-b border-[#1C1F26]">
                        <th className="pb-3">Session Title</th>
                        <th className="pb-3">Winner Seat</th>
                        <th className="pb-3">Winner Account</th>
                        <th className="pb-3">PRNG Seed</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C1F26] text-zinc-300">
                      {drawRecords.map((d) => (
                        <tr key={d.id} className="hover:bg-[#0E1013]">
                          <td className="py-3 font-sans font-bold text-white max-w-xs truncate">
                            {d.webinarTitle}
                          </td>
                          <td className="py-3 text-[#C9A227] font-bold">
                            #{d.winnerSeats.join(', #')}
                          </td>
                          <td className="py-3 text-zinc-400">
                            {d.winnerEmails[0] || 'm***r@sentinel.net'}
                          </td>
                          <td className="py-3 text-zinc-500 truncate max-w-[150px]">
                            {d.seed}
                          </td>
                          <td className="py-3">
                            <button
                              onClick={() => exportDrawsToCsv([d], `draw-${d.id}.csv`)}
                              className="text-[11px] text-[#C9A227] hover:underline flex items-center gap-1"
                            >
                              <Download className="w-3 h-3" />
                              <span>CSV</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 7. EMAIL TEMPLATES PREVIEW (Email-client frame) */}
            {activeTab === 'emails' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
                    Member Email Dispatches
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Inspect 4 branded email notifications in an authentic client view.
                  </p>
                </div>

                {/* Email Template Selector */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'signup', label: '1. Magic Passcode Signup' },
                    { id: 'reminder', label: '2. Broadcast Reminder (24h/1h)' },
                    { id: 'replay', label: '3. Replay Published (< 5 min)' },
                    { id: 'winner', label: '4. Winner Congratulations' },
                  ].map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => setSelectedEmailTemplate(tpl.id as any)}
                      className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                        selectedEmailTemplate === tpl.id
                          ? 'bg-[#C9A227] text-black font-bold'
                          : 'bg-[#0E1013] text-zinc-400 hover:text-white border border-[#23262C]'
                      }`}
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>

                {/* Email Client Simulated Frame */}
                <div className="rounded-lg bg-[#0E1013] border border-[#23262C] overflow-hidden">
                  {/* Email Client Header */}
                  <div className="p-3 bg-[#14161A] border-b border-[#23262C] flex items-center justify-between text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#C9A227]" />
                      <span>From: concierge@sentinellive.com (Authenticated)</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px]">
                      <span className="text-emerald-400 font-bold">SPF: PASS</span>
                      <span className="text-emerald-400 font-bold">DKIM: PASS</span>
                      <span className="text-emerald-400 font-bold">DMARC: PASS</span>
                    </div>
                  </div>

                  {/* Email Body */}
                  <div className="p-6 sm:p-8 max-w-xl mx-auto space-y-6 bg-[#0A0B0D] my-4 rounded border border-[#23262C] text-left">
                    {/* Brand header */}
                    <div className="border-b border-[#23262C] pb-4 flex items-center justify-between">
                      <div className="font-heading text-xl font-bold tracking-widest text-white">
                        SENTINEL <span className="text-[#C9A227]">LIVE</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        Dispatch #89201
                      </span>
                    </div>

                    {selectedEmailTemplate === 'signup' && (
                      <div className="space-y-4">
                        <h3 className="font-heading text-2xl font-bold text-white uppercase">
                          Your Member Passcode
                        </h3>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          Welcome to Sentinel Live. Enter the 6-digit cryptographic verification code below to authenticate your session:
                        </p>
                        <div className="p-4 rounded bg-[#14161A] border border-[#C9A227] text-center font-mono text-3xl font-black text-[#C9A227] tracking-[0.3em]">
                          736-846
                        </div>
                        <p className="text-[11px] text-zinc-500 font-mono">
                          Expires in 15 minutes &bull; If you did not request this code, no action is required.
                        </p>
                      </div>
                    )}

                    {selectedEmailTemplate === 'reminder' && (
                      <div className="space-y-4">
                        <span className="px-2 py-0.5 rounded bg-[#E5383B]/20 text-[#E5383B] text-[10px] font-mono font-bold uppercase">
                          BROADCAST REMINDER
                        </span>
                        <h3 className="font-heading text-2xl font-bold text-white uppercase">
                          Webinar Starts In 1 Hour
                        </h3>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          Your claimed seat <strong className="text-[#C9A227]">#17</strong> for the <strong>Strike-X .300 Win Mag</strong> is locked. The live stream and interactive Q&amp;A starts at 18:00 UTC.
                        </p>
                        <div className="p-3 rounded bg-[#14161A] border border-[#23262C] text-xs font-mono text-zinc-400">
                          Stream Link: https://sentinellive.com/live/webinar-live-01
                        </div>
                      </div>
                    )}

                    {selectedEmailTemplate === 'replay' && (
                      <div className="space-y-4">
                        <h3 className="font-heading text-2xl font-bold text-white uppercase">
                          Session Replay Published
                        </h3>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          The live review and draw for <strong>Titan Thermal Monocular Suite</strong> has concluded. Watch the full HD replay with chapter markers anytime over the next 30 days.
                        </p>
                        <div className="p-3 rounded bg-[#14161A] border border-[#23262C] text-xs font-mono text-emerald-400">
                          Winner Seat: #42 &bull; Draw Seed Verified
                        </div>
                      </div>
                    )}

                    {selectedEmailTemplate === 'winner' && (
                      <div className="space-y-4">
                        <div className="text-2xl font-bold text-[#C9A227]">
                          &#9733; CONGRATULATIONS WINNER &#9733;
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-white uppercase">
                          Your Seat #42 Was Selected On Air!
                        </h3>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          During tonight's provably fair lottery draw, your ticket was selected. Our Concierge Armorer team has prepared your fulfillment dossier.
                        </p>
                        <div className="p-4 rounded bg-[#14161A] border border-[#C9A227]/60 space-y-2 font-mono text-xs text-zinc-300">
                          <div>Item: Titan Thermal Monocular &amp; Helmet Suite</div>
                          <div>Value: $6,490.00 USD</div>
                          <div>Next Step: Nominate your local verified FFL dealer</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 8. ANALYTICS (Recharts) */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
                    Audience &amp; Conversion Analytics
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Interactive Recharts telemetry: attendance growth, peak concurrency, and category distribution.
                  </p>
                </div>

                {/* Area Chart: Attendance Over Time */}
                <div className="p-5 rounded-lg bg-[#0E1013] border border-[#23262C] space-y-4">
                  <span className="text-xs font-mono font-bold text-white uppercase">
                    Monthly Attendees &amp; Peak Concurrent Viewers
                  </span>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={INITIAL_ANALYTICS.attendanceOverTime}>
                        <defs>
                          <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C9A227" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#C9A227" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#E5383B" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#E5383B" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#23262C" />
                        <XAxis dataKey="date" stroke="#8A8F98" fontSize={11} />
                        <YAxis stroke="#8A8F98" fontSize={11} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#14161A',
                            borderColor: '#C9A227',
                            fontSize: '12px',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="attendees"
                          stroke="#C9A227"
                          fillOpacity={1}
                          fill="url(#goldGradient)"
                          name="Total Registered"
                        />
                        <Area
                          type="monotone"
                          dataKey="viewersPeak"
                          stroke="#E5383B"
                          fillOpacity={1}
                          fill="url(#redGradient)"
                          name="Peak Live Viewers"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar Chart: Category Seat Distribution */}
                <div className="p-5 rounded-lg bg-[#0E1013] border border-[#23262C] space-y-4">
                  <span className="text-xs font-mono font-bold text-white uppercase">
                    Seats Claimed By Weapon Category
                  </span>
                  <div className="h-60 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={INITIAL_ANALYTICS.categoryBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#23262C" />
                        <XAxis dataKey="name" stroke="#8A8F98" fontSize={10} />
                        <YAxis stroke="#8A8F98" fontSize={11} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#14161A',
                            borderColor: '#C9A227',
                            fontSize: '12px',
                          }}
                        />
                        <Bar dataKey="seats" fill="#C9A227" radius={[4, 4, 0, 0]} name="Seats Sold" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* 9. ATTENDEES ROSTER */}
            {activeTab === 'attendees' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#23262C]">
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
                      Verified Member Roster
                    </h2>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      {INITIAL_ATTENDEES.length} registered claimants with participation telemetry.
                    </p>
                  </div>

                  <input
                    type="text"
                    value={attendeeSearch}
                    onChange={(e) => setAttendeeSearch(e.target.value)}
                    placeholder="Search member email..."
                    className="p-2 rounded bg-[#0E1013] border border-[#23262C] text-xs font-mono text-white placeholder-zinc-500"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="text-zinc-500 text-[10px] uppercase border-b border-[#1C1F26]">
                        <th className="pb-3">Member Email</th>
                        <th className="pb-3">Seats Held</th>
                        <th className="pb-3">Attended Live</th>
                        <th className="pb-3">Engagement Score</th>
                        <th className="pb-3">Session</th>
                        <th className="pb-3">Last Active</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C1F26] text-zinc-300">
                      {INITIAL_ATTENDEES.filter((a) =>
                        a.email.toLowerCase().includes(attendeeSearch.toLowerCase())
                      ).map((att) => (
                        <tr key={att.id} className="hover:bg-[#0E1013]">
                          <td className="py-3 text-white font-bold">{att.email}</td>
                          <td className="py-3 text-[#C9A227]">{att.seatsCount} Seats</td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] ${
                                att.attended
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                                  : 'bg-zinc-800 text-zinc-400'
                              }`}
                            >
                              {att.attended ? 'Yes (Live)' : 'No'}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <span>{att.engagementScore}%</span>
                              <div className="w-16 h-1.5 rounded-full bg-[#1C1F26] overflow-hidden">
                                <div
                                  className="h-full bg-[#C9A227]"
                                  style={{ width: `${att.engagementScore}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-zinc-400 max-w-xs truncate">{att.webinarTitle}</td>
                          <td className="py-3 text-zinc-500">{att.lastActive}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
