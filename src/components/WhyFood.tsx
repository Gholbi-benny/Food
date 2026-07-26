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
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
          Pourquoi utiliser <span className="text-orange-500">Éssika</span> ?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-800/80 transition-colors"
            >
              <div className="text-4xl mb-3">{feature.emoji}</div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyFood;