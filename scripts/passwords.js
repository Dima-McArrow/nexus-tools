const passwordsContainer = document.getElementById("passwords-container");
const colors_pass = ["#f2545b", "#3a4e6e", "#89909f"]; // Colors for passwords

const fakePasswords = [
  "password",
  "123456",
  "123456789",
  "qwerty",
  "12345678",
  "111111",
  "1234567890",
  "1234567",
  "password1",
  "p4$$w0rd",
];

const PASSWORD_COUNT = 20; // Number of passwords to generate
const MARGIN = 10; // Minimum distance between passwords

function generateRandomPasswords(count) {
  const passwords = []; // Store created password elements

  for (let i = 0; i < count; i++) {
    const password = document.createElement("div");
    password.classList.add("passwords"); // Ensure class name matches what is queried

    // Select a random password
    password.textContent =
      fakePasswords[Math.floor(Math.random() * fakePasswords.length)];

    // Random position and rotation logic
    let x, y;
    let overlaps;

    // Ensure no overlap with existing passwords
    do {
      overlaps = false;
      x = Math.random() * 80; // Limit to avoid overflow
      y = Math.random() * 80;

      for (const existingPassword of passwords) {
        const existingX = parseFloat(existingPassword.style.left);
        const existingY = parseFloat(existingPassword.style.top);

        // Calculate distance
        const distance = Math.sqrt(
          Math.pow(existingX - x, 2) + Math.pow(existingY - y, 2)
        );

        if (distance < MARGIN) {
          overlaps = true;
          break; // Exit loop if overlap is found
        }
      }
    } while (overlaps);

    const rotation = Math.random() * 90; // Rotation in degrees
    const scale = Math.random() * 1.5 + 0.5; // Scale between 0.5 and 2

    // Store rotation and scale in dataset
    password.dataset.scale = scale;
    password.dataset.rotation = rotation;

    // Apply styles
    password.style.left = `${x}%`;
    password.style.top = `${y}%`;
    password.style.color =
      colors_pass[Math.floor(Math.random() * colors_pass.length)];
    password.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    password.style.position = "absolute";

    // Add to container and tracking array
    passwordsContainer.appendChild(password);
    passwords.push(password);
  }
}

// Generate passwords on page load
generateRandomPasswords(PASSWORD_COUNT);

// Add scroll event for animations
window.addEventListener("scroll", () => {
  const scrollAmount = window.scrollY;

  document.querySelectorAll(".passwords").forEach((password, index) => {
    // Retrieve original values from dataset
    const initialScale = parseFloat(password.dataset.scale);
    const rotation = parseFloat(password.dataset.rotation);

    // Calculate opacity with a sinusoidal effect, capped between 0.35 and 1
    const opacity = Math.max(
      0.35,
      0.35 + 0.15 * Math.sin(scrollAmount / 100 + index)
    );
    password.style.opacity = opacity;

    // Slight position shift with scroll amount
    const offsetX = Math.sin(scrollAmount / 100 + index) * 5;
    const offsetY = Math.cos(scrollAmount / 100 + index) * 5;

    // Apply transform with movement, rotation, and scale
    password.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg) scale(${initialScale})`;
  });
});
