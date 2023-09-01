
document.getElementById('home-pg-btn').addEventListener('click', getHomePgHtml)


let storageKeys = []


function getHomePgHtml(){
    window.location.href = 'index.html';
}

function removeMovieFromStorage() {

    const removeButtons = document.getElementsByClassName('remove-btn');

    for (let button of removeButtons) {
        button.addEventListener('click', e => {
            
            const imdbID = e.target.getAttribute('data-imdbid');
            const itemKey = `movie-${imdbID}`;
            localStorage.removeItem(itemKey);

            render();

        });
    }
}


function getMovieListHtml(){
    const defaultPgContainer = document.getElementById("default-pg-container")

    console.log(localStorage)

    defaultPgContainer.innerHTML = ''
    let hasMovies = false

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

            if (key.startsWith('movie-')){
                hasMovies = true
                storageKeys.push(key)
    
                const item = JSON.parse(localStorage.getItem(key));
    
                defaultPgContainer.innerHTML += `
                    <div class="results-container">
                        <img src='${item.Poster}' alt='poster' class="poster"/>
                        <div class="title-rating-container">
                            <h3 class="title">${item.Title}</h3>
                            <img src="images/star.png" alt='star rating'/>
                            <p class="rating">${item.Rating}</p>
                        </div>
                        <div class="time-genre-btn-container">
                            <p  class="runtime">${item.Runtime}</p>
                            <p class="genre">${item.Genre}</p>
                            <button class="remove-btn" id="remove-btn-${item.imdbID}" data-imdbid="${item.imdbID}">
                                <img src="images/remove.png" alt='remove button icon' class="remove-icon"/> 
                                Remove
                            </button>
                        </div>
                        <p class="plot">${item.Plot}</p>
                    </div>
                `
            }

        }
        
    if (!hasMovies) {
        defaultPgContainer.innerHTML = `
            <h3 class="default-txt">Your watchlist is looking a little empty...</h3>
            <button class="add-movies-btn" id="add-movies-btn">
                <img src="images/add.png" alt='add button icon' class="add-icon"/> 
                Let's add some movies!
            </button>
        `;
        
        document.getElementById('add-movies-btn').addEventListener('click', getHomePgHtml)
    }

    removeMovieFromStorage()
}

function render(){
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith('movie-')){
            storageKeys.push(key);
        }

    }
    getMovieListHtml()
}
console.log(localStorage)

render()
