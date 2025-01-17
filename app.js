
 let cardsListContainer = document.querySelector('.deck');
 let cardsList = cardsListContainer.querySelectorAll('li');


 let cardIcon = [];
 for (let i = 0; i < cardsList.length; i++) {
   cardIcon[i] = cardsList[i].innerHTML;
 }


function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;


  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

   
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


cardIcon = shuffle(cardIcon);




for (let i = 0; i < cardsList.length; i++) {
  cardsList[i].addEventListener('click',displayCardSymbol);
  cardsList[i].innerHTML = cardIcon[i];
}

// display the card's symbol
let clickNo = 0;
function displayCardSymbol() {
  this.setAttribute("style", "transition: transform .9s; transform-style: preserve-3d;");
  let cardsClassAttribute = this.getAttribute("class");
  switch (cardsClassAttribute) {
    case 'card':
      this.setAttribute("class" ,'card open show');
      addToListOfOpenCard(this); 
      break;
  }

  clickNo++;
  if (clickNo === 1) {
    theTimer(false);
  }
  incrementMove(clickNo);
}

const listOfOpenCard = [];
function addToListOfOpenCard(cards) {
  listOfOpenCard.push(cards);
  if ((listOfOpenCard.length > 1) && ((listOfOpenCard.length % 2 ) === 0)) {
    checkMatch(listOfOpenCard.length);
  }
}


function checkMatch(length) {
   listOfOpenCard[length-1].innerHTML === listOfOpenCard[length-2].innerHTML?
   lockMatchCards(length):
   removeUnMatchCards(length);
}


function lockMatchCards(length) {
  for (let i = length-2; i < length; i++) {
    listOfOpenCard[i].setAttribute("class", 'card match');
  }
}

function removeUnMatchCards(length) {
setTimeout(remove,700,length);
}


function remove(ln) {
  for (let i = ln-2; i < ln; i++) {
    listOfOpenCard[i].setAttribute("class", 'card');
  }
  listOfOpenCard.splice(ln-2,2)
}


let counter = document.querySelector('.moves');
function incrementMove(numOfClick) {
 counter.textContent = numOfClick;
 isMatch(); 
}

function isMatch() {
  if (listOfOpenCard.length === cardsList.length) {
    theTimer(true); 
  }
  changeRating(clickNo); 
}



let restartBtn = document.querySelector('.restart');
restartBtn.onclick = refresh;
function refresh() {
  location.reload();
}


let starContainer = document.querySelector('.stars');
function changeRating(clickNo) {
   if (clickNo === 26) {
      starContainer.children[0].remove()
   } else if (clickNo === 32 ) {
      starContainer.children[0].remove()
   } else if (clickNo === 40) {
      starContainer.children[0].remove()
   }
}


t
let timeHeader = document.querySelector('.timer');

let seconds = 0;
let minutes = 0;
function startCounting() {
    if (seconds < 59) {
        seconds += 1;
    } else {
      seconds = 0;
      minutes +=1;
    }

    seconds < 10 ?
    timeHeader.innerHTML = `0${minutes}:0${seconds}`:
    timeHeader.innerHTML = `0${minutes}:${seconds}`;
}

function theTimer(cardsMatch) {
    if (!cardsMatch) {
        timer = setInterval(startCounting, 1000);
    } else {
        clearInterval(timer);
        winningMessage();
    }
}



let winningCard = document.querySelector('.winning-card');
let Conatiner = document.querySelector('.container');

let btn = document.querySelector('.button');

function winningMessage() {
  winningCard.setAttribute('style',
  'display:block;box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);width: 680px;height: 680px;'); //show winning cards

  Conatiner.setAttribute('style','display:none;'); //hide game cards

       switch (starContainer.childElementCount) {
         case 1:
         timeHeader.insertAdjacentHTML('afterbegin',
          `<h3>Congratulation<br><i class="fa fa-star"></i></br></h3>`);
           break;
         case 2:
         timeHeader.insertAdjacentHTML('afterbegin',
          `<h3>Congratulation<br><i class="fa fa-star"></i>\t<i class="fa fa-star"></i></br></h3>`);
           break;
         case 3:
         timeHeader.insertAdjacentHTML('afterbegin',
          `<h3>Congratulation<br><i class="fa fa-star"></i>\t<i class="fa fa-star"></i>\t<i class="fa fa-star"></i></br></h3>`);
           break;
         case 0:
         timeHeader.insertAdjacentHTML('afterbegin',
          `<h3>Congratulation</h3>`);
           break;
         }

  winningCard.appendChild(timeHeader);
}

btn.onclick = refresh; 
