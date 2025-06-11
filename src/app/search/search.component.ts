import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie',
  imports: [MatTableModule, MatButtonModule, CommonModule, RouterLink, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  displayedColumns: string[] = ['id', 'title', 'director', 'releaseDate', 'genre', 'actions'];
  dataSource: MovieModel[] = MovieService.getMovies();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource = this.dataSource.filter(movie =>
      movie.title.toLowerCase().includes(filterValue) ||
      movie.director.toLowerCase().includes(filterValue) ||
      movie.genre.includes(filterValue) ||
      movie.releaseDate.toString().toLowerCase().includes(filterValue)
    );
    if(!filterValue){
      this.dataSource = MovieService.getMovies();
    }
  }
}