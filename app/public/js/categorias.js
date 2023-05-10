window.addEventListener("load", ()=>{
    const selectCategorias = document.querySelector('#categoria');
    const selectSubcategorias = document.querySelector('#subCategoria');
    
    const API_BASE_URL = `http://localhost:3000/api/v1/`;


    selectCategorias.addEventListener("change", async (event) => {
        let categoriaId = event.target.value;
        //console.log(categoriaId)
        try {
            const response = await fetch(`${API_BASE_URL}categoria/${categoriaId}&campos=id,nombre`)
            const {Subcategorias} = await response.json();
            selectSubcategorias.innerHTML = "";

            const obtenerOption = () => {
                return `<option value='${nombre}'>${nombre}</option>`
            }

            Subcategorias.forEach(Subcategoria => {
                selectSubcategorias.innerHTML += obtenerOption(Subcategoria.nombre)
            })

        } catch (error) {
            alert('Hubo un error')
            console.log(error)
        }
    })
    
    })