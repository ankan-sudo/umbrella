// Getting DOM elements
const umbrellaImage = document.getElementById("umbrella-image");
const logoImage = document.getElementById("logo-image");
const logoFileInput = document.getElementById("logo-file");
const colorSwitches = document.querySelectorAll(".color-switch");

// Adding event listeners
logoFileInput.addEventListener("change", handleLogoUpload);
colorSwitches.forEach((swatch) => {
  swatch.addEventListener("click", handleColorChange);
});

// Function to handle logo upload
function handleLogoUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    logoImage.src = e.target.result;
    logoImage.classList.remove("hidden");
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

// Function to handle color change
function handleColorChange(event) {
  const color = event.target.dataset.color;

  showLoader();

  // Delaying the loading of the new umbrella image
  setTimeout(() => {
    // Load umbrella image
    const newUmbrellaImage = new Image();
    newUmbrellaImage.src = `umbrella-${color}.png`;

    // Waiting for the new image to load
    newUmbrellaImage.onload = function () {
      // Replacing umbrella image
      umbrellaImage.src = newUmbrellaImage.src;

      hideLoader();

      // Updating active color switch
      colorSwitches.forEach((swatch) => {
        swatch.classList.remove("active");
      });
      event.target.classList.add("active");
    };
  }, 2000);
}

function showLoader() {
  document.querySelector(".loader").style.display = "block";
  umbrellaImage.classList.add("hidden");
}

function hideLoader() {
  document.querySelector(".loader").style.display = "none";
  umbrellaImage.classList.remove("hidden");
}
