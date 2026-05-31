// export default es para poder importar la clase en otros ficheros .js
export default class Entidad extends Phaser.Physics.Arcade.Sprite {
    // Metodos
    constructor(escena, x, y, sprite, frameSprite) {
        super(escena, x, y, sprite, frameSprite);

        //Guardamos la referencia a la escena
        this.escena = escena;
        //Añadimos a la escena
        this.escena.add.existing(this);
        //Añadimos la entidad a Physics
        this.escena.physics.add.existing(this);
    }

    update() {
        this.comportamiento();
    }

    // Comportamiento de las entidades del juego
    comportamiento() {

    }
    // Metodos para aplicar velocidad a las entidades
    aplicarVelocidadEjeX (velocidadEjeX) {
        this.setVelocityX(velocidadEjeX);
    }
    aplicarVelocidadEjeY (velocidadEjeY) {
        this.setVelocityY(velocidadEjeY);
    }
    // Metodo para girar el sprite de las entidades
    voltear () {
         if (this.body.velocity.x > 0) {
            this.setFlipX(false);
        }
        else if (this.body.velocity.x < 0) {
            this.setFlipX(true);
        }
    }
    // Metodos para fijar tamaño y collider de las entidades del juego
    fijarEscala(escala) {
        this.setScale(escala);
    }
    fijarHitbox(anchoHitBox, altoHitBox, offsetX, offsetY) {
        this.setSize(anchoHitBox, altoHitBox);
        this.setOffset(offsetX, offsetY);
    }

    // Método para fijar la profundidad
    fijarProfundidad (profundidad) {
        this.setDepth (profundidad);
    }
    
}