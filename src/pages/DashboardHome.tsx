import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

interface RestaurantData {
  id: number;
  name: string;
  address: string;
  neighborhood: string;
  phone: string;
  hours: string;
  category: string;
  verified: boolean;
}

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
}

function DashboardHome() {
  const [activeTab, setActiveTab] = useState<'infos' | 'menu' | 'stats'>('infos');
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/dashboard/login');
        return;
      }

      const { data: restaurantData } = await supabase
        .from('restaurants')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (restaurantData) {
        setRestaurant(restaurantData);

        const { data: dishesData } = await supabase
          .from('Plats')
          .select('*')
          .eq('restaurant_id', restaurantData.id);

        if (dishesData) setDishes(dishesData);
      }

      setLoading(false);
    }

    loadData();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/dashboard/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Chargement...
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Aucun restaurant associé à ce compte.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Bonjour, {restaurant.name} 👋
            </h1>
            <p className="text-gray-400 mt-1">
              Gérez votre présence sur Éssika depuis cet espace.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white text-sm border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-lg transition-colors"
          >
            Se déconnecter
          </button>
        </header>

        <div className="flex gap-2 border-b border-gray-800 mb-8">
          <button
            onClick={() => setActiveTab('infos')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'infos'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Informations
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'menu'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'stats'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Statistiques
          </button>
        </div>

        {activeTab === 'infos' && (
          <div className="bg-gray-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">
                Informations du restaurant
              </h2>
              {restaurant.verified ? (
                <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                  ✓ Restaurant vérifié
                </span>
              ) : (
                <span className="bg-gray-700 text-gray-400 text-xs font-semibold px-3 py-1 rounded-full">
                  En attente de vérification
                </span>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Nom</label>
              <input
                type="text"
                defaultValue={restaurant.name}
                className="w-full bg-gray-900 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                Adresse
              </label>
              <input
                type="text"
                defaultValue={`${restaurant.address}, ${restaurant.neighborhood}`}
                className="w-full bg-gray-900 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                Téléphone
              </label>
              <input
                type="text"
                defaultValue={restaurant.phone}
                className="w-full bg-gray-900 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
              Enregistrer
            </button>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                Votre menu
              </h2>
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                + Ajouter un plat
              </button>
            </div>

            {dishes.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Aucun plat ajouté pour l'instant.
              </p>
            ) : (
              <div className="space-y-3">
                {dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-gray-900 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-white font-medium">{dish.name}</p>
                      <p className="text-gray-400 text-sm">
                        {dish.description}
                      </p>
                    </div>
                    <span className="text-orange-400 font-bold">
                      {dish.price.toLocaleString()} FCFA
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              Ce mois-ci
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-900 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-orange-500">0</p>
                <p className="text-gray-400 text-sm mt-1">
                  Personnes ont découvert votre restaurant
                </p>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-orange-500">0</p>
                <p className="text-gray-400 text-sm mt-1">
                  Personnes ont consulté votre menu
                </p>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-orange-500">0</p>
                <p className="text-gray-400 text-sm mt-1">
                  Personnes vous ont contacté
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-4 text-center">
              Les statistiques réelles seront disponibles une fois la
              plateforme connectée à la base de données.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardHome;