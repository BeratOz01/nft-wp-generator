// Constant for phone to size
export const phoneToSize = {
  "iPhone 13": 757,
  "iPhone X": 757,
  "iPhone XR": 757,
  "iPhone 8": 757,
  "Samsung Galaxy S22": 757,
};

// Helper function to get phone name from size
export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

// Helper function for capitalize first letter of string
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
