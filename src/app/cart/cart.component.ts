import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { MatMenu } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatBadgeModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    RouterLink,
    MatFormField,
    MatSelectModule,
    MatLabel,
    MatMenu,
    MatMenuModule

  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  displayedColumns: string[] = ['movie', 'screening', 'price', 'quantity', 'total', 'status', 'actions'];
  movieService = MovieService;
  currentUser: any;

  constructor(private router: Router) {}


  ngOnInit() {
    this.loadCartItems();
    // Initialize current user
    this.currentUser = UserService.getActiveUser();
  }

  // Add these methods
  getUserInitials(): string {
    if (!this.currentUser) return '';
    
    const firstName = this.currentUser.firstName || '';
    const lastName = this.currentUser.lastName || '';
    
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  logout(): void {
    UserService.logout();
    this.router.navigate(['/login']);
  }
  loadCartItems(): void {
    this.cartItems = CartService.getCartItems();
    this.totalPrice = CartService.calculateTotal();
  }
  
  getStatusChipColor(status: string): string {
    switch(status) {
      case 'reserved': return 'primary';
      case 'watched': return 'accent';
      case 'canceled': return 'warn';
      default: return '';
    }
  }
  
  updateStatus(item: any, newStatus: 'reserved' | 'watched' | 'canceled'): void {
    if (CartService.changeStatus(item.id, newStatus)) {
      this.loadCartItems();
    }
  }
  
  updateQuantity(item: any, change: number): void {
    const newQuantity = Math.max(1, item.quantity + change);
    if (CartService.updateQuantity(item.id, newQuantity)) {
      this.loadCartItems();
    }
  }
  
rateMovie(item: any, rating: number): void {
  // First, update the user's rating in their cart
  if (CartService.rateMovie(item.id, rating)) {
    // Then, update the movie's overall rating
    const movieId = item.movieId;
    this.updateMovieRating(movieId);
    this.loadCartItems();
  }
}

// Add this new method to calculate and update the movie's rating
private updateMovieRating(movieId: string): void {
  const allRatings = this.getAllRatingsForMovie(movieId);
  
  if (allRatings.length > 0) {
    // Calculate average rating
    const sum = allRatings.reduce((total, rating) => total + rating, 0);
    const averageRating = sum / allRatings.length;
    
    // Update the movie's rating
    this.movieService.updateMovieRating(movieId, averageRating);
  }
}

// Helper method to get all ratings for a specific movie
private getAllRatingsForMovie(movieId: string): number[] {
  const allUsers = UserService.getAllUsers();
  const ratings: number[] = [];
  
  allUsers.forEach(user => {
    if (user.cart) {
      user.cart.forEach(item => {
        if (item.movieId === movieId && item.status === 'watched' && item.rating !== null) {
          ratings.push(item.rating);
        }
      });
    }
  });
  
  return ratings;
}
    
  removeFromCart(itemId: string): void {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      if (CartService.removeFromCart(itemId)) {
        this.loadCartItems();
      }
    }
  }
  
  formatDate(dateString: string): string {
    if (!dateString || dateString === 'Unknown') return 'Unknown';
    
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
  
  getStars(rating: number | null): number[] {
    return Array(5).fill(0).map((_, i) => (rating !== null && i < rating) ? 1 : 0);
  }
  
  hasReservedItems(): boolean {
    return this.cartItems.some(item => item.status === 'reserved');
  }
  
  checkout(): void {
    if (this.hasReservedItems()) {
      alert('Thank you for your purchase! Your tickets have been confirmed.');
      // Here you would typically process the order
      // For now, let's mark all reserved items as watched
      this.cartItems
        .filter(item => item.status === 'reserved')
        .forEach(item => CartService.changeStatus(item.id, 'watched'));
      
      this.loadCartItems();
    } else {
      alert('You have no reserved screenings to checkout.');
    }
  }


  submitRatingAndRemove(item: any, rating: number): void {
    // First, update the user's rating in their cart
    if (CartService.rateMovie(item.id, rating)) {
      // Then, get the current user
      const user = UserService.getActiveUser();
      if (!user || !user.id) return; // Check explicitly for user.id
      
      // Save the rating to persistent storage BEFORE removing from cart
      CartService.saveRatingHistory(user.id, item.movieId, rating);
      
      // Update the movie's overall rating
      const movieId = item.movieId;
      this.updateMovieRating(movieId);
      
      // Show confirmation message
      alert('Thank you for rating this movie!');
      
      // Finally, remove the item from cart
      CartService.removeFromCart(item.id);
      this.loadCartItems();
    }
  }
}