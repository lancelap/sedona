const mainNav = document.querySelector(".main-nav");
const navToggle = document.querySelector(".main-nav__toggle");

mainNav.classList.remove("main-nav--no-js");

navToggle.addEventListener("click", function(event) {
  if (mainNav.classList.contains("main-nav--closed")) {
    mainNav.classList.remove("main-nav--closed");
    mainNav.classList.add("main-nav--opened");
  } else {
    mainNav.classList.add("main-nav--closed");
    mainNav.classList.remove("main-nav--opened");
  }

});
