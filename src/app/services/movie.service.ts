import { Injectable } from '@angular/core';
import { localMovies } from '../localMovies';
import { Movie } from '../../models/movie';

// Get data asynchronously with Observable
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MovieService {

  // Get the movie data from:
  //    Local storage
  //    Mock data source
  getMovies() : Observable< Movie[] > 
  {
    // return localMovies;
    return of( localMovies );
  }

  


  
  constructor() { }

}
