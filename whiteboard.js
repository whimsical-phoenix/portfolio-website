document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const colors = document.querySelectorAll(".color");
  const colorPicker = document.getElementById("colorPicker");
  const eraserButton = document.getElementById("eraser");
  const clearButton = document.getElementById("clear");
  const downloadButton = document.getElementById("download");
  const popup = document.getElementById("popup");

  canvas.addEventListener("touchmove", function (event) {
    event.preventDefault();
  });

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let currentColor = "black";
  let eraserMode = false;

  colorPicker.addEventListener("input", function () {
    setCurrentColor(colorPicker.value); // Set current color to the color picked from the color picker
    eraserMode = false; // Disable eraser mode when using color picker
  });

  // Set canvas size
  canvas.width = 700;
  canvas.height = 500;

  // Set initial color
  setCurrentColor("black");

  // Event listeners for color selection
  colors.forEach((color) => {
    color.addEventListener("click", () => {
      setCurrentColor(color.style.backgroundColor);
      eraserMode = false;
    });
  });

  // Event listener for eraser button
  eraserButton.addEventListener("click", () => {
    eraserMode = true;
    setCurrentColor("white");
  });

  // Event listener for clear button
  clearButton.addEventListener("click", clearCanvas);

  // Event listener for download button
  downloadButton.addEventListener("click", downloadCanvas);

  // Mouse event listeners
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", () => (isDrawing = false));
  canvas.addEventListener("mouseout", () => (isDrawing = false));

  // Touch event listeners
  canvas.addEventListener("touchstart", startDrawing);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", () => (isDrawing = false));

  function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = getMousePosition(e);
  }

  function draw(e) {
    if (!isDrawing) return;
    const [x, y] = getMousePosition(e);
    context.strokeStyle = currentColor;
    context.lineWidth = 5;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.stroke();
    [lastX, lastY] = [x, y];
  }

  function setCurrentColor(color) {
    currentColor = color;
    // Remove 'selected' class from all colors
    colors.forEach((color) => color.classList.remove("selected"));
    // Add 'selected' class to the current color
    const selectedColor = Array.from(colors).find(
      (c) => c.style.backgroundColor === color
    );
    if (selectedColor) selectedColor.classList.add("selected");
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function downloadCanvas() {
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = "whimsicalArt.png";
    a.click();
    document.body.removeChild(a);

    // Show popup
    popup.style.display = "block";
    // Hide popup after 3 seconds
    setTimeout(() => {
      popup.style.display = "none";
    }, 3000);
  }

  function getMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.type.includes("touch")) {
      return [
        e.touches[0].clientX - rect.left,
        e.touches[0].clientY - rect.top,
      ];
    } else {
      return [e.clientX - rect.left, e.clientY - rect.top];
    }
  }
});

// JavaScript code for audio control and CD animation
const audio = new Audio(
  "clair-de-lune-suite-bergamasque-l-75-3rd-movement-claude-debussy-448s-11942.mp3"
);

function toggleAudio() {
  if (audio.paused) {
    audio.play();
    document.querySelector(".cd").style.animationPlayState = "running"; // Start CD rotation animation
  } else {
    audio.pause();
    document.querySelector(".cd").style.animationPlayState = "paused"; // Pause CD rotation animation
  }
}

document.querySelector(".cd").addEventListener("click", toggleAudio);

// Play audio when the page loads
audio.play();
document.querySelector(".cd").style.animationPlayState = "running"; // Start CD rotation animation
