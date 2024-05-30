const url = "http://localhost:8080/api/products/purchaseList";

const data = [
  {
    game: {
      id: 1,
    },
    user: {
      userId: "pololo",
    },
  },
  {
    game: {
      id: 2,
    },
    user: {
      userId: "pololo",
    },
  },
];

document.querySelector(".purchaseBtn").addEventListener("click", () => {
  if (confirm("진짜 구매하시겠습니까?")) {
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        console.log("데이터: ", response.data);
      })
      .catch((error) => {
        console.log("오류 발생: ", error);
      });
  }
});
