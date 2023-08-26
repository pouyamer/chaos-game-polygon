"use strict";
const { updateOnFrameIndex, iterationsPerFrame, ratioFactor } = config.general;
const { circumRadius, rotationAngle_radian } = config.polygon;
const { hueShift, saturation, lightness, alpha } = config.points.color;
const { selectionConstrains, coloringMode, colorDiversityFactor, colorDiversityModeOperation } = config.points;
const { count: polygonSideCount, color: polygonColor, thickness: polygonThickness } = config.polygon.sides;
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const { size: canvasSize } = config.canvas;
canvas.height = canvasSize.height;
canvas.width = canvasSize.width;
const polygonPoints = Array(polygonSideCount)
    .fill(2)
    .map((_, i, sideArray) => new Point(circumRadius *
    Math.cos((i * 2 * Math.PI + rotationAngle_radian) / sideArray.length), circumRadius *
    Math.sin((i * 2 * Math.PI + rotationAngle_radian) / sideArray.length), new HslColor((360 * i) / polygonSideCount + hueShift, saturation, lightness, alpha)));
const center = new Point(0, 0, new HslColor(360, saturation, lightness, alpha));
let currentPolygonPointIndex = Math.floor(Math.random() * polygonSideCount);
let currentPoint = center.getNewPointFromFractionOfDistanceBetweenTwoPoints(polygonPoints[currentPolygonPointIndex], ratioFactor, coloringMode, colorDiversityFactor, colorDiversityModeOperation);
const getSelectableNextPoints = (selectionConstrains, lastPointSelected) => {
    switch (selectionConstrains) {
        case "noConstrains":
            return polygonPoints;
        case "notSelectTwoPointsInSuccession":
            return polygonPoints.filter(point => !point.equals(lastPointSelected));
        default:
            throw new Error("error: Invalid selection constrain");
    }
};
let possibleNextSelectablePoints = getSelectableNextPoints(selectionConstrains, polygonPoints[currentPolygonPointIndex]);
const drawNextPoint = () => {
    const currentPolygonPoint = possibleNextSelectablePoints[Math.floor(Math.random() * possibleNextSelectablePoints.length)];
    currentPoint = currentPoint.getNewPointFromFractionOfDistanceBetweenTwoPoints(currentPolygonPoint, ratioFactor, coloringMode, colorDiversityFactor, colorDiversityModeOperation);
    currentPoint.draw(ctx);
    possibleNextSelectablePoints = getSelectableNextPoints(selectionConstrains, currentPolygonPoint);
};
let framesPassed = 1;
const animate = () => {
    if (framesPassed % updateOnFrameIndex === 0) {
        for (let i = 0; i < iterationsPerFrame; i++) {
            drawNextPoint();
        }
    }
    framesPassed++;
    requestAnimationFrame(animate);
};
ctx.fillStyle = config.canvas.backgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);
polygonPoints.forEach((point, i) => {
    point.lineTo(ctx, polygonPoints[i === polygonPoints.length - 1 ? 0 : i + 1], polygonColor, polygonThickness);
    config.polygon.showCornerPoints &&
        polygonPoints.forEach(point => point.draw(ctx));
});
currentPoint.draw(ctx);
animate();
