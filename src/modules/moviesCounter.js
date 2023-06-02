import API from './API.js';

const movieCounter = async () => {
  const movieData = await API.getData();
  const movieCounter = movieData.length;
  return (movieCounter);
};

export default { movieCounter };
