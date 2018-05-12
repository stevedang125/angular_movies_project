## Quick review and short cut commands:
```
1. ng serve --open --port 9090 (Open live server with custom port)
2. ng g component <component name> OR ng generate component <component name>
3. [ngModel]="movie.name" (One-way data binding: View Only)
4. [(ngModel)]="movie.name" (Two-way data binding: View and Edit)
5. *ngFor="let movie of movies", {{movie.name}}, {{movie.releaseYear}}
6. Object to string:
    console.log(this.selectedMovie);
    console.log(`selectedMovie = ${JSON.stringify(this.selectedMovie)}`);
   
7. *ngIf="true".
8. Input Decorator:
    Component A:(data sender)
        <app-movie-detail [movie]="selectedMovie" ></app-movie-detail>

    Component B: (data receiver)
        import { Component, OnInit, Input } from '@angular/core';
        import { Movie } from '../../models/movie';
        @Input() movie: Movie;
9.  ng g service movie
    import and add this service into app.module.ts
    Services can get data from:
        Local storage
        Mock data source
        Web service.
10. Observable
    Get data asynchronously with Observable.
    e.g: 
        Observable object : "object" has been "watched" for "changes".
        Observable<Movie[]>
    Service file:
        Bring in Observable
            import { Observable } from 'rxjs/Observable';
            import { of } from 'rxjs/observable/of';

        Use Observable on the movie object array with the return "of" type
        getMovies() : Observable< Movie[] >{
            // return localMovies;
            return of( localMovies );
        }

    Component:
        Need to subcribe to wait for the data to get back
            this.movieService.getMovies().subscribe(data => this.movies = data);
11. Service calls other service, auto added service into app.module.ts
    ng g component messages
    ng g service message --module=app (Automatically add service to app.module.ts)

    Add the component into app.component.html
        <app-movies></app-movies>
        <app-messages></app-messages>   
    Msg only show when there is a valid/non-null val
    Msg calls the msg service to get the data
    First load, the page will call the movie service to get the service list
    also add the "date" to "msgs[]" in "msg service"    
```
## Common Errors:
```
1.  Un-filled attributes:
    Error:
        movie : Movie = 
        {

        }
    Solution:
        movie : Movie = 
        {
            id: 1,
            name: 'Star War',
            releaseYear: 1977
        }

2.  Form Module Error
    Error:
        Can't bind to 'ngModel' since it isn't a known property of 'input'.
    Solution:
        app.module.ts file:
        import { FormsModule } from '@angular/forms';

        imports: [
            BrowserModule,
            FormsModule
        ],

3.  CSS there are two background colors, won't show up the other color
    Solution: 
        use "!important"      
        background: mediumseagreen !important;
        


```
## Golden Rules:
```
1. Check/Add to import and @ngModule.
2. Component must be added into declarations: [ ]
3. Module must be added into imports: [ ]
4. Services must be added into providers: [ ]
```

## 02 - Create new Components:
```
ng g component movies

add <app-movies><app-movies> to app.component.html

create models folder
    add movie.ts file

import the movie.ts file into the movies.component.ts
```
## 03 - Data Binding:
```
1. One-way data binding (View Only)
Directive: {}
From the component to the view only.(One way)
<input [ngModel]="movie.name" placeholder="*Enter movie's name">

2. Two-way data binding (View and Edit)
From the component to the view and from view back to component.(Two-way)
<input [(ngModel)]="movie.name" placeholder="*Enter movie's name">

<h1>Movie's details: </h1>
<div><span>id: </span>{{movie.id}}</div>
<div><span>Name: </span>{{movie.name | uppercase}} </div>
<div><span>Release Year: </span>{{movie.releaseYear}}</div>

<h2>Edit your information: </h2>
<div style="margin: 10px; text-align: left;" >
    <label>Movie name(data binding one way):
        <input [ngModel]="movie.name" placeholder="*Enter movie's name">
    </label>
</div>

<div style="margin: 10px; text-align: left;" >
    <label>Movie name(data binding two way):
        <input [(ngModel)]="movie.releaseYear" placeholder="*Enter movie's name">
    </label>
</div>
```
## 04 - *ngFor:
```
Create a file to store local json objects for movie.
    localMovies.ts
    // Create list of movie objects
    import { Movie } from '../models/movie';
    export var localMovies: Movie[] = 
    [
        {
            id: 1,
            name: 'Star War',
            releaseYear: 1977
        },
        ... more json objects here
        {}, {}, {}
    ]

Add the local json movie objects to the movies.component.ts

Add some css to the list:
    .movies
    {
        background: #3399ff;
        padding: 0.5em 1em 0.5em 1.5em;
        margin: 1em;
        max-width: 16em;
    }

    .movies .movieListItem
    {
        font-size: 0.875em; /* 14px/16=0.875em */
        font-family: Georgia, 'Times New Roman', Times, serif;
        background: #cce5ff;
        padding: 0.3em;
        margin: 2.3em;
        text-align: left;
    }
    
The view/template file:
    <ol class="movies">
        <li class="movieListItem" *ngFor="let movie of movies">
            {{movie.name}} - {{movie.releaseYear}} 
        </li>
    </ol>
```
## 05 - Event Binding
```
Define a variable with datatype of Movie object
Define a method with a movie object argument
    selectedMovie: Movie;
    onSelect(movie : Movie):void 
    {
        this.selectedMovie = movie;
    }

Change the background and color for selected list item:
    .selected
    {
        background: mediumseagreen !important;
        color: white;
    }

Event Binding:
    If the movie is the selectedMovie, the current class will be selected
    and change the background + text color.
        [class.selected] = "movie === selectedMovie"
        (click) = "onSelect(movie)"

```
## 06 - *ngIf:
```
Add CSS for parent(flex layout), details of the movie
    .parent
    {
        display: flex; /*flexible layout, default: row */
    }
    .details
    {
        background: mediumseagreen;
        color: white;
        padding: 0.5em;
        margin: 1em;
        max-width: 16em;
        text-align: left;
        font-size: 0.875em;
    }
Assign new data if edited to the variables using two-way data binding:
    <input [(ngModel)]="selectedMovie.name" 
    <input [(ngModel)]="selectedMovie.releaseYear"
```
## 07 - Input Decorator:
```
Create a new component to pass data to it instead for the *ngIf div
    ng g component movie-detail
html file
    movie component:
        use selector to replace the *ngIf div
            <app-movie-detail><app-movie-detail>
        assign the "Input data"
            <app-movie-detail [movie]="selectedMovie"><app-movie-detail>
            
    movie-detail component:
        change selectedMovie to var movie

css file
    same details class from movie.component.css

ts file
    Import input, movie object, input movie variable that 
    get data from other component

        import { Component, OnInit, Input } from '@angular/core';
        import { Movie } from '../../models/movie';
        @Input() movie: Movie;
```
## 08 - Service
```
Create and Generate a service
    ng g service movie
Import the service into app.module.ts
    import { MovieService } from './services/movie.service';
    providers: [MovieService, ],
Service ts file:
    import { localMovies } from '../localMovies';
    import { Movie } from '../../models/movie';
    getMovies() : Movie[] {
        return localMovies;
    }
Component that calls the movie service:
    Bring in the service:
        import { MovieService } from '../services/movie.service';
    Defind a variable to hold the data, which is an array of objects
        movies : Movie[];
    Inject the service into the constructor
        constructor(private movieService : MovieService) { }
    Create the method to call the service and get the data,
    then add the method to ngOnInit(), which will get call on start:
        ngOnInit() {
            this.getMoviesFromService();
        }

        getMoviesFromService() : void{
            this.movies = this.movieService.getMovies();
        }
```
## 09 - rxjs and Observable
```
Get data asynchronously with Observable.
e.g: 
    Observable object = "object" has been "watched" for "changes".
    Observable<Movie[]>
movie.service.ts file:
    Bring in Observable and of:
        import { Observable } from 'rxjs/Observable';
        import { of } from 'rxjs/observable/of';
    getMovies() : Observable< Movie[] > {
        // return localMovies;
        return of( localMovies );
    }
component.ts file:
    Need to subcribe to wait for the data to get back
        this.movieService.getMovies().subscribe(data => this.movies = data);
```
## 10 - Service calls other service
```
Generate msg component and mes service:
    ng g component messages
    ng g service message --module=app (Automatically add service to app.module.ts)
Add the component into app.component.html
        <app-movies></app-movies>
        <app-messages></app-messages>   
Msg only show when there is a valid/non-null val
Msg calls the msg service to get the data
    <div 
    *ngIf="messageService.messages.length"
    style="text-align: left;"
    >
        <h4>Messages</h4>
        <button 
            class="clear"
            (click)="messageService.deleteAllMessages()"
        >
            Delete All Messages
        </button>

        <div *ngFor="let msg of messageService.messages">
            {{msg}}
        </div>
    </div>
First load, the page will call the movie service to get the service list
also add the "date" to "msgs[]" in "msg service"    
    // Bring in msg service:
    import { MessageService } from './message.service';

    getMovies() : Observable< Movie[] > {
        // return localMovies;
        // Call the other service to add the date to the msgs array for the
        // msg component to display it out to the view
        this.messageService.add(`${new Date().toLocaleString()}. Get movie list`);
        return of( localMovies );
    }
```



