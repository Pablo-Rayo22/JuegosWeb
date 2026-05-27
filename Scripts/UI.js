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

        // Grupo para guardar las imágenes individuales de los corazones
        this.grupoVidasVisuales = this.escena.add.group();
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
        this.textoMonedasRecolectadas = this.escena.add.text(posicionX, posicionY, "Monedas: 0", { 
            fontSize: "17.5px",
            fill: "#000000",
            fontFamily: "arial, verdana",
        }).setScrollFactor(0);
    }

    // Modificado para pintar también las imágenes de los corazones al inicio
    crearContadorVidas(posicionX, posicionY) {
        this.textoVidas = this.escena.add.text(posicionX, posicionY, "Vidas: " + this.vidas, { 
            fontSize: "17.5px",
            fill: "#000000",
            fontFamily: "arial, verdana",
        }).setScrollFactor(0);

        // Desfase para alinear los corazones con el texto
        this.dibujarCorazones(posicionX + 70, posicionY + -8);
    }

    // Función para renderizar los corazones de forma dinámica
    dibujarCorazones(posX, posY) {
        // Limpiamos los corazones anteriores de la pantalla
        this.grupoVidasVisuales.clear(true, true);

        // Si el jugador no tiene vidas, no se dibuja nada
        if (this.vidas <= 0) return;

        // Parámetros de diseño para la escala y espaciado de los elementos visuales
        let escalaCorazon = 1.5; 
        let separacionEntreCorazones = 29; 

        // Bucle para añadir un corazón por cada vida actual del jugador
        for (let i = 0; i < this.vidas; i++) {
            // Cálculo del desplazamiento horizontal en fila
            let desplazamientoX = posX + (i * separacionEntreCorazones);

            // Instancia del sprite del corazón
            let corazon = this.escena.add.image(desplazamientoX, posY, "spr_vida_icono");
            
            corazon.setOrigin(0, 0);
            corazon.setScrollFactor(0); // Fijar a la cámara
            corazon.setScale(escalaCorazon); 

            // Añadir al grupo para su posterior gestión y limpieza
            this.grupoVidasVisuales.add(corazon);
        }
    }

    // Actualizamos los contadores
    actualizarContadorTiempo(delay, tiempo) {
        this.escena.time.addEvent({
            delay: delay, 
            callback: () => {
                if (tiempo > 0) {
                    tiempo--;
                    this.textoTiempo.setText("Tiempo: " + tiempo);
                }
                else if (tiempo === 0) {
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
            
            // Incremento de vida al alcanzar la puntuación requerida
            if (this.monedasRecolectadas >= this.siguienteVida) {
                this.actualizarContadorVidas(1);
                this.siguienteVida += 50;
            }
        }
    }

    // Actualización del estado de las vidas y rediseño de la interfaz
    actualizarContadorVidas(puntosVida) {
        if (puntosVida === undefined) {
            puntosVida = -1;
        }

        this.vidas += puntosVida;

        if (this.vidas > 0) {
            if (this.textoVidas) this.textoVidas.setText("Vidas: " + this.vidas);
            
            // Sincronización de posición con los valores iniciales de la creación
            let posX = this.textoVidas ? this.textoVidas.x + 72 : 20;
            let posY = this.textoVidas ? this.textoVidas.y + 2 : 20;
            this.dibujarCorazones(posX, posY);
        }
        else {
            if (this.textoVidas) this.textoVidas.setText("Vidas: 0");
            this.grupoVidasVisuales.clear(true, true); 
            
            // Reiniciar escena en caso de Game Over
            this.escena.scene.restart();
            this.vidas = this.vidasIniciales;
        }
    }
}