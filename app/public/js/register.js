let qs = (elemento) => {
    return document.querySelector(elemento);
};

window.addEventListener("load", () => {
    let   $inputName = qs("#name"),
          $nameErrors = qs("#nameErrors"),
          $inputLastname = qs("#apellido"),
          $lastnameErrors = qs("#apellidoErrors"),
          $email = qs("#email"),
          $emailErrors = qs("#emailErrors"),
          $pass = qs("#password"),
          $passErrors = qs("#passwordErrors"),
          $pass2 = qs("#password2"),
          $pass2Errors = qs("#password2Errors"),
          $terms = qs("#recordar"),
          $termsErrors = qs("#recordarErrors"),
          $form = qs("#form");
    (regExName = /^[a-zA-Z\sñáéíóúü ]{2,30}$/),
          (regExLastName = /^[a-zA-Z\sñáéíóúü ]{2,20}$/),
          (regExDNI = /^[0-9]{7,8}$/),
          (regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i),
          (regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,12}$/);

    $inputName.addEventListener("blur", () => {
          switch (true) {
                case !$inputName.value.trim():
                      $nameErrors.innerText = "El campo nombre es obligatorio";
                      $inputName.classList.remove("is-valid");
                      $inputName.classList.add("is-invalid");
                      break;
                case !regExName.test($inputName.value):
                      $nameErrors.innerText = "Nombre invalido";
                      $inputName.classList.remove("is-valid");
                      $inputName.classList.add("is-invalid");
                      break;
                default:
                      $inputName.classList.remove("is-invalid");
                      $inputName.classList.add("is-valid");
                      $nameErrors.innerText = "";
                      break;
          }
    });
    $inputLastname.addEventListener("blur", () => {
          switch (true) {
                case !$inputLastname.value.trim():
                      $lastnameErrors.innerText = "El campo apellido es obligatorio";
                      $inputLastname.classList.remove("is-valid");
                      $inputLastname.classList.add("is-invalid");
                      break;
                case !regExLastName.test($inputLastname.value):
                      $lastnameErrors.innerText = "Debes ingresar un apellido válido";
                      $inputLastname.classList.remove("is-valid");
                      $inputLastname.classList.add("is-invalid");
                      break;
                default:
                      $inputLastname.classList.remove("is-invalid");
                      $inputLastname.classList.add("is-valid");
                      $lastnameErrors.innerText = "";
                      break;
          }
    });
    $email.addEventListener("blur", () => {
          switch (true) {
                case !$email.value.trim():
                      $emailErrors.innerText = "El campo email es obligatorio";
                      $email.classList.remove("is-valid");
                      $email.classList.add("is-invalid");
                      break;
                case !regExEmail.test($email.value):
                      $emailErrors.innerText = "Debe ingresar un email válido";
                      $email.classList.remove("is-valid");
                      $email.classList.add("is-invalid");
                      break;
                default:
                      $email.classList.remove("is-invalid");
                      $email.classList.add("is-valid");
                      $emailErrors.innerText = "";
                      break;
          }
    });
    $pass.addEventListener("blur", () => {
          switch (true) {
                case !$pass.value.trim():
                      $passErrors.innerText = "El campo contraseña es obligatorio";
                      $pass.classList.remove("is-valid");
                      $pass.classList.add("is-invalid");
                      break;
                case !regExPass.test($pass.value):
                      $passErrors.innerText = "El campo contraseña debe contener entre 8 o 12 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial";
                      $pass.classList.remove("is-valid");
                      $pass.classList.add("is-invalid");
                      break;
                default:
                      $pass.classList.remove("is-invalid");
                      $pass.classList.add("is-valid");
                      $passErrors.innerText = "";
                      break;
          }
    });

    $pass2.addEventListener("blur", () => {
          switch (true) {
                case !$pass2.value.trim():
                      $pass2Errors.innerText = "El campo contraseña no es valido";
                      $pass2.classList.remove("is-valid");
                      $pass2.classList.add("is-invalid");
                      break;
                case $pass2.value != $pass.value:
                      $pass2Errors.innerText = "Los campos contraseñas no coinciden";
                      $pass2.classList.remove("is-valid");
                      $pass2.classList.add("is-invalid");
                      break;
                default:
                      $pass2.classList.remove("is-invalid");
                      $pass2.classList.add("is-valid");
                      $pass2Errors.innerText = "";
                      break;
          }
    });
    $terms.addEventListener("click", () => {
          $terms.value = "on";
          $terms.classList.toggle("is-valid");
          $terms.classList.remove("is-invalid");
          $termsErrors.innerHTML = "";
    });
    $form.addEventListener("submit", (event) => {
          event.preventDefault();
          const FORM_ELEMENTS = event.target.elements;

          for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
                const element = FORM_ELEMENTS[index];
                if (element.value === "" && element.type !== "file") {
                      //element.classList.add("is-invalid");
                      element.dispatchEvent(new Event("blur"));
                }
          }

          if (!$terms.checked) {
                $terms.classList.add("is-invalid");
                $termsErrors.innerHTML = "Debes aceptar las bases y condiciones";
          }

          let elementosConErrores = document.querySelectorAll(".is-invalid");
          let errores = elementosConErrores.length > 0;

          if (errores) {
                submitErrors.innerText = "Hay errores en el formulario";
          } else {
                $form.submit();
          }
    });
});
