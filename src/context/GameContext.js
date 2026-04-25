import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DAILY_REWARDS, EMPLOYEES, MACHINES, MISSIONS, RESOURCES } from '../constants/gameConfig';
import { clamp, getObjectValues, safeArray } from '../utils/helpers';

const SAVE_KEY = 'factory_empire_save';
const GameContext = createContext(undefined);

const createInitialMachines = () =>
  Object.fromEntries(
    Object.entries(MACHINES).map(([id, machine], idx) => [
      id,
      {
        ...machine,
        level: 1,
        unlocked: idx === 0,
        stored: 0,
      },
    ]),
  );

const createInitialEmployees = () =>
  Object.fromEntries(
    Object.entries(EMPLOYEES).map(([id, employee]) => [
      id,
      {
        ...employee,
        count: 0,
      },
    ]),
  );

const defaultState = {
  coins: 150,
  gems: 0,
  tickets: 3,
  xp: 0,
  level: 1,
  resources: Object.fromEntries(Object.keys(RESOURCES).map((id) => [id, 0])),
  machines: createInitialMachines(),
  employees: createInitialEmployees(),
  characters: [],
  daily: { day: 1, claimedAt: null },
  missionsProgress: {},
  missionClaims: {},
};

export const GameProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(SAVE_KEY);
        if (!active || !raw) {
          setIsLoaded(true);
          return;
        }
        const parsed = JSON.parse(raw);
        setState((prev) => ({
          ...prev,
          ...parsed,
          resources: { ...prev.resources, ...(parsed?.resources || {}) },
          machines: { ...prev.machines, ...(parsed?.machines || {}) },
          employees: { ...prev.employees, ...(parsed?.employees || {}) },
          characters: safeArray(parsed?.characters),
          daily: { ...prev.daily, ...(parsed?.daily || {}) },
          missionsProgress: { ...prev.missionsProgress, ...(parsed?.missionsProgress || {}) },
          missionClaims: { ...prev.missionClaims, ...(parsed?.missionClaims || {}) },
        }));
      } catch (error) {
        // Ignore corrupted save and keep defaults
      } finally {
        if (active) setIsLoaded(true);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(SAVE_KEY, JSON.stringify(state)).catch(() => undefined);
  }, [state, isLoaded]);

  const addProgress = useCallback((type, amount = 1) => {
    setState((prev) => ({
      ...prev,
      missionsProgress: {
        ...prev.missionsProgress,
        [type]: (prev.missionsProgress?.[type] || 0) + amount,
      },
    }));
  }, []);

  const addResources = useCallback((resourceId, amount = 0) => {
    if (!resourceId) return;
    setState((prev) => ({
      ...prev,
      resources: {
        ...prev.resources,
        [resourceId]: (prev.resources?.[resourceId] || 0) + Math.max(0, amount),
      },
    }));
    addProgress('collect', 1);
  }, [addProgress]);

  const collectMachine = useCallback((machineId) => {
    const machine = state.machines?.[machineId];
    if (!machine?.unlocked) return false;
    const produced = machine.produces?.[0];
    if (!produced) return false;

    const gain = Math.max(1, machine.level);
    addResources(produced, gain);
    setState((prev) => ({
      ...prev,
      xp: prev.xp + gain,
    }));
    return true;
  }, [addResources, state.machines]);

  const getMachineUpgradeCost = useCallback((machineId) => {
    const machine = state.machines?.[machineId];
    if (!machine) return Number.MAX_SAFE_INTEGER;
    return Math.floor(machine.baseCost * Math.pow(machine.costMultiplier, machine.level));
  }, [state.machines]);

  const upgradeMachine = useCallback((machineId) => {
    const cost = getMachineUpgradeCost(machineId);
    setState((prev) => {
      if ((prev.coins || 0) < cost) return prev;
      const machine = prev.machines?.[machineId];
      if (!machine) return prev;
      return {
        ...prev,
        coins: prev.coins - cost,
        machines: {
          ...prev.machines,
          [machineId]: {
            ...machine,
            unlocked: true,
            level: (machine.level || 1) + 1,
          },
        },
      };
    });
    addProgress('upgrade', 1);
  }, [addProgress, getMachineUpgradeCost]);

  const sellAllResources = useCallback(() => {
    setState((prev) => {
      const resources = prev.resources || {};
      const total = Object.entries(resources).reduce((sum, [id, quantity]) => {
        const value = RESOURCES?.[id]?.baseValue || 0;
        return sum + (quantity || 0) * value;
      }, 0);
      if (total <= 0) return prev;
      return {
        ...prev,
        coins: prev.coins + Math.floor(total),
        resources: Object.fromEntries(Object.keys(resources).map((id) => [id, 0])),
      };
    });
    addProgress('sell', 1);
  }, [addProgress]);

  const getMachinesByStatus = useCallback((status = 'all') => {
    const list = getObjectValues(state.machines);
    if (status === 'all') return list;
    if (status === 'unlocked') return list.filter((m) => m?.unlocked);
    if (status === 'locked') return list.filter((m) => !m?.unlocked);
    return list;
  }, [state.machines]);

  const getEmployeeCost = useCallback((employeeId) => {
    const employee = state.employees?.[employeeId];
    if (!employee) return Number.MAX_SAFE_INTEGER;
    return Math.floor(employee.baseCost * Math.pow(employee.costMultiplier, employee.count || 0));
  }, [state.employees]);

  const hireEmployee = useCallback((employeeId) => {
    const cost = getEmployeeCost(employeeId);
    setState((prev) => {
      const employee = prev.employees?.[employeeId];
      if (!employee || prev.coins < cost || (employee.count || 0) >= (employee.maxCount || 0)) return prev;
      return {
        ...prev,
        coins: prev.coins - cost,
        employees: {
          ...prev.employees,
          [employeeId]: {
            ...employee,
            count: (employee.count || 0) + 1,
          },
        },
      };
    });
  }, [getEmployeeCost]);

  const claimDailyReward = useCallback(() => {
    const now = Date.now();
    let claimed = false;
    setState((prev) => {
      const claimedAt = prev.daily?.claimedAt || 0;
      const elapsed = now - claimedAt;
      if (elapsed < 24 * 60 * 60 * 1000) return prev;

      const day = clamp(prev.daily?.day || 1, 1, 7);
      const reward = DAILY_REWARDS?.[day - 1] || DAILY_REWARDS[0];
      claimed = true;

      return {
        ...prev,
        coins: prev.coins + (reward?.coins || 0),
        gems: prev.gems + (reward?.gems || 0),
        tickets: prev.tickets + (reward?.tickets || 0),
        daily: {
          day: day >= 7 ? 1 : day + 1,
          claimedAt: now,
        },
      };
    });
    return claimed;
  }, []);

  const claimMission = useCallback((missionId) => {
    const mission = safeArray(MISSIONS).find((m) => m?.id === missionId);
    if (!mission) return false;

    let success = false;
    setState((prev) => {
      if (prev.missionClaims?.[missionId]) return prev;
      const progress = prev.missionsProgress?.[mission.type] || 0;
      if (progress < (mission.target || 0)) return prev;
      success = true;
      return {
        ...prev,
        coins: prev.coins + (mission.reward?.coins || 0),
        gems: prev.gems + (mission.reward?.gems || 0),
        tickets: prev.tickets + (mission.reward?.tickets || 0),
        missionClaims: { ...prev.missionClaims, [missionId]: true },
      };
    });
    return success;
  }, []);

  const totalBonuses = useCallback(() => {
    const employees = state.employees || {};
    return Object.values(employees).reduce(
      (acc, employee) => {
        const count = employee?.count || 0;
        acc.speed += (employee?.bonus?.speed || 0) * count;
        acc.capacity += (employee?.bonus?.capacity || 0) * count;
        acc.coins += (employee?.bonus?.coins || 0) * count;
        acc.xp += (employee?.bonus?.xp || 0) * count;
        return acc;
      },
      { speed: 0, capacity: 0, coins: 0, xp: 0 },
    );
  }, [state.employees]);

  const value = useMemo(
    () => ({
      ...state,
      isLoaded,
      missions: MISSIONS,
      dailyRewards: DAILY_REWARDS,
      addResources,
      collectMachine,
      getMachineUpgradeCost,
      upgradeMachine,
      sellAllResources,
      getMachinesByStatus,
      getEmployeeCost,
      hireEmployee,
      claimDailyReward,
      claimMission,
      totalBonuses,
    }),
    [
      addResources,
      claimDailyReward,
      claimMission,
      collectMachine,
      getEmployeeCost,
      getMachineUpgradeCost,
      getMachinesByStatus,
      hireEmployee,
      isLoaded,
      sellAllResources,
      state,
      totalBonuses,
      upgradeMachine,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    return {
      ...defaultState,
      isLoaded: true,
      missions: MISSIONS,
      dailyRewards: DAILY_REWARDS,
      addResources: () => undefined,
      collectMachine: () => false,
      getMachineUpgradeCost: () => Number.MAX_SAFE_INTEGER,
      upgradeMachine: () => undefined,
      sellAllResources: () => undefined,
      getMachinesByStatus: () => [],
      getEmployeeCost: () => Number.MAX_SAFE_INTEGER,
      hireEmployee: () => undefined,
      claimDailyReward: () => false,
      claimMission: () => false,
      totalBonuses: () => ({ speed: 0, capacity: 0, coins: 0, xp: 0 }),
    };
  }
  return context;
};
