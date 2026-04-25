import { useMemo } from 'react';
import { useGame } from '../context/GameContext';

export const useDailyRewards = () => {
  const game = useGame() || {};
  const daily = game.daily || { day: 1, claimedAt: null };

  const canClaim = useMemo(() => {
    const claimedAt = daily?.claimedAt || 0;
    return Date.now() - claimedAt >= 24 * 60 * 60 * 1000;
  }, [daily?.claimedAt]);

  return {
    daily,
    dailyRewards: game.dailyRewards || [],
    canClaim,
    claimDailyReward: game.claimDailyReward || (() => false),
  };
};
