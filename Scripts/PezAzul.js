import Enemigo from "./Enemigo.js";

export default class PezAzul extends Enemigo {
    constructor(escena, x, y, jugador) {
        super(escena, x, y, jugador, "spr_pez_azul", "spr_pez_azul_descansando1"); 
        this.velocidadEjeX = 50;
        this.body.allowGravity = false;
        this.body.setAllowGravity(false);
        // this.body.setImmovable(true);

        //this.body.moves = false;
        // Llamadas a metodos
        this.crearAnimacionesPezAzul();
    }

    comportamiento () {
        this.play("spr_pez_azul_nadando", true);
        this.detectarJugador();
    }

    detectarJugador () {
    let distancia = Phaser.Math.Distance.Between(
        this.x, this.y,
        this.jugador.x, this.jugador.y
    );

    if (distancia < this.rangoVision) {

        if (this.jugador.x < this.x) {
            this.aplicarVelocidadEjeX(-this.velocidadEjeX);
            this.setFlipX(false);
        } 
        else {
            this.aplicarVelocidadEjeX(this.velocidadEjeX);
            this.setFlipX(true);
        }

        // 🔥 CLAVE: bloquear Y
        this.aplicarVelocidadEjeY(0);

    } else {
        this.setVelocity(0,0);
    }
}

    crearAnimacionesPezAzul() {
        if (!this.escena.anims.exists("spr_pez_azul_nadando")) {
            // Animacion de caminar 
            this.animacionNadar = {} //Creamos un nuevo objeto
            this.animacionNadar.key = "spr_pez_azul_nadando";
            this.animacionNadar.frames = this.escena.anims.generateFrameNames ("spr_pez_azul", {
                prefix: "spr_pez_azul_nadando",
                start: 1,
                end: 2,
            });
            this.animacionNadar.frameRate = 6;
            this.animacionNadar.repeat = -1;
            this.escena.anims.create(this.animacionNadar);
        }
    }
}