export default class BotonJugar {
    constructor (escena) {

        // Guardamos la referencia a la escena
        this.escena = escena;
    }

    cargarBotonJugar () {
        this.escena.load.spritesheet("botonJugar", "./Assets/Imagenes/Menus/Botones/botonJugar.png", {
            frameWidth: 376,
            frameHeight: 332,
        });
    }

    crearBotonJugar () {
        this.botonJugar = this.escena.add.sprite (675, 225, "botonJugar").setInteractive().setScale(0.75);
        this.clickarBotonJugar();
    }

    clickarBotonJugar () {
        this.botonJugar.on ("pointerover", () => {
            this.botonJugar.setFrame (1);
        }) 
        this.botonJugar.on ("pointerout", () => {
            this.botonJugar.setFrame (0);

        })
        this.botonJugar.on ("pointerdown", () => {
            this.escena.scene.start("escenaArboles");
            this.sonidoClicBoton.play();
        })
        this.sonidoClicBoton = this.escena.sound.add ("sonidoClicBoton");

    }
}