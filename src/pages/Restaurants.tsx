import { useState } from 'react';
import { Link } from 'react-router-dom';
import { restaurants } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import WhyFood from '../components/WhyFood';
import SearchBar from '../components/SearchBar';

function Restaurants() {
  const [query, setQuery] = useState('');

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const search = query.toLowerCase();
    return (
      restaurant.name.toLowerCase().includes(search) ||
      restaurant.neighborhood.toLowerCase().includes(search) ||
      restaurant.category.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <WhyFood />

      <section className="px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
          Nos restaurants
        </h2>

        <SearchBar value={query} onChange={setQuery} />

        {filteredRestaurants.length === 0 ? (
          <p className="text-center text-gray-500">
            Aucun restaurant ne correspond à ta recherche.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredRestaurants.map((restaurant) => (
              <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
                <RestaurantCard restaurant={restaurant} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Restaurants;