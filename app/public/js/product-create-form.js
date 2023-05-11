let qs = (elemento) => {
    return document.querySelector(elemento);
  }

   // titulo - modelo - precio - descuento - cuota

   window.addEventListener("load" , () => { 
    let $inputTitulo = qs("#titulo"),
        $tituloErrors = qs("#tituloErrors"),
        $inputModelo = qs("#modelo"),
        $modeloErrors = qs("#modeloErrors"),
        $inputPrecio = qs("#precio"),
        $precioErrors = qs("#precioErrors"),
        $inputDescuento = qs("#descuento"),
        $descuentoErrors = qs("#descuentoErrors"),
        $inputCuota = qs("#Cuotas"),
        $cuotaErrors = qs("#cuotasErrors"),
        $form= qs("#form"),
        regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
        regExPrecio = /^[0-9]{2,10}$/,
        regExDescuento = /^[0-9]{1,2}$/,
        regExCuota = /^[0-9]{1,2}$/



        $inputTitulo.addEventListener("blur" , () => {
            switch (true) {
             case !$inputTitulo.value.trim():
                   $tituloErrors.innerText = "El titulo es obligatoria";
                   $inputTitulo.classList.remove("is-valid");
                   $inputTitulo.classList.add("is-invalid");
                   break;
             case !regExAlpha.test($inputTitulo.value):
                   $tituloErrors.innerText = "Marca no existe";
                   $inputTitulo.classList.remove("is-valid");
                   $inputTitulo.classList.add("is-invalid");
               break;
               default:
                  $inputTitulo.classList.remove("is-invalid");
                  $inputTitulo.classList.add("is-valid");
                  $tituloErrors.innerText="";
                break;
            }
           })

           $inputModelo.addEventListener("blur" , () => {
            switch (true) {
             case !$inputModelo.value.trim():
                   $modeloErrors.innerText = "El modelo es obligatorio";
                   $inputModelo.classList.remove("is-valid");
                   $inputModelo.classList.add("is-invalid");
                   break;
             case !regExAlpha.test($inputModelo.value):
                   $modeloErrors.innerText = "modelo invalido";
                   $inputModelo.classList.remove("is-valid");
                   $inputModelo.classList.add("is-invalid");
               break;
               default:
                  $inputModelo.classList.remove("is-invalid");
                  $inputModelo.classList.add("is-valid");
                  $modeloErrors.innerText="";
                break;
            }
           })
           $inputPrecio.addEventListener("blur" , () => {
            switch (true) {
             case !$inputPrecio.value.trim():
                   $precioErrors.innerText = "Debe ingresar el Precio";
                   $inputPrecio.classList.remove("is-valid");
                   $inputPrecio.classList.add("is-invalid");
                   break;
             case !regExPrecio.test($inputPrecio.value):
                   $precioErrors.innerText = "precio invalido";
                   $inputPrecio.classList.remove("is-valid");
                   $inputPrecio.classList.add("is-invalid");
               break;
               default:
                $inputPrecio.classList.remove("is-invalid");
                $inputPrecio.classList.add("is-valid");
                $precioErrors.innerText="";
                break;
            }
           })
           $inputDescuento.addEventListener("blur" , () => {
            switch (true) {
             case !$inputDescuento.value.trim():
                   $descuentoErrors.innerText = "Ingresa el descuento";
                   $inputDescuento.classList.remove("is-valid");
                   $inputDescuento.classList.add("is-invalid");
                   break;
             case !regExDescuento.test($inputDescuento.value):
                   $descuentoErrors.innerText = "descuento invalido";
                   $inputDescuento.classList.remove("is-valid");
                   $inputDescuento.classList.add("is-invalid");
               break;
               default:
                $inputDescuento.classList.remove("is-invalid");
                $inputDescuento.classList.add("is-valid");
                $descuentoErrors.innerText="";
                break;
            }
           }) 
           $inputCuota.addEventListener("blur" , () => {
            switch (true) {
             case !$inputCuota.value.trim():
                   $cuotaErrors.innerText = "Debe ingresar la cuota";
                   $inputCuota.classList.remove("is-valid");
                   $inputCuota.classList.add("is-invalid");
                   break;
             case !regExCuota.test($inputCuota.value):
                   $cuotaErrors.innerText = "cuotas invalidas";
                   $inputCuota.classList.remove("is-valid");
                   $inputCuota.classList.add("is-invalid");
               break;
               default:
                  $inputCuota.classList.remove("is-invalid");
                  $inputCuota.classList.add("is-valid");
                  $cuotaErrors.innerText="";
                break;
            }
           })
           
           $form.addEventListener("submit", (event) => {
            event.preventDefault();
            const FORM_ELEMENTS = event.target.elements;
    
            for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
                const element = FORM_ELEMENTS[index];
                if(element.value === "" && element.type !== "file") {
                    element.classList.add("is-invalid")
                }
                
            }
    
           
    
            let elementosConErrores = document.querySelectorAll(".is-invalid");
            let errores = elementosConErrores.length > 0; 
    
            if(errores) {
                submitErrors.innerText = "Hay errores en el formulario"
            } else {
                $form.submit()
            }
         })
    })
