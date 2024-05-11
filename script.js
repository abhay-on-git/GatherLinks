
export function themeToggle() {
  let navIcons = document.querySelector(".n2 .icons");
  let lightIcon = document.getElementById("light");
  let darkIcon = document.getElementById("dark");
  let isDarkMode = true;
  navIcons.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if (isDarkMode) {
      lightIcon.style.opacity = 1;
      darkIcon.style.opacity = 0;
      isDarkMode = false;
    } else {
      dark.style.opacity = 1;
      lightIcon.style.opacity = 0;
      isDarkMode = true;
    }
  });
}

export const copyLink = (linkInput) => {
  const link = linkInput.value;
  navigator.clipboard.writeText(link)
    .then(() => {
      console.log("Link copied");
    })
    .catch((error) => {
      console.error("Failed to copy:", error);
    });
  }

export async function getActiveTabURL(){
      let queryOptions = {active : true,currentWindow :true};
      let [tab] = await chrome.tabs.query(queryOptions);
      return tab;
  }

export function notification(message){
  // Show notification
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.textContent = message;
  document.body.appendChild(notification);

  // Remove notification after 2 seconds
  setTimeout(() => {
    notification.remove();
  }, 2000);
}