// export default es para poder importar la clase en otros ficheros .js
export default class UI {
    constructor(escena) {
        // Guardamos la referencia a la escena
        this.escena = escena;

        // Variables
        this.monedasRecolectadas = 0;
        this.textoMonedasRecolectadas;
        this.textoTiempo;
    }
    // Creamos el contador tiempo
    crearContadorTiempo(posicionX, posicionY, tiempo) { 
        this.textoTiempo = this.escena.add.text(posicionX, posicionY, "Tiempo: " + tiempo, {
        fontSize: "17.5px",
        fill: "#000000",
        fontFamily: "arial, verdana",
        }).setScrollFactor(0);
    }
    // Actualizamos el contador de tiempo
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

    // Creamos el contador de monedas
    crearContadorMonedas(posicionX, posicionY) {
        this.textoMonedasRecolectadas = this.escena.add.text(posicionX, posicionY, "Monedas: 0", { // Añadimos el texto a la escena
            fontSize: "17.5px",
            fill: "#000000",
            fontFamily: "arial, verdana",
        }).setScrollFactor(0);
    } 
    // Actualizamos el contador
    actualizarContadorMonedas(puntosMoneda) {
        if (this.monedasRecolectadas === undefined) {
            this.monedasRecolectadas = 0;
        }
        else {
            this.monedasRecolectadas += puntosMoneda;
            this.textoMonedasRecolectadas.setText("Monedas: " + this.monedasRecolectadas);
        }
    }
}