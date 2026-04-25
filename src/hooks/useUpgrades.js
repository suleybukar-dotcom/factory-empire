import { useGame } from '../context/GameContext';

export const useUpgrades = () => {
  const game = useGame() || {};

  return {
    coins: game.coins || 0,
    machines: game.machines || {},
    employees: game.employees || {},
    upgradeMachine: game.upgradeMachine || (() => undefined),
    getMachineUpgradeCost: game.getMachineUpgradeCost || (() => Number.MAX_SAFE_INTEGER),
    hireEmployee: game.hireEmployee || (() => undefined),
    getEmployeeCost: game.getEmployeeCost || (() => Number.MAX_SAFE_INTEGER),
  };
};
