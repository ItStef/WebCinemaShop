import { MovieModel, ScreeningModel } from './movie.model';

export interface ReservationModel {
  id: string;
  userId: string;
  screeningId: string;
  movieId: string;
  status: 'reserved' | 'watched' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
  rating?: number; 
}


export interface ReservationDetailsModel {
  reservation: ReservationModel;
  movie: MovieModel;
  screening: ScreeningModel;
}