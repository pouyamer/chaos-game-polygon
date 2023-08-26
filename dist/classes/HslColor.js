"use strict";
class HslColor {
    constructor(hue, saturation, lightness, alpha = 1) {
        this.toString = () => `hsl(${this.hue},${this.saturation}%,${this.lightness}%,${this.alpha})`;
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
        this.alpha = alpha;
    }
}
