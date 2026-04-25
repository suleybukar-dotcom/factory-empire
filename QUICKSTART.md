# 🚀 Factory Empire - Démarrage Rapide

## Prérequis

- Node.js 18+ installé
- npm ou yarn
- Un appareil mobile ou simulateur (optionnel)

## Installation (5 minutes)

```bash
# 1. Se placer dans le dossier
cd factory-empire

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm start
```

## Lancer le jeu

### Option 1: Expo Go (Recommandé pour tester)

1. Installez l'app **Expo Go** sur votre téléphone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scannez le QR code affiché dans le terminal

3. Le jeu se lance sur votre téléphone !

### Option 2: Navigateur Web

```bash
npm run web
```

Ouvre automatiquement votre navigateur à `http://localhost:19006`

### Option 3: Simulateurs

```bash
# iOS (macOS uniquement)
npm run ios

# Android (nécessite Android Studio)
npm run android
```

## 🎮 Comment jouer

### Premiers pas

1. **Cliquez sur "Collecter"** pour obtenir vos premières ressources
2. **Allez à la Boutique** et débloquez l'Extracteur (50 pièces)
3. **Upgradez l'Extracteur** pour produire plus vite
4. **Vendez vos ressources** via le bouton "Vendre Ressources"
5. **Répétez** pour progresser !

### Système de jeu

```
Collecter → Produire (machines) → Vendre → Upgrader → Gacha → Missions
     ↑_________________________________________________________|
```

### Conseils

- ✅ Débloquez les machines dans l'ordre: Extracteur → Assembleur → Fabrique → Labo
- ✅ Embauchez des employés pour des bonus permanents
- ✅ Réclamez votre récompense quotidienne chaque jour
- ✅ Complétez les missions pour des tickets Gacha gratuits
- ✅ Faites des tirages Gacha pour des bonus uniques

## 📁 Structure du projet

```
factory-empire/
├── App.js                    # Point d'entrée
├── src/
│   ├── components/           # UI (ResourceBar, Machine...)
│   ├── context/              # GameContext (état global)
│   ├── hooks/                # Logique (useProduction, useGacha...)
│   ├── screens/              # Écrans (Main, Shop, Gacha...)
│   ├── constants/            # Config (gameConfig.js)
│   └── utils/                # Helpers
└── README.md                 # Documentation complète
```

## 🛠️ Commandes utiles

```bash
npm start           # Lancer Expo
npm start --clear   # Reset cache
npm run web         # Navigateur
npm run android     # Émulateur Android
npm run ios         # Simulateur iOS
```

## 🐛 Problèmes courants

### "Port 8081 already in use"
```bash
# Utiliser un autre port
npx expo start --port 8082
```

### "Module not found"
```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
```

### Le jeu ne se lance pas
```bash
# Clear cache + restart
npm start -- --clear
```

## 📞 Support

- 📖 Lire `README.md` pour la documentation complète
- 📖 Lire `GUIDE_DEVELOPPEUR.md` pour l'architecture
- 🐛 Issues GitHub (si projet hébergé)

---

**Bon jeu ! 🎮**
