import axios from 'axios';

const API_KEY =
  'live_2RIcwtVYZb8CEj63AeIaMf1JSp0PXBNIdBuPqECM9ygUtkT4ANoIBNZx55QNUY48';
const selectElement = document.querySelector('.breed-select');
const loaderElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfoElement = document.querySelector('.cat-info');

async function fetchBreeds() {
  try {
    loaderElement.style.display = 'block';
    errorElement.style.display = 'none';
    catInfoElement.style.display = 'none';

    axios.defaults.headers.common['X-api-key'] = API_KEY;

    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breeds = response.data;

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      selectElement.appendChild(option);
    });

    loaderElement.style.display = 'none';
    selectElement.style.display = 'block';
  } catch (error) {
    errorElement.style.display = 'block';
    console.error('Error fetching breeds:', error);
  }
}
fetchBreeds();

async function fetchCatByBreed(breedId) {
  try {
    loaderElement.style.display = 'block';
    errorElement.style.display = 'none';
    catInfoElement.style.display = 'none';

    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    const catData = response.data[0];

    catInfoElement.innerHTML = `
      <img src="${catData.url}" alt="Cat Image">
      <div class="cat-info-elements">
      <h3>Breed:</h3><p>${catData.breeds[0].name}</p>
      <h3>Description:</h3><p>${catData.breeds[0].description}</p>
      <h3>Temperament:</h3><p>${catData.breeds[0].temperament}</p>
      </div>
    `;

    loaderElement.style.display = 'none';
    catInfoElement.style.display = 'flex';
  } catch (error) {
    errorElement.style.display = 'block';
    console.error('Error fetching cat info:', error);
  }
}

selectElement.addEventListener('change', function () {
  const breedId = this.value;
  fetchCatByBreed(breedId);
});
