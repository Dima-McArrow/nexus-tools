const passGenForm = document.getElementById("pass_gen_form");
const passLengthDisplay = document.querySelector(".selected_pass_length");
const passLengthInput = document.querySelector('input[name="passLength"]'); // Range input element
const passRes = document.getElementById("password_result_text");

const a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const b = "1234567890";
const c = "!@#$%^&*()_-=+";

// Function to validate a password against different criteria
const validatePassword = (password, digits, symbols) => {
  const criteria = {
    length: password.length >= 8, // Minimum length
    letters: /^(?=.*[A-Z])(?=.*[a-z]).+$/.test(password), // At least one uppercase letter and one lowercase letter
    digit: digits === "on" ? /\d/.test(password) : true, // At least one digit if digits are used
    special: symbols === "on" ? /[!@#$%^&*()_+=\-]/.test(password) : true, // At least one special character if symbols are used
  };

  return Object.values(criteria).every(Boolean); // Returns true if all criteria are met
};

// Function to generate a random password of a given length
const pass_gen = (length, digits, symbols) => {
  const options = [a]; // Always include letters
  let passwordChars = [];
  let attempts = 0; // Count attempts to limit maximum retries

  // Build options based on user selections
  if (digits === "on") options.push(b);
  if (symbols === "on") options.push(c);

  while (attempts < 100) {
    // Limit the number of attempts
    passwordChars = []; // Reset password characters

    // Ensure at least one character from each required category
    if (digits === "on") {
      passwordChars.push(b[Math.floor(Math.random() * b.length)]); // Add a random digit
    }

    if (symbols === "on") {
      passwordChars.push(c[Math.floor(Math.random() * c.length)]); // Add a random symbol
    }

    // Add at least two letters (you can adjust this as needed)
    passwordChars.push(a[Math.floor(Math.random() * a.length)]);
    passwordChars.push(a[Math.floor(Math.random() * a.length)]);

    // Fill the rest of the password randomly
    while (passwordChars.length < length) {
      const randomSet = options[Math.floor(Math.random() * options.length)];
      passwordChars.push(
        randomSet[Math.floor(Math.random() * randomSet.length)]
      );
    }

    // Shuffle the password array to ensure randomness in order
    const shuffledPassword = passwordChars
      .sort(() => Math.random() - 0.5)
      .join("");

    // Validate the generated password
    if (validatePassword(shuffledPassword, digits, symbols)) {
      return shuffledPassword; // Return the valid password
    }

    attempts++; // Increment attempts
  }

  // Return a default message or an empty string if it fails after 100 attempts
  return "Failed to generate a valid password after multiple attempts.";
};

// Add event listener to the form
passGenForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let myFormData = new FormData(passGenForm);
  let passLength = parseInt(myFormData.get("passLength")); // Parse to integer
  let useNumbers = myFormData.get("digit_entry");
  let useSymbols = myFormData.get("symbol_entry");

  console.log(passLength, useNumbers, useSymbols);
  const password = pass_gen(passLength, useNumbers, useSymbols);
  console.log("Generated Password: ", password);
  passRes.textContent = password;

  // Displaying whether numbers and symbols are being used
  if (useNumbers === "on" && useSymbols === "on") {
    console.log("Using numbers and symbols");
  } else if (useNumbers === "on") {
    console.log("Using numbers only");
  } else if (useSymbols === "on") {
    console.log("Using symbols only");
  } else {
    console.log("Using letters only");
  }

  // Display the generated password length
  passLengthDisplay.textContent = passLength;
});

// Display the selected password length live
passLengthInput.addEventListener("input", () => {
  passLengthDisplay.textContent = passLengthInput.value;
});
