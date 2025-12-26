//API key: 5aa2e87d
//base URL: https://www.omdbapi.com/?apikey=5aa2e87d&s=MOVIE_NAME_HERE

//Modal functionality
let isModalOpen = false;

function toggleModal() {
    if (isModalOpen) {
        isModalOpen = !isModalOpen;
        return document.body.classList.remove('modal--open');
    }
    isModalOpen = true;
    document.body.classList += ' modal--open';
}

//API fetch functionality
const movieListEl = document.getElementById('movie-list');

async function main(searchMovie) {
    const movie = await fetch(`https://www.omdbapi.com/?apikey=5aa2e87d&s=${searchMovie}`);
    const movieData = await movie.json();
    movieListEl.innerHTML = movieData.map((movie) => movieHtml(movie)).join('');
}

main();

function showMovieDetails(id) {
    fetch(`https://www.omdbapi.com/?apikey=5aa2e87d&i=${id}`)
}