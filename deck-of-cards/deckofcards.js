// 1.

// axios
//   .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
//   .then((res) => {
//     deck_id = res.data.deck_id;
//     return axios.get(
//       `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
//     );
//   })
//   .then((res) =>
//     console.log(
//       `${res.data.cards[0].value.toLowerCase()} of ${res.data.cards[0].suit.toLowerCase()}`
//     )
//   )
//   .catch((err) => console.log(err));

// 2.

// axios
//   .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
//   .then((res) => {
//     deck_id = res.data.deck_id;
//     return axios.get(
//       `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
//     );
//   })
//   .then((res) => {
//     const firstCard = res.data.cards[0];
//     return {
//       firstCard,
//       deck_id: res.config.url.split("/")[5],
//     };
//   })
//   .then((data) => {
//     axios
//       .get(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`)
//       .then((resp) => {
//         console.log(
//           `First Card: ${data.firstCard.value.toLowerCase()} of ${data.firstCard.suit.toLowerCase()}`
//         );
//         console.log(
//           `Second Card: ${resp.data.cards[0].value.toLowerCase()} of ${resp.data.cards[0].suit.toLowerCase()}`
//         );
//         console.log(`Cards Remaining: ${resp.data.remaining}`);
//       });
//   });

// 3.

const body = document.querySelector("body");
let cardDiv = document.querySelector(".card-div");
const gimmeBtn = document.querySelector(".gimme-btn");
const shuffleBtn = document.querySelector(".shuffle-btn");
let deck_id;
let remaining;

function randomPosOrNegNum(num) {
  return Math.floor(Math.random() * (num * 2) + 2) - num + 2;
}

// gets new deck
axios
  .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((res) => {
    deck_id = res.data.deck_id;
    remaining = res.data.remaining;
    gimmeBtn.style.visibility = "visible";
  });

// Event handler for gimme button
gimmeBtn.addEventListener("click", () => {
  console.log(remaining);
  if (remaining > 0)
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
      .then((res) => {
        const card = res.data.cards[0];
        remaining -= 1;
        const img = document.createElement("img");
        img.src = card.image;
        const deg = Math.floor(Math.random() * 97) - 45;
        img.style.rotate = `${deg}deg`;
        img.style.top = `${randomPosOrNegNum(30)}px`;
        img.style.left = `${randomPosOrNegNum(30)}px`;
        cardDiv.append(img);
      });
  else {
    gimmeBtn.style.visibility = "hidden";
    shuffleBtn.style.visibility = "visible";
  }
});

function shuffle() {
  cardDiv.innerHTML = "";
  gimmeBtn.style.visibility = "visible";
  shuffleBtn.style.visibility = "hidden";
  axios
    .get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)
    .then((res) => (remaining = res.data.remaining));
}

shuffleBtn.addEventListener("click", shuffle);
