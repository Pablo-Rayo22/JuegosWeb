import Recolectable from "./Recolectable.js"
// export default es para poder importar la clase en otros ficheros .js
export default class Moneda extends Recolectable {
    constructor (escena, x, y,  sprite, frameSprite) {
        super (escena, x, y, "spr_moneda_oro", "spr_moneda_oro_girando1");
        // Llamadas a metodos
        // Escalamos el orbe de vida y su hitbox
        this.fijarEscala(1);
        this.fijarHitbox(48, 48, 8, 8);

        // Animaciones
        this.crearAnimacionesMonedas();
        this.play("spr_moneda_oro_girando", false);
    }
    // Animaciones
    crearAnimacionesMonedas() {
        if (!this.escena.anims.exists("spr_moneda_oro_girando")) {
            // Animacion girando
            this.animacionGirando = {} //Creamos un nuevo objeto
            this.animacionGirando.key = "spr_moneda_oro_girando";
            this.animacionGirando.frames = this.escena.anims.generateFrameNames ("spr_moneda_oro", {
                prefix: "spr_moneda_oro_girando",
                start: 1,
                end: 2,
            });
            this.animacionGirando.frameRate = 1;
            this.animacionGirando.repeat = -1;
            this.escena.anims.create(this.animacionGirando);
        }
    }
}