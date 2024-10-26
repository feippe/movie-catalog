import { loadHeaderAndFooter, getParam } from "./utils.mjs";
import Tmdb from "./Tmdb.Class.mjs";
import Movie from "./Movie.Class.mjs";
import Configs from "./Configs.Class.mjs";

loadHeaderAndFooter();

const configs = new Configs();
const tmdb = new Tmdb(configs.language, configs.country);

const idMovie = getParam("id");
new Movie(idMovie, tmdb, configs);
