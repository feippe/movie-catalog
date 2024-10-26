import { loadHeaderAndFooter, renderListWithTemplate, qs } from "./utils.mjs";
import { cardTemplate } from "./templates.mjs";
import Configs from "./Configs.Class.mjs";

loadHeaderAndFooter();

let configs = new Configs();
const result = configs.toWatchList;

renderListWithTemplate(result, cardTemplate, qs("#cardsMovies"));
