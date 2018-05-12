import { Injectable } from '@angular/core';
import { localMovies } from '../localMovies';
import { Movie } from '../../models/movie';

@Injectable()
export class MovieService {

  // Get the movie data from:
  //    Local storage
  //    Mock data source
  getMovies() : Movie[] 
  {
    return localMovies;
  }

  constructor() { }

}
