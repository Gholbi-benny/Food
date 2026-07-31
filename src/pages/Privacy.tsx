function Privacy() {
  return (
    <div className="px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto text-gray-900 dark:text-white">
        <h1 className="text-2xl sm:text-4xl font-bold text-orange-500 mb-2">
          Politique de Confidentialité
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mb-8 sm:mb-10">
          Dernière mise à jour : juillet 2026
        </p>

        <div className="space-y-6 sm:space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              1. Données collectées
            </h2>
            <p>
              éssika eat collecte uniquement les données nécessaires au bon
              fonctionnement de la plateforme :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                Pour les visiteurs : aucune donnée personnelle n'est
                collectée lors de la simple consultation du site.
              </li>
              <li>
                Pour les restaurants partenaires : adresse email et mot de
                passe (chiffré) permettant l'accès à l'espace de gestion, en
                complément des informations publiques du restaurant (nom,
                adresse, téléphone, menu).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              2. Utilisation des données
            </h2>
            <p>
              Les données collectées servent exclusivement à :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Permettre l'accès sécurisé à l'espace restaurateur ;</li>
              <li>
                Afficher les informations du restaurant sur la plateforme
                publique ;
              </li>
              <li>
                Améliorer le fonctionnement et la pertinence du service.
              </li>
            </ul>
            <p className="mt-2">
              éssika eat ne vend ni ne partage ces données avec des tiers à des
              fins commerciales.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              3. Stockage et sécurité
            </h2>
            <p>
              Les données sont hébergées via des services tiers sécurisés
              (Supabase). Les mots de passe sont stockés de manière chiffrée
              et ne sont jamais accessibles en clair, y compris par
              l'équipe éssika eat.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              4. Durée de conservation
            </h2>
            <p>
              Les données d'un restaurant partenaire sont conservées tant
              que le partenariat est actif. Un restaurant peut demander la
              suppression de ses données à tout moment en contactant
              l'équipe éssika eat.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              5. Droits des utilisateurs
            </h2>
            <p>
              Tout restaurant partenaire peut demander à consulter,
              corriger ou supprimer les données le concernant en contactant
              l'équipe éssika eat via la page{' '}
              <a href="/about" className="text-orange-400 hover:underline">
                À propos
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              6. Cookies
            </h2>
            <p>
              La plateforme éssika eat n'utilise pas, à ce jour, de cookies de
              suivi publicitaire. Des cookies techniques strictement
              nécessaires au fonctionnement du site peuvent être utilisés.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;