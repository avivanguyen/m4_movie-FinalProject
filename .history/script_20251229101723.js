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
      movieCardHtml(movie)
    ).join("");
  } else {
    movieContainer.innerHTML = 
        `<div class="breadcrumb">
            <h2>Results showing for "<span id="search-term">${searchMovie}</span>"</h2>
        </div>`;
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
async function movieModalHtml(imdbID) {
    toggleModal();
    const response = await fetch(
        `https://www.omdbapi.com/?apikey=5aa2e87d&i=${imdbID}`
      );
    const movie = await response.json();

    const detailsList = documen
}