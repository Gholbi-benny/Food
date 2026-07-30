function About() {
  return (
    <div className="px-6 py-16">
      <div className="max-w-3xl mx-auto text-gray-900 dark:text-white">
        <h1 className="text-4xl font-bold mb-6">
          À propos d'<span className="text-orange-500">éssika</span>{' '}
          <span className="text-gray-900 dark:text-white">eat</span>
        </h1>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          <span className="text-orange-400 font-semibold">éssika</span>{' '}
          <span className="text-gray-900 dark:text-white font-semibold">eat</span> est
          une plateforme qui regroupe les restaurants de Brazzaville afin de
          permettre aux utilisateurs de découvrir facilement les
          restaurants, leurs menus, leurs prix et leurs nouveaux plats.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Notre objectif est de devenir la référence pour trouver où manger à
          Brazzaville, en aidant :
        </p>

        <ul className="text-gray-700 dark:text-gray-300 space-y-2 mb-6 list-disc list-inside">
          <li>
            <span className="text-orange-400">Les clients</span> à trouver un
            restaurant, comparer les prix et découvrir de nouveaux plats.
          </li>
          <li>
            <span className="text-orange-400">Les restaurants</span> à
            gagner en visibilité et attirer de nouveaux clients.
          </li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          <span className="text-orange-400">éssika</span>{' '}
          <span className="text-gray-900 dark:text-white">eat</span> est encore en construction — de nouvelles fonctionnalités
          arrivent bientôt : avis, réservations, commandes en ligne et bien
          plus, pour devenir le guide numérique de la restauration
          congolaise.
        </p>
      </div>
    </div>
  );
}

export default About;