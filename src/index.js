import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY =
  'live_2RIcwtVYZb8CEj63AeIaMf1JSp0PXBNIdBuPqECM9ygUtkT4ANoIBNZx55QNUY48';
const selectElement = document.querySelector('.breed-select');
const loaderElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfoElement = document.querySelector('.cat-info');

// Funkcja do pobierania listy ras kotów
async function fetchBreeds() {
  try {
    // Wyświetlenie animacji ładowania
    loaderElement.style.display = 'block';
    errorElement.style.display = 'none';
    catInfoElement.style.display = 'none';

    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breeds = response.data;

    // Wypełnienie rozwijanej listy ras
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      selectElement.appendChild(option);
    });

    // Ukrycie animacji ładowania po pomyślnym pobraniu listy ras
    loaderElement.style.display = 'none';
    selectElement.style.display = 'block';
  } catch (error) {
    // Wyświetlenie komunikatu błędu
    errorElement.style.display = 'block';
    console.error('Error fetching breeds:', error);
  }
}

// Inicjalizacja pobierania listy ras przy załadowaniu strony
fetchBreeds();

// Funkcja do pobierania informacji o kocie na podstawie wybranej rasy
async function fetchCatByBreed(breedId) {
  try {
    // Wyświetlenie animacji ładowania
    loaderElement.style.display = 'block';
    errorElement.style.display = 'none';
    catInfoElement.style.display = 'none';

    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    const catData = response.data[0];

    // Wyświetlenie informacji o kocie
    catInfoElement.innerHTML = `
      <img src="${catData.url}" alt="Cat Image">
      <p><strong>Breed:</strong> ${catData.breeds[0].name}</p>
      <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
    `;

    // Ukrycie animacji ładowania po pomyślnym pobraniu informacji o kocie
    loaderElement.style.display = 'none';
    catInfoElement.style.display = 'block';
  } catch (error) {
    // Wyświetlenie komunikatu błędu
    errorElement.style.display = 'block';
    console.error('Error fetching cat info:', error);
  }
}
