const homeButton = document.getElementById('home');
const discoverButton = document.getElementById('discover');

discoverButton.addEventListener('click', function(){
    location.replace('/moviesPage/discover.html')
})

homeButton.addEventListener('click', function(){
    location.replace('/index.html');
})

