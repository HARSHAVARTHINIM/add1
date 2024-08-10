const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
voiceBtn = document.querySelector(".voice-btn"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters = [], correctLetters = [];

function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = [];
    incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }

    console.log(`The word to guess is: ${word}`); // Print the word to the console

    speak(`Hint: ${ranItem.hint}. You have ${maxGuesses} guesses. Start guessing the word.`);
}

randomWord();

function initGame(key) {
    key = key.toLowerCase();
    if (key.length === 1 && key.match(/^[a-z]$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
            speak(`Good job! The letter ${key} is correct.`);
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
            speak(`Sorry, the letter ${key} is not in the word.`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }

    setTimeout(() => {
        if (correctLetters.length === word.length) {
            speak(`Congrats! You found the word ${word.toUpperCase()}.`);
            setTimeout(randomWord, 2000); // Small delay before starting a new word
        } else if (maxGuesses < 1) {
            speak(`Game over! You don't have any remaining guesses. The word was ${word.toUpperCase()}.`);
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
            setTimeout(randomWord, 2000); // Small delay before starting a new word
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);

function speak(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.rate = 1.5;  // Increase speech rate for faster feedback
    speechSynthesis.speak(speech);
}

const recognition = new webkitSpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.continuous = true;  // Continuous listening
recognition.maxAlternatives = 1;

recognition.onresult = (event) => {
    const result = event.results[event.resultIndex];
    const transcript = result[0].transcript.trim().toLowerCase();

    // Extract single letters only
    const singleLetter = transcript.match(/^[a-z]$/);
    if (singleLetter) {
        console.log(`Recognized letter: ${singleLetter[0]}`); // Print the recognized letter to the console
        initGame(singleLetter[0]);
    } else {
        speak("Please say a single letter.");
    }
};

recognition.onerror = (event) => {
    console.log(`Recognition error: ${event.error}`); // Log the error
    speak("Sorry, I didn't catch that. Please try again.");
};

recognition.onend = () => {
    recognition.start();  // Restart recognition immediately
};

voiceBtn.addEventListener("click", () => {
    recognition.start();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        recognition.start();
    }
});
