class HslColor implements IHslColor {
  hue: number
  saturation: number
  lightness: number
  alpha: number

  constructor(hue: number, saturation: number, lightness: number, alpha = 1) {
    this.hue = hue
    this.saturation = saturation
    this.lightness = lightness
    this.alpha = alpha
  }

  toString = () =>
    `hsl(${this.hue},${this.saturation}%,${this.lightness}%,${this.alpha})`
}
