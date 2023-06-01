import API from './API.js';
class Comment extends API {

  static postComment(itemId, username, comment) {
    let url = `${API.baseInvolvementURL}comments`;

    const body = { item_id: itemId, username, comment };
  
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok) {
           
          } else {
            throw new Error(`Failed to create comment: ${response.status}`);
          }
        })
        .catch(() => {
          reject(new Error('Failed to create comment'));
        });
    });
  }

  static getComments(itemId) {
    let url = `${API.baseInvolvementURL}comments?item_id=${itemId}`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Failed to get comments: ${response.status}`);
        })
        .then((data) => {
         
          resolve(data);
        })
        .catch(() => {
          reject(new Error('Failed to get comments'));
        });
    });
  }

  static  displayComments(itemId) {
    let container = document.getElementById(`commentContainer${itemId}`);

    Comment.getComments(itemId)
      .then((comments) => {
        if (comments.length > 0) {
          const list = document.createElement('ul');
          const commentCounter = document.createElement('h2');
          commentCounter.className = '';
          commentCounter.innerHTML = `<h4>Comments</h4b> <b>(</b>${comments.length}<b>)</b>`;
          list.appendChild(commentCounter);
          comments.forEach((comment) => {
            const commentLists = document.createElement('li');
            commentLists.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.comment} `;
            list.appendChild(commentLists);
          });
          container.innerHTML = '';
          container.appendChild(list);
        } else {
          container.innerHTML = 'Sorry,there are no comments to display';
        }
      })
      .catch(() => {
        container.innerHTML = '<b>Sorry,there are no comments to display</b>';
      });
  }
}

export default Comment ;