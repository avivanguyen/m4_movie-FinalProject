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
  const searchTerm = event.target.value;

  if (!searchTerm) return;

  // Update the breadcrumb with search term
  document.getElementById("search-term").textContent = searchTerm;

  // Fetch movies from API
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=5aa2e87d&s=${searchTerm}`
  );
  const data = await response.json();

  // Get the movie container
  const movieContainer = document.querySelector(".movie");

  // Check if search was successful
  if (data.Response === "True") {
    // Clear existing content and render new movies
    movieContainer.innerHTML = data.Search.map((movie) =>
      movieCardHtml(movie)
    ).join("");
  } else {
    // Show error message if no movies found
    movieContainer.innerHTML = `<p style="color: white; text-align: center; width: 100%;">No movies found for "${searchTerm}"</p>`;
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

//Movie card modal
function movieHtml(movie) {
    return `
        <div class="modal__half modal__poster">
            <figure>
                <img src="${movie.Poster !== "N/A" ? movie.Poster : "./assets/movie_poster-placeholder.png"}" alt="">
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