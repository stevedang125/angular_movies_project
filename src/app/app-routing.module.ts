import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = 
[
  { path: '',  redirectTo: '/dashboard', pathMatch:'full'},  
  { path: 'movies', component: MoviesComponent},
  { path: 'dashboard', component: DashboardComponent},
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
