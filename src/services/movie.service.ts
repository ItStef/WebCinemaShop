import { MovieModel } from "../models/movie.model"; 
import { ScreeningModel } from "../models/movie.model";

export class MovieService { 

    static getMovies(): MovieModel[] {
        return [
                {
                    id: '1',
                    title: 'Inception',
                    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
                    genre: ['Sci-Fi'],
                    duration: 148,
                    director: 'Christopher Nolan',
                    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
                    releaseDate: new Date('2010-07-16'),
                    screenings: [
                        {
                            id: '1',
                            movieId: '1',
                            date: new Date('2023-10-01'),
                            time: '18:00',
                            hall: '1',
                            price: 10.99,
                            availableSeats: 100
                        }
                    ],
                    averageRating: 8.8,
                    reviews: [
                        {
                            id: '1',
                            userId: '1',
                            movieId: '1',
                            rating: 5,
                            comment: 'Amazing movie with a mind-bending plot!',
                            userName: 'John Doe',
                            createdAt: new Date('2023-10-01T12:00:00Z')
                        }
                    ],
                    price: 100
                },

            ]

    }

    static getMovieById(id: string): MovieModel | null {
        return this.getMovies().find(movie => movie.id === id) || null;
    }

}