import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Webinar, QAQuestion, Poll, DrawRecord, User } from '../types';
import {
  INITIAL_WEBINARS,
  INITIAL_QA_QUESTIONS,
  INITIAL_POLLS,
  INITIAL_DRAWS,
  SIMULATED_INCOMING_QUESTIONS
} from '../data/mockData';
import { computeSha256 } from '../lib/hash';
import { drawWinnersFromSeed, maskEmail } from '../lib/prng';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'gold';
}

interface AppStore {
  // Auth
  user: User | null;
  authModalOpen: boolean;
  authModalRedirectWebinarId: string | null;
  openAuthModal: (redirectWebinarId?: string) => void;
  closeAuthModal: () => void;
  loginWithEmail: (email: string) => void;
  logout: () => void;

  // Checkout modal
  checkoutModalOpen: boolean;
  checkoutWebinarId: string | null;
  checkoutSeats: number[];
  openCheckoutModal: (webinarId: string, seats: number[]) => void;
  closeCheckoutModal: () => void;

  // Webinars & Seats
  webinars: Webinar[];
  userSeatsByWebinar: Record<string, number[]>; // webinarId -> user seats
  claimSeats: (webinarId: string, seatNumbers: number[]) => void;
  createWebinar: (webinar: Partial<Webinar>) => string;
  updateWebinarStatus: (webinarId: string, status: Webinar['status']) => void;

  // Live state & fluctuations
  liveViewerCount: number;
  setLiveViewerCount: (count: number) => void;
  demoMode: boolean;
  toggleDemoMode: () => void;

  // Q&A
  qaQuestions: QAQuestion[];
  addQAQuestion: (webinarId: string, questionText: string) => void;
  upvoteQAQuestion: (questionId: string) => void;
  toggleAnswerQAQuestion: (questionId: string) => void;
  togglePinQAQuestion: (questionId: string) => void;
  deleteQAQuestion: (questionId: string) => void;
  simulateIncomingQuestion: (webinarId: string) => void;

  // Polls
  polls: Poll[];
  activePollPopup: Poll | null;
  setActivePollPopup: (poll: Poll | null) => void;
  votePoll: (pollId: string, optionId: string) => void;
  createPoll: (webinarId: string, question: string, optionTexts: string[]) => void;
  togglePollActive: (pollId: string) => void;

  // Draws & Verification
  drawRecords: DrawRecord[];
  activeDrawWebinarId: string | null;
  setActiveDrawWebinarId: (webinarId: string | null) => void;
  executeWebinarDraw: (webinarId: string, winnersCount?: number) => Promise<DrawRecord | null>;

  // Notification Toast
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'gold') => void;
  clearToast: () => void;

  // Reset to initial mock state
  resetAllData: () => void;
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Default to demo member for instant seamless preview
      user: {
        email: 'commander@sentinellive.com',
        name: 'Tactical Member #089',
        registeredAt: '2026-10-01T12:00:00Z',
        notificationsEnabled: true,
        twoFactorEnabled: true,
      },
      authModalOpen: false,
      authModalRedirectWebinarId: null,

      openAuthModal: (redirectWebinarId) =>
        set({ authModalOpen: true, authModalRedirectWebinarId: redirectWebinarId || null }),
      closeAuthModal: () =>
        set({ authModalOpen: false, authModalRedirectWebinarId: null }),

      loginWithEmail: (email: string) => {
        set({
          user: {
            email,
            name: email.split('@')[0],
            registeredAt: new Date().toISOString(),
            notificationsEnabled: true,
            twoFactorEnabled: false,
          },
          authModalOpen: false,
        });
        get().showToast(`Welcome back, ${email}`, 'gold');
      },

      logout: () => {
        set({ user: null });
        get().showToast('Signed out of member session', 'info');
      },

      // Checkout
      checkoutModalOpen: false,
      checkoutWebinarId: null,
      checkoutSeats: [],
      openCheckoutModal: (webinarId, seats) =>
        set({ checkoutModalOpen: true, checkoutWebinarId: webinarId, checkoutSeats: seats }),
      closeCheckoutModal: () =>
        set({ checkoutModalOpen: false, checkoutWebinarId: null, checkoutSeats: [] }),

      // Webinars & seats
      webinars: INITIAL_WEBINARS,
      userSeatsByWebinar: {
        'webinar-live-01': [17, 33],
        'webinar-up-01': [12],
        'webinar-rep-01': [42]
      },

      claimSeats: (webinarId: string, seatNumbers: number[]) => {
        const { webinars, userSeatsByWebinar, showToast, user } = get();
        const webinar = webinars.find((w) => w.id === webinarId);
        if (!webinar) return;

        const currentClaimed = new Set(webinar.claimedSeatNumbers);
        const currentUserSeats = new Set(userSeatsByWebinar[webinarId] || []);

        seatNumbers.forEach((s) => {
          currentClaimed.add(s);
          currentUserSeats.add(s);
        });

        const updatedWebinars = webinars.map((w) => {
          if (w.id === webinarId) {
            const newClaimedList = Array.from(currentClaimed).sort((a, b) => a - b);
            return {
              ...w,
              claimedSeatNumbers: newClaimedList,
              soldSeats: newClaimedList.length,
            };
          }
          return w;
        });

        set({
          webinars: updatedWebinars,
          userSeatsByWebinar: {
            ...userSeatsByWebinar,
            [webinarId]: Array.from(currentUserSeats).sort((a, b) => a - b),
          },
        });

        showToast(
          `Claimed ${seatNumbers.length} seat${seatNumbers.length > 1 ? 's' : ''} (#${seatNumbers.join(', #')}) for ${user?.email || 'your account'}`,
          'gold'
        );
      },

      createWebinar: (webinarData) => {
        const id = `webinar-${Date.now()}`;
        const newWebinar: Webinar = {
          id,
          title: webinarData.title || 'UNTITLED WEBINAR',
          subtitle: webinarData.subtitle || 'Tactical Product Review & Draw',
          category: webinarData.category || 'rifle',
          status: webinarData.status || 'upcoming',
          pricePerSeat: webinarData.pricePerSeat || 25,
          totalSeats: webinarData.totalSeats || 50,
          soldSeats: 0,
          claimedSeatNumbers: [],
          scheduledFor: webinarData.scheduledFor || new Date(Date.now() + 86400000).toISOString(),
          liveStreamUrl: webinarData.liveStreamUrl || '',
          replayUrl: webinarData.replayUrl || '',
          replayDuration: '45:00',
          chapters: [
            { title: 'Item Inspection', time: '00:00', seconds: 0 },
            { title: 'Range Demonstration', time: '15:00', seconds: 900 },
            { title: 'Audience Q&A', time: '30:00', seconds: 1800 },
            { title: 'On-Air Draw', time: '40:00', seconds: 2400 },
          ],
          images: webinarData.images && webinarData.images.length > 0
            ? webinarData.images
            : ['https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80'],
          specs: webinarData.specs || [],
          description: webinarData.description || 'Verified product review webinar.',
        };

        set((state) => ({ webinars: [newWebinar, ...state.webinars] }));
        get().showToast(`Webinar "${newWebinar.title}" created successfully!`, 'success');
        return id;
      },

      updateWebinarStatus: (webinarId, status) => {
        set((state) => ({
          webinars: state.webinars.map((w) => (w.id === webinarId ? { ...w, status } : w)),
        }));
        get().showToast(`Status updated to ${status.toUpperCase()}`, 'info');
      },

      // Live viewers & demo
      liveViewerCount: 284,
      setLiveViewerCount: (count) => set({ liveViewerCount: count }),
      demoMode: true,
      toggleDemoMode: () => {
        const next = !get().demoMode;
        set({ demoMode: next });
        get().showToast(`Demo Mode ${next ? 'Activated (Auto-simulation on)' : 'Disabled'}`, 'gold');
      },

      // Q&A
      qaQuestions: INITIAL_QA_QUESTIONS,
      addQAQuestion: (webinarId, questionText) => {
        const { user, showToast } = get();
        const email = user?.email || 'guest@sentinellive.com';
        const newQ: QAQuestion = {
          id: `qa-${Date.now()}`,
          webinarId,
          userEmail: maskEmail(email),
          question: questionText,
          upvotes: 1,
          hasUpvoted: true,
          answered: false,
          isPinned: false,
          timestamp: 'Just now',
        };
        set((state) => ({ qaQuestions: [newQ, ...state.qaQuestions] }));
        showToast('Question submitted to armorer review queue', 'gold');
      },

      upvoteQAQuestion: (questionId) => {
        set((state) => ({
          qaQuestions: state.qaQuestions.map((q) => {
            if (q.id === questionId) {
              const hasUpvoted = !q.hasUpvoted;
              return {
                ...q,
                hasUpvoted,
                upvotes: hasUpvoted ? q.upvotes + 1 : Math.max(0, q.upvotes - 1),
              };
            }
            return q;
          }),
        }));
      },

      toggleAnswerQAQuestion: (questionId) => {
        set((state) => ({
          qaQuestions: state.qaQuestions.map((q) =>
            q.id === questionId ? { ...q, answered: !q.answered } : q
          ),
        }));
      },

      togglePinQAQuestion: (questionId) => {
        set((state) => ({
          qaQuestions: state.qaQuestions.map((q) =>
            q.id === questionId ? { ...q, isPinned: !q.isPinned } : q
          ),
        }));
      },

      deleteQAQuestion: (questionId) => {
        set((state) => ({
          qaQuestions: state.qaQuestions.filter((q) => q.id !== questionId),
        }));
      },

      simulateIncomingQuestion: (webinarId) => {
        const randomIndex = Math.floor(Math.random() * SIMULATED_INCOMING_QUESTIONS.length);
        const text = SIMULATED_INCOMING_QUESTIONS[randomIndex];
        const randomUser = `member${Math.floor(Math.random() * 899 + 100)}@tactical.net`;

        const newQ: QAQuestion = {
          id: `sim-qa-${Date.now()}`,
          webinarId,
          userEmail: maskEmail(randomUser),
          question: text,
          upvotes: Math.floor(Math.random() * 5 + 1),
          answered: false,
          isPinned: false,
          timestamp: 'Just now',
        };

        set((state) => ({ qaQuestions: [newQ, ...state.qaQuestions] }));
      },

      // Polls
      polls: INITIAL_POLLS,
      activePollPopup: INITIAL_POLLS[0],
      setActivePollPopup: (poll) => set({ activePollPopup: poll }),

      votePoll: (pollId, optionId) => {
        set((state) => ({
          polls: state.polls.map((p) => {
            if (p.id === pollId) {
              const updatedOptions = p.options.map((opt) =>
                opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
              );
              return {
                ...p,
                totalVotes: p.totalVotes + 1,
                userVotedOptionId: optionId,
                options: updatedOptions,
              };
            }
            return p;
          }),
          activePollPopup: state.activePollPopup?.id === pollId
            ? {
                ...state.activePollPopup,
                totalVotes: state.activePollPopup.totalVotes + 1,
                userVotedOptionId: optionId,
                options: state.activePollPopup.options.map((opt) =>
                  opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
                ),
              }
            : state.activePollPopup,
        }));
        get().showToast('Vote recorded on live broadcast', 'gold');
      },

      createPoll: (webinarId, question, optionTexts) => {
        const newPoll: Poll = {
          id: `poll-${Date.now()}`,
          webinarId,
          question,
          active: true,
          totalVotes: 0,
          options: optionTexts.map((text, idx) => ({
            id: `opt-${idx + 1}`,
            text,
            votes: 0,
          })),
        };

        set((state) => ({
          polls: [newPoll, ...state.polls],
          activePollPopup: newPoll,
        }));
        get().showToast('New live poll published to broadcast room', 'success');
      },

      togglePollActive: (pollId) => {
        set((state) => ({
          polls: state.polls.map((p) => (p.id === pollId ? { ...p, active: !p.active } : p)),
        }));
      },

      // Draws
      drawRecords: INITIAL_DRAWS,
      activeDrawWebinarId: null,
      setActiveDrawWebinarId: (webinarId) => set({ activeDrawWebinarId: webinarId }),

      executeWebinarDraw: async (webinarId: string, winnersCount = 1) => {
        const { webinars, drawRecords, showToast } = get();
        const webinar = webinars.find((w) => w.id === webinarId);
        if (!webinar) return null;

        const eligibleSeats = webinar.claimedSeatNumbers.length > 0
          ? webinar.claimedSeatNumbers
          : Array.from({ length: webinar.totalSeats }, (_, i) => i + 1);

        const timestampMs = Date.now();
        const seed = `${timestampMs}-${webinarId}`;
        const hash = await computeSha256(seed);
        const winningSeats = drawWinnersFromSeed(eligibleSeats, seed, winnersCount);
        const winnerEmails = winningSeats.map(
          (s) => `member.seat.${s.toString().padStart(2, '0')}@sentinelhq.com`
        );

        const newRecord: DrawRecord = {
          id: `draw-${Date.now()}`,
          webinarId: webinar.id,
          webinarTitle: webinar.title,
          seed,
          hash,
          timestamp: new Date(timestampMs).toISOString(),
          totalEligible: eligibleSeats.length,
          winnerSeats: winningSeats,
          winnerEmails: winnerEmails.map(maskEmail),
          operator: 'Operator Miller (Lead Armorer)',
        };

        // Update webinar to ended/replay status and record winner
        const updatedWebinars = webinars.map((w) => {
          if (w.id === webinarId) {
            return {
              ...w,
              status: 'replay' as const,
              winnerSeats: winningSeats,
              winnerEmails: winnerEmails.map(maskEmail),
              drawSeed: seed,
              drawHash: hash,
              drawTimestamp: newRecord.timestamp,
              operator: newRecord.operator,
              replayUrl: w.replayUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            };
          }
          return w;
        });

        set({
          webinars: updatedWebinars,
          drawRecords: [newRecord, ...drawRecords],
        });

        showToast(
          `Draw complete! Winning seat: #${winningSeats.join(', #')}`,
          'gold'
        );

        return newRecord;
      },

      // Toast
      toast: null,
      showToast: (message, type = 'gold') => {
        const id = Date.now();
        set({ toast: { id, message, type } });
        setTimeout(() => {
          if (get().toast?.id === id) {
            set({ toast: null });
          }
        }, 4000);
      },
      clearToast: () => set({ toast: null }),

      // Reset
      resetAllData: () => {
        set({
          webinars: INITIAL_WEBINARS,
          qaQuestions: INITIAL_QA_QUESTIONS,
          polls: INITIAL_POLLS,
          drawRecords: INITIAL_DRAWS,
          userSeatsByWebinar: {
            'webinar-live-01': [17, 33],
            'webinar-up-01': [12],
            'webinar-rep-01': [42]
          },
        });
        get().showToast('Reset data to default mock state', 'info');
      },
    }),
    {
      name: 'sentinel_live_storage_v1',
      partialize: (state) => ({
        user: state.user,
        userSeatsByWebinar: state.userSeatsByWebinar,
        webinars: state.webinars,
        qaQuestions: state.qaQuestions,
        polls: state.polls,
        drawRecords: state.drawRecords,
        demoMode: state.demoMode,
      }),
    }
  )
);
