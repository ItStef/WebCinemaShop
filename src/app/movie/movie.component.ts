import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  imports: [MatTableModule, MatButtonModule, CommonModule, RouterLink],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  displayedColumns: string[] = ['id', 'title', 'director', 'releaseDate', 'genre', 'actions'];
  dataSource: MovieModel[] = MovieService.getMovies();

}