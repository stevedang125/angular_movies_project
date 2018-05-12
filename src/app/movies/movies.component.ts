import { Component, OnInit } from '@angular/core';

// Add movie class into this movie component
import { Movie } from '../../models/movie';

// Replaced by give a call to the service to get this data
// Add local json objects
// import { localMovies } from '../localMovies'
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  // ================== Defined variables: ========================

  // movies = localMovies;
  movies : Movie[];
  // Action when select a Movie in List Item
  // Define a variable with datatype of Movie object
  selectedMovie: Movie;

  // =================== Constructor & ngOnInit() =================
  constructor(private movieService : MovieService) { }
  ngOnInit() 
  {
    this.getMoviesFromService();
  }

  // ================== Methods ===================================
  getMoviesFromService() : void
  {
    this.movies = this.movieService.getMovies();
  }
  // Define a method with a movie object argument
  onSelect(movie : Movie):void 
  {
    // Assign the input movie to the selected movie var
    this.selectedMovie = movie;
    console.log(this.selectedMovie);
    console.log(`selectedMovie = ${JSON.stringify(this.selectedMovie)}`);
    // alert(`selectedMovie = ${JSON.stringify(this.selectedMovie)}`);

    // Output: Object to String
    // Object { id: 3, name: "Star War", releaseYear: 1977 }
    // selectedMovie = {"id":3,"name":"Star War","releaseYear":1977}
  }

}
