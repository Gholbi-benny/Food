import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Restaurant } from '../models/Restaurant';

interface FeaturedCarouselProps {
  restaurants: Restaurant[];
}

function FeaturedCarousel({ restaurants }: FeaturedCarouselProps) {
  const featured = restaurants.filter(
    (r) => r.plan === 'pro' || r.plan === 'plus'
  );
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (featured.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % featured.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const current = featured[index];

  return (
    <section className="px-6 pb-12">
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-gray-500 text-xs uppercase tracking-wide mb-3">
          À la une
        </p>

        <div
          onClick={() => navigate(`/restaurant/${current.id}`)}
          className="relative h-44 rounded-xl overflow-hidden cursor-pointer group shadow-lg shadow-black/30"
        >
          <img
            src={current.logo}
            alt={current.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-base font-bold">{current.name}</h3>
            <p className="text-gray-300 text-xs">{current.category}</p>
          </div>
        </div>

        {featured.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {featured.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-4 bg-orange-500' : 'w-1.5 bg-gray-700'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedCarousel;