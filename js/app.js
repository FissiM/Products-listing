(function () {
  "use strict";

  const addForm = document.getElementById("add-form");
  const addModal = document.getElementById("add-modal");
  const closeModalEl = document.getElementById("close-modal");
  const productsList = document.getElementById("products-section");
  const addButtons = document.getElementsByClassName("add_button");

  Array.from(addButtons).forEach(function (element) {
    element.addEventListener("click", showAddModal);
  });

  async function getProduct() {
    try {
      const response = await fetch("https://dummyjson.com/products");

      const values = await response.json();

      values.products.forEach((item) =>
        renderProduct({
          title: item.title,
          price: item.price,
          description: item.description,
          thumbnail: item.thumbnail,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }
  getProduct();

  function renderProduct(product) {
    productsList.insertAdjacentHTML(
      "beforeend",
      `<div class="products-section-item">
    <div class="products-section-item__thumb">
      <img src="${product.thumbnail}" alt="Item Thumbnail" />
      
    </div>
    <div class="products-section-item__content">
      <div class="products-section-item__headings">
        <h3 class="products-section-item__title">
        ${product.title}
        </h3>

        <p class="products-section-item__description">
        ${product.description}
        </p>
      </div>

      <span class="products-section-item__price">
        ${product.price}€
      </span>
    </div>
  </div>`
    );
  }

  function getProducts() {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((value) => {
        value.products.forEach((element) => {
          const { title, rating, price } = element;
          productsList.insertAdjacentHTML(
            "beforeend",
            `<div class="products-section-item">
    <div class="products-section-item__thumb">
      <img src="${element.images[0]}" alt="Item Thumbnail" />
      
    </div>
    <div class="products-section-item__content">
      <div class="products-section-item__headings">
        <h3 class="products-section-item__title">
        ${title}
        </h3>

        <p class="products-section-item__description">
        ${rating}
        </p>
      </div>

      <span class="products-section-item__price">
        ${price}€
      </span>
    </div>
  </div>`
          );
        });
      })

      .catch((error) => console.error(error));
  }

  getProducts();

  function showAddModal() {
    addModal.classList.add("add_modal--shown");
  }

  closeModalEl.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
      closeModal();
    }
  });

  function closeModal() {
    addModal.classList.remove("add_modal--shown");
    addForm.reset();
  }

  addForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    productsList.insertAdjacentHTML(
      "afterbegin",
      `<div class="products-section-item">
    <div class="products-section-item__thumb">
      <img src="./assets/images/6.png" alt="Item Thumbnail" />
    </div>
    <div class="products-section-item__content">
      <div class="products-section-item__headings">
        <h3 class="products-section-item__title">
        ${formData.get("title")}
        </h3>

        <p class="products-section-item__description">
        ${formData.get("description")}
        </p>
      </div>

      <span class="products-section-item__price">
        ${formData.get("price")}€
      </span>
    </div>
  </div>`
    );

    addModal.classList.remove("add_modal--shown");
    this.reset();
  });
})();
