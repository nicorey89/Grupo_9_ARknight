const boton = document.querySelector("#dropdown");
const ventana = document.querySelector("#dropdown-content");

function pullDown(){
    ventana.classList.toggle("dropdown-block");
}

function pullDownCategories() {

}





window.addEventListener("scroll", () => {
    if(window.scrollY >= 100){
       document.querySelector(".main-header").classList.add("header-opacity")
   }else {
       document.querySelector(".main-header").classList.remove("header-opacity")
   }
})


