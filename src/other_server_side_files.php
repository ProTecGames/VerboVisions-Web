<?php

require_once 'api_calls.php';

// Retrieve prompt from POST request
$prompt = $_POST['prompt'];

// Generate image using API
$response = generateImage($prompt);

// Send JSON response
header('Content-Type: application/json');
echo json_encode($response);

?>
