import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../services/movie.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // ============================= Defined Variables ====================
  movies: Movie[] = [];


  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  // ============================== Methods =============================
  getMovies(): void 
  {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data.slice(1, 5);
    });
  }
}
