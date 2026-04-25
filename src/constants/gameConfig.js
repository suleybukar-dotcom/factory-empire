export const RESOURCES = {
  silicon: { id: 'silicon', name: 'Silicium', icon: '🔷', baseValue: 1 },
  copper: { id: 'copper', name: 'Cuivre', icon: '🧡', baseValue: 1.5 },
  circuit: { id: 'circuit', name: 'Circuit', icon: '🔶', baseValue: 5 },
  gadget: { id: 'gadget', name: 'Gadget', icon: '📱', baseValue: 20 },
  aiChip: { id: 'aiChip', name: 'Puce IA', icon: '🤖', baseValue: 100 },
};

export const MACHINES = {
  extractor: {
    id: 'extractor',
    name: 'Extracteur',
    icon: '⛏️',
    produces: ['silicon', 'copper'],
    baseCost: 50,
    baseSpeed: 2000,
    baseCapacity: 10,
    costMultiplier: 1.45,
    speedPerLevel: 0.96,
    capacityPerLevel: 1.05,
  },
  assembler: {
    id: 'assembler',
    name: 'Assembleur',
    icon: '⚙️',
    produces: ['circuit'],
    baseCost: 200,
    baseSpeed: 3000,
    baseCapacity: 5,
    costMultiplier: 1.5,
    speedPerLevel: 0.97,
    capacityPerLevel: 1.08,
  },
  factory: {
    id: 'factory',
    name: 'Fabrique',
    icon: '🏭',
    produces: ['gadget'],
    baseCost: 1000,
    baseSpeed: 5000,
    baseCapacity: 3,
    costMultiplier: 1.6,
    speedPerLevel: 0.97,
    capacityPerLevel: 1.07,
  },
  lab: {
    id: 'lab',
    name: 'Laboratoire',
    icon: '🧪',
    produces: ['aiChip'],
    baseCost: 5000,
    baseSpeed: 10000,
    baseCapacity: 2,
    costMultiplier: 1.75,
    speedPerLevel: 0.98,
    capacityPerLevel: 1.05,
  },
};

export const EMPLOYEES = {
  technician: {
    id: 'technician',
    name: 'Technicien',
    icon: '🛠️',
    baseCost: 300,
    maxCount: 10,
    costMultiplier: 1.4,
    bonus: { speed: 0.05 },
  },
  engineer: {
    id: 'engineer',
    name: 'Ingénieur',
    icon: '👷',
    baseCost: 1200,
    maxCount: 8,
    costMultiplier: 1.5,
    bonus: { speed: 0.1, capacity: 0.1 },
  },
};

export const DAILY_REWARDS = [
  { day: 1, coins: 100, tickets: 1, gems: 0 },
  { day: 2, coins: 200, tickets: 1, gems: 1 },
  { day: 3, coins: 300, tickets: 2, gems: 2 },
  { day: 4, coins: 500, tickets: 2, gems: 3 },
  { day: 5, coins: 750, tickets: 3, gems: 5 },
  { day: 6, coins: 1000, tickets: 3, gems: 7 },
  { day: 7, coins: 1500, tickets: 5, gems: 10 },
];

export const MISSIONS = [
  { id: 'collect_20', name: 'Collecteur', target: 20, type: 'collect', reward: { coins: 200, tickets: 1 } },
  { id: 'sell_10', name: 'Vendeur', target: 10, type: 'sell', reward: { coins: 300, gems: 1 } },
  { id: 'buy_3', name: 'Ingénieur en herbe', target: 3, type: 'upgrade', reward: { coins: 500, tickets: 2 } },
];
