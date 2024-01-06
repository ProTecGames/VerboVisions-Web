<?php

require_once 'config.php'; // Include configuration for API key and base URL

// Function to generate an image using the Gemini API
function generateImage($prompt) {
  try {
    $response = makeApiCall('/generate', [
      "prompt" => $prompt // Adjust API endpoint and prompt parameter as needed
    ]);

    // Extract image URL from API response (adjust as needed)
    $imageUrl = $response["data"]["url"];

    return ["success" => true, "imageUrl" => $imageUrl];
  } catch (Exception $e) {
    return ["success" => false, "error" => $e->getMessage()];
  }
}

?>
