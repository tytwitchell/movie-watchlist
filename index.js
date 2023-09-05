
const searchInput = document.getElementById('search-input')

let movieResults = []

document.getElementById('search-btn').addEventListener( 'click',getResults )
document.getElementById('my-watchlist-btn').addEventListener( 'click', getWatchlistHtml )

function getResults(){
    const searchValue = searchInput.value
    let defaultPgContainer = document.getElementById('default-pg-container')

    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=63af26dd&s=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            defaultPgContainer.innerHTML = ''
            for (let movie of data.Search){
                fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=63af26dd&t=${movie.Title}`)
                    .then(res => res.json())
                    .then(movies => {
                        let {Poster, Title, imdbRating, Runtime, Genre, imdbID, Plot} = movies
                        defaultPgContainer.innerHTML += `
                            <div class="results-container">
                                <img src='${Poster}' alt='poster' class="poster"/>
                                <div>
                                    <div class="title-rating-container">
                                        <h3 class="title">${Title}</h3>
                                        <img src="images/star.png" alt='star rating'/>
                                        <p class="rating">${imdbRating}</p>
                                    </div>
                                    <div class="time-genre-btn-container">
                                        <p  class="runtime">${Runtime}</p>
                                        <p class="genre">${Genre}</p>
                                        <div id="movie-btn-${imdbID}">
                                            <button onclick="addToWatchList('${imdbID}')" class="watchlist-btn" id="watchlist-btn-${imdbID}" data-imdbid="${imdbID}">
                                                Watchlist
                                            </button>
                                        </div>
                                    </div>
                                    <div class="plot">
                                        <p class="plot-content">
                                            ${Plot}
                                        </p>
                                        <button class="read-more-btn">...Read more</button>
                                    </div>
                                </div>
                            </div>
                        `
                        movieResults.push(movies)

                        document.querySelectorAll('.read-more-btn').forEach(button => {
                            button.addEventListener('click', function () {
                                const plotContent = this.previousElementSibling;
                                    if (plotContent.style.maxHeight) {
                                        plotContent.style.maxHeight = null;
                                        this.textContent = '...Read More';
                                    } else {
                                        plotContent.style.maxHeight = plotContent.scrollHeight + 'px';
                                        this.textContent = 'Read Less';
                                    }
                            })
                        })
                    })
            }
        })
}

function addToWatchList(movieUuid){
    const movieObj = movieResults.filter(movie => movie.imdbID === movieUuid)[0]
   
    const movieData = {
        Title: movieObj.Title,
        Poster: movieObj.Poster,
        Rating: movieObj.imdbRating,
        Runtime: movieObj.Runtime,
        Genre: movieObj.Genre,
        Plot: movieObj.Plot,
        imdbID: movieObj.imdbID
    }

    function displayErrorMessage() {
        document.getElementById('pop-up-container').innerHTML = `
            <div class="error-pop-up">
                <img class="annoyed-face" src="images/mood-annoyed.png" alt="annoyed face">
                <p> ${movieObj.Title} is already in your watchlist! </p>
            </div>
        `
    }
    
    function displaySuccessMessage() {
        document.getElementById('pop-up-container').innerHTML=`
            <div class="added-pop-up">
                <img class="alien-face"src="images/alien.png" alt="alien face">
                <p> ${movieObj.Title}  has been added to your watchlist! </p>
            </div>
        `
    }

    if (!localStorage.getItem(`movie-${movieUuid}`)) {
        localStorage.setItem(`movie-${movieUuid}`, JSON.stringify(movieData))
        setTimeout(displaySuccessMessage,300)

        document.getElementById(`movie-btn-${movieUuid}`).innerHTML = `
            <div class="added-txt-container">
                <img src="images/circle-check.png" alt='add button icon' class="add-icon" id="add-icon-${movieUuid}"/> 
                <p class="added-txt">Added!</p>
            </div>
        `

        setTimeout(() => {
            const popUp = document.querySelector('.added-pop-up, .error-pop-up');
            if (popUp) {
                popUp.classList.add('fade-out');
            }
        }, 20000);

    } else {
        document.getElementById(`watchlist-btn-${movieUuid}`).classList.add('error-style')

        setTimeout(displayErrorMessage,300)
        setTimeout(() => {
            const popUp = document.querySelector('.added-pop-up, .error-pop-up');
            if (popUp) {
                popUp.classList.add('fade-out');
            }
        }, 20000);
    }
}

function getWatchlistHtml(){
    window.location.href = 'watchlist.html';
}







