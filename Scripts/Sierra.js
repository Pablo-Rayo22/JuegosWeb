import Enemigo from "./Enemigo.js";
// export default es para poder importar la clase en otros ficheros .js
export default class Sierra extends Enemigo {
    constructor(escena, x, y) {
        super(escena, x, y, "spr_sierra", "spr_sierra_descansando1");
        // Llamadas a metodos
        // Para evitar que se muevan
        this.body.setImmovable(true);
        this.body.moves = false;
        // Animaciones
        this.crearAnimacionesSierra();
    }
    
    update() {
        this.comportamiento();
    }

    // Comportamiento de la sierra
    comportamiento() {
        this.play("spr_sierra_atacando", true);
    }

    // Animaciones
    crearAnimacionesSierra() {
        if (!this.escena.anims.exists("spr_sierra_atacando")) {
            // Animacion de ataque
            this.animacionAtaque = {} //Creamos un nuevo objeto
            this.animacionAtaque.key = "spr_sierra_atacando";
            this.animacionAtaque.frames = this.escena.anims.generateFrameNames ("spr_sierra", {
                prefix: "spr_sierra_atacando",
                start: 1,
                end: 2,
            });
            this.animacionAtaque.frameRate = 6;
            this.animacionAtaque.repeat = -1;
            this.escena.anims.create(this.animacionAtaque);
        }
        
    }
}