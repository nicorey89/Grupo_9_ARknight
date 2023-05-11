<<<<<<< HEAD
import fetch from 'node-fetch';

window.addEventListener("load", ()=>{
    const selectCategorias = document.querySelector('#categoria');
    const selectSubcategorias = document.querySelector('#subCategoria');
    
    const API_BASE_URL = `http://localhost:3000/api/v1/`;


    selectCategorias.addEventListener("change", async (event) => {
        let categoriaId = event.target.value;
        //console.log(categoriaId)
        try {
            const response = await fetch(`${API_BASE_URL}categoria/${categoriaId}&campos=id,nombre`)
            const {data} = await response.json();
            //console.log(Subcategorias)
            selectSubcategorias.innerHTML = "";

            const obtenerOption = () => {
                return `<option value='${Subcategoria.id}'>${Subcategoria.nombre}</option>`
            }
            for (data of dato) {
                if (dato === 'Subcategorias') {
                    Subcategoria.forEach((Subcategoria) => {
                        selectSubcategorias.innerHTML += obtenerOption(Subcategoria)
                    })
                }
            } 

        } catch (error) {
            alert('Hubo un error')
            console.log(error)
        }
    })
    selectCategorias.dispatchEvent(new Event("change"))
    })
=======
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
>>>>>>> 2d83ec209c6d9c05137fd9c8deb0b57d2323b780
