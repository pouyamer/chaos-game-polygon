interface IPoint {
  x: number
  y: number
  color: HslColor
  equals: (point: Point) => boolean
  draw: (ctx: CanvasRenderingContext2D) => void
  lineTo: (
    ctx: CanvasRenderingContext2D,
    nextPoint: Point,
    strokeColor: string,
    lineWidth: number
  ) => void
  getNewPointFromFractionOfDistanceBetweenTwoPoints: (
    nextPoint: Point,
    distanceRatioFactor: number,
    coloringMode: string,
    colorDiversityFactor: number,
    colorDiversityModeOperation: string
  ) => Point
}
