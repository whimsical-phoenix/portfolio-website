// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  const dayIcon = document.querySelector(".day-icon");
  const nightIcon = document.querySelector(".night-icon");

  body.classList.toggle("dark-mode");
  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem("dark-mode", isDarkMode);

  // Toggle icons
  if (isDarkMode) {
    dayIcon.style.display = "none";
    nightIcon.style.display = "inline-block";
  } else {
    dayIcon.style.display = "inline-block";
    nightIcon.style.display = "none";
  }
}

// Check if dark mode is enabled in localStorage
const isDarkMode = JSON.parse(localStorage.getItem("dark-mode")) || false;

// Set dark mode initially
if (isDarkMode) {
  document.body.classList.add("dark-mode");
  document.querySelector(".day-icon").style.display = "none";
  document.querySelector(".night-icon").style.display = "inline-block";
} else {
  document.querySelector(".day-icon").style.display = "inline-block";
  document.querySelector(".night-icon").style.display = "none";
}

// Dark mode toggle button click event
const darkModeToggle = document.querySelector(".dark-mode-toggle");
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", toggleDarkMode);
}
