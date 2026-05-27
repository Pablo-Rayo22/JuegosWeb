/// @author: Pablo Jimenez Garcia
/// asignatura: Juegos para la Web

import EscenaArboles from "../Escenas/EscenaArboles.js";
import EscenaColinas from "../Escenas/EscenaColinas.js";
import EscenaGameOver from "../Escenas/EscenaGameOver.js";
import EscenaVictoria from "../Escenas/EscenaVictoria.js";

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
        gamepad: true // ¡Mantenemos el soporte de mandos activo!
    },
    scene: [EscenaArboles, EscenaColinas, EscenaGameOver, EscenaVictoria], // ¡Incluimos las escenas en el array!
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: GRAVEDAD},
            debug: false,
        }
    }
}

let juego = new Phaser.Game(config);