export default class API {
  static baseURL = 'https://api.tvmaze.com';

  static showMoviesURL = '/shows';

  static url = API.baseURL + API.showMoviesURL;

  // base url and endpoints for involvement API
  static appBaseURL =
    'https://api.tvmaze.https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

  // APP ID
  static appID = 'KBe5C9DIOBKtmbfBe81E';

  // Get data
  static getData = async () => {
    const res = await fetch(API.url);
    const result = await res.json();
    return result;
  };
}
