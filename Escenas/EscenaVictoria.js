import BotonReinciar from "../Scripts/BotonReiniciar.js";
// export default es para poder importar la clase en otros ficheros .js
export default class EscenaVictoria extends Phaser.Scene {
    constructor () {
        super("escenaVictoria");

        // Creamos una instancia de la clase BotonReiniciar
        this.botonReinciar = new BotonReinciar (this);
    }
    // Precargamos los recursos
    preload () {
        this.load.image("victoria", "Assets/Imagenes/FinJuego/victoria.jpg");
        this.load.audio("sonidoVictoria", "Assets/Sonidos/victoria.ogg")
        this.botonReinciar.cargarBotonReiniciar();
    }
    // Cargamos los recursos
    create() {
        this.victoria = this.add.image (0, 0, "victoria").setOrigin (0, 0).setScale(3.9375, 3.9375);
        this.sonidoVictoria = this.sound.add("sonidoVictoria");
        this.sound.play("sonidoVictoria");
        this.botonReinciar.crearBotonReinciar();
    }
}