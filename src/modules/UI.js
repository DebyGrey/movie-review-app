import API from './API.js';

// Display movies
export default class UI {
  static displayMovies = async () => {
    const movieList = await API.getData();
    const likesCount = await API.getLikesCount();
    const movieListContainer = document.querySelector('.movie-list-container');
    movieListContainer.innerHTML = '';
    if (movieList.length === 0) {
      movieListContainer.innerHTML = 'No movies available at this time!';
    } else {
      movieList.forEach((movie) => {
        const movieListItem = document.createElement('li');
        movieListItem.classList.add('movie-list-item');
        const movieListItemContent = `<img src= "${movie.image.medium}"/> <div class="movie-title-header"><h4>${movie.name}</h4> <button type="button" class="like-btn"><i id="${movie.id}" class="fa-regular fa-heart fa-xl" aria-hidden="true"></i></button></div><p class="likes-counter-container"><span class="likes-counter"></span> likes</p><button class="btn" id="comments-btn" type="buttton">Comments</button><button class="btn" id="reservation-btn" type="button">Reservations</button>`;
        movieListItem.innerHTML = movieListItemContent;
        movieListContainer.appendChild(movieListItem);

        // Update likes counter
        const likesCounter = movieListItem.querySelector('.likes-counter');
        const movieLikes = likesCount.find((item) => item.item_id === JSON.stringify(movie.id));

        if (movieLikes) {
          likesCounter.textContent = movieLikes.likes;
        } else {
          likesCounter.textContent = '0';
        }

        // Add event listener to like-btn
        const likeBtn = movieListItem.querySelector('.like-btn');
        likeBtn.addEventListener('click', UI.addLikes);
      });
    }
  };

  // add likes
  static addLikes = async (e) => {
    e.preventDefault();
    const likeID = e.target.id;
    await API.postLikes(likeID);
    UI.displayMovies();
  }
}