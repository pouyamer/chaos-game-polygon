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
    coloringMode: COLORING_MODES,
    colorDiversityFactor: number,
    colorDiversityModeOperation: COLOR_DIVERSITY_MODE_OPERATIONS,
    lastCornerPoint: Point
  ) => Point
}
