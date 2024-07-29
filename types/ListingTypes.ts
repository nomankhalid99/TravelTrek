export interface ListingProps {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  price: string;
  duration: string;
  location: string;
  category: string;
}

export interface GrpListingProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
}