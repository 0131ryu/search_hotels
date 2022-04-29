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
