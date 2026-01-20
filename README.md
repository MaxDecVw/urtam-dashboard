# 📊 URTAM Dashboard - Performance Digitale & Benchmark Concurrentiel

Dashboard interactif Next.js pour analyser la performance digitale d'URTAM Formation et comparer avec les concurrents.

## 🎯 Fonctionnalités

### ✅ Implémenté (Version 1.0)

- **Page d'accueil** : Vue d'ensemble avec KPIs clés
  - 4 KPI Cards : Total followers, Taux d'engagement, Position marché, Score réputation
  - Graphique répartition followers par réseau social
  - Graphique benchmark vs concurrents
  - Sections Forces/Faiblesses
  - Recommandations stratégiques

- **Navigation** : Sidebar avec 5 sections
  - Accueil
  - Réseaux Sociaux
  - Concurrence
  - Réputation
  - SEO

- **Design** : Interface moderne avec Tailwind CSS
  - Couleurs URTAM (#22c9b0)
  - Responsive (Mobile, Tablette, Desktop)
  - Cartes avec hover effects
  - Badges et indicateurs visuels

- **Données** : Fichiers JSON structurés
  - `urtam-data.json` : Réseaux sociaux, métriques, KPIs
  - `competitors-data.json` : 3 concurrents (Décalez !, ImprO2, Arthémon)
  - `reputation-data.json` : Avis clients et alertes
  - `seo-data.json` : Pages du site et opportunités

### 🚧 À venir (Phases suivantes)

- Pages détaillées (Réseaux Sociaux, Concurrence, Réputation, SEO)
- Filtres par date interactifs
- Comparaison concurrents sélective
- Export PDF et Excel
- Graphiques supplémentaires (Radar, Line, Pie)

## 🚀 Installation

### Prérequis

- Node.js 18+ et npm

### Étapes

1. **Le projet est déjà créé** dans `C:\Users\maxen\OneDrive\Bureau\Data Marketing\urtam-dashboard\`

2. **Les dépendances sont déjà installées**

3. **Lancer le serveur de développement** :

```bash
cd "C:\Users\maxen\OneDrive\Bureau\Data Marketing\urtam-dashboard"
npm run dev
```

4. **Ouvrir dans le navigateur** :

```
http://localhost:3000
```

## 📁 Structure du Projet

```
urtam-dashboard/
├── app/
│   ├── layout.tsx              # Layout racine avec Sidebar et Context
│   ├── page.tsx                # Page d'accueil (Dashboard principal)
│   ├── globals.css             # Styles globaux Tailwind
│   ├── reseaux-sociaux/        # À créer
│   ├── concurrence/            # À créer
│   ├── reputation/             # À créer
│   └── seo/                    # À créer
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Navigation latérale
│   │   └── Header.tsx          # En-tête avec actions
│   ├── dashboard/
│   │   └── KPICard.tsx         # Carte KPI réutilisable
│   ├── charts/
│   │   ├── SocialMediaChart.tsx      # Graphique réseaux sociaux
│   │   └── ComparisonChart.tsx       # Graphique benchmark
│   └── ui/
│       ├── Card.tsx            # Carte container
│       ├── Button.tsx          # Bouton
│       └── Badge.tsx           # Badge
│
├── lib/
│   ├── data/
│   │   ├── urtam-data.json           # Données URTAM
│   │   ├── competitors-data.json     # Données concurrents
│   │   ├── reputation-data.json      # Données réputation
│   │   └── seo-data.json             # Données SEO
│   ├── context/
│   │   └── DashboardContext.tsx      # État global React Context
│   ├── utils/
│   │   └── cn.ts                     # Utilitaire classNames
│   └── constants/
│       └── colors.ts                 # Palette de couleurs
│
├── types/
│   └── index.ts                # Définitions TypeScript
│
├── package.json                # Dépendances
├── tailwind.config.ts          # Configuration Tailwind
├── tsconfig.json               # Configuration TypeScript
└── next.config.js              # Configuration Next.js
```

## 🎨 Technologies Utilisées

- **Framework** : Next.js 14.2 (App Router)
- **Langage** : TypeScript 5.6
- **Styling** : Tailwind CSS 3.4
- **Graphiques** : Recharts 2.12
- **Icons** : Lucide React
- **State Management** : React Context API
- **Utilitaires** : clsx, tailwind-merge

## 📊 Données

### Sources

Les données proviennent du fichier Excel `Declercq_Maxence_DataBrutes_Urtam.xlsx` (5 feuilles) :

1. **Base de données entreprise** : Pages du site, followers, avis
2. **Pages du site** : Métadonnées des 5 pages principales
3. **Réseaux sociaux** : Métriques détaillées par plateforme
4. **Avis et réputation** : 2 avis clients positifs
5. **Concurrence** : 3 concurrents avec métriques complètes

### Métriques Clés

#### URTAM Formation
- **Total Followers** : 932
- **LinkedIn** : 852 followers (91% du total), 5.2% engagement
- **Instagram** : 74 followers
- **Facebook** : 1 follower, 57 posts
- **YouTube** : 4 followers
- **Twitter** : 1 follower
- **Avis Google** : 0 ⚠️ (point critique)
- **Position Google** : #10

#### Concurrents

1. **Décalez !** (Leader)
   - 3,772 followers totaux
   - #1 Google
   - Très actif sur réseaux

2. **ImprO2**
   - 1,914 followers totaux
   - #7 Google
   - Offres complètes

3. **Arthémon**
   - 666 followers
   - #2 Google
   - Avis vidéo

## 🎯 Insights Principaux

### Forces 💪
- **Engagement LinkedIn** : 5.2% (excellent)
- **Avis positifs** : 100% de satisfaction
- **Expertise** : Formateurs adaptables et contenu pratique

### Faiblesses ⚠️
- **Avis Google** : 0 avis (CRITIQUE)
- **Présence sociale** : -75% vs leader Décalez !
- **Facebook/Twitter** : Quasi inexistants malgré des posts

### Recommandations 📈
1. **Priorité 1** : Développer collecte avis Google
2. **Priorité 2** : Renforcer Instagram (74 followers seulement)
3. **Priorité 3** : Capitaliser sur engagement LinkedIn (5.2%)

## 🛠️ Scripts Disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement (http://localhost:3000)

# Production
npm run build        # Compile le projet pour la production
npm run start        # Lance le serveur de production

# Code Quality
npm run lint         # Vérifie le code avec ESLint
```

## 🌈 Couleurs du Thème

```css
/* Brand URTAM */
--primary: #22c9b0          /* Turquoise */
--primary-dark: #1ba896     /* Vert foncé */
--primary-light: #4dd4be    /* Turquoise clair */

/* Réseaux Sociaux */
--linkedin: #0A66C2
--instagram: #E4405F
--facebook: #1877F2
--youtube: #FF0000
--twitter: #1DA1F2

/* Statuts */
--success: #10b981          /* Vert */
--warning: #f59e0b          /* Orange */
--danger: #ef4444           /* Rouge */
--info: #3b82f6             /* Bleu */
```

## 📱 Responsive Design

- **Mobile (< 768px)** :
  - Sidebar caché (hamburger menu à implémenter)
  - KPI cards en 1 colonne
  - Graphiques full-width

- **Tablette (768-1024px)** :
  - KPI cards en 2 colonnes
  - Graphiques adaptés

- **Desktop (> 1024px)** :
  - Sidebar fixe 240px
  - KPI cards en 4 colonnes
  - Layout optimal

## 🔄 Prochaines Étapes

### Phase 2 : Pages Détaillées
- [ ] Page Réseaux Sociaux complète
- [ ] Page Concurrence avec tableaux
- [ ] Page Réputation avec alertes
- [ ] Page SEO avec opportunités

### Phase 3 : Interactivité
- [ ] Filtres par date fonctionnels
- [ ] Sélection concurrents dans graphiques
- [ ] Hooks useFilteredData et useComparison

### Phase 4 : Export
- [ ] Export PDF avec jsPDF
- [ ] Export Excel avec xlsx
- [ ] API routes pour génération

### Phase 5 : Optimisation
- [ ] Tests responsive complets
- [ ] Performance optimization
- [ ] Accessibilité (WCAG AA)
- [ ] Documentation complète

## 📝 Notes de Développement

- Le projet utilise Next.js 13+ App Router (pas Pages Router)
- TypeScript strict mode activé
- ESLint configuré pour Next.js
- Données mockées en JSON (migration vers DB possible)
- Context API pour état global (évolutif vers Redux si besoin)

## 🐛 Dépannage

### Le serveur ne démarre pas
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install
```

### Erreurs TypeScript
```bash
# Vérifier la configuration
npm run lint
```

### Graphiques ne s'affichent pas
- Vérifier que Recharts est bien installé : `npm list recharts`
- Vérifier les données dans `lib/data/*.json`

## 📄 Licence

Projet privé - URTAM Formation

## 👤 Auteur

Dashboard créé pour URTAM Formation
Données source : Declercq Maxence

---

**Version** : 1.0.0
**Date** : 18 décembre 2024
**Status** : ✅ Dashboard principal fonctionnel
