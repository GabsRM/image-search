const accessKey = "uHK6oqh3QpjrxdLOmLmjJ7GhnrASYRdFNrPyC2XpflE";

const formElement = document.querySelector("form");
const searchResult = document.querySelector(".search-results");
const showMore = document.querySelector("#show-more-button");

let inputData = "";
let page = 1;


async function searchImages() {
  inputData = document.querySelector("#search-input").value;
  const url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&page=${page}&query=${inputData}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");

    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLinkForImage = document.createElement("a");
    imageLinkForImage.href = result.links.html;
    imageLinkForImage.target = "_blank";

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.classList = "image-text";
    imageLink.textContent = result.alt_description;

    const footer = document.querySelector("footer");
    footer.style.position = "relative";

    imageWrapper.appendChild(imageLinkForImage);
    imageLinkForImage.appendChild(image);
    imageWrapper.appendChild(imageLink);

    searchResult.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", (event) => {
  searchImages();
});
