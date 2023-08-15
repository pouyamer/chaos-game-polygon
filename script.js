"use strict"

// setting up the canvas
const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const { size: canvasSize } = config.canvas

canvas.height = canvasSize.height
canvas.width = canvasSize.width

// drawing the polygon
const { circleContainingPoligonPointsRadius } = config.polygon
const { hueOffset, saturation, lightness, alpha } = config.points.color

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
          (360 * i) / config.polygon.sides.amount + hueOffset,
          saturation,
          lightness,
          alpha
        )
      )
  )

const center = new Point(0, 0, new HslColor(360, saturation, lightness, alpha))

// drawing the innerPoints

let currentPolygonPointIndex = Math.floor(
  Math.random() * config.polygon.sides.amount
)

console.log(config.points.coloringMode)
let currentPoint = center.getNewPointFromFractionOfDistanceBetweenTwoPoints(
  polygonPoints[currentPolygonPointIndex],
  config.ratioFactor,
  true,
  config.points.coloringMode
)

let frames = 1

const drawTheChaosGame = () => {
  if (frames % config.updateOnFrameIndex === 0) {
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
          config.ratioFactor,
          true,
          config.points.coloringMode
        )

      currentPoint.draw(ctx)
    }
  }
  frames++
  console.log(frames)
  requestAnimationFrame(drawTheChaosGame)
}

// App Starts here:
ctx.fillStyle = config.canvas.backgroundColor
ctx.fillRect(0, 0, canvas.width, canvas.height)

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
  config.polygon.showPolygonPoints &&
    polygonPoints.forEach(point => point.draw(ctx))
})
currentPoint.draw(ctx)
drawTheChaosGame()
