## Short cut commands:
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
## 06 - *ngIf
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



