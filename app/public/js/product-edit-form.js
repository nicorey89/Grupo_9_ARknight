let qss = (elemento) => {
    return document.querySelector(elemento);
  }

   // titulo - modelo - precio - descuento - cuota

   window.addEventListener("load" , () => { 
    let $inputTitulo = qss("#titulo"),
        $tituloErrors = qss("#tituloErrors"),
        $inputModelo = qss("#modelo"),
        $modeloErrors = qss("#modeloErrors"),
        $inputPrecio = qss("#precio"),
        $precioErrors = qss("#precioErrors"),
        $inputDescuento = qss("#descuento"),
        $descuentoErrors = qss("#descuentoErrors"),
        $inputCuota = qss("#cuotas"),
        $cuotaErrors = qss("#cuotasErrors");
        $inputCategoria = qss("#categoria"),
        $categoriaErrors = qss("#categoriaErrors"),
        $inputsubCategoria = qss("#subCategoria"),
        $subCategoriaErrors = qss("#subcategoriaErrors"),
        $inputDescripcion = qss("#descripcion"),
        $descripcionErrors = qss("#descripcionErrors")
        $inputAvatar = qss("#imagen")
        $imagenTrue = qss("#imagenTrue")
        $avatarErrors = qss("#imagenErrors")
        $form = qss("#form"),
        $submitErrors = qss("#errorS"),
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
           $inputCategoria.addEventListener("blur", () => {
            switch (true) {
                  case !$inputCategoria.value:
                        $categoriaErrors.innerText = "El campo categoria es obligatorio";
                        $inputCategoria.classList.remove("is-valid");
                        $inputCategoria.classList.add("is-invalid");
                        break;
                  default:
                        $inputCategoria.classList.remove("is-invalid");
                        $inputCategoria.classList.add("is-valid");
                        $categoriaErrors.innerText = "";
                        break;
            }
           });  
            $inputsubCategoria.addEventListener("blur", () => {
                switch (true) {
                    case !$inputsubCategoria.value:
                        $subCategoriaErrors.innerText = "El campo subcategoria es obligatorio";
                        $inputsubCategoria.classList.add("is-invalid");
                        break;
                    default:
                        $inputsubCategoria.classList.remove("is-invalid");
                        $inputsubCategoria.classList.add("is-valid");
                        $subCategoriaErrors.innerText = "";

                        break;
                }
           });
           
           $inputsubCategoria.addEventListener("change", () => {
            switch (true) {
                case $inputsubCategoria.value:
                    $inputsubCategoria.classList.remove("is-invalid");
                    $inputsubCategoria.classList.add("is-valid");
                    $subCategoriaErrors.innerText = "";
                    break;
                default:
                    break;
            }
       });

           $inputDescripcion.addEventListener("blur" , () => {
            switch (true) {
             case !$inputDescripcion.value.trim():
                   $descripcionErrors.innerText = "La descripcion es obligatorio";
                   $inputDescripcion.classList.add("is-invalid");
                   break;
               default:
                break;
            }
           });

           $inputDescripcion.addEventListener("change", () => {
            switch (true) {
                case $inputsubCategoria.value:
                    $inputDescripcion.remove("is-invalid");
                    $inputDescripcion.add("is-valid");
                    $descripcionErrors.innerText = "";
                    break;
                default:
                    break;
            }
       });

           $inputAvatar.addEventListener("blur", () => {
               let filePath = $inputAvatar.value,
               allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i;
            if(!allowefExtensions.exec(filePath)){ 
                $avatarErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
                $inputAvatar.value = '';
                $imagenTrue.innerHTML = '';
                return false;
                }
           })

           $inputAvatar.addEventListener("change", () => {
            const allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i;
            let filePath = $inputAvatar.value;
            switch (true) {
                case !allowefExtensions.exec(filePath):
                        $imagenTrue.innerHTML = ""
                        $avatarErrors.innerText = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
                        $inputAvatar.value = "";
                        $avatarErrors.classList.add("is-invalid");
                        break;
                default:
                    $avatarErrors.classList.remove("is-invalid");
                    $avatarErrors.innerHTML = "";
                    $imagenTrue.innerHTML = "Carga de archivo exitoso"
                    $imagenTrue.classList.add("is-valid")

                    break;
            }
           })
           
           $form.addEventListener("submit", (event) => {
            event.preventDefault();
            const FORM_ELEMENTS = event.target.elements;
    
            for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
                const element = FORM_ELEMENTS[index];
                if(element.value === "" && element.type !== "file") {
                    element.classList.add("is-invalid");
                    element.dispatchEvent(new Event("blur"))
                }
                
            }
    
           
    
            let elementosConErrores = document.querySelectorAll(".is-invalid");
            let errores = elementosConErrores.length > 0; 
    
            if(errores) {
                $submitErrors.innerText = "Hay errores en el formulario"
            } else {
                $form.submit()
            }
         })
    })
