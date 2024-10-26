export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}
export function qsa(selector, parent = document) {
    return parent.querySelectorAll(selector);
}
export function ce(element){
    return document.createElement(element);
}
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
export async function ajax(url, method, headers = {}) {
    const options = { method: method, headers: headers };
    return await fetch(url, options)
        .then(response => { return response.json(); })
        .catch(err => { console.error(err); return err; });
}
export async function getTemplateFromFile(file) {
    const path = `/partials/${file}.html`;
    return await fetch(path).then((data) => data.text());
}
export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}
export async function loadHeaderAndFooter(headerId = "header", headerFileName = "header", footerId = "footer", footerFileName = "footer") {
    const templateHeader = await getTemplateFromFile(headerFileName);
    qs(`#${headerId}`).innerHTML = templateHeader;
    qs("#header-search-bar-button").addEventListener("click", (e) => {
        searchMovie();
    });
    qs("#header-search-bar-input").addEventListener("keyup",(e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            searchMovie();
        }
    });
    qs("#hamburguer-menu").addEventListener("click",(e) => {
        qs("nav").className = "opened";
    });
    qs("#hamburguer-close-button i").addEventListener("click",(e) => {
        qs("nav").className = "closed";
    });
    const templateFooter = await getTemplateFromFile(footerFileName);
    qs(`#${footerId}`).innerHTML = templateFooter;
    switch (location.pathname) {
        case "/":
            qs("#nav-home").className = "selected";
            break;
        case "/confi/":
            qs("#nav-confi").className = "selected";
            break;
        case "/to-watch/":
            qs("#nav-to-watch").className = "selected";
            break;
    }
}
export function renderListWithTemplate(list, templateFn, parentElement){
    if(list.length>0){
        list.sort((a,b) => {
            let dta = new Date(a.release_date).getTime();
            let dtb = new Date(b.release_date).getTime();
            return (dta - dtb) * -1;
        });
        let htmlFinal = list.map(templateFn).join('');
        if(htmlFinal !== null){
            parentElement.innerHTML = htmlFinal;
        }
    }else{
        parentElement.innerHTML = `No movies to show!`;
    }
}

function searchMovie(){
    let val = qs("#header-search-bar-input").value;
    if(val.length>2){
        window.location.href = `/search/?q=${val}`;
    }
}
