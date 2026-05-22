import Enemigo from "./Enemigo.js";
// export default es para poder importar la clase en otros ficheros .js
export default class Caracol extends Enemigo {
    constructor(escena, x, y, jugador) {
        super(escena, x, y, jugador, "spr_caracol", "spr_caracol_descansando1");
        // Variables
        this.velocidadEjeX = 45; //Velocidad del caracol

        // Llamadas a metodos
        // Escalamos caracol y su hitbox
        this.fijarEscala(1);
        this.fijarHitbox(64, 56, 0, 8);
        // Animaciones
        this.crearAnimacionesCaracol();
    }

    update() {
       this.comportamiento();
    }

    // Comportamiento caracol
    comportamiento() {
        this.detectarJugador();
        this.play("spr_caracol_caminando", true);
    }
    // Animaciones
    crearAnimacionesCaracol() {
        if (!this.escena.anims.exists("spr_caracol_caminando")) {
            // Animacion de caminar 
            this.animacionCaminar = {} //Creamos un nuevo objeto
            this.animacionCaminar.key = "spr_caracol_caminando";
            this.animacionCaminar.frames = this.escena.anims.generateFrameNames ("spr_caracol", {
                prefix: "spr_caracol_caminando",
                start: 1,
                end: 2,
            });
            this.animacionCaminar.frameRate = 6;
            this.animacionCaminar.repeat = -1;
            this.escena.anims.create(this.animacionCaminar);
        }
    }
}