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

  // 태그 요소 생성
  const game = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("p");
  const genre = document.createElement("p");
  const price = document.createElement("p");
  const txt = document.createElement("p");
  const lowBox = document.createElement("div");
  const left = document.createElement("div");
  const right = document.createElement("div");
  const cartBtn = document.createElement("div");

  // 클래스 이름 생성
  game.classList.add("game");
  img.classList.add("image");
  lowBox.classList.add("low-box");
  cartBtn.classList.add("cart-btn");

  // 태그 속성 추가
  img.src = data.image;
  title.textContent = "게임 타이틀: " + data.title;
  genre.textContent = "게임 장르: " + data.genre;
  price.textContent = "게임 가격: " + data.price + "원";
  txt.textContent = data.text;
  game.style.setProperty("box-shadow", "initial", "important");
  game.style.setProperty("transform", "initial", "important");
  game.style.setProperty("cursor", "initial", "important");
  cartBtn.textContent = "장바구니담기";

  // appendChild 부모자식 위치 설정
  right.appendChild(cartBtn);
  left.appendChild(title);
  left.appendChild(genre);
  left.appendChild(price);
  left.appendChild(txt);
  lowBox.appendChild(left);
  lowBox.appendChild(right);
  game.appendChild(img);
  game.appendChild(lowBox);
  product.appendChild(game);

  document.querySelector(".cart-btn").addEventListener("click", () => {
    sessionCurrent(data);
    if (confirm("구매완료 장바구니로 가시겠습니까?")) {
      window.location.href = "http://localhost:8080/gameshop/cart.html";
    } else {
      window.location.href = "http://localhost:8080/gameshop/index.html";
    }
  });
}

function sessionCurrent(data) {
  axios
    .get("http://localhost:8080/user/current", { widthCredentials: true })
    .then((response) => {
      console.log("데이터: ", response.data);
      if (response.status == 200) {
        const userId = response.data.userId;
        let cartItems = JSON.parse(localStorage.getItem(userId));
        if (!cartItems) {
          cartItems = [];
        }
        cartItems.push(data);
        localStorage.setItem(userId, JSON.stringify(cartItems));
      }
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
      alert("로그인해주세요!!");
    });
}

//  <로컬 스토리지 사용법>
//  - 읽기
// localStorage.getItem(키);
//  - 쓰기
// localStorage.getItem(키, 값);
//  - JSON 형태로 저장하기
// localStorage.setItem(키, JSON.stringigy(값));
//  - JSON을 객체형태로 변환해서 읽기
// JSON.parse(localStorage.getItem(키));
