const urlLogin = "http://localhost:8080/user/login";
const urlLogout = "http://localhost:8080/user/logout";
const urlsignUp = "http://localhost:8080/user/signup";
const url = "http://localhost:8080/products";
const urlShow = "http://localhost:8080/user/show";

let userId = "";
let password = "";
let userName = "";
let userEmail = "";

document.querySelector("#userId").addEventListener("change", (e) => {
  console.log(e.target.value);
  // 확인해보면 엄청 길게 나오는데 여기서 value 값이 필요(입력한 값 나와있음)
  //  → e.target.value 사용
  userId = e.target.value;
});

document.querySelector("#password").addEventListener("change", (e) => {
  console.log(e.target.value);
  password = e.target.value;
});

document.querySelector(".loginBtn").addEventListener("click", () => {
  const data = {
    userId: userId,
    password: password,
  };
  axios
    .post(urlLogin, data, { withCredentials: true }) // url 옆에 전송할 객체 넣음
    .then((response) => {
      console.log("데이터 :", response);
      sessionCurrent();
    })
    .catch((error) => {
      console.log("에러발생 : ", error);
    });
});

document.querySelector(".logoutBtn").addEventListener("click", () => {
  if (confirm("로그아웃 하시겠습니까?")) {
    axios
      .post(urlLogout, {}, { withCredentials: true })
      .then((response) => {
        console.log("데이터: ", response);
        if (response.status == 200) {
          document.querySelector(".login-box").classList.remove("hidden");
          document.querySelector(".user-box").classList.add("hidden");
        }
      })
      .catch((error) => {
        console.log("오류 발생: ", error);
      });
  }
});

document.querySelector(".goToSignUp").addEventListener("click", () => {
  document.querySelector(".login-box").classList.add("hidden");
  document.querySelector(".signUp-box").classList.remove("hidden");
});
document.querySelector(".prevBtn").addEventListener("click", () => {
  document.querySelector(".signUp-box").classList.add("hidden");
  document.querySelector(".login-box").classList.remove("hidden");
});

document.querySelector("#userId2").addEventListener("change", (e) => {
  console.log(e.target.value);
  // 확인해보면 엄청 길게 나오는데 여기서 value 값이 필요(입력한 값 나와있음)
  //  → e.target.value 사용
  userId = e.target.value;
});

document.querySelector("#password2").addEventListener("change", (e) => {
  console.log(e.target.value);
  password = e.target.value;
});

document.querySelector("#userName").addEventListener("change", (e) => {
  console.log(e.target.value);
  userName = e.target.value;
});

document.querySelector("#userEmail").addEventListener("change", (e) => {
  console.log(e.target.value);
  userEmail = e.target.value;
});

const upUserId = document.querySelector("#userId2");
const upUserPW = document.querySelector("#password2");
const upUserName = document.querySelector("#userName");
const upUserEM = document.querySelector("#userEmail");

document.querySelector(".register").addEventListener("click", () => {
  const data = {
    userId: userId,
    password: password,
    userName: userName,
    userEmail: userEmail,
  };
  axios
    .post(urlsignUp, data, { withCredentials: true }) // url 옆에 전송할 객체 넣음
    .then((response) => {
      console.log("데이터 :", response);
      if (response.status == 201) {
        alert("회원가입 완료");
        document.querySelector("#userId2").value = "";
        document.querySelector("#password2").value = "";
        document.querySelector("#userName").value = "";
        document.querySelector("#userEmail").value = "";
        document.querySelector(".signUp-box").classList.add("hidden");
        document.querySelector(".login-box").classList.remove("hidden");
      }
    })
    .catch((error) => {
      console.log("에러발생 : ", error);
    });
});

function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response);
      if (response.status == 200) {
        console.log("세션 유지");
        if (response.status == 200) {
          document.querySelector(".login-box").classList.add("hidden");
          document.querySelector(".user-box").classList.remove("hidden");
          document.querySelector(".user-box p").textContent =
            response.data.userId + "님 환영합니다.";
        }
      }
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });
}

axios
  .get(urlShow)
  .then((response) => {
    console.log("응답 Response :", response);
    console.log(response.data);
    displayUserSum(response.data);
  })
  .catch((error) => {
    console.log("에러 발생 :", error);
  });

function displayUserSum(gameData) {
  const userSum = document.querySelector(".userSum");
  const gageBar = document.querySelector(".gageBar");
  userSum.style.width = `${gameData.length}px`;
  const uma = document.createElement("p");
  uma.textContent = `현재 회원 수 : ${gameData.length}명!`;
  gageBar.appendChild(uma);
}

// js 파일이 로드될 때 호출됨
sessionCurrent();
