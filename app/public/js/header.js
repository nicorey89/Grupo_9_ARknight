/* MENU MOBILE*/ 
const boton = document.querySelector("#dropdown");
const ventana = document.querySelector("#dropdown-content");

const itemsCategorias = document.querySelector("#itemsMenu");
const categoryMenu = document.querySelector("#categoryMenu");

/* MENU DESTOKS*/ 
const windowMenu = document.querySelector("#dropDownMenuDestok");
const windowSucurlas = document.querySelector("#dropDownMenuSucursales");

const ventanaSucursales = document.querySelector("#sucursalesMenu")

function pullDown(){
    ventana.classList.toggle("dropdown-block");
};

function pullDownCategories() {
    categoryMenu.classList.toggle("pullDownCartegories")
};

function pullDownmenu() {
    windowMenu.classList.toggle("pullDownMenu")
}


function pullDownSucursal() {
    windowSucurlas.classList.toggle("pullDownMenu")
}

function pullDownSucursales() {
    ventanaSucursales.classList.toggle("pullDownSucursal")
}



window.addEventListener("scroll", () => {
    if(window.scrollY >= 100){
       document.querySelector(".main-header").classList.add("header-opacity")
   }else {
       document.querySelector(".main-header").classList.remove("header-opacity")
   }
})


