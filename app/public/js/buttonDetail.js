const bDetalles = document.querySelector('.b-datalle');
const dropDescripcion = document.querySelector('.Descripcion-detalle');

bDetalles.addEventListener('click', () => {
    dropDescripcion.classList.toggle('show');
});
