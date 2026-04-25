import { useGame } from '../context/GameContext';

const CHARACTERS = [
  { id: 'bot-1', name: 'Nova', rarity: 'common', icon: '🤖' },
  { id: 'bot-2', name: 'Flux', rarity: 'rare', icon: '🛰️' },
  { id: 'bot-3', name: 'Astra', rarity: 'epic', icon: '🌌' },
];

export const useGacha = () => {
  const game = useGame() || {};
  const tickets = game.tickets || 0;

  const pull = () => {
    if (tickets <= 0) return null;
    const item = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)] || null;
    return item;
  };

  return {
    tickets,
    characters: game.characters || [],
    pull,
  };
};
