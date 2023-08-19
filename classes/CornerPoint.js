class PolygonPoint extends Point{
    super(x, y, color)
    constructor(canBePicked = true){
        this.canBePicked = canBePicked
    }
}