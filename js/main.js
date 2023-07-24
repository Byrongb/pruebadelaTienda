document.addEventListener('DOMContentLoaded', function() {
  var contenidoDiv = document.getElementById('contenido');

  var inicioHTML = `
    <div class="home">
      <h1 class="titulo">Men Style</h1>
      <p class="descripcion">¡Bienvenidos a Men Style! Tu tienda de moda masculina.</p>
      <button class="boton-primario">Empezar</button>
    </div>
  `;

  contenidoDiv.innerHTML = inicioHTML;

  var principalHTML = ` 
  <div class="barra-superior">
    <div class="menu-desplegable">
      <button id="menuButton" class="icono">
        &#9776;
      </button>
      <h1 class="titulo-centrado">Men Style</h1>
      <div class="buscador">
        <input type="text" placeholder="Buscar productos" id="buscadorInput">
        <div id="carritoDiv">
          <button id="carritoButton">&#128722;</button>
          <div id="carritoCantidad" class="cantidad-carrito">0</div>
        </div>
      </div>
      <div class="menu">
        <a href="#" id="homeLink">HOME</a>
        <a href="#" id="menLink">TOP</a>
        <a href="#" id="accesoriosLink">LOWE</a>
        <a href="#" id="backpackLink">ACCESORIES</a>
      </div>
    </div>
  </div>
<div class="principal">
  <div class="slides" id="slidesDiv">
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

  var carrito = []; 
  var currentCategory = "Inicio";

  function mostrarContenido(categoria, query) {
    var productosDiv = document.querySelector('.productos');
    var productosHTML = '';
    var productosCategoria;
    var slidesDiv = document.getElementById('slidesDiv');
    currentCategory = categoria; 
    

    switch (categoria) {
      case "Inicio": 
        productosCategoria = sueteres; 
        slidesDiv.style.display = 'block';
        break;
      case "Top": 
        productosCategoria = [...camisas, ...sueteres];
        slidesDiv.style.display = 'none';
        break;
      case "Lowe":
        productosCategoria = pantalones;
        slidesDiv.style.display = 'none';
        break;
      case "Accesories":
        productosCategoria = accesorios;
        slidesDiv.style.display = 'none';
        break;
      default:
        productosCategoria = [];
    }

    if (query) {
      productosCategoria = productosCategoria.filter(producto =>
        producto.Descripcion.toLowerCase().includes(query.toLowerCase()));
    }

    for (var i = 0; i < productosCategoria.length; i++) {
      productosHTML += `
        <div class="modulo">
          <img src="${productosCategoria[i].URL}">
          <p class="descripcion">${productosCategoria[i].Descripcion}</p>
          <p class="precio">${productosCategoria[i].Precio}</p>
          <p class="talla">Talla: ${productosCategoria[i].Talla}</p>
          <a href="#" class="boton" data-producto-id="${i}">Agregar al carrito</a>
        </div>
      `;
    }

    productosDiv.innerHTML = productosHTML;

    var botonesAgregarCarrito = document.querySelectorAll('.boton');
    botonesAgregarCarrito.forEach(boton => {
      boton.addEventListener('click', function(e) {
        e.preventDefault();
        var productoId = this.dataset.productoId;
        carrito.push(productosCategoria[productoId]);
        actualizarContadorCarrito();
      });
    });
  }

  function actualizarContadorCarrito() {
    var carritoCantidadDiv = document.getElementById('carritoCantidad');
    carritoCantidadDiv.textContent = carrito.length;
  }

  function mostrarPaginaPrincipal() {
    contenidoDiv.innerHTML = principalHTML;
    mostrarContenido("Inicio");

    var menuButton = document.getElementById('menuButton');
    var menu = document.querySelector('.menu');
    menuButton.addEventListener('click', function() {
      menu.classList.toggle('mostrar');
    });

    

    var enlacesMenu = ['homeLink', 'menLink', 'accesoriosLink', 'backpackLink'];
    var contenidos = ['Inicio', 'Top', 'Lowe', 'Accesories'];
    
    enlacesMenu.forEach((enlace, index) => {
      var linkElement = document.getElementById(enlace);
      linkElement.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Mostramos el contenido correspondiente
        mostrarContenido(contenidos[index]);
        
        // Y aquí es donde ocultamos el menú desplegable
        menu.classList.remove('mostrar');
      });

    });
    

    var homeLink = document.getElementById('homeLink');
    homeLink.addEventListener('click', function(e) {
      e.preventDefault();
      mostrarContenido("Inicio");
      document.getElementById('buscadorInput').value = '';
    });

    var menLink = document.getElementById('menLink');
    menLink.addEventListener('click', function(e) {
      e.preventDefault();
      mostrarContenido("Top");
      document.getElementById('buscadorInput').value = '';
    });

    
    var accesoriosLink = document.getElementById('accesoriosLink');
    accesoriosLink.addEventListener('click', function(e) {
      e.preventDefault();
      mostrarContenido("Lowe");
      document.getElementById('buscadorInput').value = '';
    });

    var backpackLink = document.getElementById('backpackLink');
    backpackLink.addEventListener('click', function(e) {
      e.preventDefault();
      mostrarContenido("Accesories");
      document.getElementById('buscadorInput').value = '';
    });

    var buscadorInput = document.getElementById('buscadorInput');
    buscadorInput.addEventListener('input', function(e) {
      e.preventDefault();
      // Usamos 'currentCategory' en lugar de "Inicio"
      mostrarContenido(currentCategory, this.value);
      
    });
  

    var carritoButton = document.getElementById('carritoButton');
    carritoButton.addEventListener('click', function(e) {
      e.preventDefault();
      mostrarCarrito();
    });


  }
  function mostrarCarrito() {
    var slidesDiv = document.getElementById('slidesDiv');
    slidesDiv.style.display = 'none';
    var productosDiv = document.querySelector('.productos');
    var productosHTML = '';
    var total = 0;
  
    if (carrito.length === 0) {
      productosHTML = `
          <div class="contenedor-carrito-vacio">
          <div class="carrito-vacio">
            <p>El carrito está vacío</p>
            <button id="comprarProductosButton">Comprar productos</button>
          </div>
        </div>
      `;
    } else {
      var preciosHTML = '';
      for (var i = 0; i < carrito.length; i++) {
        // quitamos el "Q." antes de convertir a número
        var precioSinQuetzal = carrito[i].Precio.replace("Q.", "");
        // Convertimos el precio a un número flotante
        var precioNumerico = parseFloat(precioSinQuetzal);
        
        productosHTML += `
          <div class="modulo">
            <img src="${carrito[i].URL}">
            <p class="descripcion">${carrito[i].Descripcion}</p>
            <p class="precio">${carrito[i].Precio}</p>
            <p class="talla">Talla: ${carrito[i].Talla}</p>
            <a href="#" class="boton" data-producto-id="${i}">Eliminar del carrito</a>
          </div>
        `;
  
        total += precioNumerico;
        preciosHTML += `<p class="precio-individual">Producto ${i + 1}: ${carrito[i].Precio}</p>`;
      }
  
      productosHTML += `
        <div class="resumen-carrito">
          ${preciosHTML}
          <p class="precio-total">Total: Q.${total.toFixed(2)}</p>
          <button class="boton-primario" id="continuarCompra">Continuar con la compra</button>
        </div>
      `;
    }
  
    productosDiv.innerHTML = productosHTML;
  
    var comprarProductosButton = document.getElementById('comprarProductosButton');
    if (comprarProductosButton) {
      comprarProductosButton.addEventListener('click', function() {
        mostrarContenido("Top");
      });
    }
  
    var botonesEliminarCarrito = document.querySelectorAll('.boton');
    botonesEliminarCarrito.forEach(boton => {
      boton.addEventListener('click', function(e) {
        e.preventDefault();
        var productoId = this.dataset.productoId;
        carrito.splice(productoId, 1);
        mostrarCarrito();
      });
    });
  
    // Aquí asignamos el evento click al botón continuarCompra
    var continuarCompra = document.getElementById('continuarCompra');
    if (continuarCompra) {
      continuarCompra.addEventListener('click', function(e) {
        e.preventDefault();
        mostrarCheckout();
      });
    }
  }

  function mostrarCheckout() {
    var checkoutHTML = `
    <div class="checkout" style="display: flex; flex-direction: column; align-items: center;">
      <h1>Datos de la compra</h1>
      <form id="checkoutForm" style="margin: auto;">
        <div>
          <label for="correo">Correo electrónico:</label>
          <input type="email" id="correo" name="correo" required />
        </div>
        <div>
          <label for="nombre">Nombre y Apellido:</label>
          <input type="text" id="nombre" name="nombre" required />
        </div>
        <div>
          <label for="direccion">Dirección de entrega:</label>
          <input type="text" id="direccion" name="direccion" required />
        </div>
        <div>
          <label for="numero">Número de teléfono:</label>
          <input type="tel" id="numero" name="numero" required />
        </div>
        <button class="boton-primario" id="enviarFormulario">Enviar</button>
        <button type="button" class="boton-secundario" id="cancelarCompra">Cancelar Compra</button>
      </form>
    </div>
  `;

  contenidoDiv.innerHTML = checkoutHTML;

  var checkoutForm = document.getElementById('checkoutForm');
  checkoutForm.addEventListener('submit', function(event) {
    event.preventDefault();
    // Aquí puedes hacer alguna validación adicional si es necesario
    mostrarGraciasPorCompra();
  });

  var cancelarCompra = document.getElementById('cancelarCompra');
  cancelarCompra.addEventListener('click', function(e) {
    e.preventDefault();
    mostrarPaginaPrincipal();
  });
}

function mostrarGraciasPorCompra() {
  var graciasHTML = `
    <div class="checkout" style="display: flex; flex-direction: column; align-items: center;">        <h1>Gracias por tu compra</h1>
      <img id="carritoAnimado" src="https://cdn.dribbble.com/users/605899/screenshots/2110095/media/c27a0b6582970256a6071bdef4f44d80.gif" />
      <p>Te hemos enviado un correo de confirmación.</p>
      <button class="boton-primario" id="volverInicio">Volver a inicio</button>
    </div>
  `;

  contenidoDiv.innerHTML = graciasHTML;

  var volverInicio = document.getElementById('volverInicio');
  volverInicio.addEventListener('click', function() {
    location.reload();  // Esto recarga la página para reiniciar la aplicación.
  });
}

var inicioButton = document.querySelector('.boton-primario');
  inicioButton.addEventListener('click', mostrarPaginaPrincipal);
});