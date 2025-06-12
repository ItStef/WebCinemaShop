export interface UserModel {
  id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  favoriteGenres: string[];
  cart?: CartItemModel[];
}

export interface CartItemModel {
  id: string;
  movieId: string;
  screeningId: string;
  quantity: number;
  status: 'reserved' | 'watched' | 'canceled';
  rating: number | null;
  dateAdded: string; // ISO date string
}