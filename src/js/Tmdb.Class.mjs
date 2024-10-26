import { ajax } from "./utils.mjs";

export default class Tmdb {

  constructor(language = "en", country = "US") {
    this.apiKey = "3e038c553d49a6a8cdf8df49c057a4b6";
    this.accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTAzOGM1NTNkNDlhNmE4Y2RmOGRmNDljMDU3YTRiNiIsIm5iZiI6MTcyODk0OTc0NS4yNTcxMzcsInN1YiI6IjY0YTliZGQ4NjZhMGQzMDBhZGU3YjZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8dDgb86wLBb67R37I5ec99GE8ceizBMkD0ZuUTu9mRc";
    this.baseUrl = "https://api.themoviedb.org/3/";
    this.imageUrl = "https://image.tmdb.org/t/p/original/";
    this.image500Url = "https://image.tmdb.org/t/p/w500";
    this.image92Url = "https://image.tmdb.org/t/p/w92";
    this.headers = {
      accept: "application/json",
      Authorization: `Bearer ${this.accessToken}`
    };
    this.language = language;
    this.country = country;
  }

  async getPopular(page = 1) {
    return await ajax(
      `${this.baseUrl}movie/popular?language=${this.language}-${this.country}&page=${page}`,
      "GET",
      this.headers
    ).then((e) => {
      return e.results;
    });
  }

  async getLanguages(){
    const langs = await ajax(
      `${this.baseUrl}configuration/languages`,
      "GET",
      this.headers
    );
    return langs;
  }

  async getCountries(){
    const langs = await ajax(
      `${this.baseUrl}watch/providers/regions?language=${this.language}-${this.country}`,
      "GET",
      this.headers
    );
    return langs.results;
  }

  async search(val, page = 1){
    return await ajax(
      `${this.baseUrl}search/movie?query=${val}&include_adult=true&language=${this.language}-${this.country}&page=${page}`,
      "GET",
      this.headers
    ).then((e) => {
      console.log(e.results);
      return e.results;
    });
  }

}
