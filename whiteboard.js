// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// const colors = document.querySelectorAll(".color");
// const eraserBtn = document.getElementById("eraser");
// const clearBtn = document.getElementById("clear");
// const downloadBtn = document.getElementById("download");

// let isDrawing = false;
// let lastX = 0;
// let lastY = 0;
// let color = "black";

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// function startDrawing(e) {
//   isDrawing = true;
//   [lastX, lastY] = [e.clientX, e.clientY];
// }

// function draw(e) {
//   if (!isDrawing) return;
//   ctx.strokeStyle = color;
//   ctx.lineJoin = "round";
//   ctx.lineCap = "round";
//   ctx.lineWidth = 5;
//   ctx.beginPath();
//   ctx.moveTo(lastX, lastY);
//   ctx.lineTo(e.clientX, e.clientY);
//   ctx.stroke();
//   [lastX, lastY] = [e.clientX, e.clientY];
// }

// function endDrawing() {
//   isDrawing = false;
// }

// function changeColor() {
//   color = this.style.backgroundColor;
// }

// function erase(e) {
//   if (e.target.id === "eraser") {
//     canvas.addEventListener("mousemove", eraseDrawing);
//   } else {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   }
// }

// function eraseDrawing(e) {
//   ctx.clearRect(e.clientX - 5, e.clientY - 5, 10, 10);
// }

// function download() {
//   const dataURL = canvas.toDataURL("image/png");
//   const a = document.createElement("a");
//   a.href = dataURL;
//   a.download = "whiteboard.png";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
// }

// canvas.addEventListener("mousedown", startDrawing);
// canvas.addEventListener("mousemove", draw);
// canvas.addEventListener("mouseup", endDrawing);
// canvas.addEventListener("mouseout", endDrawing);

// colors.forEach((color) => color.addEventListener("click", changeColor));
// eraserBtn.addEventListener("click", erase);
// clearBtn.addEventListener("click", erase);
// downloadBtn.addEventListener("click", download);

// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// const colors = document.querySelectorAll(".color");
// const eraserBtn = document.getElementById("eraser");
// const clearBtn = document.getElementById("clear");
// const downloadBtn = document.getElementById("download");

// let isDrawing = false;
// let lastX = 0;
// let lastY = 0;
// let color = "black";

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// function startDrawing(e) {
//   isDrawing = true;
//   [lastX, lastY] = [
//     e.clientX || e.touches[0].clientX,
//     e.clientY || e.touches[0].clientY,
//   ];
// }

// function draw(e) {
//   if (!isDrawing) return;
//   ctx.strokeStyle = color;
//   ctx.lineJoin = "round";
//   ctx.lineCap = "round";
//   ctx.lineWidth = 5;
//   ctx.beginPath();
//   ctx.moveTo(lastX, lastY);
//   ctx.lineTo(
//     e.clientX || e.touches[0].clientX,
//     e.clientY || e.touches[0].clientY
//   );
//   ctx.stroke();
//   [lastX, lastY] = [
//     e.clientX || e.touches[0].clientX,
//     e.clientY || e.touches[0].clientY,
//   ];
// }

// function endDrawing() {
//   isDrawing = false;
// }

// function changeColor() {
//   color = this.style.backgroundColor;
//   removeColorHighlight();
//   this.classList.add("selected");
// }

// function erase(e) {
//   if (e.target.id === "eraser") {
//     canvas.addEventListener("mousemove", eraseDrawing);
//     canvas.addEventListener("touchmove", eraseDrawing);
//   } else {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   }
// }

// function eraseDrawing(e) {
//   e.preventDefault();
//   ctx.clearRect(
//     (e.clientX || e.touches[0].clientX) - 5,
//     (e.clientY || e.touches[0].clientY) - 5,
//     10,
//     10
//   );
// }

// function download() {
//   const dataURL = canvas.toDataURL("image/png");
//   const a = document.createElement("a");
//   a.href = dataURL;
//   a.download = "whiteboard.png";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
// }

// function removeColorHighlight() {
//   colors.forEach((color) => color.classList.remove("selected"));
// }

// canvas.addEventListener("mousedown", startDrawing);
// canvas.addEventListener("mousemove", draw);
// canvas.addEventListener("mouseup", endDrawing);
// canvas.addEventListener("mouseout", endDrawing);

// canvas.addEventListener("touchstart", startDrawing);
// canvas.addEventListener("touchmove", draw);
// canvas.addEventListener("touchend", endDrawing);

// colors.forEach((color) => color.addEventListener("click", changeColor));
// eraserBtn.addEventListener("click", erase);
// clearBtn.addEventListener("click", erase);
// downloadBtn.addEventListener("click", download);

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const colors = document.querySelectorAll(".color");
  const eraserButton = document.getElementById("eraser");
  const clearButton = document.getElementById("clear");
  const downloadButton = document.getElementById("download");
  const popup = document.getElementById("popup");

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let currentColor = "black";
  let eraserMode = false;

  // Set canvas size
  canvas.width = 800;
  canvas.height = 600;

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
