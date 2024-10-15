import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class Configs {

    constructor() {
        this.language = "en";
        this.country = "US";
        this.languageName = "English";
        this.countryName = "United States of America";
        this.init();
    }
    init(){
        const language = getLocalStorage("language");
        if(language !== null){
            this.language = language;
        }
        const country = getLocalStorage("country");
        if(country !== null){
            this.country = country;
        }

        const languageName = getLocalStorage("languageName");
        if(languageName !== null){
            this.languageName = languageName;
        }
        const countryName = getLocalStorage("countryName");
        if(countryName !== null){
            this.countryName = countryName;
        }
    }
    setLanguage(language, languageName){
        if(language !== null){
            setLocalStorage("language",language);
            this.language = language;
            setLocalStorage("languageName",languageName);
            this.languageName = languageName;
            return true;
        }
        return false;
    }
    setCountry(country, countryName){
        if(country !== null){
            setLocalStorage("country",country);
            this.country = country;
            setLocalStorage("countryName",countryName);
            this.countryName = countryName;
            return true;
        }
        return false;
    }
}