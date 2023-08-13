const config = {
  canvas: {
    size: { width: innerWidth, height: innerHeight },
    backgroundColor: "hsl(20, 80%, 1%)"
  },
  polygon: {
    sides: {
      amount: 5,
      color: "hsl(20,75%,60%,.3)",
      thickness: 1
    },
    showTrianglePoints: false,
    rotationAngle_radian: Math.PI / 2,
    // a perfect polygon is drawn within a circle,
    // The wider the circle, bigger the sides
    circleContainingPoligonPointsRadius:
      (0.8 * Math.min(innerHeight, innerWidth)) / 2,
    // Hue Offset: hue that gets added to hue of polygon points and associated points
    hueOffset: 20
  },
  points: {
    radius: 1
  },
  // iterationsPerFrame: the higher it goes, more resourses it'll consume
  iterationsPerFrame: 100,
  ratioFactor: 1 / 1.615
}
