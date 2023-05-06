let qs = (elemento) => {
  return document.querrySelector(elemento);
}

 // titulo - modelo - precio - descuento - cuota

 window.addEventListener("load" , () => { 
  let $inputTitulo = qs("#titulo")
  $tituloError = qs("#error-message")
  $inputModelo = qs("#modelo")
  $modeloError = qs("#error-message")
  $inputPrecio = qs("#precio")
  $precioError = qs("#error-message")
  $inputDescuento = qs("#descuento")
  $descuentoError = qs("#error-message")
  $inputCuota = qs("#Cuota")
  $cuotaError = qs("#error-message")

   


  $inputTitulo.addEventListener("blur" , () => {
    switch (true) {
     case !$inputTitulo.value.trim():
           $tituloErrors.innerText = "La marca es obligatoria";
           $inputTitulo.classList.add("is-invalid");
           break;
     case !$regExAlpha.test($inputTitulo.value):
           $tituloErrors.innerText = "Marca no existe";
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
           $inputModelo.classList.add("is-invalid");
           break;
     case !$regExAlpha.test($inputModelo.value):
           $modeloErrors.innerText = "modelo invalido";
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
           $inputPrecio.classList.add("is-invalid");
           break;
     case !$regExAlpha.test($inputPrecio.value):
           $precioErrors.innerText = "precio invalido";
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
           $inputCuota.classList.add("is-invalid");
           break;
     case !$regExAlpha.test($inputCuota.value):
           $cuotaErrors.innerText = "cuotas invalidas";
           $inputCuota.classList.add("is-invalid");

       break;


       default:
        $inputCuota.classList.remove("is-invalid");
          $$inputCuota.classList.add("is-valid");
          $cuotaErrors.innerText="";
        break;




    }
   })
    
   $inputDescuento.addEventListener("blur" , () => {
    switch (true) {
     case !$inputDescuento.value.trim():
           $descuentoErrors.innerText = "Ingresa el descuento";
           $inputDescuento.classList.add("is-invalid");
           break;
     case !$regExAlpha.test($inputDescuento.value):
           $descuentoErrors.innerText = "descuento invalido";
           $inputDescuento.classList.add("is-invalid");

       break;


       default:
        $inputDescuento.classList.remove("is-invalid");
        $inputDescuento.classList.add("is-valid");
        $descuentoErrors.innerText="";
        break;




    }
   }) 

  })