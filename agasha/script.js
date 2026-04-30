const game = document.getElementById("game");
const movesText = document.getElementById("moves");
const winScreen = document.getElementById("winScreen");

let firstCard = null;
let lock = false;
let moves = 0;
let matched = 0;
let cards = [];

function startGame() {
  console.log("START GAME");

  game.innerHTML = "";

  firstCard = null;
  lock = false;
  moves = 0;
  matched = 0;
  cards = [];

  movesText.innerText = moves;

  // סוגר ניצחון בכל התחלה מחדש
  winScreen.style.display = "none";

  fetch("https://api.thecatapi.com/v1/images/search?limit=8")
    .then(res => res.json())
    .then(data => {

      const images = data.map(x => x.url);
      cards = [...images, ...images];

      cards.sort(() => Math.random() - 0.5);

      console.log("cards loaded:", cards.length);

      cards.forEach(src => {
  const card = document.createElement("div");
  card.classList.add("card");

  const inner = document.createElement("div");
  inner.classList.add("inner");

  const front = document.createElement("div");
  front.classList.add("front");

  const img = document.createElement("img");
  img.src = src;

  front.appendChild(img);

  const back = document.createElement("div");
  back.classList.add("back");
  back.innerHTML = "🐱";

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  card.onclick = () => {
    if (lock) return;
    if (card.classList.contains("flipped")) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    lock = true;

    moves++;
    movesText.innerText = moves;

    const img1 = firstCard.querySelector("img").src;
    const img2 = img.src;

    if (img1 === img2) {
      matched += 2;

      firstCard = null;
      lock = false;

      if (matched === cards.length) {
        setTimeout(() => {
          winScreen.style.display = "flex";
        }, 300);
      }

    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        card.classList.remove("flipped");

        firstCard = null;
        lock = false;
      }, 800);
    }
  };

  game.appendChild(card);
});
    });
}

startGame();