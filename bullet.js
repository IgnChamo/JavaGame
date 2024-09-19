class Bullet {
    constructor(originX,originY,clickX,clickY, speed){
        this.oX=originX //Punto de origen
        this.oY=originY
        this.cX=clickX //Punto de disparo
        this.cY=clickY
        this.speed=speed //Velocidad del disparo
        this.positionX=originX //La posicion real, se actualiza por cada frame pero en creacion aparece en el punto de origen
        this.positionY=originY
        this.shootVectorX=clickX-originX
        this.shootVectorY=clickY-originY
        this.velocityX=this.shootVectorX*speed
        this.velocityY=this.shootVectorY*speed
    }

    pythegoras(){
        return Math.sqrt(Math.pow(shootVectorX)+Math.pow(this.shootVectorY))
    }

    normalize(){
        this.shootVectorX = this.shootVectorX/this.pythegoras()
        this.shootVectorY = this.shootVectorY/this.pythegoras()
    }

    positionUpdate(deltaTime){
        this.positionX += deltaTime*this.velocityX
        this.positionY += deltaTime*this.velocityY
    }
}

