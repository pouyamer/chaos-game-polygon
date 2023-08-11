// setting up the canvas
const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const { size: canvasSize } = config.canvas

canvas.height = canvasSize.height
canvas.width = canvasSize.width

const center = new Point(0, 0, "red")

// drawing the polygon
const { circleContainingPoligonPointsRadius } = config.poligon
const poligonPoints = Array(config.poligon.sides.amount)
  .fill()
  .map(
    (_, i, sideArray) =>
      new Point(
        circleContainingPoligonPointsRadius *
          Math.cos(
            (i * 2 * Math.PI + config.poligon.rotationAngle_radian) /
              sideArray.length
          ),
        circleContainingPoligonPointsRadius *
          Math.sin(
            (i * 2 * Math.PI + config.poligon.rotationAngle_radian) /
              sideArray.length
          ),
        new HslColor(
          (360 * i) / config.poligon.sides.amount,
          70,
          50,
          1
        ).toString()
      )
  )

// drawing the innerPoints
const innerPointsColorBasedOnPolygonPointIndex = Array(
  config.poligon.sides.amount
)
  .fill()
  .map((_, i) =>
    new HslColor((360 * i) / config.poligon.sides.amount, 70, 60, 1).toString()
  )

let currentPolygonPointIndex = Math.floor(
  Math.random() * config.poligon.sides.amount
)
let currentPoint = center.getNewPointFromFractionOfDistanceBetweenTwoPoints(
  poligonPoints[currentPolygonPointIndex],
  config.ratioFactor
)

const drawTheChaosGame = () => {
  for (let i = 0; i < config.pointsDrawnPerFrame; i++) {
    // get all unselected possible points on polygon
    const poligonPointsExceptTheCurrentPoint = poligonPoints.filter(
      (_, i) => i !== currentPolygonPointIndex
    )

    currentPolygonPointIndex =
      poligonPointsExceptTheCurrentPoint[
        Math.floor(Math.random() * poligonPointsExceptTheCurrentPoint.length)
      ]

    currentPoint =
      currentPoint.getNewPointFromFractionOfDistanceBetweenTwoPoints(
        currentPolygonPointIndex,
        config.ratioFactor
      )

    currentPoint.draw(ctx)
  }
  requestAnimationFrame(drawTheChaosGame)
}

// App Starts here:
ctx.fillStyle = config.canvas.backgroundColor
ctx.fillRect(0, 0, canvas.height, canvas.width)

//  drawing the poligon
//          shape:
poligonPoints.forEach((point, i) => {
  point.lineTo(
    ctx,
    poligonPoints[i === poligonPoints.length - 1 ? 0 : i + 1],
    config.poligon.sides.color,
    config.poligon.sides.thickness
  )

  //         points:
  config.poligon.showTrianglePoints &&
    poligonPoints.forEach(point => point.draw(ctx))
})
currentPoint.draw(ctx)
drawTheChaosGame()

console.log(innerPointsColorBasedOnPolygonPointIndex)
