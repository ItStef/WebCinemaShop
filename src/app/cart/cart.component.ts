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
    MatSelectModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  displayedColumns: string[] = ['movie', 'screening', 'price', 'quantity', 'total', 'status', 'actions'];
  
  constructor() { }
  
  ngOnInit(): void {
    this.loadCartItems();
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
  
  rateMovie(cartItemId: string, rating: number): boolean {
    const user = UserService.getActiveUser();
    if (!user || !user.cart) return false;
    
    const item = user.cart.find(item => item.id === cartItemId);
    if (!item || item.status !== 'watched') return false;
    
    item.rating = Math.min(Math.max(1, rating), 10); // Ensure rating is between 1-10
    
    // Update user in storage
    UserService.updateUser(user);
    return true;
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
}