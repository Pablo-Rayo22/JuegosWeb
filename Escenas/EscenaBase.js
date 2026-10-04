import UI from "../Scripts/UI.js"
import Moneda from "../Scripts/Moneda.js";
import OrbeVida from "../Scripts/OrbeVida.js";

export default class EscenaBase extends Phaser.Scene {
    constructor(clave = "") {
        super(clave);

        // Variables 
        this.tiempoInicial = 350;
        this.tiempo = this.tiempoInicial;
        this.delay = 750;
    }

    init (){
        this.UI = new UI(this);
    }

    preload() {

    }
    create() {

    }
    update() {

    }

    // Metodos para cargar y aniadir recursos comunes en todas las escenas

    cargarImagenesComunes() {
        // Jugador
        this.load.image ("jugador", "Assets/Imagenes/Sprites/Personajes/Protagonista/protagonista.png")

        // Objetos recolectables
        // Monedas
        this.load.image("moneda", "Assets/Imagenes/Sprites/Objetos/Recolectables/Monedas/monedaOro.png");
        // Orbes vida
        this.load.image ("orbeVida", "Assets/Imagenes/Sprites/Objetos/Recolectables/OrbesVida/orbeVida.png");

        // Tiles
        this.load.image("tilesheet", "Assets/Imagenes/Sprites/Tileset/tiles.png");

        // Carga de la textura para los elementos visuales de la UI
        this.load.image("spr_vida_icono", "Assets/Imagenes/Sprites/UI/corazonUI.png");
        this.load.image("spr_moneda_icono", "Assets/Imagenes/Sprites/UI/monedaUI.png");
        this.load.image("spr_reloj_icono", "Assets/Imagenes/Sprites/UI/relojUI.png");

    }

    cargarAtlasComunes () {
        // Jugador
        this.load.atlas("spr_jugador", "Assets/Imagenes/Sprites/Personajes/Protagonista/spr_jugador.png", "Assets/Imagenes/Sprites/Personajes/Protagonista/spr_jugador_atlas.json");


        // Monedas
        this.load.atlas("spr_moneda_oro", "Assets/Imagenes/Sprites/Objetos/Recolectables/Monedas/spr_moneda_oro.png", "Assets/Imagenes/Sprites/Objetos/Recolectables/Monedas/spr_moneda_oro_atlas.json");
        this.load.atlas ("spr_monedaui", "Assets/Imagenes/Sprites/UI/spr_monedaui.png", "Assets/Imagenes/Sprites/UI/spr_monedaui_atlas.json")
        
    }

    cargarSonidosComunes() {
        this.load.audio ("sonidoSalto", "Assets/Sonidos/salto.ogg");
        this.load.audio("sonidoItem", "Assets/Sonidos/conseguirItem.ogg");
        this.load.audio("sonidoMoneda", "Assets/Sonidos/conseguirMoneda.ogg");
        this.load.audio("sonidoVida", "Assets/Sonidos/conseguirVida.ogg");
        this.load.audio("sonidoGameOver", "Assets/Sonidos/gameOver.ogg");
        this.load.audio("sonidoGolpeBloque", "Assets/Sonidos/golpearBloque.ogg");
        this.load.audio("sonidoMuerteEnemigo", "Assets/Sonidos/muerteEnemigo.ogg");
        this.load.audio("sonidoMuerteJugador", "Assets/Sonidos/muerteJugador.ogg");
        this.load.audio("sonidoVictoria", "Assets/Sonidos/victoria.ogg");

        this.load.audio("musicaFondo", "Assets/Sonidos/musicaFondo.ogg");
    }

    aniadirSonidosComunes () {
        this.sonidoItem = this.sound.add("sonidoItem");
        this.sonidoMoneda = this.sound.add("sonidoMoneda", {
            volume: 0.5,
        });
        this.sonidoVida = this.sound.add ("sonidoVida");
        this.sonidoGolpeBloque = this.sound.add("sonidoGolpeBloque", {
            volume:0.6,
        });
        this.sonidoMuerteEnemigo = this.sound.add("sonidoMuerteEnemigo");
        this.sonidoMuerteJugador = this.sound.add("sonidoMuerteJugador");
        this.musicaFondo = this.sound.add("musicaFondo", {
            loop: true,
            volume: 1,
        });
        this.musicaFondo.play();
    }

    // Creamos contadores de UI
    crearContadores() {
        // Organizados estructuralmente en pantalla
        this.UI.crearContadorMonedas(20, 20);
        this.UI.crearContadorTiempo(20, 50, this.tiempo);
        this.UI.crearContadorVidas(20, 80);
        
        this.UI.actualizarContadorTiempo(this.delay, this.tiempo);
    }

    /*********************** CONTROL CAMARA **********************/
    controlarCamara(jugador, mapa) {
        this.cameras.main.startFollow(jugador, true, 0.08, 0.08);

        this.cameras.main.setBounds(
            0, 0,
            mapa.widthInPixels,
            mapa.heightInPixels
        );

        this.physics.world.setBounds(
            0, 0,
            mapa.widthInPixels,
            mapa.heightInPixels + 500,
        );
    }

    // Creamos los objetos recolectables que están en todas las escenas
    crearRecolectablesComunes() {
        // Creamos grupos para luego recorrerlos
        this.grupoMonedas = this.physics.add.group();
        this.grupoOrbesVida = this.physics.add.group();

        this.objetosMoneda.forEach(recolectable => {
            let moneda = new Moneda (this, recolectable.x, recolectable.y);
            this.grupoMonedas.add(moneda);
        });
        this.objetosOrbesVida.forEach (recolectable => {
            let orbeVida = new OrbeVida (this, recolectable.x, recolectable.y);
            this.grupoOrbesVida.add(orbeVida);
        })
    }

    resetearRecolectables () {
        this.grupoMonedas.children.iterate (recolectable  => {
            recolectable.anims.stop();
            recolectable.enableBody (true, recolectable.posicionInicial.x, recolectable.posicionInicial.y, true, true);

            recolectable.play("spr_moneda_oro_girando", true);
        });
        this.grupoOrbesVida.children.iterate (recolectable  => {
            recolectable.enableBody(true, recolectable.posicionInicial.x, recolectable.posicionInicial.y, true, true);
        });
    }
    resetearTemporizador() {
        this.UI.temporizador.remove();
        this.tiempo = this.tiempoInicial;
        this.UI.textoTiempo.setText(this.tiempo);
        this.UI.actualizarContadorTiempo(this.delay);
    }

    respawnJugador (jugador) {
        jugador.setPosition(
            jugador.posicionInicial.x,
            jugador.posicionInicial.y
            );
            
        jugador.enableBody(true, jugador.posicionInicial.x, jugador.posicionInicial.y, true, true);
    }

            // Metodo para matar a los enemigos cuando saltamos encima de ellos
    matarEnemigos (jugador, enemigo) {
        // Si saltamos sobre el enemigo lo matamos
        if (jugador.body.velocity.y > 0 && jugador.body.bottom <= enemigo.body.top + 10) {
            this.sonidoMuerteEnemigo.play(); // Reproducimos el sonido al matar a un enemigo
            enemigo.disableBody(true, true); // Deshabilitamos al enemigo de la escena
            console.log ("Enemigo muerto");
            jugador.setVelocityY(-150); // Recibe un pequeño impulso al saltar sobre un enemigo
            this.UI.actualizarContadorMonedas(2); // Al matar a un enemigo aumenta el contador de monedas
        }
        else {
            this.morir(); // El jugador muere
        }
    }

    morir () {
        this.sonidoMuerteJugador.play();
        this.restarVidas();
        
    }

    restarVidas () {
        this.UI.actualizarContadorVidas(-1);
        if (this.UI.vidas > 0) {
            this.jugador.disableBody(true, false);
            this.resetearNivel();
            this.respawnJugador(this.jugador);
           
            this.musicaFondo.stop();
            this.time.delayedCall (100, () => {
                this.musicaFondo.play();
            })
        }
    }
    // Recolección de objetos
    recolectarMonedas(jugador, moneda) {
        this.sonidoMoneda.play();
        moneda.disableBody(true, true);
        this.UI.actualizarContadorMonedas(1);
    }

    recolectarVidas (jugador, orbeVida) {
        this.sonidoVida.play();
        orbeVida.disableBody(true, true);
        this.UI.actualizarContadorVidas(1);
    }

    mantenerMonedasYVidas(datos) {
        if (datos.monedas !== null && datos.monedas !== undefined) {
            this.UI.monedasRecolectadas = datos.monedas
        }
        else {
            this.UI.monedasRecolectadas = 0;
        }
        if (datos.vidas !== null && datos.vidas !== undefined) {
            this.UI.vidas = datos.vidas;
        }
        else {
            this.UI.vidas = this.UI.vidasIniciales;
        }
    }
}