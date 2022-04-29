const moreButton = document.querySelectorAll(".more");

for (let i = 0; i < moreButton.length; i++) {
  moreButton[i].addEventListener("click", () => {
    moreButton[i].children[1].classList.toggle("d-none");
  });
}

// if (document.getElementById("image")) {
//   let uploadNum = 0; //올릴 사진 셀 변수
//   let index = 0; //img에 붙일 index

//   document.getElementById("image").addEventListener("change", function (e) {
//     const formData = new FormData(); //서버로 보낼 이미지 form
//     const length = this.files.length;
//     const max = 4; //최대 4장까지
//     switch (uploadNum) {
//       case 0:
//         if (length > max - uploadNum) {
//           alert("사진은 최대 4장까지만 가능합니다.");
//           return;
//         }
//         uploadNum += length;
//         break;
//       case 1:
//         if (length > max - uploadNum) {
//           alert("사진은 최대 4장까지만 가능합니다.");
//           return;
//         }
//         uploadNum += length;
//         break;
//       case 2:
//         if (length > max - uploadNum) {
//           alert("사진은 최대 4장까지만 가능합니다.");
//           return;
//         }
//         uploadNum += length;
//         break;
//       case 3:
//         if (length > max - uploadNum) {
//           alert("사진은 최대 4장까지만 가능합니다.");
//           return;
//         }
//         uploadNum += length;
//         break;
//       default:
//         alert("사진은 최대 4장까지만 가능합니다.");
//         return;
//     }
//     console.log("업로드한 사진 : ", uploadNum);
//     console.log("현재 올린 사진 : ", this.files);
//     for (let i = 0; i < length; i++) {
//       formData.append("img", this.files[i]);
//       index++;
//     }
//     axios.post("/post/img", formData).then((res) => {
//       let url = JSON.parse(res.data);
//       console.log(url);
//       let img_html = "";
//       for (let i = 0; i < url.length; i++) {
//         console.log("미리보기", url[i]);
//         img_html += `<div class="img-preview${index}"> <img id="img-preview${index}" src="${url[i]}" width="250" alt="미리보기"> <input id="img-url" type="hidden" name="url" value="${url[i]}"> </div>`;
//         console.log("json 길이 : ", url.length);
//         console.log("서버통신index:", index);
//         console.log(img_html);
//       }
//       $(".imagePreview").append(img_html);
//     });
//   });
// }
