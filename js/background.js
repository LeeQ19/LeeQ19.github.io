const unsplashApiKey = "mifkBWXlaiHdXGWmdCJE0RMxsR_af_JNpLSAxw6ygqE",
unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&query=landscape&orientation=landscape`;

const body = document.querySelector("body");

function saveBackground(imageUrl) {
  const savedImage = localStorage.getItem("bg");
  if (savedImage !== null) {
    localStorage.removeItem("bg");
  }
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  const imageObject = {
    url: imageUrl,
    expiresOn: expirationDate
  };
  localStorage.setItem("bg", JSON.stringify(imageObject));
  loadBackground();
}

function getBackground() {
  fetch(unsplashUrl)
    .then(response => response.json())
    .then(json => {
      const image = json;
      if (image.urls && image.urls.full && image.location) {
        const fullUrl = image.urls.full;
        saveBackground(fullUrl);
      } else {
        getBackground();
      }
    });
}

function loadBackground() {
  const savedImage = localStorage.getItem("bg");
  if (savedImage === null) {
    getBackground();
  } else {
    const parsedImage = JSON.parse(savedImage);
    const today = new Date();
    if (today > parsedImage.expiresOn) {
      getBackground();
    } else {
      body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${parsedImage.url})`;
    }
  }
}

function initApp() {
  loadBackground();
}

initApp();
