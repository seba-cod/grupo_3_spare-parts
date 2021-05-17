window.addEventListener("load", function (event) {
  const dangerColor = "rgba(255,0,0,0.2)";
  const succesColor = "rgba(0,255,0,0.2)";

  function resetErrors(messageElement, input) {
    if (messageElement) {
      messageElement.innerHTML = "";
    }
    if (input) {
      input.style.background = "rgba(255,0,0,0)";
    }
  }

  const productName = document.querySelector("input#name");
  const productDescription = document.querySelector("textarea#description");
  const productPrice = document.querySelector("input#price");
  const productImage = document.querySelector("input#image");
  const productBrand = document.querySelector("input#brand");
  const productCategory = document.querySelector("select#categorie");
  const form = document.querySelector("#form");

  const toScriptOnProductName = document.querySelector(
    "#toScriptOnProductName"
  );
  const toScriptOnProductDescription = document.querySelector(
    "#toScriptOnProductDescription"
  );
  const toScriptOnProductPrice = document.querySelector(
    "#toScriptOnProductPrice"
  );
  const toScriptOnProductImage = document.querySelector(
    "#toScriptOnProductImage"
  );
  const toScriptOnProductBrand = document.querySelector(
    "#toScriptOnProductBrand"
  );
  const toScriptOnProductCategory = document.querySelector(
    "#toScriptOnProductCategory"
  );

  productName.addEventListener("keyup", (e) => {
    const product = e.target.value;
    if (product.length < 3) {
      productName.style.background = dangerColor;
      toScriptOnProductName.innerHTML = "Escribe un nombre para tu producto";
    }
    if (product.length >= 3) {
      resetErrors(toScriptOnProductName, productName);
      return (productName.style.background = succesColor);
    }
  });

  productDescription.addEventListener("keyup", (e) => {
    const description = e.target.value;
    if (description.length < 10) {
      productDescription.style.background = dangerColor;
      toScriptOnProductDescription.innerHTML = "Escribe mínimo 10 caracteres";
    }
    if (description.length >= 10) {
      resetErrors(toScriptOnProductDescription, productDescription);
      toScriptOnProductDescription.innerHTML =
        "¡Sigue así a tus ponteciales compradores les gusta saber las características del producto!";
      return (productDescription.style.background = succesColor);
    }
  });

  productBrand.addEventListener("keyup", (e) => {
    const brand = e.target.value;
    if (brand.length < 2) {
      productBrand.style.background = dangerColor;
      toScriptOnProductBrand.innerHTML = "Escribe la marca de tu producto";
    }
    if (brand.length >= 2) {
      resetErrors(toScriptOnProductBrand, productBrand);
      return (productBrand.style.background = succesColor);
    }
  });

  productPrice.addEventListener("keypress", (e) => {
    const price = Number(e.target.value);
    if (price == 0) {
      productPrice.style.background = dangerColor;
      toScriptOnProductPrice.innerHTML =
        "Por favor coloca un número, si necesitas puedes utilizar un punto como separador de decimales";
    }
    if (price !== 0) {
      resetErrors(toScriptOnProductPrice, productPrice);
      return (productPrice.style.background = succesColor);
    }
  });

  productImage.addEventListener("change", (e) => {
    if (productImage.value) {
      resetErrors(toScriptOnProductImage, false);
    }
  });
  productCategory.addEventListener("change", (e) => {
    category = e.target.value;
    if (category) {
      resetErrors(toScriptOnProductCategory, productCategory);
      return (productCategory.style.background = succesColor);
    }
  });

  form.addEventListener("submit", (e) => {
    if (productName.value.length < 3) {
      e.preventDefault();
      productName.style.background = dangerColor;
      toScriptOnProductName.innerHTML = "Escribe un nombre para tu producto";
    }
    if (productDescription.value.length < 2) {
      e.preventDefault();
      productDescription.style.background = dangerColor;
      toScriptOnProductDescription.innerHTML = "Escribe mínimo 10 caracteres";
    }
    if (productBrand.value.length < 2) {
      e.preventDefault();
      productBrand.style.background = dangerColor;
      toScriptOnProductBrand.innerHTML = "Escribe la marca de tu producto";
    }
    if (productPrice.value == 0) {
      e.preventDefault();
      productPrice.style.background = dangerColor;
      toScriptOnProductPrice.innerHTML =
        "Por favor coloca un número, si necesitas puedes utilizar un punto como separador de decimales";
    }
    if (productCategory.value) {
      productCategory.style.background = dangerColor;
      toScriptOnProductCategory.innerHTML =
        "Selecciona una categoria para tu producto";
    }
    if (!productImage.value) {
      e.preventDefault();
      toScriptOnProductImage.innerHTML = "Sube una imagen de tu producto";
    }
  });
});
