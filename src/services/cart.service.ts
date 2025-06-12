import { UserService } from './user.service';
import { MovieService } from './movie.service';
import { CartItemModel } from '../models/user.model';
import { MovieModel, ScreeningModel } from '../models/movie.model';

export class CartService {
  // Add item to cart
  static addToCart(movieId: string, screeningId: string, quantity: number = 1): boolean {
    const user = UserService.getActiveUser();
    if (!user) return false;
    
    // Initialize cart if it doesn't exist
    if (!user.cart) {
      user.cart = [];
    }
    
    // Check if screening already in cart
    const existingItem = user.cart.find(item => 
      item.screeningId === screeningId && item.status === 'reserved');
    
    if (existingItem) {
      // Update quantity if already in cart
      existingItem.quantity += quantity;
    } else {
      // Create new cart item
      const newItem: CartItemModel = {
        id: Math.random().toString(36).substring(2, 15), // Simple unique ID
        movieId,
        screeningId,
        quantity,
        status: 'reserved',
        rating: null,
        dateAdded: new Date().toISOString()
      };
      user.cart.push(newItem);
    }
    
    // Update user in storage
    UserService.updateUser(user);
    return true;
  }
  
  // Remove item from cart
  static removeFromCart(cartItemId: string): boolean {
    const user = UserService.getActiveUser();
    if (!user || !user.cart) return false;
    
    const initialLength = user.cart.length;
    user.cart = user.cart.filter(item => item.id !== cartItemId);
    
    if (user.cart.length === initialLength) {
      return false; // No item was removed
    }
    
    // Update user in storage
    UserService.updateUser(user);
    return true;
  }
  
  // Update item quantity
  static updateQuantity(cartItemId: string, quantity: number): boolean {
    const user = UserService.getActiveUser();
    if (!user || !user.cart) return false;
    
    const item = user.cart.find(item => item.id === cartItemId);
    if (!item || item.status !== 'reserved') return false;
    
    item.quantity = Math.max(1, quantity); // Ensure minimum quantity of 1
    
    // Update user in storage
    UserService.updateUser(user);
    return true;
  }
  
  // Change item status
  static changeStatus(cartItemId: string, status: 'reserved' | 'watched' | 'canceled'): boolean {
    const user = UserService.getActiveUser();
    if (!user || !user.cart) return false;
    
    const item = user.cart.find(item => item.id === cartItemId);
    if (!item) return false;
    
    item.status = status;
    
    // Update user in storage
    UserService.updateUser(user);
    return true;
  }
  
  // Rate a watched movie
  static rateMovie(cartItemId: string, rating: number): boolean {
    const user = UserService.getActiveUser();
    if (!user || !user.cart) return false;
    
    const item = user.cart.find(item => item.id === cartItemId);
    if (!item || item.status !== 'watched') return false;
    
    item.rating = Math.min(Math.max(1, rating), 10); // Ensure rating is between 1-10
    
    // Update user in storage
    UserService.updateUser(user);
    return true;
  }
  
  // Get cart items with details
  static getCartItems(): any[] {
    const user = UserService.getActiveUser();
    if (!user || !user.cart) return [];
    
    return user.cart.map(item => {
      const movie = MovieService.getMovieById(item.movieId);
      let screening = null;
      
      if (movie) {
        screening = movie.screenings.find(s => s.id === item.screeningId);
      }
      
      return {
        ...item,
        movie: movie || { title: 'Unknown Movie' },
        screening: screening || { date: 'Unknown', time: 'Unknown', price: 0 },
        total: screening ? screening.price * item.quantity : 0
      };
    });
  }
  
  // Calculate total price of cart (only for reserved and watched items)
  static calculateTotal(): number {
    const cartItems = this.getCartItems();
    
    return cartItems
      .filter(item => item.status === 'reserved' || item.status === 'watched')
      .reduce((total, item) => total + item.total, 0);
  }

    // Add this method to CartService
  static saveRatingHistory(userId: string, movieId: string, rating: number): void {
    // Get existing ratings history
    const ratingsJson = localStorage.getItem('movieRatingsHistory') || '[]';
    const ratings = JSON.parse(ratingsJson);
    
    // Always add a new rating (instead of updating existing ones)
    ratings.push({
      id: Math.random().toString(36).substring(2, 15), // Add unique ID for each rating
      userId,
      movieId,
      rating,
      date: new Date().toISOString()
    });
    
    // Save back to localStorage
    localStorage.setItem('movieRatingsHistory', JSON.stringify(ratings));
  }
}
