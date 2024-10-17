function romanToArabic(roman) {
  let possibleRoman =
    /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/g;

  if ([...roman.matchAll(possibleRoman)].length >= 1) {
    const romanNumbers = new Map();

    romanNumbers.set("I", 1);
    romanNumbers.set("V", 5);
    romanNumbers.set("X", 10);
    romanNumbers.set("L", 50);
    romanNumbers.set("C", 100);
    romanNumbers.set("D", 500);
    romanNumbers.set("M", 1000);

    let result = 0;

    for (let i = 0; i < roman.length; i++) {
      const current = romanNumbers.get(roman[i]);
      const next = romanNumbers.get(roman[i + 1]);
      if (current < next) {
        result -= current;
      } else {
        result += current;
      }
    }

    return result;
  } else {
    return "Not a valid Roman number";
  }
}

function convertToRoman(num) {
  const romanMap = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let result = "";
  for (const { value, symbol } of romanMap) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}

const arabicToRomanForm = document.getElementById("form_arabic_to_roman");
const romanToArabicForm = document.getElementById("form_roman_to_arabic");

romanToArabicForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted: ", romanToArabicForm);
  let romanNumber = romanToArabicForm.roman_number.value.toUpperCase();
  console.log(romanNumber);
  let result = romanToArabic(romanNumber);
  document.getElementById("arabic_result").textContent = result;
});

arabicToRomanForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted: ", arabicToRomanForm);
  let arabicNumber = arabicToRomanForm.arabic_number.value;
  console.log(arabicNumber);
  let result = convertToRoman(arabicNumber);
  document.getElementById("roman_result").textContent = result;
});
