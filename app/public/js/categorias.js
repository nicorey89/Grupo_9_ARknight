window.addEventListener("load", () => {
      let selectCategory = document.querySelector("#categoria");
      let selectSubcategory = document.querySelector("#subCategoria");
    
      selectCategory.addEventListener("change", async (event) => {
        let categoryId = event.target.value;
    
        try {
          const response = await fetch(`http://localhost:3000/api/v1/subCategories/category/${categoryId}`);
          const { data } = await response.json();
          console.log(data);
    
          selectSubcategory.innerHTML = '';
    
          const obtenerOption = (subCategory) => {
            return `<option value='${subCategory.id}'>${subCategory.nombre}</option>`;
          };
    
          data.forEach((subCategory) => {
            console.log(subCategory); // Verifica si se ejecuta este log
            selectSubcategory.innerHTML += obtenerOption(subCategory);
          });
        } catch (error) {
          console.log(error);
        }
      });
    
      // Verifica si selectSubcategory está referenciando el elemento correcto
      console.log(selectSubcategory);
    
      selectCategory.dispatchEvent(new Event("change"));
    });