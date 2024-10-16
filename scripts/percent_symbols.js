const symbolContainer = document.getElementById("symbol-container");
const colors = ["#f2545b", "#3a4e6e", "#89909f"]; // Colors for symbols

function generateRandomSymbols(count) {
  for (let i = 0; i < count; i++) {
    const symbol = document.createElement("div");
    symbol.classList.add("symbol");
    symbol.textContent = "%";

    // Random position, rotation, and scale
    const x = Math.random() * 100; // X-position in percentage
    const y = Math.random() * 100; // Y-position in percentage
    const rotation = Math.random() * 360; // Rotation in degrees
    const scale = Math.random() * 2 + 0.5; // Scale between 0.5 and 2.5

    // Store the scale value in the symbol's dataset
    symbol.dataset.scale = scale;

    // Apply initial styles
    symbol.style.left = `${x}%`;
    symbol.style.top = `${y}%`;
    symbol.style.color = colors[Math.floor(Math.random() * colors.length)];
    symbol.style.transform = `rotate(${rotation}deg) scale(${scale})`;

    // Add symbol to container
    symbolContainer.appendChild(symbol);
  }
}

// Call the function to generate 40 symbols
generateRandomSymbols(40);

// Add slight movement and rotation on scroll
window.addEventListener("scroll", () => {
  const scrollAmount = window.scrollY;

  document.querySelectorAll(".symbol").forEach((symbol, index) => {
    // Get the initial scale value from dataset
    const initialScale = symbol.dataset.scale;

    // Slight position shift based on scroll amount and index
    const offsetX = Math.sin(scrollAmount / 100 + index) * 5; // Sinusoidal shift
    const offsetY = Math.cos(scrollAmount / 100 + index) * 5;

    // Slight rotation change
    const rotate = (scrollAmount / 10 + index * 5) % 360; // Vary rotation with scroll

    // Apply new transform with rotation, movement, and original scale
    symbol.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg) scale(${initialScale})`;
  });
});
