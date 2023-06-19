let popularMoviesButton = document.getElementById('movies-popular-button');
let trendingMoviesButton = document.getElementById('movies-trending-button');
let recentMoviesButton = document.getElementById('movies-recent-button');

let moviesGrid = document.getElementById('movies-grid')

popularMoviesButton.addEventListener('click', generateMovies);
trendingMoviesButton.addEventListener('click', generateMovies);
recentMoviesButton.addEventListener('click', generateMovies);

popularMoviesButton.classList.add('clicked')
generatePopularMovies();

async function generateMovies(e){

    highlightMoviesButtons(e);

    if(e.target.value === 'popular'){
        
        generatePopularMovies();
        
    }

    if(e.target.value === 'trending'){

        generateTrendingMovies();

    }

    if(e.target.value === 'recent'){

        generateRecentMovies();

    }
    
}

function highlightMoviesButtons(e){
    let buttons = [popularMoviesButton, trendingMoviesButton, recentMoviesButton];

    
    buttons.map(button => {
        if((button.value !== e.target.value) && button.classList.contains('clicked')){
            button.classList.remove('clicked');
        }
        else{
            e.target.classList.add('clicked');
        }
    })
    
}

async function generatePopularMovies(){

    let popularMoviesData;

    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

        if(moviesGrid.innerHTML !== ""){
            moviesGrid.innerHTML = "";
        }

        
        popularMoviesData = await(fetch(url, options)
        .then(res => res.json())
        .then(data => {
            return data.results;
        }));

        
        popularMoviesData.forEach(movie => {


            buildMovie(movie);

        })
}

async function generateTrendingMovies(){

    let trendingMoviesData;

    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

    if(moviesGrid.innerHTML !== ''){
        moviesGrid.innerHTML = '';
    }

    trendingMoviesData = await (fetch(url, options)
    .then(res => res.json())
    .then(data => {
        return data.results;
    }))

    trendingMoviesData.forEach(movie => {

        buildMovie(movie, true);

    })

}

async function generateRecentMovies(){

    let recentMoviesData;

    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';

    if(moviesGrid.innerHTML !== ''){
        moviesGrid.innerHTML = '';
    }

    recentMoviesData = await (fetch(url, options)
    .then(res => res.json())
    .then(data => {
        return data.results;
    }))

    recentMoviesData.forEach(movie => {

        buildMovie(movie);

    })

}

function buildMovie(movie, topRated){

    let movieYear = document.createElement('p');
    movieYear.classList.add('movie-year');
    movieYear.textContent = movie.release_date.substring(0, 4);


    let imagePoster = document.createElement('img');
    imagePoster.classList.add('poster-image');
    imagePoster.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

    let poster = document.createElement('div');
    poster.classList.add('poster')
    poster.appendChild(imagePoster);
    poster.appendChild(movieYear);

    let movieName = document.createElement('p');
    movieName.classList.add('movie-name');
    movieName.textContent = movie.title;

    let movieNameContainer = document.createElement('div');
    movieNameContainer.classList.add('movie-name-container');
    movieNameContainer.appendChild(movieName);

    let movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.appendChild(poster);
    movieCard.appendChild(movieNameContainer);

    moviesGrid.appendChild(movieCard);

    if(topRated){
        let ratingButton = document.createElement('button');
        ratingButton.classList.add('rating-button')


        let ratingTextSpan = document.createElement('span');
        let rating = movie.vote_average;
        ratingTextSpan.textContent = rating;
        ratingTextSpan.classList.add('rating-button-rating')

        let rating10 = document.createElement('span');
        rating10.textContent = '/10';
        rating10.classList.add('rating-button-10')

        ratingButton.appendChild(ratingTextSpan);
        ratingButton.appendChild(rating10);

        console.log(ratingButton);


        poster.appendChild(ratingButton);
    }

    console.log(movieCard);

}
