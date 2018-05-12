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
  // =================== Constructor & ngOnInit() =================
  constructor(private movieService : MovieService) { }
  ngOnInit() 
  {
    this.getMoviesFromService();
  }

  // ================== Methods ===================================
  getMoviesFromService() : void
  {
    // Can't no longer use this, need to subscribe because the data 
    // needs time to return back.
    // this.movies = this.movieService.getMovies();
    // this.movieService.getMovies().subscribe( 
    //   (data) => {
    //   this.movies = data;
    //   console.log(`this.movies = ${JSON.stringify(this.movies)}`);
    // });

    // One line:
    this.movieService.getMovies().subscribe(data => this.movies = data);
  }
}
