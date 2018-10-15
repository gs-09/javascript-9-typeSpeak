//Init SpeechSynthesis API
const synth= window.speechSynthesis; //return a speechSynthesis object

//DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

//Init Voices Array
let voices = [];
const getVoices = () => {
    voices = synth.getVoices();
    
    //Loop through voices and create an option for each one
    voices.forEach(voice => {
        //Create Option element
        const option = document.createElement('option');
        
        //Filll the option with voice and language
        option.textContent = voice.name + '(' + voice.lang + ')';

        //Set needed option attributes

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
};

getVoices();
if( synth.onvoiceschanged !== undefined ){
    synth.onvoiceschanged = getVoices;
}

const speak = () => {
    // Check if speaking
    if( synth.speaking){
        console.error('Already speaking....');
        return;
    }
    if( textInput.value !== '' ){
        //Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        //Speak end
        speakText.onend = e => {
            console.log('Done Speaking...');
        }

    //Speak Error
        speakText.error = e => {
            console.error('Something went wrrong....')
        }

        //Selected Voice
        const selectedVoice = voiceSelect.selectedOptions[0]
            .getAttribute('data-name');

    //Loop through voices
    voices.forEach(voice => {
        if( voice.name === selectedVoice ){

            speakText.voice = voice;
        }
    });

    //Set Pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //Speak
    synth.speak(speakText);
    }
};





//Event Listener

//Text form submit
textForm.addEventListener('submit', 
    e => {
    e.preventDefault();
    speak();
    textInput.blur();
});



//Rate value changes
rate.addEventListener('change',
    e => rateValue.textContent = rate.value);

//Pitch value changes 
pitch.addEventListener('change',
    e => pitchValue.textContent = pitch.value);



//Voice Select change
voiceSelect.addEventListener('change', 
    e => speak());