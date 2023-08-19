const config = {
  canvas: {
    size: { width: innerWidth, height: innerHeight },
    backgroundColor: "#111"
  },
  polygon: {
    sides: {
      count: 10,
      color: "hsl(20,75%,60%,0)",
      thickness: 3
    },
    showCornerPoints: false,

    // shape rotates with rotationAngle_radian
    rotationAngle_radian: (3 * Math.PI) / 2,

    /* a perfect polygon is drawn within a circle,
       The bigger the circle, bigger the sides */
    circumRadius: (0.9 * Math.min(innerHeight, innerWidth)) / 2
  },
  points: {
    radius: 1,

    color: {
      // hue Shift: hue that gets added to hue of polygon points and its points
      hueShift: 0,

      /* saturation and lightness of all points:
        [0 - 100] */
      saturation: 85,
      lightness: 65,

      // alpha value: [0 - 1]
      alpha: 1
    },
    /* coloringMode values:
       see the options in `globals/coloringModes.js` */
    coloringMode: COLORING_MODES.RATIO_FACTOR_DEPENDANT,
    /* if coloring mode is colorDiversityFactorDependant, then
       app uses colorDiversityFactor [0 - 1] */
    colorDiversityFactor: 0.6,

    /* colorDiversityModeOperation values:
       see the options in `globals/colorDiversityModeOperations.js`*/
    colorDiversityModeOperation: COLOR_DIVERSITY_MODE_OPERATIONS.SUBTRACTION,
    // there can be constrains on how the next points are selected
    selectionConstrains:
      SELECTION_CONSTRAINS.NOT_SELECT_TWO_POINTS_IN_SUCCESSION
  },
  general: {
    // WARNING : the higher `iterationsPerFrame` goes, more resourses it'll consume
    iterationsPerFrame: 1000,

    /* indicates That each update should occur on what frame
     (default : 1)
     animation fps =
        your_fps / updateOnFrameIndex
     For more performance 
      set `updateOnFrameIndex` higher */
    updateOnFrameIndex: 1,

    // ratioFactor: the points will be set on <ratioFactor> of distance between two points
    ratioFactor: 1 / 1.35
  }
}
