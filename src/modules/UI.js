import API from './API.js';

// Display movies
export default class UI {
  static displayMovies = async () => {
    const movieList = await API.getData();
    const movieListContainer = document.querySelector('.movie-list-container');
    movieListContainer.innerHTML = '';
    if (movieList.length === 0) {
      movieListContainer.innerHTML = 'No score to display yet';
    } else {
      movieList.forEach((movie) => {
        const movieListItem = document.createElement('li');
        movieListItem.classList.add('movie-list-item');
        const movieListItemContent = `<img src= "${movie.image.medium}" class= ""/> <div class="movie-title-header"><h4>${movie.name}</h4> <i class="fa-regular fa-heart fa-xl" aria-hidden="true"></i></div><button class="btn" id="comments-btn" type="buttton">Comments</button><button class="btn" id="reservation-btn" type="button">Reservations</button>`;
        movieListItem.innerHTML = movieListItemContent;
        movieListContainer.appendChild(movieListItem);
      });
    }
  };
}
