window.addEventListener("load", ()=>{
    const selectCategorias = document.querySelector('#categoria');
    const selectSubcategorias = document.querySelector('#subCategoria');
    
    selectCategorias.addEventListener("change", (event) => {
        let categoriaId = event.target.value;
        console.log(categoriaId)
        fetch(`http://localhost:3000/api/v1/categoria/${categoriaId}`)
        .then((res) => res.json())
        .then((data) => {
            selectSubcategorias.innerHTML = "";
            data.Subcategorias.forEach(subcategoria => {
                selectSubcategorias.innerHTML += `<option value='${subcategoria.nombre}'>${subcategoria.nombre}</option>`
            });
        }) 
        .catch((error) => console.log(error))
    })
    
    })