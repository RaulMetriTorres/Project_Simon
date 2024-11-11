// Variables para el juego
let nivel = 1;
let secuenciaColores = [];
let entradaJugador = [];
const botones = document.querySelectorAll(".simon-button");

// Función para inicializar el juego
function iniciarJuego() {
    nivel = 1;
    secuenciaColores = []; // Limpiar la secuencia para comenzar desde cero
    siguienteNivel();
}

// Función para avanzar al siguiente nivel
function siguienteNivel() {
    if (nivel <= 20) { // Limitar a los primeros 5 niveles
        agregarColorAleatorio();
        mostrarSecuencia();
    } else {
        alert("¡Felicidades, has completado el juego!");
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

// Función para encender y apagar un color
function encenderColor(color) {
    const boton = document.querySelector(`.${color}`);
    boton.classList.add("activo"); // Simula la clase activa
    
    setTimeout(() => {
        boton.classList.remove("activo"); // Remueve la clase activa después de 500 ms
    }, 500); 
}

// Función para capturar el color seleccionado por el jugador
function ingresarColor(color) {
    entradaJugador.push(color);
    
    // Verificar si el jugador ha completado la secuencia
    if (entradaJugador.length === secuenciaColores.length) {
        verificarSecuencia();
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
        iniciarJuego();
    }
}

// Asignar eventos a los botones de color
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const color = boton.classList[1]; // Obtener el color desde la clase
        ingresarColor(color);
    });
});

// Asignar evento al botón de inicio
document.querySelector(".simon-startbutton").addEventListener("click", iniciarJuego);
