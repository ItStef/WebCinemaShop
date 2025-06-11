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
                    reviews: [
                        {
                            id: '1',
                            userId: '1',
                            movieId: '1',
                            rating: 10,
                            comment: 'Amazing movie!',
                            userName: 'John Doe',
                            createdAt: new Date('2023-10-02')
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
                    reviews: [
                        {
                            id: '2',
                            userId: '2',
                            movieId: '2',
                            rating: 7,
                            comment: 'A timeless classic that never gets old.',
                            userName: 'Jane Smith',
                            createdAt: new Date('2023-10-03')
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
                    reviews: [
                        {
                            id: '3',
                            userId: '3',
                            movieId: '3',
                            rating: 7,
                            comment: 'Heath Ledger\'s performance is legendary.',
                            userName: 'Michael Johnson',
                            createdAt: new Date('2023-10-04')
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
                    reviews: [
                        {
                            id: '4',
                            userId: '4',
                            movieId: '4',
                            rating: 9,
                            comment: 'A masterpiece of storytelling.',
                            userName: 'Emily Davis',
                            createdAt: new Date('2023-10-05')
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
                    reviews: [
                        {
                            id: '5',
                            userId: '5',
                            movieId: '5',
                            rating: 4,
                            comment: 'Epic fantasy at its finest.',
                            userName: 'David Wilson',
                            createdAt: new Date('2023-10-06')
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
                    reviews: [
                        {
                            id: '6',
                            userId: '6',
                            movieId: '6',
                            rating: 2,
                            comment: 'Tom Hanks delivers a performance of a lifetime.',
                            userName: 'Sarah Brown',
                            createdAt: new Date('2023-10-07')
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
                    reviews: [
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
                    reviews: [
                        {
                            id: '8',
                            userId: '8',
                            movieId: '8',
                            rating: 10,
                            comment: 'Scorsese at his best.',
                            userName: 'Jennifer Anderson',
                            createdAt: new Date('2023-10-09')
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
                    reviews: [
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
                    reviews: [
                        {
                            id: '10',
                            userId: '10',
                            movieId: '10',
                            rating: 4,
                            comment: 'A cult classic that still resonates today.',
                            userName: 'Lisa Martinez',
                            createdAt: new Date('2023-10-11')
                        }
                    ],
                    price: 95
                }
            ]
            return movies.map(movie => {
            return {
                ...movie,
                averageRating: this.calculateAverageRating(movie.reviews)
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




// Add this method to MovieService
static addReview(movieId: string, review: ReviewModel): boolean {
  try {
    const movies = this.getMovies();
    const movie = movies.find(m => m.id === movieId);
    
    if (!movie) return false;
    
    // Initialize reviews array if it doesn't exist
    if (!movie.reviews) {
      movie.reviews = [];
    }
    
    // Check if user already reviewed this movie
    const existingReviewIndex = movie.reviews.findIndex(r => r.userId === review.userId);
    
    if (existingReviewIndex >= 0) {
      // Update existing review
      movie.reviews[existingReviewIndex] = review;
    } else {
      // Add new review
      movie.reviews.push(review);
    }
    
    // Recalculate average rating
    movie.averageRating = this.calculateAverageRating(movie.reviews);
    
    // Save updated movies
    localStorage.setItem('movies', JSON.stringify(movies));
    return true;
  } catch (error) {
    console.error('Error adding review:', error);
    return false;
  }
}

static updateMovieRating(movieId: string, newRating: number): boolean {
  try {
    const movies = this.getMovies();
    const movie = movies.find(m => m.id === movieId);
    
    if (!movie) return false;
    
    // Get active user
    const user = UserService.getActiveUser();
    if (!user) return false;
    
    // Initialize reviews array if it doesn't exist
    if (!movie.reviews) {
      movie.reviews = [];
    }
    
    // Check if user already has a review
    const existingReviewIndex = movie.reviews.findIndex(r => r.userId === user.id);
    
    if (existingReviewIndex >= 0) {
      // Update existing review's rating
      movie.reviews[existingReviewIndex].rating = newRating;
    } else {
      // Add a new simple review with just the rating
            const newReview: ReviewModel = {
            id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
            userId: user.id || '',
            movieId: movieId, // Add the movieId from the parameter
            userName: user.username,
            rating: newRating,
            comment: '',
            createdAt: new Date()
            };
      
      // Add missing properties that may be expected based on your sample data
      if ('id' in movie.reviews[0] || movie.reviews.length === 0) {
        // Add an id if other reviews have it
        (newReview as any).id = Math.random().toString(36).substr(2, 9);
      }
      
      if ('movieId' in movie.reviews[0] || movie.reviews.length === 0) {
        // Add movieId if other reviews have it
        (newReview as any).movieId = movieId;
      }
      
      movie.reviews.push(newReview);
    }
    
    // Recalculate average rating
    movie.averageRating = this.calculateAverageRating(movie.reviews);
    
    // Save updated movies
    localStorage.setItem('movies', JSON.stringify(movies));
    return true;
  } catch (error) {
    console.error('Error updating movie rating:', error);
    return false;
  }
}


}