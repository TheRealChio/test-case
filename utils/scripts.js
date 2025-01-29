document.addEventListener("DOMContentLoaded", () => {
  // Load saved string on page load
  const savedString = localStorage.getItem("lastRandomString");
  const savedStringElement = document.getElementById("saved-string");
  if (savedString && savedStringElement) {
    savedStringElement.textContent = savedString;
  }

  // Listen for HTMX updates
  document.body.addEventListener("htmx:afterSwap", () => {
    const randomStringElement = document.getElementById("random-string");
    if (randomStringElement) {
      localStorage.setItem("lastRandomString", randomStringElement.textContent);
      // Update saved display immediately
      if (savedStringElement) {
        savedStringElement.textContent = randomStringElement.textContent;
      }
    }
  });
});
