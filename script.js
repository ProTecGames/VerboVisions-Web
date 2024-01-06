// Select necessary HTML elements (adjust selectors as needed)
const promptInput = document.querySelector(".prompt-section input");
const generateButton = document.querySelector(".prompt-section button");
const generatedImage = document.querySelector(".generated-image img");
const progressBar = document.querySelector(".progress-bar"); // If applicable

// Function to handle image generation and display
function generateImage() {
  // Get the user's prompt
  const prompt = promptInput.value;

  // Send prompt to server-side script for secure API interaction
  fetch("/generate-image", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle API response and display generated image
      if (data.success) {
        generatedImage.src = data.imageUrl; // Update image source

        // If applicable, display a success message or animation

        // Reset wait timer
        resetTimer();
      } else {
        // Handle errors gracefully (e.g., display error message)
        console.error("API error:", data.error);
        // Display an error message to the user
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      alert(error);
      console.error("Network error:", error);
      // Display a network error message to the user
    });
}

// Function to enforce 60-second wait time
function enforceWait() {
  // Disable button and show progress bar
  generateButton.disabled = true;
  progressBar.classList.add("active"); // If applicable

  // Start timer for 60 seconds
  const timer = setTimeout(() => {
    resetTimer();
  }, 60000);
}

// Function to reset timer and enable button
function resetTimer() {
  // Clear timeout, enable button, hide progress bar
  clearTimeout(timer);
  generateButton.disabled = false;
  progressBar.classList.remove("active"); // If applicable
}

// Event listeners
generateButton.addEventListener("click", () => {
  generateImage();
  enforceWait(); // Enforce wait time after each generation
});
