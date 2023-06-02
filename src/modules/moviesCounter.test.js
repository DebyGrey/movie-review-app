import movieCounter from './moviesCounter.js';

describe('movieCounter', () => {
  it('should return the length of the input array', () => {
    const inputArr = [1, 2, 3, 4, 5];
    const result = movieCounter(inputArr);
    expect(result).toEqual(inputArr.length);
  });

  it('should return 0 if the input array is empty', () => {
    const inputArr = [];
    const result = movieCounter(inputArr);
    expect(result).toEqual(0);
  });
});
