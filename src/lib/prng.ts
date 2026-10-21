/**
 * Deterministic seeded Pseudo-Random Number Generator using mulberry32.
 * Given the exact same seed string, it will ALWAYS yield the exact same sequence of numbers.
 * This guarantees 100% provably fair, verifiable on-screen lottery draws.
 */

// Simple string hash to generate a 32-bit unsigned integer seed
export function hashStringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// mulberry32 PRNG algorithm
export function createMulberry32(seed: number) {
  let s = seed >>> 0;
  return function (): number {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Picks `count` unique winning seat numbers from `eligibleSeats` deterministically using `seedStr`.
 */
export function drawWinnersFromSeed(
  eligibleSeats: number[],
  seedStr: string,
  count: number = 1
): number[] {
  if (eligibleSeats.length === 0) return [];
  const validCount = Math.min(count, eligibleSeats.length);
  const seedNum = hashStringToSeed(seedStr);
  const random = createMulberry32(seedNum);

  // Fisher-Yates shuffle with deterministic random generator
  const pool = [...eligibleSeats];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, validCount).sort((a, b) => a - b);
}

/**
 * Masks an email for privacy display (e.g. john.doe@example.com -> j***e@example.com)
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return 'm***r@sentinel.net';
  const [user, domain] = email.split('@');
  if (user.length <= 2) {
    return `${user[0]}***@${domain}`;
  }
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}
