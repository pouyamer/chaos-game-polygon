const config = {
  canvas: {
    size: { width: innerWidth, height: innerHeight },
    backgroundColor: "#111"
  },
  polygon: {
    sides: {
      amount: 5,
      color: "hsl(20,75%,60%,.2)",
      thickness: 3
    },
    showPolygonPoints: false,
    rotationAngle_radian: Math.PI / 2,
    // a perfect polygon is drawn within a circle,
    // The wider the circle, bigger the sides
    circleContainingPoligonPointsRadius:
      (0.8 * Math.min(innerHeight, innerWidth)) / 2
    // Hue Offset: hue that gets added to hue of polygon points and associated points
  },
  points: {
    radius: 3,

    color: {
      hueOffset: 0,
      // saturation and lightness of all points:
      //  [0 - 100]
      saturation: 85,
      lightness: 65,
      // alpha value: [0 - 1]
      alpha: 1
    },
    // coloringMode values:
    //   "takeAverage" | "secondPoint" |
    //   "firstPoint"  | "addHues"  |
    //   "randomBetweenTheTwo"
    coloringMode: "takeAverage"
  },
  // WARNING : the higher `iterationsPerFrame` goes, more resourses it'll consume
  iterationsPerFrame: 10,

  // indicates That each update should occur on what frame
  //  (default : 1)
  // animation fps = your_fps / updateOnFrameIndex
  updateOnFrameIndex: 2,
  ratioFactor: 2 / 3
}
