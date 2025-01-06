# Points à revoir ou améliorer dans le composant NuxtJS

## 1. Rafraîchissement forcé de `onMounted`
- **Problème** : Lors de la connexion de son compte spotify, la session ne se se met pas jour avec (`refreshUserSession`), me force a revenir sur la page `MyAccount` et revenir sur `streamer`.
- **À revoir** : vérifier quel est la meilleur méthode pour palier au problème.
