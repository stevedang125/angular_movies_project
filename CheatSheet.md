## Short cut commands:
```
1. ng serve --open --port 9090 (Open live server with custom port)
2. ng g component <component name> OR ng generate component <component name>
3. [ngModel]="movie.name" (One-way data binding: View Only)
4. [(ngModel)]="movie.name" (Two-way data binding: View and Edit)
5. *ngFor="let movie of movies", {{movie.name}}, {{movie.releaseYear}}
6. 
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

3.        


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
## 04 - ngFor:
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

    add the local json movie objects to the movies.component.ts

    add some css to the list:
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
    
    the view/template file:
    <ol class="movies">
        <li class="movieListItem" *ngFor="let movie of movies">
            {{movie.name}} - {{movie.releaseYear}} 
        </li>
    </ol>
```

