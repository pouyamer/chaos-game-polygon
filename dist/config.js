"use strict";
const config = {
    canvas: {
        size: { width: innerWidth, height: innerHeight },
        backgroundColor: "#111"
    },
    polygon: {
        sides: {
            count: 3,
            color: "hsl(20,75%,60%,0)",
            thickness: 3
        },
        showCornerPoints: false,
        rotationAngle_radian: (3 * Math.PI) / 2,
        circumRadius: (1 * Math.min(innerHeight, innerWidth)) / 2
    },
    points: {
        radius: 2,
        color: {
            hueShift: 0,
            saturation: 85,
            lightness: 65,
            alpha: 1
        },
        coloringMode: "ratioFactorDependant",
        colorDiversityFactor: 0.6,
        colorDiversityModeOperation: "addition",
        selectionConstrains: "notSelectTwoPointsInSuccession",
        colorsArray: [
            new RgbColor(255, 0, 0).toHsl(),
            new RgbColor(0, 255, 0).toHsl(),
            new RgbColor(0, 0, 255).toHsl()
        ]
    },
    general: {
        iterationsPerFrame: 1000,
        updateOnFrameIndex: 1,
        ratioFactor: 0.39
    }
};
