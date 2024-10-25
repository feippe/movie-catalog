import { ajax, qs, ce, getTemplateFromFile } from "./utils.mjs";

export default class Movie {

  constructor(id, tmdb) {
    this.tmdb = tmdb;
    this.id = id;
    this.template = "";
    this.getMovieData().then((e) => { 
      this.data = e;
      this.showPageData();
    });
  }

  async getMovieData() {
    return await ajax(
      `${this.tmdb.baseUrl}movie/${this.id}?language=${this.tmdb.language}-${this.tmdb.country}`,
      "GET",
      this.tmdb.headers
    ).then((e) => {
      return e;
    });
  }

  async loadImageBackground(){
    qs("#image-background",this.template).setAttribute("alt",this.data.title);
    qs("#image-background",this.template).setAttribute("src",`${this.tmdb.imageUrl}${this.data.backdrop_path}`);
  }

  async loadTitle(){
    qs("h1",this.template).textContent = this.data.title;
    qs("h2",this.template).textContent = this.data.original_title;
    if(this.data.title == this.data.original_title){ qs("h2",this.template).style.display = "none"; }
  }

  async loadTagLine(){
    qs("#tag-line",this.template).textContent = this.data.tagline;
  }

  async loadRelease(){
    const release = this.data.release_date.split("-")[0];
      qs("#year-release",this.template).innerHTML = `<i class="fa-regular fa-calendar"></i> ${release}`;
  }

  async loadRuntime(){
    qs("#runtime",this.template).innerHTML = `<i class="fa-regular fa-clock"></i> ${this.data.runtime}min`;
  }

  async loadVotes(){
    const votes = Math.round((this.data.vote_average + Number.EPSILON) * 100) / 100;
    qs("#votes",this.template).innerHTML = `<i class="fa-regular fa-star"></i> ${votes}`;
  }

  async loadGenres(){
    this.data.genres.forEach(g => {
      let genre = ce("span");
      genre.className = "genre";
      genre.textContent = g.name;
      qs("#small-data",this.template).appendChild(genre);
    });
  }

  async loadStoryLine(){
    qs("#story-line",this.template).textContent = this.data.overview;
  }

  async loadCompanies(){
    this.data.production_companies.forEach(company => {
      let companyCard = ce("span");
      companyCard.className = "company";
      let companyImage = ce("img");
      companyImage.setAttribute("src",`${this.tmdb.image92Url}${company.logo_path}`);
      companyImage.setAttribute("alt", `${company.name}`);
      companyCard.appendChild(companyImage);
      let companyName = ce("label");
      companyName.textContent = company.name;
      companyCard.appendChild(companyName);
      qs("#production-companies",this.template).appendChild(companyCard);
    });
  }

  async loadTitleInHead(){
    qs("title").textContent = `${this.data.title} - Movie Catalog`;
  }

  async printInPage(){
    qs("main .content").append(qs("section#movieData",this.template));
  }

  async loadCast(){
    let result = await ajax(
      `${this.tmdb.baseUrl}movie/${this.id}/credits?language=${this.tmdb.language}-${this.tmdb.country}`,
      "GET",
      this.tmdb.headers
    );
    result.cast.sort((a,b) => {
      return (Number(a.popularity) - Number(b.popularity))*-1;
    });
    let c = 0;
    result.cast.forEach(person => {
      c++;
      if(c<=24){
        let personCard = ce("div");
        personCard.className = "cast";
        let personPic = ce("img");
        if(person.profile_path != null){
          personPic.setAttribute("src",`${this.tmdb.image92Url}${person.profile_path}`);
        }else{
          personPic.setAttribute("src",`/images/no-pic-cast.jpg`);
        }
        personPic.setAttribute("alt",`${person.name}`);
        personCard.append(personPic);
        let personName = ce("div");
        personName.className = "castName";
        personName.textContent = person.name;
        personCard.append(personName);
        let personCharacter = ce("div");
        personCharacter.className = "castCharacter";
        personCharacter.textContent = person.character;
        personCard.append(personCharacter);
        qs("#cast-list").append(personCard);
      }
    });
  }

  async loadStreaming(){
    
  }

  async showPageData(){
    await getTemplateFromFile("pdp.movie.data.template").then((t) => {
      const parser = new DOMParser();
      this.template = parser.parseFromString(t,"text/html");
      this.loadImageBackground();
      this.loadTitle();
      this.loadTagLine();
      this.loadRelease();
      this.loadRuntime();
      this.loadVotes();
      this.loadGenres();
      this.loadStoryLine();
      this.loadCompanies();
      this.printInPage();
      this.loadTitleInHead();
      this.loadCast();
      this.leadStreaming();
    });
  }

}