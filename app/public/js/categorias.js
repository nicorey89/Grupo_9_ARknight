window.addEventListener("load", () => {
      let selectCategory = document.querySelector("#categoria");
      let selectSubcategory = document.querySelector("#subCategoria");

      selectCategory.addEventListener("change", async (event) => {
            let categoryId = event.target.value;

            try {
                  const response = await fetch(`http://localhost:3000/api/v1/subCategories/category/${categoryId}`);
                  const { data } = await response.json();
                  selectSubcategory.innerHTML = "";

                  const obtenerOption = (subCategory) => {
                        return `<option value='${subCategory.id}'>${subCategory.nombre}</option>`;
                  };

                  data.forEach((subCategory) => {
                        selectSubcategory.innerHTML += obtenerOption(subCategory);
                  });
            } catch (error) {
                  console.log(error);
            }
      });
      selectCategory.dispatchEvent(new Event("change"));
});