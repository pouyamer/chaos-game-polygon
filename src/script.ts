"use strict"
const { updateOnFrameIndex, iterationsPerFrame, ratioFactor } = config.general
const { circumRadius, rotationAngle_radian } = config.polygon
const { hueShift, saturation, lightness, alpha } = config.points.color
const {
  selectionConstrains,
  coloringMode,
  colorDiversityFactor,
  colorDiversityModeOperation,
  colorsArray
} = config.points
const {
  count: polygonSideCount,
  color: polygonColor,
  thickness: polygonThickness
} = config.polygon.sides

// setting up the canvas
const canvas = document.querySelector(".canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const { size: canvasSize } = config.canvas

canvas.height = canvasSize.height
canvas.width = canvasSize.width

// drawing the polygon

const decidePolymerCornersColor = (coloringMode: COLORING_MODES) => {
  let cornerColors: HslColor[]
  switch (coloringMode) {
    case "colorsAssigned":
      cornerColors = []
      for (let i = 0; i < polygonSideCount; i++) {
        cornerColors.push(colorsArray[i % colorsArray.length])
      }
      return cornerColors

    case "rgbDistribution":
      const rgbCornerColors = [
        new RgbColor(255, 0, 0).toHsl(),
        new RgbColor(0, 255, 0).toHsl(),
        new RgbColor(0, 0, 255).toHsl(),
        new RgbColor(255, 255, 0).toHsl(),
        new RgbColor(255, 0, 255).toHsl(),
        new RgbColor(0, 255, 255).toHsl(),
        new RgbColor(255, 255, 255).toHsl()
      ]

      cornerColors = []

      for (let i = 0; i < polygonSideCount; i++) {
        cornerColors.push(rgbCornerColors[i % rgbCornerColors.length])
      }

      return cornerColors

    default:
      return Array(polygonSideCount)
        .fill(2)
        .map((_, i) => {
          return new HslColor(
            (360 * i) / polygonSideCount + hueShift,
            saturation,
            lightness,
            alpha
          )
        })
  }
}

const polygonPoints = Array(polygonSideCount)
  .fill(2)
  .map(
    (_, i, sideArray) =>
      new Point(
        circumRadius *
          Math.cos((i * 2 * Math.PI + rotationAngle_radian) / sideArray.length),
        circumRadius *
          Math.sin((i * 2 * Math.PI + rotationAngle_radian) / sideArray.length),
        decidePolymerCornersColor(coloringMode)[i]
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
  colorDiversityModeOperation,
  center
)

const getSelectableNextPoints = (
  selectionConstrains: string,
  lastPointSelected: Point
) => {
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

let lastCornerPoint = currentPoint

const drawNextPoint = () => {
  const currentPolygonPoint =
    possibleNextSelectablePoints[
      Math.floor(Math.random() * possibleNextSelectablePoints.length)
    ]

  currentPoint = currentPoint.getNewPointFromFractionOfDistanceBetweenTwoPoints(
    currentPolygonPoint,
    ratioFactor,
    coloringMode,
    colorDiversityFactor,
    colorDiversityModeOperation,
    lastCornerPoint
  )

  lastCornerPoint = currentPolygonPoint

  currentPoint.draw(ctx)

  possibleNextSelectablePoints = getSelectableNextPoints(
    selectionConstrains,
    currentPolygonPoint
  )
}

let framesPassed = 1
const animate = () => {
  if (framesPassed % updateOnFrameIndex === 0) {
    for (let i = 0; i < iterationsPerFrame; i++) {
      drawNextPoint()
    }
  }
  framesPassed++
  requestAnimationFrame(animate)
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

animate()