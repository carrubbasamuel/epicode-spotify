//! Spotify WebApp

//? 1. Raw structure
// 1. Make an API call to https://striveschool-api.herokuapp.com/api/deezer/search?q=my_search with Postman
// 2. Make an API call to endpoint above with fetch, fill song's details into a proper template, then inject it into results box.
//? 2. Refactored code
// - search fn (async)
// - cycle res fn
// - create template and inject fn

// URL endpoint:
const endpointUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
// Box with results (songs):
const resultBox = document.getElementById("searchSection");
// Search Button GO:
const searchBtn = document.getElementById("button-search");
// Spinner animation element:
const spinner = document.getElementById("spinner");

// Gets search input value and perform an AJAX call with proper q parameter:
function makeSearch() {
    let searchValue = document.getElementById("searchField").value;
    spinner.classList.toggle("d-none");

    fetch(endpointUrl + searchValue)
    .then(res => res.json()) // Promise
    .then(json => cycleResponse(json.data)) 
    .catch((error) => { 
        console.log("Attention! Error description: " + error);
        spinner.classList.toggle("d-none");
    })
}

// Produces a createTemplate fn call for each song in the array:
function cycleResponse(jsonData) {
    // console.log(jsonData);
    resultBox.innerHTML = "";
    jsonData.forEach((song) => { createTemplate(song) });
    document.getElementById("searchField").value = "";
    spinner.classList.toggle("d-none");
}

// Takes song data and spread them into the template, then inject it into results box:
function createTemplate(song) {
    let songBox = document.createElement("div");
    songBox.classList.add("text-light", "p-3", "text-center");
    let img = document.createElement("img");
    img.src = song.artist.picture_medium;
    let title = document.createElement("h6");
    title.classList.add("mt-2");
    title.innerText = song.title;
    let artist = document.createElement("em");
    artist.innerText = song.artist.name;

    // Genera nel DOM (con contenuti dinamici) questo:
    // <div class="songbox-container">
    //     <img src="" alt="">
    //     <h6></h6>
    //     <em></em>
    // </div>

    songBox.appendChild(img);
    songBox.appendChild(title);
    songBox.appendChild(artist);

    resultBox.appendChild(songBox);
}