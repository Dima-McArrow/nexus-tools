const numeralContainer = document.getElementById("numeral-container");
const colors_num = ["#a67b5b", "#e3c565", "#F1E4D3"]; // Colors for numerals
const romanNumerals = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "L",
  "C",
  "D",
  "M",
  "XL",
  "XC",
  "DCCC",
  "MCD",
  "MCDXLV",
  "MMXXIV",
  "MMXXV",
  "CCXXI",
  "DCCXVIII",
]; // Roman numerals

const NUMERAL_COUNT = 40; // Number of numerals to generate
const MARGIN = 10; // Minimum distance between numerals

function generateRandomNumerals(count) {
  const numerals = [];

  for (let i = 0; i < count; i++) {
    const numeral = document.createElement("div");
    numeral.classList.add("numeral");

    // Select a random Roman numeral
    numeral.textContent =
      romanNumerals[Math.floor(Math.random() * romanNumerals.length)];

    // Random position, rotation, and scale
    let x, y;
    let overlaps;

    // Check for overlaps with previously placed numerals
    do {
      overlaps = false;
      x = Math.random() * 100; // X-position in percentage
      y = Math.random() * 100; // Y-position in percentage

      // Check for overlap with existing numerals
      for (const existingNumeral of numerals) {
        const existingX = parseFloat(existingNumeral.style.left);
        const existingY = parseFloat(existingNumeral.style.top);

        // Calculate distance between current and existing numerals
        const distance = Math.sqrt(
          Math.pow(existingX - x, 2) + Math.pow(existingY - y, 2)
        );

        // If the distance is less than the defined margin, set overlaps to true
        if (distance < MARGIN) {
          overlaps = true;
          break; // Exit the loop if overlap is found
        }
      }
    } while (overlaps); // Repeat until a non-overlapping position is found

    const rotation = Math.random() * 90; // Rotation in degrees
    const scale = Math.random() * 2 + 0.002; // Scale between 0.5 and 2.5

    numeral.dataset.scale = scale; // Store the scale value in the numeral's dataset
    numeral.dataset.rotation = rotation; // Store the rotation value in the numeral's dataset

    // Apply styles
    numeral.style.left = `${x}%`;
    numeral.style.top = `${y}%`;
    numeral.style.color =
      colors_num[Math.floor(Math.random() * colors_num.length)];
    numeral.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    numeral.style.position = "absolute"; // Ensure numerals are absolutely positioned

    // Add numeral to container and array of numerals
    numeralContainer.appendChild(numeral);
    numerals.push(numeral); // Keep track of the numerals for overlap checking
  }
}

// Generate random numerals
generateRandomNumerals(NUMERAL_COUNT);

// Add fade-in/out effect based on scroll
window.addEventListener("scroll", () => {
  const scrollAmount = window.scrollY;

  document.querySelectorAll(".numeral").forEach((numeral, index) => {
    // Get the initial scale value from dataset
    const initialScale = numeral.dataset.scale;

    // Get the initial rotation value from dataset
    const rotation = numeral.dataset.rotation;

    // Calculate opacity
    const opacity = 0.35 + 0.35 * Math.sin(scrollAmount / 100 + index);
    numeral.style.opacity = opacity;

    // Slight position shift based on scroll amount and index
    const offsetX = Math.sin(scrollAmount / 100 + index) * 5; // Sinusoidal shift
    const offsetY = Math.cos(scrollAmount / 100 + index) * 5;

    // Apply new transform with movement and original scale
    numeral.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg) scale(${initialScale})`;
  });
});
