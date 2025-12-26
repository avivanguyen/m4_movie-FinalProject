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
    localStorage.setItem('movieID', id);
    window.location.href = `${window.location.origin}/movie.html`;
}

function movieHtml(movie) {
    return `<div class="movie-card" onclick="showMovieDetails('${movie.imdbID}')">
                <div class="movie-card__container" onclick="toggleModal()">
                    <div class="movie__poster">
                        <img src="./assets/movie_poster-placeholder.png" alt="">
                    </div>
                    <div class="movie__title">Movie Title</div>
                    <div class="movie__year">20XX</div>
                </div>
            </div>`;
}