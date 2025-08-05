# FormBuilder AI 🤖📝

Un générateur de formulaire intelligent utilisant l'IA pour créer des formulaires dynamiques à partir de descriptions en langage naturel.

## 🌟 Fonctionnalités

- **Génération IA** : Créez des formulaires complexes en décrivant simplement ce que vous voulez
- **Validation intelligente** : Validation automatique avec Zod pour la sécurité des données
- **Interface moderne** : Design responsive et élégant avec Tailwind CSS
- **Types de champs multiples** : Support pour texte, email, nombre, textarea, select, checkbox, radio
- **Expérience utilisateur optimale** : Feedback temps réel et animations fluides

## 🚀 Technologies utilisées

- **React 18** - Interface utilisateur
- **TypeScript** - Typage statique
- **Vite** - Build tool moderne et rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Zod** - Validation et schémas TypeScript

## 📦 Installation

1. Clonez le repository :
```bash
git clone <repository-url>
cd formbuilder-ai
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez votre navigateur à `http://localhost:5173`

## 🎯 Comment utiliser

1. **Page d'accueil** : Cliquez sur "Créer un formulaire avec l'IA"
2. **Générateur** : Décrivez le type de formulaire souhaité
3. **Formulaire généré** : Remplissez et testez le formulaire créé
4. **Soumission** : Visualisez les données dans la console

## 📝 Exemples de prompts

- `"Formulaire de contact avec nom, email et message"`
- `"Enquête de satisfaction client"`
- `"Inscription à un événement avec informations personnelles"`
- `"Formulaire de candidature avec CV et lettre de motivation"`

## 🏗️ Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── FormField.tsx   # Champ de formulaire générique
│   ├── DynamicForm.tsx # Formulaire dynamique
│   └── FormGenerator.tsx # Générateur IA
├── pages/              # Pages de l'application
│   └── HomePage.tsx    # Page d'accueil
├── types/              # Types TypeScript
│   └── form.ts         # Types de formulaire
├── lib/                # Utilitaires
│   └── openai-mock.ts  # API mock pour l'IA
└── App.tsx            # Composant principal
```

## 🎨 Types de champs supportés

- **text** : Champ texte simple
- **email** : Champ email avec validation
- **number** : Champ numérique avec min/max
- **textarea** : Zone de texte multiligne
- **select** : Liste déroulante
- **checkbox** : Case à cocher
- **radio** : Boutons radio

## 🔧 API Mock

Le projet utilise actuellement une API mock qui simule l'appel à OpenAI. Pour intégrer la vraie API OpenAI, modifiez le fichier `src/lib/openai-mock.ts`.

## 📋 Scripts disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualisation du build
- `npm run lint` - Vérification ESLint

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🚀 Prochaines fonctionnalités

- [ ] Intégration avec la vraie API OpenAI
- [ ] Sauvegarde des formulaires générés
- [ ] Export en JSON/HTML
- [ ] Thèmes personnalisables
- [ ] Support multi-langues
- [ ] Authentification utilisateur

---

Créé avec ❤️ et alimenté par l'IA
