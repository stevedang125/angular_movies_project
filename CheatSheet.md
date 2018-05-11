## Short cut commands:
```
1. ng serve --open --port 9090 (Open live server with custom port)
2. ng g component <component name> OR ng generate component <component name>
3. 


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


```

## 02 - Create new Components:
```
ng g component movies

add <app-movies><app-movies> to app.component.html

create models folder
    add movie.ts file

import the movie.ts file into the movies.component.ts
```