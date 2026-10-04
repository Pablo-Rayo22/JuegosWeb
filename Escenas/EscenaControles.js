import BotonSalir from "../Scripts/Botones/BotonSalir.js";

export default class EscenaControles extends Phaser.Scene {
    constructor () {
        super("escenaControles");

        // Creamos la instancia de las clases de los botones
        this.botonSalir = new BotonSalir(this);

    }

    preload() {
        this.load.image("controles", "Assets/Imagenes/Menus/controles.png");
        this.botonSalir.cargarBotonSalir();
    }

    create () {
        this.imagenControles = this.add.image (0, 0, "controles").setOrigin(0, 0).setScale(2.4, 1.425); // Con zoom al 100%
        this.botonSalir.crearBotonSalir();
    }


}