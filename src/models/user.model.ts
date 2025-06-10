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
}