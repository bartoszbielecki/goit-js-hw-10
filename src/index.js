import axios from 'axios';
import SlimSelect from 'slim-select';

// Dodanie nagłówka X-api-key do każdego żądania
axios.defaults.headers.common['X-api-key'] =
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

    // Sprawdzenie, czy otrzymano dane
    console.log(breeds);

    // Wypełnienie rozwijanej listy ras
    const options = breeds.map(breed => ({
      value: breed.id,
      text: breed.name,
    }));

    // Sprawdzenie danych opcji
    console.log(options);

    // Utwórz nową instancję SlimSelect i przekaż dane
    const slim = new SlimSelect('.breed-select', {
      select: '.breed-select', // Wskaż, gdzie ma być wyświetlona rozwijana lista
      placeholder: 'Choose a breed', // Opcjonalny tekst zastępczy
      data: options,
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

// // Funkcja do pobierania listy ras kotów
// async function fetchBreeds() {
//   try {
//     // Wyświetlenie animacji ładowania
//     loaderElement.style.display = 'block';
//     errorElement.style.display = 'none';
//     catInfoElement.style.display = 'none';

//     const response = await axios.get('https://api.thecatapi.com/v1/breeds');
//     const breeds = response.data;

//     // Wypełnienie rozwijanej listy ras
//     const options = breeds.map(breed => ({
//       value: breed.id,
//       text: breed.name,
//     }));

//     // Utwórz nową instancję SlimSelect i przekaż dane
//     const slim = new SlimSelect('.breed-select', {
//       data: options,
//     });

//     // Ukrycie animacji ładowania po pomyślnym pobraniu listy ras
//     loaderElement.style.display = 'none';
//     selectElement.style.display = 'block';
//   } catch (error) {
//     // Wyświetlenie komunikatu błędu
//     errorElement.style.display = 'block';
//     console.error('Error fetching breeds:', error);
//   }
// }

// // Funkcja do pobierania informacji o kocie na podstawie rasy
// async function fetchCatByBreed(breedId) {
//   try {
//     // Wyświetlenie animacji ładowania
//     loaderElement.style.display = 'block';
//     errorElement.style.display = 'none';
//     catInfoElement.style.display = 'none';

//     const response = await axios.get(
//       `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
//     );
//     const cat = response.data[0];

//     // Wyświetlenie informacji o kocie
//     catInfoElement.innerHTML = `
//       <img src="${cat.url}" alt="Cat" />
//       <p><strong>Breed:</strong> ${cat.breeds[0].name}</p>
//       <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
//       <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
//     `;
//     catInfoElement.style.display = 'block';

//     // Ukrycie animacji ładowania po pomyślnym pobraniu informacji o kocie
//     loaderElement.style.display = 'none';
//   } catch (error) {
//     // Wyświetlenie komunikatu błędu
//     errorElement.style.display = 'block';
//     console.error('Error fetching cat:', error);
//   }
// }

// // Inicjalizacja pobierania listy ras przy załadowaniu strony
// fetchBreeds();

// // Obsługa zmiany wyboru rasy kotów
// selectElement.addEventListener('change', event => {
//   const breedId = event.target.value;
//   fetchCatByBreed(breedId);
// });
