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