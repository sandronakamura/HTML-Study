const button = document.querySelector("#openModal");
const div = button.nextElementSibling;
const body = document.querySelector("body");

button.addEventListener("click", () => {
  div.classList.remove("invisible");
});

body.addEventListener("keydown", (key) => {
  if (!div.classList.contains("invisible")) {
    key.key == "Escape" ? div.classList.add("invisible") : console.log(key);
  } else {
  }
});
