import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class Configs {

    constructor(language = "config_country") {
        this.language = "en-US";
        this.country = "US";
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
    }
    setLanguage(language){
        if(language !== null){
            setLocalStorage("language",language);
            this.language = language;
            return true;
        }
        return false;
    }
    setCountry(country){
        if(country !== null){
            setLocalStorage("country",country);
            this.country = country;
            return true;
        }
        return false;
    }
}