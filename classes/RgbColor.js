class RgbColor {
  constructor(red, green, blue, alpha = 1) {
    this.red = red
    this.green = green
    this.blue = blue
    this.alpha = alpha
  }

  toString = () => `rgb(${this.red},${this.green},${this.blue},${this.alpha})`
}
