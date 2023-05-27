const boton = document.querySelector("#dropdown");
const ventana = document.querySelector("#dropdown-content");

const itemsCategorias = document.querySelector("#itemsMenu");
const categoryMenu = document.querySelector("#categoryMenu");

function pullDown(){
    ventana.classList.toggle("dropdown-block");
};

function pullDownCategories() {
    categoryMenu.classList.toggle("pullDownCartegories")
};

// itemsCategorias.addEventListener("click", () => {
//     console.log(itemsCategorias);

// })




window.addEventListener("scroll", () => {
    if(window.scrollY >= 100){
       document.querySelector(".main-header").classList.add("header-opacity")
   }else {
       document.querySelector(".main-header").classList.remove("header-opacity")
   }
})


