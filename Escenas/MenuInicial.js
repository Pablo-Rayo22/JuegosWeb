import BotonJugar from "../Scripts/Botones/BotonJugar.js";
import BotonControles from "../Scripts/Botones/BotonControles.js";

export default class MenuInicial extends Phaser.Scene {
    constructor() {
        super("menuInicial");

        // Creamos las instancias de los botones
        this.botonJugar = new BotonJugar(this);
        this.botonControles = new BotonControles(this);
    }

    preload () {
        this.load.image("fondoMenu", "../Assets/Imagenes/Menus/fondo.jpg");
        this.load.audio ("sonidoClicBoton", "Assets/Sonidos/clicBoton.ogg");
        this.load.audio("musicaFondo", "Assets/Sonidos/musicaFondo.ogg");

        this.botonJugar.cargarBotonJugar();
        this.botonControles.cargarBotonControles();
    }

    create() {
        this.fondoMenu = this.add.image(0, 0, "fondoMenu").setOrigin(0 ,0).setScale(9, 4.5);
        this.botonJugar.crearBotonJugar();
        this.botonControles.crearBotonControles();

    }
}