interface IRgbColor {
  red: number
  green: number
  blue: number
  alpha: number
  toString: () => string
  toHsl: () => HslColor
}
