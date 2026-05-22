import Recolectable from "./Recolectable.js"
// export default es para poder importar la clase en otros ficheros .js
export default class Joya extends Recolectable {
    constructor (escena, x, y) {
        super (escena, x, y, "joya");
        // Llamadas a metodos
        // Escalamos la joya y su hitbox
        this.fijarEscala(1);
        this.fijarHitbox(48, 40, 8, 12);
    }
}