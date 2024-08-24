import { themeToggle } from "./script.js";
import { copyLink } from "./script.js";
import { getActiveTabURL } from "./script.js";
import { notification } from "./script.js";
import { feedBackNotification } from "./script.js";

themeToggle();

// feedback
const feedBackMenu = document.querySelector(".n2 .feedBackMenu");
feedBackMenu.addEventListener("click",()=>{
  feedBackNotification("Please! Drop your 💓 feedback here",`https://chromewebstore.google.com/detail/gatherlinks/gkmnhednlbfalbmeijbmjlaicleeiimb`);
})

// Searching Functionality
searchInput.addEventListener("keyup", () => {
  const searchTerm = searchInput.value.toLowerCase(); 
  const urlContainers = document.querySelectorAll(".urlContainer");
  let found = false; 
  urlContainers.forEach(urlContainer => {
    const title = urlContainer.querySelector(".titleInput").value.toLowerCase(); 
    if (title.includes(searchTerm)) {
      urlContainer.style.display = ''; 
      found = true; 
    } else {
      urlContainer.style.display = 'none'; 
    }
  });
  // If no container matches the search term, display a 404 message
  if (!found) {
    notification("404 Not Found!")
  }
});

const main = document.querySelector("main");

// Function to load saved links from Chrome storage
async function loadLinksFromStorage() {
  try {
    const { links } = await chrome.storage.sync.get(["links"]);

    if (links) {
      const savedLinks = JSON.parse(links);

      // Create a fragment to minimize DOM manipulations
      const fragment = document.createDocumentFragment();

      savedLinks.forEach((link) => {
        const urlContainer = createURLContainer(link.faviconUrl); // Pass the favicon URL
        urlContainer.querySelector(".titleInput").value = link.title;
        urlContainer.querySelector(".linkInput").value = link.link;
        fragment.appendChild(urlContainer);
      });

      // Append all URL containers to the main element in one go
      main.appendChild(fragment);
    }
  } catch (error) {
    console.error("Failed to load links from storage:", error);
    notification("Failed to load links. Please try again.");
  }
}


// Function to create URL container

function createURLContainer(favIconUrl) {
  const urlContainer = document.createElement("div");
  urlContainer.classList.add("urlContainer");

  const faviconDiv = document.createElement("div");
  faviconDiv.classList.add("faviconDiv");
  faviconDiv.title = "favicon";

  // Use innerHTML to set the favicon
  faviconDiv.innerHTML = getFavIcon(favIconUrl); // Set favicon HTML directly

  // Store the favicon URL in a data attribute
  urlContainer.setAttribute("data-favicon-url", favIconUrl);

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
  copyBtn.title = "Copy Link";
  copyBtn.addEventListener("click", (e) => {
    copyLink(linkInput);
    notification("Link copied!");
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="ri-delete-bin-6-line"></i>';
  deleteBtn.classList.add("deletebtn");
  deleteBtn.title = "Delete Link";

  const redirectBtn = document.createElement("button");
  redirectBtn.innerHTML = '<i class="ri-arrow-go-forward-line"></i>';
  redirectBtn.classList.add("redirectbtn");
  redirectBtn.title = "Open Link in new tab";

  // Function to open the Link in New Tab
  redirectBtn.addEventListener("click", () => {
    const url = linkInput.value;
    window.open(url, '_blank');
  });

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

  urlContainer.append(faviconDiv, titleInput, linkInput, deleteBtn, copyBtn, redirectBtn);
  return urlContainer;
}


function getFavIcon(favIconUrl) {
  if (favIconUrl.startsWith('http')) {
    // Return an image tag with properly quoted attributes
    return `<img src="${favIconUrl}" alt="favicon" />`;
  } else {
    // Return an icon if URL does not start with http
    return `<i class="ri-arrow-right-fill"></i>`;
  }
}

// Function to save link to Chrome storage
async function saveLinkToStorage(urlContainer) {
  const title = urlContainer.querySelector(".titleInput").value;
  const link = urlContainer.querySelector(".linkInput").value;
  const faviconUrl = urlContainer.getAttribute("data-favicon-url"); // Retrieve favicon URL

  if (title !== "" && link !== "") {
    const data = await chrome.storage.sync.get(["links"]);
    let links = [];

    // If there are existing links, parse them and add them to the array
    if (data.links) {
      links = JSON.parse(data.links);
    }

    // Append the new link along with the favicon URL to the array
    links.unshift({ title, link, faviconUrl });
    notification("URL Saved!");

    // Save the updated array back to storage
    await chrome.storage.sync.set({ "links": JSON.stringify(links) });
  } else {
    alert("Please! Fill All The Required Fields");
  }
}



document.addEventListener("DOMContentLoaded", () => {
  loadLinksFromStorage();

  const addURLBtn = document.querySelector("#addURLBtn");
  const saveBtnURL = document.querySelector("#saveURLBtn");

  addURLBtn.addEventListener("click", async () => {
    const activeTab = await getActiveTabURL();
    const activeTabURL = activeTab.url;
    const favIconUrl = activeTab.favIconUrl
    console.log(favIconUrl,'clicked')
    
    const urlContainer = createURLContainer(favIconUrl);
    urlContainer.querySelector(".linkInput").value = activeTabURL;
    main.appendChild(urlContainer);
  });

  saveBtnURL.addEventListener("click", () => {
    const urlContainer = main.lastElementChild;
    saveLinkToStorage(urlContainer);
  });
});
