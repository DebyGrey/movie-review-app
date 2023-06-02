import API from './API.js';
import likesCounter from './likesCounter.js';
import movieCounter from './moviesCounter.js';
import Comment from './comment.js';

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
        const movieListItemContent = `<img src="${movie.image.medium}"/> <div class="movie-title-header"><h4>${movie.name}</h4> <button type="button" class="like-btn"><i id="${movie.id}" class="fa-regular fa-heart fa-xl" aria-hidden="true"></i></button></div><p class="likes-counter-container"><span id="${movie.id}" class="likes-counter"></span> likes</p><button class="comment-btn" id="${movie.id}" type="buttton">Comments</button><button class="reservation-btn" id="${movie.id}" type="button">Reservations</button>`;
        movieListItem.innerHTML = movieListItemContent;
        movieListContainer.appendChild(movieListItem);
      });
    }
    // add event listener to the like buttons
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        await UI.addLikes(e);
        UI.updateLikesCount();
      });
    });
    // add event listener to the comments buttons
    const commentBtns = document.querySelectorAll('.comment-btn');
    commentBtns.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        UI.popWindow(e);
      });
    });
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

  // pop up window
  static popWindow = async (event) => {
    event.preventDefault();
    const movieId = event.target.id;
    const movieList = await API.getData();
    const movieChoice = movieList.find(
      (item) => item.id === parseInt(movieId, 10),
    );

    if (typeof movieChoice === 'object') {
      if (document.contains(document.getElementById('box'))) {
        document.getElementById('box').remove();
      }

      const mainContainer = document.createElement('div');
      mainContainer.id = 'box';

      const closeDiv = document.createElement('div');
      closeDiv.className = 'closeBtn';
      const close = document.createElement('button');
      close.innerText = 'Close';
      close.id = 'closeBtn';
      closeDiv.appendChild(close);
      mainContainer.appendChild(closeDiv);

      const movieDiv = document.createElement('div');
      const movieImg = document.createElement('img');
      movieImg.src = movieChoice.image.medium;
      movieImg.alt = movieChoice.name;
      movieImg.id = 'movieImg';
      movieImg.classList.add('comment-img-holder');
      movieDiv.appendChild(movieImg);
      mainContainer.appendChild(movieDiv);

      const popupTitle = document.createElement('div');
      const title = document.createElement('h3');
      title.innerText = movieChoice.name;
      title.className = 'text-3xl font-semibold text-center text-black';
      popupTitle.className = 'px-4 py-2 border-b';
      popupTitle.appendChild(title);
      mainContainer.appendChild(popupTitle);

      const movieObjDiv = document.createElement('div');
      //  container.appendChild(movieObjDiv);
      movieObjDiv.className = 'grid grid-cols-2 text-center';

      const genre = document.createElement('span');
      genre.innerHTML = `<h4 class="color-white">Genre: ${movieChoice.genres}</h4>`;
      movieObjDiv.appendChild(genre);
      const rating = document.createElement('span');
      rating.innerHTML = `<h4 class="color-white">Rating: ${movieChoice.rating.average}</h4>`;
      movieObjDiv.appendChild(rating);
      const language = document.createElement('span');
      language.innerHTML = `<h4 class="color-white">Language: ${movieChoice.language}</h4>`;
      movieObjDiv.appendChild(language);
      const premiered = document.createElement('span');
      premiered.innerHTML = `<h4 class= "color-white">Language:${movieChoice.premiered}</h4>`;
      movieObjDiv.appendChild(premiered);
      mainContainer.appendChild(movieObjDiv);

      const description = document.createElement('p');
      description.innerHTML = movieChoice.summary;
      mainContainer.appendChild(description);

      const commentContainer = document.createElement('div');
      commentContainer.id = `commentContainer${movieChoice.id}`;
      mainContainer.appendChild(commentContainer);

      const commentForm = document.createElement('form');
      commentForm.className = '';
      commentForm.id = `commentForm${movieChoice.id}`;
      const inputName = document.createElement('input');
      inputName.id = 'inputName';
      inputName.className = 'input';
      inputName.placeholder = 'Your name';
      const inputComment = document.createElement('textarea');
      inputComment.id = 'inputComment';
      inputComment.className = 'textarea';
      inputComment.placeholder = 'Your insights...';
      const addButton = document.createElement('button');
      addButton.type = 'submit';
      addButton.id = movieChoice.id;
      addButton.className = 'textarea, comment-btn';
      addButton.innerText = 'Comment';
      mainContainer.appendChild(commentForm);
      commentForm.appendChild(inputName);
      commentForm.appendChild(inputComment);
      commentForm.appendChild(addButton);
      document.body.appendChild(mainContainer);
      Comment.displayComments(movieId);
      const closeBtn = document.getElementById('closeBtn');

      closeBtn.addEventListener('click', () => {
        //  mainContainer.classList.add('hidden');
        //  mainContainer.classList.remove('popup-open');
        //  body.classList.remove('popup-open');
        // document.head.removeChild(style);
        mainContainer.remove();
      });
    }
  };
}