let bullets = [] //array of bullets in play
let bulletSpeed = 10
function fireBullet(e, x, y){
    console.log("fire!")
    let position = e.data.global;
    let originX = position.x
    let originY = position.y
    console.log(originX + " - " + originY);
    let bullet = createBullet(objetiveX,objetiveY,x,y);
    bullets.push(bullet);
}

function createBullet(obX,obY, originX, originY){
    let bullet = new PIXI.Sprite.from("./img/bullet/bullet.png"); 
    bullet.anchor.set(0.5)
    bullet.x=originX;
    bullet.y=originY;
    bullet.speed=bulletSpeed;
    app.stage.addChild();
}



function gameLoop(deltaTime){

}

