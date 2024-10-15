import { loadHeaderAndFooter, renderListWithTemplate, qs } from "./utils.mjs";
import { cardTemplate } from "./templates.mjs";
import Tmdb from "./Tmdb.Class.mjs";
import Configs from "./Configs.Class.mjs";

loadHeaderAndFooter();

let configs = new Configs();

let tmdb = new Tmdb(`${configs.language}-${configs.country}`);
const popular = await tmdb.getPopular();

renderListWithTemplate(popular, cardTemplate, qs("#cardsMovies"));
