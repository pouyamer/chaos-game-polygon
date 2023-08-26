"use strict";
class Point {
    constructor(x, y, color) {
        this.equals = (point) => {
            return (this.x === point.x && this.y === point.y && this.color === point.color);
        };
        this.draw = (ctx, color = this.color) => {
            ctx.fillStyle = color.toString();
            ctx.beginPath();
            ctx.arc(this.cX, this.cY, config.points.radius, 0, 2 * Math.PI);
            ctx.fill();
        };
        this.lineTo = (ctx, nextPoint, strokeColor, lineWidth = 1) => {
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = strokeColor.toString();
            ctx.beginPath();
            ctx.moveTo(this.cX, this.cY);
            ctx.lineTo(nextPoint.cX, nextPoint.cY);
            ctx.stroke();
        };
        this.getNewPointFromFractionOfDistanceBetweenTwoPoints = (nextPoint, distanceRatioFactor, coloringMode, colorDiversityFactor = 0.5, colorDiversityModeOperation = "addition") => {
            const newX = this.x + distanceRatioFactor * (nextPoint.x - this.x);
            const newY = this.y + distanceRatioFactor * (nextPoint.y - this.y);
            const newHueBasedOnColoringMode = () => {
                switch (coloringMode) {
                    case "firstPoint":
                        return this.color.hue;
                    case "secondPoint":
                        return nextPoint.color.hue;
                    case "takeAverage":
                        return (nextPoint.color.hue + this.color.hue) / 2;
                    case "addHues":
                        return (nextPoint.color.hue + this.color.hue) / 1;
                    case "randomBetweenTheTwo":
                        return Math.random() <= 0.5 ? this.color.hue : nextPoint.color.hue;
                    case "ratioFactorDependant":
                        return (nextPoint.color.hue + this.color.hue) * distanceRatioFactor;
                    case "colorDiversityFactorDependant":
                        return colorDiversityModeOperation === "addition"
                            ? (nextPoint.color.hue + this.color.hue) * colorDiversityFactor
                            : (nextPoint.color.hue - this.color.hue) * colorDiversityFactor;
                    default:
                        throw new Error("invalid coloringMode!");
                }
            };
            return new Point(newX, newY, new HslColor(newHueBasedOnColoringMode(), this.color.saturation, this.color.lightness, this.color.alpha));
        };
        this.x = x;
        this.y = y;
        this.cX = x + canvas.width / 2;
        this.cY = -y + canvas.height / 2;
        this.color = color;
    }
}
