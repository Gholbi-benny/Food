import type { Food } from './Food';

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  photos?: string[];
  address: string;
  neighborhood: string;
  phone: string;
  hours: string;
  category: string;
  menu: Food[];
}