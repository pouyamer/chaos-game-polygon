// setting up the canvas
const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const { size: canvasSize } = config.canvas

canvas.height = canvasSize.height
canvas.width = canvasSize.width

const center = new Point(0, 0, "red")

// drawing the polygon
const { circleContainingPoligonPointsRadius } = config.polygon
const polygonPoints = Array(config.polygon.sides.amount)
  .fill()
  .map(
    (_, i, sideArray) =>
      new Point(
        circleContainingPoligonPointsRadius *
          Math.cos(
            (i * 2 * Math.PI + config.polygon.rotationAngle_radian) /
              sideArray.length
          ),
        circleContainingPoligonPointsRadius *
          Math.sin(
            (i * 2 * Math.PI + config.polygon.rotationAngle_radian) /
              sideArray.length
          ),
        new HslColor(
          (360 * i) / config.polygon.sides.amount + config.polygon.hueOffset,
          70,
          50,
          1
        ).toString()
      )
  )

// drawing the innerPoints

let currentPolygonPointIndex = Math.floor(
  Math.random() * config.polygon.sides.amount
)
let currentPoint = center.getNewPointFromFractionOfDistanceBetweenTwoPoints(
  polygonPoints[currentPolygonPointIndex],
  config.ratioFactor
)

const drawTheChaosGame = () => {
  for (let i = 0; i < config.iterationsPerFrame; i++) {
    // get all unselected possible points on polygon
    const polygonPointsExceptTheCurrentPoint = polygonPoints.filter(
      (_, i) => i !== currentPolygonPointIndex
    )

    currentPolygonPointIndex =
      polygonPointsExceptTheCurrentPoint[
        Math.floor(Math.random() * polygonPointsExceptTheCurrentPoint.length)
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

//  drawing the polygon
//          shape:
polygonPoints.forEach((point, i) => {
  point.lineTo(
    ctx,
    polygonPoints[i === polygonPoints.length - 1 ? 0 : i + 1],
    config.polygon.sides.color,
    config.polygon.sides.thickness
  )

  //         points:
  config.polygon.showTrianglePoints &&
    polygonPoints.forEach(point => point.draw(ctx))
})
currentPoint.draw(ctx)
drawTheChaosGame()
