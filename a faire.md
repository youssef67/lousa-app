# Points à revoir ou améliorer dans le composant NuxtJS

## 1. Rafraîchissement forcé de `onMounted`
- **Problème** : Lors de la connexion de son compte spotify, la session ne se se met pas jour avec (`refreshUserSession`), me force a revenir sur la page `MyAccount` et revenir sur `streamer`.
- **À revoir** : vérifier quel est la meilleur méthode pour palier au problème.

## 2. Gestion des sessions pour spotify
- **Problème** : Je conserve les accessToken et les refreshToken dans la session pour Spotify
- **À revoir** : Faut il conserver uniquement l'id de l'utilisateur et rechercher en base de données le token

## 2. Appel 2 fois de la fonction loginTwitch
- **Problème** : Quand j'ai un  utilisateur spotify, il y a 2 appels qui se font
- **À revoir** : l'appel fetch

