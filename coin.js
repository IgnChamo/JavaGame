class Coin {
    constructor(x, y, radius) {
        this.sprite = new PIXI.Graphics();
        this.sprite.beginFill(0xFFFF00); // Amarillo para las monedas
        this.sprite.drawCircle(0, 0, radius);
        this.sprite.endFill();
        this.sprite.x = x;
        this.sprite.y = y;
        this.radius = radius;
    }

    addToStage(stage) {
        stage.addChild(this.sprite);
    }

    checkCollision(player) {
        const dx = this.sprite.x - player.x;
        const dy = this.sprite.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // Ajustar el radio para la colisión
        return distance < this.radius + player.width / 2; // Ajusta según el tamaño del jugador
    }
}
