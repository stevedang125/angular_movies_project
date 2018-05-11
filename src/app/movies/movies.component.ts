import { Component, OnInit } from '@angular/core';

// Add movie class into this movie component
import { Movie } from '../../models/movie';

// Add local json objects
import { localMovies } from '../localMovies'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movie : Movie = 
  {
    id: 1,
    name: 'Star War',
    releaseYear: 1977
  }

  movies = localMovies;

  constructor() { }

  ngOnInit() {
  }

  // Action when select a Movie in List Item
  // Define a variable with datatype of Movie object
  selectedMovie: Movie;

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
