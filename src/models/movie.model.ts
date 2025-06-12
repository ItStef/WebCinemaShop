export interface MovieModel {
  id: string;
  title: string;
  description: string;
  genre: string[];
  duration: number;
  director: string;
  cast: string[];
  releaseDate: Date;
  screenings: ScreeningModel[];
  price: number;
  averageRating?: number;
}

export interface ScreeningModel {
  id: string;
  movieId: string;
  date: Date;
  time: string;
  hall: string;
  price: number;
  availableSeats: number;
}
