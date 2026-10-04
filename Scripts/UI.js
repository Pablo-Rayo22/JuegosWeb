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
        this.siguienteVida = 100;
        this.desplazamientoX = 25;
        this.desplazamientoIconosUI = {
            x: -15, 
            y: -15
        }
        this.iconoMoneda = null;
    }

    // Creamos los contadores
    crearContadorTiempo(posicionX, posicionY, tiempo) { 
        this.textoTiempo = this.escena.add.text(posicionX + this.desplazamientoX, posicionY, tiempo, {
            fontSize: "17.5px",
            fill: "#000000",
            fontFamily: "arial, verdana",
        }).setScrollFactor(0);

        this.dibujarIconoReloj(posicionX, posicionY)
    }

    crearContadorMonedas(posicionX, posicionY) {
        this.textoMonedasRecolectadas = this.escena.add.text(posicionX + this.desplazamientoX, posicionY, this.monedasRecolectadas, { 
            fontSize: "17.5px",
            fill: "#000000",
            fontFamily: "arial, verdana",
        }).setScrollFactor(0);

       this.dibujarIconoMoneda(posicionX, posicionY);
    }

    // Modificado para pintar también las imágenes de los corazones al inicio
    crearContadorVidas(posicionX, posicionY) {
        
        this.textoVidas = this.escena.add.text(posicionX + this.desplazamientoX, posicionY, "X" + this.vidas, { 
            fontSize: "17.5px",
            fill: "#000000",
            fontFamily: "arial, verdana",
        }).setScrollFactor(0);

        this.dibujarIconoCorazon(posicionX, posicionY);
    }

    // Función para renderizar los corazones de forma dinámica
    dibujarIconoCorazon(posX, posY) {

        // Si el jugador no tiene vidas, no se dibuja nada
        if (this.vidas <= 0) {
            return;
        }

        let escalaCorazon = 0.75; 
        // Instancia del sprite del corazón
        let corazon = this.escena.add.image(posX + this.desplazamientoIconosUI.x, posY + this.desplazamientoIconosUI.y, "spr_vida_icono");
        
        corazon.setOrigin(0, 0);
        corazon.setScrollFactor(0); // Fijar a la cámara
        corazon.setScale(escalaCorazon); 
    }

    dibujarIconoMoneda(posX, posY) {
        let escalaMoneda = 0.75;
        let centro = {
            x: 0.5,
            y: 0.5
        }

        this.iconoMoneda = this.escena.add.sprite(
            posX + this.desplazamientoIconosUI.x + 24,
            posY + this.desplazamientoIconosUI.y + 24,
            "spr_monedaui",
            "spr_monedaui_girando1"
        );

        this.iconoMoneda.setOrigin(centro.x, centro.y);
        this.iconoMoneda.setScrollFactor(0);
        this.iconoMoneda.setScale(escalaMoneda);

        this.escena.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                if (this.iconoMoneda.frame.name === "spr_monedaui_girando1") {
                    this.iconoMoneda.setFrame("spr_monedaui_girando2");
                }
                else {
                    this.iconoMoneda.setFrame("spr_monedaui_girando1");
                }
            }
        });
    }

    dibujarIconoReloj(posX, posY) {
        let escalaReloj = 0.5;
        let reloj = this.escena.add.image (posX + this.desplazamientoIconosUI.x*0.5, 
        posY + this.desplazamientoIconosUI.y + 10, "spr_reloj_icono");

        reloj.setOrigin(0, 0);
        reloj.setScrollFactor(0); // Fijar a la cámara
        reloj.setScale(escalaReloj); 
    }

    // Actualizamos los contadores
    actualizarContadorTiempo(delay) {
       this.temporizador = this.escena.time.addEvent({
            delay: delay, 
            callback: () => {
                if (this.escena.tiempo > 0) {
                    this.escena.tiempo--;
                    this.textoTiempo.setText(this.escena.tiempo);
                }
                else if (this.escena.tiempo === 0) {
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
            this.textoMonedasRecolectadas.setText(this.monedasRecolectadas);
            
            // Incremento de vida al alcanzar la puntuación requerida
            if (this.monedasRecolectadas >= this.siguienteVida) {
                this.actualizarContadorVidas(1);
                this.siguienteVida += 100;
                this.escena.sonidoVida.play();
                this.monedasRecolectadas = 0;
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
            //if (this.textoVidas) this.textoVidas.setText("Vidas: " + this.vidas);
            
            // Sincronización de posición con los valores iniciales de la creación
            let posX;
            let posY;
            if (this.textoVidas) {
                posX = this.textoVidas.x;
                posY = this.textoVidas.y;
            }
            this.textoVidas.setText("X" + this.vidas);

        }
        else {
            if (this.textoVidas) {
                this.textoVidas.setText("X0");
            }
            console.log ("¡GAME OVER!")
            this.escena.scene.start ("escenaGameOver");
            this.vidas = this.vidasIniciales;
        }
    }
}