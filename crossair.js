function moveCrossair(crossair,e){
    let position = e.data.global;
    crossair.x = position.x;
    crossair.y = position.y;
}