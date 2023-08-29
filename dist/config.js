"use strict";
const config = {
    canvas: {
        size: { width: innerWidth, height: innerHeight },
        backgroundColor: "#111"
    },
    polygon: {
        sides: {
            count: 5,
            color: "hsl(20,75%,60%,0)",
            thickness: 3
        },
        showCornerPoints: false,
        rotationAngle_radian: Math.PI / 2,
        circumRadius: (1 * Math.min(innerHeight, innerWidth)) / 2
    },
    points: {
        radius: 1,
        color: {
            hueShift: 0,
            saturation: 85,
            lightness: 65,
            alpha: 1
        },
        coloringMode: "colorDiversityFactorDependant",
        colorDiversityFactor: 0.6,
        colorDiversityModeOperation: "addition",
        selectionConstrains: "selectCornerTwoStepsAwayAfterRepeat",
        colorsArray: [
            new RgbColor(255, 0, 0).toHsl(),
            new RgbColor(0, 255, 0).toHsl(),
            new RgbColor(0, 0, 255).toHsl()
        ]
    },
    general: {
        iterationsPerFrame: 1009,
        updateOnFrameIndex: 1,
        ratioFactor: 0.52
    }
};
