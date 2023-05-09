let qs = (elemento) => {
  return document.querrySelector(elemento);
}

 // titulo - modelo - precio - descuento - cuota

 window.addEventListener("load" , () => { 
  let $inputTitulo = qs("#titulo"),
      $tituloErrors = qs("#error-message"),
      $inputModelo = qs("#modelo"),
      $modeloErrors = qs("#error-message"),
      $inputPrecio = qs("#precio"),
      $precioErrors = qs("#error-message"),
      $inputDescuento = qs("#descuento"),
      $descuentoErrors = qs("#error-message"),
      $inputCuota = qs("#Cuota"),
      $cuotaErrors = qs("#error-message"),
      $inputCategoria = qs("#categoria"),
      $categoriaErrors = qs("#categoriaErrors"),
      regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/
   


  $inputTitulo.addEventListener("blur" , () => {
    switch (true) {
     case !$inputTitulo.value.trim():
           $tituloErrors.innerText = "La marca es obligatoria";
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
           $inputTitulo.classList.remove("is-valid");
           $inputModelo.classList.add("is-invalid");
           break;
     case !regExAlpha.test($inputModelo.value):
           $modeloErrors.innerText = "modelo invalido";
           $inputTitulo.classList.remove("is-valid");
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
           $inputTitulo.classList.remove("is-valid");
           $inputPrecio.classList.add("is-invalid");
           break;
     case !regExAlpha.test($inputPrecio.value):
           $precioErrors.innerText = "precio invalido";
           $inputTitulo.classList.remove("is-valid");
           $inputPrecio.classList.add("is-invalid");

       break;


       default:
        $inputPrecio.classList.remove("is-invalid");
        $inputPrecio.classList.add("is-valid");
          $precioErrors.innerText="";
        break;




    }
   })
  
   $inputCuota.addEventListener("blur" , () => {
    switch (true) {
     case !$inputCuota.value.trim():
           $cuotaErrors.innerText = "Debe ingresar la cuota";
           $inputTitulo.classList.remove("is-valid");
           $inputCuota.classList.add("is-invalid");
           break;
     case !regExAlpha.test($inputCuota.value):
           $cuotaErrors.innerText = "cuotas invalidas";
           $inputTitulo.classList.remove("is-valid");
           $inputCuota.classList.add("is-invalid");

       break;
       
       
       default:
        $inputCuota.classList.remove("is-invalid");
          $inputCuota.classList.add("is-valid");
          $cuotaErrors.innerText="";
        break;



        
    }
   })
   
   $inputDescuento.addEventListener("blur" , () => {
       switch (true) {
           case !$inputDescuento.value.trim():
               $descuentoErrors.innerText = "Ingresa el descuento";
               $inputTitulo.classList.remove("is-valid");
           $inputDescuento.classList.add("is-invalid");
           break;
           case !regExAlpha.test($inputDescuento.value):
           $descuentoErrors.innerText = "descuento invalido";
           $inputTitulo.classList.remove("is-valid");
           $inputDescuento.classList.add("is-invalid");

           break;
           
           
           default:
               $inputDescuento.classList.remove("is-invalid");
               $inputDescuento.classList.add("is-valid");
               $descuentoErrors.innerText="";
               break;
               
               
               
               
            }
   }) 
   $inputCategoria.addEventListener("change" , () => {
     switch (true) {
      case !$inputCategoria.value.trim():
            $categoriaErrors.innerText = "La categoria es obligatoria";
            $inputCategoria.classList.remove("is-valid");
            $inputCategoria.classList.add("is-invalid");
            break;
      case !regExAlpha.test($inputCategoria.value):
            $categoriaErrors.innerText = "Marca no existe";
            $inputCategoria.classList.remove("is-valid");
            $inputCategoria.classList.add("is-invalid");
 
        break;
 
        default:
            $inputCategoria.classList.remove("is-invalid");
            $inputCategoria.classList.add("is-valid");
            $categoriaErrors.innerText="";
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