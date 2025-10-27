# 📊 Survey System - Système de Sondage

Un système de sondage simple, professionnel et mobile-first pour collecter et visualiser des réponses à des questions à choix multiples.

## ✨ Fonctionnalités

- 🎯 Formulaire de sondage avec 3-5 questions à choix multiples
- 📱 Design responsive et mobile-first
- 💾 Stockage local des réponses (LocalStorage)
- 📊 Visualisation des résultats avec graphiques interactifs
- 🎨 Interface moderne et professionnelle
- ⚡ Léger et rapide (pas de framework lourd)

## 🚀 Démarrage Rapide

### Prérequis

Aucun! Le projet utilise uniquement HTML/CSS/JavaScript vanilla avec Chart.js via CDN.

### Installation

1. Clonez ou téléchargez le projet
2. Lancez un serveur local:

```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node.js
npx serve

# Option 3: PHP
php -S localhost:8000
```

3. Ouvrez votre navigateur sur `http://localhost:8000`

## 📁 Structure du Projet

```
/survey
├── index.html          # Page principale du sondage
├── results.html        # Affichage des résultats
├── admin.html         # Page d'administration
├── css/
│   ├── style.css      # Styles globaux
│   ├── survey.css     # Styles page sondage
│   └── results.css    # Styles page résultats
├── js/
│   ├── config.js      # Configuration et questions
│   ├── storage.js     # Gestion du LocalStorage
│   ├── survey.js      # Logique du sondage
│   └── results.js     # Logique des résultats
├── assets/            # Images et icônes
├── backlog/           # Gestion de projet Backmark
└── .claude/           # Configuration Claude Code
```

## 🎨 Personnalisation

### Modifier les Questions

Éditez le fichier `js/config.js`:

```javascript
const SURVEY_CONFIG = {
  title: "Mon Sondage",
  description: "Merci de participer!",
  questions: [
    {
      id: "q1",
      text: "Votre question ici?",
      type: "single", // ou "multiple" pour sélection multiple
      options: [
        { id: "opt1", text: "Option 1", value: "option1" },
        { id: "opt2", text: "Option 2", value: "option2" },
        // ...
      ]
    }
  ]
};
```

### Modifier les Couleurs

Éditez les variables CSS dans `css/style.css`:

```css
:root {
  --primary: #4F46E5;
  --secondary: #06B6D4;
  --success: #10B981;
  /* ... */
}
```

## 📊 Gestion des Données

Les réponses sont stockées dans le LocalStorage du navigateur:

- **Clé**: `survey_responses`
- **Format**: JSON
- **Persistance**: Locale uniquement

### Exporter les Données

Depuis la page admin (`admin.html`):
1. Cliquez sur "Exporter les données"
2. Un fichier JSON sera téléchargé

### Réinitialiser les Données

Depuis la page admin:
1. Cliquez sur "Réinitialiser"
2. Confirmez l'action

## 🛠️ Développement avec Backmark

Ce projet utilise [Backmark](https://backmark.dev) pour la gestion de projet.

### Commandes Utiles

```bash
# Voir toutes les tâches
backmark task list

# Voir une tâche spécifique
backmark task view 001

# Créer une nouvelle tâche
backmark task create "Titre de la tâche"

# Marquer une tâche en cours
backmark task edit 001 --status "In Progress"

# Fermer une tâche
backmark task close 001

# Générer un plan avec l'AI
backmark task ai-plan 001

# Ajouter une note
backmark task ai-note 001 "Ma note"

# Demander une revue
backmark task ai-review 001
```

## 🎯 Roadmap

- [x] Documentation et structure de projet
- [ ] Structure HTML et CSS de base
- [ ] Page de sondage fonctionnelle
- [ ] Système de stockage
- [ ] Page de résultats avec graphiques
- [ ] Page d'administration
- [ ] Tests et optimisations mobile

Voir `.claude/claude.md` pour plus de détails.

## 📦 Technologies Utilisées

- **HTML5**: Structure sémantique
- **CSS3**: Grid, Flexbox, Variables CSS
- **JavaScript ES6+**: Vanilla JS moderne
- **Chart.js**: Bibliothèque de graphiques
- **LocalStorage API**: Persistance des données

## 📝 Licence

Ce projet est libre d'utilisation pour usage personnel et éducatif.

## 🤝 Contribution

1. Créez une tâche dans Backmark
2. Développez la fonctionnalité
3. Testez sur mobile et desktop
4. Documentez vos changements

## 📞 Support

Pour toute question ou problème:
- Consultez `.claude/claude.md` pour la documentation complète
- Vérifiez les tâches Backmark pour l'état du projet
- Utilisez Claude Code pour l'assistance au développement

---

**Version**: 1.0.0
**Statut**: En développement
**Dernière mise à jour**: 2025-10-27
