# Factory Empire - Guide de Développement

## 📁 Architecture du Projet

```
factory-empire/
├── App.js                          # Point d'entrée + Loading screen
├── app.json                        # Configuration Expo
├── package.json                    # Dépendances
├── README.md                       # Documentation principale
├── GUIDE_DEVELOPPEUR.md            # Ce fichier
│
└── src/
    ├── components/                 # Composants UI réutilisables
    │   ├── index.js                # Export unique
    │   ├── ResourceBar.js          # Barre ressources + monnaies
    │   ├── Machine.js              # Carte machine (upgrade)
    │   ├── ProgressBar.js          # Barres de progression
    │   ├── FloatingText.js         # Animation texte flottant
    │   ├── DailyRewardModal.js     # Modal récompense quotidienne
    │   └── SellModal.js            # Modal de vente ressources
    │
    ├── context/
    │   └── GameContext.js          # État global + provider
    │
    ├── hooks/                      # Logique métier
    │   ├── index.js                # Export unique
    │   ├── useProduction.js        # Production idle + collecte
    │   ├── useUpgrades.js          # Achat/upgrade machines
    │   ├── useGacha.js             # Système de tirage
    │   ├── useMissions.js          # Missions + achievements
    │   └── useDailyRewards.js      # Récompenses quotidiennes
    │
    ├── screens/                    # Écrans principaux
    │   ├── index.js                # Export unique
    │   ├── MainScreen.js           # Vue usine (écran principal)
    │   ├── ShopScreen.js           # Boutique machines/employés
    │   ├── GachaScreen.js          # Tirage personnages
    │   ├── MissionsScreen.js       # Liste missions
    │   └── MapScreen.js            # Carte des zones
    │
    ├── navigation/
    │   └── AppNavigator.js         # Navigation par onglets
    │
    ├── constants/
    │   └── gameConfig.js           # Configuration équilibrage
    │
    └── utils/
        ├── formatters.js           # Formatage nombres (1.5M, 2B)
        └── helpers.js              # Fonctions utilitaires
```

## 🎮 Core Loop du Jeu

```
┌─────────────────────────────────────────────────────────────┐
│                      BOUCLE PRINCIPALE                       │
│                                                              │
│   1. CLICK MANUEL → Ressources + XP                         │
│         ↓                                                   │
│   2. PRODUCTION AUTO (machines) → Ressources passives       │
│         ↓                                                   │
│   3. VENTE → Pièces                                         │
│         ↓                                                   │
│   4. UPGRADE Machines/Employés → + Production               │
│         ↓                                                   │
│   5. GACHA → Personnages avec bonus                         │
│         ↓                                                   │
│   6. MISSIONS → Tickets + Récompenses                       │
│         └───────────────┘                                   │
│              (retour étape 1)                               │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Système de Production

### Chaîne de production

```
Silicium (🔷) ─┬─→ Circuit (🔶) ─→ Gadget (📱) ─→ Puce IA (🤖)
               │
Cuivre (🧡) ───┘
```

### Machines et production

| Machine | Produces | Base Cost | Base Speed | Capacity |
|---------|----------|-----------|------------|----------|
| Extracteur | Silicium, Cuivre | 50 | 2000ms | 10 |
| Assembleur | Circuit | 200 | 3000ms | 5 |
| Fabrique | Gadget | 1000 | 5000ms | 3 |
| Laboratoire | Puce IA | 5000 | 10000ms | 2 |
| Quantum Core | Tout | 25000 | 1000ms | 20 |

### Formules de calcul

```javascript
// Coût d'upgrade
cost = baseCost × (multiplier ^ level)

// Vitesse avec bonus
speed = baseSpeed × (speedPerLevel ^ level) / (1 + bonusSpeed)

// Capacité avec bonus
capacity = floor(baseCapacity × (capacityPerLevel ^ level) × (1 + bonusCapacity))

// XP pour niveau
xpRequired = baseXp × (multiplier ^ (level - 1))
```

## 💰 Économie

### Monnaies

- **Pièces (💰)** : Monnaie principale, obtenue par vente
- **Gems (💎)** : Monnaie premium, rewards achievements
- **Tickets (🎫)** : Pour le Gacha, rewards missions

### Récompenses quotidiennes

| Jour | Pièces | Tickets | Gems |
|------|--------|---------|------|
| 1 | 100 | 1 | 0 |
| 2 | 200 | 1 | 1 |
| 3 | 300 | 2 | 2 |
| 4 | 500 | 2 | 3 |
| 5 | 750 | 3 | 5 |
| 6 | 1000 | 3 | 7 |
| 7 | 1500 | 5 | 10 |

### Gacha Rates

```
Common    (5 chars): 50%  → Bonus 2-3%
Rare      (5 chars): 30%  → Bonus 5-10%
Epic      (4 chars): 15%  → Bonus 10-25%
Legendary (1 char):  5%   → Bonus 50%
```

## 🏆 Progression

### Niveaux

- Niveau max: 50
- XP de base: 100
- Multiplicateur: 1.5
- Temps estimé 1→50: ~2-3 heures

### Achievements

| ID | Nom | Condition | Récompense |
|----|-----|-----------|------------|
| level_10 | Débutant | Niveau 10 | 10 gems |
| level_25 | Expert | Niveau 25 | 25 gems |
| level_50 | Maître | Niveau 50 | 100 gems |
| machines_10 | Industrialisation | 10 machines | 20 gems |
| coins_1m | Millionnaire | 1M pièces | 50 gems |
| gacha_10 | Collectionneur | 10 pulls | 30 gems |

## 🔧 Points d'Extension

### Pour ajouter une nouvelle machine

1. Dans `gameConfig.js`, ajouter dans `MACHINES`:
```javascript
newMachine: {
  id: 'newMachine',
  name: 'Nouvelle Machine',
  icon: '🆕',
  produces: ['silicon'],
  baseCost: 500,
  baseSpeed: 2000,
  baseCapacity: 5,
  costMultiplier: 1.5,
  speedPerLevel: 0.9,
  capacityPerLevel: 1.1,
}
```

2. Ajouter la ressource produite dans `RESOURCES` si nécessaire

3. Débloquer dans `ZONES` si lié à une zone

### Pour ajouter un employé

```javascript
newEmployee: {
  id: 'newEmployee',
  name: 'Nouveau Rôle',
  icon: '👤',
  baseCost: 1000,
  bonus: { speed: 0.15, coins: 0.10 },
  maxCount: 5,
  costMultiplier: 1.4,
}
```

### Pour ajouter un personnage Gacha

```javascript
newCharacter: {
  id: 'newCharacter',
  name: 'Personnage',
  rarity: 'rare', // common, rare, epic, legendary
  icon: '🎭',
  bonus: { speed: 0.08, xp: 0.05 },
}
```

### Pour ajouter une mission

```javascript
{
  id: 'new_mission',
  name: 'Titre',
  description: 'Description',
  target: 100,
  type: 'produce_silicon', // doit correspondre un type dans useMissions
  reward: { coins: 200, tickets: 2 },
}
```

## 🐛 Debugging

### Logs utiles

```javascript
// Dans GameContext, ajouter:
useEffect(() => {
  console.log('Game State:', {
    coins,
    level,
    machines: Object.entries(machines)
      .filter(([, m]) => m.unlocked && m.level > 0)
      .map(([id, m]) => `${id}:Lv${m.level}`)
      .join(', '),
  });
}, [coins, level, machines]);
```

### Reset save manuellement

```javascript
// Dans la console de l'app
await AsyncStorage.removeItem('factory_empire_save');
location.reload();
```

### Vérifier les bonus

```javascript
// Dans un écran
const { totalBonuses } = useGame();
console.log('Bonus:', totalBonuses());
// { speed: 0.25, capacity: 0.15, coins: 0.30, xp: 0.20 }
```

## 📱 Build Production

### Android

```bash
# Build APK
npx expo build:android -t apk

# Build AAB (Play Store)
npx expo build:android -t app-bundle
```

### iOS

```bash
# Build IPA
npx expo build:ios
```

### EAS Build (recommandé)

```bash
# Installer EAS CLI
npm install -g eas-cli

# Configurer
eas build:configure

# Build
eas build --platform android
eas build --platform ios
```

## ✅ Checklist de Test

- [ ] Le jeu se lance sans erreur
- [ ] Le clic manuel donne ressources + XP
- [ ] Les machines produisent automatiquement
- [ ] La vente de ressources fonctionne
- [ ] L'upgrade de machines réduit les coûts
- [ ] Les employés donnent des bonus
- [ ] Le Gacha donne des personnages
- [ ] Les missions se complètent
- [ ] La récompense quotidienne apparaît
- [ ] La sauvegarde persiste après reload
- [ ] La navigation entre onglets fonctionne
- [ ] Les animations sont fluides (60 FPS)

## 🚀 Commandes Utiles

```bash
# Démarrer dev server
npm start

# Reset cache
npm start -- --clear

# Lancer sur simulateur iOS
npm run ios

# Lancer sur émulateur Android
npm run android

# Lancer sur navigateur
npm run web

# Vérifier dépendances
npm outdated

# Mettre à jour dépendances
npm update

# Nettoyer node_modules
rm -rf node_modules && npm install
```

---

**Développé avec ❤️ - Factory Empire © 2026**
