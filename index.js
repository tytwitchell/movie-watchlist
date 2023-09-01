
const searchInput = document.getElementById('search-input')

let movieResults = []

document.getElementById('search-btn').addEventListener( 'click',getResults )
document.getElementById('my-watchlist-btn').addEventListener( 'click', getWatchlistHtml )



function getResults(){
    const searchValue = searchInput.value
    let defaultPgContainer = document.getElementById('default-pg-container')

    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=63af26dd&t=${searchValue}`)
        .then(res => res.json())
        .then(movie => {
     
            defaultPgContainer.innerHTML = `
                <div class="results-container">
                    <img src='${movie.Poster}' alt='poster' class="poster"/>
                    <div class="title-rating-container">
                        <h3 class="title">${movie.Title}</h3>
                        <img src="images/star.png" alt='star rating'/>
                        <p class="rating">${movie.imdbRating}</p>
                    </div>
                    <div class="time-genre-btn-container">
                        <p  class="runtime">${movie.Runtime}</p>
                        <p class="genre">${movie.Genre}</p>

                        <button class="watchlist-btn" id="watchlist-btn-${movie.imdbID}" data-imdbid="${movie.imdbID}">
                            <img src="images/add.png" alt='add button icon' class="add-icon" id="add-icon-${movie.imdbID}"/> 
                            Watchlist
                        </button>
                    </div>
                    <p class="plot">${movie.Plot}</p>
                </div>
            `
        movieResults.push(movie)


        document.getElementById(`watchlist-btn-${movie.imdbID}`).addEventListener('click', e => {
            const movieUuid = e.target.getAttribute('data-imdbid')
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
                `;
            }
            
            function displaySuccessMessage() {
                document.getElementById('pop-up-container').innerHTML=`
                    <div class="added-pop-up">
                        <img class="alien-face"src="images/alien.png" alt="alien face">
                        <p> ${movieObj.Title}  has been added to your watchlist! </p>
                    </div>
                `
            }


            if (!localStorage.getItem(`movie-${movie.imdbID}`)) {
                localStorage.setItem(`movie-${movie.imdbID}`, JSON.stringify(movieData))
                setTimeout(displaySuccessMessage,300)

                document.getElementById(`watchlist-btn-${movie.imdbID}`).innerHTML = `
                    <img src="images/circle-check.png" alt='add button icon' class="add-icon" id="add-icon-${movie.imdbID}"/> 
                    Added to watchlist!
                `
                document.getElementById(`watchlist-btn-${movie.imdbID}`).classList.add('success-style')
                

                setTimeout(() => {
                    const popUp = document.querySelector('.added-pop-up, .error-pop-up');
                    if (popUp) {
                        popUp.classList.add('fade-out');
                    }
                }, 20000);
                


            } else {
                console.log('this item already exists')

                document.getElementById(`watchlist-btn-${movie.imdbID}`).classList.add('error-style')
                document.getElementById(`add-icon-${movie.imdbID}`).classList.add('error-style')

                setTimeout(displayErrorMessage,500)
                setTimeout(() => {
                    const popUp = document.querySelector('.added-pop-up, .error-pop-up');
                    if (popUp) {
                        popUp.classList.add('fade-out');
                    }
                }, 20000);
            }

        
        });

        
  
        })

   

}



function getWatchlistHtml(){
    window.location.href = 'watchlist.html';
}




// function addToWatchlist(e){




// }









