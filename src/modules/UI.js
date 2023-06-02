import API from './API.js';
import likesCounter from './likesCounter.js';
import movieCounter from './moviesCounter.js';

// Display movies
export default class UI {
  static displayMovies = async () => {
    await UI.updateLikesCount();
    const movieList = await API.getData();
    const movieCount = movieCounter(movieList);
    const totalMovies = document.querySelector('.total-movies');
    totalMovies.textContent = movieCount;
    const movieListContainer = document.querySelector('.movie-list-container');
    movieListContainer.innerHTML = '';
    if (movieCount === 0) {
      movieListContainer.innerHTML = 'No movies available at this time!';
    } else {
      movieList.forEach((movie) => {
        const movieListItem = document.createElement('li');
        movieListItem.classList.add('movie-list-item');
        const movieListItemContent = `<img src="${movie.image.medium}"/> <div class="movie-title-header"><h4>${movie.name}</h4> <button type="button" class="like-btn"><i id="${movie.id}" class="fa-regular fa-heart fa-xl" aria-hidden="true"></i></button></div><p class="likes-counter-container"><span id="${movie.id}" class="likes-counter"></span> likes</p><button class="btn" id="comments-btn" type="buttton">Comments</button><button class="btn" id="reservation-btn" type="button">Reservations</button>`;
        movieListItem.innerHTML = movieListItemContent;
        movieListContainer.appendChild(movieListItem);
      });

      // add event listener to the like buttons
      const likeBtns = document.querySelectorAll('.like-btn');
      likeBtns.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          await UI.addLikes(e);
          UI.updateLikesCount();
        });
      });
    }
  };

  // add likes
  static addLikes = async (e) => {
    e.preventDefault();
    const likeID = e.target.id;
    await API.postLikes(likeID);
  };

  // update likes count
  static updateLikesCount = async () => {
    const likesData = await likesCounter.getLikesCount();
    const likesCountElements = document.querySelectorAll('.likes-counter');
    likesCountElements.forEach((element) => {
      const movieId = element.id;
      const movieLikes = likesData.find((item) => item.item_id === movieId);

      if (movieLikes) {
        element.textContent = movieLikes.likes;
      } else {
        element.textContent = '0';
      }
    });
  };
}