/**
 * @jest-environment jsdom
 */

import Comment from './comment.js';

describe('Comment', () => {
  const itemId = '123';

  it('should return the correct number of comments for an item', async () => {
    const comments = [
      { username: 'David', comment: 'This is a comment 1' },
      { username: 'Derby', comment: 'This is a comment 2' },
    ];

    jest.spyOn(Comment, 'getComments').mockResolvedValue(comments);

    const container = document.createElement('div');
    container.id = `commentContainer${itemId}`;
    document.body.appendChild(container);

    await Comment.displayComments(itemId);

    expect(container.innerHTML).toContain(`<b><h5>Comments</h5> (${comments.length})</b>`);
    expect(container.innerHTML).toContain(`${comments[0].username}: ${comments[0].comment}`);
    expect(container.innerHTML).toContain(`${comments[1].username}: ${comments[1].comment}`);

    expect(Comment.getComments).toHaveBeenCalledWith(itemId);
  });
});
