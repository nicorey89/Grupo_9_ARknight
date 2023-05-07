window.addEventListener("load", ()=>{
    const selectProvincias = document.querySelector('#provincias');
    const selectLocalidades = document.querySelector('#localidad');
    
    selectProvincias.addEventListener("change", (event) => {
        let provinceId = event.target.value;
        fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinceId}&campos=id,nombre&max=5000`)
        .then((res) => res.json())
        .then((data) => {
            const {localidades} = data;
            selectLocalidades.innerHTML = ""
            localidades.forEach(localidad => {
                selectLocalidades.innerHTML += `<option value='${localidad.nombre}'>${localidad.nombre}</option>`
            });
        })
        .catch((error) => console.log(error))
    })
    
    })