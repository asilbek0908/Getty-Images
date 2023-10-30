// Selectors

const auth = "6f1zHTlFai3KXkTqvWkCOARnFrwmF0XiwYVa49ZzrcjcKN5YVf3ak3dB";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let fetchLink;
let searchValue;
let page = 1;
let currentSearch;

// Event Listener
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

// Update input
function updateInput(e) {
  // console.log(e.target.value);
  searchValue = e.target.value;
}

// Fetch Api

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });

  const data = await dataFetch.json();
  return data;
}

// Generate Photos

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class="gallery-info">
      <div class="text">
        <p><span class="author">Author :</span> ${photo.photographer}</p>
        <a href="${photo.src.large}" target="_blank">Download</a>
      </div>
      <img src="${photo.src.large}">
    </div>
    `;
    gallery.appendChild(galleryImg);
  });
}

// Curated Photos
async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();

// Clear
function clear() {
  gallery.innerHTML = "";
  searchInput.innerHTML = "";
}

// Search photos

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=80&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

// Load more

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
