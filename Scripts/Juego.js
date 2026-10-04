/// @author: Pablo Jimenez Garcia

/// <reference path="C:/Users/pablo/AppData/Roaming/npm/node_modules/phaser/types/phaser.d.ts" />

import MenuInicial from "../Escenas/MenuInicial.js";
import EscenaArboles from "../Escenas/EscenaArboles.js";
import EscenaColinas from "../Escenas/EscenaColinas.js";
import EscenaGameOver from "../Escenas/EscenaGameOver.js";
import EscenaVictoria from "../Escenas/EscenaVictoria.js";
import EscenaControles from "../Escenas/EscenaControles.js";
import EscenaBase from "../Escenas/EscenaBase.js";

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
    scene: [MenuInicial, EscenaBase, EscenaArboles, EscenaColinas, EscenaGameOver, EscenaVictoria, EscenaControles], // ¡Incluimos las escenas en el array!
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: GRAVEDAD},
            debug: false,
        }
    }
}

let juego = new Phaser.Game(config);