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
  // ** Fetch the movie list from the server, 
  // call the movie service for this task
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

  // ==================== POST ======================================
  // ** POST: Add a new movie by using movie service
  add_new_movie(name: string, releaseYear: string) : void 
  {
    // Clean up, remove start/end spaces
    name = name.trim();
    releaseYear = releaseYear.trim();
    // Check point: these data cannot be blank or must be a number
    if(Number.isNaN(Number(releaseYear)) || !name || Number(releaseYear)===0 )
    {
      alert('Name must not be blank, Release Year must be a number');
      return;
    }

    // Successful passed check point, create a new movie object
    const new_movie: Movie = new Movie();
    new_movie.name = name;
    new_movie.releaseYear = Number(releaseYear);

    this.movieService.addMovie(new_movie).subscribe(added_movie => {
      this.movies.push(added_movie);
    });
  }


}
