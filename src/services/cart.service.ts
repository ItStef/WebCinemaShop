import { UserService } from './user.service';
import { MovieService } from './movie.service';
import { CartItemModel } from '../models/user.model';

export class CartService {
  static addToCart(movieId: string, screeningId: string, quantity: number = 1): boolean {
    const user = UserService.getActiveUser();
    if (!user) return false;
    
    if (!user.cart) {
      user.cart = [];
    }
    
    const existingItem = user.cart.find(item => 
      item.screeningId === screeningId && item.status === 'reserved');
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItemModel = {
        id: Math.random().toString(36).substring(2, 15),
        movieId,
        screeningId,
        quantity,
        status: 'reserved',
        rating: null,
        dateAdded: new Date().toISOString()
      };
      user.cart.push(newItem);
    }
    
    UserService.updateUser(user);
    return true;
  }
  
  static removeFromCart(cartItemId: string): boolean {
    const user = UserService.getActiveUser();
    if (!user || !user.cart) return false;
    
    const initialLength = user.cart.length;
    user.cart = user.cart.filter(item => item.id !== cartItemId);
    
    if (user.cart.length === initialLength) return false;
    
    UserService.updateUser(user);
    return true;
  }
  
  static updateQuantity(cartItemId: string, quantity: number): boolean {
    const user = UserService.getActiveUser();
    if (!user || !user.cart) return false;
    
    const item = user.cart.find(item => item.id === cartItemId);
    if (!item || item.status !== 'reserved') return false;
    
    item.quantity = Math.max(1, quantity);
    
    UserService.updateUser(user);
    return true;
  }
  
  static changeStatus(cartItemId: string, status: 'reserved' | 'watched' | 'canceled'): boolean {
    const user = UserService.getActiveUser();
    if (!user || !user.cart) return false;
    
    const item = user.cart.find(item => item.id === cartItemId);
    if (!item) return false;
    
    item.status = status;
    
    UserService.updateUser(user);
    return true;
  }
  
  static rateMovie(cartItemId: string, rating: number): boolean {
    const user = UserService.getActiveUser();
    if (!user || !user.cart) return false;
    
    const item = user.cart.find(item => item.id === cartItemId);
    if (!item || item.status !== 'watched') return false;
    
    item.rating = Math.min(Math.max(1, rating), 10);
    
    UserService.updateUser(user);
    return true;
  }
  
  static getCartItems(): any[] {
    const user = UserService.getActiveUser();
    if (!user || !user.cart) return [];
    
    return user.cart.map(item => {
      const movie = MovieService.getMovieById(item.movieId);
      const screening = movie ? 
        MovieService.getScreeningById(movie, item.screeningId) : null;
      
      return {
        id: item.id,
        movieId: item.movieId,
        screeningId: item.screeningId,
        movie: movie || { title: 'Unknown Movie', id: 'default' },
        screening: screening || { price: 0, date: 'Unknown', time: 'Unknown' },
        quantity: item.quantity,
        status: item.status,
        rating: item.rating,
        total: screening ? (screening.price * item.quantity) : 0,
        tempRating: item.rating
      };
    });
  }
  
  static calculateTotal(): number {
    const cartItems = this.getCartItems();
    
    return cartItems
      .filter(item => item.status === 'reserved' || item.status === 'watched')
      .reduce((total, item) => total + item.total, 0);
  }

  static saveRatingHistory(userId: string, movieId: string, rating: number): void {
    const ratingsJson = localStorage.getItem('movieRatingsHistory') || '[]';
    const ratings = JSON.parse(ratingsJson);
    
    ratings.push({
      id: Math.random().toString(36).substring(2, 15),
      userId,
      movieId,
      rating,
      date: new Date().toISOString()
    });
    
    localStorage.setItem('movieRatingsHistory', JSON.stringify(ratings));
  }
}