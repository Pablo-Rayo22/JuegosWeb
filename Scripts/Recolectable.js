import Entidad from "./Entidad.js";

export default class Recolectable extends Entidad {
    constructor (escena, x, y, sprite) {
        super (escena, x, y, sprite);
        // Asignamos gravedad
        this.body.allowGravity = false;
        // Para evitar que se muevan
        this.body.setImmovable(true);
        this.body.moves = false;
    }
    
}