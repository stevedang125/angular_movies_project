import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { Movie } from '../models/movie';
// import {  } from '';

const routes: Routes = 
[
  { path: '',  redirectTo: '/dashboard', pathMatch:'full'},  
  { path: 'movies', component: MoviesComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'detail/:id', component: MovieDetailComponent},  
  { path: '**', redirectTo: '/dashboard', pathMatch:'full'}
];


@NgModule({
  imports: [
    // CommonModule    
    RouterModule.forRoot(routes),
  ],
  // declarations: []
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
