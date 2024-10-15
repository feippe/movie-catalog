export function cardTemplate(movie){
    return `<div>
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                <h2>${movie.title}</h2>
                <span>${movie.release_date}</span>
                <span>${movie.vote_average}</span>
            </div>`;
}