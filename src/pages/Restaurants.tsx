import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllRestaurants } from '../services/restaurantsData';
import type { Restaurant } from '../models/Restaurant';
import RestaurantCard from '../components/RestaurantCard';
import WhyFood from '../components/WhyFood';
import SearchBar from '../components/SearchBar';
import FeaturedCarousel from '../components/FeaturedCarousel';

const planOrder = { pro: 0, plus: 1, free: 2 };

function Restaurants() {
  const [query, setQuery] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRestaurants().then((data) => {
      setRestaurants(data);
      setLoading(false);
    });
  }, []);

  const filteredRestaurants = restaurants
    .filter((restaurant) => {
      const search = query.toLowerCase();
      return (
        restaurant.name.toLowerCase().includes(search) ||
        restaurant.neighborhood.toLowerCase().includes(search) ||
        restaurant.category.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      const orderA = planOrder[a.plan ?? 'free'];
      const orderB = planOrder[b.plan ?? 'free'];
      return orderA - orderB;
    });

  return (
    <div>
      <WhyFood />

      {!loading && <FeaturedCarousel restaurants={restaurants} />}

      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Nos restaurants
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-500 text-sm sm:text-base">
            Chargement des restaurants...
          </p>
        ) : (
          <>
            <SearchBar value={query} onChange={setQuery} restaurants={restaurants} />

            {filteredRestaurants.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-500 text-sm sm:text-base">
                Aucun restaurant ne correspond à ta recherche.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
                {filteredRestaurants.map((restaurant) => (
                  <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
                    <RestaurantCard restaurant={restaurant} />
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Restaurants;