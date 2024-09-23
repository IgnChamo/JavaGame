
class Bullet {
    constructor(app, originX, originY, targetX, targetY, speed) {
        this.app = app;
        this.oX = originX;
        this.oY = originY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = speed;

        this.positionX = originX;
        this.positionY = originY;

        this.shootVectorX = targetX - originX;
        this.shootVectorY = targetY - originY;

        this.normalize();

        this.velocityX = this.shootVectorX * this.speed;
        this.velocityY = this.shootVectorY * this.speed;

        // Crear la bala como un círculo en PIXI
        this.sprite = new PIXI.Graphics();
        this.sprite.beginFill(0xFF0000); // Color rojo
        this.sprite.drawCircle(0, 0, 5); // Radio de 5 píxeles
        this.sprite.endFill();
        this.sprite.x = this.positionX;
        this.sprite.y = this.positionY;
        this.isAlive = true;
        // Agregar la bala al escenario usando la instancia de app
        this.app.stage.addChild(this.sprite);
    }

    // Normaliza el vector de dirección
    normalize() {
        const magnitude = Math.sqrt(this.shootVectorX * this.shootVectorX + this.shootVectorY * this.shootVectorY);
        this.shootVectorX /= magnitude;
        this.shootVectorY /= magnitude;
    }

    // Actualiza la posición de la bala
    update(deltaTime = 1) {
        if (!this.isAlive) return;
        const distance = deltaTime * this.speed;

        // Actualiza las posiciones en función de la velocidad
        this.positionX += distance * this.velocityX;
        this.positionY += distance * this.velocityY;

        this.sprite.x = this.positionX;
        this.sprite.y = this.positionY;

        /*if (this.sprite.x <= 0 || this.sprite.x >= 1200 || this.sprite.y <= 0 || this.sprite.y >= 800) {
            this.isAlive = false;
            this.app.stage.removeChild(this.sprite); // Elimina la bala del escenario
            
        }*/
    }
}
