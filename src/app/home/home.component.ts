import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  currentUser: UserModel | null = null;
  featuredMovies: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();
    this.initializeMovies();
  }

  initializeMovies() {
    this.featuredMovies = [
      { title: 'Inception', description: MovieService.getMovieDescription('Inception') },
      { title: 'The Dark Knight', description: MovieService.getMovieDescription('The Dark Knight') },
      { title: 'Interstellar', description: MovieService.getMovieDescription('Interstellar') },
    ];
  }

  checkLoginStatus() {
    this.currentUser = UserService.getActiveUser();
    this.isLoggedIn = !!this.currentUser;
  }

  getUserInitials(): string {
    if (!this.currentUser) return '';
    
    const firstName = this.currentUser.firstName || '';
    const lastName = this.currentUser.lastName || '';
    
    if (!firstName && !lastName) return '';
    if (!lastName) return firstName.charAt(0).toUpperCase();
    
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  logout(): void {
    UserService.logout();
    this.router.navigate(['/login']);
  }
}