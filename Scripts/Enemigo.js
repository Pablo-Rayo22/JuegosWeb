import Entidad from "./Entidad.js"
// export default es para poder importar la clase en otros ficheros .js
export default class Enemigo extends Entidad {
    constructor(escena, x, y, jugador, sprite, frameSprite) {
        super(escena, x, y, sprite, frameSprite);
        // Variables
        // Guardamos la referencia al jugador
        this.jugador = jugador
        this.direccion = -1;
        this.velocidadEjeX = 0; //Velocidad de los enemigos
        this.rangoVision = 300; // En pixeles
        this.setCollideWorldBounds(true); // No salir de los bordes
        
        this.body.allowGravity = false; // Deshabilitamos la gravedad
    }
    update() {
        this.comportamiento();
    } 
    // Comportamiento de los enemigos
    comportamiento() {
        this.detectarJugador();
    }
    // Movimiento de los enemigos
    moverEnemigo() {
        this.body.setVelocityX(this.velocidadEjeX * this.direccion);
        this.setFlipX(this.direccion > 0); 
    }
    // Metodo para detectar si el jugador esta cerca
    detectarJugador() {
        if (!this.jugador) {
            return; // Sale de la funcion
        }
        let distancia = Phaser.Math.Distance.Between (this.x, this.y, this.jugador.x, this.jugador.y); // Distancia entre el jugador y el enemigo 
        if (distancia <= this.rangoVision) {
            if  (this.jugador.x < this.x) {
                this.direccion = -1; // El jugador esta a la izquierda del enemigo
            }
            else {
                this.direccion = 1; // El jugador esta a la derecha del enemigo
            }
            this.moverEnemigo();
        }
        else {
            this.aplicarVelocidadEjeX(0);
        }
    }
}