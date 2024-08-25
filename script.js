export function themeToggle() {
  let navIcons = document.querySelector(".n2 .icons");
  let lightIcon = document.getElementById("light");
  let darkIcon = document.getElementById("dark");
  let isDarkMode = true;

  // Check storage for the saved theme
  chrome.storage.sync.get("theme", ({ theme }) => {
    if (theme === "dark-theme") {
      document.body.classList.add("dark-theme");
      lightIcon.style.opacity = 1;
      darkIcon.style.opacity = 0;
      isDarkMode = true;
    } else {
      document.body.classList.remove("dark-theme");
      darkIcon.style.opacity = 1;
      lightIcon.style.opacity = 0;
      isDarkMode = false;
    }
  });

  // Toggle the theme when the user clicks the nav icon
  navIcons.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
      lightIcon.style.opacity = 1;
      darkIcon.style.opacity = 0;
      chrome.storage.sync.set({ theme: "dark-theme" }); // Save dark theme preference
    } else {
      darkIcon.style.opacity = 1;
      lightIcon.style.opacity = 0;
      chrome.storage.sync.set({ theme: "light-theme" }); // Save light theme preference
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

export function feedBackNotification(message,feedbackLink){
  console.log(feedbackLink)
  // Show notification
  const notification = document.createElement("div");
  const notificationMessage = document.createElement("h3");
  const feedbacklink = document.createElement("a");
  notification.classList.add("feedBacknotification");
  notificationMessage.textContent = message;
  feedbacklink.href = feedbackLink;
  feedbacklink.textContent = 'click me';
  console.log(feedbacklink)
  notification.append(notificationMessage,feedbacklink);
  console.log(notification)
  document.body.appendChild(notification);
  feedbacklink.addEventListener('click',()=>{
    window.open(feedbackLink, "_blank")
  })

  // Remove notification after 2 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
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