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
const result = await tmdb.search(q);

qs("h1").innerHTML = `Search by <i>${q}</i>`;

renderListWithTemplate(result, cardTemplate, qs("#cardsMovies"));
