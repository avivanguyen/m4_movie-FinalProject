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

  const movieContainer = document.querySelector(".movie");
  const loadingSpinner = document.querySelector(".loading");
  const sortSelect = document.getElementById("sort-select");

  

  loadingSpinner.classList.remove("hidden");

  // Fetch movies from API
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=5aa2e87d&s=${searchMovie}`
  );
  const data = await response.json();

  loadingSpinner.classList.add("hidden");

  if (data.Response === "True") {
    movieContainer.innerHTML = data.Search
    .slice(0, 6) // Limit to first 6 results//
      .map((movie) => movieCardHtml(movie))
      .join("");
  } else {
    movieContainer.innerHTML = `<div class="breadcrumb">
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

// //Movie modal results
// async function movieModalHtml(imdbID) {
//   toggleModal();
//   const response = await fetch(
//     `https://www.omdbapi.com/?apikey=5aa2e87d&i=${imdbID}`
//   );
//   const movie = await response.json();

//   document.querySelector(".modal__poster img").src =
//     movie.Poster !== "N/A"
//       ? movie.Poster
//       : "./assets/movie_poster-placeholder.png";
//   document.querySelector(".modal__title").textContent = movie.Title;
//   document.querySelector(".modal__year").textContent = movie.Year;
// }
// function movieModalHtml(movie) {
//   return `
//     <div class="modal">
//             <div class="modal__half modal__poster">
//                 <figure>
//                     <img src="${
//                       movie.Poster !== "N/A"
//                         ? movie.Poster
//                         : "./assets/movie_poster-placeholder.png"
//                     }" alt="">
//                 </figure>
//             </div>
//             <div class="modal__half modal__description">
//                 <h2 class="modal__title">${movie.Title}</h2>
//                 <p class="modal__year">${movie.Year}</p>
//                 <p class="modal__plot">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
//                 <ul class="modal__details">
//                     <li><strong>Director:</strong> Director Name</li>
//                     <li><strong>Actors:</strong> Actor 1, Actor 2, Actor 3</li>
//                     <li><strong>Runtime:</strong> XX min</li>
//                 </ul>
//                 <button class="watch">Watch Now</button>
//             </div>
//             <button class="close-button" onclick="toggleModal()">Close</button>
//         </div>`;
// }
