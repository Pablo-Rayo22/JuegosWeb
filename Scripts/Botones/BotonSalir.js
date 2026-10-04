export default class BotonSalir {
    constructor (escena) {

        // Guardamos la referencia a la escena
        this.escena = escena;
    }

    cargarBotonSalir () {
        this.escena.load.spritesheet("botonSalir", "./Assets/Imagenes/Menus/Botones/botonSalir.png", {
            frameWidth: 988,
            frameHeight: 336,
        });
    }

    crearBotonSalir () {
        this.botonSalir = this.escena.add.sprite (1385, 22, "botonSalir").setInteractive().setScale(0.2)
        this.botonSalir.setDepth(100);
        this.clickarBotonSalir();
    }

    clickarBotonSalir () {
        this.botonSalir.on ("pointerover", () => {
            this.botonSalir.setFrame (1);
        }) 
        this.botonSalir.on ("pointerout", () => {
            this.botonSalir.setFrame (0);
        })
        this.botonSalir.on ("pointerdown", () => {
            this.escena.scene.start("menuInicial");
            this.sonidoClicBoton.play();
        })
        this.sonidoClicBoton = this.escena.sound.add ("sonidoClicBoton");

    }
}