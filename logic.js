// Variables para el juego
let nivel = 1;
let secuenciaColores = [];
let entradaJugador = [];
const botones = document.querySelectorAll(".simon-button");
const botonInicio = document.querySelector(".simon-startbutton");

// Cargar sonidos para cada color
const sonidos = {
    green: new Audio('sounds/green.mp3'),
    red: new Audio('sounds/red.mp3'),
    yellow: new Audio('sounds/yellow.mp3'),
    blue: new Audio('sounds/blue.mp3')
};

// Función para inicializar el juego
function iniciarJuego() {
    nivel = 1;
    secuenciaColores = []; // Limpiar la secuencia para comenzar desde cero
    botonInicio.textContent = "RESET"; // Cambiar el texto del botón a "RESET"
    siguienteNivel();
}

// Función para reiniciar el juego y volver a mostrar "START"
function reiniciarJuego() {
    nivel = 1;
    secuenciaColores = [];
    entradaJugador = [];
    botonInicio.textContent = "START"; // Cambiar el texto del botón de vuelta a "START"
    document.querySelector(".simon-levelbutton").textContent = `0/20`; // Resetear el nivel en la UI a 0
}

// Función para avanzar al siguiente nivel
function siguienteNivel() {
    if (nivel <= 20) { // Limitar a los primeros 20 niveles
        agregarColorAleatorio();
        mostrarSecuencia();
        document.querySelector(".simon-levelbutton").textContent = `${nivel}/20`;
    } else {
        alert("¡Felicidades, has completado el juego!");
        reiniciarJuego(); // Reiniciar el juego al completar todos los niveles
    }
}

// Función para agregar un color aleatorio a la secuencia
function agregarColorAleatorio() {
    const colores = ["green", "red", "yellow", "blue"];
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    secuenciaColores.push(colorAleatorio); // Añadir un color aleatorio a la secuencia
}

// Función para mostrar la secuencia al jugador con un intervalo
function mostrarSecuencia() {
    entradaJugador = [];
    let delay = 0;
    secuenciaColores.forEach((color, index) => {
        setTimeout(() => {
            encenderColor(color);
        }, delay);
        delay += 1000; // Tiempo entre cada color
    });
}

// Función para encender, apagar y reproducir sonido de un color
function encenderColor(color) {
    const boton = document.querySelector(`.${color}`);
    boton.classList.add("activo"); // Simula la clase activa
    reproducirSonido(color); // Reproducir el sonido correspondiente al color
    
    setTimeout(() => {
        boton.classList.remove("activo"); // Remueve la clase activa después de 500 ms
    }, 500); 
}

// Función para reproducir sonido
function reproducirSonido(color) {
    const sonido = sonidos[color];
    if (sonido) {
        sonido.currentTime = 0; // Reiniciar el sonido si ya estaba en reproducción
        sonido.play();
    }
}

// Función para capturar el color seleccionado por el jugador
function ingresarColor(color) {
    entradaJugador.push(color);
    reproducirSonido(color); // Reproducir el sonido cuando el jugador presiona el botón
    
    // Verificar si el último botón presionado coincide con la secuencia correcta
    const index = entradaJugador.length - 1;
    if (entradaJugador[index] !== secuenciaColores[index]) {
        alert("Incorrecto. Intenta de nuevo desde el nivel 1.");
        reiniciarJuego();
        return; // Salir de la función si hay un error
    }
    
    // Verificar si el jugador ha completado la secuencia
    if (entradaJugador.length === secuenciaColores.length) {
        nivel++;
        // Esperar 1 segundo antes de mostrar la siguiente secuencia
        setTimeout(siguienteNivel, 1000);
    }
}


// Función para verificar la secuencia ingresada por el jugador
function verificarSecuencia() {
    const esCorrecto = entradaJugador.every((color, index) => color === secuenciaColores[index]);
    
    if (esCorrecto) {
        nivel++;
        alert("¡Correcto! Pasas al nivel " + nivel);
        siguienteNivel();
    } else {
        alert("Incorrecto. Intenta de nuevo desde el nivel 1.");
        reiniciarJuego();
    }
}

// Asignar eventos a los botones de color
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const color = boton.classList[1]; // Obtener el color desde la clase
        ingresarColor(color);
    });
});

// Asignar evento al botón de inicio o reset
botonInicio.addEventListener("click", () => {
    if (botonInicio.textContent === "START") {
        iniciarJuego();
    } else {
        reiniciarJuego();
    }
});


