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

//Search functionality
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', onSearchMovie);

//API fetch functionality
const movieListEl = document.getElementById('movie-list');

async function main(searchMovie) {
    const movie = await fetch(`https://www.omdbapi.com/?apikey=5aa2e87d&s=${searchMovie}`);
    const movieData = await movie.json();
    movieListEl.innerHTML = movieData.map((movie) => movieHtml(movie)).join('');
}

main();

function showMovieDetails(title) {
    localStorage.setItem('movieTitle', title);
    window.location.href = `${window.location.origin}/movie.html`;
}

function movieHtml(movie) {
    return `<div class="movie-card" onclick="showMovieDetails('${movie.Title}')">
        <div class="movie-card__container" onclick="toggleModal()">
            <div class="movie__poster">
                <img src="${movie.Poster}" alt="">
            </div>
            <div class="movie__title">${movie.Title}</div>
            <div class="movie__year">${movie.Year}</div>
        </div>
    </div>`;
}

const movieDescriptionEl = document.querySelector('.movie-list');
const movieTitle = localStorage.getItem('movieTitle');

async function onSearchMovie(event) {
    const title = event.target.value;
    renderMovies(title);
}

async function renderMovies(title) {
    const movies = await fetch(`https://www.omdbapi.com/?apikey=5aa2e87d&s=${title}`);
    const moviesData = await movies.json();
    movieDescriptionEl.innerHTML = moviesData.map((movie) => movieHtml(movie)).join('');
}

function movieHtml(movie) {
    return `
        <div class="modal__half modal__poster">
            <figure>
                <img src="${movie.Poster}" alt="">
            </figure>
        </div>
        <div class="modal__half modal__description">
            <h2 class="modal__title">${movie.Title}</h2>
            <p class="modal__year">${movie.Year}</p>
            <p class="modal__plot">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <ul class="modal__details">
                <li><strong>Director:</strong> Director Name</li>
                <li><strong>Actors:</strong> Actor 1, Actor 2, Actor 3</li>
                <li><strong>Runtime:</strong> XX min</li>
            </ul>
            <button class="watch">Watch Now</button>
        </div>`;
}

