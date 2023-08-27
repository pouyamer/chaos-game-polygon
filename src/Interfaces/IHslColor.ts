interface IHslColor {
  hue: number
  saturation: number
  lightness: number
  alpha: number
  toString: () => string
  toRgb: () => RgbColor
}
