import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { R } from '@angular/cdk/keycodes';
import { MatMenu } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    MatTableModule, MatButtonModule, CommonModule, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatExpansionModule, FormsModule, ReactiveFormsModule, MatMenuModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  currentUser: any;
  displayedColumns: string[] = ['id', 'title', 'director', 'releaseDate', 'genre', 'actions'];
  allMovies: MovieModel[] = MovieService.getMovies();
  dataSource: MovieModel[] = this.allMovies;
  
  // Filter properties
  titleFilter: string = '';
  descriptionFilter: string = '';
  genreFilter: string[] = [];
  directorFilter: string = '';
  actorFilter: string = '';
  minDurationFilter: number | null = null;
  maxDurationFilter: number | null = null;
  releaseDateFilter: Date | null = null;
  screeningDateFilter: Date | null = null;
  minPriceFilter: number | null = null;
  maxPriceFilter: number | null = null;
  minRatingFilter: number | null = null;

  genreList: string[] = MovieService.getGenres();
// Add constructor
  constructor(private router: Router) {}
  
  // Add ngOnInit
  ngOnInit() {
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
  
  
  applyQuickFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (!filterValue) {
      this.dataSource = this.allMovies;
      return;
    }
    
    this.dataSource = this.allMovies.filter(movie =>
      movie.title.toLowerCase().includes(filterValue) ||
      movie.director.toLowerCase().includes(filterValue) ||
      movie.genre.some(g => g.toLowerCase().includes(filterValue)) ||
      movie.releaseDate.toString().toLowerCase().includes(filterValue)
    );
  }


  applyDetailedFilters() {
    let filteredMovies = this.allMovies;
    

    if (this.titleFilter) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.title.toLowerCase().includes(this.titleFilter.toLowerCase()));
    }
    

    if (this.descriptionFilter) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.description.toLowerCase().includes(this.descriptionFilter.toLowerCase()));
    }

    if (this.genreFilter && this.genreFilter.length > 0) {
      filteredMovies = filteredMovies.filter(movie => 
        // Check if ALL of the selected genres match any of the movie's genres
        this.genreFilter.every(selectedGenre => 
          movie.genre.some(movieGenre => 
            movieGenre.toLowerCase() === selectedGenre.toLowerCase()
          )
        )
      );
    }
        

    if (this.directorFilter) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.director.toLowerCase().includes(this.directorFilter.toLowerCase()));
    }
    

    if (this.actorFilter) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.cast.some(actor => actor.toLowerCase().includes(this.actorFilter.toLowerCase())));
    }
    

    if (this.minDurationFilter !== null) {
      filteredMovies = filteredMovies.filter(movie => movie.duration >= this.minDurationFilter!);
    }
    if (this.maxDurationFilter !== null) {
      filteredMovies = filteredMovies.filter(movie => movie.duration <= this.maxDurationFilter!);
    }
    
    if (this.releaseDateFilter) {
      const filterDate = new Date(this.releaseDateFilter);
      filteredMovies = filteredMovies.filter(movie => {
        const releaseDate = new Date(movie.releaseDate);
        return releaseDate.getFullYear() === filterDate.getFullYear() && 
               releaseDate.getMonth() === filterDate.getMonth() && 
               releaseDate.getDate() === filterDate.getDate();
      });
    }
    

    if (this.screeningDateFilter) {
      const filterDate = new Date(this.screeningDateFilter);
      filteredMovies = filteredMovies.filter(movie => 
        movie.screenings.some(screening => {
          const screeningDate = new Date(screening.date);
          return screeningDate.getFullYear() === filterDate.getFullYear() && 
                 screeningDate.getMonth() === filterDate.getMonth() && 
                 screeningDate.getDate() === filterDate.getDate();
        })
      );
    }

    
    if (this.minPriceFilter !== null) {
      filteredMovies = filteredMovies.filter(movie => movie.price >= this.minPriceFilter!);
    }
    if (this.maxPriceFilter !== null) {
      filteredMovies = filteredMovies.filter(movie => movie.price <= this.maxPriceFilter!);
    }
  

  if (this.minRatingFilter !== null) {
    filteredMovies = filteredMovies.filter(movie => 
      movie.averageRating !== undefined && 
      movie.averageRating !== null && 
      movie.averageRating >= this.minRatingFilter!);
  }
      
    this.dataSource = filteredMovies;
  }
 

  resetFilters() {
    this.titleFilter = '';
    this.descriptionFilter = '';
    this.genreFilter = [];
    this.directorFilter = '';
    this.actorFilter = '';
    this.minDurationFilter = null;
    this.maxDurationFilter = null;
    this.releaseDateFilter = null;
    this.screeningDateFilter = null;
    this.minPriceFilter = null;
    this.maxPriceFilter = null;
    this.minRatingFilter = null;
    this.dataSource = this.allMovies;
  }
}