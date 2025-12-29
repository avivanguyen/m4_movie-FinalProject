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

async function openMovieModal(imdbID) {
  toggleModal();
  
  // Fetch detailed movie data by IMDb ID
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=5aa2e87d&i=${imdbID}`
  );
  const movie = await response.json();
  
  // Update modal content
  document.querySelector(".modal__poster img").src = 
    movie.Poster !== "N/A" ? movie.Poster : "./assets/movie_poster-placeholder.png";
  document.querySelector(".modal__title").textContent = movie.Title;
  document.querySelector(".modal__year").textContent = movie.Year;
  document.querySelector(".modal__plot").textContent = movie.Plot || "No plot available.";
  
  // Update details list
  const detailsList = document.querySelector(".modal__details");
  detailsList.innerHTML = `
    <li><strong>Director:</strong> ${movie.Director || "N/A"}</li>
    <li><strong>Actors:</strong> ${movie.Actors || "N/A"}</li>
    <li><strong>Runtime:</strong> ${movie.Runtime || "N/A"}</li>
    <li><strong>Genre:</strong> ${movie.Genre || "N/A"}</li>
    <li><strong>Rating:</strong> ${movie.imdbRating || "N/A"}/10</li>
  `;
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
      movieCardHtml(movie)
    ).join("");
  } else {
    movieContainer.innerHTML = `<p style="color: white; text-align: center; width: 100%;">No movies found for "${searchMovie}"</p>`;
  }
}

//Movie card results
function movieCardHtml(movie) {
  return `
    <div class="movie-card">
        <div class="movie-card__container" onclick="openMovieModal('${movie.imdbID}')">
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