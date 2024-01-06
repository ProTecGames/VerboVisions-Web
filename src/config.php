<?php

// Define sensitive constants outside of web root
define("API_KEY", "API KEY HERE"); // Replace with your actual API key
define("BASE_URL", "https://api.gemini.com"); // Base URL for API calls

// Error reporting (adjust as needed)
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Function to make API calls with error handling
function makeApiCall($endpoint, $data = []) {
  $curl = curl_init();
  curl_setopt_array($curl, [
    CURLOPT_URL => BASE_URL . $endpoint,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_HTTPHEADER => [
      "Authorization: Bearer " . API_KEY,
      "Content-Type: application/json"
    ],
  ]);

  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);

  if ($err) {
    throw new Exception("API request failed: $err");
  }

  return json_decode($response, true);
}

?>
