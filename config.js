const config = {
  canvas: {
    size: { width: innerWidth, height: innerHeight },
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
    circleContainingPoligonPointsRadius: 400
  },
  points: {
    radius: 1,
    fillColor: "#eee",
    strokeColor: "black"
  }
}
