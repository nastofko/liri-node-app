// require('dotenv').config()
const liriApi = require('./app_api/api')

const inquirer = require('inquirer');
inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: "list",
      name: "choice",
      choices: ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says']
    }
  ])
  .then(input => {
    // Use user feedback for... whatever!!
    const userChoice = input.choice;
    console.log(userChoice)
    if (userChoice === 'concert-this')
      concertThis();
    if (userChoice === 'movie-this')
      movieThis();
    if (userChoice === 'spotify-this-song')
      spotifyThis();
    // else console.log('Input not valid');
  });

// CONCERT THIS FUNCTIONALITY

const bandsInTownAPI = artists => liriApi.bandsInTown(artists).then(res => console.log(res.data));

const concertThis = () => {
  inquirer
    .prompt([{
      type: "input",
      name: "artist",
      message: "Select an Artist",
    }])
    .then(concerts => bandsInTownAPI(concerts.artist));
};

// MOVIE THIS FUNCTIONALITY

const omdbAPI = movie => liriApi.omdb(movie).then(res => console.log(res.data));

const movieThis = () => {
  inquirer
    .prompt([{
      type: "input",
      name: "movie",
      message: "Select a Movie",
    }])
    .then(input => omdbAPI(input.movie));
};

// SPOTIFY THIS FUNCTIONALITY

// const spotifyAPI = song => liriApi.spotify(song).then(res => (console.log(res.data)));

const spotifyThis = () => {
  inquirer
    .prompt([{
      type: "input",
      name: "song",
      message: "Select a Song",
    }])
    .then(
      input => liriApi.spotify(input.song, (res) => {
        console.log(res.tracks.items)
      })
    );
};

// DO-WHAT-IT-SAYS FUNCTIONALLITY
function fileReader() {
  fs.readFile("random.txt", "utf-8", function (error, data) {

    var dataArr = data.trim().split(",");
    //console.log(dataArr);

    if (error) {
      return console.log(error);
    } else if (dataArr[0] === "spotify-this-song") {
      spotifyThis(dataArr[1]);
    }
  });
}