export function cardTemplate(movie){
    let release = movie.release_date.split("-")[0];
    let vote = "";
    for(let i = 1; i <= Math.round(movie.vote_average) / 2; i++){
        vote += `<i class="fa-solid fa-star"></i>`;
    }
    for(let i = Math.round(movie.vote_average)/2; i < 5; i++){
        vote += `<i class="fa-regular fa-star"></i>`;
    }
    return `<a href="/movie/?id=${movie.id}" class="movieCard">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                <div class="title">${movie.title}</div>
                <span class="release">${release}<i class="fa-regular fa-calendar"></i></span>
                <span class="vote">${vote}</span>
            </a>`;
}