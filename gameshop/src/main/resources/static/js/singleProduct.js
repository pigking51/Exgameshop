const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Game ID: ", id);

const url = "http://localhost:8080/products/" + id;

axios
  .get(url)
  .then((response) => {
    console.log("데이터: ", response.data);
    displaySingleProduct(response.data);
  })
  .catch((error) => {
    console.log("에러 발생: ", error);
  });

function displaySingleProduct(data) {
  const product = document.querySelector(".product");
  const game = document.createElement("div");
  game.classList.add("game");
  const img = document.createElement("img");
  img.src = data.image;
  img.classList.add("image");
  game.appendChild(img);
  const title = document.createElement("p");
  title.textContent = "게임 타이틀: " + data.title;
  const genre = document.createElement("p");
  genre.textContent = "게임 장르: " + data.genre;
  const price = document.createElement("p");
  price.textContent = "게임 가격: " + data.price + "원";
  const txt = document.createElement("p");
  txt.textContent = data.text;
  game.appendChild(title);
  game.appendChild(genre);
  game.appendChild(price);
  game.appendChild(txt);
  game.style.setProperty("box-shadow", "initial", "important");
  game.style.setProperty("transform", "initial", "important");
  game.style.setProperty("cursor", "initial", "important");
  product.appendChild(game);
}
