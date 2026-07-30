import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Restaurant } from '../models/Restaurant';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  restaurants: Restaurant[];
}

const planOrder = { pro: 0, plus: 1, free: 2 };

function SearchBar({ value, onChange, restaurants }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const suggestions = [...restaurants]
    .sort((a, b) => {
      const orderA = planOrder[a.plan ?? 'free'];
      const orderB = planOrder[b.plan ?? 'free'];
      return orderA - orderB;
    })
    .slice(0, 6);

  return (
    <div className="max-w-xl mx-auto mb-10 relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        placeholder="Rechercher un restaurant, un quartier, une cuisine..."
        className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
      />

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden z-10">
          <p className="text-xs text-gray-500 dark:text-gray-500 px-4 pt-3 pb-1">
            Restaurants recommandés
          </p>
          {suggestions.map((restaurant) => (
            <button
              key={restaurant.id}
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-gray-900 dark:text-white text-sm">{restaurant.name}</span>
              {restaurant.verified && (
                <span className="flex items-center justify-center w-3.5 h-3.5 bg-green-500 rounded-full flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-2 h-2">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;