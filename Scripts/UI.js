// export default es para poder importar la clase en otros ficheros .js
export default class UI {
    constructor(escena) {
        // Guardamos la referencia a la escena
        this.escena = escena;

        // Variables
        this.monedasRecolectadas = 0;
        this.textoMonedasRecolectadas;
        this.textoTiempo;
        this.vidasIniciales = 3;
        this.vidas = this.vidasIniciales;
        this.textoVidas = null;
        this.siguienteVida = 50;
    }
    // Creamos el contador tiempo
    crearContadorTiempo(posicionX, posicionY, tiempo) { 
        this.textoTiempo = this.escena.add.text(posicionX, posicionY, "Tiempo: " + tiempo, {
        fontSize: "17.5px",
        fill: "#000000",
        fontFamily: "arial, verdana",
        }).setScrollFactor(0);
    }
    // Creamos los contadores
    crearContadorMonedas(posicionX, posicionY) {
        this.textoMonedasRecolectadas = this.escena.add.text(posicionX, posicionY, "Monedas: 0", { // Añadimos el texto a la escena
            fontSize: "17.5px",
            fill: "#000000",
            fontFamily: "arial, verdana",
        }).setScrollFactor(0);
    }
    crearContadorVidas(posicionX, posicionY) {
        this.textoVidas = this.escena.add.text(posicionX, posicionY, "Vidas: 3", { // Añadimos el texto a la escena
            fontSize: "17.5px",
            fill: "#000000",
            fontFamily: "arial, verdana",
        }).setScrollFactor(0);
    }

    // Actualizamos los contadores
    actualizarContadorTiempo(delay, tiempo) {
        this.escena.time.addEvent({
            delay: delay, //En milisegundos
            callback: () => {
                if (tiempo > 0) {
                    tiempo--;
                    this.textoTiempo.setText("Tiempo: " + tiempo);
                }
                else if (tiempo === 0) {
                    tiempo;
                    this.escena.morir();
                }
                else {
                    console.log("El tiempo no puede ser negativo");
                }
            },
            loop: true
        });
    }
    actualizarContadorMonedas(puntosMoneda) {
        if (this.monedasRecolectadas === undefined) {
            this.monedasRecolectadas = 0;
        }
        else {
            this.monedasRecolectadas += puntosMoneda;
            this.textoMonedasRecolectadas.setText("Monedas: " + this.monedasRecolectadas);
            if (this.monedasRecolectadas >= this.siguienteVida) {
                this.actualizarContadorVidas(1);
                this.siguienteVida += 50;
            }
        }
    }
    actualizarContadorVidas (puntosVida) {
        if (this.vidas > 0) {
            this.vidas += puntosVida;
            this.textoVidas.setText ("Vidas: " + this.vidas);
        }
        else {
            this.escena.scene.restart();
            this.vidas = this.vidasIniciales
        }
    }
}