import { useGame } from '../context/GameContext';

export const useMissions = () => {
  const game = useGame() || {};

  return {
    missions: game.missions || [],
    progress: game.missionsProgress || {},
    claims: game.missionClaims || {},
    claimMission: game.claimMission || (() => false),
  };
};
