import { Webinar, QAQuestion, Poll, DrawRecord, Attendee, WinnerNotificationItem } from '../types';

export const INITIAL_WEBINARS: Webinar[] = [
  // 1. LIVE NOW
  {
    id: 'webinar-live-01',
    title: 'STRIKE-X 300 WIN MAG PRECISION SYSTEM',
    subtitle: 'Chassis Sniper System with Monolithic Rail & Nightforce ATACR 7-35x56',
    category: 'rifle',
    status: 'live',
    pricePerSeat: 35,
    totalSeats: 65,
    soldSeats: 61,
    claimedSeatNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61],
    scheduledFor: '2026-10-21T09:00:00Z',
    liveStreamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1',
    replayUrl: '',
    replayDuration: '48:15',
    viewers: 284,
    chapters: [
      { title: 'Chassis Architecture & Barrel Specs', time: '00:00', seconds: 0 },
      { title: 'Sub-MOA Ballistic Grouping Test', time: '14:20', seconds: 860 },
      { title: 'Live Chat Q&A & Optic Teardown', time: '29:45', seconds: 1785 },
      { title: 'Verifiable On-Air Winner Draw', time: '41:10', seconds: 2470 }
    ],
    images: [
      'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584281729288-8974533d67b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      { id: 's1', key: 'Manufacturer', value: 'Sentinel Precision Armory' },
      { id: 's2', key: 'Model', value: 'Strike-X Mod 4 Tactical' },
      { id: 's3', key: 'Caliber', value: '.300 Winchester Magnum' },
      { id: 's4', key: 'Action', value: '60-Degree Short Throw Bolt Action' },
      { id: 's5', key: 'Barrel Length', value: '26" Match Grade Bartlein Fluted' },
      { id: 's6', key: 'Twist Rate', value: '1:10 Right Hand' },
      { id: 's7', key: 'Trigger', value: 'Geissele Super 700 Two-Stage (1.5 - 2.5 lbs)' },
      { id: 's8', key: 'Optic Included', value: 'Nightforce ATACR 7-35x56 F1 Mil-XT' },
      { id: 's9', key: 'Mount', value: 'Spuhr QDP 34mm Unimount QD' },
      { id: 's10', key: 'Muzzle Device', value: 'Area 419 Hellfire 3-Port Self-Timing Brake' },
      { id: 's11', key: 'Chassis Finish', value: 'Mil-Spec Graphite Black Cerakote H-146' },
      { id: 's12', key: 'Magazine Capacity', value: '5-Round AICS Metal Detachable (x3)' },
      { id: 's13', key: 'MSRP Bundle Value', value: '$7,850.00 USD' },
      { id: 's14', key: 'Condition', value: 'Factory Brand New in Hard Vault' },
      { id: 's15', key: 'Chassis Blueprint View', value: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=800&q=80', isImage: true }
    ],
    description: 'A no-compromises long-range precision package. The Strike-X 300 Win Mag is engineered around a trued 416R stainless receiver, married to a full CNC aerospace-alloy folding chassis with integral Arca-Swiss rail. Paired with premier glass and zeroed at 100 meters.',
    featured: true
  },

  // 2. UPCOMING - NEARLY SOLD OUT (URGENT)
  {
    id: 'webinar-up-01',
    title: 'VALKYRIE 9MM TITANIUM COMPENSATED EDC',
    subtitle: 'Limited Run 2011 Double-Stack with Trijicon RMR HD & Streamlight TLR-7HLX',
    category: 'pistol',
    status: 'upcoming',
    pricePerSeat: 28,
    totalSeats: 48,
    soldSeats: 45, // Only 3 left!
    claimedSeatNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    scheduledFor: '2026-10-22T19:00:00Z',
    liveStreamUrl: '',
    replayUrl: '',
    replayDuration: '40:00',
    chapters: [
      { title: 'Slide Cut Engineering & Porting', time: '00:00', seconds: 0 },
      { title: 'High-Speed Cycling & Recoil Reduction', time: '12:00', seconds: 720 },
      { title: 'Optic Co-Witness Demonstration', time: '24:00', seconds: 1440 },
      { title: 'Seeded Draw Ceremony', time: '35:00', seconds: 2100 }
    ],
    images: [
      'https://images.unsplash.com/photo-1585589074465-950c406b2ef9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      { id: 'v1', key: 'Platform', value: 'Custom 2011 Double-Stack 9x19mm' },
      { id: 'v2', key: 'Frame', value: '7075-T6 Billet Aluminum with Aggressive Micro-Texture' },
      { id: 'v3', key: 'Slide Finish', value: 'DLC Diamond-Like Carbon Matte Black' },
      { id: 'v4', key: 'Barrel', value: '4.25" Match Bull Barrel with Integrated Island Compensator' },
      { id: 'v5', key: 'Trigger Pull', value: '2.25 lbs Crisp Flat-Face Aluminum' },
      { id: 'v6', key: 'Optic System', value: 'Trijicon RMR HD 3.25 MOA Micro Red Dot' },
      { id: 'v7', key: 'Weapon Light', value: 'Streamlight TLR-7 HL-X 1000 Lumens' },
      { id: 'v8', key: 'Magazines', value: 'Two 17-Round & Two 20-Round Teflon-Coated Mags' },
      { id: 'v9', key: 'Holster', value: 'Handmade Kydex Level II Carbon Concealment Holster' },
      { id: 'v10', key: 'MSRP', value: '$3,995.00 USD' },
      { id: 'v11', key: 'Slide Profile Photo', value: 'https://images.unsplash.com/photo-1585589074465-950c406b2ef9?auto=format&fit=crop&w=800&q=80', isImage: true }
    ],
    description: 'Precision machined tolerance down to 0.0005 inches. The Valkyrie 9mm delivers flat-shooting performance in a concealable profile. Features island compensator geometry that eliminates muzzle flip while keeping the front sight stationary.',
    featured: true
  },

  // 3. UPCOMING - MID FILL
  {
    id: 'webinar-up-02',
    title: 'SPECTRE TACTICAL 12-GAUGE SEMI-AUTO',
    subtitle: 'Dual-Piston Combat Breacher with Holosun 507Comp & Magpul Stock',
    category: 'shotgun',
    status: 'upcoming',
    pricePerSeat: 22,
    totalSeats: 52,
    soldSeats: 29,
    claimedSeatNumbers: [1, 3, 5, 7, 8, 11, 12, 14, 15, 18, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 37, 38, 40, 42, 44, 46, 49, 51],
    scheduledFor: '2026-10-24T21:00:00Z',
    liveStreamUrl: '',
    replayUrl: '',
    replayDuration: '35:00',
    chapters: [
      { title: 'Gas System Teardown & Slug Testing', time: '00:00', seconds: 0 },
      { title: 'Rapid Fire Buckshot Patterning at 25yd', time: '11:00', seconds: 660 },
      { title: 'Live Audience Q&A', time: '22:00', seconds: 1320 },
      { title: 'Draw Execution', time: '30:00', seconds: 1800 }
    ],
    images: [
      'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      { id: 'sp1', key: 'Action', value: 'Short-Stroke Inertia/Dual Piston Driven' },
      { id: 'sp2', key: 'Chamber', value: '12 Gauge, 3-Inch Magnum' },
      { id: 'sp3', key: 'Barrel Length', value: '18.5" Heavy Fluted Cold Hammer Forged' },
      { id: 'sp4', key: 'Capacity', value: '7+1 Extended Carbon Fiber Tube' },
      { id: 'sp5', key: 'Sights', value: 'Ghost Ring Tritium Night Sights + Top Picatinny' },
      { id: 'sp6', key: 'Optic Mounted', value: 'Holosun 507Comp Red Dot Sight' },
      { id: 'sp7', key: 'Stock', value: 'Magpul SGA with Custom Limbsaver Recoil Pad' },
      { id: 'sp8', key: 'Breaching Choke', value: 'Stiletto Stand-Off Door Breacher' },
      { id: 'sp9', key: 'Value', value: '$2,450.00 USD' },
      { id: 'sp10', key: 'Barrel Close-Up', value: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=800&q=80', isImage: true }
    ],
    description: 'Engineered for absolute reliability with both low-recoil tactical loads and 3" magnum buckshot. Featuring enhanced controls, oversized charging handle, and flared loading port.',
    featured: false
  },

  // 4. UPCOMING - EARLY STAGE (LOW SEATS FOR VARIETY: 24 total)
  {
    id: 'webinar-up-03',
    title: 'BLACKOUT 5,000-RD BULK CASE .300 BLK & RANGE CRATE',
    subtitle: '220gr Subsonic Match Grade Ammo in Military Weatherproof Hardcase',
    category: 'ammo',
    status: 'upcoming',
    pricePerSeat: 15,
    totalSeats: 36,
    soldSeats: 12,
    claimedSeatNumbers: [2, 4, 6, 8, 10, 14, 16, 20, 22, 26, 30, 34],
    scheduledFor: '2026-10-26T18:00:00Z',
    liveStreamUrl: '',
    replayUrl: '',
    replayDuration: '30:00',
    chapters: [
      { title: 'Subsonic Decibel Test & Suppressor Pairing', time: '00:00', seconds: 0 },
      { title: 'Chronograph Velocity Consistency', time: '10:00', seconds: 600 },
      { title: 'Live Chat Q&A', time: '19:00', seconds: 1140 },
      { title: 'Live Winner Pick', time: '26:00', seconds: 1560 }
    ],
    images: [
      'https://images.unsplash.com/photo-1584281729288-8974533d67b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      { id: 'am1', key: 'Caliber', value: '.300 AAC Blackout' },
      { id: 'am2', key: 'Bullet Weight', value: '220 Grain Open Tip Match Subsonic' },
      { id: 'am3', key: 'Muzzle Velocity', value: '1,050 fps (from 9" barrel)' },
      { id: 'am4', key: 'Casings', value: 'Factory Virgin Annealed Brass, Reloadable' },
      { id: 'am5', key: 'Total Round Count', value: '5,000 Rounds (100 boxes of 50)' },
      { id: 'am6', key: 'Storage Crate', value: 'Pelican 1650 Protector Case with Laser Cut Foam' },
      { id: 'am7', key: 'Primers', value: 'Non-Corrosive Boxer Primed' },
      { id: 'am8', key: 'Estimated Value', value: '$3,800.00 USD' },
      { id: 'am9', key: 'Bulk Pallet View', value: 'https://images.unsplash.com/photo-1584281729288-8974533d67b1?auto=format&fit=crop&w=800&q=80', isImage: true }
    ],
    description: 'The ultimate range crate for suppressed shooters. Premium factory-new 220gr OTM engineered to group under 1 MOA at 100 meters while remaining whisper quiet through standard baffles.',
    featured: false
  },

  // 5. REPLAY - FULLY SOLD OUT
  {
    id: 'webinar-rep-01',
    title: 'TITAN THERMAL MONOCULAR & HELMET SUITE',
    subtitle: '640x512 12µm 50Hz Thermal Imaging System with Wilcox G24 Mount & Team Wendy Carbon',
    category: 'accessories',
    status: 'replay',
    pricePerSeat: 40,
    totalSeats: 70,
    soldSeats: 70,
    claimedSeatNumbers: Array.from({ length: 70 }, (_, i) => i + 1),
    scheduledFor: '2026-10-18T20:00:00Z',
    liveStreamUrl: '',
    replayUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    replayDuration: '52:40',
    winnerSeats: [42],
    winnerEmails: ['v***r@titandefense.org'],
    drawSeed: '1729281600124-webinar-rep-01',
    drawHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    drawTimestamp: '2026-10-18T20:51:14Z',
    operator: 'Operator Miller (Lead Armorer)',
    chapters: [
      { title: 'Thermal Sensor Sensitivity & Palette Modes', time: '00:00', seconds: 0 },
      { title: 'Distance Target Detection up to 1800m', time: '16:30', seconds: 990 },
      { title: 'Live Audience Thermal Q&A', time: '34:10', seconds: 2050 },
      { title: 'Winner Draw Broadcast & Hash Verification', time: '48:00', seconds: 2880 }
    ],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      { id: 'th1', key: 'Sensor Resolution', value: '640x512 VOx Uncooled Microbolometer' },
      { id: 'th2', key: 'Pixel Pitch', value: '12 Micron' },
      { id: 'th3', key: 'Refresh Rate', value: '50 Hz Smooth Tracking' },
      { id: 'th4', key: 'NETD Sensitivity', value: '< 25 mK Ultra Clear' },
      { id: 'th5', key: 'Lens', value: '35mm F1.0 Germanium Optical Glass' },
      { id: 'th6', key: 'Detection Range', value: '1,800 Meters Human Silhouette' },
      { id: 'th7', key: 'Helmet System', value: 'Team Wendy EXFIL Carbon Size 2' },
      { id: 'th8', key: 'Mount Arm', value: 'Wilcox L4 G24 Breakaway Arm' },
      { id: 'th9', key: 'Package MSRP', value: '$6,490.00 USD' },
      { id: 'th10', key: 'Thermal HUD Preview', value: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', isImage: true }
    ],
    description: 'The pinnacle of night vision technology. Crystal-clear thermography that cuts through total darkness, fog, and dense foliage without active IR illumination.',
    featured: true
  },

  // 6. REPLAY - COMPACT SEATS (21 SEATS)
  {
    id: 'webinar-rep-02',
    title: 'GHOST COMBAT 9MM SUB-COMPACT SILENT EDITION',
    subtitle: 'Integrated Silencer Barrel with Stealth Carbon Sights & Holster',
    category: 'pistol',
    status: 'replay',
    pricePerSeat: 32,
    totalSeats: 21,
    soldSeats: 21,
    claimedSeatNumbers: Array.from({ length: 21 }, (_, i) => i + 1),
    scheduledFor: '2026-10-15T18:30:00Z',
    liveStreamUrl: '',
    replayUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    replayDuration: '38:10',
    winnerSeats: [7],
    winnerEmails: ['k***9@apexmail.com'],
    drawSeed: '1729017000452-webinar-rep-02',
    drawHash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    drawTimestamp: '2026-10-15T19:07:22Z',
    operator: 'Operator Miller (Lead Armorer)',
    chapters: [
      { title: 'Sub-Compact Ergonomics', time: '00:00', seconds: 0 },
      { title: 'Suppressed Sound Meter Testing', time: '14:15', seconds: 855 },
      { title: 'Interactive Member Q&A', time: '26:00', seconds: 1560 },
      { title: 'Seat #7 Selected on Air', time: '34:40', seconds: 2080 }
    ],
    images: [
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      { id: 'g1', key: 'Platform', value: 'Micro Striker-Fired 9mm' },
      { id: 'g2', key: 'Barrel', value: '3.6" Threaded + Internal Micro Suppressor' },
      { id: 'g3', key: 'Trigger', value: 'Overwatch Precision TAC Flat Face' },
      { id: 'g4', key: 'Capacity', value: '12+1 Flush / 15+1 Extended' },
      { id: 'g5', key: 'Frame', value: 'Cerakote Tungsten Grey Stippled' },
      { id: 'g6', key: 'Sights', value: 'Suppressor-Height Night Fision Tritium' },
      { id: 'g7', key: 'MSRP', value: '$1,850.00 USD' },
      { id: 'g8', key: 'Exploded View', value: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80', isImage: true }
    ],
    description: 'Precision covert platform engineered for discreet protection. Comes complete with custom fitted leather kydex hybrid rig and three high-capacity mags.',
    featured: false
  },

  // 7. REPLAY - RIFLE
  {
    id: 'webinar-rep-03',
    title: 'OPERATOR 5.56 RECCE CARBINE & VORTEX RAZOR 1-10X',
    subtitle: 'Direct Impingement 14.5" Pin & Weld with Geissele SSA-E & Surefire RC2 Suppressor',
    category: 'rifle',
    status: 'replay',
    pricePerSeat: 30,
    totalSeats: 60,
    soldSeats: 60,
    claimedSeatNumbers: Array.from({ length: 60 }, (_, i) => i + 1),
    scheduledFor: '2026-10-12T19:00:00Z',
    liveStreamUrl: '',
    replayUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    replayDuration: '44:20',
    winnerSeats: [23],
    winnerEmails: ['s***x@recongear.net'],
    drawSeed: '1728759600881-webinar-rep-03',
    drawHash: 'c4e339a9c680f4f9f7c00e1215b2e93540b904996fb92427ae41e4649b934ca4',
    drawTimestamp: '2026-10-12T19:42:09Z',
    operator: 'Operator Vance (Chief Range Master)',
    chapters: [
      { title: 'Recce Philosophy & Gas Port Sizing', time: '00:00', seconds: 0 },
      { title: 'Speed Drill: 50yd to 400yd Transitions', time: '15:10', seconds: 910 },
      { title: 'LPVO Glass Clarity & Reticle Demo', time: '28:30', seconds: 1710 },
      { title: 'Lottery Draw for Seat 23', time: '39:50', seconds: 2390 }
    ],
    images: [
      'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      { id: 'rc1', key: 'Barrel', value: '14.5" Chrome-Lined Cold Hammer Forged 1:7' },
      { id: 'rc2', key: 'Gas System', value: 'Mid-Length Tuned with Superlative Arms Bleed-Off' },
      { id: 'rc3', key: 'Muzzle', value: 'Surefire 4-Prong Flash Hider Pinned & Welded' },
      { id: 'rc4', key: 'Optic', value: 'Vortex Razor HD Gen III 1-10x24 FFP EBR-9' },
      { id: 'rc5', key: 'Trigger', value: 'Geissele SSA-E Two-Stage (3.5 lbs)' },
      { id: 'rc6', key: 'Total MSRP', value: '$4,800.00 USD' },
      { id: 'rc7', key: 'Action Assembly', value: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=800&q=80', isImage: true }
    ],
    description: 'The definitive all-purpose carbine build. Optimized for precision engagement from close contact out to 600 meters with full 1-10x magnification.',
    featured: false
  },

  // 8. REPLAY - AMMO (79 SEATS)
  {
    id: 'webinar-rep-04',
    title: '10,000-ROUND 9MM 124GR NATO RUNNER CASE',
    subtitle: 'Sealed Military Steel Ammo Vault with Sealed Moisture Inhibitors',
    category: 'ammo',
    status: 'replay',
    pricePerSeat: 18,
    totalSeats: 79,
    soldSeats: 79,
    claimedSeatNumbers: Array.from({ length: 79 }, (_, i) => i + 1),
    scheduledFor: '2026-10-08T18:00:00Z',
    liveStreamUrl: '',
    replayUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    replayDuration: '33:15',
    winnerSeats: [58],
    winnerEmails: ['t***r@tacticalops.com'],
    drawSeed: '1728410400199-webinar-rep-04',
    drawHash: '356a192b7913b04c54574d18c28d46e6395428ab837f8f01b1a774a38cb918bf',
    drawTimestamp: '2026-10-08T18:31:40Z',
    operator: 'Operator Vance (Chief Range Master)',
    chapters: [
      { title: 'Lot Packaging Inspection', time: '00:00', seconds: 0 },
      { title: 'Chrono & Primer Hardness Review', time: '12:00', seconds: 720 },
      { title: 'Seat 58 Winning Reel', time: '29:00', seconds: 1740 }
    ],
    images: [
      'https://images.unsplash.com/photo-1584281729288-8974533d67b1?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      { id: 'a1', key: 'Caliber', value: '9x19mm Parabellum' },
      { id: 'a2', key: 'Bullet Type', value: '124 Grain Full Metal Jacket NATO Spec' },
      { id: 'a3', key: 'Muzzle Velocity', value: '1,180 fps' },
      { id: 'a4', key: 'Casing', value: 'Sealed Primer Boxer Annealed Brass' },
      { id: 'a5', key: 'Total Value', value: '$3,100.00 USD' },
      { id: 'a6', key: 'Crate Layout', value: 'https://images.unsplash.com/photo-1584281729288-8974533d67b1?auto=format&fit=crop&w=800&q=80', isImage: true }
    ],
    description: 'High pressure military spec 9mm ammunition manufactured for rigorous duty cycling and clean powder burn.',
    featured: false
  },

  // 9. REPLAY - SHOTGUN
  {
    id: 'webinar-rep-05',
    title: 'BENELLI M4 TACTICAL MULTI-CAM CUSTOM',
    subtitle: 'M-LOK Handguard, Scalarworks Sync Mount & Trijicon SRO 5.0 MOA',
    category: 'shotgun',
    status: 'replay',
    pricePerSeat: 34,
    totalSeats: 50,
    soldSeats: 50,
    claimedSeatNumbers: Array.from({ length: 50 }, (_, i) => i + 1),
    scheduledFor: '2026-10-04T20:00:00Z',
    liveStreamUrl: '',
    replayUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    replayDuration: '46:00',
    winnerSeats: [19],
    winnerEmails: ['m***7@firearmclub.org'],
    drawSeed: '1728072000621-webinar-rep-05',
    drawHash: 'da4b9237bacccdf19c0760cab7aec4a8359010b0e3b0c44298fc1c149afbf4c8',
    drawTimestamp: '2026-10-04T20:44:11Z',
    operator: 'Operator Miller (Lead Armorer)',
    chapters: [
      { title: 'ARGO Dual-Gas System Teardown', time: '00:00', seconds: 0 },
      { title: 'Patterning 00 Buck at 15m & 30m', time: '16:00', seconds: 960 },
      { title: 'Live Draw of Winning Seat 19', time: '41:00', seconds: 2460 }
    ],
    images: [
      'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      { id: 'b1', key: 'Model', value: 'Benelli M4 H2O / ARGO System' },
      { id: 'b2', key: 'Gauge', value: '12 Gauge 2-3/4" & 3"' },
      { id: 'b3', key: 'Finish', value: 'Cerakote MultiCam Black Hydro-Dip' },
      { id: 'b4', key: 'Optic', value: 'Trijicon SRO 5.0 MOA Red Dot' },
      { id: 'b5', key: 'Value', value: '$3,650.00 USD' },
      { id: 'b6', key: 'Receiver Close-up', value: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=800&q=80', isImage: true }
    ],
    description: 'The combat shotgun standard for US military forces, enhanced with premier optic integration and specialized controls.',
    featured: false
  },

  // 10. REPLAY - ACCESSORIES (100 SEATS)
  {
    id: 'webinar-rep-06',
    title: 'SENTINEL FULL ARMORY RECON LOADOUT',
    subtitle: 'Plate Carrier, Level IV Ceramics, Ops-Core AMP Comms & Eberlestock Pack',
    category: 'accessories',
    status: 'replay',
    pricePerSeat: 25,
    totalSeats: 100,
    soldSeats: 100,
    claimedSeatNumbers: Array.from({ length: 100 }, (_, i) => i + 1),
    scheduledFor: '2026-09-29T19:30:00Z',
    liveStreamUrl: '',
    replayUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    replayDuration: '50:30',
    winnerSeats: [88],
    winnerEmails: ['r***d@reconops.io'],
    drawSeed: '1727638200334-webinar-rep-06',
    drawHash: 'b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78',
    drawTimestamp: '2026-09-29T20:18:50Z',
    operator: 'Operator Miller (Lead Armorer)',
    chapters: [
      { title: 'Level IV Ballistic Plate Drop & Hit Test', time: '00:00', seconds: 0 },
      { title: 'Comms Pairing & Active Hearing Demonstration', time: '18:00', seconds: 1080 },
      { title: '100 Seat Reel Spin & Winner #88 Announcement', time: '45:00', seconds: 2700 }
    ],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      { id: 'acc1', key: 'Armor Plates', value: 'Level IV Standalone Ceramic/Polyethylene (Front & Back)' },
      { id: 'acc2', key: 'Carrier', value: 'Crye Precision JPC 2.0 Ranger Green' },
      { id: 'acc3', key: 'Comms Headset', value: 'Ops-Core AMP Tactical Comms with NFMI Earplugs' },
      { id: 'acc4', key: 'Backpack', value: 'Eberlestock Halftrack 35L 1000D Cordura' },
      { id: 'acc5', key: 'MSRP', value: '$4,200.00 USD' },
      { id: 'acc6', key: 'Modular Layout', value: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', isImage: true }
    ],
    description: 'Complete elite individual protection and reconnaissance gear suite built for extreme field environments.',
    featured: false
  }
];

export const INITIAL_QA_QUESTIONS: QAQuestion[] = [
  {
    id: 'qa-1',
    webinarId: 'webinar-live-01',
    userEmail: 'j***n@tacticaledge.com',
    question: 'Does this Strike-X chassis accept standard AICS 10-round steel magazines without modification?',
    upvotes: 38,
    answered: true,
    isPinned: true,
    timestamp: '12m ago'
  },
  {
    id: 'qa-2',
    webinarId: 'webinar-live-01',
    userEmail: 'c***r@precisionrange.net',
    question: 'What ammo load gave you the 0.32 MOA 5-shot grouping shown in the warm-up segment?',
    upvotes: 27,
    answered: true,
    isPinned: false,
    timestamp: '9m ago'
  },
  {
    id: 'qa-3',
    webinarId: 'webinar-live-01',
    userEmail: 'd***k@sentinelfan.org',
    question: 'How fast does the FFL transfer take once the draw concludes tonight?',
    upvotes: 21,
    answered: false,
    isPinned: false,
    timestamp: '6m ago'
  },
  {
    id: 'qa-4',
    webinarId: 'webinar-live-01',
    userEmail: 'b***t@ballisticslab.com',
    question: 'Can the Spuhr mount accommodate an auxiliary micro red dot at 12 o\'clock?',
    upvotes: 15,
    answered: false,
    isPinned: false,
    timestamp: '4m ago'
  },
  {
    id: 'qa-5',
    webinarId: 'webinar-live-01',
    userEmail: 'a***m@snipervault.com',
    question: 'Is the Area 419 muzzle brake compatible with standard 5/8x24 suppressor hubs?',
    upvotes: 11,
    answered: false,
    isPinned: false,
    timestamp: '2m ago'
  },
  {
    id: 'qa-6',
    webinarId: 'webinar-live-01',
    userEmail: 'h***r@mountainops.net',
    question: 'Will the winner receive the certified test target with serial number signature?',
    upvotes: 8,
    answered: false,
    isPinned: false,
    timestamp: '1m ago'
  }
];

export const SIMULATED_INCOMING_QUESTIONS = [
  'What is the overall length with the stock folded for transport in a flight case?',
  'Does the Nightforce scope come with the manufacturer lifetime transferable warranty?',
  'Can I change my nominated local FFL dealer after winning?',
  'Is the bolt fluting purely aesthetic or does it help reduce weight and friction in dusty ranges?',
  'What torque specs do you recommend for the chassis action screws?'
];

export const INITIAL_POLLS: Poll[] = [
  {
    id: 'poll-1',
    webinarId: 'webinar-live-01',
    question: 'Which optic reticle do you prefer for 1,000+ yard competitive steel shooting?',
    active: true,
    totalVotes: 194,
    options: [
      { id: 'opt-1', text: 'Mil-XT Christmas Tree (As equipped)', votes: 118 },
      { id: 'opt-2', text: 'Tremor3 Horus Grid', votes: 46 },
      { id: 'opt-3', text: 'MOAR Traditional Hashmarks', votes: 30 }
    ]
  },
  {
    id: 'poll-2',
    webinarId: 'webinar-live-01',
    question: 'What category would you like featured in next Thursday\'s member broadcast?',
    active: false,
    totalVotes: 242,
    options: [
      { id: 'opt-2a', text: 'Custom 2011 Staccato Style 9mm', votes: 104 },
      { id: 'opt-2b', text: 'Thermal Monocular / Night Vision Kit', votes: 89 },
      { id: 'opt-2c', text: '10,000 Round Match Ammo Vault', votes: 49 }
    ]
  }
];

export const INITIAL_DRAWS: DrawRecord[] = [
  {
    id: 'draw-01',
    webinarId: 'webinar-rep-01',
    webinarTitle: 'TITAN THERMAL MONOCULAR & HELMET SUITE',
    seed: '1729281600124-webinar-rep-01',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    timestamp: '2026-10-18T20:51:14Z',
    totalEligible: 70,
    winnerSeats: [42],
    winnerEmails: ['v***r@titandefense.org'],
    operator: 'Operator Miller (Lead Armorer)'
  },
  {
    id: 'draw-02',
    webinarId: 'webinar-rep-02',
    webinarTitle: 'GHOST COMBAT 9MM SUB-COMPACT SILENT EDITION',
    seed: '1729017000452-webinar-rep-02',
    hash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    timestamp: '2026-10-15T19:07:22Z',
    totalEligible: 21,
    winnerSeats: [7],
    winnerEmails: ['k***9@apexmail.com'],
    operator: 'Operator Miller (Lead Armorer)'
  },
  {
    id: 'draw-03',
    webinarId: 'webinar-rep-03',
    webinarTitle: 'OPERATOR 5.56 RECCE CARBINE & VORTEX RAZOR 1-10X',
    seed: '1728759600881-webinar-rep-03',
    hash: 'c4e339a9c680f4f9f7c00e1215b2e93540b904996fb92427ae41e4649b934ca4',
    timestamp: '2026-10-12T19:42:09Z',
    totalEligible: 60,
    winnerSeats: [23],
    winnerEmails: ['s***x@recongear.net'],
    operator: 'Operator Vance (Chief Range Master)'
  },
  {
    id: 'draw-04',
    webinarId: 'webinar-rep-04',
    webinarTitle: '10,000-ROUND 9MM 124GR NATO RUNNER CASE',
    seed: '1728410400199-webinar-rep-04',
    hash: '356a192b7913b04c54574d18c28d46e6395428ab837f8f01b1a774a38cb918bf',
    timestamp: '2026-10-08T18:31:40Z',
    totalEligible: 79,
    winnerSeats: [58],
    winnerEmails: ['t***r@tacticalops.com'],
    operator: 'Operator Vance (Chief Range Master)'
  },
  {
    id: 'draw-05',
    webinarId: 'webinar-rep-05',
    webinarTitle: 'BENELLI M4 TACTICAL MULTI-CAM CUSTOM',
    seed: '1728072000621-webinar-rep-05',
    hash: 'da4b9237bacccdf19c0760cab7aec4a8359010b0e3b0c44298fc1c149afbf4c8',
    timestamp: '2026-10-04T20:44:11Z',
    totalEligible: 50,
    winnerSeats: [19],
    winnerEmails: ['m***7@firearmclub.org'],
    operator: 'Operator Miller (Lead Armorer)'
  },
  {
    id: 'draw-06',
    webinarId: 'webinar-rep-06',
    webinarTitle: 'SENTINEL FULL ARMORY RECON LOADOUT',
    seed: '1727638200334-webinar-rep-06',
    hash: 'b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78',
    timestamp: '2026-09-29T20:18:50Z',
    totalEligible: 100,
    winnerSeats: [88],
    winnerEmails: ['r***d@reconops.io'],
    operator: 'Operator Miller (Lead Armorer)'
  },
  {
    id: 'draw-07',
    webinarId: 'webinar-old-01',
    webinarTitle: 'TRIJICON ACOG 4X32 & RMR PIGGYBACK COMBO',
    seed: '1727119200412-webinar-old-01',
    hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    timestamp: '2026-09-23T19:15:00Z',
    totalEligible: 45,
    winnerSeats: [14],
    winnerEmails: ['e***s@milrange.com'],
    operator: 'Operator Vance (Chief Range Master)'
  },
  {
    id: 'draw-08',
    webinarId: 'webinar-old-02',
    webinarTitle: 'COLT PYTHON .357 MAGNUM 6" ROYAL BLUE',
    seed: '1726773600982-webinar-old-02',
    hash: '4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd865',
    timestamp: '2026-09-19T20:30:00Z',
    totalEligible: 55,
    winnerSeats: [31],
    winnerEmails: ['w***m@customheritage.net'],
    operator: 'Operator Miller (Lead Armorer)'
  }
];

export const INITIAL_WINNERS: WinnerNotificationItem[] = [
  {
    id: 'w-1',
    webinarTitle: 'STRIKE-X 300 WIN MAG PRECISION SYSTEM',
    seatNumber: 17,
    maskedEmail: 'c***e@sentinelhq.com',
    claimedAt: 'Yesterday',
    drawDate: 'Scheduled Today',
    prizeValue: '$7,850'
  },
  {
    id: 'w-2',
    webinarTitle: 'TITAN THERMAL MONOCULAR & HELMET SUITE',
    seatNumber: 42,
    maskedEmail: 'v***r@titandefense.org',
    claimedAt: '3 days ago',
    drawDate: 'Oct 18, 2026',
    prizeValue: '$6,490'
  },
  {
    id: 'w-3',
    webinarTitle: 'GHOST COMBAT 9MM SUB-COMPACT',
    seatNumber: 7,
    maskedEmail: 'k***9@apexmail.com',
    claimedAt: '6 days ago',
    drawDate: 'Oct 15, 2026',
    prizeValue: '$1,850'
  },
  {
    id: 'w-4',
    webinarTitle: 'OPERATOR 5.56 RECCE CARBINE & RAZOR',
    seatNumber: 23,
    maskedEmail: 's***x@recongear.net',
    claimedAt: '9 days ago',
    drawDate: 'Oct 12, 2026',
    prizeValue: '$4,800'
  },
  {
    id: 'w-5',
    webinarTitle: '10,000-ROUND 9MM 124GR NATO RUNNER CASE',
    seatNumber: 58,
    maskedEmail: 't***r@tacticalops.com',
    claimedAt: '13 days ago',
    drawDate: 'Oct 08, 2026',
    prizeValue: '$3,100'
  },
  {
    id: 'w-6',
    webinarTitle: 'BENELLI M4 TACTICAL MULTI-CAM CUSTOM',
    seatNumber: 19,
    maskedEmail: 'm***7@firearmclub.org',
    claimedAt: '17 days ago',
    drawDate: 'Oct 04, 2026',
    prizeValue: '$3,650'
  }
];

export const INITIAL_ATTENDEES: Attendee[] = [
  { id: 'att-1', email: 'j***n@tacticaledge.com', seatsCount: 3, attended: true, engagementScore: 98, webinarTitle: 'STRIKE-X 300 WIN MAG PRECISION SYSTEM', lastActive: '2m ago' },
  { id: 'att-2', email: 'c***r@precisionrange.net', seatsCount: 2, attended: true, engagementScore: 94, webinarTitle: 'STRIKE-X 300 WIN MAG PRECISION SYSTEM', lastActive: '5m ago' },
  { id: 'att-3', email: 'd***k@sentinelfan.org', seatsCount: 5, attended: true, engagementScore: 89, webinarTitle: 'STRIKE-X 300 WIN MAG PRECISION SYSTEM', lastActive: '1m ago' },
  { id: 'att-4', email: 'b***t@ballisticslab.com', seatsCount: 1, attended: true, engagementScore: 85, webinarTitle: 'STRIKE-X 300 WIN MAG PRECISION SYSTEM', lastActive: '7m ago' },
  { id: 'att-5', email: 'a***m@snipervault.com', seatsCount: 4, attended: true, engagementScore: 92, webinarTitle: 'STRIKE-X 300 WIN MAG PRECISION SYSTEM', lastActive: '3m ago' },
  { id: 'att-6', email: 'h***r@mountainops.net', seatsCount: 2, attended: true, engagementScore: 78, webinarTitle: 'STRIKE-X 300 WIN MAG PRECISION SYSTEM', lastActive: '8m ago' },
  { id: 'att-7', email: 'm***k@reconwest.com', seatsCount: 3, attended: false, engagementScore: 40, webinarTitle: 'VALKYRIE 9MM TITANIUM COMPENSATED EDC', lastActive: '1d ago' },
  { id: 'att-8', email: 's***p@badgerfirearms.org', seatsCount: 1, attended: false, engagementScore: 35, webinarTitle: 'VALKYRIE 9MM TITANIUM COMPENSATED EDC', lastActive: '2d ago' },
  { id: 'att-9', email: 'v***r@titandefense.org', seatsCount: 4, attended: true, engagementScore: 99, webinarTitle: 'TITAN THERMAL MONOCULAR & HELMET SUITE', lastActive: '3d ago' },
  { id: 'att-10', email: 'k***9@apexmail.com', seatsCount: 2, attended: true, engagementScore: 96, webinarTitle: 'GHOST COMBAT 9MM SUB-COMPACT SILENT EDITION', lastActive: '6d ago' },
  { id: 'att-11', email: 'l***e@triggertech.com', seatsCount: 3, attended: true, engagementScore: 91, webinarTitle: 'STRIKE-X 300 WIN MAG PRECISION SYSTEM', lastActive: '4m ago' },
  { id: 'att-12', email: 'p***w@covertgear.co', seatsCount: 1, attended: true, engagementScore: 84, webinarTitle: 'STRIKE-X 300 WIN MAG PRECISION SYSTEM', lastActive: '11m ago' }
];

export const INITIAL_ANALYTICS = {
  kpis: {
    totalRevenue: '$284,550',
    totalSeatsClaimed: '8,420',
    totalWebinarsConducted: '48',
    avgViewerAttendance: '91.4%',
    avgSeatFillRate: '98.2%',
    provablyFairDrawsRun: '48'
  },
  attendanceOverTime: [
    { date: 'Jun', attendees: 340, viewersPeak: 310, fillRate: 94 },
    { date: 'Jul', attendees: 480, viewersPeak: 450, fillRate: 96 },
    { date: 'Aug', attendees: 610, viewersPeak: 590, fillRate: 97 },
    { date: 'Sep', attendees: 780, viewersPeak: 740, fillRate: 98 },
    { date: 'Oct (MTD)', attendees: 920, viewersPeak: 890, fillRate: 99 }
  ],
  categoryBreakdown: [
    { name: 'Precision Rifles', seats: 3200, revenue: 112000 },
    { name: 'Custom Pistols', seats: 2400, revenue: 67200 },
    { name: 'Optics & Thermal', seats: 1600, revenue: 64000 },
    { name: 'Match Ammo Vaults', seats: 820, revenue: 24600 },
    { name: 'Tactical Shotguns', seats: 400, revenue: 16750 }
  ],
  engagementStats: [
    { hour: '18:00', viewers: 180, chatRate: 24 },
    { hour: '18:15', viewers: 240, chatRate: 45 },
    { hour: '18:30', viewers: 295, chatRate: 72 },
    { hour: '18:45 (Draw)', viewers: 360, chatRate: 110 },
    { hour: '19:00', viewers: 190, chatRate: 35 }
  ]
};

export const FAQ_ITEMS = [
  {
    q: 'How does the seat reservation and lottery model work?',
    a: 'Each webinar spotlights a single high-value tactical item. A strictly capped number of seats (e.g., 21 to 100) are offered at a fixed price per seat. Members claim one or more numbered seats using only their email. During the live stream, our armorers review the item in depth, conduct live Q&A, and run an automated, provably fair draw on air.'
  },
  {
    q: 'What makes the on-air lottery draw "Provably Fair"?',
    a: 'Before any draw begins, the platform commits to a cryptographic seed (UTC server timestamp + webinar identifier) and displays its SHA-256 hash publicly on screen. An auditable mulberry32 PRNG algorithm maps this seed to the pool of eligible seat numbers. Anyone can re-run the verification algorithm or export the cryptographic CSV log to confirm the draw was never pre-selected or altered.'
  },
  {
    q: 'Do I need to be present live during the broadcast to win?',
    a: 'No. While the live broadcast includes live polls, real-time Q&A, and high-adrenaline on-screen draws, your claimed seats are automatically entered into the draw. Winners receive an immediate high-priority email notification and their status is saved in their Member Account.'
  },
  {
    q: 'How does firearm fulfillment and shipping work?',
    a: 'All regulated firearms and serialized suppressors are shipped directly to a verified Federal Firearms Licensed (FFL) dealer of the winner\'s choice in full compliance with ATF guidelines and local state laws. Sentinel Live concierge coordinates background check verification with your local dealer at zero additional handling fee.'
  },
  {
    q: 'When are replays available if I miss the live broadcast?',
    a: 'Replays are processed and published to the exact same webinar URL within 5 minutes of the broadcast concluding. All interactive chapters (Item Review, Range Testing, Q&A, and Draw Ceremony) remain accessible for 30 days.'
  },
  {
    q: 'Can I purchase multiple seats for the same webinar?',
    a: 'Yes. You can select multiple available seats directly on the interactive seat grid before checking out. Each seat grants an independent chance in the final verified draw.'
  }
];
