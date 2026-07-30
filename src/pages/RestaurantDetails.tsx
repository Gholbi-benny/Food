import { useParams, Link } from 'react-router-dom';
import { restaurants } from '../data/restaurants';

function RestaurantDetails() {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="text-gray-900 dark:text-white flex items-center justify-center py-20">
        <p>Restaurant introuvable.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto">
        <Link to="/restaurants" className="text-orange-400 hover:underline">
          ← Retour aux restaurants
        </Link>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            {restaurant.verified && (
              <span
                title="Restaurant vérifié"
                className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full flex-shrink-0"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>
          <p className="text-orange-400">{restaurant.category}</p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{restaurant.description}</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-start gap-3 bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
              <span className="flex items-center justify-center w-9 h-9 bg-orange-500/10 rounded-full text-lg flex-shrink-0">
                📍
              </span>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-500">Adresse</p>
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {restaurant.neighborhood} — {restaurant.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
              <span className="flex items-center justify-center w-9 h-9 bg-orange-500/10 rounded-full text-lg flex-shrink-0">
                🕒
              </span>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-500">Horaires</p>
                {restaurant.hours.split(';').map((line, i) => (
                  <p key={i} className="text-sm text-gray-700 dark:text-gray-200">
                    {line.trim()}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
              <span className="flex items-center justify-center w-9 h-9 bg-orange-500/10 rounded-full text-lg flex-shrink-0">
                📞
              </span>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-500">Téléphone</p>
                {restaurant.phone.split(';').map((line, i) => (
                  <p key={i} className="text-sm text-gray-700 dark:text-gray-200">
                    {line.trim()}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Menu</h2>
          <div className="space-y-3">
            {restaurant.menu.map((food) => (
              <div
                key={food.id}
                className="bg-gray-100 dark:bg-gray-800 rounded-xl p-5 flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-800/80 hover:border-orange-500/30 border border-transparent transition-colors"
              >
                <div className="flex-1 pr-4">
                  {food.category && (
                    <span className="inline-block text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full mb-1.5">
                      {food.category}
                    </span>
                  )}
                  <h3 className="font-semibold text-gray-900 dark:text-white">{food.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    {food.description}
                  </p>
                </div>
                <span className="bg-orange-500/10 text-orange-400 font-bold whitespace-nowrap px-3 py-1.5 rounded-lg">
                  {food.price.toLocaleString()} FCFA
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;