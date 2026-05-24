/// @author: Pablo Jimenez Garcia
/// asignatura: Juegos para la Web

import EscenaArboles from "./EscenaArboles.js";
// Constantes
const ANCHO = 3840;
const ALTO = 640;
const GRAVEDAD = 800;

let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE, // Escala la ventana del navegador para que se ajuste a la pantalla
        autoCenter: Phaser.Scale.CENTER_BOTH, // Centra automáticamente la ventana del navegador
        width: ANCHO,
        height: ALTO,
    },
    input: {
        gamepad: true // <--- ¡Añadimos esto para habilitar el soporte de mandos!
    },
    scene: [EscenaArboles],
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: GRAVEDAD},
            debug: false,
        }
    }
}

let juego = new Phaser.Game(config);