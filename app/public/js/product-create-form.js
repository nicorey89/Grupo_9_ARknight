let qs = (elemento) => {
    return document.querySelector(elemento);
  }

   // titulo - modelo - precio - descuento - cuota

   window.addEventListener("load" , () => { 
    let $inputTitulo = qs("#titulo")
        $tituloErrors = qs("#tituloErrors")
        $inputModelo = qs("#modelo")
        $modeloErrors = qs("#modeloErrors")
        $inputPrecio = qs("#precio")
        $precioErrors = qs("#precioErrors")
        $inputDescuento = qs("#descuento")
        $descuentoErrors = qs("#descuentoErrors")
        $inputCuota = qs("#cuotas")
        $cuotaErrors = qs("#cuotasErrors")
        $inputCategoria = qs("#categoria")
        $categoriaErrors = qs("#categoriaErrors")
        $inputsubCategoria = qs("#subCategoria")
        $subCategoriaErrors = qs("#subcategoriaErrors")
        $inputDescripcion = qs("#descripcion")
        $descripcionErrors = qs("#descripcionErrors")
        $inputAvatar = qs("#imagen")
        $imagenTrue = qs("#imagenTrue")
        $avatarErrors = qs("#imagenErrors")
        $form= qs("#FORM")
        $regExPrecio = /^[0-9]{2,10}$/  
        
    console.log($inputTitulo);
    console.log($tituloErrors);
    console.log($inputModelo);
    console.log($modeloErrors);
    console.log($inputPrecio);
    console.log($precioErrors);
    console.log($inputDescuento);
    console.log( $descuentoErrors);
    console.log($inputCuota);
    console.log( $cuotaErrors);
    console.log($inputCategoria);
    console.log($categoriaErrors);
    console.log($inputsubCategoria);
    console.log( $subCategoriaErrors);
    console.log($inputAvatar);
    console.log($imagenTrue);
    console.log($avatarErrors);
    console.log($form);
        $inputTitulo.addEventListener("blur" , () => {
            switch (true) {
             case !$inputTitulo.value.trim():
                   $tituloErrors.innerText = "545454EL TITULO ES OBLIGATORIO";
                   $inputTitulo.classList.add("is-invalid");
                   break;
               default:
                  $inputTitulo.classList.remove("is-invalid");
                  $inputTitulo.classList.add("is-valid");
                  $tituloErrors.innerText = "";
                break;
            }
           });

           $inputModelo.addEventListener("blur" , () => {
            switch (true) {
             case !$inputModelo.value.trim():
                   $modeloErrors.innerText = "El modelo es obligatorio";
                   $inputModelo.classList.add("is-invalid");
                   break;
               default:
                  $inputModelo.classList.remove("is-invalid");
                  $inputModelo.classList.add("is-valid");
                  $modeloErrors.innerText="";
                break;
            }
           });

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
           });

           $inputDescuento.addEventListener("blur" , () => {
            switch (true) {
             case !$inputDescuento.value.trim():
                   $descuentoErrors.innerText = "Ingresa el descuento";
                   $inputDescuento.classList.remove("is-valid");
                   $inputDescuento.classList.add("is-invalid");
                   break;
             case !regExPrecio.test($inputDescuento.value):
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
           }); 

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
           });

           $inputCategoria.addEventListener("blur", () => {
            switch (true) {
                  case !$inputCategoria.value:
                        $categoriaErrors.innerText = "El campo categoria es obligator000";
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

           $inputDescripcion.addEventListener("blur" , () => {
            switch (true) {
             case !$inputDescripcion.value.trim():
                   $descripcionErrors.innerText = "La descripcion es obligatorio";
                   $inputDescripcion.classList.add("is-invalid");
                   break;
               default:
                  $inputDescripcion.classList.remove("is-invalid");
                  $inputDescripcion.classList.add("is-valid");
                  $descripcionErrors.innerText="";
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
                }else {
                    $avatarErrors.innerHTML = '';
                    $imagenTrue.innerHTML = 'Carga un archivo de imagen con exito';
                    $imagenTrue.style.color = "green"
                    return true;
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
                submitErrors.innerText = "Hay errores en el formulario"
            } else {
                $form.submit()
            }
         })
    })
