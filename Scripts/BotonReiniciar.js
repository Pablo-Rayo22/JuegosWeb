export default class BotonReinciar {
    constructor (escena) {
        // Guardamos la referencia  la escena
        this.escena = escena;
    }
    
    cargarBotonReiniciar () {
        this.escena.load.image("botonReiniciar", "Assets/Imagenes/FinJuego/botonReiniciar")
    }

    crearBotonReinciar () {
        this.escena.add.image (0, 0, "botonReiniciar");
    }
}