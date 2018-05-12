import { Injectable } from '@angular/core';
import { localMovies } from '../localMovies';
import { Movie } from '../../models/movie';

// Get data asynchronously with Observable
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

// Bring in msg service:
import { MessageService } from './message.service';

@Injectable()
export class MovieService {

  constructor(public messageService: MessageService) { }

  
  // Get the movie data from:
  //    Local storage
  //    Mock data source
  getMovies() : Observable< Movie[] > 
  {
    // return localMovies;
    // Call the other service to add the date to the msgs array for the
    // msg component to display it out to the view
    this.messageService.add(`${new Date().toLocaleString()}. Get movie list`);
    return of( localMovies );
  }

}
