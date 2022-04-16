"use strict";

const id = document.querySelector("#id"),
  name = document.querySelector("#name"),
  pw = document.querySelector("#pw"),
  confirmPw = document.querySelector("#confirmPw"),
  email = document.querySelector("#email"),
  registerBtn = document.querySelector("#registerBtn");

registerBtn.addEventListener("click", reigster);

function reigster() {
  if (!id.value) return alert("아이디를 입력해주세요.");
  if (pw.value !== confirmPw.value) {
    return alert("비밀번호가 일치하지 않습니다.");
  }

  const req = {
    id: id.value,
    name: name.value,
    pw: pw.value,
    email: email.value,
  };
  console.log(req);
  //   fetch("/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(req),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.success) {
  //         location.href = "/";
  //       } else {
  //         alert(res.msg);
  //       }
  //     })
  //     .catch((err) => {
  //       console.err(new Error("로그인 중 에러 발생"));
  //     });
}
