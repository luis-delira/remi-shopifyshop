export type CategorySlug =
  | 'oxigenoterapia'
  | 'apnea-del-sueno'
  | 'ortopedia'
  | 'equipo-medico'
  | 'reguladores'
  | 'renta';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: CategorySlug;
  price: number;
  priceTo?: number;
  image: string;
  badge?: string;
  description: string;
}
