import { themeToggle } from "./script.js";
import { copyLink } from "./script.js";
import { deleteChild } from "./script.js";

themeToggle();

const main = document.querySelector("main");
const saveBtnURL = document.querySelector("#saveURLBtn");

// Function to load saved links from Chrome storage
async function loadLinksFromStorage() {
  console.log("inside the loadLinksFromStorage func");

  const data = await chrome.storage.sync.get(["links"]);
  if (data.links) {
    const savedLinks = JSON.parse(data.links);
    savedLinks.forEach((link) => {
      const urlContainer = createURLContainer();
      urlContainer.querySelector(".titleInput").value = link.title;
      urlContainer.querySelector(".linkInput").value = link.link;
      main.appendChild(urlContainer);
    });
  }
}

// Function to create URL container
function createURLContainer() {
  const urlContainer = document.createElement("div");
  urlContainer.classList.add("urlContainer");

  const titleInput = document.createElement("input");
  titleInput.classList.add("titleInput");
  titleInput.type = "text";
  titleInput.placeholder = "Title";

  const linkInput = document.createElement("input");
  linkInput.classList.add("linkInput");
  linkInput.type = "text";
  linkInput.placeholder = "Link";

  const copyBtn = document.createElement("button");
  copyBtn.innerHTML = '<i class="ri-file-copy-line"></i>';
  copyBtn.classList.add("copybtn");
  copyBtn.addEventListener("click", (e) => copyLink(linkInput));

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="ri-delete-bin-6-line"></i>';
  deleteBtn.classList.add("deletebtn");
  deleteBtn.addEventListener("click", (e) => deleteChild(urlContainer, main));

  urlContainer.append(titleInput, linkInput, copyBtn, deleteBtn);
  return urlContainer;
}

// Function to save link to Chrome storage
async function saveLinkToStorage(urlContainer) {
  const title = urlContainer.querySelector(".titleInput").value;
  const link = urlContainer.querySelector(".linkInput").value;
  if (title !== "" && link !== "") {git stau
    let links = [];
    links.push({ title, link });
    console.log(links[0]);
    await chrome.storage.sync.set({ links: JSON.stringify(links) });
  } else {
    alert("Please! fill All Inputs");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadLinksFromStorage();

  const addURLBtn = document.querySelector("#addURLBtn");
  const saveBtnURL = document.querySelector("#saveURLBtn");

  addURLBtn.addEventListener("click", () => {
    const urlContainer = createURLContainer();
    main.appendChild(urlContainer);
  });

  saveBtnURL.addEventListener("click", () => {
    const urlContainer = main.lastElementChild;
    saveLinkToStorage(urlContainer);
  });
});
