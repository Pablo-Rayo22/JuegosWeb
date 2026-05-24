import Jugador from "../Scripts/Jugador.js";
import Caracol from "../Scripts/Caracol.js";
import GusanoAzul from "../Scripts/GusanoAzul.js";
import PezAzul from "../Scripts/PezAzul.js";
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
        this.crearColisiones();
        this.controlarCamara();
        this.crearContadores();
    }

    update() {
        this.jugador.update();
    }

    cargarImagenes() {
        // Fondo
        this.load.image("colinas", "Assets/Imagenes/Fondos/colinas.png");

        // Jugador
        this.load.image("jugador", "Assets/Imagenes/Sprites/Personajes/Protagonista/protagonista.png");
        this.load.atlas("spr_jugador", "Assets/Imagenes/Sprites/Personajes/Protagonista/spr_jugador.png", "Assets/Imagenes/Sprites/Personajes/Protagonista/spr_jugador_atlas.json")

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
        // this.sonidoPalanca = this.sound.add ("sonidoPalanca", {
        //     volume: 1,
        // });
        //this.sonidoTrampolin = this.sound.add ("sonidoTrampolin");
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
        //this.tilesPeligros.setCollisionByExclusion([-1]);
        this.tilesSuelo.setCollisionByExclusion([-1]);
        this.tilesPlataformas.setCollisionByExclusion([-1]);

    }

    crearCapasTiles() {
            this.tilesSuelo = this.mapa.createLayer ("suelo", this.hojaTiles, 0, 0);
            this.tilesPlataformas = this.mapa.createLayer ("plataformas", this.hojaTiles, 0, 0);
            this.tilesDecoracion = this.mapa.createLayer ("decoracion", this.hojaTiles, 0, 0);
            this.tilesAgua = this.mapa.createLayer ("agua", this.hojaTiles, 0, 0).setDepth(6);;
            //this.tilesPeligros = this.mapa.createLayer ("peligros", this.hojaTiles, 0, 0);
            //this.tilesPuente = this.mapa.createLayer ("puente", this.hojaTiles, 0, 0).setVisible(false); // Hacemos invisibles los tiles
            //this.tilesPuente.setCollision(false); // Deshabilitamos las colisiones
            //this.tilesPinchosPuente = this.mapa.createLayer("pinchosPuente", this.hojaTiles, 0, 0).setVisible(false); // Hacemos invisibles los tiles
            this.tilesPlataformaJoya = this.mapa.createLayer("plataformaJoya", this.hojaTiles, 0, 0).setVisible(false); // Hacemos invisibles los tiles  
    }
    // Creamos las capas de objetos que vienen de Tiled
    crearCapasObjetos() {
        // Objetos enemigos
        this.objetosCaracol = this.mapa.getObjectLayer ("caracoles").objects;
        this.objetosGusanoAzul = this.mapa.getObjectLayer ("gusanosAzules").objects;
        this.objetosPecesAzules = this.mapa.getObjectLayer ("pecesAzules").objects;
        // Objetos recolectables
        this.objetosJoya = this.mapa.getObjectLayer ("joya").objects;
        this.objetosMoneda = this.mapa.getObjectLayer ("monedas").objects;
        // Objetos interactivos
        //this.objetosPalanca = this.mapa.getObjectLayer ("palancas").objects;
        //this.objetosTrampolin = this.mapa.getObjectLayer ("trampolines").objects;
    }
    // Creamos al jugador en la escena
    crearJugador() {
        this.jugador = new Jugador (this, 2600, 530);
    }

    crearEnemigos() {
        this.grupoCaracoles = this.physics.add.group({runChildUpdate: true});
        this.grupoGusanosAzules = this.physics.add.group({runChildUpdate: true});
        this.grupoPecesAzules = this.physics.add.group({runChildUpdate: true});

        this.objetosCaracol.forEach(enemigo => {
            let caracol = new Caracol (this, enemigo.x, enemigo.y, this.jugador);
            this.grupoCaracoles.add(caracol);
        });
        this.objetosGusanoAzul.forEach(enemigo => {
            let gusanoAzul = new GusanoAzul (this, enemigo.x, enemigo.y, this.jugador);
            this.grupoGusanosAzules.add(gusanoAzul)
        });
        this.objetosPecesAzules.forEach(enemigo => {
            let pecesAzules = new PezAzul (this, enemigo.x, enemigo.y, this.jugador);
            this.grupoPecesAzules.add(pecesAzules);
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
        this.colisionesAgua();
        this.colisionesEnemigos();
    }

    colisionesSuelo () {
        this.physics.add.collider(this.jugador, this.tilesSuelo);
        this.physics.add.collider (this.grupoCaracoles, this.tilesSuelo);
        this.physics.add.collider (this.grupoGusanosAzules, this.tilesSuelo);
        this.physics.add.collider (this.grupoPecesAzules, this.tilesSuelo);
    }
    colisionesPlataformas () {
        this.physics.add.collider (this.jugador, this.tilesPlataformas, this.golpearBloque, null, this);
        this.physics.add.collider (this.grupoCaracoles, this.tilesPlataformas);
        this.physics.add.collider (this.grupoGusanosAzules, this.tilesPlataformas);

    }
    colisionesAgua () {
        this.physics.add.collider (this.grupoPecesAzules, this.tilesAgua);
    }

    colisionesEnemigos () {
        this.physics.add.overlap (this.jugador, this.grupoCaracoles, this.matarEnemigos, null, this);
        this.physics.add.overlap (this.jugador, this.grupoGusanosAzules, this.matarEnemigos, null, this);
        this.physics.add.collider (this.jugador, this.grupoPecesAzules, this.morir, null, this);
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
    // Metodo para matar a los enemigos cuando saltamos encima de ellos
    matarEnemigos (jugador, enemigo) {
        // Si saltamos sobre el enemigo lo matamos
        if (jugador.body.velocity.y > 0 && jugador.body.bottom <= enemigo.body.top + 10) {
            this.sonidoMuerteEnemigo.play(); // Reproducimos el sonido al matar a un enemigo
            enemigo.disableBody(true, true); // Deshabilitamos al enemigo de la escena
            console.log ("Enemigo muerto");
            jugador.setVelocityY(-150); // Recibe un pequeño impulso al saltar sobre un enemigo
            this.UI.actualizarContadorMonedas(5); // Al matar a un enemigo aumenta el contador de monedas
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
}