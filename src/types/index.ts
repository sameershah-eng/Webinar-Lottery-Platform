export type WebinarCategory = 'pistol' | 'rifle' | 'shotgun' | 'ammo' | 'accessories';

export type WebinarStatus = 'upcoming' | 'live' | 'replay';

export interface SpecField {
  id: string;
  key: string;
  value: string;
  isImage?: boolean;
}

export interface ReplayChapter {
  title: string;
  time: string;
  seconds: number;
}

export interface Webinar {
  id: string;
  title: string;
  subtitle: string;
  category: WebinarCategory;
  status: WebinarStatus;
  pricePerSeat: number;
  totalSeats: number;
  soldSeats: number;
  claimedSeatNumbers: number[];
  scheduledFor: string;
  liveStreamUrl: string;
  replayUrl: string;
  replayDuration: string;
  chapters: ReplayChapter[];
  images: string[];
  specs: SpecField[];
  description: string;
  featured?: boolean;
  winnerSeats?: number[];
  winnerEmails?: string[];
  drawSeed?: string;
  drawHash?: string;
  drawTimestamp?: string;
  operator?: string;
  viewers?: number;
}

export interface QAQuestion {
  id: string;
  webinarId: string;
  userEmail: string;
  question: string;
  upvotes: number;
  hasUpvoted?: boolean;
  answered: boolean;
  isPinned: boolean;
  timestamp: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  webinarId: string;
  question: string;
  options: PollOption[];
  active: boolean;
  totalVotes: number;
  userVotedOptionId?: string;
}

export interface DrawRecord {
  id: string;
  webinarId: string;
  webinarTitle: string;
  seed: string;
  hash: string;
  timestamp: string;
  totalEligible: number;
  winnerSeats: number[];
  winnerEmails: string[];
  operator: string;
}

export interface User {
  email: string;
  name?: string;
  registeredAt: string;
  notificationsEnabled: boolean;
  twoFactorEnabled: boolean;
}

export interface Attendee {
  id: string;
  email: string;
  seatsCount: number;
  attended: boolean;
  engagementScore: number;
  webinarTitle: string;
  lastActive: string;
}

export interface WinnerNotificationItem {
  id: string;
  webinarTitle: string;
  seatNumber: number;
  maskedEmail: string;
  claimedAt: string;
  drawDate: string;
  prizeValue: string;
}
