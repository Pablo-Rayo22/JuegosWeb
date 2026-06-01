import Jugador from "../Scripts/Jugador.js";
import Joya from "../Scripts/Joya.js";
import Moneda from "../Scripts/Moneda.js";
import OrbeVida from "../Scripts/OrbeVida.js";
import Caracol from "../Scripts/Caracol.js";
import GusanoAzul from "../Scripts/GusanoAzul.js";
import Sierra from "../Scripts/Sierra.js";
import Palanca from "../Scripts/Palanca.js";
import Trampolin from "../Scripts/Trampolin.js";
import UI from "../Scripts/UI.js";
import GameOver from "./EscenaGameOver.js";

// export default es para poder importar la clase en otros ficheros .js
export default class EscenaArboles extends Phaser.Scene { // Escena 1
    // Metodos
    constructor() {
        super("escenaArboles");

        // Variables
        this.tiempoInicial = 350;
        this.tiempo = this.tiempoInicial; // Tiempo de la escena
        this.delay = 750; // Cada cuantos milisegundos disminuye una unidad de tiempo
    }
    
    init() { // Metodo para inicializar o instanciar cuando carga el juego y cada vez que se recarga este
        this.UI = new UI(this);
        this.gameOver = new GameOver ();
    }
    
    // Precarga de recursos
    preload() {
       this.cargarImagenes();
       this.cargarSonidos();
    }
    
    // Creamos recursos
    create() {
        this.aniadirSonidos();
        this.crearFondo();
        this.crearMapa();
        this.crearJugador();
        this.crearEnemigos();
        this.crearRecolectables();
        this.crearInteractivos();
        this.crearContadores();
        this.crearColisiones();
        this.controlarCamara();
    }
    
    // Actualizamos el juegos 60 veces por segundo
    update() {
        this.jugador.update();
        this.arrayPalancas.forEach(palanca => palanca.update());
        this.arrayTrampolines.forEach(trampolin => trampolin.update());

        if (this.jugador.y > this.mapa.heightInPixels + 200) {
            this.morir();
        }
    }
    
    // Cargamos las imagenes del juego
    cargarImagenes() {
        // Fondo
        this.load.image("arboles", "Assets/Imagenes/Fondos/arboles.png");     

        // Jugador
        this.load.image("jugador", "Assets/Imagenes/Sprites/Personajes/Protagonista/protagonista.png");
        this.load.atlas("spr_jugador", "Assets/Imagenes/Sprites/Personajes/Protagonista/spr_jugador.png", "Assets/Imagenes/Sprites/Personajes/Protagonista/spr_jugador_atlas.json")

        // Enemigos
        // Caracol
        this.load.image("caracol", "Assets/Imagenes/Sprites/Personajes/Enemigos/Caracol/caracol.png");
        this.load.atlas("spr_caracol", "Assets/Imagenes/Sprites/Personajes/Enemigos/Caracol/spr_caracol.png", "Assets/Imagenes/Sprites/Personajes/Enemigos/Caracol/spr_caracol_atlas.json");
        // Gusano azul
        this.load.image("gusanoAzul", "Assets/Imagenes/Sprites/Personajes/Enemigos/GusanoAzul/gusanoAzul.png");
        this.load.atlas("spr_gusano_azul", "Assets/Imagenes/Sprites/Personajes/Enemigos/GusanoAzul/spr_gusano_azul.png", "Assets/Imagenes/Sprites/Personajes/Enemigos/GusanoAzul/spr_gusano_azul_atlas.json");
        // Sierra
        this.load.image("sierra", "Assets/Imagenes/Sprites/Personajes/Enemigos/Sierra/sierra.png");
        this.load.atlas("spr_sierra", "Assets/Imagenes/Sprites/Personajes/Enemigos/Sierra/spr_sierra.png", "Assets/Imagenes/Sprites/Personajes/Enemigos/Sierra/spr_sierra_atlas.json");

        // Objetos recolectables
        // Joyas
        this.load.image("joyaAzul", "Assets/Imagenes/Sprites/Objetos/Recolectables/Joyas/joyaAzul.png");
        // Monedas
        this.load.image("moneda", "Assets/Imagenes/Sprites/Objetos/Recolectables/Monedas/monedaOro.png");
        this.load.atlas("spr_moneda_oro", "Assets/Imagenes/Sprites/Objetos/Recolectables/Monedas/spr_moneda_oro.png", "Assets/Imagenes/Sprites/Objetos/Recolectables/Monedas/spr_moneda_oro_atlas.json");
        // Orbes vida
        this.load.image ("orbeVida", "Assets/Imagenes/Sprites/Objetos/Recolectables/OrbesVida/orbeVida.png");

        // Objetos interactivos
        // Palanca
        this.load.image("palanca", "Assets/Imagenes/Sprites/Objetos/Interactivos/Palanca/palanca.png");
        this.load.atlas("spr_palanca", "Assets/Imagenes/Sprites/Objetos/Interactivos/Palanca/spr_palanca.png", "Assets/Imagenes/Sprites/Objetos/Interactivos/Palanca/spr_palanca_atlas.json");
        // Trampolin
        this.load.image("trampolin", "Assets/Imagenes/Sprites/Objetos/Interactivos/Trampolin/trampolin.png");
        this.load.atlas("spr_trampolin", "Assets/Imagenes/Sprites/Objetos/Interactivos/Trampolin/trampolin.png", "Assets/Imagenes/Sprites/Objetos/Interactivos/Trampolin/spr_trampolin_atlas.json");
        
        // Mapa
        this.load.tilemapTiledJSON("mapa", "Assets/Imagenes/Mapas/mapa.tmj");
        
        // Tiles
        this.load.image("tilesheet", "Assets/Imagenes/Sprites/Tileset/tiles.png");

        // Carga de la textura para los elementos visuales de vida de la UI
        this.load.image("spr_vida_icono", "Assets/Imagenes/Sprites/UI/Heart1.png");
    }

    // Cargamos los sonidos del juego
    cargarSonidos() {
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
        this.load.audio ("sonidoPalanca", "Assets/Sonidos/palanca.ogg");
        this.load.audio("sonidoTrampolin", "Assets/Sonidos/trampolin.ogg");
        this.load.audio ("sonidoClicBoton", "Assets/Sonidos/clicBoton.ogg")
    }

    // Añadimos sonidos al juego
    aniadirSonidos() {
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
        this.sonidoPalanca = this.sound.add ("sonidoPalanca", {
            volume: 1,
        });
        this.sonidoTrampolin = this.sound.add ("sonidoTrampolin");
        this.musicaFondo.play();
    }

    // Creamos el fondo
    crearFondo () {
        this.fondoArboles = this.add.image(0, 0, "arboles").setOrigin(0, 0).setScrollFactor(0);
        this.fondoArboles.setScale(
        this.scale.width / this.fondoArboles.width,
        this.scale.height / this.fondoArboles.height);
    }

    // Creamos el mapa de Tiled
    crearMapa() {
        this.mapa = this.make.tilemap({key: "mapa"})
        this.hojaTiles = this.mapa.addTilesetImage("tiles", "tilesheet", 64, 64, 0 , 0);
        // Cargamos las capas de Tiled
        this.crearCapasTiles();
        this.crearCapasObjetos();
        this.tilesPlataformas.setCollisionByExclusion([-1]);
        this.tilesPeligros.setCollisionByExclusion([-1]);
        this.tilesSuelo.setCollisionByExclusion([-1]);
    }

    // Creamos las capas de patrones que vienen de Tiled
    crearCapasTiles() {
        this.tilesSuelo = this.mapa.createLayer ("suelo", this.hojaTiles, 0, 0);
        this.tilesPlataformas = this.mapa.createLayer ("plataformas", this.hojaTiles, 0, 0);
        this.tilesDecoracion = this.mapa.createLayer ("decoracion", this.hojaTiles, 0, 0);
        this.tilesPeligros = this.mapa.createLayer ("peligros", this.hojaTiles, 0, 0);
        this.tilesPuente = this.mapa.createLayer ("puente", this.hojaTiles, 0, 0).setVisible(false); // Hacemos invisibles los tiles
        this.tilesPuente.setCollision(false); // Deshabilitamos las colisiones
        this.tilesPinchosPuente = this.mapa.createLayer("pinchosPuente", this.hojaTiles, 0, 0).setVisible(false); // Hacemos invisibles los tiles
        this.tilesPlataformaJoya = this.mapa.createLayer("plataformaJoya", this.hojaTiles, 0, 0).setVisible(false); // Hacemos invisibles los tiles
    }

    // Creamos las capas de objetos que vienen de Tiled
    crearCapasObjetos() {
        // Objetos enemigos
        this.objetosCaracol = this.mapa.getObjectLayer ("caracoles").objects;
        this.objetosGusanoAzul = this.mapa.getObjectLayer ("gusanosAzules").objects;
        this.objetosSierra = this.mapa.getObjectLayer ("sierras").objects;
        // Objetos recolectables
        this.objetosJoya = this.mapa.getObjectLayer ("joya").objects;
        this.objetosMoneda = this.mapa.getObjectLayer ("monedas").objects;
        this.objetosOrbesVida = this.mapa.getObjectLayer("orbesVida").objects;
        // Objetos interactivos
        this.objetosPalanca = this.mapa.getObjectLayer ("palancas").objects;
        this.objetosTrampolin = this.mapa.getObjectLayer ("trampolines").objects;
    }

    // Creamos al jugador en la escena
    crearJugador() {
        this.jugador = new Jugador (this, 130, 530);
    }

    // Creamos los enemigos
    crearEnemigos() {
        this.grupoCaracoles = this.physics.add.group({runChildUpdate: true});
        this.grupoGusanosAzules = this.physics.add.group({runChildUpdate: true});
        this.grupoSierras = this.physics.add.group({runChildUpdate: true});

        this.objetosCaracol.forEach(enemigo => {
            let caracol = new Caracol (this, enemigo.x, enemigo.y, this.jugador);
            this.grupoCaracoles.add(caracol);
        });
        this.objetosGusanoAzul.forEach(enemigo => {
            let gusanoAzul = new GusanoAzul (this, enemigo.x, enemigo.y, this.jugador);
            this.grupoGusanosAzules.add(gusanoAzul)
        });
        this.objetosSierra.forEach(enemigo => {
            let sierra = new Sierra (this, enemigo.x, enemigo.y);
            this.grupoSierras.add(sierra);
        });
    }

    // Creamos los objetos recolectables
    crearRecolectables() {
        // Creamos grupos para luego recorrerlos
        this.grupoJoyas = this.physics.add.group();
        this.grupoMonedas = this.physics.add.group();
        this.grupoOrbesVida = this.physics.add.group();

        this.objetosJoya.forEach(recolectable => {
            let joya = new Joya (this, recolectable.x, recolectable.y, "Azul");
            this.grupoJoyas.add(joya);
            joya.setVisible(false); // Ocultamos la joya
            joya.body.enable = false; // Quitamos colision a la joya
        });
        this.objetosMoneda.forEach(recolectable => {
            let moneda = new Moneda (this, recolectable.x, recolectable.y);
            this.grupoMonedas.add(moneda);
        });
        this.objetosOrbesVida.forEach (recolectable => {
            let orbeVida = new OrbeVida (this, recolectable.x, recolectable.y);
            this.grupoOrbesVida.add(orbeVida);
        })
    }

    // Creamos los objetos interactivos
    crearInteractivos () {
        // Creamos arrays para luego recorrerlos
        this.arrayPalancas = [];
        this.arrayTrampolines = [];
        this.objetosPalanca.forEach(interactivo => {
            let palanca = new Palanca (this, interactivo.x, interactivo.y, this.jugador);
            this.arrayPalancas.push(palanca);
        });
        this.objetosTrampolin.forEach(interactivo => {
            let trampolin = new Trampolin (this, interactivo.x, interactivo.y, this.jugador);
            this.arrayTrampolines.push(trampolin);
            trampolin.setVisible(false); // Ocultamos el trampolin
            trampolin.body.enable = false; // Deshabilitamos las fisicas
        });
    }

    // Creamos contadores de UI
    crearContadores() {
        // Organizados estructuralmente en pantalla
        this.UI.crearContadorMonedas(20, 20);
        this.UI.crearContadorTiempo(20, 50, this.tiempo);
        this.UI.crearContadorVidas(20, 80);
        
        this.UI.actualizarContadorTiempo(this.delay, this.tiempo);
    }

    /************************ COLISIONES ***********************/
    crearColisiones() {
        this.colisionesSuelo();
        this.colisionesPlataformas();
        this.colisionesPeligros();
        this.colisionesEnemigos();
        this.colisionesObjetosRecolectables();     
        this.colisionesObjetosInteractivos();
    }

    // Colisiones con suelo
    colisionesSuelo() {
        this.physics.add.collider(this.jugador, this.tilesSuelo);
        this.physics.add.collider(this.grupoCaracoles, this.tilesSuelo);
        this.physics.add.collider(this.grupoGusanosAzules, this.tilesSuelo);
    }

    // Colisiones con plataformas
    colisionesPlataformas() {
        this.physics.add.collider (this.jugador, this.tilesPlataformas, this.golpearBloque, null, this);
        this.physics.add.collider(this.jugador, this.tilesPlataformaJoya);
        this.physics.add.collider(this.grupoJoyas, this.tilesPlataformas);
        this.physics.add.collider(this.jugador, this.tilesPuente);
        this.physics.add.collider(this.grupoCaracoles, this.tilesPuente);
        this.physics.add.collider(this.grupoGusanosAzules, this.tilesPuente);
        this.physics.add.collider(this.grupoCaracoles, this.tilesPlataformas, (enemigo) => this.enemigosIA(enemigo), null, this);
        this.physics.add.collider(this.grupoGusanosAzules, this.tilesPlataformas, (enemigo) => this.enemigosIA(enemigo), null, this);
    }

    // Colisiones con peligros
    colisionesPeligros() {
        this.physics.add.collider(this.jugador, this.tilesPeligros, this.morir, null, this);
        this.physics.add.collider(this.jugador, this.tilesPinchosPuente, this.morir, null, this);

        this.physics.add.collider(this.grupoCaracoles, this.tilesPinchosPuente, (enemigo) => this.enemigosIA(enemigo), null, this);
        this.physics.add.collider(this.grupoGusanosAzules, this.tilesPinchosPuente, (enemigo) => this.enemigosIA(enemigo), null, this);
    }

    // Colisiones con enemigos
    colisionesEnemigos() {
        this.physics.add.collider(this.grupoCaracoles, this.grupoGusanosAzules);
        this.physics.add.overlap(this.jugador, this.grupoCaracoles, this.matarEnemigos, null, this);
        this.physics.add.overlap(this.jugador, this.grupoGusanosAzules, this.matarEnemigos, null, this);
        this.physics.add.overlap (this.jugador, this.grupoSierras, this.morir, null, this);
    }

    // Colisiones con objetos recolectables
    colisionesObjetosRecolectables () {    
        this.physics.add.overlap(this.jugador, this.grupoJoyas, this.recolectarJoya, null, this); 
        this.physics.add.overlap(this.jugador, this.grupoMonedas, this.recolectarMonedas, null, this);
        this.physics.add.overlap (this.jugador, this.grupoOrbesVida, this.recolectarVidas, null, this);
    }

    // Colisiones con objetos interactivos
    colisionesObjetosInteractivos() {
        this.physics.add.overlap(this.jugador, this.arrayTrampolines, this.activarTrampolin, null, this);
        this.physics.add.collider(this.grupoCaracoles, this.arrayTrampolines);
        this.physics.add.collider(this.grupoGusanosAzules, this.arrayTrampolines);
    }

    /*********************** CONTROL CAMARA **********************/
    controlarCamara() {
        this.cameras.main.startFollow(this.jugador, true, 0.08, 0.08);
        this.cameras.main.setBounds(
            0,
            0,
            this.mapa.widthInPixels,
            this.mapa.heightInPixels
        );
        this.physics.world.setBounds( // Fijamos los límites del mundo físico
        0,
        0,
        this.mapa.widthInPixels,
        this.mapa.heightInPixels + 500
        );
    }

    // Recolección de objetos
    recolectarJoya(jugador, joya) {
        joya.disableBody(true, true); // Deshabilitamos la joya
        this.musicaFondo.stop(); // Detenemos la musica
        // Reproducimos los sonidos
        this.sonidoItem.play( {
            volume: 0.8,
        }) 
        this.time.delayedCall (300, () =>{
            this.scene.start("escenaColinas"); 
        })
    }

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

    // Metodo para matar a los enemigos cuando saltamos encima de ellos
    matarEnemigos (jugador, enemigo) {
        // Si saltamos sobre el enemigo lo matamos
        if (jugador.body.velocity.y > 0 && jugador.body.bottom <= enemigo.body.top + 10) {
            this.sonidoMuerteEnemigo.play(); // Reproducimos el sonido al matar a un enemigo
            enemigo.disableBody(true, true); // Deshabilitamos al enemigo de la escena
            console.log ("Enemigo muerto");
            jugador.setVelocityY(-150); // Recibe un pequeño impulso al saltar sobre un enemigo
            this.UI.actualizarContadorMonedas(3); // Al matar a un enemigo aumenta el contador de monedas
        }
        else {
            this.morir(); // El jugador muere
        }
    }

    // Metodo para controlar la logica de morir del jugador
    morir() {
        this.sonidoMuerteJugador.play(); // Reproducimos el sonido cuando el jugador muere
        this.restarVidas();
    }

    // Golpear bloques
    golpearBloque(jugador, tile) {
        let golpe = false; // Variable para controlar si ya hemos activado el bloque de monedas
        const tipo = tile.properties?.tipo;
        if (!tile.properties) {
            return;
        }
        if (tile.properties.golpeado) {
            return; // evita que se active de nuevo
        }
        this.sonidoGolpeBloque.play();
        if (tipo === "bloque_moneda") { // Propiedad en tiled
            console.log("Bloque activado");
            tile.properties.golpeado = true; // Propiedad en tiled
            this.activarBloqueMoneda(tile);
            this.UI.actualizarContadorMonedas(1);
        }
    }

    activarBloqueMoneda(tile) {
        this.tilesPlataformas.putTileAt(
        2, // Corresponde al segundo tile que esta en la tilesheet empezando por arriba y siguiendo de izquierda a derecha.
        tile.x,
        tile.y
        );
        this.tilesPlataformas.setCollisionByExclusion([-1]); // Activamos la colision del nuevo bloque
    }

    activarPalanca() {
        this.tilesPuente.setVisible(true); // Hacemos visible el puente
        this.tilesPuente.setCollisionByExclusion([-1]); // Habilitamos las fisicas del puente
        this.tilesPinchosPuente.setVisible(true); // Hacemos visible los pinchos del puente
        this.tilesPinchosPuente.setCollisionByExclusion([-1]); // Habilitamos las fisicas de los pinchos del puente
        this.arrayTrampolines.forEach(trampolin => {
            trampolin.setVisible(true); // Hacemos visible el trampolin
            trampolin.body.enable = true; // Habilitamos las fisicas del trampolin
        });
        this.tilesPlataformaJoya.setVisible(true); // Hacemos visible la plataforma de la joya
        this.tilesPlataformaJoya.setCollisionByExclusion([-1]); // Habilitamos colision
        this.grupoJoyas.children.iterate(joya => {
            joya.setVisible(true); // Hacemos visible la joya
            joya.body.enable = true; // Activamos colision a la joya
        });
    }

    activarTrampolin(jugador, trampolin) {
        trampolin.activarTrampolin(jugador); // Llamamos al metodo de la clase Trampolin
    }

    restarVidas () {
        this.UI.actualizarContadorVidas(-1);
        if (this.UI.vidas > 0) {
            this.jugador.disableBody(true, false);
            this.resetearNivel();
            this.jugador.setPosition(
            this.jugador.posicionInicial.x,
            this.jugador.posicionInicial.y
            );
            
            this.jugador.enableBody(true, this.jugador.posicionInicial.x, this.jugador.posicionInicial.y, true, true);
            this.musicaFondo.stop();
            this.time.delayedCall (100, () => {
                this.musicaFondo.play();
            })
        }
    }

   enemigosIA(enemigo) {
        if (enemigo.body.blocked.left || enemigo.body.blocked.right) { // Si el enemigo está siendo bloqueado por algo lateralmente
            // Invertimos la dirección lógica del enemigo
            enemigo.direccion *= -1;
            
            // Cambiamos la velocidad del enemigo cuando choca con algo
            enemigo.body.setVelocityX(enemigo.velocidadEjeX * enemigo.direccion);
            
            // Cambiamos la dirección del sprite del enemigo para que mire en la dirección correcta
            enemigo.setFlipX(enemigo.direccion < 0);   
        }
    }

    resetearNivel () {
        this.resetearTemporizador();
        this.resetearEnemigos();
        this.resetarRecolectables();
        this.resetearPalanca();
    }

    resetearEnemigos () {
        this.grupoCaracoles.children.iterate(enemigo => {
            enemigo.enableBody(true, enemigo.posicionInicial.x, enemigo.posicionInicial.y, true, true);
        });
        this.grupoGusanosAzules.children.iterate (enemigo  => {
            enemigo.enableBody(true, enemigo.posicionInicial.x, enemigo.posicionInicial.y, true, true);
        });
    }
    resetarRecolectables () {
        this.grupoMonedas.children.iterate (recolectable  => {
            recolectable.anims.stop();
            recolectable.enableBody (true, recolectable.posicionInicial.x, recolectable.posicionInicial.y, true, true);

            recolectable.play("spr_moneda_oro_girando", true);
        });
        this.grupoOrbesVida.children.iterate (recolectable  => {
            recolectable.enableBody(true, recolectable.posicionInicial.x, recolectable.posicionInicial.y, true, true);
        });
    }
    resetearPalanca() {
        this.tilesPuente.setVisible(false); // Hacemos invisible el puente
        this.tilesPuente.setCollisionByExclusion([-1], false); // Deshabilitamos las fisicas del puente
        this.tilesPinchosPuente.setVisible(false); // Hacemos invisible los pinchos del puente
        this.tilesPinchosPuente.setCollisionByExclusion([-1], false); // Deshabilitamos las fisicas de los pinchos del puente
        this.arrayTrampolines.forEach(trampolin => {
            trampolin.setVisible(false); // Hacemos invisible el trampolin
            trampolin.body.enable = false; // Deshabilitamos las fisicas del trampolin
        });
        this.tilesPlataformaJoya.setVisible(false); // Hacemos invisible la plataforma de la joya
        this.tilesPlataformaJoya.setCollisionByExclusion([-1], false); // Deshabilitamos colision
        this.grupoJoyas.children.iterate(joya => {
            joya.setVisible(false); // Hacemos invisible la joya
            joya.body.enable = false; // Desactivamos colision a la joya
        });
        this.arrayPalancas.forEach (interactivo => {
            interactivo.anims.stop();
            interactivo.setFrame ("spr_palanca_inactiva1");
            interactivo.activo = false;
        })
    }
    resetearTemporizador() {
        this.UI.temporizador.remove();
        this.tiempo = this.tiempoInicial;
        this.UI.textoTiempo.setText("Tiempo: " + this.tiempo);
        this.UI.actualizarContadorTiempo(this.delay);
    }
}