import { supabase } from './supabaseClient';
import { restaurants as staticRestaurants } from '../data/restaurants';
import type { Restaurant } from '../models/Restaurant';

export async function getAllRestaurants(): Promise<Restaurant[]> {
  const { data: supabaseRestaurants } = await supabase
    .from('public_restaurants')
    .select('*');

  const { data: supabaseDishes } = await supabase
    .from('public_dishes')
    .select('*');

  const mapped: Restaurant[] = (supabaseRestaurants ?? []).map((r) => {
    const phoneValue =
      r.phones && r.phones.length > 0 ? r.phones.join(';') : r.phone ?? '';

    return {
      id: String(r.id),
      supabaseId: r.id,
      name: r.name,
      description: r.description ?? '',
      logo: r.logo ?? undefined,
      photos: [],
      address: r.address ?? '',
      neighborhood: r.neighborhood ?? '',
      phone: phoneValue,
      hours: r.hours ?? '',
      category: r.category ?? '',
      verified: r.verified ?? false,
      menu: (supabaseDishes ?? [])
        .filter((d) => d.restaurant_id === r.id)
        .map((d) => ({
          id: String(d.id),
          name: d.nom,
          description: d.description ?? '',
          price: d.Prix,
          image: d.photo_url ?? undefined,
          category: d.category ?? undefined,
        })),
    };
  });

  const staticFiltered = staticRestaurants.filter(
    (s) => !mapped.some((m) => m.name.toLowerCase() === s.name.toLowerCase())
  );

  return [...mapped, ...staticFiltered];
}

export async function getRestaurantById(id: string): Promise<Restaurant | undefined> {
  const all = await getAllRestaurants();
  return all.find((r) => r.id === id);
}

export async function logRestaurantEvent(
  restaurantSupabaseId: number,
  eventType: 'visit' | 'call'
) {
  await supabase.from('restaurant_events').insert({
    restaurant_id: restaurantSupabaseId,
    event_type: eventType,
  });
}