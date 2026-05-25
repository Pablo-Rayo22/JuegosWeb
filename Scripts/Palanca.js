import Interactivo from "./Interactivo.js"
// export default es para poder importar la clase en otros ficheros .js
export default class Palanca extends Interactivo {
    // Metodos
    constructor(escena, x, y, jugador) {
        super(escena, x, y, jugador, "spr_palanca", "spr_palanca_inactiva1");

        // Variables
        this.teclaE = this.escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        // Llamadas a metodos
        // Escalamos la palanca y su hitbox
        this.fijarEscala(1);
        this.fijarHitbox(56, 56, 4, 8);    
        
        // Animaciones
        this.crearAnimacionesPalanca();
    }

    update() {
        this.comportamiento();
    }

    // Comportamiento de la palanca
    comportamiento() {
        this.activar();
    }
    activar() {
        if (this.activo || !this.estaCerca(60)) {
            return;
        }
        if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            this.activo = true;
            this.escena.sonidoPalanca.play(); // Reproducimos el sonido
            this.play("spr_palanca_activa_derecha", true); // Reproducimos la animacion
            this.escena.activarPalanca();
            console.log ("Palanca activada");
        }  
    }

    // Animaciones
    crearAnimacionesPalanca() {        
        if (!this.escena.anims.exists("spr_palanca_activa_derecha")) {
            // Animacion de palanca activa
            this.animacionPalancaActivaDerecha = {} //Creamos un nuevo objeto
            this.animacionPalancaActivaDerecha.key = "spr_palanca_activa_derecha";
            this.animacionPalancaActivaDerecha.frames = this.escena.anims.generateFrameNames ("spr_palanca", {
                prefix: "spr_palanca_activa_derecha",
                start: 1,
                end: 1,
            });
            this.animacionPalancaActivaDerecha.frameRate = 10;
            this.animacionPalancaActivaDerecha.repeat = -1;
            this.escena.anims.create(this.animacionPalancaActivaDerecha);
        }

    }
}