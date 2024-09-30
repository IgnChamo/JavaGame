// Variables para el movimiento
let dx = 0;
let dy = 0;
const speed = 1;

// Manejo de las teclas
function handleKeyDown(e) {
    switch (e.key) {
        case 'w':
            dy = -speed;
            changeAnimation(upAnimation,player,app); // Cambiar a la animación de arriba
            break;
        case 's':
            dy = speed;
            changeAnimation(downAnimation,player,app); // Cambiar a la animación de abajo
            break;
        case 'a':
            dx = -speed;
            changeAnimation(leftAnimation,player,app); // Cambiar a la animación de izquierda
            break;
        case 'd':
            dx = speed;
            changeAnimation(rightAnimation,player,app); // Cambiar a la animación de derecha
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
        changeAnimation(idleAnimation,player,app); // Cambiar a la animación idle
    }
}
 
//animation
function changeAnimation(newAnimation, player, app) {
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