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
      const textToCopy = linkInput.value;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          console.log('Text copied successfully!');
        })
        .catch(err => {
          console.error('Unable to copy text: ', err);
        });
    }
export const deleteChild = (urlContainer,main) => {
       main.removeChild(urlContainer);
    }
