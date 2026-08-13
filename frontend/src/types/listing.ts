export interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  property_type: string;
  max_guests: number;
  rating: number;
  image_url: string;
  amenities: string | null;
}