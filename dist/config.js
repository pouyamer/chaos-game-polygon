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
        rotationAngle_radian: (3 * Math.PI) / 2,
        circumRadius: (0.9 * Math.min(innerHeight, innerWidth)) / 2
    },
    points: {
        radius: 1,
        color: {
            hueShift: 0,
            saturation: 85,
            lightness: 65,
            alpha: 1
        },
        coloringMode: COLORING_MODES.RATIO_FACTOR_DEPENDANT,
        colorDiversityFactor: 0.6,
        colorDiversityModeOperation: COLOR_DIVERSITY_MODE_OPERATIONS.SUBTRACTION,
        selectionConstrains: SELECTION_CONSTRAINS.NOT_SELECT_TWO_POINTS_IN_SUCCESSION
    },
    general: {
        iterationsPerFrame: 1000,
        updateOnFrameIndex: 1,
        ratioFactor: 1 / 1.7
    }
};
