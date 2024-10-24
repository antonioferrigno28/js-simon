// @qui Ciao ragazzi,
// Esercizio di oggi: Simon Says
// nome repo: js-simon

// Descrizione:
// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.

// Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.

// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

// Potete usare liste, input e bottoni non stilizzati, mettendo stampe di debug in console e risultato finale in un alert.
// Solo una volta finito, a piacere e facoltativamente, potete aggiungete lo stile.
// NOTA:  non è importante l'ordine con cui l'utente inserisce i numeri, basta che ne indovini il più possibile.

// BONUS
// Inseriamo la validazione: se l'utente mette due numeri uguali o inserisce cose diverse da numeri lo blocchiamo in qualche modo.
// Se l’utente ha inserito qualcosa di non valido, segnaliamolo visivamente nel form.

// Consigli del giorno
// Pensate prima in italiano.
// Dividete in piccoli problemi la consegna.
// Individuate gli elementi di cui avete bisogno per realizzare il programma.
// Immaginate la logica come fosse uno snack: "Dati 2 array di numeri, indica quali e quanti numeri ci sono in comune tra i due array"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//raccolta elementi pagina
const userInputsContainerEl = document.getElementById("user-inputs");
const randomNumbersEl = document.getElementById("random-numbers");
const startGameButtonEl = document.getElementById("start-game");
const submitNumbersButtonEl = document.getElementById("submit-user-numbers");
const resultEl = document.getElementById("result");
const correctNumbersEl = document.getElementById("correct-numbers");
const userNumbersEl = document.getElementById("user-numbers");
const randomNumbersResultEl = document.getElementById("random-numbers-result");
const invalidNumbersEl = document.getElementById("invalid-numbers");
const error = document.getElementById("error");

//raccolta numeri utente
const userInputs = document.getElementById("user-inputs");

//Inizializzo un array vuoto dove finiranno i numeri generati
let generatedNumbers = [];

//Validazione input utente

//Funzione per generare 5 numeri casuali
function generateRandomNumbers() {
  //FINCHE' la lunghezza dell'array è minore di 5
  while (generatedNumbers.length < 5) {
    //Genero un numero random da 1 a 99
    let randomNum = Math.floor(Math.random() * 99) + 1;
    //SE il numero NON è presente nell'array
    if (!generatedNumbers.includes(randomNum)) {
      //Allora lo pusho nell'array
      generatedNumbers.push(randomNum);
    }
  }
  //Ritorno l'array di numeri generati
  return generatedNumbers;
}

//console.log(generateRandomNumbers());

// Event listener pulsante "Inizia"
startGameButtonEl.addEventListener("click", function () {
  // richiamo funzione che genera 5 numeri casuali tra 1 e 99
  const randomNumbers = generateRandomNumbers();

  // Visualizza i numeri generati in pagina
  randomNumbersEl.innerHTML = randomNumbers;

  //Nascondi il tasto "Inizia"
  startGameButtonEl.classList.add("d-none");

  // Dopo 30 secondi nasconde i numeri e mostra gli input
  setTimeout(function () {
    // Nascondi i numeri
    randomNumbersEl.classList.add("d-none");

    // Richiamo funzione che mostra gli input
    showUserInputs();
  }, 3000);
});

// Event listener pulsante "Invia"
submitNumbersButtonEl.addEventListener("click", function () {
  // Raccogli i numeri inseriti dall'utente
  const userNumbers = collectUserNumbers();

  //Validazione input utente
  //SE la validazione fallisce
  if (!validateUserNumbers(userNumbers)) {
    //Visualizza l'errore in pagina
    error.classList.remove("d-none");
    error.innerHTML =
      "ERRORE! Hai inserito un doppione o un numero minore di 1 o maggiore di 99";
    //interrompe l'esecuzione
    return;
    //ALTRIMENTI
  } else {
    //Nascondi l'errore
    error.classList.add("d-none");
  }

  // Richiamo funzione per il confronto dei numeri inseriti dall'utente con quelli generati casualmente
  const correctNumbers = compareNumbers();

  // Visualizza il risultato in pagina
  showResult(correctNumbers, userNumbers);

  //Nascondi il tasto "Invia"
  submitNumbersButtonEl.classList.add("d-none");
});

// Funzione per mostrare gli input
function showUserInputs() {
  userInputsContainerEl.classList.remove("d-none");
  //Mostra il tasto "Invia"
  submitNumbersButtonEl.classList.remove("d-none");
}

//Funzione per raccogliere i numeri inseriti dall'utente
function collectUserNumbers() {
  // Raccolgo tutti gli input del div user-inputs
  const userInputs = document.querySelectorAll("#user-inputs input");
  // Inizializzo un array vuoto
  let userNumbers = [];
  // Per ogni input
  userInputs.forEach((input) => {
    // Leggo il valore dell'input e lo trasformo in numero
    const value = parseInt(input.value);
    //SE il valore è un numero
    if (!isNaN(value)) {
      // Allora lo pusho nell'array
      userNumbers.push(value);
    }
  });

  // Ritorna l'array con i numeri inseriti dall'utente
  return userNumbers;
}

//Funzione per il confronto dei numeri inseriti dall'utente con quelli generati casualmente
function compareNumbers() {
  //Raccogli i numeri generati casualmente
  const randomNumbers = generateRandomNumbers();
  //Raccogli i numeri inseriti dall'utente
  const userNumbers = collectUserNumbers();
  //Inizializzo un array vuoto
  let correctNumbers = [];
  //Per ogni numero generato
  randomNumbers.forEach((number) => {
    //Se il numero è presente nell'array dei numeri inseriti dall'utente
    if (userNumbers.includes(number)) {
      //Allora lo pusho nell'array
      correctNumbers.push(number);
    }
  });
  //Ritorno l'array con i numeri corretti
  return correctNumbers;
}

//Funzione per visualizzare il risultato in pagina
function showResult(correctNumbers, userNumbers) {
  //Ritorna la quantità di numeri corretti
  const correctNumbersLength = correctNumbers.length;
  //Ritorna la quantità di numeri inseriti dall'utente
  const userNumbersLength = userNumbers.length;

  //Visualizza il risultato in pagina
  resultEl.innerHTML = `Hai indovinato ${correctNumbersLength} numeri correttamente`;
  //console.log(correctNumbersLength, userNumbersLength);

  //visualizza i numeri corretti in pagina
  if (correctNumbersLength > 0) {
    //Inserisci i numeri corretti in pagina
    correctNumbersEl.innerHTML = `I numeri corretti sono: ${correctNumbers}`;
  } else {
    //Se non ci sono numeri corretti visualizza messaggio "di sconfitta" in pagina
    correctNumbersEl.innerHTML = `Non posso mostrarti i numeri corretti... Perchè non hai indovinato nessun numero :(`;
  }

  //visualizza i numeri inseriti dall'utente in pagina
  userNumbersEl.innerHTML = `I numeri inseriti dall'utente sono: ${userNumbers}`;

  //Visualizza i numeri generati in pagina
  randomNumbersResultEl.innerHTML = `I numeri generati casualmente sono: ${generatedNumbers}`;
}

//BONUS

function validateUserNumbers(userNumbers) {
  let seenNumbers = []; // Array per tenere traccia dei numeri già inseriti
  //PER i che inizia da 0 fino ad arrivare alla lunghezza dell'array, incrementa i
  for (let i = 0; i < userNumbers.length; i++) {
    // Leggi il numero corrente
    const num = userNumbers[i];

    // SE un numero è minore di 0, maggiore di 99 o se è NaN
    if (isNaN(num) || num <= 0 || num > 99) {
      // Allora ritorna falso
      return false;
    }

    // Controlla se il numero è già stato inserito
    if (seenNumbers.includes(num)) {
      // Ritorna falso
      return false;
    }

    // Aggiungi il numero all'array dei numeri già visti
    seenNumbers.push(num);
  }
  // Ritorna vero se tutte le validazioni passano
  return true;
}
