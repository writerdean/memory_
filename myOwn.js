const allCards = [
  {name: 'Ali', img: 'ali.jpg'},
  {name: 'ali_hula', img: 'ali_hula.jpg'},
  {name: 'ali_cupcake', img: 'ali_cupcake.jpg'},
  {name: 'ali_wings', img: 'ali_wings.jpg'},
  {name: 'Chris', img: 'Chris.jpg'},
  {name: 'aub_icecream', img: 'aub_icecream.jpg'},
  {name: 'Barb', img: 'Barb.jpg'},
  {name: 'city_sunnies', img: 'city_sunnies.jpg'},
  {name: 'DeeDee', img: 'DeeDee.jpg'},
  {name: 'Family', img: 'Family.jpg'},
  {name: 'guitar', img: 'guitar.jpg'} ,
  {name: 'Hunter', img: 'Hunter.jpg'},
  {name: 'jen_joe_sunnies', img: 'jen_joe_sunnies.jpg'},
  {name: 'Jen', img: 'Jen.jpg'},
  {name: 'Makena', img: 'Makena.jpg'},
  {name: 'Scott', img: 'Scott.jpg'},
  {name: 'Denise', img: 'Denise.jpg'},
  {name: 'tongues', img: 'tongues.jpg'},
  {name: 'KC', img: 'KC.jpg'},
  {name: 'go_to_face', img: 'go_to_face.jpg'},
  {name: 'joe_jen', img: 'joe_jen.jpg'},
  {name: 'girls', img: 'girls.jpg'}
]

  const gameArray = []
  for (let i = 0; i < 12; i++) {
  let rand = Math.floor(Math.random() * allCards.length)
  gameArray.push(allCards.splice(allCards[rand], 1))
  }
let gameGrid = gameArray.concat(gameArray);
gameGrid.sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let totalGuesses = 0;
let previousTarget = null;
let delay = 1200;
let matched = document.querySelectorAll('.match')
const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);
gameGrid.forEach(item=> {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = item[0].name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${item[0].img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
}

// const winner = () => {
//   let selected = document.querySelectorAll('.card');
//   selected.forEach(card => {
//     card.classList.add('winner');
//   });
// }

const winner = () => {
  let body = document.querySelector('body');
    body.classList.add('winner');
}

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
    card.classList.remove('back');
  });
};

grid.addEventListener('click', function (event) {
  let clicked = event.target;
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }
    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
        if (gameGrid.length -2 === document.querySelectorAll('.match').length) {
        setTimeout(winner, delay);

          // call animation
          let winners = document.querySelectorAll('.match')
        }
      } else {
        setTimeout(resetGuesses, delay);
      }
      totalGuesses++
      document.getElementById('guesses').innerText = totalGuesses;
    }
    previousTarget = clicked;
  }
});