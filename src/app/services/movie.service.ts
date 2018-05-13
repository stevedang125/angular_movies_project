import { Injectable } from '@angular/core';
import { localMovies } from '../localMovies';
import { Movie } from '../../models/movie';

// Get data asynchronously with Observable
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

// Bring in msg service:
import { MessageService } from './message.service';

// Bring in http client, http headers to send request to the server
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Bring in the operators for success/failed data of observable
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class MovieService {
  // ========================== Defined variables ======================
  private movieURL = 'http://desktop-ru055pg:3000/movies';
  
  constructor(
    public messageService: MessageService,
    private http : HttpClient 
  ) { }

  // =========================== Methods ===============================
  getMovies() : Observable< Movie[] > 
  {
    return this.http.get<Movie[]>(this.movieURL).pipe(
      // Success:
      tap(dataReceived => console.log(`data received = ${JSON.stringify(dataReceived)}`)),
      // Failed
      catchError(err => of([]))
    );
  }

  getMovieFromId(id: number): Observable<Movie>
  {
    const url = `${this.movieURL}/${id}`;
    return this.http.get<Movie>(url).pipe(
      // Success:
      tap(dataReceived => console.log(`data received = ${JSON.stringify(dataReceived)}`)),
      // Failed
      catchError(err => of(new Movie()))
    );
  }

  updateMovie(movie: Movie): Observable<any>
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.movieURL}/${movie.id}`, movie, httpOptions)
    .pipe(
      // Success:
      tap(updatedDate => console.log(`data updated = ${JSON.stringify(updatedDate)}`)),
      // Failed
      catchError(err => of(new Movie()))
    );
  }
  

}


// // Get the movie data from:
//   //    Local storage
//   //    Mock data source
//   getMovies() : Observable< Movie[] > 
//   {
//     // return localMovies;
//     // Call the other service to add the date to the msgs array for the
//     // msg component to display it out to the view
//     this.messageService.add(`${new Date().toLocaleString()}. Get movie list`);
//     return of( localMovies );
//   }

//   // input is an id in datatype number
//   // output is an observable of movie json object type:
//   getMovieFromId(id: number): Observable<Movie>
//   {
//     return of(localMovies.find(movie => movie.id === id));
//     // Or this:
//     // return of(localMovies.find(
//     //   movie => {
//     //     return (movie.id === id);
//     //   }
//     // ));
//   }