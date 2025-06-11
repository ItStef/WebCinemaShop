import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  movie: MovieModel | null = null;
  selectedScreening: any = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieId = params.get('id');
      if (movieId) {
        this.movie = MovieService.getMovieById(movieId);
      }
    });
  }

  goBackToSearch(): void {
    this.router.navigate(['/search']);
  }
  
  // Quantity control methods
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  
  increaseQuantity(): void {
    this.quantity++;
  }
  
  // Add to cart method
  addToCart(): void {
    // Check if user is logged in
    if (!UserService.getActiveUser()) {
      const goToLogin = confirm('You need to be logged in to add items to cart. Go to login page?');
      if (goToLogin) {
        this.router.navigate(['/login']);
      }
      return;
    }
    
    // Validate selection
    if (!this.selectedScreening) {
      alert('Please select a screening time');
      return;
    }
    
    // Add to cart using CartService
    const success = CartService.addToCart(
      this.movie!.id,
      this.selectedScreening.id,
      this.quantity
    );
    
    if (success) {
      const viewCart = confirm('Item added to cart! Do you want to view your cart?');
      if (viewCart) {
        this.router.navigate(['/cart']);
      } else {
        // Reset selection for another potential reservation
        this.selectedScreening = null;
        this.quantity = 1;
      }
    } else {
      alert('Failed to add item to cart. Please try again.');
    }
  }
  isLastReview(review: any): boolean {
  if (!this.movie || !this.movie.reviews) return true;
  return this.movie.reviews[this.movie.reviews.length - 1] === review;
}
}
