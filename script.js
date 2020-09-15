const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//?  Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

//? VoiceRSS speech function
function playAJoke(joke) {
  VoiceRSS.speech({
    key: 'd39b3a8591a34b578c3f52174739a055',
    src: joke,
    hl: 'en-gb',
    v: 'Mary',
    r: 0,
    c: 'mp3',
    f: '48khz_16bit_stereo',
    ssml: false,
  });
}

//? Get jokes from Joke API and pass it to the playAJoke function as a variable
async function getJokes() {
  let joke = '';
  const apiUrl =
    'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=religious,racist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    //? check if the joke has one part or two parts
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //! Disable button
    toggleButton();
    //! text-to-speech
    playAJoke(joke);
  } catch (error) {
    //TODO Catch errors here
    console.log('Whoops, ', error);
  }
}

//* Event Listeners
//? Request a joke from the Joke API
button.addEventListener('click', getJokes);
//? Enable the button when the joke ends to play
audioElement.addEventListener('ended', toggleButton);

//! Hide the audio controller
audioElement.hidden = true;
