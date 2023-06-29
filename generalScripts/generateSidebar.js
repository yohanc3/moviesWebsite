let todayButton = document.getElementById('sidebar-today-button');
let weekButton = document.getElementById('sidebar-week-button');

const dayUrl ='https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const weekUrl = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';

todayButton.addEventListener('click', generateSidebarMovies);
weekButton.addEventListener('click', generateSidebarMovies)

let sidebarButtons = [todayButton, weekButton]

let dayPopularMoviesID;
let dayPopularMovies = [];

let weekPopularMoviesID;
let weekPopularMovies = [];

let dayTopMovieData;
let weekTopMovieData;

startSidebar();
todayButton.classList.add('clicked');

async function startSidebar(){

    
    dayPopularMoviesID = await (fetch(dayUrl, options)
    .then(res => res.json())
    .then(data => {
        return data.results.splice(0,8).map((movie) => {
            return movie.id
        });
    }))

    for(const id of dayPopularMoviesID){
        let movie;

        movie = await(fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then(res => res.json())
        .then(data => {
            return data;
        }))

        dayPopularMovies.push(movie);
    }



    weekPopularMoviesID = await (fetch(weekUrl, options)
    .then(res => res.json())
    .then(data => {
        return data.results.splice(0,8).map((movie) => {
            return movie.id
        });
    }))

    for(const id of weekPopularMoviesID){
        let movie;

        movie = await(fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then(res => res.json())
        .then(data => {
            return data;
        }))

        weekPopularMovies.push(movie);
    }

    dayTopMovieData = dayPopularMovies.splice(0,1);
    dayTopMovieData = dayTopMovieData[0];
    weekTopMovieData = weekPopularMovies.splice(0,1);
    weekTopMovieData = weekTopMovieData[0];

    generateDayPopularMovies();

}

async function generateSidebarMovies(e){

    highlightSidebarButton(e);


    if(e.target.value === "today"){
       
        generateDayPopularMovies();

    }
    
    if(e.target.value === "week"){

        generateWeekPopularMovies();

    }

}

async function generateDayPopularMovies()
{

    buildSidebarMovies(dayPopularMovies, dayTopMovieData);

}

async function generateWeekPopularMovies()
{

    buildSidebarMovies(weekPopularMovies, weekTopMovieData);

}

function buildSidebarMovies(moviesData, topMovieData){

    const sidebarMoviesList = document.getElementById('sidebar-movies-list');
    let sidebarMoviesContainer = document.createElement('section')
    sidebarMoviesContainer.classList.add('sidebar-movies-container');
    sidebarMoviesContainer.setAttribute('id', 'sidebar-movies-container');

    if(sidebarMoviesList.innerHTML !== ''){
        sidebarMoviesList.innerHTML = '';
        sidebarMoviesList.appendChild(sidebarMoviesContainer);
    }

    //Build up top 1 movie
    
    let top1Image = document.createElement('img');
    top1Image.src = `https://image.tmdb.org/t/p/original${topMovieData.backdrop_path}`;
    top1Image.classList.add('sidebar-movie-top-1-image');
    
    let top1MovieContainer = document.createElement('div');
    top1MovieContainer.classList.add("sidebar-movie-top-1-container-image");
    top1MovieContainer.appendChild(top1Image);

    let top1Button = document.createElement('button');
    top1Button.classList.add('sidebar-ranking-1');
    top1Button.innerText = "1";

    let top1ButtonContainer = document.createElement('div');
    top1ButtonContainer.classList.add('sidebar-ranking-1-container')
    top1ButtonContainer.appendChild(top1Button);

    let top1Title = document.createElement('div');
    top1Title.classList.add('sidebar-ranking-1-title')
    top1Title.innerText = topMovieData.title;

    let top1InfoContainer = document.createElement('div');
    top1InfoContainer.classList.add('sidebar-movie-1-container');

    top1InfoContainer.appendChild(top1ButtonContainer);
    top1InfoContainer.appendChild(top1Title);

    let top1Container = document.createElement('div');
    top1Container.classList.add('sidebar-movie-top-1-container');

    top1Container.appendChild(top1MovieContainer);
    top1Container.appendChild(top1InfoContainer);

    sidebarMoviesList.appendChild(top1Container);

    //Build up the rest of the movies

    let counter = 2;

    moviesData.forEach(movie => {

        let rankingNumber = document.createElement('div');

        rankingNumber.innerText = counter;
        counter++;
        rankingNumber.classList.add('sidebar-ranking-number');

        let rankingNumberContainer = document.createElement('div');
        rankingNumberContainer.classList.add('sidebar-ranking');
        rankingNumberContainer.appendChild(rankingNumber);

        let rankingPoster = document.createElement('img');
        rankingPoster.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
        
        let rankingPosterContainer = document.createElement('div');
        rankingPosterContainer.classList.add('sidebar-ranking-image-container');
        rankingPosterContainer.appendChild(rankingPoster);

        let rankingTitle = document.createElement('div');
        rankingTitle.classList.add('sidebar-ranking-title');
        rankingTitle.textContent = movie.title;

        let rankingDetails = document.createElement('div');
        rankingDetails.classList.add('sidebar-ranking-info');

        rankingDetails.innerText = `${(movie.vote_average).toFixed(1)}/10 ${Math.trunc(movie.runtime/60)}h ${((movie.runtime/60 - Math.trunc(movie.runtime/60)) * 60).toFixed(0)}m`;

        let rankingTitleContainer = document.createElement('div');
        rankingTitleContainer.classList.add('sidebar-ranking-title-container')
        rankingTitleContainer.appendChild(rankingTitle);
        rankingTitleContainer.appendChild(rankingDetails);

        let rankingContainer = document.createElement('div');
        rankingContainer.classList.add('sidebar-ranking-container');

        rankingContainer.appendChild(rankingNumberContainer);
        rankingContainer.appendChild(rankingPosterContainer);
        rankingContainer.appendChild(rankingTitleContainer);
        

        sidebarMoviesContainer.appendChild(rankingContainer);

    })

}   

function highlightSidebarButton(e){

    console.log(e.target)

    sidebarButtons.map(button => {
        if((button.value !== e.target.value) && button.classList.contains('clicked')){
            button.classList.remove('clicked');
        }
        else{
            e.target.classList.add('clicked');
        }
    })

}

