export interface ReviewModel {
  id: string;
  userId: string;
  movieId: string;
  rating: number; 
  comment: string;
  userName: string; 
  createdAt: Date;
}