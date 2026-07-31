import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 py-16 sm:py-20 text-center overflow-hidden bg-white dark:bg-gray-900">
      <div className="absolute inset-0 bg-linear-to-b from-orange-500/10 via-white dark:via-gray-900 to-white dark:to-gray-900" />

      <div className="relative max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Découvrez les meilleurs restaurants de{' '}
          <span className="text-orange-500">Brazzaville</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mt-4 text-base sm:text-lg">
          Menus, prix, photos, nouveautés et restaurants vérifiés réunis sur
          une seule plateforme.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link to="/restaurants" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors">
            Explorer les restaurants
          </Link>
          <Link to="/partners" className="border border-gray-300 dark:border-gray-600 hover:border-orange-500 text-gray-700 dark:text-gray-200 font-semibold px-6 py-3 rounded-full transition-colors">
            Rejoindre la plateforme
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;