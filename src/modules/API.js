export default class API {
  // APP ID
  static appID = 'KBe5C9DIOBKtmbfBe81E';

  // static testAppID = '3wtYjl1ATbHwpm26nJ9e';

  static baseURL = 'https://api.tvmaze.com';

  static showMoviesURL = '/shows';

  static url = API.baseURL + API.showMoviesURL;

  // base url and endpoints for involvement API
  static appBaseURL =
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

  static likesURL = `${API.appBaseURL}apps/3wtYjl1ATbHwpm26nJ9e/likes`;

  // Get data
  static getData = async () => {
    const res = await fetch(API.url);
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
