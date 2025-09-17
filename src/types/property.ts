export interface Property {
  id: string;
  _id?: string;
  title: string;
  location: string;
  price: string;
  type: 'sale' | 'rent';
  category?: 'residential' | 'commercial';
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  description: string;
  image?: string;
  gallery?: string[];
  amenities?: string[];
  features?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}