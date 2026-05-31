export default class BotonReinciar {
    constructor (escena) {
        // Guardamos la referencia  la escena
        this.escena = escena;
    }
    
    cargarBotonReiniciar () {
        this.escena.load.spritesheet("botonReiniciar", "Assets/Imagenes/FinJuego/botonReiniciar.png", {
            frameWidth: 376,
            frameHeight: 332,
        });
    }

    crearBotonReinciar () {
        this.botonReiniciar = this.escena.add.sprite (675, 350, "botonReiniciar").setInteractive().setScale(0.75);
        this.clickarBotonReiniciar();
    }

    clickarBotonReiniciar () {
        this.botonReiniciar.on ("pointerover", () => {
            this.botonReiniciar.setFrame (1);
        }) 
        this.botonReiniciar.on ("pointerout", () => {
            this.botonReiniciar.setFrame (0);
        })
        this.botonReiniciar.on ("pointerdown", () => {
            this.escena.scene.start("escenaArboles");
            this.sonidoClicBoton.play();
        })
        this.sonidoClicBoton = this.escena.sound.add ("sonidoClicBoton")

    }
}