import Interactivo from "./Interactivo.js"
// export default es para poder importar la clase en otros ficheros .js
export default class Trampolin extends Interactivo {
    constructor(escena, x, y, jugador) {
        super(escena, x, y, jugador, "spr_trampolin", "spr_trampolin_inactivo1");
        // Variables
        this.fuerzaRebote = -650;
        // Llamadas a metodos
        // Escalamos el trampolin y su hitbox
        this.fijarEscala(1);
        this.fijarHitbox(64, 52, 0, 16);
        // Animaciones
        this.crearAnimacionesTrampolin();
    }

    update() {
        this.comportamiento();
    }

    // Comportamiento del trampolin
    comportamiento () {
        this.activarTrampolin(); 
    }

    activarTrampolin(jugador) {
    if (this.activo) return;

    if (!jugador) return; //  protección

    this.activo = true;

    jugador.setVelocityY(this.fuerzaRebote); 

    this.play("spr_trampolin_activo", true);
    this.escena.sonidoTrampolin.play();

    this.escena.time.delayedCall(300, () => {
        this.activo = false;
        this.play("spr_trampolin_inactivo", true);
    });
}

    // Animaciones
    crearAnimacionesTrampolin() {
        if (!this.escena.anims.exists("spr_trampolin_inactivo")) {
            // Animacion de trampolin inactivo
            this.animacionTrampolinInactivo = {} //Creamos un nuevo objeto
            this.animacionTrampolinInactivo.key = "spr_trampolin_inactivo";
            this.animacionTrampolinInactivo.frames = this.escena.anims.generateFrameNames ("spr_trampolin", {
                prefix: "spr_trampolin_inactivo",
                start: 1,
                end: 1,
            });
            this.animacionTrampolinInactivo.frameRate = 10;
            this.animacionTrampolinInactivo.repeat = -1;
            this.escena.anims.create(this.animacionTrampolinInactivo);
        }

        
        if (!this.escena.anims.exists("spr_trampolin_activo")) {
            // Animacion trampolin activo
            this.animacionTrampolinActivo = {} //Creamos un nuevo objeto
            this.animacionTrampolinActivo.key = "spr_trampolin_activo";
            this.animacionTrampolinActivo.frames = this.escena.anims.generateFrameNames ("spr_trampolin", {
                prefix: "spr_trampolin_activo",
                start: 1,
                end: 1,
            });
            this.animacionTrampolinActivo.frameRate = 10;
            this.animacionTrampolinActivo.repeat = -1;
            this.escena.anims.create(this.animacionTrampolinActivo);
        }
        
    }
}