const benefits = [
  'Plus de visibilité auprès des habitants et visiteurs de Brazzaville.',
  'Une présentation professionnelle de votre établissement.',
  'Des menus toujours à jour, gérés simplement avec vous.',
  'Mise en avant de vos nouveautés et de vos plats phares.',
  'Un badge "Restaurant vérifié" qui inspire confiance.',
  'Une présence sur la première plateforme dédiée aux restaurants de Brazzaville.',
];

function WhyJoin() {
  return (
    <section className="px-6 py-16 bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
          Pourquoi rejoindre <span className="text-orange-500">Food</span> ?
        </h2>
        <p className="text-gray-400 text-center mb-10">
          Une opportunité pour les restaurants de Brazzaville de se faire
          connaître.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-start gap-3 bg-gray-800 rounded-lg p-4"
            >
              <span className="text-orange-500 text-xl leading-none">✓</span>
              <p className="text-gray-200 text-sm">{benefit}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="mailto:contact@food.cg" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-colors">
            Devenir restaurant partenaire
          </a>
        </div>
      </div>
    </section>
  );
}

export default WhyJoin;