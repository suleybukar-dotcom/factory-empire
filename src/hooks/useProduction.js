import { useMemo } from 'react';
import { useGame } from '../context/GameContext';

export const useProduction = () => {
  const game = useGame() || {};
  const machines = game.machines || {};

  const unlockedMachines = useMemo(
    () => Object.values(machines).filter((machine) => machine?.unlocked),
    [machines],
  );

  return {
    machines,
    unlockedMachines,
    collectMachine: game.collectMachine || (() => false),
    addResources: game.addResources || (() => undefined),
    getMachinesByStatus: game.getMachinesByStatus || (() => []),
  };
};
