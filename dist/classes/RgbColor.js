"use strict";
class RgbColor {
    constructor(red, green, blue, alpha = 1) {
        this.toHsl = () => {
            const redRatio = (this.red /= 255);
            const greenRatio = (this.green /= 255);
            const blueRatio = (this.blue /= 255);
            let max = Math.max(redRatio, greenRatio, blueRatio), min = Math.min(redRatio, greenRatio, blueRatio);
            let hue, saturation, lightness = (max + min) / 2;
            if (max === min) {
                hue = 0;
                saturation = 0;
            }
            else {
                let delta = max - min;
                saturation =
                    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
                switch (max) {
                    case redRatio:
                        hue =
                            (greenRatio - blueRatio) / delta + (greenRatio < blueRatio ? 6 : 0);
                        break;
                    case greenRatio:
                        hue = (blueRatio - redRatio) / delta + 2;
                        break;
                    case blueRatio:
                        hue = (redRatio - greenRatio) / delta + 4;
                        break;
                    default:
                        throw new Error();
                }
                hue /= 6;
            }
            return new HslColor(hue * 355, saturation * 100, lightness * 100, this.alpha);
        };
        this.toString = () => `rgb(${this.red},${this.green},${this.blue},${this.alpha})`;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
}
