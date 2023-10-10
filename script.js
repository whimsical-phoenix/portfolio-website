function startTypewriter() {
  const text =
    "Welcome to My Portfolio. I'm a Web Designer passionate about creating stunning web experiences.";
  let index = 0;
  const speed = 50; // Adjust typing speed (milliseconds per character)

  function typeWriter() {
    if (index < text.length) {
      document.getElementById("typewriter-text").textContent +=
        text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
}

// Start the typewriter effect when the page loads
window.addEventListener("load", startTypewriter);
