'use strict'


// Global Variables
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a08f30b64ad00649991362225f4db876&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=a08f30b64ad00649991362225f4db876&query="'

// DOM Elements
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');


// calling Movies
getMovies(API_URL);


// Fetching movies
async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results);
}


// Rendering Movies on Page
function showMovies(movies){
main.innerHTML = '';

movies.forEach((movie)=>{
console.log(movie);
    const {title,poster_path,vote_average,overview} = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="" class="movie-thumbnail">
    <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getclassratings(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
        <h3>overview</h3>
        ${overview}
    </div>
    `
main.appendChild(movieEl);
});
}

function getclassratings(rate){
    if(rate >= 8){
        return 'green'
    }else if(rate >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}


// Search movies
form.addEventListener('submit',(e)=>{
    e.preventDefault()
const search_term = search.value;

if(search_term && search_term !==''){

    getMovies(SEARCH_URL + search_term);

    search.value = '';
}else{
    window.location.reload();
} 
} )