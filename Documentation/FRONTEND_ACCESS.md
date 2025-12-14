# 🌐 Comment Accéder au Frontend

## Option 1: Ouvrir directement le fichier HTML (Le plus simple)

### Depuis Windows:
1. Ouvrir l'explorateur de fichiers
2. Naviguer vers: `\\wsl.localhost\Ubuntu\home\juvitry\hack_the_fork\frontend`
3. Double-cliquer sur `index.html`

### Depuis WSL/Terminal:
```bash
cd /home/juvitry/hack_the_fork
xdg-open frontend/index.html
```

## Option 2: Serveur HTTP avec Python (Recommandé)

```bash
cd /home/juvitry/hack_the_fork/frontend
python3 -m http.server 8080
```

Puis ouvrir dans le navigateur: **http://localhost:8080**

## Option 3: Serveur HTTP avec Node.js

### Installation (une seule fois):
```bash
npm install -g http-server
```

### Lancement:
```bash
cd /home/juvitry/hack_the_fork/frontend
http-server -p 8080
```

Puis ouvrir: **http://localhost:8080**

## Option 4: Extension VSCode Live Server

1. Installer l'extension "Live Server" dans VSCode
2. Ouvrir `frontend/index.html` dans VSCode
3. Clic droit → "Open with Live Server"

---

## ✅ Vérification

Une fois le frontend ouvert, vous devriez voir:
- 🌱 **Hack the Fork** - Logo et titre
- Zone d'upload d'image de menu
- Formulaire de saisie manuelle
- Interface moderne avec dégradé violet

## 🔗 Backend requis

**Important:** Le backend doit être démarré pour que l'application fonctionne:

```bash
cd /home/juvitry/hack_the_fork/backend
npm run dev
```

Le backend tourne sur: **http://localhost:3000**

## 🎨 Nouvelles Fonctionnalités Frontend

Le frontend affiche maintenant:
- ✅ Alternative végétale
- ✅ Comparaison nutritionnelle avec graphiques
- ✅ Impact environnemental (CO2)
- ✅ Impact économique (coûts)
- ✅ Score global
- ✅ **Fournisseurs B2B recommandés** (NOUVEAU!)
  - Nom et type du fournisseur
  - Spécialités et marques disponibles
  - Informations de livraison
  - Contacts (site web, téléphone, email)
  - Explication de la pertinence
- ✅ Recommandations

## 📱 Test Rapide

1. Ouvrir le frontend
2. Entrer un plat: "Poulet rôti"
3. Cliquer sur "Analyser"
4. Attendre 5-10 secondes
5. Voir les résultats avec les fournisseurs!

---

**Besoin d'aide?** Consultez `INSTALLATION_GUIDE.md` ou `TROUBLESHOOTING.md`
