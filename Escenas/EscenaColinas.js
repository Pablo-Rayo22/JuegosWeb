import Jugador from "../Scripts/Jugador.js";
import Caracol from "../Scripts/Caracol.js";
import GusanoAzul from "../Scripts/GusanoAzul.js";
import Sierra from "../Scripts/Sierra.js";
import PezAzul from "../Scripts/PezAzul.js";
import Moneda from "../Scripts/Moneda.js";
import OrbeVida from "../Scripts/OrbeVida.js";
import Joya from "../Scripts/Joya.js";
import Palanca from "../Scripts/Palanca.js";
import Trampolin from "../Scripts/Trampolin.js";
import UI from "../Scripts/UI.js";
export default class EscenaColinas extends Phaser.Scene {
    constructor() {
        super("EscenaColinas")
        // Variables 
        this.tiempo = 350;
        this.delay = 750;
    }

    init() { // Metodo para inicializar o instanciar cuando carga el juego y cada vez que se recarga este
        this.UI = new UI(this);
    }

    preload() {
        this.cargarImagenes();
        this.cargarSonidos();
    }

    create () {
        this.aniadirSonidos();
        this.crearFondo();
        this.crearMapa();
        this.crearJugador();
        this.crearEnemigos();
        this.crearRecolectables();
        this.crearInteractivos();
        this.crearColisiones();
        this.controlarCamara();
        this.crearContadores();
    }

    update() {
        this.jugador.update();
        this.arrayPalancas.forEach(palanca => palanca.update());
        this.arrayTrampolines.forEach(trampolin => trampolin.update());
    }

    cargarImagenes() {
        // Fondo
        this.load.image("colinas", "Assets/Imagenes/Fondos/colinas.png");

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

        // Pez azul
        this.load.image("pezAzul", "Assets/Imagenes/Sprites/Personajes/Enemigos/PezAzul/pezAzul.png");
        this.load.atlas("spr_pez_azul", "Assets/Imagenes/Sprites/Personajes/Enemigos/PezAzul/spr_pez_azul.png", "Assets/Imagenes/Sprites/Personajes/Enemigos/PezAzul/spr_pez_azul_atlas.json");

        // Agua
        this.load.image ("agua", "Assets/Imagenes/Sprites/Tileset/Agua/agua.png");
        this.load.atlas ("spr_agua", "Assets/Imagenes/Sprites/Tileset/Agua/spr_agua.png", "Assets/Imagenes/Sprites/Tileset/Agua/spr_agua_atlas.json");

        // Objetos recolectables
        // Monedas
        this.load.image("moneda", "Assets/Imagenes/Sprites/Objetos/Recolectables/Monedas/monedaOro.png");
        this.load.atlas("spr_moneda_oro", "Assets/Imagenes/Sprites/Objetos/Recolectables/Monedas/spr_moneda_oro.png", "Assets/Imagenes/Sprites/Objetos/Recolectables/Monedas/spr_moneda_oro_atlas.json");
        // Orbes vida
        this.load.image ("orbeVida", "Assets/Imagenes/Sprites/Objetos/Recolectables/OrbesVida/orbeVida.png");
        // Joya
        this.load.image ("joyaverde", "Assets/Imagenes/Sprites/Objetos/Recolectables/Joyas/joyaVerde.png")

        // Objetos interactivos
        // Palanca
        this.load.image("palanca", "Assets/Imagenes/Sprites/Objetos/Interactivos/Palanca/palanca.png");
        this.load.atlas("spr_palanca", "Assets/Imagenes/Sprites/Objetos/Interactivos/Palanca/spr_palanca.png", "Assets/Imagenes/Sprites/Objetos/Interactivos/Palanca/spr_palanca_atlas.json");

        // Mapa
        this.load.tilemapTiledJSON("mapa2", "Assets/Imagenes/Mapas/mapa2.tmj");
        
        //Tiles
        this.load.image("tilesheet", "Assets/Imagenes/Sprites/Tileset/tiles.png");
    }

    cargarSonidos() {
        this.load.audio("sonidoItem", "Assets/Sonidos/conseguirItem.ogg");
        this.load.audio("sonidoMoneda", "Assets/Sonidos/conseguirMoneda.ogg");
        this.load.audio("sonidoGameOver", "Assets/Sonidos/gameOver.ogg");
        this.load.audio("sonidoGolpeBloque", "Assets/Sonidos/golpearBloque.ogg");
        this.load.audio("sonidoMuerteEnemigo", "Assets/Sonidos/muerteEnemigo.ogg");
        this.load.audio("sonidoMuerteJugador", "Assets/Sonidos/muerteJugador.ogg");
        this.load.audio("sonidoVictoria", "Assets/Sonidos/victoria.ogg");
        this.load.audio("musicaFondo", "Assets/Sonidos/musicaFondo.ogg");
        this.load.audio ("sonidoPalanca", "Assets/Sonidos/palanca.ogg");
        this.load.audio("sonidoTrampolin", "Assets/Sonidos/trampolin.ogg");
    }

    aniadirSonidos() {
        this.sonidoItem = this.sound.add("sonidoItem");
        this.sonidoMoneda = this.sound.add("sonidoMoneda", {
            volume: 0.5,
        });
        this.sonidoGameOver = this.sound.add("sonidoGameOver");
        this.sonidoGolpeBloque = this.sound.add("sonidoGolpeBloque", {
            volume:0.6,
        });
        this.sonidoMuerteEnemigo = this.sound.add("sonidoMuerteEnemigo");
        this.sonidoMuerteJugador = this.sound.add("sonidoMuerteJugador");
        this.sonidoVictoria = this.sound.add("sonidoVictoria");
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

    crearFondo () {
        this.fondoColinas = this.add.image(0, 0, "colinas").setOrigin(0, 0).setScrollFactor(0);
        this.fondoColinas.setScale(
        this.scale.width / this.fondoColinas.width,
        this.scale.height / this.fondoColinas.height);
    }

    crearMapa() {
        this.mapa = this.make.tilemap({key: "mapa2"})
        this.hojaTiles = this.mapa.addTilesetImage("tiles", "tilesheet", 64, 64, 0 , 0);
        // Cargamos las capas de Tiled
        this.crearCapasTiles();
        this.crearCapasObjetos();
        this.tilesPeligros.setCollisionByExclusion([-1]);
        this.tilesSuelo.setCollisionByExclusion([-1]);
        this.tilesPlataformas.setCollisionByExclusion([-1]);
        this.tilesParedPinchos.setCollisionByExclusion([-1]);

    }

    crearCapasTiles() {
            this.tilesSuelo = this.mapa.createLayer ("suelo", this.hojaTiles, 0, 0);
            this.tilesPlataformas = this.mapa.createLayer ("plataformas", this.hojaTiles, 0, 0);
            this.tilesDecoracion = this.mapa.createLayer ("decoracion", this.hojaTiles, 0, 0);
            this.tilesAgua = this.mapa.createLayer ("agua", this.hojaTiles, 0, 0).setDepth(6);
            this.tilesPeligros = this.mapa.createLayer ("peligros", this.hojaTiles, 0, 0);
            this.tilesPlataformaJoya = this.mapa.createLayer("plataformaJoya", this.hojaTiles, 0, 0).setVisible(false); // Hacemos invisibles los tiles  
            this.tilesParedPinchos = this.mapa.createLayer("paredPinchos", this.hojaTiles, 0, 0). setVisible(false) // Hacemos invisibles los tiles
    }
    // Creamos las capas de objetos que vienen de Tiled
    crearCapasObjetos() {
        // Objetos enemigos
        this.objetosCaracol = this.mapa.getObjectLayer ("caracoles").objects;
        this.objetosGusanoAzul = this.mapa.getObjectLayer ("gusanosAzules").objects;
        this.objetosSierra = this.mapa.getObjectLayer ("sierras").objects;
        this.objetosPecesAzules = this.mapa.getObjectLayer ("pecesAzules").objects;
        // Objetos recolectables
        this.objetosJoya = this.mapa.getObjectLayer ("joya").objects
        this.objetosMoneda = this.mapa.getObjectLayer ("monedas").objects;
        this.objetosOrbesVida = this.mapa.getObjectLayer("orbesVida").objects;

        // Objetos interactivos
        this.objetosPalanca = this.mapa.getObjectLayer ("palancas").objects;
        this.objetosTrampolin = this.mapa.getObjectLayer ("trampolines").objects;
    }
    // Creamos al jugador en la escena
    crearJugador() {
        this.jugador = new Jugador (this, 2536 - 64, 460);
    }

    crearEnemigos() {
        this.grupoCaracoles = this.physics.add.group({runChildUpdate: true});
        this.grupoGusanosAzules = this.physics.add.group({runChildUpdate: true});
        this.grupoSierras = this.physics.add.group({runChildUpdate: true});
        this.grupoPecesAzules = this.physics.add.group({runChildUpdate: true});

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

        this.objetosPecesAzules.forEach(enemigo => {
            let pecesAzules = new PezAzul (this, enemigo.x, enemigo.y, this.jugador);
            this.grupoPecesAzules.add(pecesAzules);
        });
    }

    crearRecolectables() {
        // Creamos grupos para luego recorrerlos
        this.grupoJoyas = this.physics.add.group();
        this.grupoMonedas = this.physics.add.group();
        this.grupoOrbesVida = this.physics.add.group();

        this.objetosJoya.forEach(recolectable => {
            let joya = new Joya (this, recolectable.x, recolectable.y, "verde");
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
        })
    }

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

    crearContadores() {
        this.UI.crearContadorTiempo(20, 90, this.tiempo);
        this.UI.actualizarContadorTiempo(this.delay, this.tiempo);
        this.UI.crearContadorMonedas(750, 90);
    }

    /***************************** COLISONES **********************************/

    crearColisiones() {
        this.colisionesSuelo();
        this.colisionesPlataformas();
        this.colisionesPeligros();
        this.colisionesAgua();
        this.colisionesEnemigos();
        this.colisionesObjetosRecolectables();
        this.colisionesObjetosInteractivos();
    }

    colisionesSuelo () {
        this.physics.add.collider(this.jugador, this.tilesSuelo);
        this.physics.add.collider (this.grupoCaracoles, this.tilesSuelo);
        this.physics.add.collider (this.grupoGusanosAzules, this.tilesSuelo);
    }
    colisionesPlataformas () {
        this.physics.add.collider (this.jugador, this.tilesPlataformas, this.golpearBloque, null, this);
        this.physics.add.collider (this.jugador, this.tilesPlataformaJoya, this.golpearBloque, null, this);
        this.physics.add.collider (this.grupoCaracoles, this.tilesPlataformas, this.enemigosIA, null, this);
        this.physics.add.collider (this.grupoGusanosAzules, this.tilesPlataformas, this.enemigosIA, null, this);
    }

    colisionesPeligros () {
        this.physics.add.collider(this.jugador, this.tilesPeligros, this.morir, null, this);
        this.colliderParedPinchos = this.physics.add.collider(this.jugador, this.tilesParedPinchos, this.morir, null, this);
        this.physics.add.collider(this.grupoCaracoles, this.tilesPeligros, this.enemigosIA, null, this);
        this.physics.add.collider(this.grupoGusanosAzules, this.tilesPeligros, this.enemigosIA, null, this);

        // Desactivamos el collider
        this.colliderParedPinchos.active = false;


    }

    colisionesAgua () {
        this.physics.add.overlap (this.grupoPecesAzules, this.tilesAgua);
    }

    colisionesEnemigos () {
        // Colision jugador con enemigos
        this.physics.add.overlap (this.jugador, this.grupoCaracoles, this.matarEnemigos, null, this);
        this.physics.add.overlap (this.jugador, this.grupoGusanosAzules, this.matarEnemigos, null, this);
        this.physics.add.collider (this.jugador, this.grupoSierras, this.morir, null, this);
        this.physics.add.collider (this.jugador, this.grupoPecesAzules, this.morir, null, this);

        // Colision enemigos con enemigos
        this.physics.add.collider (this.grupoCaracoles, this.grupoCaracoles, this.enemigosIA, null, this);
        this.physics.add.collider (this.grupoCaracoles, this.grupoGusanosAzules, this.enemigosIA, null, this);
        this.physics.add.collider (this.grupoGusanosAzules, this.grupoGusanosAzules, this.enemigosIA, null, this);
        this.physics.add.collider (this.grupoPecesAzules, this.grupoPecesAzules, this.enemigosIA, null, this);
    }

    colisionesObjetosRecolectables () {
        this.physics.add.overlap (this.jugador, this.grupoMonedas, this.recolectarMonedas, null, this);
        this.physics.add.overlap (this.jugador, this.grupoJoyas, this.recolectarJoya, null, this);
    }

    colisionesObjetosInteractivos () {
        this.physics.add.overlap(this.jugador, this.arrayTrampolines, this.activarTrampolin, null, this);
        this.physics.add.collider(this.grupoCaracoles, this.arrayTrampolines);
        this.physics.add.collider(this.grupoGusanosAzules, this.arrayTrampolines);
    }

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
        this.mapa.heightInPixels
        );
    }

    recolectarMonedas(jugador, moneda) {
        this.sonidoMoneda.play();
        moneda.disableBody(true, true);
        this.UI.actualizarContadorMonedas(1);
    }

    recolectarJoya(jugador, joya) {
        this.musicaFondo.stop();
        joya.disableBody(true, true);
        this.sonidoItem.play({
            volume: 0.8,
        });
        this.time.delayedCall (1500, () => {
            this.sonidoVictoria.play();
            this.scene.pause();
        })
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
        this.musicaFondo.stop(); // Detenemos la musica
        this.reiniciarEscena();
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

    reiniciarEscena () {
        this.scene.restart();
    }

    activarPalanca() {
        this.tilesParedPinchos.setVisible(true); // Hacemos visibles los tiles
        this.colliderParedPinchos.active = true; // Activamos el collider
        this.arrayTrampolines.forEach(trampolin => {
            trampolin.setVisible(true); // Hacemos visible el trampolin
            trampolin.body.enable = true; // Habilitamos las fisicas del trampolin
        });
        this.tilesPlataformaJoya.setVisible(true) // Hacemos visible la plataforma de la joya y habilitamos la colision
        this.tilesPlataformaJoya.setCollisionByExclusion([-1]); // Habilitamos colision
        this.grupoJoyas.children.iterate(joya => {
            joya.setVisible(true); // Hacemos visible la joya
            joya.body.enable = true; // Activamos colision a la joya
        });
    }
    activarTrampolin(jugador, trampolin) {
        trampolin.activarTrampolin(jugador); // Llamamos al metodo de la clase Trampolin
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
}