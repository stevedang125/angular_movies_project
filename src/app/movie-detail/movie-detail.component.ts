import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/movie';

// Inject Singleton route and Goback
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// Service for data
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  @Input() movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getMovieFromRoute();
  }

  getMovieFromRoute(): void 
  {
    // Convert string to number in TypeScript: use "+"
    // This is a string:
    //    this.route.snapshot.paramMap.get('id');
    // Add "+" to convert this string to a number, cuz id datatype is  a number
    //    +this.route.snapshot.paramMap.get('id');
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`this.route.snapshot.paramMap.get('id') = ${JSON.stringify(this.route.snapshot.paramMap)}`);    
    // Call service to get the movie from id:
    // Create a method in service for this job
    this.movieService.getMovieFromId(id).subscribe(data => {
      this.movie = data;
      console.log('checking movie:'+this.movie.name);
      
    });
  }

  save() : void
  {
    this.movieService.updateMovie(this.movie).subscribe(
      () => this.goBack()
    );
  }

  goBack(): void
  {
    // Navigates back to the previous component
    this.location.back();
  }

}
