import { MovieModel } from "../models/movie.model"; 
import { ScreeningModel } from "../models/movie.model";
import { UserService } from "./user.service";
import { ReviewModel } from "../models/review.model";

export class MovieService { 
    private static readonly genres: string[] = [
        'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 
        'Documentary', 'Drama', 'Family', 'Fantasy', 'Horror',
        'Musical', 'Mystery', 'Romance', 'Science Fiction', 
        'Thriller', 'War', 'Western'
    ];

    static getGenres(): string[] {
        return [...this.genres]; 
    }

    static getMovies(): MovieModel[] {
        const movies = [
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
                    price: 100
                },
            {
                    id: '2',
                    title: 'The Shawshank Redemption',
                    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
                    genre: ['Drama'],
                    duration: 142,
                    director: 'Frank Darabont',
                    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
                    releaseDate: new Date('1994-09-23'),
                    screenings: [
                        {
                            id: '2',
                            movieId: '2',
                            date: new Date('2023-10-02'),
                            time: '19:30',
                            hall: '2',
                            price: 9.99,
                            availableSeats: 80
                        }
                    ],
                    price: 95
                },
                {
                    id: '3',
                    title: 'The Dark Knight',
                    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
                    genre: ['Action', 'Crime', 'Drama'],
                    duration: 152,
                    director: 'Christopher Nolan',
                    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
                    releaseDate: new Date('2008-07-18'),
                    screenings: [
                        {
                            id: '3',
                            movieId: '3',
                            date: new Date('2023-10-03'),
                            time: '20:00',
                            hall: '1',
                            price: 11.99,
                            availableSeats: 110
                        }
                    ],
                    price: 110
                },
                {
                    id: '4',
                    title: 'Pulp Fiction',
                    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
                    genre: ['Crime', 'Drama'],
                    duration: 154,
                    director: 'Quentin Tarantino',
                    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
                    releaseDate: new Date('1994-10-14'),
                    screenings: [
                        {
                            id: '4',
                            movieId: '4',
                            date: new Date('2023-10-04'),
                            time: '21:15',
                            hall: '3',
                            price: 10.49,
                            availableSeats: 75
                        }
                    ],
                    price: 90
                },
                {
                    id: '5',
                    title: 'The Lord of the Rings: The Fellowship of the Ring',
                    description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
                    genre: ['Adventure', 'Fantasy', 'Drama'],
                    duration: 178,
                    director: 'Peter Jackson',
                    cast: ['Elijah Wood', 'Ian McKellen', 'Viggo Mortensen'],
                    releaseDate: new Date('2001-12-19'),
                    screenings: [
                        {
                            id: '5',
                            movieId: '5',
                            date: new Date('2023-10-05'),
                            time: '17:30',
                            hall: '2',
                            price: 12.99,
                            availableSeats: 90
                        }
                    ],
                    price: 120
                },
                {
                    id: '6',
                    title: 'Forrest Gump',
                    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
                    genre: ['Drama', 'Romance'],
                    duration: 142,
                    director: 'Robert Zemeckis',
                    cast: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
                    releaseDate: new Date('1994-07-06'),
                    screenings: [
                        {
                            id: '6',
                            movieId: '6',
                            date: new Date('2023-10-06'),
                            time: '16:45',
                            hall: '1',
                            price: 9.49,
                            availableSeats: 95
                        }
                    ],
                    price: 85
                },
                {
                    id: '7',
                    title: 'The Matrix',
                    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
                    genre: ['Action', 'Sci-Fi'],
                    duration: 136,
                    director: 'The Wachowskis',
                    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
                    releaseDate: new Date('1999-03-31'),
                    screenings: [
                        {
                            id: '7',
                            movieId: '7',
                            date: new Date('2023-10-07'),
                            time: '19:00',
                            hall: '3',
                            price: 10.99,
                            availableSeats: 85
                        }
                    ],
                    price: 95
                },
                {
                    id: '8',
                    title: 'Goodfellas',
                    description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.',
                    genre: ['Biography', 'Crime', 'Drama'],
                    duration: 146,
                    director: 'Martin Scorsese',
                    cast: ['Robert De Niro', 'Ray Liotta', 'Joe Pesci'],
                    releaseDate: new Date('1990-09-19'),
                    screenings: [
                        {
                            id: '8',
                            movieId: '8',
                            date: new Date('2023-10-08'),
                            time: '20:30',
                            hall: '2',
                            price: 9.99,
                            availableSeats: 70
                        }
                    ],
                 
                    price: 90
                },
                {
                    id: '9',
                    title: 'Interstellar',
                    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
                    genre: ['Adventure', 'Drama', 'Sci-Fi'],
                    duration: 169,
                    director: 'Christopher Nolan',
                    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
                    releaseDate: new Date('2014-11-07'),
                    screenings: [
                        {
                            id: '9',
                            movieId: '9',
                            date: new Date('2023-10-09'),
                            time: '18:15',
                            hall: '1',
                            price: 12.49,
                            availableSeats: 105
                        }
                    ],
                    price: 115
                },
                {
                    id: '10',
                    title: 'Fight Club',
                    description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
                    genre: ['Drama'],
                    duration: 139,
                    director: 'David Fincher',
                    cast: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter'],
                    releaseDate: new Date('1999-10-15'),
                    screenings: [
                        {
                            id: '10',
                            movieId: '10',
                            date: new Date('2023-10-10'),
                            time: '21:00',
                            hall: '10',
                            price: 10.99,
                            availableSeats: 80
                        }
                    ],
                    price: 95
                }
            ]
            return movies.map(movie => {
            return {
                ...movie,
                averageRating: this.calculateAverageRating(this.getMovieRatingsFromCarts(movie.id) || []), 
                screenings: movie.screenings.map(screening => ({
                    ...screening,
                    date: new Date(screening.date)
                })),
            };
        });
    }

    

    static getMovieById(id: string): MovieModel | null {
        return this.getMovies().find(movie => movie.id === id) || null;
    }

    // Update your existing method to handle 1-10 scale
    static calculateAverageRating(reviews: any[]): number {
    if (!reviews || reviews.length === 0) {
        return 0;
    }
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length);
}




    static getAllMovies(): MovieModel[] {
        return this.getMovies();
    }

    static updateMovie(movie: MovieModel): boolean {
    // Get all movies
    const movies = this.getAllMovies();
    
    // Find the index of the movie to update
    const index = movies.findIndex(m => m.id === movie.id);
    if (index === -1) return false;
    
    // Update the movie
    movies[index] = movie;
    
    // Save all movies back to storage
    localStorage.setItem('movies', JSON.stringify(movies));
    return true;

    }
    static updateMovieRating(movieId: string, newRating: number): boolean {
    try {
        // Get the movie by ID
        const movie = this.getMovieById(movieId);
        if (!movie) return false;
        
        // Update the movie's average rating
        movie.averageRating = Math.round(newRating * 10) / 10; // Round to 1 decimal
        
        // Save the updated movie
        this.updateMovie(movie);
        return true;
    } catch (error) {
        console.error('Error updating movie rating:', error);
        return false;
        }
    }

    static getMovieRatingsFromCarts(movieId: string): {rating: number}[] {
    const allUsers = UserService.getAllUsers();
    const ratings: {rating: number}[] = [];
    
    // Get ratings from active cart items
    allUsers.forEach(user => {
        if (user.cart) {
        user.cart.forEach(item => {
            if (item.movieId === movieId && item.status === 'watched' && item.rating !== null) {
            ratings.push({ rating: item.rating });
            }
        });
        }
    });
    
    // Also get ALL ratings from history (don't filter by user)
    const ratingsJson = localStorage.getItem('movieRatingsHistory') || '[]';
    const ratingHistory = JSON.parse(ratingsJson);
    
    ratingHistory.forEach((historyItem: any) => {
        if (historyItem.movieId === movieId) {
        ratings.push({ rating: historyItem.rating });
        }
    });
    
    return ratings;
    }
}