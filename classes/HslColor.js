class HslColor {
  constructor(hue, saturation, lightness, alpha = 1) {
    this.hue = hue
    this.saturation = saturation
    this.lightness = lightness
    this.alpha = alpha
  }

  toString = () =>
    `hsl(${this.hue},${this.saturation}%,${this.lightness}%,${this.alpha})`
}
