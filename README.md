# SENTINEL LIVE — Interactive Tactical Webinar & Seat Lottery Platform

> **"WATCH IT LIVE. CLAIM YOUR SEAT. WIN IT ON AIR."**  
> An elite, high-adrenaline interactive broadcast and transparent seat lottery platform for premium tactical equipment, firearms, precision optics, and bulk ammunition.

---

## 1. Project Overview & Architectural Vision
**SENTINEL LIVE** is an interactive live broadcast and provably fair seat lottery application. Each session highlights a single premier firearm, optic, or gear bundle. Registered members claim numbered seats at fixed prices per seat, attend the live review stream, interact through live polls and armorer Q&A, and participate in an on-screen deterministic lottery draw that selects the winning seat with verifiable cryptographic proof.

### Design System & Visual Identity
- **Aesthetic**: Elite, tactical, luxury private members club meets live broadcast studio.
- **Palette**:
  - Near-black background: `#0A0B0D`
  - Graphite surface cards: `#14161A`
  - Subtle borders: `#23262C`
  - Brushed gold accent: `#C9A227` (Hover: `#DBB22E`)
  - Live broadcast red: `#E5383B`
  - Muted secondary text: `#8A8F98`
- **Typography**:
  - Headings: `"Barlow Condensed"` (600/700/800 uppercase)
  - Body: `"Inter"` (400/500/600/700)
  - Data, Seats, Hashes, Timers: `"JetBrains Mono"` (400/600/700)
- **Brand Customization**: The brand name, taglines, and contact details are centralized in `/src/config/brand.ts` for instant 1-file rebranding.

---

## 2. Complete File Tree

```text
├── index.html                           # App entry HTML with Google Fonts & dark theme
├── metadata.json                        # App metadata & capabilities
├── package.json                         # Dependencies (React 19, Motion, Recharts, Zustand)
├── tsconfig.json                        # TypeScript configuration
├── vercel.json                          # Zero-config SPA rewrite rule for Vercel deployment
├── vite.config.ts                       # Vite bundler & Tailwind configuration
├── README.md                            # Complete documentation & 3-minute demo script
└── src/
    ├── App.tsx                          # App root with Router, PageTransitions, Modals
    ├── index.css                        # Tailwind v4 directives, custom tactical grid, shimmer
    ├── main.tsx                         # React 19 DOM mount
    ├── config/
    │   └── brand.ts                     # Single-source brand parameters
    ├── types/
    │   └── index.ts                     # TypeScript interfaces (Webinar, Spec, Q&A, Poll, Draw)
    ├── data/
    │   └── mockData.ts                  # 10 realistic webinars, questions, polls, audit logs
    ├── lib/
    │   ├── prng.ts                      # Deterministic Mulberry32 PRNG & email masking
    │   ├── hash.ts                      # SHA-256 computation via Web Crypto API with fallback
    │   └── csv.ts                       # Instant cryptographic audit log CSV downloader
    ├── store/
    │   └── useStore.ts                  # Zustand state store with LocalStorage persistence
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx               # Smart sticky frosted navbar with progress bar & live pill
    │   │   ├── Footer.tsx               # Tactical luxury footer with trust badges & compliance
    │   │   └── ToastContainer.tsx       # HUD-style toast notifications
    │   ├── common/
    │   │   ├── CountdownTimer.tsx       # Digital countdown clock with JetBrains Mono numbers
    │   │   ├── SeatGrid.tsx             # Dynamic auto-fit seat grid (21-100 seats, multi-select)
    │   │   ├── WebinarCard.tsx          # Card with image fallback, urgent tags, and hover lift
    │   │   ├── AuthModal.tsx            # Passwordless 6-digit email magic passcode modal
    │   │   └── CheckoutModal.tsx        # Seat reservation summary with gold confetti burst
    │   └── draw/
    │       └── LotteryDrawModal.tsx     # On-screen slot machine reel, Mulberry32 draw & verification
    └── pages/
        ├── HomePage.tsx                 # Cinematic hero, Live Now strip, How it Works, Stats
        ├── WebinarsPage.tsx             # Filter chips, status tabs, search & responsive grid
        ├── WebinarDetailPage.tsx        # Image gallery, dynamic seat grid, specs panel, tabs
        ├── LiveRoomPage.tsx             # 16:9 stream area, Q&A, live polls, draw takeover
        ├── DrawDemoPage.tsx             # Standalone provably fair lottery draw ceremony
        ├── ReplaysPage.tsx              # 30-day replay player with interactive chapters
        ├── AccountPage.tsx              # Member seat allocations & notification preferences
        └── AdminPage.tsx                # 9-module control room with Recharts & live triggers
```

---

## 3. Technology Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Motion (`motion/react`)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Analytics Charts**: Recharts
- **State Management**: Zustand with `localStorage` persistence
- **Celebration FX**: Canvas Confetti

---

## 4. Local Installation & Development

To run the application locally:

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 5. Deployment on Vercel (Zero-Config)

This repository includes `vercel.json` with an SPA rewrite rule (`{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`).

1. Push your code to a GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete Sentinel Live platform mockup"
   git push origin main
   ```
2. Navigate to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite** (auto-detected).
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **"Deploy"**. The site will deploy with zero configuration issues and all client-side routes will resolve cleanly.

---

## 6. Client Pitch Demo Script (3-Minute Walkthrough)

Follow this exact path when pitching to a prospective client or stakeholder:

1. **LAND ON HOME (`/`) [0:00 - 0:30]**
   - Point out the **tactical luxury visual identity**: near-black `#0A0B0D` backdrop, brushed gold `#C9A227`, and live red accents.
   - Show the **Smart Navbar**: observe how scrolling down shrinks it to a 64px frosted glass bar with a gold scroll progress bar and active live broadcast badge.
   - Highlight the **"LIVE NOW" strip** ticking with simulated viewers, the 4-step "How It Works", and the **"Provably Fair Draws"** cryptographic commitment explainer.

2. **WEBINAR DETAIL & DYNAMIC SEAT GRID (`/webinars/webinar-live-01`) [0:30 - 1:15]**
   - Click the featured **"Strike-X 300 Win Mag"** webinar.
   - Show the **Image Gallery**, countdown timer, and animated stats (`65 Total Seats`, `61 Sold`, `Only 4 Left!`).
   - Scroll down to the **Dynamic Seat Grid**:
     - Hover over available white tiles (shows tooltip: `Seat #62 - $35`).
     - Click **"+1 Random"** or click 2 open seats.
     - Notice the **Sticky Gold Summary Bar** popping up at the bottom: shows selected seat numbers and total price.
   - Click **"Claim Seats"**:
     - Opens the **Checkout Modal**.
     - Click **"Confirm & Lock Seats"**.
     - Watch the celebratory **gold confetti burst**, instant confirmation, and observe the seats permanently turn gold **"Yours"** with `MINE` badges.

3. **ENTER LIVE BROADCAST ROOM (`/live/webinar-live-01`) [1:15 - 2:00]**
   - Click **"Live Room"** in the top navigation.
   - Note the locked state if signed out, and authenticated broadcast HUD for members.
   - In the right sidebar:
     - **Q&A Tab**: Post a test question (`"Can this chassis accept folding AICS mags?"`). Watch it appear in the queue; observe simulated attendee questions arriving automatically. Upvote an existing question.
     - **Polls Tab**: Vote on an active poll (`"Which optic reticle do you prefer?"`). Watch the live result bar smoothly animate to reflect the vote percentage.

4. **ADMIN CONTROL ROOM & LOTTERY DRAW (`/admin`) [2:00 - 2:40]**
   - Click **"Control Room"** in the navigation bar.
   - Demonstrate the **Demo Mode** toggle in the header.
   - Click **"Live Broadcast Room"** in the left sidebar:
     - Click **"Draw 1 Winner Now"** or click **"Provably Fair Draws"**.
     - Watch the on-screen slot machine reel spin rapidly through eligible ticket numbers, slow down, and lock onto the winning seat with a gold winner card!
     - Click **"Verify This Draw"**: watch the system re-run the deterministic Mulberry32 PRNG against the SHA-256 hash to confirm a 100% mathematical match.
     - Click **"Export Audit CSV"**: downloads an authentic CSV log with webinar ID, seed, hash, winning seat, and timestamp.
   - Navigate to **"Webinars & Seat Specs"**:
     - Open the Webinar Builder.
     - Move the **Total Seats slider** between 21 and 100 and show how the seat grid preview updates dynamically in real time.
     - Add a custom spec field (demonstrating the 15-field cap and image upload flag).
   - Navigate to **"Email Dispatches"**:
     - Preview the 4 branded email templates (Magic Passcode, 1h Reminder, Replay Ready, and Winner Notification) with DKIM/SPF badges.
   - Navigate to **"Audience Analytics"**:
     - Show the interactive Recharts charts showing attendee growth and weapon category breakdown.

5. **SESSION REPLAY (`/replays`) [2:40 - 3:00]**
   - Click **"Replays"** in the top nav.
   - Open any past completed webinar.
   - Showcase the **interactive chapter markers** (`Chassis Inspection`, `Sub-MOA Test`, `Audience Q&A`, `Winner Draw`), demonstrating that replays are archived for 30 days and available in under 5 minutes.
