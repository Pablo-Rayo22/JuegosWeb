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
        this.load.image("victoria", "Assets/Imagenes/FinJuego/victoria.png");
        //this.load.image("fondo", "Assets/Imagenes/Finjuego/fondo.jpg");
        this.load.audio("sonidoVictoria", "Assets/Sonidos/victoria.ogg");
        this.botonReinciar.cargarBotonReiniciar();
    }
    // Cargamos los recursos
    create() {
        this.imagenVictoria = this.add.image (675, 120, "victoria").setOrigin (0.5, 0.5).setScale(2).setDepth(5);
        // this.imagenFondo = this.add.image (0, 0, "fondo").setOrigin (0, 0).setScale(10);
        this.sonidoVictoria = this.sound.add("sonidoVictoria");
        this.sonidoVictoria.play();
        this.botonReinciar.crearBotonReinciar();

    }
}