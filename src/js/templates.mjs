export function cardTemplate(movie){
    let release = movie.release_date.split("-")[0];
    let vote = movie.vote_average.toFixed(1);
    return `<div class="movieCard">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                <div class="title">${movie.title}</div>
                <span class="release">${release}</span>
                <span class="vote">${vote}</span>
            </div>`;
}