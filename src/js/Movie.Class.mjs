import { ajax, qs, ce, getTemplateFromFile } from "./utils.mjs";

export default class Movie {

  constructor(id, tmdb, configs) {
    this.tmdb = tmdb;
    this.id = id;
    this.template = "";
    this.configs = configs;
    if(this.id > 0){
      this.getMovieData().then((e) => { 
        this.data = e;
        this.showPageData();
      });
    }
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

  loadImageBackground(){
    qs("#image-background",this.template).setAttribute("alt",this.data.title);
    qs("#image-background",this.template).setAttribute("src",`${this.tmdb.imageUrl}${this.data.backdrop_path}`);
  }

  loadTitle(){
    qs("h1",this.template).textContent = this.data.title;
    qs("h2",this.template).textContent = this.data.original_title;
    if(this.data.title == this.data.original_title){ qs("h2",this.template).style.display = "none"; }
  }

  loadTagLine(){
    qs("#tag-line",this.template).textContent = this.data.tagline;
  }

  async loadButtonToWatch(){
    if(this.theMovieIsInToWatch(this.data,this.configs.toWatchList) == true){//IS IN
      qs("#button-add-to-watch",this.template).innerHTML = "<i class='fa-regular fa-eye-slash'></i> Remove To Watch";
      qs("#button-add-to-watch",this.template).addEventListener("click",(e) => {
        this.removeFromToWatchList();
      });
    }else{ //IS NOT
      qs("#button-add-to-watch",this.template).innerHTML = "<i class='fa-regular fa-eye'></i> Add To Watch";
      qs("#button-add-to-watch",this.template).addEventListener("click",(e) => {
        this.addToWatchList();
      });
    }
  }

  addToWatchList(){
    this.configs.toWatchList.push(this.data);
    this.configs.setToWatchList();
    qs("#button-add-to-watch").innerHTML = "<i class='fa-regular fa-eye-slash'></i> Remove To Watch";
  }

  removeFromToWatchList(){
    let index = this.getIndex();
    this.configs.toWatchList.splice(index,1);
    this.configs.setToWatchList();
    qs("#button-add-to-watch").innerHTML = "<i class='fa-regular fa-eye'></i> Add To Watch";
  }

  getIndex(){
    for(let i=0;i<this.configs.toWatchList.length;i++){
      if(this.configs.toWatchList[i].id==this.data.id){
        return i;
      }
    }
    return -1;
  }

  theMovieIsInToWatch(data,list){
    let result = false;
    if(list.length > 0){
      list.forEach(m => {
        if(m.id == data.id){
          result = true;
        }
      });
    }
    return result;
  }

  loadRelease(){
    const release = this.data.release_date.split("-")[0];
      qs("#year-release",this.template).innerHTML = `<i class="fa-regular fa-calendar"></i> ${release}`;
  }

  loadRuntime(){
    qs("#runtime",this.template).innerHTML = `<i class="fa-regular fa-clock"></i> ${this.data.runtime}min`;
  }

  loadVotes(){
    const votes = Math.round((this.data.vote_average + Number.EPSILON) * 100) / 100;
    qs("#votes",this.template).innerHTML = `<i class="fa-regular fa-star"></i> ${votes}`;
  }

  loadGenres(){
    this.data.genres.forEach(g => {
      let genre = ce("span");
      genre.className = "genre";
      genre.textContent = g.name;
      qs("#small-data",this.template).appendChild(genre);
    });
  }

  loadStoryLine(){
    qs("#story-line",this.template).textContent = this.data.overview;
  }

  loadCompanies(){
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

  loadTitleInHead(){
    qs("title").textContent = `${this.data.title} - Movie Catalog`;
  }

  printInPage(){
    qs("main .content").append(qs("section#movieData",this.template));
  }

  async loadCast(){
    let result = await ajax(
      `${this.tmdb.baseUrl}movie/${this.id}/credits?language=${this.tmdb.language}-${this.tmdb.country}`,
      "GET",
      this.tmdb.headers
    );
    /*result.cast.sort((a,b) => {
      return (Number(a.popularity) - Number(b.popularity))*-1;
    });*/
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
    qs("#title-streaming-platforms").textContent = `Streaming platform in ${this.configs.countryName}`;
    let result = await ajax(
      `${this.tmdb.baseUrl}movie/${this.id}/watch/providers?language=${this.tmdb.language}-${this.tmdb.country}`,
      "GET",
      this.tmdb.headers
    );
    let providers = result.results[this.tmdb.country];
    if(providers != null){
      if(providers.flatrate != null){
        this.makeListStreaming(qs("#streaming-list"),"Where to streaming it",providers.flatrate);
      }
      if(providers.rent != null){
        this.makeListStreaming(qs("#streaming-list"),"Where to rent it",providers.rent);
      }
      if(providers.buy != null){
        this.makeListStreaming(qs("#streaming-list"),"Where to buy it",providers.buy);
      }
    }else{
      qs("#streaming-list").textContent = `No streaming platforms avaible in ${this.configs.countryName}`;
    }
  }

  makeListStreaming(parent, title, list){
    let titleElement = ce("h3");
    titleElement.textContent = title;
    parent.append(titleElement);
    let listElement = ce("div");
    listElement.className = "list-streaming";
    list.forEach(s => {
      let platformElement = ce("div");
      platformElement.className = "streaming-platform";
      let platformLogoElement = ce("img");
      platformLogoElement.setAttribute("src",`${this.tmdb.image92Url}${s.logo_path}`);
      platformLogoElement.setAttribute("alt",`${s.provider_name}`);
      platformElement.append(platformLogoElement);
      let platformNameElement = ce("div");
      platformNameElement.className = "streaming-platorm-name";
      platformNameElement.textContent = `${s.provider_name}`;
      platformElement.append(platformNameElement);
      listElement.append(platformElement);
    });
    parent.append(listElement);
  }

  async showPageData(){
    await getTemplateFromFile("pdp.movie.data.template").then((t) => {
      const parser = new DOMParser();
      this.template = parser.parseFromString(t,"text/html");
      this.loadImageBackground();
      this.loadTitle();
      this.loadTagLine();
      this.loadButtonToWatch();
      this.loadRelease();
      this.loadRuntime();
      this.loadVotes();
      this.loadGenres();
      this.loadStoryLine();
      this.loadCompanies();
      this.printInPage();
      this.loadTitleInHead();
      this.loadCast();
      this.loadStreaming();
    });
  }

}
