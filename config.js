const config = {
  canvas: {
    size: { width: innerWidth, height: innerHeight },
    backgroundColor: "hsl(20, 80%, 1%)"
  },
  poligon: {
    sides: {
      amount: 5,
      color: "hsl(20,75%,60%,.3)",
      thickness: 1
    },
    showTrianglePoints: false,
    rotationAngle_radian: Math.PI / 2,
    // a perfect poligon is drawn within a circle,
    // The wider the circle, bigger the sides
    circleContainingPoligonPointsRadius:
      (0.8 * Math.min(innerHeight, innerWidth)) / 2
  },
  points: {
    radius: 1,
    fillColor: "#eee",
    strokeColor: "black"
  },
  // pointsDrawnPerFrame: the higher it goes, more resourses it'll consume
  pointsDrawnPerFrame: 120,
  ratioFactor: 2 / (1 + Math.sqrt(5))
}
