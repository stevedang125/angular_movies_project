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

}
