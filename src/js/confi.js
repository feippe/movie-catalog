import { loadHeaderAndFooter, ce, qs } from "./utils.mjs";
import Tmdb from "./Tmdb.Class.mjs";
import Configs from "./Configs.Class.mjs";

loadHeaderAndFooter();

let configs = new Configs();
let tmdb = new Tmdb(configs.language, configs.country);

const languages = await tmdb.getLanguages();
showLanguagesOptions(languages, configs.language);
const countries = await tmdb.getCountries();
showCountriesOptions(countries, configs.country);

qs("#sltLanguages").addEventListener("change", (e) => {
  configs.setLanguage(
    e.srcElement.value,
    e.srcElement.options[e.srcElement.selectedIndex].text,
  );
});

qs("#sltCountries").addEventListener("change", (e) => {
  configs.setCountry(
    e.srcElement.value,
    e.srcElement.options[e.srcElement.selectedIndex].text,
  );
});

function showLanguagesOptions(languages, selected) {
  console.log(selected);
  let select = qs("#sltLanguages");
  languages.forEach((element) => {
    let option = ce("option");
    option.textContent = element.english_name;
    option.value = element.iso_639_1;
    if (element.iso_639_1 == selected) {
      option.setAttribute("selected", true);
    }
    select.append(option);
  });
}

function showCountriesOptions(countries, selected) {
  console.log(selected);
  let select = qs("#sltCountries");
  countries.forEach((element) => {
    let option = ce("option");
    option.textContent = element.english_name;
    option.value = element.iso_3166_1;
    if (element.iso_3166_1 == selected) {
      option.setAttribute("selected", true);
    }
    select.append(option);
  });
}
