import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = 
[
  { path: 'movies', component: MoviesComponent},
  
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
