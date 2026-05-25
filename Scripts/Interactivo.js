import Entidad from "./Entidad.js";
// export default es para poder importar la clase en otros ficheros .js
export default class Interactivo extends Entidad {
    constructor (escena, x, y, jugador, sprite, frameSprite,) {
        super (escena, x, y, sprite, frameSprite);

        // Variables
        this.activo = false;
        // Guardamos la referencia al jugador
        this.jugador = jugador;

        this.body.allowGravity = false;
        // Para evitar que se muevan
        this.body.setImmovable(true);
        this.body.moves = false;
    }
    // Metodo para saber si el jugador esta cerca
    estaCerca(distanciaMaxima) {
        let distancia = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.jugador.x,
        this.jugador.y
        ); // Distancia entre el objeto interactivo y el jugador
        return distancia < distanciaMaxima;
    }
}