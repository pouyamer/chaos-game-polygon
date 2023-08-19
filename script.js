"use strict"
const { updateOnFrameIndex, iterationsPerFrame, ratioFactor } = config.general
const { circumRadius, rotationAngle_radian } = config.polygon
const { hueShift, saturation, lightness, alpha } = config.points.color
const {
  selectionConstrains,
  coloringMode,
  colorDiversityFactor,
  colorDiversityModeOperation
} = config.points
const {
  count: polygonSideCount,
  color: polygonColor,
  thickness: polygonThickness
} = config.polygon.sides

// setting up the canvas
const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const { size: canvasSize } = config.canvas

canvas.height = canvasSize.height
canvas.width = canvasSize.width

// drawing the polygon

const polygonPoints = Array(polygonSideCount)
  .fill()
  .map(
    (_, i, sideArray) =>
      new Point(
        circumRadius *
          Math.cos((i * 2 * Math.PI + rotationAngle_radian) / sideArray.length),
        circumRadius *
          Math.sin((i * 2 * Math.PI + rotationAngle_radian) / sideArray.length),
        new HslColor(
          (360 * i) / polygonSideCount + hueShift,
          saturation,
          lightness,
          alpha
        )
      )
  )

const center = new Point(0, 0, new HslColor(360, saturation, lightness, alpha))

// drawing the innerPoints

let currentPolygonPointIndex = Math.floor(Math.random() * polygonSideCount)

let currentPoint = center.getNewPointFromFractionOfDistanceBetweenTwoPoints(
  polygonPoints[currentPolygonPointIndex],
  ratioFactor,
  coloringMode,
  colorDiversityFactor,
  colorDiversityModeOperation
)

const getSelectableNextPoints = (selectionConstrains, lastPointSelected) => {
  switch (selectionConstrains) {
    case "noConstrains":
      return polygonPoints
    case "notSelectTwoPointsInSuccession":
      return polygonPoints.filter(point => !point.equals(lastPointSelected))
    default:
      throw new Error("error: Invalid selection constrain")
  }
}

let possibleNextSelectablePoints = getSelectableNextPoints(
  selectionConstrains,
  polygonPoints[currentPolygonPointIndex]
)

let frames = 1
const drawTheChaosGame = () => {
  if (frames % updateOnFrameIndex === 0) {
    for (let i = 0; i < iterationsPerFrame; i++) {
      const currentPolygonPoint =
        possibleNextSelectablePoints[
          Math.floor(Math.random() * possibleNextSelectablePoints.length)
        ]

      currentPoint =
        currentPoint.getNewPointFromFractionOfDistanceBetweenTwoPoints(
          currentPolygonPoint,
          ratioFactor,
          coloringMode,
          colorDiversityFactor,
          colorDiversityModeOperation
        )

      currentPoint.draw(ctx)

      possibleNextSelectablePoints = getSelectableNextPoints(
        selectionConstrains,
        currentPolygonPoint
      )
    }
  }
  frames++
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
    polygonColor,
    polygonThickness
  )

  //         points:
  config.polygon.showCornerPoints &&
    polygonPoints.forEach(point => point.draw(ctx))
})
currentPoint.draw(ctx)
drawTheChaosGame()
