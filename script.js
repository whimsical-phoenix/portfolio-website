// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  localStorage.setItem("dark-mode", body.classList.contains("dark-mode"));
}

// Check if dark mode is enabled in localStorage
const isDarkMode = JSON.parse(localStorage.getItem("dark-mode")) || false;

// Set dark mode initially
if (isDarkMode) {
  document.body.classList.add("dark-mode");
}

// Dark mode toggle button click event
const darkModeToggle = document.querySelector(".dark-mode-toggle");
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", toggleDarkMode);
}
