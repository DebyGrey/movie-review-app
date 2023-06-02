export default class API {
  static baseMoviesURL = 'https://api.tvmaze.com';

  static showMoviesEndPoint= '/shows';

  static baseMoviesURL = API.baseMoviesURL + API.showMoviesEndPoint;

   static baseInvolvementURL =
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/KBe5C9DIOBKtmbfBe81E/';

    static likesURL = `${API.baseInvolvementURL}likes`;

  // Get data
  static getData = async () => {
    const res = await fetch(API.baseMoviesURL);
    const result = await res.json();
    return result;
  };

  // Get Like Data
  static getLikesCount = async () => {
    const res = await fetch(API.likesURL);
    const result = await res.json();
    return result;
  };
}
