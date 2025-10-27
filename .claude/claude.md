# Survey System - Système de Sondage

## 🎯 Objectif
Créer un système de sondage simple et professionnel avec 3-5 questions à choix multiples, optimisé pour mobile.

## 📋 Spécifications

### Fonctionnalités
- Formulaire de sondage avec 3-5 questions à choix multiples
- Validation et soumission des réponses
- Stockage local des réponses (LocalStorage/JSON)
- Page de résultats avec graphiques interactifs (camemberts, barres)
- Interface responsive et mobile-first
- Design professionnel et moderne

### Stack Technique
- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Stockage**: LocalStorage (format JSON)
- **Graphiques**: Chart.js (CDN)
- **Design**: Mobile-first, CSS Grid/Flexbox
- **Gestion de projet**: Backmark

## 🏗️ Architecture

```
/survey
├── index.html          # Page principale du sondage
├── results.html        # Affichage des résultats
├── admin.html         # Page admin (reset, export)
├── css/
│   ├── style.css      # Styles principaux
│   ├── survey.css     # Styles page sondage
│   └── results.css    # Styles page résultats
├── js/
│   ├── survey.js      # Logique du sondage
│   ├── results.js     # Logique des résultats
│   ├── storage.js     # Gestion du LocalStorage
│   └── config.js      # Configuration et questions
├── assets/
│   ├── icons/         # Icônes SVG
│   └── images/        # Images du projet
└── README.md          # Documentation
```

## 📝 Format des Données

### Questions (config.js)
```javascript
const SURVEY_CONFIG = {
  title: "Sondage de Satisfaction",
  description: "Votre avis compte!",
  questions: [
    {
      id: "q1",
      text: "Comment évaluez-vous notre service?",
      type: "single", // ou "multiple"
      options: [
        { id: "opt1", text: "Excellent", value: "excellent" },
        { id: "opt2", text: "Bon", value: "good" },
        { id: "opt3", text: "Moyen", value: "average" },
        { id: "opt4", text: "Mauvais", value: "poor" }
      ]
    }
    // ... autres questions
  ]
};
```

### Réponses (LocalStorage)
```javascript
{
  "responses": [
    {
      "id": "uuid-v4",
      "timestamp": "2025-10-27T21:30:00Z",
      "answers": {
        "q1": "excellent",
        "q2": ["opt1", "opt3"],
        // ...
      }
    }
  ],
  "stats": {
    "totalResponses": 42,
    "lastUpdated": "2025-10-27T21:30:00Z"
  }
}
```

## 🎨 Design Guidelines

### Mobile-First
- Breakpoints:
  - Mobile: < 768px (default)
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### Couleurs
- Primary: #4F46E5 (Indigo)
- Secondary: #06B6D4 (Cyan)
- Success: #10B981 (Green)
- Background: #F9FAFB
- Text: #1F2937

### Typography
- Font: System stack (sans-serif)
- Sizes: 16px base, scale modulaire (1.25)

## 🚀 Roadmap de Développement

### Phase 1: Structure de Base
- [ ] Créer la structure HTML de base
- [ ] Configurer les fichiers CSS (variables, reset)
- [ ] Créer le fichier de configuration des questions

### Phase 2: Page Sondage
- [ ] Développer le formulaire de sondage
- [ ] Implémenter la validation des réponses
- [ ] Créer le module de stockage (storage.js)
- [ ] Ajouter les animations et feedback utilisateur

### Phase 3: Page Résultats
- [ ] Créer la page HTML des résultats
- [ ] Intégrer Chart.js
- [ ] Implémenter les graphiques (camembert, barres)
- [ ] Ajouter les statistiques détaillées

### Phase 4: Finitions
- [ ] Page admin pour réinitialiser les données
- [ ] Optimisation mobile
- [ ] Tests cross-browser
- [ ] Documentation finale

## 📦 Livrables

1. ✅ Code source complet et commenté
2. ✅ Interface responsive (mobile/tablet/desktop)
3. ✅ Système de stockage local fonctionnel
4. ✅ Graphiques interactifs des résultats
5. ✅ Documentation utilisateur

## 🔧 Commandes Utiles

### Backmark
```bash
# Voir les tâches
backmark board show

# Créer une tâche
backmark task create "Titre de la tâche"

# Voir une tâche
backmark task view <id>

# Fermer une tâche
backmark task close <id>
```

### Développement
```bash
# Serveur local simple
python3 -m http.server 8000
# ou
npx serve

# Accès: http://localhost:8000
```

## 📚 Ressources

- Chart.js: https://www.chartjs.org/
- MDN Web Docs: https://developer.mozilla.org/
- CSS Grid Guide: https://css-tricks.com/snippets/css/complete-guide-grid/
- LocalStorage API: https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage

## 🤝 Contribution

Utilisez Backmark pour gérer les tâches:
1. Créer une tâche pour chaque fonctionnalité
2. Assigner et suivre la progression
3. Documenter les décisions avec `backmark task ai-note`
4. Faire reviewer par l'AI avec `backmark task ai-review`

---

**Dernière mise à jour**: 2025-10-27
**Version**: 1.0.0
**Statut**: En développement
