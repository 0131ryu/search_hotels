const moreButton = document.querySelectorAll(".more");

for (let i = 0; i < moreButton.length; i++) {
  moreButton[i].addEventListener("click", () => {
    moreButton[i].children[1].classList.toggle("d-none");
  });
}

function setThumbnail(event) {
  for (var image of event.target.files) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var img = document.createElement("img");
      img.setAttribute("src", event.target.result);
      document.querySelector("div#imagePreview").appendChild(img);
    };
    console.log(image);
    reader.readAsDataURL(image);
  }
}

//show
// const slideImage = document.querySelector(".slide-container");
// const slides = document.querySelectorAll(".slide-item");

// //slide-item의 갯수
// const totalSlides = slides.length;
// const slideWidth = slideWrapper.clientWidth;
// const slideIndex = 0;
// const slider = document.querySelector(".slide-list");

// slider.style.width = slideWidth * totalSlides + "px";

// function showSlides(n) {
//   slideIndex = n;
//   if (slideIndex == -1) {
//     slideIndex = totalSlides - 1;
//   } else if (slideIndex == totalSlides) {
//     slideIndex = 0;
//   }
//   slider.style.left = -(slideWidth * slideIndex) + "px";
// }

// function plusSlides(n) {
//   showSlides((slideIndex += n));
// }

// function currentSlide(n) {
//   showSlides((slideIndex = n));
// }

// var nextBtn = document.querySelector(".next");
// var prevBtn = document.querySelector(".prev");

// nextBtn.addEventListener("click", function () {
//   plusSlides(1);
// });
// prevBtn.addEventListener("click", function () {
//   plusSlides(-1);
// });

let curPos = 0;
let postion = 0;
const IMAGE_WIDTH = 640;
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const images = document.querySelector(".slide-item");

function prev() {
  if (curPos > 0) {
    nextBtn.removeAttribute("disabled");
    postion += IMAGE_WIDTH;
    images.style.transform = `translateY(${postion}px)`;
    curPos = curPos - 1;
  }
  if (curPos == 0) {
    prevBtn.setAttribute("disabled", "true");
  }
}
function next() {
  if (curPos < 3) {
    prevBtn.removeAttribute("disabled");
    postion -= IMAGE_WIDTH;
    images.style.transform = `translateY(${postion}px)`;
    curPos = curPos + 1;
  }
  if (curPos == 3) {
    nextBtn.setAttribute("disabled", "true");
  }
}

function init() {
  prevBtn.setAttribute("disabled", "true");
  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
}

init();
