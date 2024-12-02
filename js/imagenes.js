const searchButton = document.getElementById("search-button");
const searchBox = document.getElementById("search-box");
const imageGallery = document.getElementById("image-gallery");

// API de Unsplash
const unsplashAPI = 'https://api.unsplash.com/search/photos?query=';
const unsplashAccessKey = '_1nn6bY82dM17fdE-PKvK5PNPYKOIku5GVPHv83S8F0';

// Función para buscar imágenes en Unsplash
async function searchImages(query) {
  const response = await fetch(`${unsplashAPI}${query}&client_id=${unsplashAccessKey}`);
  const data = await response.json();

  imageGallery.innerHTML = ''; // Limpiar la galería antes de mostrar nuevas imágenes

  if (data.results.length > 0) {
    data.results.forEach((image) => {
      const imageElement = document.createElement('div');
      imageElement.classList.add('image-item');
      imageElement.style.backgroundImage = `url(${image.urls.small})`;
      imageGallery.appendChild(imageElement);
    });
  } else {
    imageGallery.innerHTML = `<p>No se encontraron imágenes.</p>`;
  }
}

// Evento al hacer clic en el botón de búsqueda
searchButton.addEventListener('click', () => {
  const query = searchBox.value.trim();
  if (query) {
    searchImages(query);
  } else {
    alert('Por favor, ingresa un término de búsqueda.');
  }
});
