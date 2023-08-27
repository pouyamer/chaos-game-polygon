class RgbColor implements IRgbColor {
  red: number
  green: number
  blue: number
  alpha: number
  constructor(red: number, green: number, blue: number, alpha = 1) {
    this.red = red
    this.green = green
    this.blue = blue
    this.alpha = alpha
  }

  toHsl = () => {
    const redRatio = this.red / 255
    const greenRatio = this.green / 255
    const blueRatio = this.blue / 255

    let max = Math.max(redRatio, greenRatio, blueRatio)
    let min = Math.min(redRatio, greenRatio, blueRatio)
    let hue,
      saturation,
      lightness = (max + min) / 2

    if (max === min) {
      hue = 0
      saturation = 0 // achromatic
    } else {
      let delta = max - min

      saturation =
        lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)

      switch (max) {
        case redRatio:
          hue =
            (greenRatio - blueRatio) / delta + (greenRatio < blueRatio ? 6 : 0)
          break
        case greenRatio:
          hue = (blueRatio - redRatio) / delta + 2
          break
        case blueRatio:
          hue = (redRatio - greenRatio) / delta + 4
          break
        default:
          throw new Error("Invalid color")
      }

      hue /= 6
    }

    return new HslColor(
      hue * 360,
      saturation * 100,
      lightness * 100,
      this.alpha
    )
  }

  toString = () => `rgb(${this.red},${this.green},${this.blue},${this.alpha})`
}
