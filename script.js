const TWO_THIRDS = 2 / 3

// config

const config = {
  canvas: {
    size: { width: innerWidth, height: innerHeight },
    multiplier: 2,
    backgroundColor: "hsl(20, 80%, 1%)"
  },
  poligon: {
    sides: {
      amount: 5,
      color: "hsl(20,75%,60%)",
      thickness: 1
    },
    rotationAngle_radian: Math.PI / 2,
    // a perfect poligon is drawn within a circle,
    // The wider the circle, bigger the sides
    circleContainingPoligonPointsRadius: 200
  },
  points: {
    radius: 2,
    fillColor: "#eee",
    strokeColor: "black"
  }
}

const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const { size: canvasSize } = config.canvas

canvas.height = canvasSize.height
canvas.width = canvasSize.width

//

class HslColor {
  constructor(hue, saturation, lightness, alpha = 1) {
    this.hue = hue
    this.saturation = saturation
    this.lightness = lightness
    this.alpha = alpha
  }

  toString = () =>
    `hsl(${this.hue},${this.saturation}%,${this.lightness}%,${this.alpha})`
}

class Point {
  constructor(x, y, canvasMultiplier, color) {
    this.x = x
    this.y = y
    // canvas x and y:
    this.cX = x * canvasMultiplier + canvas.width / 2
    this.cY = -y * canvasMultiplier + canvas.height / 2

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
    return new Point(newX, newY, config.canvas.multiplier, secondPoint.color)
  }
}

// class Circle {
//   constructor(point, r) {
//     this.point = point
//     this.r = r
//   }
//   draw = methodName => {
//     ctx.beginPath()
//     ctx.arc(
//       this.point.cX,
//       this.point.cY,
//       this.r * canvasMultiplier,
//       0,
//       2 * Math.PI
//     )
//     methodName === "fill" ? ctx.fill() : ctx.stroke()
//   }
//   stroke = () => {
//     this.draw("stroke")
//   }
//   fill = () => {
//     this.draw("fill")
//   }
// }

const center = new Point(0, 0, config.canvas.multiplier, "red")

center.draw(ctx)

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
        config.canvas.multiplier,
        new HslColor(
          (360 * i) / config.poligon.sides.amount,
          70,
          50,
          1
        ).toString()
      )
  )

// console.log(poligonPoints)

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
  TWO_THIRDS
)

const drawTheChaosGame = () => {
  // get all unselected possible points on polygon
  const poligonPointsExceptTheCurrentPoint = poligonPoints.filter(
    (_, i) => i !== currentPolygonPointIndex
  )

  currentPolygonPointIndex =
    poligonPointsExceptTheCurrentPoint[
      Math.floor(Math.random() * poligonPointsExceptTheCurrentPoint.length)
    ]

  currentPoint = currentPoint.getNewPointFromFractionOfDistanceBetweenTwoPoints(
    currentPolygonPointIndex,
    TWO_THIRDS
  )

  currentPoint.draw(ctx)

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
  poligonPoints.forEach(point => point.draw(ctx))
})
currentPoint.draw(ctx)
drawTheChaosGame()

console.log(innerPointsColorBasedOnPolygonPointIndex)
