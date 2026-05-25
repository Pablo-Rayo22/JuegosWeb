import Enemigo from "./Enemigo.js";

export default class PezAzul extends Enemigo {
    constructor(escena, x, y, jugador) {
        super(escena, x, y, jugador, "spr_pez_azul", "spr_pez_azul_nadando1");

        this.velocidadEjeX = 120;
        this.rangoVision = 300;

        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.moves = false;

        this.body.setVelocity(0, 0);

        this.crearAnimacionesPezAzul();
    }

    comportamiento() {
        this.detectarJugador();

        // 🔒 seguridad anti-caída
        this.body.setVelocityY(0);

        if (this.body.velocity.x !== 0) {
        this.anims.play("spr_pez_azul_nadando", true);
        }
    }

    detectarJugador() {
        if (!this.jugador) return;

        const distancia = Phaser.Math.Distance.Between(
            this.x, this.y,
            this.jugador.x, this.jugador.y
        );

        if (distancia < this.rangoVision) {

            if (this.jugador.x < this.x) {
                this.body.setVelocityX(-this.velocidadEjeX);
                this.setFlipX(false);
            } else {
                this.body.setVelocityX(this.velocidadEjeX);
                this.setFlipX(true);
            }

        } 
        else {
            this.body.setVelocityX(0);
        }

    }

    crearAnimacionesPezAzul() {
        if (!this.escena.anims.exists("spr_pez_azul_nadando")) {
            this.escena.anims.create({
                key: "spr_pez_azul_nadando",
                frames: this.escena.anims.generateFrameNames("spr_pez_azul", {
                    prefix: "spr_pez_azul_nadando",
                    start: 1,
                    end: 2,
                }),
                frameRate: 6,
                repeat: -1
            });
        }
    }
}