# chaos-game-polygon
![download (8)](https://github.com/pouyamer/chaos-game-polygon/assets/20505286/99385406-7a1a-4761-9dce-e9800150f641)
# How does it work?
The pattern generation process is based on a series of repetitive steps that involve drawing lines and points. Here's a more detailed breakdown of the process:

1. **Draw the Center Point**: The process begins by drawing a central point. This point serves as the reference for all subsequent steps.<br>
2. **Select a Random Point**: Next, a point is randomly selected from the vertices of a polygon. The polygon can be of any shape or size, and the point can be any one of its vertices.<br>
3. **Draw a Line from the Random Point to the Center**: A line is then drawn from the randomly selected point to the center point drawn in step 1. This line serves as the base for the next steps.<br>
4. **Create a New Point at (ratio-factor) of the Line:** A new point is created at the ratio-factor mark of the line drawn in step 3, starting from the polygon point. This point will be used as the starting point for the next line.<br>
5. **Draw a Line from the New Point to Another Polygon Point**: A line is then drawn from the new point created in step 4 to another point on the polygon. This creates a new segment and adds complexity to the pattern.<br>
6. **Repeat Steps 4 and 5**: Steps 4 and 5 are repeated, each time creating a new point at the 2/3 mark of the previous line and drawing a new line to another polygon point. This process is repeated until the desired pattern complexity is achieved.<br>
This process creates a complex and intricate pattern by repeatedly drawing lines between points on a polygon and a central point. The randomness of the point selection and the constant shifting of the line's starting point create a pattern that is both unpredictable and aesthetically pleasing.

# Config File Documentation

The config object contains configuration settings for a canvas and a polygon.
## Configurations
you can edit ```config.js``` file to your liking
### Canvas Configuration

```size```: This object contains the ```width``` and ```height``` of the canvas.<br>
```backgroundColor```: This is the background color of the canvas.
### Polygon Configuration

```sides```:
- ```amount```: like ```5``` for pentagon, ```3``` for triangle (trigon)
-  ```color```: color of the sides of polygon
-   ```thickness``` : how thick the lines of polygon is.<br>
```rotationAngle_radian```: This is the rotation angle of the polygon in radians. rotates the shape by an angle (radian) if you want degrees then use this formula: $(degree / 180) * \pi $.<br>
```showPolygonPoints```: If set to ```true```, then shows side points of the polygon.<br>
```circleContainingPolygonPointsRadius```: This is the radius of the circle that contains the polygon's points. The larger the circle, the larger the sides of the polygon.<br>
### Points Configuration

```radius```: This is the radius of the points shown on canvas.<br>
```color``` : here you can set color values and  coloring mode 
- ```saturation``` (from ```0``` to ```100```)
- ```lightness``` (from ```0``` to ```100```)
- ```alpha``` (from ```0``` to ```1```)
- ```hueOffset``` that adds to the points hue set by the app. <br>
```coloringMode```

