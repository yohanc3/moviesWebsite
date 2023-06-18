
var options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmVkNzAxMWFlNTJjNjFkYTgyY2E4ZGM5ZDQ4NDM4ZCIsInN1YiI6IjY0ODY3MWU1MDI4ZjE0MDEzYjg2NTI3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jhskYiUrOyfA7_2ahsNPBud1aGv6oWhll1uQPVScnYw'
      }
};



let counter = 0;
let maxCounter = 9;
let timer;

let popularMoviesData;
let moviesGenresIds;

/// GET MOVIES INFO AND START COUNTER

start();

async function start() {

    await getMoviesInfo();
    await startHeader();

}

async function getMoviesInfo(){

    try{

        popularMoviesData = (await fetchPopularMoviesData()).results.slice(0, maxCounter);

        moviesGenresIds = (await fetchMoviesGenresIds()).genres;

    }

    catch(err){
        console.error('Error', err);
    }

}

async function incrementCounter(){

    if(counter === maxCounter){
        counter = 0;
    }
    
    /// CURRENT MOVIE BACKDROP
    let currentMoviePath = popularMoviesData[counter].backdrop_path;
    let imageElement = document.getElementById('image-test');

    imageElement.src = `https://image.tmdb.org/t/p/original${currentMoviePath}`;

    /// CURRENT MOVIE TITLE

    let titleText = (popularMoviesData[counter].title);
    document.getElementById('header-title').textContent = '';
    document.getElementById('header-title').textContent = titleText;

    /// MOVIE GENRES

    let button1 = document.getElementById('button-1');
    let button2  = document.getElementById('button-2');
    let button3 = document.getElementById('button-3');

    let buttonsArray = [button1, button2, button3];

    /// SETTING MOVIE GENRES
    
    let currentId;

    for(let i = 0; i<3; i++){
            
        currentId = popularMoviesData[counter].genre_ids[i];

        for(let b = 0; b<moviesGenresIds.length; b++){
            if(moviesGenresIds[b].id === currentId){
                buttonsArray[i].value = moviesGenresIds[b].name;
            }
        }

    }

    /// SETTING MOVIE RUNTIME AND RATING

    let runtimeAndVote = document.getElementById('runtime');
    let runtime;
    let runtimeHours = Math.trunc((await fetchMovieDetails(popularMoviesData[counter].id)).runtime/60);
    let runtimeMinutes = (((await fetchMovieDetails(popularMoviesData[counter].id)).runtime/60) - runtimeHours) * 60;

    runtime = `${runtimeHours}h ${runtimeMinutes.toFixed(0)}min`;

    runtimeAndVote.textContent = runtime;


    let rating = document.getElementById('rating');
    let movieRating = ((await fetchMovieDetails(popularMoviesData[counter].id)).vote_average).toFixed(1);

    rating.textContent = `${movieRating}`;
    
    /// SETTING MOVIE DESCRIPTION

    let headerDescription = document.getElementById('header-description');
    headerDescription.textContent = popularMoviesData[counter].overview.slice(0, popularMoviesData[counter].overview.indexOf('.')+1);

    ///INCREASE THE COUNTER
    counter++;

};



            ///////// HELPER FUNCTIONS //////////

    /// START HEADER 

    function startHeader(){

        incrementCounter();
        timer = setInterval(incrementCounter, 6000);

    };

    /// SKIP HEADER MOVIE

    function nextHeader(){

        clearInterval(timer);
        startHeader();
    }

    /// GO TO LAST HEADER MOVIE

    function lastHeader(){
        
            counter-=2;
            if(counter<0){
                counter = maxCounter-1;
            }
            clearInterval(timer);
            startHeader();
    
    }

    function fetchPopularMoviesData(){

        let popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    
        return fetch(popularMoviesUrl, options)
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error('error:' + err)
        });
    
    }
    
    function fetchMoviesGenresIds(){
    
        let url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    
        return fetch(url, options)
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error('error:' + err)
        });
    
    }
    
    function fetchMovieDetails(id){
    
        let url = 'https://api.themoviedb.org/3/movie/REPLACE?language=en-US'.replace('REPLACE', id);
    
    
        return fetch(url, options)
        .then(res => res.json())
        .then(data => {
            return data;
        })
    
    }


    ///EVENT LISTENERS

    document.getElementById('next-timer').addEventListener('click', nextHeader);
    document.getElementById('last-timer').addEventListener('click', lastHeader);

  


    

