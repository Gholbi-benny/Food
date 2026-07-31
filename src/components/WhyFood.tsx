const features = [
  {
    emoji: '🍽️',
    title: 'Restaurants',
    description: 'Découvrez les meilleurs restaurants de Brazzaville.',
  },
  {
    emoji: '🔥',
    title: 'Nouveaux plats',
    description: 'Découvrez les dernières nouveautés des restaurants partenaires.',
  },
  {
    emoji: '✅',
    title: 'Restaurants vérifiés',
    description: 'Les informations sont validées directement avec les établissements.',
  },
  {
    emoji: '📍',
    title: 'Recherche rapide',
    description: 'Trouvez rapidement un restaurant selon vos envies.',
  },
];

function WhyFood() {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8 sm:mb-10">
          Pourquoi utiliser{' '}
          <span className="text-orange-500">éssika</span>{' '}
          <span className="text-gray-900 dark:text-white">eat</span> ?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl p-5 sm:p-6 text-center hover:bg-gray-200 dark:hover:bg-gray-800/80 transition-colors"
            >
              <div className="text-3xl sm:text-4xl mb-3">{feature.emoji}</div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-base sm:text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyFood;