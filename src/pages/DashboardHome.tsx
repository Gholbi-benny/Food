import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import DishFormModal from '../components/DishFormModal';

interface RestaurantData {
  id: number;
  name: string;
  address: string;
  neighborhood: string;
  phone: string;
  phones: string[] | null;
  hours: string;
  category: string;
  verified: boolean;
  logo: string | null;
}

interface Dish {
  id: number;
  nom: string;
  description: string;
  Prix: number;
  category?: string | null;
  photo_url?: string | null;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

function IconEye() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 12s4-7 10.5-7 10.5 7 10.5 7-4 7-10.5 7-10.5-7-10.5-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconMenuBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5V4.5Z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    </svg>
  );
}

function IconMessage() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function IconPencil() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2Z" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

const tabs = [
  { id: 'infos', label: 'Informations' },
  { id: 'menu', label: 'Menu' },
  { id: 'stats', label: 'Statistiques' },
] as const;

function DashboardHome() {
  const [activeTab, setActiveTab] = useState<'infos' | 'menu' | 'stats'>('infos');
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const navigate = useNavigate();

  // Champs du formulaire Informations
  const [formName, setFormName] = useState('');
  const [formNeighborhood, setFormNeighborhood] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formPhones, setFormPhones] = useState<string[]>(['']);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState('');

  const loadDishes = async (restaurantId: number) => {
    const { data: dishesData } = await supabase
      .from('Plats')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('id', { ascending: false });

    if (dishesData) setDishes(dishesData);
  };

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
        setFormName(restaurantData.name ?? '');
        setFormNeighborhood(restaurantData.neighborhood ?? '');
        setFormAddress(restaurantData.address ?? '');
        setLogoPreview(restaurantData.logo ?? null);
        const initialPhones = restaurantData.phones && restaurantData.phones.length > 0
          ? restaurantData.phones
          : restaurantData.phone
          ? [restaurantData.phone]
          : [''];
        setFormPhones(initialPhones);
        await loadDishes(restaurantData.id);
      }

      setLoading(false);
    }

    loadData();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/dashboard/login');
  };

  const openAddDish = () => {
    setEditingDish(null);
    setModalOpen(true);
  };

  const openEditDish = (dish: Dish) => {
    setEditingDish(dish);
    setModalOpen(true);
  };

  const handleDeleteDish = async (dishId: number) => {
    const confirmed = window.confirm('Supprimer ce plat définitivement ?');
    if (!confirmed) return;

    await supabase.from('Plats').delete().eq('id', dishId);
    if (restaurant) await loadDishes(restaurant.id);
  };

  const handleDishSaved = async () => {
    setModalOpen(false);
    setEditingDish(null);
    if (restaurant) await loadDishes(restaurant.id);
  };

  const handlePhoneChange = (index: number, value: string) => {
    setFormPhones((prev) => prev.map((p, i) => (i === index ? value : p)));
  };

  const addPhoneField = () => {
    setFormPhones((prev) => [...prev, '']);
  };

  const removePhoneField = (index: number) => {
    setFormPhones((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurant) return;

    setProfileError('');
    setProfileSaved(false);
    setSavingProfile(true);

    const cleanedPhones = formPhones.map((p) => p.trim()).filter((p) => p.length > 0);

    let logoUrl = restaurant.logo ?? null;

    if (logoFile) {
      const fileExt = logoFile.name.split('.').pop();
      const filePath = `${restaurant.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('restaurant-photos')
        .upload(filePath, logoFile, { upsert: false });

      if (uploadError) {
        setProfileError("Erreur lors de l'envoi de la photo.");
        setSavingProfile(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('restaurant-photos')
        .getPublicUrl(filePath);

      logoUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase
      .from('restaurants')
      .update({
        name: formName.trim(),
        neighborhood: formNeighborhood.trim(),
        address: formAddress.trim(),
        phones: cleanedPhones,
        phone: cleanedPhones[0] ?? '',
        logo: logoUrl,
      })
      .eq('id', restaurant.id);

    setSavingProfile(false);

    if (error) {
      setProfileError("Erreur lors de l'enregistrement du profil.");
      return;
    }

    setRestaurant({
      ...restaurant,
      name: formName.trim(),
      neighborhood: formNeighborhood.trim(),
      address: formAddress.trim(),
      phones: cleanedPhones,
      phone: cleanedPhones[0] ?? '',
      logo: logoUrl,
    });
    setFormPhones(cleanedPhones.length > 0 ? cleanedPhones : ['']);
    setLogoFile(null);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-orange-500 text-white font-bold text-base sm:text-lg shrink-0 overflow-hidden">
              {restaurant.logo ? (
                <img src={restaurant.logo} alt={restaurant.name} className="w-full h-full object-cover" />
              ) : (
                getInitials(restaurant.name)
              )}
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                {restaurant.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                Espace de gestion restaurateur
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="self-start sm:self-auto inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs sm:text-sm font-medium border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-transparent px-3 sm:px-4 py-2 rounded-lg transition-colors"
          >
            <IconLogout />
            Se déconnecter
          </button>
        </header>

        {/* Tabs */}
        <div className="inline-flex w-full sm:w-auto flex-wrap gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl mb-6 sm:mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-800 text-orange-500 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'infos' && (
          <form
            onSubmit={handleSaveProfile}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-5 sm:p-7 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pb-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Informations du restaurant
              </h2>
              {restaurant.verified ? (
                <span className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Restaurant vérifié
                </span>
              ) : (
                <span className="self-start sm:self-auto bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                  En attente de vérification
                </span>
              )}
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500 block mb-2">
                Photo du restaurant
              </label>
              <label className="flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 cursor-pointer overflow-hidden hover:border-orange-400 transition-colors">
                {logoPreview ? (
                  <img src={logoPreview} alt="Aperçu du restaurant" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1.5 text-gray-400">
                    <IconCamera />
                    <span className="text-xs">Ajouter une photo</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
              </label>
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500 block mb-1.5">Nom</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500 block mb-1.5">
                  Quartier
                </label>
                <input
                  type="text"
                  value={formNeighborhood}
                  onChange={(e) => setFormNeighborhood(e.target.value)}
                  placeholder="Ex : Bacongo"
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500 block mb-1.5">
                  Adresse
                </label>
                <input
                  type="text"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  placeholder="Ex : Avenue de la Paix"
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500 block mb-2">
                Numéros de téléphone
              </label>
              <div className="space-y-2">
                {formPhones.map((phoneValue, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <IconPhone />
                      </span>
                      <input
                        type="tel"
                        value={phoneValue}
                        onChange={(e) => handlePhoneChange(index, e.target.value)}
                        placeholder="+242 06 123 4567"
                        className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
                      />
                    </div>
                    {formPhones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePhoneField(index)}
                        className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-gray-800 transition-colors"
                        title="Supprimer ce numéro"
                      >
                        <IconTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addPhoneField}
                className="mt-2.5 inline-flex items-center gap-1.5 text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors"
              >
                <IconPlus />
                Ajouter un numéro
              </button>
            </div>

            {profileError && <p className="text-red-500 text-sm">{profileError}</p>}
            {profileSaved && (
              <p className="text-green-600 dark:text-green-400 text-sm">
                Profil enregistré avec succès.
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={savingProfile}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm shadow-orange-500/20 disabled:opacity-50"
              >
                {savingProfile ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        )}

        {activeTab === 'menu' && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 pb-4 border-b border-gray-100 dark:border-gray-800 mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Votre menu
              </h2>
              <button
                onClick={openAddDish}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm shadow-orange-500/20"
              >
                <IconPlus />
                Ajouter un plat
              </button>
            </div>

            {dishes.length === 0 ? (
              <div className="text-center py-10">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 mb-3">
                  <IconMenuBook />
                </div>
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  Aucun plat ajouté pour l'instant.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 sm:p-3.5 flex items-center gap-3 sm:gap-4 border border-gray-100 dark:border-transparent hover:border-orange-200 dark:hover:border-gray-700 transition-colors"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0 flex items-center justify-center text-gray-400">
                      {dish.photo_url ? (
                        <img src={dish.photo_url} alt={dish.nom} className="w-full h-full object-cover" />
                      ) : (
                        <IconMenuBook />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {dish.category && (
                        <span className="inline-block text-[11px] text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full mb-1">
                          {dish.category}
                        </span>
                      )}
                      <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base truncate">{dish.nom}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm truncate">
                        {dish.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-orange-500 font-bold text-sm sm:text-base whitespace-nowrap">
                        {dish.Prix.toLocaleString()} FCFA
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => openEditDish(dish)}
                          className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors"
                          title="Modifier"
                        >
                          <IconPencil />
                        </button>
                        <button
                          onClick={() => handleDeleteDish(dish.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
                          title="Supprimer"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-5 sm:p-7">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-5 sm:mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              Ce mois-ci
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-transparent">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center mb-3">
                  <IconEye />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">0</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
                  Personnes ont découvert votre restaurant
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-transparent">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center mb-3">
                  <IconMenuBook />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">0</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
                  Personnes ont consulté votre menu
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-transparent">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center mb-3">
                  <IconMessage />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">0</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
                  Personnes vous ont contacté
                </p>
              </div>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-5 text-center">
              Les statistiques réelles seront disponibles une fois la
              plateforme connectée à la base de données.
            </p>
          </div>
        )}
      </div>

      {modalOpen && restaurant && (
        <DishFormModal
          restaurantId={restaurant.id}
          dish={editingDish}
          onClose={() => setModalOpen(false)}
          onSaved={handleDishSaved}
        />
      )}
    </div>
  );
}

export default DashboardHome;