export default class API {
  static appID = 'KBe5C9DIOBKtmbfBe81E';

  static baseURL = 'https://api.tvmaze.com';

  static showMoviesURL = '/shows';

  static url = API.baseURL + API.showMoviesURL;

  static appBaseURL =
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

  static likesURL = `${API.appBaseURL}apps/KBe5C9DIOBKtmbfBe81E/likes`;

  static getData = async () => {
    const res = await fetch(API.url);
    const result = await res.json();
    return result;
  };

  static postLikes = async (id) => {
    const likedMovieID = { item_id: `${id}` };
    await fetch(API.likesURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(likedMovieID),
    });
  };
}
