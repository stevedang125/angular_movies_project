## Quick review and short cut commands:
```
1. ng serve --open --port 9090 (Open live server with custom port)
2. ng g component <component name> OR ng generate component <component name>
3. [ngModel]="movie.name" (One-way data binding: View Only)
4. [(ngModel)]="movie.name" (Two-way data binding: View and Edit)
5. *ngFor="let movie of movies", {{movie.name}}, {{movie.releaseYear}}
    LET ... OF ... 
    NOT LET ... IN ... 
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
12. Routes and RouterOutlet
    ng g module app-routing --flat --module=app  
    --flat : add this to src/app
    --module=app: add/import the path to app.module.ts

    Create a narbar component for navbar
        ng g component navbar

    app-routing.module.ts, bring in the Routes, RouterModule & Components
        import { Routes, RouterModule } from '@angular/router';
        import { MoviesComponent } from './movies/movies.component';
        @NgModule({
            imports: [ RouterModule.forRoot(routes), ],
            exports: [ RouterModule ]
        })
    Create some routes:
        const routes: Routes = [ {path:'', component: }, ... ];
    app.component.html
        <app-navbar></app-navbar>
        <router-outlet></router-outlet>
13. Dashboard and Default Route
    Default route:
        { path: '',  redirectTo: '/dashboard', pathMatch:'full'},  
    Everything else that isn't a valid path, redirect to /dashboard
        { path: '**', redirectTo: '/dashboard', pathMatch:'full'}  
14. Master-Child Component
    App.routing.module.ts
        Bring in the components for routes
            import { MovieDetailComponent } from './movie-detail/movie-detail.component';
            import { Movie } from '../models/movie';
            { path: 'detail/:id', component: MovieDetailComponent},  
    Dashboard HTML:
        routerLink will be detail+id
        eg: routerLink="/detail/{{movie.id}}"
    Movie Service:
        Create a method to get the movie by its id
            getMovieFromId(id: number): Observable<Movie>{
                return of(localMovies.find(movie => movie.id === id));
            }
    Movie Component HTML:
        Now the movie details will navigate to another link
                    <li class="movieListItem" *ngFor="let movie of movies"
                    ><a routerLink="/detail/{{movie.id}}"
                        style="text-decoration: none;"
                        > {{movie.name}} - {{movie.releaseYear}} </a></li>
                
    Movie Detail Component TS:
        Bring in the ActivatedRoute, Location(goback function), MovieService(for data)
        Inject into the constructor to use these:
        Create the getMovieFromRoute to get the data from service
            getMovieFromRoute(): void {
                const id = +this.route.snapshot.paramMap.get('id');
                this.movieService.getMovieFromId(id).subscribe(data => {
                    this.movie = data;
                });
            }
            goBack(): void{
                this.location.back();
            }
15. HTTP GET request from a made up API with json-server
    Use npm to install global json-server
        npm install -g json-server
    Create an empty .json file 
        touch db.json
    Add data into this db.json file
    Start the server:
        json-server --watch db.json
    Get request is:
        http://localhost:3000/movies
    Use hostname to access the server
        $ hostname
        DESKTOP-RU055PG
        DESKTOP-RU055PG:3000/movies
    Bring the HttpClientModule in app.module.ts
        import { HttpClientModule } from '@angular/common/http';
        imports: [HttpClientModule],
    Movie Service ts:
        Import HttpClient, HttpHeaders, catchError, map, tap
            import { HttpClient, HttpHeaders } from '@angular/common/http';
            import { catchError, map, tap } from 'rxjs/operators';
        Define a string for the get request
            private movieURL = 'http://desktop-ru055pg:3000/movies';
        Fix up the get data method
            getMovies() : Observable< Movie[] > 
                return this.http.get<Movie[]>(this.movieURL).pipe(
                    // Success:
                    tap(dataReceived),
                    // Failed
                    catchError(err => of([]))
## 15 - HTTP PUT request, Update data in the database
Add a number to the url to get a specific movie object with the id number
    http://desktop-ru055pg:3000/movies/3
POSTMAN:
    PUT request to: http://desktop-ru055pg:3000/movies/2
    key:
        name            A Christmas Carol
        releaseYear     2012
    Headers
        Content-Type    application/x-www-form-urlencoded

Movie Service:
    Send a GET request to the server for data:
        getMovieFromId(id: number): Observable<Movie>
            const url = `${this.movieURL}/${id}`;
            return this.http.get<Movie>(url).pipe(tap(dataReceived),catchError(err => of(new Movie())));
    Send a PUT request to the server to change the data:
        updateMovie(movie: Movie): Observable<any>
            const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
            return this.http.put(`${this.movieURL}/${movie.id}`, movie, httpOptions)
            .pipe(tap(updatedDate),catchError(err => of(new Movie())));
Movie Detail Component HTML
    Add a "Save" button:<button (click)="save()">Save</button> 
Movie Detail Component TS
    Save() method that calls the movie service for a PUT request
    save() : void{
        this.movieService.updateMovie(this.movie).subscribe(() => this.goBack());
    }
            
```
## Common Errors:
```
1.  Missing attributes:
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
5. To use anything in angular, eg: services:
    Import the service
        import { ActivatedRoute } from '@angular/router';
        import { Location } from '@angular/common';
        import { MovieService } from '../services/movie.service';
    Inject the service into constructor.
        constructor(
            private route: ActivatedRoute,
            private movieService: MovieService,
            private location: Location,
        ) { }
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
## 11 - Routes and RouterOutlet
```
ng g module app-routing --flat --module=app  
    --flat : add this to src/app
    --module=app: add/import the path to app.module.ts

Create a narbar component for navbar
    ng g component navbar

app-routing.module.ts, bring in the Routes, RouterModule & Components
    import { Routes, RouterModule } from '@angular/router';
    import { MoviesComponent } from './movies/movies.component';
    @NgModule({
        imports: [ RouterModule.forRoot(routes), ],
        exports: [ RouterModule ]
    })
Create some routes:
    const routes: Routes = [
        { path: 'movies', component: MoviesComponent},
    ];
app.component.html
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>

Navbar Component ts
    Bring in routes and routerlink
        import { Routes, RouterLink } from '@angular/router'; 
Navbar html
    Create a list of links
        <nav class="main-nav">
        <ul>
            <a class="nav-item" routerLink='/'>Home</a>
            <a class="nav-item" routerLink='/movies'>Movies</a>
        </ul>
        </nav>
Navbar CSS
    .main-nav ul
    {
        display: grid;
        grid-gap: 20px;
        list-style: none;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    .main-nav a
    {
        text-decoration: none;
        background: turquoise;
        padding: 0.8em;
        border-radius: 4px;
        color: black;
        display: block;
        text-align: center;
        font-size: 1.1em;
        box-shadow: 0 1px 5px rgba(104,104,104, 0.8);
        text-transform: uppercase;
    }

    .main-nav a:hover
    {
        background: tomato !important;
        color: white;
    }
        
```
## 12 - Dashboard and Default Route:
```
Create a dashboard component
    ng g component dashboard
Add dashboard to the routes
    import { DashboardComponent } from './dashboard/dashboard.component';
    const routes: Routes = 
    [
        { path: '',  redirectTo: '/dashboard', pathMatch:'full'},  
        { path: 'movies', component: MoviesComponent},
        { path: 'dashboard', component: DashboardComponent},
        { path: '**', redirectTo: '/dashboard', pathMatch:'full'}  
    ];
Add dashboard to Nav bar
    <a class="nav-item" routerLink='/dashboard'>Dashboard</a>
Dashboard TS:
    Bring in Movie model and Movie Service
        import { Movie } from '../../models/movie';
        import { MovieService } from '../services/movie.service';
    Get data from somewhere through the movie service
        movies: Movie[] = [];
        getMovies(): void {
            this.movieService.getMovies().subscribe(data => {
                this.movies = data.slice(1, 5);
            });
        }
Dashboard HTML:
    <h3>Top 4 movies</h3>
    <div>
    <a class="col-1-4" *ngFor="let movie of movies">
        <div class="movie-box">
        <h4>{{movie.name}}</h4>
        </div>
    </a>
    </div>
Dashboard CSS:
    .col-1-4
    {
        float: left;
        padding: 0 20px 20px 0;
        width: 25%;
    }
    /* last child no padding right */
    [class*='col-']:last-of-type{
        padding-right: 0;
    }

    .movie-box
    {
        padding: 20px;
        text-align: center;
        color: #eee;
        max-height: 120px;
        min-width: 120px;
        background: mediumseagreen;
        border-radius: 20px;
    }

    .movie-box:hover
    {
        background: green;
        cursor: pointer;
        color: #eee;
    }

    /* Set CSS box-sizing property for Safari, Firefox, and more */
    *, *:after, *:before
    {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
```
## 13 - Master Detail Components:
```
App.routing.module.ts
    Bring in the components for routes
        import { MovieDetailComponent } from './movie-detail/movie-detail.component';
        import { Movie } from '../models/movie';
        { path: 'detail/:id', component: MovieDetailComponent},  
Dashboard HTML:
    routerLink will be detail+id
        <h3>Top 4 movies</h3>
        <div>
            <a 
                class="col-1-4" 
                *ngFor="let movie of movies"
                style="text-decoration: none"
                routerLink="/detail/{{movie.id}}"
            >
                <div class="movie-box">
                    <h4>{{movie.name}}</h4>
                </div>
            </a>
        </div>
Movie Service:
    Create a method to get the movie by its id
        getMovieFromId(id: number): Observable<Movie>{
            return of(localMovies.find(movie => movie.id === id));
        }
Movie Component HTML:
    Now the movie details will navigate to another link
    eg: http://localhost:4200/detail/2

        <h2>My movies</h2>
        <div class="parent">
            <ol class="movies">
                <li 
                    class="movieListItem" 
                    *ngFor="let movie of movies"
                >
                    <a 
                        routerLink="/detail/{{movie.id}}"
                        style="text-decoration: none;"
                    >
                        {{movie.name}} - {{movie.releaseYear}} 
                    </a>
                </li>
            </ol>
        </div>
Movie Detail HTML:
    <div *ngIf="movie" class="details">
            <h4>You selected: {{movie.name}}. Details:</h4>
            <table>
            <tr>
                <td>Name: </td>
                <td>
                    <input [(ngModel)]="movie.name" 
                    placeholder="*Name"
                    >
                </td>
            </tr>
            <tr>
                <td>Release Year: </td>
                <td>
                    <input [(ngModel)]="movie.releaseYear" 
                    placeholder="*Release Year"
                    >
                </td>
            </tr>
        </table>
        <button (click)="goBack()">Go Back</button>
    </div>

Movie Detail Component TS:
    Bring in the ActivatedRoute, Location(goback function), MovieService(for data)
        // Inject Singleton route and Goback
        import { ActivatedRoute } from '@angular/router';
        import { Location } from '@angular/common';
        // Service for data
        import { MovieService } from '../services/movie.service';
    Inject into the constructor to use these:
        constructor(
            private route: ActivatedRoute,
            private movieService: MovieService,
            private location: Location,
        ) { }
    Create the getMovieFromRoute to get the data from service
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
            });
        }

        goBack(): void
        {
            // Navigates back to the previous component
            this.location.back();
        }
```
## 14 - HTTP GET request from a made up API with json-server
```
Use npm to install global json-server
    npm install -g json-server
Create an empty .json file 
    touch db.json
Add data into this db.json file:
    {
        "movies":
        [
            {
                "id": 1,
                "name": "The Ghost and the Darkness",
                "releaseYear": 1996
            }
        ],
        "comments":
        [
            {
                "id":1,
                "body": "This film is awesome",
                "movieID":1
            },
            {
                "id":2,
                "body": "I like this movie",
                "movieID":1
            }
        ],
        "profile":
        {
            "name":"typicode"
        }
    }
Start the server:
    json-server --watch db.json
Get request is:
    http://localhost:3000/movies
Use hostname to access the server
    $ hostname
    DESKTOP-RU055PG
    DESKTOP-RU055PG:3000/movies

Bring the HttpClientModule in app.module.ts
    import { HttpClientModule } from '@angular/common/http';

    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
Movie Service ts:
    Import HttpClient, HttpHeaders, catchError, map, tap
        // Bring in http client, http headers to send request to the server
        import { HttpClient, HttpHeaders } from '@angular/common/http';
        // Bring in the operators for success/failed data of observable
        import { catchError, map, tap } from 'rxjs/operators';
    Define a string for the get request
        private movieURL = 'http://desktop-ru055pg:3000/movies';
    Fix up the get data method
        getMovies() : Observable< Movie[] > 
        {
            return this.http.get<Movie[]>(this.movieURL).pipe(
                // Success:
                tap(dataReceived => console.log(`data received = ${JSON.stringify(dataReceived)}`)),
                // Failed
                catchError(err => of([]))
            );
        }
```
## 15 - HTTP PUT request, Update data in the database
```
Add a number to the url to get a specific movie object with the id number
    http://desktop-ru055pg:3000/movies/3
POSTMAN:
    PUT request to: http://desktop-ru055pg:3000/movies/2
    key:
        name            A Christmas Carol
        releaseYear     2012
    Headers
        Content-Type    application/x-www-form-urlencoded

Movie Service:
    Send a GET request to the server for data:
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
    Send a PUT request to the server to change the data:
        updateMovie(movie: Movie): Observable<any>
        {
            const httpOptions = {
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
Movie Detail Component HTML
    Add a "Save" button:
        <button (click)="save()">Save</button> 
Movie Detail Component TS
    Save() method that calls the movie service for a PUT request
        save() : void{
            this.movieService.updateMovie(this.movie).subscribe(
                () => this.goBack()
            );
        }
```