class Point implements IPoint {
  x: number
  y: number
  cX: number
  cY: number
  color: HslColor

  constructor(x: number, y: number, color: HslColor) {
    this.x = x
    this.y = y
    // canvas x and y:
    this.cX = x + canvas.width / 2
    this.cY = -y + canvas.height / 2

    this.color = color
  }

  equals = (point: Point) => {
    return (
      this.x === point.x && this.y === point.y && this.color === point.color
    )
  }

  draw = (ctx: CanvasRenderingContext2D, color = this.color) => {
    ctx.fillStyle = color.toString()
    ctx.beginPath()
    ctx.arc(this.cX, this.cY, config.points.radius, 0, 2 * Math.PI)
    ctx.fill()
  }
  lineTo = (
    ctx: CanvasRenderingContext2D,
    nextPoint: Point,
    strokeColor: string,
    lineWidth = 1
  ) => {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = strokeColor.toString()
    ctx.beginPath()
    ctx.moveTo(this.cX, this.cY)
    ctx.lineTo(nextPoint.cX, nextPoint.cY)
    ctx.stroke()
  }
  getNewPointFromFractionOfDistanceBetweenTwoPoints = (
    nextPoint: Point,
    distanceRatioFactor: number,
    coloringMode: COLORING_MODES,
    colorDiversityFactor = 0.5,
    colorDiversityModeOperation: COLOR_DIVERSITY_MODE_OPERATIONS = "addition",
    lastCornerPoint: Point
  ) => {
    const newX = this.x + distanceRatioFactor * (nextPoint.x - this.x)
    const newY = this.y + distanceRatioFactor * (nextPoint.y - this.y)

    const newColorBasedOnColoringMode = () => {
      switch (coloringMode) {
        case "firstPoint":
          return new HslColor(
            this.color.hue,
            this.color.saturation,
            this.color.lightness,
            this.color.alpha
          )
        case "secondPoint":
          return new HslColor(
            nextPoint.color.hue,
            nextPoint.color.saturation,
            nextPoint.color.lightness,
            nextPoint.color.alpha
          )
        case "lastCornerPoint":
          return new HslColor(
            lastCornerPoint.color.hue,
            lastCornerPoint.color.saturation,
            lastCornerPoint.color.lightness,
            lastCornerPoint.color.alpha
          )
        case "takeAverage":
        case "colorsAssigned":
          return new HslColor(
            (nextPoint.color.hue + this.color.hue) / 2,
            this.color.saturation,
            this.color.lightness,
            this.color.alpha
          )
        case "addHues":
          return new HslColor(
            (nextPoint.color.hue + this.color.hue) / 2,
            this.color.saturation,
            this.color.lightness,
            this.color.alpha
          )
        case "randomBetweenTheTwo":
          return new HslColor(
            Math.random() <= 0.5 ? this.color.hue : nextPoint.color.hue,
            this.color.saturation,
            this.color.lightness,
            this.color.alpha
          )
        case "ratioFactorDependant":
          return new HslColor(
            (nextPoint.color.hue + this.color.hue) * distanceRatioFactor,
            this.color.saturation,
            this.color.lightness,
            this.color.alpha
          )

        case "colorDiversityFactorDependant":
          return new HslColor(
            colorDiversityModeOperation === "addition"
              ? (nextPoint.color.hue + this.color.hue) * colorDiversityFactor
              : (nextPoint.color.hue - this.color.hue) * colorDiversityFactor,
            this.color.saturation,
            this.color.lightness,
            this.color.alpha
          )

        case "yAxisBased":
          return new HslColor(
            (newY * 360) / canvas.height,
            this.color.saturation,
            this.color.lightness,
            this.color.alpha
          )
        case "xAxisBased":
          return new HslColor(
            (newX * 360) / canvas.width,
            this.color.saturation,
            this.color.lightness,
            this.color.alpha
          )
        case "rgbDistribution":
          const {
            red: thisRed,
            green: thisGreen,
            blue: thisBlue
          } = this.color.toRgb()
          const {
            red: nextRed,
            green: nextGreen,
            blue: nextBlue
          } = nextPoint.color.toRgb()
          const {
            red: lastRed,
            green: lastGreen,
            blue: lastBlue
          } = lastCornerPoint.color.toRgb()

          return new RgbColor(
            Math.min((thisRed + lastRed) * distanceRatioFactor, 255),
            Math.min((thisGreen + lastGreen) * distanceRatioFactor, 255),
            Math.min((thisBlue + lastBlue) * distanceRatioFactor, 255),
            this.color.alpha
          ).toHsl()

        default:
          throw new Error("invalid coloringMode!")
      }
    }

    return new Point(newX, newY, newColorBasedOnColoringMode())
  }
}
