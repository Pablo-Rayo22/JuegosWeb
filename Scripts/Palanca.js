import Interactivo from "./Interactivo.js"

// export default es para poder importar la clase en otros ficheros .js
export default class Palanca extends Interactivo {
    // Metodos
    constructor(escena, x, y, jugador) {
        super(escena, x, y, jugador, "spr_palanca", "spr_palanca_inactiva1");

        // Variables
        this.teclaE = this.escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        
        // Variables para registrar los intentos de activación
        this.intentoActivar = false;

        // Llamadas a metodos
        // Escalamos la palanca y su hitbox
        this.fijarEscala(1);
        this.fijarHitbox(56, 56, 4, 8);    
        
        // --- ESCUCHADOR DEL RATÓN ---
        this.setInteractive(); // Hace que este sprite pueda recibir clics
        this.on('pointerdown', () => {
            this.intentarAccionar();
        });

        // --- ESCUCHADOR DEL MANDO (Por eventos, 100% seguro) ---
        this.escena.input.gamepad.on('down', (pad, button) => {
            // index 2 es Botón X (izq) e index 3 es Botón Y (arriba)
            if (button.index === 2 || button.index === 3) {
                this.intentarAccionar();
            }
        });

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

    // Esta función centraliza cuando el jugador pulsa el ratón o los botones del mando
    intentarAccionar() {
        if (!this.activo && this.estaCerca(60)) {
            this.intentoActivar = true;
        }
    }

    activar() {
        // Si ya está activa, no hacemos nada
        if (this.activo) return;

        // --- COMPROBACIÓN DE LA TECLA E (TECLADO) ---
        let teclaEPulsada = Phaser.Input.Keyboard.JustDown(this.teclaE);

        // Si se pulsa la E estando cerca, también es un intento válido
        if (teclaEPulsada && this.estaCerca(60)) {
            this.intentoActivar = true;
        }

        // --- EJECUCIÓN DE LA ACTIVACIÓN ---
        if (this.intentoActivar) {
            this.activo = true;
            this.escena.sonidoPalanca.play(); // Reproducimos el sonido
            this.play("spr_palanca_activa_derecha", true); // Reproducimos la animacion
            this.escena.activarPalanca();
            console.log("Palanca activada con éxito");
        }  

        // Reseteamos siempre la variable de intento al final del frame
        this.intentoActivar = false;
    }

    // Animaciones
    crearAnimacionesPalanca() {        
        if (!this.escena.anims.exists("spr_palanca_inactiva1")) {
            // Animacion de palanca activa
            this.animacionPalancaInactiva = {} //Creamos un nuevo objeto
            this.animacionPalancaInactiva.key = "spr_palanca_inactiva1";
            this.animacionPalancaInactiva.frames = this.escena.anims.generateFrameNames ("spr_palanca", {
                prefix: "spr_palanca_inactiva1",
                start: 1,
                end: 1,
            });
            this.animacionPalancaInactiva.frameRate = 10;
            this.animacionPalancaInactiva.repeat = -1;
            this.escena.anims.create(this.animacionPalancaInactiva);
        }
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