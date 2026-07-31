import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRestaurantById, logRestaurantEvent } from '../services/restaurantsData';
import type { Restaurant } from '../models/Restaurant';

function IconPhoneSmall() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2Z" />
    </svg>
  );
}

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    getRestaurantById(id).then((data) => {
      setRestaurant(data ?? null);
      if (data?.supabaseId) {
        logRestaurantEvent(data.supabaseId, 'visit');
      }
    });
  }, [id]);

  const handleCallClick = (phoneNumber: string) => {
    if (restaurant?.supabaseId) {
      logRestaurantEvent(restaurant.supabaseId, 'call');
    }
    window.location.assign(`tel:${phoneNumber.replace(/\s/g, '')}`);
  };

  if (restaurant === undefined) {
    return (
      <div className="text-gray-900 dark:text-white flex items-center justify-center py-20">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="text-gray-900 dark:text-white flex items-center justify-center py-20">
        <p>Restaurant introuvable.</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 py-8 sm:py-10 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto">
        <Link to="/restaurants" className="text-orange-400 hover:underline text-sm sm:text-base">
          ← Retour aux restaurants
        </Link>

        <div className="mt-4 sm:mt-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold">{restaurant.name}</h1>
            {restaurant.verified && (
              <span
                title="Restaurant vérifié"
                className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full shrink-0"
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
          <p className="text-orange-400 text-sm sm:text-base">{restaurant.category}</p>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">{restaurant.description}</p>

          <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-start gap-3 bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
              <span className="flex items-center justify-center w-9 h-9 bg-orange-500/10 rounded-full text-lg shrink-0">
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
              <span className="flex items-center justify-center w-9 h-9 bg-orange-500/10 rounded-full text-lg shrink-0">
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
              <span className="flex items-center justify-center w-9 h-9 bg-orange-500/10 rounded-full text-lg shrink-0">
                📞
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Téléphone</p>
                <div className="space-y-1.5">
                  {restaurant.phone.split(';').map((line, i) => {
                    const trimmed = line.trim();
                    return (
                      <button
                        key={i}
                        onClick={() => handleCallClick(trimmed)}
                        className="flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
                      >
                        <IconPhoneSmall />
                        {trimmed}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">Menu</h2>
          <div className="space-y-3">
            {restaurant.menu.map((food) => (
              <div
                key={food.id}
                className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 hover:bg-gray-200 dark:hover:bg-gray-800/80 hover:border-orange-500/30 border border-transparent transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 sm:pr-4">
                  {food.image && (
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                  )}
                  <div>
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
                </div>
                <span className="self-start sm:self-auto bg-orange-500/10 text-orange-400 font-bold whitespace-nowrap px-3 py-1.5 rounded-lg">
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