# Cahier des Charges : Développement d'un Agent GenAI pour l'Assurance

## Objectif du challenge

Développer un agent conversationnel intelligent (GenAI) capable d'interagir avec des utilisateurs autour de produits d'assurance, d'analyser une base de données, et de générer un devis à l'aide d'API existantes.

Les étudiants devront concevoir un prototype fonctionnel démontrant les 3 fonctionnalités suivantes:

1. Comprendre les produits d'assurance relatifs à BH Assurance (branches, sous branches, produits, plans et conditions générales), et interagir avec l'utilisateur pour expliquer et répondre aux questions de l'utilisateur
2. Analyser des données clients afin de répondre aux questions de l'utilisateurs relatifs a ses contrats ou a ses sinistres.
3. A travers la discussion avec le chat, l'agent IA collecte les informations du clients et génère un devis en se connectant à une API existante (API Devis).

## Axes fonctionnels attendus

### 1. Compréhension des produits d'assurance

- L'agent doit pouvoir répondre à des questions types comme :
  - « Quelles sont les garanties incluses dans le contrat auto ? »
  - « Quelle est la différence entre la formule standard et premium ? »
- Les étudiants recevront un pack documentaire simulant les fiches produits.

### 2. Analyse d'une base de données client

- Une base de données sera fournie.
- L'agent doit pouvoir :
  - Identifier les garanties souscrites par un client.
  - Déterminer si un sinistre est couvert ou non.
  - Répondre sur le statut de paiement d'un client.
  - Répondre sur le statut d'un sinistre d'un client.
  - Répondre sur les questions relatives à la couverture d'un sinistre.

### 3. Génération d'un devis via API

- Une API sera fournie.
- L'agent devra :
  - Poser les bonnes questions à l'utilisateur pour collecter les informations inputs de l'API
  - Envoyer la requête à l'API.
  - Présenter le devis à l'utilisateur de manière claire.

## Contraintes techniques

- Utilisation d'un modèle GenAI (local).
- Connexion à une base de données.
- Intégration API (REST).
- Interface minimum : interface Web simple (chat avec input text + affichage structuré des réponses).

## Livrables

- Agent GenAI fonctionnel.
- Code source commenté.
- Documentation (README).
- Présentation finale (10 minutes de démo).
- **Bonus :** design UI, analytics, sécurité, logs, etc.

## Déroulement du challenge (1 mois)

| Semaine | Étapes | Livrables |
|---------|--------|-----------|
| 1 | Compréhension métier + Choix technologies + entame du Développement du cœur de l'agent | Dossier de cadrage |
| 2 | Développement du cœur de l'agent (Q&A, analyse base) | Version alpha |
| 3 | Intégration API devis + UX | Version bêta |
| 4 | Tests + Pitch final+ ajustements | Démo + rapport |

## Équipes

- **1 à 3 personnes au maximum**

### Compétences recommandées :
- 1 Dev backend
- 1 Spécialiste IA / NLP
- 1 UX ou intégrateur API

## Critères d'évaluation

| Critère | Pondération |
|---------|-------------|
| Fonctionnalités remplies et qualité des réponses | 50% |
| Qualité de l'UX | 10% |
| Documentation et code | 15% |
| Présentation finale | 15% |
| Bonus techniques ou innovants | 10% |

## Optionnel : Bonus et extensions

- Gestion de contexte (ex : retour sur une discussion précédente).
- Personnalisation des réponses selon le profil du client (âge, historique).
- Système de feedback utilisateur (notation des réponses, bouton "pas clair").
- Fonction "historique utilisateur".