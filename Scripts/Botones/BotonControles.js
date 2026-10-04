export default class BotonControles {
    constructor (escena) {
        
        // Guardamos la referencia a la escena
        this.escena = escena;


    }

    cargarBotonControles() {
        this.escena.load.spritesheet("botonControles", "Assets/Imagenes/Menus/Botones/botonControles.png", {
            frameWidth: 376,
            frameHeight: 332,
        });
    }

    crearBotonControles () {
        this.botonControles = this.escena.add.sprite (675, 425, "botonControles").setInteractive().setScale(0.75);
        this.clickarBotonControles();
    }

    clickarBotonControles() {
        this.botonControles.on ("pointerover", () => {
            this.botonControles.setFrame (1);
        }) 
        this.botonControles.on ("pointerout", () => {
            this.botonControles.setFrame (0);
        })
        this.botonControles.on ("pointerdown", () => {
            this.escena.scene.start("escenaControles");
            this.sonidoClicBoton.play();
        })
        this.sonidoClicBoton = this.escena.sound.add ("sonidoClicBoton")
    }
}