document.addEventListener('DOMContentLoaded', function () {
    const imageContainer = document.getElementById('imageContainer');
    const loader = document.getElementById('loader');

    async function generateImage() {
        showLoader();
        const textInput = document.getElementById('textInput').value;
        const apiKey = 'Py-figlet';
        const apiUrl = `https://sketchuppro.ir/api/api/generate.php?text=${encodeURIComponent(textInput)}&key=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const jsonResult = await response.json();

            if (jsonResult.length > 0) {
                const images = jsonResult.map(item => item.result);

                // Display images in the gallery
                displayGallery(images);
            } else {
                console.error('No image URLs found in the API response.');
            }
        } catch (error) {
            console.error('Error generating images:', error);
        } finally {
            hideLoader();
        }
    }

    function displayGallery(images) {
        imageContainer.innerHTML = '';

        images.forEach((imageUrl, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = `Generated Image ${index + 1}`;
            imgElement.addEventListener('load', () => imageLoaded(imgElement));

            imageContainer.appendChild(imgElement);
        });
    }

    function showLoader() {
        loader.style.display = 'block';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    function imageLoaded(imgElement) {
        imgElement.style.animation = 'fade-in 0.5s ease-out';
    }

    lightGallery(document.getElementById('imageContainer'), {
        dynamic: true,
        download: false,
        toggleThumb: true,
        mode: 'lg-fade',
        backdropDuration: 500,
    });
});

// Added functions for the Credits modal
function showCreditsModal() {
    const modal = document.getElementById('creditsModal');
    modal.style.display = 'flex';
    modal.style.animation = 'modalFadeIn 0.5s ease-out';
}

function closeCreditsModal() {
    const modal = document.getElementById('creditsModal');
    modal.style.animation = 'modalFadeIn 0.5s ease-out reverse';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
}
