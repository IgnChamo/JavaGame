document.addEventListener('DOMContentLoaded', function () {
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
        app.stage.addChild(crossair);

        //add crossair

        // Enable interactivity!
        app.stage.interactive = true;

        app.stage.on("pointermove", moveCrossair);
        // Escuchar el clic izquierdo para disparar una bala
        app.stage.on("pointerdown", shootBulletOnClick);
        const bullets = [];

        function shootBulletOnClick(e) {
            if (bullets.length < 5) {
                // Obtener la posición actual del crossair (donde está apuntando el ratón)
                const targetX = crossair.x;
                const targetY = crossair.y;

                // Disparar una bala desde la posición del player hacia el cursor
                shootBulletFromCompanion(app, player, targetX, targetY);
            }
        }

        // Función para disparar una bala desde el player
        function shootBulletFromCompanion(app, player, targetX, targetY) {
            const speed = 1; // Ajusta la velocidad si es necesario
            const bullet = new Bullet(app, player.x, player.y, targetX, targetY, speed);
            bullets.push(bullet);
        }

        // Variables para el movimiento
        let dx = 0;
        let dy = 0;
        const speed = 1;

        //crossair control

        function moveCrossair(e) {
            let position = e.data.global //e contiene toda la infodel evento de movimiento de cursor
            crossair.x = position.x;
            crossair.y = position.y;
        }
        // Cambiar la animación según la dirección
        function changeAnimation(newAnimation) {
            if (player !== newAnimation) {
                player.stop(); // Detener la animación actual
                app.stage.removeChild(player); // Eliminar la animación actual del escenario

                // Asignar la nueva animación
                newAnimation.x = player.x; // Mantener la posición actual
                newAnimation.y = player.y; // Mantener la posición actual
                newAnimation.anchor.set(0.5);
                newAnimation.animationSpeed = 0.2; // Ajustar según la velocidad deseada
                newAnimation.play(); // Reproduce la nueva animación
                app.stage.addChild(newAnimation); // Añadir al escenario

                // Cambiar el jugador a la nueva animación
                player = newAnimation;
            }
        }

        // Manejo de las teclas
        function handleKeyDown(e) {
            switch (e.key) {
                case 'w':
                    dy = -speed;
                    changeAnimation(upAnimation); // Cambiar a la animación de arriba
                    break;
                case 's':
                    dy = speed;
                    changeAnimation(downAnimation); // Cambiar a la animación de abajo
                    break;
                case 'a':
                    dx = -speed;
                    changeAnimation(leftAnimation); // Cambiar a la animación de izquierda
                    break;
                case 'd':
                    dx = speed;
                    changeAnimation(rightAnimation); // Cambiar a la animación de derecha
                    break;
            }
        }

        function handleKeyUp(e) {
            switch (e.key) {
                case 'w':
                case 's':
                    dy = 0;
                    break;
                case 'a':
                case 'd':
                    dx = 0;
                    break;
            }
            // Si no se está moviendo, volver a la animación de idle
            if (dx === 0 && dy === 0) {
                changeAnimation(idleAnimation); // Cambiar a la animación idle
            }
        }

        // Crear enemigos
        const enemies = [];
        let enemySpeed = 0.2;
        let enemySpeedOrig = 0.2;
        let explosionStartTime = null;
        const explosionDuration = 250; // Duración de la explosión en milisegundos
        let isExploding = false;

        function createEnemy() {
            const enemy = {
                sprite: new PIXI.Graphics(),
                x: Math.random() * app.screen.width,
                y: Math.random() * app.screen.height,
                radius: 10,
                speed: enemySpeed,
                dx: 0,
                dy: 0
            };
            enemy.sprite.beginFill(0xFF0000); // Rojo para los enemigos
            enemy.sprite.drawCircle(0, 0, enemy.radius);
            enemy.sprite.endFill();
            enemy.sprite.x = enemy.x;
            enemy.sprite.y = enemy.y;
            app.stage.addChild(enemy.sprite);
            enemies.push(enemy);
        }

        function moveEnemies() {
            enemies.forEach(enemy => {
                const dx = player.x - enemy.x;
                const dy = player.y - enemy.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 0) {
                    enemy.dx = (dx / distance) * enemy.speed;
                    enemy.dy = (dy / distance) * enemy.speed;

                    enemy.x += enemy.dx;
                    enemy.y += enemy.dy;


                    // Evitar que el enemigo salga de los límites
                    if (enemy.x < enemy.radius) enemy.x = enemy.radius;
                    if (enemy.x > app.screen.width - enemy.radius) enemy.x = app.screen.width - enemy.radius;
                    if (enemy.y < enemy.radius) enemy.y = enemy.radius;
                    if (enemy.y > app.screen.height - enemy.radius) enemy.y = app.screen.height - enemy.radius;

                    enemies.forEach(otherEnemy => {
                        if (otherEnemy !== enemy) {
                            const collisionDistance = enemy.radius + otherEnemy.radius;
                            const dx = enemy.x - otherEnemy.x;
                            const dy = enemy.y - otherEnemy.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < collisionDistance) {
                                // Ajustar la posición del enemigo en colisión
                                const angle = Math.atan2(dy, dx);
                                const overlap = collisionDistance - distance;

                                // Desplazar el enemigo en dirección opuesta
                                enemy.x += Math.cos(angle) * overlap / 2;
                                enemy.y += Math.sin(angle) * overlap / 2;
                            }
                        }
                    });

                    enemy.sprite.x = enemy.x;
                    enemy.sprite.y = enemy.y;


                }
            });
        }
        function checkEnemyCollision(bullets, enemies) {
            bullets.forEach((bullet, bulletIndex) => {
                enemies.forEach((enemy, enemyIndex) => {
                    const dx = bullet.positionX - enemy.x;
                    const dy = bullet.positionY - enemy.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Verifica si la distancia es menor que la suma de los radios
                    if (distance < bullet.radius + enemy.radius) {

                        enemy.sprite.destroy(); // Elimina el enemigo
                        enemies.splice(enemyIndex, 1); // Remueve el enemigo del array
                        enemies.forEach(enemy => {
                            enemy.speed += 0.1;
                        });

                        bullet.isAlive = false; // Marca la bala como no viva
                        bullet.sprite.destroy(); // Elimina la bala
                        bullets.splice(bulletIndex, 1); // Remueve la bala del array


                        console.log("¡Colisión detectada!");
                    }

                });
            });
        }



        function checkPlayerCollision() {
            enemies.forEach(enemy => {
                const distance = Math.sqrt(
                    (player.x - enemy.x) ** 2 + (player.y - enemy.y) ** 2
                );
                if (distance < 10 + enemy.radius && !invencible) { // Ajustar si es necesario
                    if (life < 1) {
                        player.alive = false;
                        alert("¡Colisión con un enemigo! El juego ha terminado.");
                        document.location.reload();
                    } else {
                        life--;
                        invencible = true;
                        // Iniciar la explosión
                        explosionStartTime = Date.now();
                        isExploding = true;
                    }
                }
            });
        }

        function updateExplosion(x, y) {
            const radio = 100;
            if (isExploding) {
                const elapsedTime = Date.now() - explosionStartTime;
                if (elapsedTime < explosionDuration) {
                    // Durante la explosión
                    enemies.forEach(enemy => {
                        if (Math.abs(enemy.x - x) < radio && Math.abs(enemy.y - y) < radio) { enemy.speed = -1; } // Velocidad negativa durante la explosión
                    });
                } else {
                    // Después de la explosión
                    enemies.forEach(enemy => {
                        enemy.speed = enemySpeedOrig; // Velocidad positiva después de la explosión
                    });
                    isExploding = false;
                    invencible = false;
                }
            }
        }

        // Crear monedas
        const coins = [];
        const coinsToWin = 5;

        function createCoin() {
            const coin = new Coin(
                Math.random() * (app.screen.width - 20),
                Math.random() * (app.screen.height - 20),
                10 // Radio de la moneda
            );
            coin.addToStage(app.stage);
            coins.push(coin);
        }

        function collectCoins() {
            coins.forEach(coin => {
                if (coin.checkCollision(player)) {
                    score = score + 1;
                    if (score >= coinsToWin) {
                        alert("¡Has ganado! Has recogido 5 monedas.");
                        document.location.reload();
                    }
                    // Eliminar la moneda del escenario y del array
                    app.stage.removeChild(coin.sprite);
                    coins.splice(coins.indexOf(coin), 1);
                    console.log(score);
                    console.log(coinsToWin);
                }
            });
        }

        // Crear enemigos y monedas
        for (let i = 0; i < 5; i++) {
            createCoin();
        }
        for (let i = 0; i < 50; i++) {
            createEnemy();
        }

        /*function companionBounce(frame){
            companion.x += dx;
            companion.y += Math.sin(frame)/4+dy;
        }*/
        function companionBounce(frame) { //hace que el compañero gire al rededor del Player
            const radius = 20; // Radio
            const speed = 0.1; //Velocidad

            // Calcular la nueva posición usando trigonometría (gracias chatgpt)
            const angle = frame * speed;
            companion.x = player.x + Math.cos(angle) * radius;
            companion.y = player.y + Math.sin(angle) * radius;
        }
        let frameCounter = 0
        // Actualizar el juego en cada frame
        app.ticker.add(() => {
            const fixedDelta = 1;

            if (!player.alive) {
                frameCounter += 0.05;
                player.x += dx;
                player.y += dy;

                // Evitar que el jugador salga de los límites
                if (player.x < 0) player.x = 0;
                if (player.x > app.screen.width) player.x = app.screen.width;
                if (player.y < 0) player.y = 0;
                if (player.y > app.screen.height) player.y = app.screen.height;

                moveEnemies();
                checkPlayerCollision();
                collectCoins();
                updateExplosion(player.x, player.y); // Actualizar la explosión
                companionBounce(frameCounter);
            }
            //console.log("Delta:", delta);

            bullets.forEach((bullet, index) => {
                bullet.update(fixedDelta);
                if (bullet.positionX < 0 || bullet.positionX > app.screen.width || bullet.positionY < 0 || bullet.positionY > app.screen.height) {
                    bullet.sprite.destroy();
                    bullets.splice(index, 1); // Remueve la bala del array
                }
                console.log("Cant balas", bullets.length)
            });
            checkEnemyCollision(bullets, enemies);
        });

        // Escuchar eventos del teclado
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        //document.addEventListener('mousedown', shootBullet)
    }
});
