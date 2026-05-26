import Recolectable from "./Recolectable.js";
// export default es para poder importar la clase en otros ficheros .js
export default class OrbeVida extends Recolectable {
    constructor (escena, x, y,) {
        super(escena, x, y, "orbeVida");

        // Llamadas a metodos
        // Fijamos su escala y su hitbox
        this.fijarEscala(1);
        this.fijarHitbox(56, 56, 4, 4);
    }
}