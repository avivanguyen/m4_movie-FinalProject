//API key: 5aa2e87d
//base URL: https://www.omdbapi.com/?apikey=5aa2e87d&s=MOVIE_NAME_HERE

//Modal functionality
let isModalOpen = false;

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = !isModalOpen;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}

//Search functionality
async function onSearchMovie(event) {
  const searchMovie = event.target.value;

  if (!searchMovie) return;

  //breadcrumb
  document.getElementById("search-term").textContent = searchMovie;

  // Fetch movies from API
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=5aa2e87d&s=${searchMovie}`
  );
  const data = await response.json();

  const movieContainer = document.querySelector(".movie");

  if (data.Response === "True") {
    movieContainer.innerHTML = data.Search.map((movie) =>
      movieCardHtml(movie) + movieModalHtml(movie)
    ).join("");
  } else {
    movieContainer.innerHTML = `<p style="color: white; text-align: center; width: 100%;">No movies found for "${searchMovie}"</p>`;
  }
}

//Movie card results
function movieCardHtml(movie) {
  return `
    <div class="movie-card">
        <div class="movie-card__container" onclick="toggleModal()">
            <div class="movie__poster">
                <img src="${
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "./assets/movie_poster-placeholder.png"
                }" alt="">
            </div>
            <div class="movie__title">${movie.Title}</div>
            <div class="movie__year">${movie.Year}</div>
        </div>
    </div>`;
}
//Movie modal results
function movieModalHtml(movie) {
  return `
    <div class="modal">
            <div class="modal__half modal__poster">
                <figure>
                    <img src="${
                </figure>
            </div>
            <div class="modal__half modal__description">
                <h2 class="modal__title">Movie Title</h2>
                <p class="modal__year">20XX</p>
                <p class="modal__plot">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <ul class="modal__details">
                    <li><strong>Director:</strong> Director Name</li>
                    <li><strong>Actors:</strong> Actor 1, Actor 2, Actor 3</li>
                    <li><strong>Runtime:</strong> XX min</li>
                </ul>
                <button class="watch">Watch Now</button>
            </div>
            <button class="close-button" onclick="toggleModal()">Close</button>
        </div>`;
}