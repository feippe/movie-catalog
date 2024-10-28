import {
  loadHeaderAndFooter,
  renderListWithTemplate,
  qs,
  getParam,
} from "./utils.mjs";
import { cardTemplate } from "./templates.mjs";
import Tmdb from "./Tmdb.Class.mjs";
import Configs from "./Configs.Class.mjs";

loadHeaderAndFooter();

let configs = new Configs();

let tmdb = new Tmdb(configs.language, configs.country);
let q = getParam("q");
let p = getParam("p") != null ? getParam("p") : 1;
const result = await tmdb.search(q, p);

qs("h1").innerHTML = `Search by <i>${q}</i>`;

renderListWithTemplate(result, cardTemplate, qs("#cardsMovies"));
