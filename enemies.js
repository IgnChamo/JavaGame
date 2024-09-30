class Enemy{
    constructor(speed){
        this.sprite = new PIXI.Graphics();
        this.x = Math.random() * app.screen.width;
        this.y = Math.random() * app.screen.height;
        this.radius = 10;
        this.speed = speed;
        this.dx=0
        this.dy=0

        this.sprite.beginFill(0xFF0000); // Rojo para los enemigos
        this.sprite.drawCircle(0, 0, this.radius);
        this.sprite.endFill();
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
}

function createEnemy(app){
    const enemy=new Enemy(enemySpeed);
    app.stage.addChild(enemy.sprite)
    enemies.push(enemy)
}
