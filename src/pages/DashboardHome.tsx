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
      <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-white">
        Chargement...
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-white">
        Aucun restaurant associé à ce compte.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Bonjour, {restaurant.name} 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
              Gérez votre présence sur Éssika depuis cet espace.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="self-start sm:self-auto text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs sm:text-sm border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors"
          >
            Se déconnecter
          </button>
        </header>

        <div className="flex gap-1 sm:gap-2 border-b border-gray-200 dark:border-gray-800 mb-6 sm:mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('infos')}
            className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium whitespace-nowrap transition-colors ${
              activeTab === 'infos'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Informations
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium whitespace-nowrap transition-colors ${
              activeTab === 'menu'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium whitespace-nowrap transition-colors ${
              activeTab === 'stats'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Statistiques
          </button>
        </div>

        {activeTab === 'infos' && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Informations du restaurant
              </h2>
              {restaurant.verified ? (
                <span className="self-start sm:self-auto bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                  ✓ Restaurant vérifié
                </span>
              ) : (
                <span className="self-start sm:self-auto bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-semibold px-3 py-1 rounded-full">
                  En attente de vérification
                </span>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">Nom</label>
              <input
                type="text"
                defaultValue={restaurant.name}
                className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-transparent rounded-lg px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                Adresse
              </label>
              <input
                type="text"
                defaultValue={`${restaurant.address}, ${restaurant.neighborhood}`}
                className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-transparent rounded-lg px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                Téléphone
              </label>
              <input
                type="text"
                defaultValue={restaurant.phone}
                className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-transparent rounded-lg px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
              Enregistrer
            </button>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Votre menu
              </h2>
              <button className="self-start sm:self-auto bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
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
                    className="bg-white dark:bg-gray-900 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 border border-gray-200 dark:border-transparent"
                  >
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base">{dish.name}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                        {dish.description}
                      </p>
                    </div>
                    <span className="text-orange-400 font-bold text-sm sm:text-base">
                      {dish.price.toLocaleString()} FCFA
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Ce mois-ci
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center border border-gray-200 dark:border-transparent">
                <p className="text-2xl sm:text-3xl font-bold text-orange-500">0</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Personnes ont découvert votre restaurant
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center border border-gray-200 dark:border-transparent">
                <p className="text-2xl sm:text-3xl font-bold text-orange-500">0</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Personnes ont consulté votre menu
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center border border-gray-200 dark:border-transparent">
                <p className="text-2xl sm:text-3xl font-bold text-orange-500">0</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
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