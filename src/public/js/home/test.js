"use strict";

const stayNum = document.querySelector("#stayNum"),
  childYes = document.querySelector("#childYes"),
  childNo = document.querySelector("#childNo"),
  mostFac = document.querySelector("#mostFac"),
  mostView = document.querySelector("#mostView"),
  mostMulti = document.querySelector("#mostMulti"),
  testBtn = document.querySelector("#testBtn");

testBtn.addEventListener("click", mode);

function mode() {
  const req = {
    stayNum: stayNum.value,
    childYes: childYes.value,
    childNo: childNo.value,
    mostFac: mostFac.value,
    mostView: mostView.value,
    mostMulti: mostMulti.value,
  };
  // console.log(req, JSON.stringify(req));
  fetch("/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("로그인 중 에러 발생"));
    });
}
