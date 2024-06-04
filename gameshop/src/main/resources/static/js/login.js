const urlLogin = "http://localhost:8080/user/login";
const urlLogout = "http://localhost:8080/user/logout";
const urlSignUp = "http://localhost:8080/user/signup";
const urlShow = "http://localhost:8080/user/show";
let userId = "";
let password = "";

let signupUserId = "";
let signupPassword = "";
let signupUserName = "";
let signupUserEmail = "";

// 로그인 창
document.querySelector("#userId").addEventListener("change", (e) => {
  console.log(e.target.value);
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
      console.log("오류 발생 : ", error);
    });
});
// 로그인 창 끝
// 로그아웃

document.querySelector(".logoutBtn").addEventListener("click", () => {
  if (confirm("🥺 로그아웃 하시겠습니까?")) {
    axios
      .post(urlLogout, {}, { withCredentials: true })
      .then((response) => {
        console.log("데이터: ", response);
        // ↓ 수정한 부분
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
// 로그아웃 끝
// 회원가입 창
document.querySelector(".signupBtn").addEventListener("click", () => {
  document.querySelector(".login-box").classList.add("hidden");
  document.querySelector(".signup-box").classList.remove("hidden");
});

document.querySelector("#signupUserId").addEventListener("change", (e) => {
  console.log(e.target.value);
  signupUserId = e.target.value;
});

document.querySelector("#signupPassword").addEventListener("change", (e) => {
  console.log(e.target.value);
  signupPassword = e.target.value;
});

document.querySelector("#signupUserName").addEventListener("change", (e) => {
  console.log(e.target.value);
  signupUserName = e.target.value;
});

document.querySelector("#signupUserEmail").addEventListener("change", (e) => {
  console.log(e.target.value);
  signupUserEmail = e.target.value;
});

document.querySelector(".signup").addEventListener("click", () => {
  const data = {
    userId: signupUserId,
    password: signupPassword,
    userName: signupUserName,
    userEmail: signupUserEmail,
  };

  axios
    .post(urlSignUp, data, { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response.data);
      if (response.status == 201) {
        alert("회원가입이 완료되었습니다! 🎉 로그인 해주세요 ~.~");
        window.location.reload();
      }
    })
    .catch((error) => {
      console.log("에러 발생 : ", error);
    });
});

// 회원가입 창 끝

function sessionCurrent() {
  let sUserId = [];
  let sUserName = [];
  axios
    .get(urlShow, { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response.data);
      sUserId = response.data.forEach((e) => {
        sUserId.push(e.userId);
        sUserName.push(e.username);
      });

      // sUserId.push(response.data.userId);
      // sUserName.push(response.data.username);
      console.log(sUserId);
      console.log(sUserName);
    })
    .catch((error) => {
      console.log("에러: ", response.data);
    });
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response.data);
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

// js 파일이 로드될 때 호출됨
sessionCurrent();
