//API key: 5aa2e87d
//base URL: https://www.omdbapi.com/?apikey=5aa2e87d&s=MOVIE_NAME_HERE

//fetch movie data from OMDB API
async function fetchMovies(query) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=5aa2e87d&s=${query}`);
    const data = await response.json();
    return data.Search; // Return the array of movies
}