// Modo oscuro
document.addEventListener('DOMContentLoaded', function() {
    //  botón para cambiar entre modo claro y oscuro
    const header = document.querySelector('header');
    const botonModo = document.createElement('button');
    botonModo.id = 'botonModo';
    botonModo.innerHTML = '🌙 Modo Oscuro';
    botonModo.classList.add('boton-modo');
    header.appendChild(botonModo);

    // Compruebo si hay una preferencia guardada
    const modoOscuro = localStorage.getItem('modoOscuro') === 'true';
    
    // Aplico el modo oscuro si está guardado
    if (modoOscuro) {
        document.body.classList.add('modo-oscuro');
        botonModo.innerHTML = '☀️ Modo Claro';
    }

    // Cambio entre modos
    botonModo.addEventListener('click', function() {
        document.body.classList.toggle('modo-oscuro');
        const esModoOscuro = document.body.classList.contains('modo-oscuro');
        localStorage.setItem('modoOscuro', esModoOscuro);
        
        if (esModoOscuro) {
            botonModo.innerHTML = '☀️ Modo Claro';
        } else {
            botonModo.innerHTML = '🌙 Modo Oscuro';
        }
    });

    // Animación para las secciones
    const secciones = document.querySelectorAll('section');
    secciones.forEach(seccion => {
        seccion.classList.add('animacion-entrada');
    });

    // Validación para el formulario de contacto
    const formularioContacto = document.querySelector('#contacto form');
    const mensajeError = document.createElement('div');
    mensajeError.id = 'mensajeError';
    mensajeError.style.color = 'red';
    mensajeError.style.marginTop = '10px';
    mensajeError.style.textAlign = 'center';
    formularioContacto.appendChild(mensajeError);

    formularioContacto.addEventListener('submit', function(evento) {
        evento.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        // Validacion campos
        if (nombre === '' || email === '' || mensaje === '') {
            mensajeError.textContent = 'Por favor, completa todos los campos';
            return;
        }
        
        // Validacion de email
        if (!validarEmail(email)) {
            mensajeError.textContent = 'Por favor, ingresa un email válido';
            return;
        }
        
        // simulo el envio de un formulario
        mensajeError.textContent = '';
        mensajeError.style.color = 'green';
        mensajeError.textContent = '¡Mensaje enviado correctamente!';
        formularioContacto.reset();
        
        // Oculto mensaje después de 3 segundos
        setTimeout(function() {
            mensajeError.textContent = '';
        }, 3000);
    });

    // Función para validar un email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Añado contador de caracteres al textarea
    const textarea = document.getElementById('mensaje');
    const contadorCaracteres = document.createElement('div');
    contadorCaracteres.id = 'contadorCaracteres';
    contadorCaracteres.style.textAlign = 'right';
    contadorCaracteres.style.fontSize = '0.8rem';
    contadorCaracteres.style.marginTop = '5px';
    textarea.parentNode.insertBefore(contadorCaracteres, textarea.nextSibling);
    
    function actualizarContador() {
        const caracteresRestantes = 200 - textarea.value.length;
        contadorCaracteres.textContent = `${caracteresRestantes} caracteres restantes`;
        
        if (caracteresRestantes < 50) {
            contadorCaracteres.style.color = 'orange';
        } else {
            contadorCaracteres.style.color = '';
        }
        
        if (caracteresRestantes < 0) {
            contadorCaracteres.style.color = 'red';
        }
    }
    
    textarea.addEventListener('input', actualizarContador);
    actualizarContador();

    // Navegación suave al hacer clic en los enlaces del menú
    const enlaces = document.querySelectorAll('nav a');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            const seccionId = this.getAttribute('href');
            const seccion = document.querySelector(seccionId);
            
            window.scrollTo({
                top: seccion.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });

    // Resalto habilidades con animación
    const habilidadesTxt = document.querySelector('#sobre-mi p');
    const habilidadesArray = habilidadesTxt.textContent.trim().split('\n').map(h => h.trim()).filter(h => h !== '');
    
    let htmlHabilidades = '<ul class="lista-habilidades">';
    habilidadesArray.forEach(habilidad => {
        htmlHabilidades += `<li class="habilidad">${habilidad}</li>`;
    });
    htmlHabilidades += '</ul>';
    
    habilidadesTxt.innerHTML = htmlHabilidades;
});