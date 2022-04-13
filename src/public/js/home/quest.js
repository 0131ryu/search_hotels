"use strict";

const stayNum = document.querySelector("#stayNum");

const childYes = document.querySelector("#childYes"),
  childNo = document.querySelector("#childNo");

const seniorYes = document.querySelector("#seniorYes"),
  seniorNo = document.querySelector("#seniorNo");

const bedSingle = document.querySelector("#bedSingle"),
  bedDouble = document.querySelector("#bedDouble"),
  bedTwin = document.querySelector("#bedTwin");

const stayCost = document.querySelector("#stayCost");

const mostFac = document.querySelector("#mostFac"),
  mostView = document.querySelector("#mostView"),
  mostMulti = document.querySelector("#mostMulti");

const questBtn = document.querySelector("#questBtn");

questBtn.addEventListener("click", searchStay);

function searchStay() {
  const req = {
    stayNum: stayNum.value,
    childYes: childYes.value,
    childNo: childNo.value,
    seniorYes: seniorYes.value,
    seniorNo: seniorNo.value,
    bedSingle: bedSingle.value,
    bedDouble: bedDouble.value,
    bedTwin: bedTwin.value,
    stayCost: stayCost.value,
    mostFac: mostFac.value,
    mostView: mostView.value,
    mostMulti: mostMulti.value,
  };
  // console.log(req, JSON.stringify(req));
  fetch("/quest", {
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
