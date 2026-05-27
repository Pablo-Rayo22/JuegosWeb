import BotonReinciar from "../Scripts/BotonReiniciar.js";
// export default es para poder importar la clase en otros ficheros .js
export default class EscenaGameOver extends Phaser.Scene {
    constructor () {
        super("escenaGameOver");

        // Creamos una instancia de la clase BotonReiniciar
        this.botonReinciar = new BotonReinciar (this);
    }
    // Precargamos los recursos
    preload () {
        this.load.image("gameOver", "Assets/Imagenes/FinJuego/gameOver.jpg");
        this.load.audio("sonidoGameOver", "Assets/Sonidos/gameOver.ogg")
        this.botonReinciar.cargarBotonReiniciar
    }
    // Cargamos los recursos
    create() {
        this.gameOver = this.add.image (0, 0, "gameOver").setOrigin (0, 0).setScale(4.5, 4.5);
        this.sonidoGameOver = this.sound.add("sonidoGameOver");
        this.sonidoGameOver.play();
        this.botonReinciar.crearBotonReinciar();
    }
}