import Enemigo from "./Enemigo.js";

// export default es para poder importar la clase en otros ficheros .js
export default class GusanoAzul extends Enemigo {
    constructor(escena, x, y, jugador) {
        super(escena, x, y, jugador, "spr_gusano_azul", "spr_gusano_azul_descansando1");
        // Variables
        this.velocidadEjeX = 90; //Velocidad del gusano azul

        // Llamadas a metodos
        // Escalamos gusano azul y su hitbox
        this.fijarEscala(1);
        this.fijarHitbox(64, 32, 0, 32);
        // Animaciones
        this.crearAnimacionesGusanoAzul();
    }
    
    update() {
        this.comportamiento();
    }

    // Comportamiento del gusano azul
    comportamiento() {
        this.detectarJugador();
        this.play("spr_gusano_azul_movimiento", true);
    }

    // Animaciones
    crearAnimacionesGusanoAzul() {
        if (!this.escena.anims.exists("spr_gusano_azul_movimiento")) {
            // Animacion de movimiento
            this.animacionMovimiento = {} //Creamos un nuevo objeto
            this.animacionMovimiento.key = "spr_gusano_azul_movimiento";
            this.animacionMovimiento.frames = this.escena.anims.generateFrameNames ("spr_gusano_azul", {
                prefix: "spr_gusano_azul_movimiento",
                start: 1,
                end: 2,
            });
            this.animacionMovimiento.frameRate = 6;
            this.animacionMovimiento.repeat = -1;
            this.escena.anims.create(this.animacionMovimiento);
        }
    }
}