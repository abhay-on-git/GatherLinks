import { themeToggle } from "./script.js";
themeToggle();

// Add URL logic
const main = document.querySelector("main");
const addURLBtn = document.querySelector("#addURLBtn");
addURLBtn.addEventListener("click", () => {
  const urlContainer = document.createElement("div");
  urlContainer.classList.add("urlContainer");
  // Create input fields for the new
  const titleInput = document.createElement("input");
  titleInput.classList.add("titleInput");
  titleInput.type = "text";
  titleInput.placeholder = "Title";

  const linkInput = document.createElement("input");
  linkInput.classList.add("linkInput");
  linkInput.type = "text";
  linkInput.placeholder = "Link";

  const copybtn = document.createElement("button");
  copybtn.innerHTML = `<i class="ri-file-copy-line">`;
  copybtn.classList.add("copybtn");

  const deletebtn = document.createElement("button");
  deletebtn.innerHTML = `<i class="ri-delete-bin-6-line">`;
  deletebtn.classList.add("deletebtn");

  // Assuming urlContainer is the parent element
  urlContainer.append(titleInput, linkInput, copybtn, deletebtn);

  main.appendChild(urlContainer);
  
});
