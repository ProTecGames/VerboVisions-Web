function showApiKeyModal() {
    const modal = document.getElementById('apiKeyModal');
    modal.style.display = 'block';

    const apiKeyForm = document.getElementById('apiKeyForm');
    apiKeyForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const apiKeyInput = document.getElementById('apiKeyInput').value;
        if (apiKeyInput.trim() !== '') {
            localStorage.setItem('apiKey', apiKeyInput);
            modal.style.display = 'none';
            generateImage();
        } else {
            alert('Please enter a valid API key.');
        }
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const storedApiKey = localStorage.getItem('apiKey');
    if (!storedApiKey) {
        showApiKeyModal();
    } else {
        generateImage();
    }
});

document.getElementById('generateButton').addEventListener('click', function () {
    generateImage();
});

function generateImage() {
    const promptText = document.getElementById('promptInput').value;
    const size = document.querySelector('input[name="size"]:checked').value.split('x');
    const width = parseInt(size[0]);
    const height = parseInt(size[1]);
    const scale = parseFloat(document.getElementById('scaleInput').value);

    if (!promptText || !width || !height || !scale) {
        displayError('All fields must be filled.');
        return;
    } else {
        hideError();
    }

    const storedApiKey = localStorage.getItem('apiKey');
    if (!storedApiKey) {
        showApiKeyModal();
        return;
    }

    const apiKey = storedApiKey;

    const negativePrompts = 'ugly, deformed, noisy, blurry, distorted, out of focus, bad anatomy, extra limbs, poorly drawn face, poorly drawn hands, missing fingers';

    const seed = Math.floor(Math.random() * 2147483647);
    const useNegative = true;
    const randomSeed = true;

    const url = `https://visionary1.p.rapidapi.com/generate?prompt=${promptText}&negative=${negativePrompts}&useNegative=${useNegative}&randomSeed=${randomSeed}&seed=${seed}&width=${width}&height=${height}&scale=${scale}`;

    const countdownTimerElement = document.getElementById('countdownTimer');
    countdownTimerElement.textContent = 'Generating image...';

    const startTime = Date.now();
    const intervalId = setInterval(function() {
        const elapsedTime = Date.now() - startTime;
        countdownTimerElement.textContent = `Generating image... ${elapsedTime} ms`;
    }, 1);

    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'visionary1.p.rapidapi.com'
        }
    })
    .then(response => {
        clearInterval(intervalId);
        countdownTimerElement.textContent = '';

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const imageUrl = data.imgURL;
        displayImage(imageUrl);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
}

function displayImage(imageUrl) {
    const modal = document.getElementById('myModal');
    const modalContent = document.querySelector('.modal-content');
    const modalImage = document.getElementById('modalImage');

    modal.style.display = 'block';
    modalImage.src = imageUrl;

    const span = document.getElementsByClassName('close')[0];
    span.onclick = function() {
        modal.style.display = 'none';
    }

    const modalWidth = modalContent.offsetWidth;
    const modalHeight = modalContent.offsetHeight;
    const maxWidth = modalWidth * 0.8;
    const maxHeight = modalHeight * 0.8;

    const aspectRatio = modalImage.naturalWidth / modalImage.naturalHeight;

    if (modalImage.naturalWidth > maxWidth || modalImage.naturalHeight > maxHeight) {
        if (modalImage.naturalWidth / maxWidth > modalImage.naturalHeight / maxHeight) {
            modalImage.width = maxWidth;
            modalImage.height = maxWidth / aspectRatio;
        } else {
            modalImage.height = maxHeight;
            modalImage.width = maxHeight * aspectRatio;
        }
    }
}

function displayError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError() {
    const errorElement = document.getElementById('error');
    errorElement.style.display = 'none';
}
