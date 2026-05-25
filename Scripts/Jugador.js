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

        // Variables añadidas para registrar ráfagas de pulsación del mando
        this.padSaltoJustDown = false;
        this.padSaltoJustUp = false;
        
        // Variable para guardar la posicionInicial del jugador
        this.posicionInicial = {
            x: 130,
            y: 530,
        };

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
        // DETECCIÓN ULTRA SEGURA: Solo busca el mando si el sistema de Phaser está totalmente inicializado
        if (this.escena.input && this.escena.input.gamepad && this.escena.input.gamepad.total > 0) {
            this.pad = this.escena.input.gamepad.pad1;
        } else {
            this.pad = null; // Si no hay mando o no está listo, se vuelve null de forma segura
        }
        
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
        
        // --- DETECTAR CORRER (Teclado X o Botón X del mando) ---
        let botonCorrerMando = false;
        if (this.pad && this.pad.buttons && this.pad.X) {
            botonCorrerMando = this.pad.X;
        }

        if (this.teclaX.isDown || botonCorrerMando) {
            velocidad *= 1.7;
        }
        
        // --- DETECTAR DIRECCIÓN (Teclado o Mando) ---
        let moverIzquierda = this.cursores.left.isDown;
        let moverDerecha = this.cursores.right.isDown;

        // Comprobamos los ejes de forma segura sin asumir que las propiedades existen inmediatamente
        if (this.pad && this.pad.leftStick) {
            let stickX = this.pad.leftStick.x;
            
            if (stickX < -0.2 || this.pad.left) {
                moverIzquierda = true;
            }
            if (stickX > 0.2 || this.pad.right) {
                moverDerecha = true;
            }
        }

        // Aplicar movimiento final
        if (moverIzquierda) {
            this.aplicarVelocidadEjeX(-velocidad);
        }
        else if (moverDerecha) {
            this.aplicarVelocidadEjeX(velocidad);
        }
        else {
            this.aplicarVelocidadEjeX(0);
        }
    }
    
    // Salto
    saltar() {
        // --- DETECTAR ENTRADAS DE SALTO (TECLADO) ---
        let spaceJustDown = Phaser.Input.Keyboard.JustDown(this.cursores.space);
        let spaceIsDown = this.cursores.space.isDown;
        let spaceJustUp = Phaser.Input.Keyboard.JustUp(this.cursores.space);

        // --- DETECTAR ENTRADAS DE SALTO (MANDO) ---
        let botonSaltoJustDown = this.padSaltoJustDown;
        let botonSaltoIsDown = false;
        let botonSaltoJustUp = this.padSaltoJustUp;

        if (this.pad && this.pad.buttons && this.pad.buttons[0]) {
            // Evaluamos si el botón A se mantiene retenido
            botonSaltoIsDown = this.pad.buttons[0].pressed;
        }

        // Si el jugador esta tocando suelo y se ha pulsado espacio o el botón A del mando
        if (this.body.onFloor() && (spaceJustDown || botonSaltoJustDown)) {
            this.aplicarVelocidadEjeY(this.fuerzaDeSalto);
            this.saltando = true;
            this.tiempoSalto = 0;
        }
        
        // Si mantienes el botón pulsado para controlar la altura del salto
        if (this.saltando && (spaceIsDown || botonSaltoIsDown)) { 
            this.tiempoSalto += this.escena.game.loop.delta; // Para que sea independiente de los frames
            if (this.tiempoSalto < this.tiempoMaximo) {
                this.aplicarVelocidadEjeY(this.fuerzaDeSalto);
            }
        }
        
        // Si se ha soltado el botón de salto antes de tiempo (frena el salto acumulado)
        if (spaceJustUp || botonSaltoJustUp) {
            if (this.body.velocity.y < 0) {
                this.aplicarVelocidadEjeY(this.body.velocity.y * 0.5);
            }
            this.saltando = false;
        }
        
        // Si el jugador esta tocando suelo volvemos a resetear el estado de salto
        if (this.body.onFloor()) {
            this.saltando = false;
        }   

        // IMPORTANTE: Reseteamos las ráfagas de eventos para que solo duren un frame de ejecución
        this.padSaltoJustDown = false;
        this.padSaltoJustUp = false;
    }

    // Controles
    crearControles() {
        this.cursores = this.escena.input.keyboard.createCursorKeys();
        this.teclaX = this.escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.pad = null;

        // Escuchadores de eventos globales para capturar pulsaciones instantáneas del mando de forma limpia
        this.escena.input.gamepad.on('down', (pad, button) => {
            if (button.index === 0) { // Index 0 es por defecto el botón A (Mando Xbox) o Cruz (PlayStation)
                this.padSaltoJustDown = true;
            }
        });

        this.escena.input.gamepad.on('up', (pad, button) => {
            if (button.index === 0) {
                this.padSaltoJustUp = true;
            }
        });
    }

    // Animaciones
    crearAnimacionesJugador () {
        if (!this.escena.anims.exists("spr_jugador_andando")) {
            this.animacionAndar = {} 
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
            this.animacionFrente = {} 
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
            this.animacionSalto = {} 
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
            this.animacionDeSerGolpeado = {} 
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