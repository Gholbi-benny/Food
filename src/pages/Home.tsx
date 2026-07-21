import { useState } from 'react';
import { Link } from 'react-router-dom';
import { restaurants } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import SearchBar from '../components/SearchBar';

function Home() {
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
    <div className="px-6 py-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-orange-500">Food</h1>
        <p className="text-gray-400 mt-2">
          Découvrez les restaurants de Brazzaville
        </p>
      </header>

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
    </div>
  );
}

export default Home;