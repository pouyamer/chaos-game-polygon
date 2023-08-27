interface IConfig {
  canvas: {
    size: { width: number; height: number }
    backgroundColor: string
  }
  polygon: {
    sides: {
      count: number
      color: string
      thickness: number
    }
    showCornerPoints: boolean
    rotationAngle_radian: number
    circumRadius: number
  }
  points: {
    radius: number
    color: {
      hueShift: number
      saturation: number
      lightness: number
      alpha: number
    }
    coloringMode: COLORING_MODES
    colorDiversityFactor: number
    colorDiversityModeOperation: COLOR_DIVERSITY_MODE_OPERATIONS
    selectionConstrains: SELECTION_CONSTRAINS
    colorsArray: HslColor[]
  }
  general: {
    iterationsPerFrame: number
    updateOnFrameIndex: number
    ratioFactor: number
  }
}
