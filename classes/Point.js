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
    ctx.fillStyle = color.toString()
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
    distanceRatioFactor,
    isCalculatedFromTheFirstPoint = true,
    coloringMode,
    colorDiversityFactor = 0.5,
    colorDiversityModeOperation = "addition"
  ) => {
    const firstPoint = isCalculatedFromTheFirstPoint ? this : nextPoint
    const secondPoint = isCalculatedFromTheFirstPoint ? nextPoint : this

    const newX =
      firstPoint.x + distanceRatioFactor * (secondPoint.x - firstPoint.x)
    const newY =
      firstPoint.y + distanceRatioFactor * (secondPoint.y - firstPoint.y)

    const newHueBasedOnColoringMode = () => {
      switch (coloringMode) {
        case "firstPoint":
          return firstPoint.color.hue
        case "secondPoint":
          return secondPoint.color.hue
        case "takeAverage":
          return (secondPoint.color.hue + firstPoint.color.hue) / 2
        case "addHues":
          return (secondPoint.color.hue + firstPoint.color.hue) / 1
        case "randomBetweenTheTwo":
          return Math.random() <= 0.5
            ? firstPoint.color.hue
            : secondPoint.color.hue
        case "ratioFactorDependant":
          return (
            (secondPoint.color.hue + firstPoint.color.hue) * distanceRatioFactor
          )
        case "colorDiversityFactorDependant":
          return colorDiversityModeOperation === "addition"
            ? (secondPoint.color.hue + firstPoint.color.hue) *
                colorDiversityFactor
            : (secondPoint.color.hue - firstPoint.color.hue) *
                colorDiversityFactor

        default:
          throw new Error("invalid coloringMode!")
      }
    }

    return new Point(
      newX,
      newY,
      new HslColor(
        newHueBasedOnColoringMode(),
        firstPoint.color.saturation,
        firstPoint.color.lightness,
        firstPoint.color.alpha
      )
    )
  }
}
