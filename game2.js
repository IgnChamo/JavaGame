const bullets=[] //bullets in game
const enemies=[] //enemies in game
let enemySpeed = 0.2;
const enemySpeedOrig = 0.2;
let aceleracion = 0.2;
let explosionStartTime = null;
const explosionDuration = 250; // Duración de la explosión en milisegundos
let isExploding = false;



document.addEventListener('DOMContentLoaded', function () { //Set up canvas
    const app = new PIXI.Application({
        width: 1200,
        height: 800,
        backgroundColor: 0x000000,
        cursor: 'none'
    });

    document.body.appendChild(app.view);

    const loader = new PIXI.Loader();
    loader
        .add('idle_0', './img/iddle_0.png')
        .add('idle_1', './img/iddle_1.png')
        .add('idle_2', './img/iddle_2.png')
        .add('idle_3', './img/iddle_3.png')
        .add('idle_4', './img/iddle_4.png')
        .add('idle_5', './img/iddle_5.png')
        .add('idle_6', './img/iddle_6.png')
        .add('up_0', './img/up_0.png')
        .add('up_1', './img/up_1.png')
        .add('up_2', './img/up_2.png')
        .add('up_3', './img/up_3.png')
        .add('down_0', './img/down_0.png')
        .add('down_1', './img/down_1.png')
        .add('down_2', './img/down_2.png')
        .add('down_3', './img/down_3.png')
        .add('left_0', './img/left_0.png')
        .add('left_1', './img/left_1.png')
        .add('right_0', './img/right_0.png')
        .add('right_1', './img/right_1.png')
        .add('companion_0', './img/companion/companion0.png')
        .add('companion_1', './img/companion/companion1.png')
        .add('companion_2', './img/companion/companion2.png')
        .add('companion_3', './img/companion/companion3.png')
        .add('companion_4', './img/companion/companion4.png')
        .add('companion_5', './img/companion/companion5.png')
        .add('companion_6', './img/companion/companion6.png')
        .add('companion_7', './img/companion/companion7.png')
        .load(setup);

    function setup(loader, resources) {
        // Crear los arrays de texturas para las animaciones
        const idleTextures = [
            PIXI.Texture.from(resources.idle_0.url),
            PIXI.Texture.from(resources.idle_1.url),
            PIXI.Texture.from(resources.idle_2.url),
            PIXI.Texture.from(resources.idle_3.url),
            PIXI.Texture.from(resources.idle_4.url),
            PIXI.Texture.from(resources.idle_5.url),
            PIXI.Texture.from(resources.idle_6.url),
        ];

        const upTextures = [
            PIXI.Texture.from(resources.up_0.url),
            PIXI.Texture.from(resources.up_1.url),
            PIXI.Texture.from(resources.up_2.url),
            PIXI.Texture.from(resources.up_3.url),
        ];

        const downTextures = [
            PIXI.Texture.from(resources.down_0.url),
            PIXI.Texture.from(resources.down_1.url),
            PIXI.Texture.from(resources.down_2.url),
            PIXI.Texture.from(resources.down_3.url),
        ];

        const leftTextures = [
            PIXI.Texture.from(resources.left_0.url),
            PIXI.Texture.from(resources.left_1.url),
        ];

        const rightTextures = [
            PIXI.Texture.from(resources.right_0.url),
            PIXI.Texture.from(resources.right_1.url),
        ];

        const companionTextures = [
            PIXI.Texture.from(resources.companion_0.url),
            PIXI.Texture.from(resources.companion_1.url),
            PIXI.Texture.from(resources.companion_2.url),
            PIXI.Texture.from(resources.companion_3.url),
            PIXI.Texture.from(resources.companion_4.url),
            PIXI.Texture.from(resources.companion_5.url),
            PIXI.Texture.from(resources.companion_6.url),
            PIXI.Texture.from(resources.companion_7.url),
        ];

        // Crear las animaciones usando AnimatedSprite
        const idleAnimation = new PIXI.AnimatedSprite(idleTextures);
        const upAnimation = new PIXI.AnimatedSprite(upTextures);
        const downAnimation = new PIXI.AnimatedSprite(downTextures);
        const leftAnimation = new PIXI.AnimatedSprite(leftTextures);
        const rightAnimation = new PIXI.AnimatedSprite(rightTextures);
        const companionAnimation = new PIXI.AnimatedSprite(companionTextures);
const loader = new PIXI.Loader();
    loader
        .add('idle_0', './img/iddle_0.png')
        .add('idle_1', './img/iddle_1.png')
        .add('idle_2', './img/iddle_2.png')
        .add('idle_3', './img/iddle_3.png')
        .add('idle_4', './img/iddle_4.png')
        .add('idle_5', './img/iddle_5.png')
        .add('idle_6', './img/iddle_6.png')
        .add('up_0', './img/up_0.png')
        .add('up_1', './img/up_1.png')
        .add('up_2', './img/up_2.png')
        .add('up_3', './img/up_3.png')
        .add('down_0', './img/down_0.png')
        .add('down_1', './img/down_1.png')
        .add('down_2', './img/down_2.png')
        .add('down_3', './img/down_3.png')
        .add('left_0', './img/left_0.png')
        .add('left_1', './img/left_1.png')
        .add('right_0', './img/right_0.png')
        .add('right_1', './img/right_1.png')
        .add('companion_0', './img/companion/companion0.png')
        .add('companion_1', './img/companion/companion1.png')
        .add('companion_2', './img/companion/companion2.png')
        .add('companion_3', './img/companion/companion3.png')
        .add('companion_4', './img/companion/companion4.png')
        .add('companion_5', './img/companion/companion5.png')
        .add('companion_6', './img/companion/companion6.png')
        .add('companion_7', './img/companion/companion7.png')
        .load(setup);

    function setup(loader, resources) {
        // Crear los arrays de texturas para las animaciones
        const idleTextures = [
            PIXI.Texture.from(resources.idle_0.url),
            PIXI.Texture.from(resources.idle_1.url),
            PIXI.Texture.from(resources.idle_2.url),
            PIXI.Texture.from(resources.idle_3.url),
            PIXI.Texture.from(resources.idle_4.url),
            PIXI.Texture.from(resources.idle_5.url),
            PIXI.Texture.from(resources.idle_6.url),
        ];

        const upTextures = [
            PIXI.Texture.from(resources.up_0.url),
            PIXI.Texture.from(resources.up_1.url),
            PIXI.Texture.from(resources.up_2.url),
            PIXI.Texture.from(resources.up_3.url),
        ];

        const downTextures = [
            PIXI.Texture.from(resources.down_0.url),
            PIXI.Texture.from(resources.down_1.url),
            PIXI.Texture.from(resources.down_2.url),
            PIXI.Texture.from(resources.down_3.url),
        ];

        const leftTextures = [
            PIXI.Texture.from(resources.left_0.url),
            PIXI.Texture.from(resources.left_1.url),
        ];

        const rightTextures = [
            PIXI.Texture.from(resources.right_0.url),
            PIXI.Texture.from(resources.right_1.url),
        ];

        const companionTextures = [
            PIXI.Texture.from(resources.companion_0.url),
            PIXI.Texture.from(resources.companion_1.url),
            PIXI.Texture.from(resources.companion_2.url),
            PIXI.Texture.from(resources.companion_3.url),
            PIXI.Texture.from(resources.companion_4.url),
            PIXI.Texture.from(resources.companion_5.url),
            PIXI.Texture.from(resources.companion_6.url),
            PIXI.Texture.from(resources.companion_7.url),
        ];

        // Crear las animaciones usando AnimatedSprite
        const idleAnimation = new PIXI.AnimatedSprite(idleTextures);
        const upAnimation = new PIXI.AnimatedSprite(upTextures);
        const downAnimation = new PIXI.AnimatedSprite(downTextures);
        const leftAnimation = new PIXI.AnimatedSprite(leftTextures);
        const rightAnimation = new PIXI.AnimatedSprite(rightTextures);
        const companionAnimation = new PIXI.AnimatedSprite(companionTextures);
        // Configuración inicial del jugador (idle por defecto)
        let player = idleAnimation;
        let companion = companionAnimation
        let crossair = PIXI.Sprite.from('./img/Crossair/Crossair.png');
        score = 0;
        life = 999999;
        invencible = false;
        player.x = app.screen.width / 2;
        player.y = app.screen.height / 2;
        player.anchor.set(0.5);
        companion.anchor.set(0.5);
        crossair.anchor.set(0.5);
        companion.x = player.x - 10;
        companion.y = player.y - 10;
        player.animationSpeed = 0.2; // Velocidad de la animación
        companion.animationSpeed = 0.1;
        player.play(); // Reproduce la animación
        companion.play();
        app.stage.addChild(player);//agrego personaje y compañero
        app.stage.addChild(companion);
        app.stage.addChild(crossair); //add crossair

        app.stage.interactive = true; //Set stage as interactable

        //crossair movement
        app.stage.on("pointermove", (event) => moveCrossair(crossair, event));
        
        //shoot on click
        app.stage.on("pointerdown", (event) => shootBulletOnClick(companion,crossair,event, app))

        
    }
}
