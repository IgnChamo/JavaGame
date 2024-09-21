class Bullet {
    constructor(originX, originY, clickX, clickY, speed) {
        this.oX = originX; // Punto de origen
        this.oY = originY;
        this.cX = clickX; // Punto de disparo
        this.cY = clickY;
        this.speed = speed; // Velocidad del disparo
        this.positionX = originX; // La posición real, se actualiza por cada frame pero en creación aparece en el punto de origen
        this.positionY = originY;
        this.shootVectorX = clickX - originX;
        this.shootVectorY = clickY - originY;
        this.normalize();
        this.velocityX = this.shootVectorX * this.speed;
        this.velocityY = this.shootVectorY * this.speed;
    }

    // Calcula la distancia
    pythegoras() {
        return Math.sqrt(Math.pow(this.shootVectorX, 2) + Math.pow(this.shootVectorY, 2));
    }

    // Normaliza el vector de dirección
    normalize() {
        const magnitude = this.pythegoras();
        this.shootVectorX = this.shootVectorX / magnitude;
        this.shootVectorY = this.shootVectorY / magnitude;
    }

    // Actualiza la posición de la bala
    positionUpdate(deltaTime) {
        this.positionX += deltaTime * this.velocityX;
        this.positionY += deltaTime * this.velocityY;
    }

    // Dibuja la bala (si tienes un contexto gráfico)
    draw(context) {
        context.beginPath();
        context.arc(this.positionX, this.positionY, 5, 0, Math.PI * 2);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
    }
}

// Array para almacenar las balas
const bullets = [];
const speed = 0.1; // Velocidad de la bala

// Canvas para dibujar las balas
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Posición de origen del disparo (por ejemplo, el centro de la pantalla)
const originX = canvas.width / 2;
const originY = canvas.height / 2;

// Evento para disparar una bala al hacer clic
canvas.addEventListener('click', (event) => {
    const clickX = event.clientX;
    const clickY = event.clientY;

    // Crea una nueva bala
    const bullet = new Bullet(originX, originY, clickX, clickY, speed);
    bullets.push(bullet);
});

// Función para actualizar el juego
function update(deltaTime) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Actualiza la posición de cada bala
    bullets.forEach((bullet) => {
        bullet.positionUpdate(deltaTime);
        bullet.draw(context); // Dibuja la bala
    });

    requestAnimationFrame(() => update(deltaTime));
}

// Iniciar el juego
update(0.016); // Aproximadamente 60 fps
