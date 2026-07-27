import type { Restaurant } from '../models/Restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-orange-500/20 transition-shadow">
      <div className="h-40 bg-gray-700 flex items-center justify-center text-gray-500">
        {restaurant.logo ? (
          <img
            src={restaurant.logo}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>Pas de photo</span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
          {restaurant.verified && (
            <span
              title="Restaurant vérifié"
              className="flex items-center justify-center w-4 h-4 bg-green-500 rounded-full flex-shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5">
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
        <p className="text-sm text-orange-400">{restaurant.category}</p>
        <p className="text-gray-400 text-sm mt-2 line-clamp-2 min-h-[2.5rem]">{restaurant.description}</p>

        <div className="mt-4 text-sm text-gray-300 space-y-1">
          <p>📍 {restaurant.neighborhood} — {restaurant.address}</p>
          <p>🕒 {restaurant.hours}</p>
          <p>📞 {restaurant.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;