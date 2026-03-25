import { differenceInMonths, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

export interface Score {
  id: string;
  user_id: string;
  score: number;
  date_played: Date;
  created_at: Date;
}

export interface Profile {
  id: string;
  subscription_status: string;
  handicap: number;
  current_charity_id: string | null;
}

/**
 * Calculates the rolling average of the latest 5 scores.
 */
export function calculateRollingAverage(scores: Score[]): number {
  if (!scores || scores.length === 0) return 0;
  
  // Sort by date descending and take top 5
  const latest5 = [...scores]
    .sort((a, b) => b.date_played.getTime() - a.date_played.getTime())
    .slice(0, 5);
    
  const sum = latest5.reduce((acc, current) => acc + current.score, 0);
  return Number((sum / latest5.length).toFixed(1));
}

/**
 * Determines a user's eligibility for the current month's draw.
 * Rules:
 * 1. Active subscription
 * 2. At least 2 scores submitted in the current month
 */
export function checkEligibility(profile: Profile, monthScores: Score[]): {
  eligible: boolean;
  reason: string;
  progress: number;
} {
  const REQUIRED_SCORES = 2;
  
  if (profile.subscription_status !== "active") {
    return { eligible: false, reason: "Subscription inactive", progress: 0 };
  }

  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());

  const currentMonthScores = monthScores.filter(s => 
    isWithinInterval(new Date(s.date_played), { start: currentMonthStart, end: currentMonthEnd })
  );

  const count = currentMonthScores.length;

  if (count < REQUIRED_SCORES) {
    return { 
      eligible: false, 
      reason: `${REQUIRED_SCORES - count} more scores needed for this month.`,
      progress: (count / REQUIRED_SCORES) * 100
    };
  }

  return { eligible: true, reason: "You are eligible for this month's draw!", progress: 100 };
}

/**
 * Selects a random winner from an array of eligible user IDs.
 */
export function performDraw(eligibleUserIds: string[]): string | null {
  if (eligibleUserIds.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * eligibleUserIds.length);
  return eligibleUserIds[randomIndex];
}

/**
 * Calculates the estimated charity contribution.
 * Rule: 20% of the £12.99 subscription fee.
 */
export function calculateImpact(monthsActive: number): number {
  const MONTHLY_SUB = 12.99;
  const CHARITY_PERCENT = 0.20;
  return Number((monthsActive * MONTHLY_SUB * CHARITY_PERCENT).toFixed(2));
}
