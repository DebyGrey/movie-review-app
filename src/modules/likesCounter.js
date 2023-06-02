import API from './API.js';

const getLikesCount = async () => {
  const res = await fetch(API.likesURL);
  const result = await res.json();
  return result;
};

export default { getLikesCount };