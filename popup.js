import { themeToggle } from "./script.js";
import { copyLink } from "./script.js";

themeToggle();

const main = document.querySelector("main");

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

  // Function to delete link from Storage & DOM
  deleteBtn.addEventListener("click", async () => {
    const urlContainer = deleteBtn.parentElement; // Get the parent container to be deleted
    main.removeChild(urlContainer); // Remove the container from the DOM
    const deletingContainerTitle = urlContainer.querySelector(".titleInput").value;
    const data = await chrome.storage.sync.get(["links"]);
    let links = JSON.parse(data.links);
    // Filter out the link with the corresponding title
    links = links.filter(item => item.title !== deletingContainerTitle);
    // Save the updated links back to storage
    await chrome.storage.sync.set({ "links": JSON.stringify(links) });
  });

  urlContainer.append(titleInput, linkInput, copyBtn, deleteBtn);
  return urlContainer;
}

// Function to save link to Chrome storage
async function saveLinkToStorage(urlContainer) {
  const title = urlContainer.querySelector(".titleInput").value;
  const link = urlContainer.querySelector(".linkInput").value;
  
  if (title !== "" && link !== "") {
    const data = await chrome.storage.sync.get(["links"]);
    let links = [];

    // If there are existing links, parse them and add them to the array
    if (data.links) {
      links = JSON.parse(data.links);
    }

    // Append the new link to the array
    links.unshift({ title, link });

    // Save the updated array back to storage
    await chrome.storage.sync.set({ "links": JSON.stringify(links) });
  } else {
    alert("Please! fill all the require feilds");
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
