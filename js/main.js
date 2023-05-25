document.addEventListener('DOMContentLoaded', function() {
    var contenidoDiv = document.getElementById('contenido');
  
    // Insertar HTML de la página de inicio
    var inicioHTML = `
      <div class="home">
        <h1 class="titulo">Men Style</h1>
        <p class="descripcion">¡Bienvenidos a Men Style! Tu tienda de moda masculina.</p>
        <button class="boton-primario">Empezar</button>
      </div>
    `;
  
    contenidoDiv.innerHTML = inicioHTML;
  
    // Insertar HTML de la página principal
    var principalHTML = `
      <div class="barra-superior">
        <div class="menu-desplegable">
          <button id="menuButton" class="icono">
            &#9776;
          </button>
          <span class="titulo">Men Style</span>
          <div class="menu">
            <a href="#">MEN</a>
            <a href="#">ACCESORIES</a>
            <a href="#">BACKPACK</a>
            <a href="#">CONTACT</a>
          </div>
        </div>
      </div>
      <div class="principal">
        <div class="slides">
          <button class="boton-slider" id="anteriorButton">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <img src="https://source.unsplash.com/400x600/?fashion" alt="Prenda de moda">
          <button class="boton-slider" id="siguienteButton">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <div class="productos"></div>
      </div>
      <div class="footer">
        <p>Derechos de autor &copy; 2023 Men Style. Todos los derechos reservados.</p>
      </div>
    `;
  
    function mostrarPaginaPrincipal() {
      contenidoDiv.innerHTML = principalHTML;
  
      // Manejar el evento clic del botón del menú
      var menuButton = document.getElementById('menuButton');
      var menu = document.querySelector('.menu');
  
      menuButton.addEventListener('click', function() {
        menu.classList.toggle('mostrar');
        document.body.classList.toggle('no-scroll'); // Agregar o eliminar la clase 'no-scroll' del <body>
      });
  
      // Manejar el evento clic del botón anterior del slider
      var anteriorButton = document.getElementById('anteriorButton');
      var siguienteButton = document.getElementById('siguienteButton');
      var sliderImagen = document.querySelector('.slides img');
      var imagenes = [
        'https://source.unsplash.com/400x600/?fashion',
        'https://source.unsplash.com/400x600/?clothing',
        'https://source.unsplash.com/400x600/?men',
      ];
      var indiceImagen = 0;
  
      anteriorButton.addEventListener('click', function() {
        indiceImagen--;
        if (indiceImagen < 0) {
          indiceImagen = imagenes.length - 1;
        }
        sliderImagen.src = imagenes[indiceImagen];
      });
  
      siguienteButton.addEventListener('click', function() {
        indiceImagen++;
        if (indiceImagen >= imagenes.length) {
          indiceImagen = 0;
        }
        sliderImagen.src = imagenes[indiceImagen];
      });
  
      // Insertar HTML de los productos
      var productosDiv = document.querySelector('.productos');
      var productosHTML = '';
  
      for (var i = 0; i < 9; i++) {
        productosHTML += `
          <div class="modulo">
            <img src="https://source.unsplash.com/400x400/?clothing,men" alt="Producto">
          </div>
        `;
      }
  
      productosDiv.innerHTML = productosHTML;
    }
  
    // Manejar el evento clic del botón de inicio
    var botonEmpezar = document.querySelector('.boton-primario');
    botonEmpezar.addEventListener('click', function() {
      mostrarPaginaPrincipal();
    });
  
   
  });