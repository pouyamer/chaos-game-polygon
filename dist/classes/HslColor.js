"use strict";
class HslColor {
    constructor(hue, saturation, lightness, alpha = 1) {
        this.toRgb = () => {
            const hueRatio = this.hue / 360;
            const saturationRatio = this.saturation / 100;
            const lightnessRatio = this.lightness / 100;
            let red, green, blue;
            if (saturationRatio === 0) {
                red = green = blue = lightnessRatio;
            }
            else {
                const hueToRgb = (p, q, t) => {
                    if (t < 0)
                        t += 1;
                    if (t > 1)
                        t -= 1;
                    if (t < 1 / 6)
                        return p + (q - p) * 6 * t;
                    if (t < 1 / 2)
                        return q;
                    if (t < 2 / 3)
                        return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
                const q = lightnessRatio < 0.5
                    ? lightnessRatio * (1 + saturationRatio)
                    : lightnessRatio + saturationRatio - lightnessRatio * saturationRatio;
                const p = 2 * lightnessRatio - q;
                red = hueToRgb(p, q, hueRatio + 1 / 3);
                green = hueToRgb(p, q, hueRatio);
                blue = hueToRgb(p, q, hueRatio - 1 / 3);
            }
            red = Math.round(red * 255);
            green = Math.round(green * 255);
            blue = Math.round(blue * 255);
            return new RgbColor(red, green, blue, this.alpha);
        };
        this.toString = () => `hsl(${this.hue},${this.saturation}%,${this.lightness}%,${this.alpha})`;
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
        this.alpha = alpha;
    }
}
