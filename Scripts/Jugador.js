import Entidad from "./Entidad.js"
// export default es para poder importar la clase en otros ficheros .js
export default class Jugador extends Entidad {
    // Metodos
    constructor (escena, x, y) {
        super(escena, x, y, "spr_jugador", "spr_jugador_de_frente1");
        // Variables
        this.velocidadEjeX = 200; // Velocidad del jugador
        this.fuerzaDeSalto = -560; // Cuanto de alto puede saltar
        this.saltando = false;
        this.tiempoSalto = 0; // Tiempo que el jugador permanece en el aire (en milisegundos)
        this.tiempoMaximo = 100; // Tiempo máximo que puede permanecer el jugador en el aire (en milisegundos)

        // Llamadas a metodos 
        // Controles
        this.crearControles();
        // Escalamos jugador y su hitbox
        this.fijarEscala(0.85);
        this.fijarHitbox (80, 96, 24, 28);
        //
        this.setCollideWorldBounds(true); // No salir de los bordes
        // Animaciones
        this.crearAnimacionesJugador();
    }

    update () {
        this.comportamiento();
    }
    // Comportamiento del jugador
    comportamiento () {
        this.mover();   
        this.saltar();    
        this.reproducirAnimacionesJugador();
    }

    mover() {
        let velocidad = this.velocidadEjeX;
        this.voltear();
        // Correr
        if (this.teclaX.isDown) {
            velocidad*=1.7;
        }
        // Andar
        if (this.cursores.left.isDown) {
            this.aplicarVelocidadEjeX(-velocidad);
        }
        else if (this.cursores.right.isDown) {
            this.aplicarVelocidadEjeX(velocidad);
        }
        else {
            this.aplicarVelocidadEjeX(0);
        }
    }
    // Salto
    saltar() {
        // Si el jugador esta tocando suelo y se ha pulsado la tecla espaico
        if (this.body.onFloor() && Phaser.Input.Keyboard.JustDown(this.cursores.space)) { // Si pulsas la tecla espacio
            this.aplicarVelocidadEjeY(this.fuerzaDeSalto);
            this.saltando = true;
            this.tiempoSalto = 0;
        }
        // Si mantienes la tecla espacio pulsada y el jugador esta en el suelo
        if(this.saltando && this.cursores.space.isDown) { 
            this.tiempoSalto += this.escena.game.loop.delta // Para que sea independiente de los frames
            if (this.tiempoSalto < this.tiempoMaximo) {
            this.aplicarVelocidadEjeY(this.fuerzaDeSalto);
            }
        }
        // Si se ha soltado la tecla espacio
        if (Phaser.Input.Keyboard.JustUp(this.cursores.space)) {
            if (this.body.velocity.y < 0) {
                this.aplicarVelocidadEjeY(this.body.velocity.y * 0.5);
            }
            this.saltando = false;
        }
        // Si el jugador esta tocando suelo
        if (this.body.onFloor()) {
            this.saltando = false;
        }   
    }

    // Controles
    crearControles() {
        this.cursores  = this.escena.input.keyboard.createCursorKeys();
        this.teclaX = this.escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }

    // Animaciones
    crearAnimacionesJugador () {
        if (!this.escena.anims.exists("spr_jugador_andando")) {
            // Animacion de andar
            this.animacionAndar = {} //Creamos un nuevo objeto
            this.animacionAndar.key = "spr_jugador_andando";
            this.animacionAndar.frames = this.escena.anims.generateFrameNames ("spr_jugador", {
                prefix: "spr_jugador_andando",
                start: 1,
                end: 2,
            });
            this.animacionAndar.frameRate = 6;
            this.animacionAndar.repeat = -1;
            this.escena.anims.create(this.animacionAndar);
        }
       

        if (!this.escena.anims.exists("spr_jugador_de_frente")) {
            // Animacion de frente
            this.animacionFrente = {} //Creamos un nuevo objeto
            this.animacionFrente.key = "spr_jugador_de_frente";
            this.animacionFrente.frames = this.escena.anims.generateFrameNames ("spr_jugador", {
                prefix: "spr_jugador_de_frente",
                start: 1,
                end: 1,
            });
            this.animacionFrente.frameRate = 6;
            this.animacionFrente.repeat = -1;
            this.escena.anims.create(this.animacionFrente);
        }
        

        if (!this.escena.anims.exists("spr_jugador_saltando")) {
            // Animacion de salto
            this.animacionSalto = {} //Creamos un nuevo objeto
            this.animacionSalto.key = "spr_jugador_saltando";
            this.animacionSalto.frames = this.escena.anims.generateFrameNames ("spr_jugador", {
                prefix: "spr_jugador_saltando",
                start: 1,
                end: 1,
            });
            this.animacionSalto.frameRate = 6;
            this.animacionSalto.repeat = -1;
            this.escena.anims.create(this.animacionSalto);

        }
        
        if (!this.escena.anims.exists("spr_jugador_golpeado")) {
            // Animacion de ser golpeado
            this.animacionDeSerGolpeado = {} //Creamos un nuevo objeto
            this.animacionDeSerGolpeado.key = "spr_jugador_golpeado";
            this.animacionDeSerGolpeado.frames = this.escena.anims.generateFrameNames ("spr_jugador", {
                prefix: "spr_jugador_golpeado",
                start: 1,
                end: 1,
            });
            this.animacionDeSerGolpeado.frameRate = 10;
            this.animacionDeSerGolpeado.repeat = -1;
            this.escena.anims.create(this.animacionDeSerGolpeado);
        }
    }
    reproducirAnimacionesJugador() {
        
        if (!this.body.onFloor()) {
            this.play("spr_jugador_saltando", true);
            return;
        }
        else if (this.body.velocity.x !== 0) {
            this.play("spr_jugador_andando", true);
            return;
        }
        else {
            this.play("spr_jugador_de_frente", true);
        }
    }  
}    