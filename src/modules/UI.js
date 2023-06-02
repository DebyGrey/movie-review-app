import Comment from './comment.js';

// import API from './API.js';
// Display movies
export default class UI {
  static movieList;

  static displayMovies = async () => {
    this.movieList = await Comment.getData();
    const likesCount = await Comment.getLikesCount();
    const movieListContainer = document.querySelector('.movie-list-container');

    if (UI.movieList.length === 0) {
      movieListContainer.innerHTML = 'No movies available at this time!';
    } else {
      movieListContainer.innerHTML = '';
      UI.movieList.forEach((movie) => {
        const movieListItem = document.createElement('li');
        movieListItem.classList.add('movie-list-item');
        movieListItem.innerHTML = `<img src= "${movie.image.medium}" class= ""/> <div class="movie-title-header"><h4>${movie.name}</h4> <i id="${movie.id}" class="fa-regular fa-heart fa-xl" aria-hidden="true"></i></div><p class="likes-counter-container"><span class="likes-counter"></span> likes</p><button class="btn" id="comments-btn" type="buttton">Comments</button><button class="btn" id="reservation-btn" type="button">Reservations</button>`;
        movieListContainer.appendChild(movieListItem);

        // Update likes counter
        const likesCounter = movieListItem.querySelector('.likes-counter');
        const movieLikes = likesCount.find((item) => item.item_id === movie.id);
        if (movieLikes) {
          likesCounter.textContent = movieLikes.likes;
        } else {
          likesCounter.textContent = '0';
        }
        const movieListItemContent = `<img src= "${movie.image.medium}" class= ""/> <div class="movie-title-header"><h4>${movie.name}</h4> <i class="fa-regular fa-heart fa-xl" aria-hidden="true"></i></div>
        <button class="btn commentsbtn"  type="buttton" id="${movie.id}">Comments</button>
        <button class="btn" id="reservation-btn" type="button">Reservations</button>`;
        movieListItem.innerHTML = movieListItemContent;
        movieListContainer.appendChild(movieListItem);
        const commentBtn = movieListItem.querySelector('.commentsbtn');
        commentBtn.addEventListener('click', UI.popWindow);
      });
    }
  }

  static popWindow = (event) => {
    event.preventDefault();
    const movieId = event.target.id;
    const movieChoice = UI.movieList.find((item) => item.id === parseInt(movieId, 10));

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
      genre.innerHTML = `<h4>Genre: </h4>${movieChoice.genres}`;
      movieObjDiv.appendChild(genre);
      const rating = document.createElement('span');
      rating.innerHTML = `<h4>Rating: </h4>${movieChoice.rating.average}`;
      movieObjDiv.appendChild(rating);
      const language = document.createElement('span');
      language.innerHTML = `<h4>Language: </h4>${movieChoice.language}`;
      movieObjDiv.appendChild(language);
      const premiered = document.createElement('span');
      premiered.innerHTML = `<h4>Language: </h4>${movieChoice.premiered}`;
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
      addButton.className = 'textarea';
      addButton.innerText = 'Comment';
      mainContainer.appendChild(commentForm);
      commentForm.appendChild(inputName);
      commentForm.appendChild(inputComment);
      commentForm.appendChild(addButton);
      document.body.appendChild(mainContainer);

      const closeBtn = document.getElementById('closeBtn');

      closeBtn.addEventListener('click', () => {
        //  mainContainer.classList.add('hidden');
        //  mainContainer.classList.remove('popup-open');
        //  body.classList.remove('popup-open');
        // document.head.removeChild(style);
        mainContainer.remove();
      });

      Comment.displayComments(movieChoice.id);
      UI.addComment(movieChoice.id);
    }
  }

  static addComment = (itemId) => {
    const commentForm = document.getElementById(`commentForm${itemId}`);
    commentForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (commentForm.inputName.value.length !== 0 && commentForm.inputComment.value.length) {
        Comment.postComment(itemId, commentForm.inputName.value, commentForm.inputComment.value)
          .then(() => {
            Comment.displayComments(itemId);
          })
          .catch(() => {
            throw new Error('Failed to create comment');
          });
        commentForm.reset();
      }
    });
  }
}
