  let qs = (elemento) => {
    return document.querySelector(elemento);
} 

window.addEventListener("load", () => {
  let $inputName = qs("#name"),
      $nameErrors = qs("#nameErrors"),
      $inputLastname = qs("#apellido"),
      $lastnameErrors = qs("#apellidoErrors"),
      $form = qs("#submit"),
      $tel = qs("#tel"),
      $telErrors = qs("#telErrors"),
      $email = qs("#emailFormValidator"),
      $emailErrors = qs("#emailFormValidatorErrors"),
      $password = qs("#password"),
      $passwordErrors = qs("#passwordErrors"),
      $password2 = qs("#password2"),
      $password2Errors = qs("#password2Errors"),
      $fecha = qs("#fecha"),
      $fechaErrors = qs("#fechaErrors"),
      $genero = qs("#genero"),
      $generoErrors = qs("#generoErrors"),
      $terms = qs("#recordar"),
      $termsErrors = qs("#recordarErrors"),
      $file = qs("#file"),
      $fileErrors = qs("#file"),
      $imgPreview = qs("#img-preview"),
      regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
      regExTel = /^[0-9]{10,16}$/,
      regExEmail_form_validator = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
      regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;


      $inputName.addEventListener("blur", () => { 
        switch (true) {
            case !$inputName.value.trim():
                $nameErrors.innerText = "El campo nombre es obligatorio";
                $inputName.classList.add("is-invalid");
                break; 
            case !regExAlpha.test($nameValidator.value):  
                $nameValidatorErrors.innerText = "Debe ingresar un nombre valido"; 
                $nameValidator.classList.remove("is-valid");
                $nameValidator.classList.add("is-invalid");
            break; 
            default: 
                $inputName.classList.remove("is-invalid");
                $inputName.classList.add("is-valid");
                $nameErrors.innerText = "";
            break;
        } 
    })

     $inputLastname.addEventListener("blur", () => { 
        switch (true) {
            case !$inputLastname.value.trim():
                $lastnameErrors.innerText = "El campo apellido es obligatorio";
                $inputLastname.classList.remove("is-valid");
                $inputLastname.classList.add("is-invalid");
                break; 
            case !regExAlpha.test($inputLastname.value):  
                $lastnameErrors.innerText = "Debe ingresar un apellido valido"; 
                $inputLastname.classList.remove("is-valid");
                $inputLastname.classList.add("is-invalid");
            break; 
            default: 
                $inputLastname.classList.remove("is-invalid");
                $inputLastname.classList.add("is-valid");
                $lastnameErrors.innerText = "";
            break;
    } 
     })

        
     

    $tel.addEventListener("blur", () => { 
        switch (true) {
            case !$tel.value.trim():
                $telErrors.innerText = "El campo Tel es obligatorio";
                $tel.classList.remove("is-valid");
                $tel.classList.add("is-invalid");
                break; 
            case !regExTel.test($tel.value):  
                $telErrors.innerText = "Debe ingresar un telefono valido"; 
                $tel.classList.remove("is-valid");
                $tel.classList.add("is-invalid");
            break; 
            default: 
                $tel.classList.remove("is-invalid");
                $tel.classList.add("is-valid");
                $telErrors.innerText = "";
            break;
    } 
     }) 
     /* $fecha.addEventListener("blur", () => { 
        switch (true) {
            case !$fecha.value.trim():
                $fechaErrors.innerText = "Debe ingresar su fecha de nacimiento";
                $fecha.classList.add("is-invalid");
                break; 
            case moment($fecha.value) > moment():  
                $fechaErrors.innerText = "Fecha inválida"; 
                $fecha.classList.add("is-invalid");
            break; 
            case moment().diff(moment($fecha.value), 'years') < 18:                     
            $fechaErrors.innerText = 'Debes ser mayor de edad';
            $fecha.classList.add('is-invalid')
            break;
            default: 
                $fecha.classList.remove("is-invalid");
                $fecha.classList.add("is-valid");
                $fechaErrors.innerText = "";
            break;
    } 
    
     }) */

     /* $genero.addEventListener("blur", () => { 
        if(!$genero.value.trim()){ 
        $generoErrors.innerHTML = 'Campo requerido';
        $genero.classList.add('is-invalid')
        }else {   
        $genero.classList.remove('is-invalid'); 
        $genero.classList.add('is-valid'); 
        $generoErrors.innerHTML = ''          
    }  
    
     }) */
 
     $terms.addEventListener('click',() => {
     $terms.value = 'on'
     $terms.classList.toggle('is-valid');
     $terms.classList.remove('is-invalid');
     $termsErrors.innerHTML = ""      
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

        if(!$terms.checked){
            $terms.classList.add('is-invalid');
            $termsErrors.innerHTML = "Debes aceptar las bases y condiciones"
        } 

        let elementosConErrores = document.querySelectorAll(".is-invalid");
        let errores = elementosConErrores.length > 0;

        if(errores) {
            submitErrors.innerText = "Hay errores en el formulario"
        } else {
            $form.submit()
        }      
    }) 

    /* $file.addEventListener('change', () => {
            let filePath = $file.value, //Capturo el valor del input
                allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //Extensiones permitidas
            if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica.Devuelve el resultado como array, o null.
                $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
                $file.value = '';
                $imgPreview.innerHTML = ''; 
                return false;
                }else{// Image preview 
                console.log($file.files);
            if($file.files && $file.files[0]){
            let reader = new FileReader();
                reader.onload = function(e){
                $imgPreview.innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL($file.files[0]);
                $fileErrors.innerHTML = '';
                $file.classList.remove('is-invalid')
            }
        } 
    }) */ 


}) 