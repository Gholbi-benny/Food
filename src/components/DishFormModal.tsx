import { useState } from 'react';
import { supabase } from '../services/supabaseClient';

interface Dish {
  id: number;
  nom: string;
  description: string;
  Prix: number;
  category?: string | null;
  photo_url?: string | null;
}

interface DishFormModalProps {
  restaurantId: number;
  dish: Dish | null;
  onClose: () => void;
  onSaved: () => void;
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function IconImage() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

function DishFormModal({ restaurantId, dish, onClose, onSaved }: DishFormModalProps) {
  const [nom, setNom] = useState(dish?.nom ?? '');
  const [description, setDescription] = useState(dish?.description ?? '');
  const [prix, setPrix] = useState(dish?.Prix?.toString() ?? '');
  const [category, setCategory] = useState(dish?.category ?? '');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(dish?.photo_url ?? null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nom.trim() || !prix) {
      setError('Le nom et le prix sont obligatoires.');
      return;
    }

    setSaving(true);

    let photoUrl = dish?.photo_url ?? null;

    if (photoFile) {
      const fileExt = photoFile.name.split('.').pop();
      const filePath = `${restaurantId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('dish-photos')
        .upload(filePath, photoFile, { upsert: false });

      if (uploadError) {
        setError("Erreur lors de l'envoi de la photo.");
        setSaving(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('dish-photos')
        .getPublicUrl(filePath);

      photoUrl = publicUrlData.publicUrl;
    }

    const payload = {
      nom: nom.trim(),
      description: description.trim(),
      Prix: Number(prix),
      category: category.trim() || null,
      photo_url: photoUrl,
      restaurant_id: restaurantId,
    };

    const { error: saveError } = dish
      ? await supabase.from('Plats').update(payload).eq('id', dish.id)
      : await supabase.from('Plats').insert(payload);

    setSaving(false);

    if (saveError) {
      setError("Erreur lors de l'enregistrement du plat.");
      return;
    }

    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {dish ? 'Modifier le plat' : 'Ajouter un plat'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <IconX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500 block mb-2">
              Photo
            </label>
            <label className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 cursor-pointer overflow-hidden hover:border-orange-400 transition-colors">
              {photoPreview ? (
                <img src={photoPreview} alt="Aperçu du plat" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-1.5 text-gray-400">
                  <IconImage />
                  <span className="text-xs">Ajouter une photo</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </label>
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500 block mb-1.5">
              Nom du plat *
            </label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex : Chawarma poulet"
              className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
            />
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500 block mb-1.5">
              Catégorie
            </label>
            <input
              type="text"
              value={category ?? ''}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ex : Sandwich, Dessert, Boisson..."
              className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
            />
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500 block mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Décrivez le plat en quelques mots..."
              className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500 block mb-1.5">
              Prix (FCFA) *
            </label>
            <input
              type="number"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              placeholder="Ex : 3500"
              className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DishFormModal;