import { useParams, Link } from 'react-router-dom';
import { restaurants } from '../data/restaurants';

function RestaurantDetails() {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="text-white flex items-center justify-center py-20">
        <p>Restaurant introuvable.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 text-white">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-orange-400 hover:underline">
          ← Retour aux restaurants
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <p className="text-orange-400">{restaurant.category}</p>
          <p className="text-gray-400 mt-2">{restaurant.description}</p>

          <div className="mt-4 text-sm text-gray-300 space-y-1">
            <p>📍 {restaurant.neighborhood} — {restaurant.address}</p>
            <p>🕒 {restaurant.hours}</p>
            <p>📞 {restaurant.phone}</p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Menu</h2>
          <div className="space-y-4">
            {restaurant.menu.map((food) => (
              <div
                key={food.id}
                className="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{food.name}</h3>
                  <p className="text-sm text-gray-400">{food.description}</p>
                </div>
                <span className="text-orange-400 font-bold whitespace-nowrap ml-4">
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