const urlLogin = "http://localhost:8080/user/login";
let userId = "";
let password = "";

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
    })
    .catch((error) => {
      console.log("에러발생 : ", error);
    });
});
