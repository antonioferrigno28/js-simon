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

//raccolta numeri utente
const userInputs = document.getElementById("user-inputs");

//Funzione per generare 5 numeri casuali
function generateRandomNumbers() {
  //Inizializzo un array vuoto dove finiranno i numeri generati
  let generatedNumbers = [];
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

// Funzione per iniziare il gioco
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

// Funzione per mostrare gli input
function showUserInputs() {
  userInputsContainerEl.classList.remove("d-none");
  //Mostra il tasto "Invia"
  submitNumbersButtonEl.classList.remove("d-none");
}
