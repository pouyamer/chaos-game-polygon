class Point {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    // canvas x and y:
    this.cX = x + canvas.width / 2
    this.cY = -y + canvas.height / 2

    this.color = color
  }
  draw = (ctx, color = this.color) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(this.cX, this.cY, config.points.radius, 0, 2 * Math.PI)
    ctx.fill()
  }
  lineTo = (ctx, nextPoint, strokeColor, lineWidth = 1) => {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = strokeColor
    ctx.beginPath()
    ctx.moveTo(this.cX, this.cY)
    ctx.lineTo(nextPoint.cX, nextPoint.cY)
    ctx.stroke()
  }
  getNewPointFromFractionOfDistanceBetweenTwoPoints = (
    nextPoint,
    fraction,
    isCalculatedFromTheFirstPoint = true
  ) => {
    const firstPoint = isCalculatedFromTheFirstPoint ? this : nextPoint
    const secondPoint = isCalculatedFromTheFirstPoint ? nextPoint : this

    const newX = firstPoint.x + fraction * (secondPoint.x - firstPoint.x)
    const newY = firstPoint.y + fraction * (secondPoint.y - firstPoint.y)
    return new Point(newX, newY, secondPoint.color)
  }
}
