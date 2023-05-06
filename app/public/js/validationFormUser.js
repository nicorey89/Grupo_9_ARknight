  let qs = (elemento) => {
    return document.querySelector(elemento);
} 

window.addEventListener("load", () => {
  let $nameValidator = qs("#nombre"),
      $nameValidatorErrors = qs("#nombreErrors"),
      $inputLastname = qs("#apellido"),
      $lastnameErrors = qs("#apellidoErrors"),
      $form = qs("#submit"),
      $dni = qs("#dni"),
      $dniErrors = qs("#dniErrors"),
      $email = qs("#emailFormValidator"),
      $emailErrors = qs("#emailFormValidatorErrors"),
      $password = qs("#password"),
      $passwordErrors = qs("#passwordErrors"),
      $pass2 = qs("#pass2"),
      $pass2Errors = qs("#pass2Errors"),
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
      regExDNI = /^[0-9]{7,8}$/,
      regExEmail_form_validator = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
      regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;


      $nameValidator.addEventListener("blur", () => { 
        switch (true) {
            case !$nameValidator.value.trim():
                $nameValidatorErrors.innerText = "El campo nombre es obligatorio";
                $nameValidator.classList.remove("is-valid");
                $nameValidator.classList.add("is-invalid");
                break; 
            case !regExDNI.test($nameValidator.value):  
                $nameValidatorErrors.innerText = "Debe ingresar un nombre valido"; 
                $nameValidator.classList.remove("is-valid");
                $nameValidator.classList.add("is-invalid");
            break; 
            default: 
                $nameValidator.classList.remove("is-invalid");
                $nameValidator.classList.add("is-valid");
                $nameValidatorErrors.innerText = "";
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
            case !regExDNI.test($inputLastname.value):  
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

        
     

     /* $dni.addEventListener("blur", () => { 
        switch (true) {
            case !$dni.value.trim():
                $dniErrors.innerText = "El campo DNI es obligatorio";
                $dni.classList.add("is-invalid");
                break; 
            case !regExDNI.test($dni.value):  
                $dniErrors.innerText = "Debe ingresar un dni valido"; 
                $dni.classList.add("is-invalid");
            break; 
            default: 
                $dni.classList.remove("is-invalid");
                $dni.classList.add("is-valid");
                $dniErrors.innerText = "";
            break;
    } 
     }) */

   /*   $email.addEventListener("blur", () => { 
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerText = "El campo email es obligatorio";
                $email.classList.add("is-invalid");
                break; 
            case !regExEmail.test($email.value):  
                $email.innerText = "Debe ingresar un email valido"; 
                $email.classList.add("is-invalid");
            break; 
            default: 
                $email.classList.remove("is-invalid");
                $email.classList.add("is-valid");
                $email.innerText = "";
            break;
    } 
    
     })

     $password.addEventListener("blur", () => { 
        switch (true) {
            case !$password.value.trim():
                $passwordErrors.innerText = "El campo contraseña es obligatorio";
                $password.classList.add("is-invalid");
                break; 
            case !regExPassword.test($password.value):  
                $passwordErrors.innerText = "La contraseña debe tener como mínimo 6 caracteresMio"; 
                $password.classList.add("is-invalid");
            break; 
            default: 
                $password.classList.remove("is-invalid");
                $password.classList.add("is-valid");
                $passwordErrors.innerText = "";
            break;
    } 
    
     })
 */
     /* $pass2.addEventListener("blur", () => { 
        switch (true) {
            case !$pass2.value.trim():
                $passErrors.innerText = "'Debes reingresar la la contraseña";
                $pass2.classList.add("is-invalid");
                break; 
            case $pass2.value != $pass.value:  
                $pass2Errors.innerText = "'Las contraseñas no coinciden"; 
                $pass2.classList.add("is-invalid");
            break; 
            default: 
                $pass2.classList.remove("is-invalid");
                $pass2.classList.add("is-valid");
                $pass2Errors.innerText = "";
            break;
    } 
    
     }) */

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
/* 
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

    $file.addEventListener('change', () => {
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
    }) 

*/ 
}) 