/**
* The Graphics class contains a set of methods that you can use to create a
* vector shape. Display objects that support drawing include Sprite and Shape
* objects. Each of these classes includes a <code>graphics</code> property
* that is a Graphics object. The following are among those helper functions
* provided for ease of use: <code>drawRect()</code>,
* <code>drawRoundRect()</code>, <code>drawCircle()</code>, and
* <code>drawEllipse()</code>.
*
* <p>You cannot create a Graphics object directly from ActionScript code. If
* you call <code>new Graphics()</code>, an exception is thrown.</p>
*
* <p>The Graphics class is final; it cannot be subclassed.</p>
*/
var Graphics = (function () {
    function Graphics() {
    }
    /**
    * Fills a drawing area with a bitmap image. The bitmap can be repeated or
    * tiled to fill the area. The fill remains in effect until you call the
    * <code>beginFill()</code>, <code>beginBitmapFill()</code>,
    * <code>beginGradientFill()</code>, or <code>beginShaderFill()</code>
    * method. Calling the <code>clear()</code> method clears the fill.
    *
    * <p>The application renders the fill whenever three or more points are
    * drawn, or when the <code>endFill()</code> method is called. </p>
    *
    * @param bitmap A transparent or opaque bitmap image that contains the bits
    *               to be displayed.
    * @param matrix A matrix object(of the flash.geom.Matrix class), which you
    *               can use to define transformations on the bitmap. For
    *               example, you can use the following matrix to rotate a bitmap
    *               by 45 degrees(pi/4 radians):
    * @param repeat If <code>true</code>, the bitmap image repeats in a tiled
    *               pattern. If <code>false</code>, the bitmap image does not
    *               repeat, and the edges of the bitmap are used for any fill
    *               area that extends beyond the bitmap.
    *
    *               <p>For example, consider the following bitmap(a 20 x
    *               20-pixel checkerboard pattern):</p>
    *
    *               <p>When <code>repeat</code> is set to <code>true</code>(as
    *               in the following example), the bitmap fill repeats the
    *               bitmap:</p>
    *
    *               <p>When <code>repeat</code> is set to <code>false</code>,
    *               the bitmap fill uses the edge pixels for the fill area
    *               outside the bitmap:</p>
    * @param smooth If <code>false</code>, upscaled bitmap images are rendered
    *               by using a nearest-neighbor algorithm and look pixelated. If
    *               <code>true</code>, upscaled bitmap images are rendered by
    *               using a bilinear algorithm. Rendering by using the nearest
    *               neighbor algorithm is faster.
    */
    Graphics.prototype.beginBitmapFill = function (bitmap, matrix, repeat, smooth) {
        if (typeof matrix === "undefined") { matrix = null; }
        if (typeof repeat === "undefined") { repeat = true; }
        if (typeof smooth === "undefined") { smooth = false; }
    };

    /**
    * Specifies a simple one-color fill that subsequent calls to other Graphics
    * methods(such as <code>lineTo()</code> or <code>drawCircle()</code>) use
    * when drawing. The fill remains in effect until you call the
    * <code>beginFill()</code>, <code>beginBitmapFill()</code>,
    * <code>beginGradientFill()</code>, or <code>beginShaderFill()</code>
    * method. Calling the <code>clear()</code> method clears the fill.
    *
    * <p>The application renders the fill whenever three or more points are
    * drawn, or when the <code>endFill()</code> method is called.</p>
    *
    * @param color The color of the fill(0xRRGGBB).
    * @param alpha The alpha value of the fill(0.0 to 1.0).
    */
    Graphics.prototype.beginFill = function (color /*int*/ , alpha) {
        if (typeof alpha === "undefined") { alpha = 1; }
    };

    /**
    * Specifies a gradient fill used by subsequent calls to other Graphics
    * methods(such as <code>lineTo()</code> or <code>drawCircle()</code>) for
    * the object. The fill remains in effect until you call the
    * <code>beginFill()</code>, <code>beginBitmapFill()</code>,
    * <code>beginGradientFill()</code>, or <code>beginShaderFill()</code>
    * method. Calling the <code>clear()</code> method clears the fill.
    *
    * <p>The application renders the fill whenever three or more points are
    * drawn, or when the <code>endFill()</code> method is called. </p>
    *
    * @param type                A value from the GradientType class that
    *                            specifies which gradient type to use:
    *                            <code>GradientType.LINEAR</code> or
    *                            <code>GradientType.RADIAL</code>.
    * @param colors              An array of RGB hexadecimal color values used
    *                            in the gradient; for example, red is 0xFF0000,
    *                            blue is 0x0000FF, and so on. You can specify
    *                            up to 15 colors. For each color, specify a
    *                            corresponding value in the alphas and ratios
    *                            parameters.
    * @param alphas              An array of alpha values for the corresponding
    *                            colors in the colors array; valid values are 0
    *                            to 1. If the value is less than 0, the default
    *                            is 0. If the value is greater than 1, the
    *                            default is 1.
    * @param ratios              An array of color distribution ratios; valid
    *                            values are 0-255. This value defines the
    *                            percentage of the width where the color is
    *                            sampled at 100%. The value 0 represents the
    *                            left position in the gradient box, and 255
    *                            represents the right position in the gradient
    *                            box.
    * @param matrix              A transformation matrix as defined by the
    *                            flash.geom.Matrix class. The flash.geom.Matrix
    *                            class includes a
    *                            <code>createGradientBox()</code> method, which
    *                            lets you conveniently set up the matrix for use
    *                            with the <code>beginGradientFill()</code>
    *                            method.
    * @param spreadMethod        A value from the SpreadMethod class that
    *                            specifies which spread method to use, either:
    *                            <code>SpreadMethod.PAD</code>,
    *                            <code>SpreadMethod.REFLECT</code>, or
    *                            <code>SpreadMethod.REPEAT</code>.
    *
    *                            <p>For example, consider a simple linear
    *                            gradient between two colors:</p>
    *
    *                            <p>This example uses
    *                            <code>SpreadMethod.PAD</code> for the spread
    *                            method, and the gradient fill looks like the
    *                            following:</p>
    *
    *                            <p>If you use <code>SpreadMethod.REFLECT</code>
    *                            for the spread method, the gradient fill looks
    *                            like the following:</p>
    *
    *                            <p>If you use <code>SpreadMethod.REPEAT</code>
    *                            for the spread method, the gradient fill looks
    *                            like the following:</p>
    * @param interpolationMethod A value from the InterpolationMethod class that
    *                            specifies which value to use:
    *                            <code>InterpolationMethod.LINEAR_RGB</code> or
    *                            <code>InterpolationMethod.RGB</code>
    *
    *                            <p>For example, consider a simple linear
    *                            gradient between two colors(with the
    *                            <code>spreadMethod</code> parameter set to
    *                            <code>SpreadMethod.REFLECT</code>). The
    *                            different interpolation methods affect the
    *                            appearance as follows: </p>
    * @param focalPointRatio     A number that controls the location of the
    *                            focal point of the gradient. 0 means that the
    *                            focal point is in the center. 1 means that the
    *                            focal point is at one border of the gradient
    *                            circle. -1 means that the focal point is at the
    *                            other border of the gradient circle. A value
    *                            less than -1 or greater than 1 is rounded to -1
    *                            or 1. For example, the following example shows
    *                            a <code>focalPointRatio</code> set to 0.75:
    * @throws ArgumentError If the <code>type</code> parameter is not valid.
    */
    Graphics.prototype.beginGradientFill = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
        if (typeof matrix === "undefined") { matrix = null; }
        if (typeof spreadMethod === "undefined") { spreadMethod = "pad"; }
        if (typeof interpolationMethod === "undefined") { interpolationMethod = "rgb"; }
        if (typeof focalPointRatio === "undefined") { focalPointRatio = 0; }
    };

    /**
    * Specifies a shader fill used by subsequent calls to other Graphics methods
    * (such as <code>lineTo()</code> or <code>drawCircle()</code>) for the
    * object. The fill remains in effect until you call the
    * <code>beginFill()</code>, <code>beginBitmapFill()</code>,
    * <code>beginGradientFill()</code>, or <code>beginShaderFill()</code>
    * method. Calling the <code>clear()</code> method clears the fill.
    *
    * <p>The application renders the fill whenever three or more points are
    * drawn, or when the <code>endFill()</code> method is called.</p>
    *
    * <p>Shader fills are not supported under GPU rendering; filled areas will
    * be colored cyan.</p>
    *
    * @param shader The shader to use for the fill. This Shader instance is not
    *               required to specify an image input. However, if an image
    *               input is specified in the shader, the input must be provided
    *               manually. To specify the input, set the <code>input</code>
    *               property of the corresponding ShaderInput property of the
    *               <code>Shader.data</code> property.
    *
    *               <p>When you pass a Shader instance as an argument the shader
    *               is copied internally. The drawing fill operation uses that
    *               internal copy, not a reference to the original shader. Any
    *               changes made to the shader, such as changing a parameter
    *               value, input, or bytecode, are not applied to the copied
    *               shader that's used for the fill.</p>
    * @param matrix A matrix object(of the flash.geom.Matrix class), which you
    *               can use to define transformations on the shader. For
    *               example, you can use the following matrix to rotate a shader
    *               by 45 degrees(pi/4 radians):
    *
    *               <p>The coordinates received in the shader are based on the
    *               matrix that is specified for the <code>matrix</code>
    *               parameter. For a default(<code>null</code>) matrix, the
    *               coordinates in the shader are local pixel coordinates which
    *               can be used to sample an input.</p>
    * @throws ArgumentError When the shader output type is not compatible with
    *                       this operation(the shader must specify a
    *                       <code>pixel3</code> or <code>pixel4</code> output).
    * @throws ArgumentError When the shader specifies an image input that isn't
    *                       provided.
    * @throws ArgumentError When a ByteArray or Vector.<Number> instance is used
    *                       as an input and the <code>width</code> and
    *                       <code>height</code> properties aren't specified for
    *                       the ShaderInput, or the specified values don't match
    *                       the amount of data in the input object. See the
    *                       <code>ShaderInput.input</code> property for more
    *                       information.
    */
    //		public beginShaderFill(shader:Shader, matrix:Matrix = null)
    //		{
    //
    //		}
    /**
    * Clears the graphics that were drawn to this Graphics object, and resets
    * fill and line style settings.
    *
    */
    Graphics.prototype.clear = function () {
    };

    /**
    * Copies all of drawing commands from the source Graphics object into the
    * calling Graphics object.
    *
    * @param sourceGraphics The Graphics object from which to copy the drawing
    *                       commands.
    */
    Graphics.prototype.copyFrom = function (sourceGraphics) {
    };

    /**
    * Draws a cubic Bezier curve from the current drawing position to the
    * specified anchor point. Cubic Bezier curves consist of two anchor points
    * and two control points. The curve interpolates the two anchor points and
    * curves toward the two control points.
    *
    * The four points you use to draw a cubic Bezier curve with the
    * <code>cubicCurveTo()</code> method are as follows:
    *
    * <ul>
    *   <li>The current drawing position is the first anchor point. </li>
    *   <li>The anchorX and anchorY parameters specify the second anchor point.
    *   </li>
    *   <li>The <code>controlX1</code> and <code>controlY1</code> parameters
    *   specify the first control point.</li>
    *   <li>The <code>controlX2</code> and <code>controlY2</code> parameters
    *   specify the second control point.</li>
    * </ul>
    *
    * If you call the <code>cubicCurveTo()</code> method before calling the
    * <code>moveTo()</code> method, your curve starts at position (0, 0).
    *
    * If the <code>cubicCurveTo()</code> method succeeds, the Flash runtime sets
    * the current drawing position to (<code>anchorX</code>,
    * <code>anchorY</code>). If the <code>cubicCurveTo()</code> method fails,
    * the current drawing position remains unchanged.
    *
    * If your movie clip contains content created with the Flash drawing tools,
    * the results of calls to the <code>cubicCurveTo()</code> method are drawn
    * underneath that content.
    *
    * @param controlX1 Specifies the horizontal position of the first control
    *                  point relative to the registration point of the parent
    *                  display object.
    * @param controlY1 Specifies the vertical position of the first control
    *                  point relative to the registration point of the parent
    *                  display object.
    * @param controlX2 Specifies the horizontal position of the second control
    *                  point relative to the registration point of the parent
    *                  display object.
    * @param controlY2 Specifies the vertical position of the second control
    *                  point relative to the registration point of the parent
    *                  display object.
    * @param anchorX   Specifies the horizontal position of the anchor point
    *                  relative to the registration point of the parent display
    *                  object.
    * @param anchorY   Specifies the vertical position of the anchor point
    *                  relative to the registration point of the parent display
    *                  object.
    */
    Graphics.prototype.cubicCurveTo = function (controlX1, controlY1, controlX2, controlY2, anchorX, anchorY) {
    };

    /**
    * Draws a curve using the current line style from the current drawing
    * position to(anchorX, anchorY) and using the control point that
    * (<code>controlX</code>, <code>controlY</code>) specifies. The current
    * drawing position is then set to(<code>anchorX</code>,
    * <code>anchorY</code>). If the movie clip in which you are drawing contains
    * content created with the Flash drawing tools, calls to the
    * <code>curveTo()</code> method are drawn underneath this content. If you
    * call the <code>curveTo()</code> method before any calls to the
    * <code>moveTo()</code> method, the default of the current drawing position
    * is(0, 0). If any of the parameters are missing, this method fails and the
    * current drawing position is not changed.
    *
    * <p>The curve drawn is a quadratic Bezier curve. Quadratic Bezier curves
    * consist of two anchor points and one control point. The curve interpolates
    * the two anchor points and curves toward the control point. </p>
    *
    * @param controlX A number that specifies the horizontal position of the
    *                 control point relative to the registration point of the
    *                 parent display object.
    * @param controlY A number that specifies the vertical position of the
    *                 control point relative to the registration point of the
    *                 parent display object.
    * @param anchorX  A number that specifies the horizontal position of the
    *                 next anchor point relative to the registration point of
    *                 the parent display object.
    * @param anchorY  A number that specifies the vertical position of the next
    *                 anchor point relative to the registration point of the
    *                 parent display object.
    */
    Graphics.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) {
    };

    /**
    * Draws a circle. Set the line style, fill, or both before you call the
    * <code>drawCircle()</code> method, by calling the <code>linestyle()</code>,
    * <code>lineGradientStyle()</code>, <code>beginFill()</code>,
    * <code>beginGradientFill()</code>, or <code>beginBitmapFill()</code>
    * method.
    *
    * @param x      The <i>x</i> location of the center of the circle relative
    *               to the registration point of the parent display object(in
    *               pixels).
    * @param y      The <i>y</i> location of the center of the circle relative
    *               to the registration point of the parent display object(in
    *               pixels).
    * @param radius The radius of the circle(in pixels).
    */
    Graphics.prototype.drawCircle = function (x, y, radius) {
    };

    /**
    * Draws an ellipse. Set the line style, fill, or both before you call the
    * <code>drawEllipse()</code> method, by calling the
    * <code>linestyle()</code>, <code>lineGradientStyle()</code>,
    * <code>beginFill()</code>, <code>beginGradientFill()</code>, or
    * <code>beginBitmapFill()</code> method.
    *
    * @param x      The <i>x</i> location of the top-left of the bounding-box of
    *               the ellipse relative to the registration point of the parent
    *               display object(in pixels).
    * @param y      The <i>y</i> location of the top left of the bounding-box of
    *               the ellipse relative to the registration point of the parent
    *               display object(in pixels).
    * @param width  The width of the ellipse(in pixels).
    * @param height The height of the ellipse(in pixels).
    */
    Graphics.prototype.drawEllipse = function (x, y, width, height) {
    };

    /**
    * Submits a series of IGraphicsData instances for drawing. This method
    * accepts a Vector containing objects including paths, fills, and strokes
    * that implement the IGraphicsData interface. A Vector of IGraphicsData
    * instances can refer to a part of a shape, or a complex fully defined set
    * of data for rendering a complete shape.
    *
    * <p> Graphics paths can contain other graphics paths. If the
    * <code>graphicsData</code> Vector includes a path, that path and all its
    * sub-paths are rendered during this operation. </p>
    *
    */
    Graphics.prototype.drawGraphicsData = function (graphicsData) {
    };

    /**
    * Submits a series of commands for drawing. The <code>drawPath()</code>
    * method uses vector arrays to consolidate individual <code>moveTo()</code>,
    * <code>lineTo()</code>, and <code>curveTo()</code> drawing commands into a
    * single call. The <code>drawPath()</code> method parameters combine drawing
    * commands with x- and y-coordinate value pairs and a drawing direction. The
    * drawing commands are values from the GraphicsPathCommand class. The x- and
    * y-coordinate value pairs are Numbers in an array where each pair defines a
    * coordinate location. The drawing direction is a value from the
    * GraphicsPathWinding class.
    *
    * <p> Generally, drawings render faster with <code>drawPath()</code> than
    * with a series of individual <code>lineTo()</code> and
    * <code>curveTo()</code> methods. </p>
    *
    * <p> The <code>drawPath()</code> method uses a uses a floating computation
    * so rotation and scaling of shapes is more accurate and gives better
    * results. However, curves submitted using the <code>drawPath()</code>
    * method can have small sub-pixel alignment errors when used in conjunction
    * with the <code>lineTo()</code> and <code>curveTo()</code> methods. </p>
    *
    * <p> The <code>drawPath()</code> method also uses slightly different rules
    * for filling and drawing lines. They are: </p>
    *
    * <ul>
    *   <li>When a fill is applied to rendering a path:
    * <ul>
    *   <li>A sub-path of less than 3 points is not rendered.(But note that the
    * stroke rendering will still occur, consistent with the rules for strokes
    * below.)</li>
    *   <li>A sub-path that isn't closed(the end point is not equal to the
    * begin point) is implicitly closed.</li>
    * </ul>
    * </li>
    *   <li>When a stroke is applied to rendering a path:
    * <ul>
    *   <li>The sub-paths can be composed of any number of points.</li>
    *   <li>The sub-path is never implicitly closed.</li>
    * </ul>
    * </li>
    * </ul>
    *
    * @param winding Specifies the winding rule using a value defined in the
    *                GraphicsPathWinding class.
    */
    Graphics.prototype.drawPath = function (commands, data, winding) {
    };

    /**
    * Draws a rectangle. Set the line style, fill, or both before you call the
    * <code>drawRect()</code> method, by calling the <code>linestyle()</code>,
    * <code>lineGradientStyle()</code>, <code>beginFill()</code>,
    * <code>beginGradientFill()</code>, or <code>beginBitmapFill()</code>
    * method.
    *
    * @param x      A number indicating the horizontal position relative to the
    *               registration point of the parent display object(in pixels).
    * @param y      A number indicating the vertical position relative to the
    *               registration point of the parent display object(in pixels).
    * @param width  The width of the rectangle(in pixels).
    * @param height The height of the rectangle(in pixels).
    * @throws ArgumentError If the <code>width</code> or <code>height</code>
    *                       parameters are not a number
    *                      (<code>Number.NaN</code>).
    */
    Graphics.prototype.drawRect = function (x, y, width, height) {
    };

    /**
    * Draws a rounded rectangle. Set the line style, fill, or both before you
    * call the <code>drawRoundRect()</code> method, by calling the
    * <code>linestyle()</code>, <code>lineGradientStyle()</code>,
    * <code>beginFill()</code>, <code>beginGradientFill()</code>, or
    * <code>beginBitmapFill()</code> method.
    *
    * @param x             A number indicating the horizontal position relative
    *                      to the registration point of the parent display
    *                      object(in pixels).
    * @param y             A number indicating the vertical position relative to
    *                      the registration point of the parent display object
    *                     (in pixels).
    * @param width         The width of the round rectangle(in pixels).
    * @param height        The height of the round rectangle(in pixels).
    * @param ellipseWidth  The width of the ellipse used to draw the rounded
    *                      corners(in pixels).
    * @param ellipseHeight The height of the ellipse used to draw the rounded
    *                      corners(in pixels). Optional; if no value is
    *                      specified, the default value matches that provided
    *                      for the <code>ellipseWidth</code> parameter.
    * @throws ArgumentError If the <code>width</code>, <code>height</code>,
    *                       <code>ellipseWidth</code> or
    *                       <code>ellipseHeight</code> parameters are not a
    *                       number(<code>Number.NaN</code>).
    */
    Graphics.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
        if (typeof ellipseHeight === "undefined") { ellipseHeight = NaN; }
    };

    //public drawRoundRectComplex(x:Float, y:Float, width:Float, height:Float, topLeftRadius:Float, topRightRadius:Float, bottomLeftRadius:Float, bottomRightRadius:Float):Void;
    /**
    * Renders a set of triangles, typically to distort bitmaps and give them a
    * three-dimensional appearance. The <code>drawTriangles()</code> method maps
    * either the current fill, or a bitmap fill, to the triangle faces using a
    * set of(u,v) coordinates.
    *
    * <p> Any type of fill can be used, but if the fill has a transform matrix
    * that transform matrix is ignored. </p>
    *
    * <p> A <code>uvtData</code> parameter improves texture mapping when a
    * bitmap fill is used. </p>
    *
    * @param culling Specifies whether to render triangles that face in a
    *                specified direction. This parameter prevents the rendering
    *                of triangles that cannot be seen in the current view. This
    *                parameter can be set to any value defined by the
    *                TriangleCulling class.
    */
    Graphics.prototype.drawTriangles = function (vertices, indices, uvtData, culling) {
        if (typeof indices === "undefined") { indices = null; }
        if (typeof uvtData === "undefined") { uvtData = null; }
        if (typeof culling === "undefined") { culling = null; }
    };

    /**
    * Applies a fill to the lines and curves that were added since the last call
    * to the <code>beginFill()</code>, <code>beginGradientFill()</code>, or
    * <code>beginBitmapFill()</code> method. Flash uses the fill that was
    * specified in the previous call to the <code>beginFill()</code>,
    * <code>beginGradientFill()</code>, or <code>beginBitmapFill()</code>
    * method. If the current drawing position does not equal the previous
    * position specified in a <code>moveTo()</code> method and a fill is
    * defined, the path is closed with a line and then filled.
    *
    */
    Graphics.prototype.endFill = function () {
    };

    /**
    * Specifies a bitmap to use for the line stroke when drawing lines.
    *
    * <p>The bitmap line style is used for subsequent calls to Graphics methods
    * such as the <code>lineTo()</code> method or the <code>drawCircle()</code>
    * method. The line style remains in effect until you call the
    * <code>lineStyle()</code> or <code>lineGradientStyle()</code> methods, or
    * the <code>lineBitmapStyle()</code> method again with different parameters.
    * </p>
    *
    * <p>You can call the <code>lineBitmapStyle()</code> method in the middle of
    * drawing a path to specify different styles for different line segments
    * within a path. </p>
    *
    * <p>Call the <code>lineStyle()</code> method before you call the
    * <code>lineBitmapStyle()</code> method to enable a stroke, or else the
    * value of the line style is <code>undefined</code>.</p>
    *
    * <p>Calls to the <code>clear()</code> method set the line style back to
    * <code>undefined</code>. </p>
    *
    * @param bitmap The bitmap to use for the line stroke.
    * @param matrix An optional transformation matrix as defined by the
    *               flash.geom.Matrix class. The matrix can be used to scale or
    *               otherwise manipulate the bitmap before applying it to the
    *               line style.
    * @param repeat Whether to repeat the bitmap in a tiled fashion.
    * @param smooth Whether smoothing should be applied to the bitmap.
    */
    Graphics.prototype.lineBitmapStyle = function (bitmap, matrix, repeat, smooth) {
        if (typeof matrix === "undefined") { matrix = null; }
        if (typeof repeat === "undefined") { repeat = true; }
        if (typeof smooth === "undefined") { smooth = false; }
    };

    /**
    * Specifies a gradient to use for the stroke when drawing lines.
    *
    * <p>The gradient line style is used for subsequent calls to Graphics
    * methods such as the <code>lineTo()</code> methods or the
    * <code>drawCircle()</code> method. The line style remains in effect until
    * you call the <code>lineStyle()</code> or <code>lineBitmapStyle()</code>
    * methods, or the <code>lineGradientStyle()</code> method again with
    * different parameters. </p>
    *
    * <p>You can call the <code>lineGradientStyle()</code> method in the middle
    * of drawing a path to specify different styles for different line segments
    * within a path. </p>
    *
    * <p>Call the <code>lineStyle()</code> method before you call the
    * <code>lineGradientStyle()</code> method to enable a stroke, or else the
    * value of the line style is <code>undefined</code>.</p>
    *
    * <p>Calls to the <code>clear()</code> method set the line style back to
    * <code>undefined</code>. </p>
    *
    * @param type                A value from the GradientType class that
    *                            specifies which gradient type to use, either
    *                            GradientType.LINEAR or GradientType.RADIAL.
    * @param colors              An array of RGB hexadecimal color values used
    *                            in the gradient; for example, red is 0xFF0000,
    *                            blue is 0x0000FF, and so on. You can specify
    *                            up to 15 colors. For each color, specify a
    *                            corresponding value in the alphas and ratios
    *                            parameters.
    * @param alphas              An array of alpha values for the corresponding
    *                            colors in the colors array; valid values are 0
    *                            to 1. If the value is less than 0, the default
    *                            is 0. If the value is greater than 1, the
    *                            default is 1.
    * @param ratios              An array of color distribution ratios; valid
    *                            values are 0-255. This value defines the
    *                            percentage of the width where the color is
    *                            sampled at 100%. The value 0 represents the
    *                            left position in the gradient box, and 255
    *                            represents the right position in the gradient
    *                            box.
    * @param matrix              A transformation matrix as defined by the
    *                            flash.geom.Matrix class. The flash.geom.Matrix
    *                            class includes a
    *                            <code>createGradientBox()</code> method, which
    *                            lets you conveniently set up the matrix for use
    *                            with the <code>lineGradientStyle()</code>
    *                            method.
    * @param spreadMethod        A value from the SpreadMethod class that
    *                            specifies which spread method to use:
    * @param interpolationMethod A value from the InterpolationMethod class that
    *                            specifies which value to use. For example,
    *                            consider a simple linear gradient between two
    *                            colors(with the <code>spreadMethod</code>
    *                            parameter set to
    *                            <code>SpreadMethod.REFLECT</code>). The
    *                            different interpolation methods affect the
    *                            appearance as follows:
    * @param focalPointRatio     A number that controls the location of the
    *                            focal point of the gradient. The value 0 means
    *                            the focal point is in the center. The value 1
    *                            means the focal point is at one border of the
    *                            gradient circle. The value -1 means that the
    *                            focal point is at the other border of the
    *                            gradient circle. Values less than -1 or greater
    *                            than 1 are rounded to -1 or 1. The following
    *                            image shows a gradient with a
    *                            <code>focalPointRatio</code> of -0.75:
    */
    Graphics.prototype.lineGradientStyle = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
        if (typeof matrix === "undefined") { matrix = null; }
        if (typeof spreadMethod === "undefined") { spreadMethod = null; }
        if (typeof interpolationMethod === "undefined") { interpolationMethod = null; }
        if (typeof focalPointRatio === "undefined") { focalPointRatio = 0; }
    };

    /**
    * Specifies a shader to use for the line stroke when drawing lines.
    *
    * <p>The shader line style is used for subsequent calls to Graphics methods
    * such as the <code>lineTo()</code> method or the <code>drawCircle()</code>
    * method. The line style remains in effect until you call the
    * <code>lineStyle()</code> or <code>lineGradientStyle()</code> methods, or
    * the <code>lineBitmapStyle()</code> method again with different parameters.
    * </p>
    *
    * <p>You can call the <code>lineShaderStyle()</code> method in the middle of
    * drawing a path to specify different styles for different line segments
    * within a path. </p>
    *
    * <p>Call the <code>lineStyle()</code> method before you call the
    * <code>lineShaderStyle()</code> method to enable a stroke, or else the
    * value of the line style is <code>undefined</code>.</p>
    *
    * <p>Calls to the <code>clear()</code> method set the line style back to
    * <code>undefined</code>. </p>
    *
    * @param shader The shader to use for the line stroke.
    * @param matrix An optional transformation matrix as defined by the
    *               flash.geom.Matrix class. The matrix can be used to scale or
    *               otherwise manipulate the bitmap before applying it to the
    *               line style.
    */
    //		public lineShaderStyle(shader:Shader, matrix:Matrix = null)
    //		{
    //
    //		}
    /**
    * Specifies a line style used for subsequent calls to Graphics methods such
    * as the <code>lineTo()</code> method or the <code>drawCircle()</code>
    * method. The line style remains in effect until you call the
    * <code>lineGradientStyle()</code> method, the
    * <code>lineBitmapStyle()</code> method, or the <code>lineStyle()</code>
    * method with different parameters.
    *
    * <p>You can call the <code>lineStyle()</code> method in the middle of
    * drawing a path to specify different styles for different line segments
    * within the path.</p>
    *
    * <p><b>Note: </b>Calls to the <code>clear()</code> method set the line
    * style back to <code>undefined</code>.</p>
    *
    * <p><b>Note: </b>Flash Lite 4 supports only the first three parameters
    * (<code>thickness</code>, <code>color</code>, and <code>alpha</code>).</p>
    *
    * @param thickness    An integer that indicates the thickness of the line in
    *                     points; valid values are 0-255. If a number is not
    *                     specified, or if the parameter is undefined, a line is
    *                     not drawn. If a value of less than 0 is passed, the
    *                     default is 0. The value 0 indicates hairline
    *                     thickness; the maximum thickness is 255. If a value
    *                     greater than 255 is passed, the default is 255.
    * @param color        A hexadecimal color value of the line; for example,
    *                     red is 0xFF0000, blue is 0x0000FF, and so on. If a
    *                     value is not indicated, the default is 0x000000
    *                    (black). Optional.
    * @param alpha        A number that indicates the alpha value of the color
    *                     of the line; valid values are 0 to 1. If a value is
    *                     not indicated, the default is 1(solid). If the value
    *                     is less than 0, the default is 0. If the value is
    *                     greater than 1, the default is 1.
    * @param pixelHinting(Not supported in Flash Lite 4) A Boolean value that
    *                     specifies whether to hint strokes to full pixels. This
    *                     affects both the position of anchors of a curve and
    *                     the line stroke size itself. With
    *                     <code>pixelHinting</code> set to <code>true</code>,
    *                     line widths are adjusted to full pixel widths. With
    *                     <code>pixelHinting</code> set to <code>false</code>,
    *                     disjoints can appear for curves and straight lines.
    *                     For example, the following illustrations show how
    *                     Flash Player or Adobe AIR renders two rounded
    *                     rectangles that are identical, except that the
    *                     <code>pixelHinting</code> parameter used in the
    *                     <code>lineStyle()</code> method is set differently
    *                    (the images are scaled by 200%, to emphasize the
    *                     difference):
    *
    *                     <p>If a value is not supplied, the line does not use
    *                     pixel hinting.</p>
    * @param scaleMode   (Not supported in Flash Lite 4) A value from the
    *                     LineScaleMode class that specifies which scale mode to
    *                     use:
    *                     <ul>
    *                       <li> <code>LineScaleMode.NORMAL</code> - Always
    *                     scale the line thickness when the object is scaled
    *                    (the default). </li>
    *                       <li> <code>LineScaleMode.NONE</code> - Never scale
    *                     the line thickness. </li>
    *                       <li> <code>LineScaleMode.VERTICAL</code> - Do not
    *                     scale the line thickness if the object is scaled
    *                     vertically <i>only</i>. For example, consider the
    *                     following circles, drawn with a one-pixel line, and
    *                     each with the <code>scaleMode</code> parameter set to
    *                     <code>LineScaleMode.VERTICAL</code>. The circle on the
    *                     left is scaled vertically only, and the circle on the
    *                     right is scaled both vertically and horizontally:
    *                     </li>
    *                       <li> <code>LineScaleMode.HORIZONTAL</code> - Do not
    *                     scale the line thickness if the object is scaled
    *                     horizontally <i>only</i>. For example, consider the
    *                     following circles, drawn with a one-pixel line, and
    *                     each with the <code>scaleMode</code> parameter set to
    *                     <code>LineScaleMode.HORIZONTAL</code>. The circle on
    *                     the left is scaled horizontally only, and the circle
    *                     on the right is scaled both vertically and
    *                     horizontally:   </li>
    *                     </ul>
    * @param caps        (Not supported in Flash Lite 4) A value from the
    *                     CapsStyle class that specifies the type of caps at the
    *                     end of lines. Valid values are:
    *                     <code>CapsStyle.NONE</code>,
    *                     <code>CapsStyle.ROUND</code>, and
    *                     <code>CapsStyle.SQUARE</code>. If a value is not
    *                     indicated, Flash uses round caps.
    *
    *                     <p>For example, the following illustrations show the
    *                     different <code>capsStyle</code> settings. For each
    *                     setting, the illustration shows a blue line with a
    *                     thickness of 30(for which the <code>capsStyle</code>
    *                     applies), and a superimposed black line with a
    *                     thickness of 1(for which no <code>capsStyle</code>
    *                     applies): </p>
    * @param joints      (Not supported in Flash Lite 4) A value from the
    *                     JointStyle class that specifies the type of joint
    *                     appearance used at angles. Valid values are:
    *                     <code>JointStyle.BEVEL</code>,
    *                     <code>JointStyle.MITER</code>, and
    *                     <code>JointStyle.ROUND</code>. If a value is not
    *                     indicated, Flash uses round joints.
    *
    *                     <p>For example, the following illustrations show the
    *                     different <code>joints</code> settings. For each
    *                     setting, the illustration shows an angled blue line
    *                     with a thickness of 30(for which the
    *                     <code>jointStyle</code> applies), and a superimposed
    *                     angled black line with a thickness of 1(for which no
    *                     <code>jointStyle</code> applies): </p>
    *
    *                     <p><b>Note:</b> For <code>joints</code> set to
    *                     <code>JointStyle.MITER</code>, you can use the
    *                     <code>miterLimit</code> parameter to limit the length
    *                     of the miter.</p>
    * @param miterLimit  (Not supported in Flash Lite 4) A number that
    *                     indicates the limit at which a miter is cut off. Valid
    *                     values range from 1 to 255(and values outside that
    *                     range are rounded to 1 or 255). This value is only
    *                     used if the <code>jointStyle</code> is set to
    *                     <code>"miter"</code>. The <code>miterLimit</code>
    *                     value represents the length that a miter can extend
    *                     beyond the point at which the lines meet to form a
    *                     joint. The value expresses a factor of the line
    *                     <code>thickness</code>. For example, with a
    *                     <code>miterLimit</code> factor of 2.5 and a
    *                     <code>thickness</code> of 10 pixels, the miter is cut
    *                     off at 25 pixels.
    *
    *                     <p>For example, consider the following angled lines,
    *                     each drawn with a <code>thickness</code> of 20, but
    *                     with <code>miterLimit</code> set to 1, 2, and 4.
    *                     Superimposed are black reference lines showing the
    *                     meeting points of the joints:</p>
    *
    *                     <p>Notice that a given <code>miterLimit</code> value
    *                     has a specific maximum angle for which the miter is
    *                     cut off. The following table lists some examples:</p>
    */
    Graphics.prototype.lineStyle = function (thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit) {
        if (typeof thickness === "undefined") { thickness = 0; }
        if (typeof color === "undefined") { color = 0; }
        if (typeof alpha === "undefined") { alpha = 1; }
        if (typeof pixelHinting === "undefined") { pixelHinting = false; }
        if (typeof scaleMode === "undefined") { scaleMode = null; }
        if (typeof caps === "undefined") { caps = null; }
        if (typeof joints === "undefined") { joints = null; }
        if (typeof miterLimit === "undefined") { miterLimit = 3; }
    };

    /**
    * Draws a line using the current line style from the current drawing
    * position to(<code>x</code>, <code>y</code>); the current drawing position
    * is then set to(<code>x</code>, <code>y</code>). If the display object in
    * which you are drawing contains content that was created with the Flash
    * drawing tools, calls to the <code>lineTo()</code> method are drawn
    * underneath the content. If you call <code>lineTo()</code> before any calls
    * to the <code>moveTo()</code> method, the default position for the current
    * drawing is(<i>0, 0</i>). If any of the parameters are missing, this
    * method fails and the current drawing position is not changed.
    *
    * @param x A number that indicates the horizontal position relative to the
    *          registration point of the parent display object(in pixels).
    * @param y A number that indicates the vertical position relative to the
    *          registration point of the parent display object(in pixels).
    */
    Graphics.prototype.lineTo = function (x, y) {
    };

    /**
    * Moves the current drawing position to(<code>x</code>, <code>y</code>). If
    * any of the parameters are missing, this method fails and the current
    * drawing position is not changed.
    *
    * @param x A number that indicates the horizontal position relative to the
    *          registration point of the parent display object(in pixels).
    * @param y A number that indicates the vertical position relative to the
    *          registration point of the parent display object(in pixels).
    */
    Graphics.prototype.moveTo = function (x, y) {
    };
    return Graphics;
})();

module.exports = Graphics;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvYmFzZS9HcmFwaGljcy50cyJdLCJuYW1lcyI6WyJHcmFwaGljcyIsIkdyYXBoaWNzLmNvbnN0cnVjdG9yIiwiR3JhcGhpY3MuYmVnaW5CaXRtYXBGaWxsIiwiR3JhcGhpY3MuYmVnaW5GaWxsIiwiR3JhcGhpY3MuYmVnaW5HcmFkaWVudEZpbGwiLCJHcmFwaGljcy5jbGVhciIsIkdyYXBoaWNzLmNvcHlGcm9tIiwiR3JhcGhpY3MuY3ViaWNDdXJ2ZVRvIiwiR3JhcGhpY3MuY3VydmVUbyIsIkdyYXBoaWNzLmRyYXdDaXJjbGUiLCJHcmFwaGljcy5kcmF3RWxsaXBzZSIsIkdyYXBoaWNzLmRyYXdHcmFwaGljc0RhdGEiLCJHcmFwaGljcy5kcmF3UGF0aCIsIkdyYXBoaWNzLmRyYXdSZWN0IiwiR3JhcGhpY3MuZHJhd1JvdW5kUmVjdCIsIkdyYXBoaWNzLmRyYXdUcmlhbmdsZXMiLCJHcmFwaGljcy5lbmRGaWxsIiwiR3JhcGhpY3MubGluZUJpdG1hcFN0eWxlIiwiR3JhcGhpY3MubGluZUdyYWRpZW50U3R5bGUiLCJHcmFwaGljcy5saW5lU3R5bGUiLCJHcmFwaGljcy5saW5lVG8iLCJHcmFwaGljcy5tb3ZlVG8iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0VBeUJHO0FBQ0g7SUFBQUE7SUF3MEJBQyxDQUFDQTtBQUFBRCxJQWp5QkFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFER0E7eUNBQ0hBLFVBQXVCQSxNQUFpQkEsRUFBRUEsTUFBb0JBLEVBQUVBLE1BQXFCQSxFQUFFQSxNQUFzQkE7UUFBbkVFLHFDQUFBQSxNQUFNQSxHQUFVQSxJQUFJQTtBQUFBQSxRQUFFQSxxQ0FBQUEsTUFBTUEsR0FBV0EsSUFBSUE7QUFBQUEsUUFBRUEscUNBQUFBLE1BQU1BLEdBQVdBLEtBQUtBO0FBQUFBLElBRzdHQSxDQUFDQTs7SUFnQkRGOzs7Ozs7Ozs7Ozs7O01BREdBO21DQUNIQSxVQUFpQkEsS0FBWUEsQ0FBQ0EsT0FBT0EsR0FBRUEsS0FBZ0JBO1FBQWhCRyxvQ0FBQUEsS0FBS0EsR0FBVUEsQ0FBQ0E7QUFBQUEsSUFHdkRBLENBQUNBOztJQXFGREg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFER0E7MkNBQ0hBLFVBQXlCQSxJQUFpQkEsRUFBRUEsTUFBNEJBLEVBQUVBLE1BQW9CQSxFQUFFQSxNQUE0QkEsRUFBRUEsTUFBb0JBLEVBQUVBLFlBQTJCQSxFQUFFQSxtQkFBa0NBLEVBQUVBLGVBQTBCQTtRQUFqSEkscUNBQUFBLE1BQU1BLEdBQVVBLElBQUlBO0FBQUFBLFFBQUVBLDJDQUFBQSxZQUFZQSxHQUFVQSxLQUFLQTtBQUFBQSxRQUFFQSxrREFBQUEsbUJBQW1CQSxHQUFVQSxLQUFLQTtBQUFBQSxRQUFFQSw4Q0FBQUEsZUFBZUEsR0FBVUEsQ0FBQ0E7QUFBQUEsSUFHL09BLENBQUNBOztJQThEREo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFYR0E7SUFDSkEsK0RBQStEQTtJQUMvREEsS0FBS0E7SUFDTEEsRUFBRUE7SUFDRkEsS0FBS0E7SUFFSkE7Ozs7TUFJR0E7K0JBQ0hBO0lBR0FLLENBQUNBOztJQVNETDs7Ozs7O01BREdBO2tDQUNIQSxVQUFnQkEsY0FBdUJBO0lBR3ZDTSxDQUFDQTs7SUFvREROOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BREdBO3NDQUNIQSxVQUFvQkEsU0FBZ0JBLEVBQUVBLFNBQWdCQSxFQUFFQSxTQUFnQkEsRUFBRUEsU0FBZ0JBLEVBQUVBLE9BQWNBLEVBQUVBLE9BQWNBO0lBRzFITyxDQUFDQTs7SUFnQ0RQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQURHQTtpQ0FDSEEsVUFBZUEsUUFBZUEsRUFBRUEsUUFBZUEsRUFBRUEsT0FBY0EsRUFBRUEsT0FBY0E7SUFHL0VRLENBQUNBOztJQWlCRFI7Ozs7Ozs7Ozs7Ozs7O01BREdBO29DQUNIQSxVQUFrQkEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsTUFBYUE7SUFHbkRTLENBQUNBOztJQWtCRFQ7Ozs7Ozs7Ozs7Ozs7OztNQURHQTtxQ0FDSEEsVUFBbUJBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLEtBQVlBLEVBQUVBLE1BQWFBO0lBR2xFVSxDQUFDQTs7SUFjRFY7Ozs7Ozs7Ozs7O01BREdBOzBDQUNIQSxVQUF3QkEsWUFBaUNBO0lBR3pEVyxDQUFDQTs7SUErQ0RYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQURHQTtrQ0FDSEEsVUFBZ0JBLFFBQThCQSxFQUFFQSxJQUFrQkEsRUFBRUEsT0FBMkJBO0lBRy9GWSxDQUFDQTs7SUFtQkRaOzs7Ozs7Ozs7Ozs7Ozs7O01BREdBO2tDQUNIQSxVQUFnQkEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsS0FBWUEsRUFBRUEsTUFBYUE7SUFHL0RhLENBQUNBOztJQTRCRGI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFER0E7dUNBQ0hBLFVBQXFCQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxLQUFZQSxFQUFFQSxNQUFhQSxFQUFFQSxZQUFtQkEsRUFBRUEsYUFBMEJBO1FBQTFCYyw0Q0FBQUEsYUFBYUEsR0FBVUEsR0FBR0E7QUFBQUEsSUFHckhBLENBQUNBOztJQXNCRGQsNEtBcEI0S0E7SUFFNUtBOzs7Ozs7Ozs7Ozs7Ozs7OztNQWlCR0E7dUNBQ0hBLFVBQXFCQSxRQUFzQkEsRUFBRUEsT0FBb0NBLEVBQUVBLE9BQTRCQSxFQUFFQSxPQUE4QkE7UUFBbEdlLHNDQUFBQSxPQUFPQSxHQUF5QkEsSUFBSUE7QUFBQUEsUUFBRUEsc0NBQUFBLE9BQU9BLEdBQWlCQSxJQUFJQTtBQUFBQSxRQUFFQSxzQ0FBQUEsT0FBT0EsR0FBbUJBLElBQUlBO0FBQUFBLElBRy9JQSxDQUFDQTs7SUFhRGY7Ozs7Ozs7Ozs7TUFER0E7aUNBQ0hBO0lBR0FnQixDQUFDQTs7SUErQkRoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQURHQTt5Q0FDSEEsVUFBdUJBLE1BQWlCQSxFQUFFQSxNQUFvQkEsRUFBRUEsTUFBcUJBLEVBQUVBLE1BQXNCQTtRQUFuRWlCLHFDQUFBQSxNQUFNQSxHQUFVQSxJQUFJQTtBQUFBQSxRQUFFQSxxQ0FBQUEsTUFBTUEsR0FBV0EsSUFBSUE7QUFBQUEsUUFBRUEscUNBQUFBLE1BQU1BLEdBQVdBLEtBQUtBO0FBQUFBLElBRzdHQSxDQUFDQTs7SUF3RURqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BREdBOzJDQUNIQSxVQUF5QkEsSUFBaUJBLEVBQUVBLE1BQTRCQSxFQUFFQSxNQUFvQkEsRUFBRUEsTUFBb0JBLEVBQUVBLE1BQW9CQSxFQUFFQSxZQUFnQ0EsRUFBRUEsbUJBQThDQSxFQUFFQSxlQUEwQkE7UUFBbElrQixxQ0FBQUEsTUFBTUEsR0FBVUEsSUFBSUE7QUFBQUEsUUFBRUEsMkNBQUFBLFlBQVlBLEdBQWdCQSxJQUFJQTtBQUFBQSxRQUFFQSxrREFBQUEsbUJBQW1CQSxHQUF1QkEsSUFBSUE7QUFBQUEsUUFBRUEsOENBQUFBLGVBQWVBLEdBQVVBLENBQUNBO0FBQUFBLElBR3hQQSxDQUFDQTs7SUE2S0RsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFqSkdBO0lBQ0pBLCtEQUErREE7SUFDL0RBLEtBQUtBO0lBQ0xBLEVBQUVBO0lBQ0ZBLEtBQUtBO0lBRUpBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUEwSUdBO21DQUNIQSxVQUFpQkEsU0FBb0JBLEVBQUVBLEtBQXdCQSxFQUFFQSxLQUFnQkEsRUFBRUEsWUFBNEJBLEVBQUVBLFNBQThCQSxFQUFFQSxJQUFxQkEsRUFBRUEsTUFBd0JBLEVBQUVBLFVBQXFCQTtRQUF0TW1CLHdDQUFBQSxTQUFTQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSxvQ0FBQUEsS0FBS0EsR0FBa0JBLENBQUNBO0FBQUFBLFFBQUVBLG9DQUFBQSxLQUFLQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSwyQ0FBQUEsWUFBWUEsR0FBV0EsS0FBS0E7QUFBQUEsUUFBRUEsd0NBQUFBLFNBQVNBLEdBQWlCQSxJQUFJQTtBQUFBQSxRQUFFQSxtQ0FBQUEsSUFBSUEsR0FBYUEsSUFBSUE7QUFBQUEsUUFBRUEscUNBQUFBLE1BQU1BLEdBQWNBLElBQUlBO0FBQUFBLFFBQUVBLHlDQUFBQSxVQUFVQSxHQUFVQSxDQUFDQTtBQUFBQSxJQUd2TkEsQ0FBQ0E7O0lBa0JEbkI7Ozs7Ozs7Ozs7Ozs7OztNQURHQTtnQ0FDSEEsVUFBY0EsQ0FBUUEsRUFBRUEsQ0FBUUE7SUFHaENvQixDQUFDQTs7SUFZRHBCOzs7Ozs7Ozs7TUFER0E7Z0NBQ0hBLFVBQWNBLENBQVFBLEVBQUVBLENBQVFBO0lBR2hDcUIsQ0FBQ0E7SUFDRnJCLGdCQUFDQTtBQUFEQSxDQUFDQSxJQUFBOztBQUVELHlCQUFrQixDQUFBIiwiZmlsZSI6ImNvcmUvYmFzZS9HcmFwaGljcy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCaXRtYXBEYXRhXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0JpdG1hcERhdGFcIik7XG5pbXBvcnQgQ2Fwc1N0eWxlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0NhcHNTdHlsZVwiKTtcbmltcG9ydCBHcmFkaWVudFR5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvR3JhZGllbnRUeXBlXCIpO1xuaW1wb3J0IEdyYXBoaWNzUGF0aFdpbmRpbmdcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9HcmFwaGljc1BhdGhXaW5kaW5nXCIpO1xuaW1wb3J0IElHcmFwaGljc0RhdGFcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0lHcmFwaGljc0RhdGFcIik7XG5pbXBvcnQgSW50ZXJwb2xhdGlvbk1ldGhvZFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0ludGVycG9sYXRpb25NZXRob2RcIik7XG5pbXBvcnQgSm9pbnRTdHlsZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9Kb2ludFN0eWxlXCIpO1xuaW1wb3J0IExpbmVTY2FsZU1vZGVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0xpbmVTY2FsZU1vZGVcIik7XG5pbXBvcnQgVHJpYW5nbGVDdWxsaW5nXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9UcmlhbmdsZUN1bGxpbmdcIik7XG5pbXBvcnQgU3ByZWFkTWV0aG9kXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL1NwcmVhZE1ldGhvZFwiKTtcbmltcG9ydCBNYXRyaXhcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9NYXRyaXhcIik7XG5cbi8qKlxuICogVGhlIEdyYXBoaWNzIGNsYXNzIGNvbnRhaW5zIGEgc2V0IG9mIG1ldGhvZHMgdGhhdCB5b3UgY2FuIHVzZSB0byBjcmVhdGUgYVxuICogdmVjdG9yIHNoYXBlLiBEaXNwbGF5IG9iamVjdHMgdGhhdCBzdXBwb3J0IGRyYXdpbmcgaW5jbHVkZSBTcHJpdGUgYW5kIFNoYXBlXG4gKiBvYmplY3RzLiBFYWNoIG9mIHRoZXNlIGNsYXNzZXMgaW5jbHVkZXMgYSA8Y29kZT5ncmFwaGljczwvY29kZT4gcHJvcGVydHlcbiAqIHRoYXQgaXMgYSBHcmFwaGljcyBvYmplY3QuIFRoZSBmb2xsb3dpbmcgYXJlIGFtb25nIHRob3NlIGhlbHBlciBmdW5jdGlvbnNcbiAqIHByb3ZpZGVkIGZvciBlYXNlIG9mIHVzZTogPGNvZGU+ZHJhd1JlY3QoKTwvY29kZT4sXG4gKiA8Y29kZT5kcmF3Um91bmRSZWN0KCk8L2NvZGU+LCA8Y29kZT5kcmF3Q2lyY2xlKCk8L2NvZGU+LCBhbmRcbiAqIDxjb2RlPmRyYXdFbGxpcHNlKCk8L2NvZGU+LlxuICpcbiAqIDxwPllvdSBjYW5ub3QgY3JlYXRlIGEgR3JhcGhpY3Mgb2JqZWN0IGRpcmVjdGx5IGZyb20gQWN0aW9uU2NyaXB0IGNvZGUuIElmXG4gKiB5b3UgY2FsbCA8Y29kZT5uZXcgR3JhcGhpY3MoKTwvY29kZT4sIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24uPC9wPlxuICpcbiAqIDxwPlRoZSBHcmFwaGljcyBjbGFzcyBpcyBmaW5hbDsgaXQgY2Fubm90IGJlIHN1YmNsYXNzZWQuPC9wPlxuICovXG5jbGFzcyBHcmFwaGljc1xue1xuXHQvKipcblx0ICogRmlsbHMgYSBkcmF3aW5nIGFyZWEgd2l0aCBhIGJpdG1hcCBpbWFnZS4gVGhlIGJpdG1hcCBjYW4gYmUgcmVwZWF0ZWQgb3Jcblx0ICogdGlsZWQgdG8gZmlsbCB0aGUgYXJlYS4gVGhlIGZpbGwgcmVtYWlucyBpbiBlZmZlY3QgdW50aWwgeW91IGNhbGwgdGhlXG5cdCAqIDxjb2RlPmJlZ2luRmlsbCgpPC9jb2RlPiwgPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+LFxuXHQgKiA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiwgb3IgPGNvZGU+YmVnaW5TaGFkZXJGaWxsKCk8L2NvZGU+XG5cdCAqIG1ldGhvZC4gQ2FsbGluZyB0aGUgPGNvZGU+Y2xlYXIoKTwvY29kZT4gbWV0aG9kIGNsZWFycyB0aGUgZmlsbC5cblx0ICpcblx0ICogPHA+VGhlIGFwcGxpY2F0aW9uIHJlbmRlcnMgdGhlIGZpbGwgd2hlbmV2ZXIgdGhyZWUgb3IgbW9yZSBwb2ludHMgYXJlXG5cdCAqIGRyYXduLCBvciB3aGVuIHRoZSA8Y29kZT5lbmRGaWxsKCk8L2NvZGU+IG1ldGhvZCBpcyBjYWxsZWQuIDwvcD5cblx0ICpcblx0ICogQHBhcmFtIGJpdG1hcCBBIHRyYW5zcGFyZW50IG9yIG9wYXF1ZSBiaXRtYXAgaW1hZ2UgdGhhdCBjb250YWlucyB0aGUgYml0c1xuXHQgKiAgICAgICAgICAgICAgIHRvIGJlIGRpc3BsYXllZC5cblx0ICogQHBhcmFtIG1hdHJpeCBBIG1hdHJpeCBvYmplY3Qob2YgdGhlIGZsYXNoLmdlb20uTWF0cml4IGNsYXNzKSwgd2hpY2ggeW91XG5cdCAqICAgICAgICAgICAgICAgY2FuIHVzZSB0byBkZWZpbmUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBiaXRtYXAuIEZvclxuXHQgKiAgICAgICAgICAgICAgIGV4YW1wbGUsIHlvdSBjYW4gdXNlIHRoZSBmb2xsb3dpbmcgbWF0cml4IHRvIHJvdGF0ZSBhIGJpdG1hcFxuXHQgKiAgICAgICAgICAgICAgIGJ5IDQ1IGRlZ3JlZXMocGkvNCByYWRpYW5zKTpcblx0ICogQHBhcmFtIHJlcGVhdCBJZiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIGJpdG1hcCBpbWFnZSByZXBlYXRzIGluIGEgdGlsZWRcblx0ICogICAgICAgICAgICAgICBwYXR0ZXJuLiBJZiA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSBiaXRtYXAgaW1hZ2UgZG9lcyBub3Rcblx0ICogICAgICAgICAgICAgICByZXBlYXQsIGFuZCB0aGUgZWRnZXMgb2YgdGhlIGJpdG1hcCBhcmUgdXNlZCBmb3IgYW55IGZpbGxcblx0ICogICAgICAgICAgICAgICBhcmVhIHRoYXQgZXh0ZW5kcyBiZXlvbmQgdGhlIGJpdG1hcC5cblx0ICpcblx0ICogICAgICAgICAgICAgICA8cD5Gb3IgZXhhbXBsZSwgY29uc2lkZXIgdGhlIGZvbGxvd2luZyBiaXRtYXAoYSAyMCB4XG5cdCAqICAgICAgICAgICAgICAgMjAtcGl4ZWwgY2hlY2tlcmJvYXJkIHBhdHRlcm4pOjwvcD5cblx0ICpcblx0ICogICAgICAgICAgICAgICA8cD5XaGVuIDxjb2RlPnJlcGVhdDwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+KGFzXG5cdCAqICAgICAgICAgICAgICAgaW4gdGhlIGZvbGxvd2luZyBleGFtcGxlKSwgdGhlIGJpdG1hcCBmaWxsIHJlcGVhdHMgdGhlXG5cdCAqICAgICAgICAgICAgICAgYml0bWFwOjwvcD5cblx0ICpcblx0ICogICAgICAgICAgICAgICA8cD5XaGVuIDxjb2RlPnJlcGVhdDwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPmZhbHNlPC9jb2RlPixcblx0ICogICAgICAgICAgICAgICB0aGUgYml0bWFwIGZpbGwgdXNlcyB0aGUgZWRnZSBwaXhlbHMgZm9yIHRoZSBmaWxsIGFyZWFcblx0ICogICAgICAgICAgICAgICBvdXRzaWRlIHRoZSBiaXRtYXA6PC9wPlxuXHQgKiBAcGFyYW0gc21vb3RoIElmIDxjb2RlPmZhbHNlPC9jb2RlPiwgdXBzY2FsZWQgYml0bWFwIGltYWdlcyBhcmUgcmVuZGVyZWRcblx0ICogICAgICAgICAgICAgICBieSB1c2luZyBhIG5lYXJlc3QtbmVpZ2hib3IgYWxnb3JpdGhtIGFuZCBsb29rIHBpeGVsYXRlZC4gSWZcblx0ICogICAgICAgICAgICAgICA8Y29kZT50cnVlPC9jb2RlPiwgdXBzY2FsZWQgYml0bWFwIGltYWdlcyBhcmUgcmVuZGVyZWQgYnlcblx0ICogICAgICAgICAgICAgICB1c2luZyBhIGJpbGluZWFyIGFsZ29yaXRobS4gUmVuZGVyaW5nIGJ5IHVzaW5nIHRoZSBuZWFyZXN0XG5cdCAqICAgICAgICAgICAgICAgbmVpZ2hib3IgYWxnb3JpdGhtIGlzIGZhc3Rlci5cblx0ICovXG5cdHB1YmxpYyBiZWdpbkJpdG1hcEZpbGwoYml0bWFwOkJpdG1hcERhdGEsIG1hdHJpeDpNYXRyaXggPSBudWxsLCByZXBlYXQ6Ym9vbGVhbiA9IHRydWUsIHNtb290aDpib29sZWFuID0gZmFsc2UpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyBhIHNpbXBsZSBvbmUtY29sb3IgZmlsbCB0aGF0IHN1YnNlcXVlbnQgY2FsbHMgdG8gb3RoZXIgR3JhcGhpY3Ncblx0ICogbWV0aG9kcyhzdWNoIGFzIDxjb2RlPmxpbmVUbygpPC9jb2RlPiBvciA8Y29kZT5kcmF3Q2lyY2xlKCk8L2NvZGU+KSB1c2Vcblx0ICogd2hlbiBkcmF3aW5nLiBUaGUgZmlsbCByZW1haW5zIGluIGVmZmVjdCB1bnRpbCB5b3UgY2FsbCB0aGVcblx0ICogPGNvZGU+YmVnaW5GaWxsKCk8L2NvZGU+LCA8Y29kZT5iZWdpbkJpdG1hcEZpbGwoKTwvY29kZT4sXG5cdCAqIDxjb2RlPmJlZ2luR3JhZGllbnRGaWxsKCk8L2NvZGU+LCBvciA8Y29kZT5iZWdpblNoYWRlckZpbGwoKTwvY29kZT5cblx0ICogbWV0aG9kLiBDYWxsaW5nIHRoZSA8Y29kZT5jbGVhcigpPC9jb2RlPiBtZXRob2QgY2xlYXJzIHRoZSBmaWxsLlxuXHQgKlxuXHQgKiA8cD5UaGUgYXBwbGljYXRpb24gcmVuZGVycyB0aGUgZmlsbCB3aGVuZXZlciB0aHJlZSBvciBtb3JlIHBvaW50cyBhcmVcblx0ICogZHJhd24sIG9yIHdoZW4gdGhlIDxjb2RlPmVuZEZpbGwoKTwvY29kZT4gbWV0aG9kIGlzIGNhbGxlZC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBjb2xvciBUaGUgY29sb3Igb2YgdGhlIGZpbGwoMHhSUkdHQkIpLlxuXHQgKiBAcGFyYW0gYWxwaGEgVGhlIGFscGhhIHZhbHVlIG9mIHRoZSBmaWxsKDAuMCB0byAxLjApLlxuXHQgKi9cblx0cHVibGljIGJlZ2luRmlsbChjb2xvcjpudW1iZXIgLyppbnQqLywgYWxwaGE6bnVtYmVyID0gMSlcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogU3BlY2lmaWVzIGEgZ3JhZGllbnQgZmlsbCB1c2VkIGJ5IHN1YnNlcXVlbnQgY2FsbHMgdG8gb3RoZXIgR3JhcGhpY3Ncblx0ICogbWV0aG9kcyhzdWNoIGFzIDxjb2RlPmxpbmVUbygpPC9jb2RlPiBvciA8Y29kZT5kcmF3Q2lyY2xlKCk8L2NvZGU+KSBmb3Jcblx0ICogdGhlIG9iamVjdC4gVGhlIGZpbGwgcmVtYWlucyBpbiBlZmZlY3QgdW50aWwgeW91IGNhbGwgdGhlXG5cdCAqIDxjb2RlPmJlZ2luRmlsbCgpPC9jb2RlPiwgPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+LFxuXHQgKiA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiwgb3IgPGNvZGU+YmVnaW5TaGFkZXJGaWxsKCk8L2NvZGU+XG5cdCAqIG1ldGhvZC4gQ2FsbGluZyB0aGUgPGNvZGU+Y2xlYXIoKTwvY29kZT4gbWV0aG9kIGNsZWFycyB0aGUgZmlsbC5cblx0ICpcblx0ICogPHA+VGhlIGFwcGxpY2F0aW9uIHJlbmRlcnMgdGhlIGZpbGwgd2hlbmV2ZXIgdGhyZWUgb3IgbW9yZSBwb2ludHMgYXJlXG5cdCAqIGRyYXduLCBvciB3aGVuIHRoZSA8Y29kZT5lbmRGaWxsKCk8L2NvZGU+IG1ldGhvZCBpcyBjYWxsZWQuIDwvcD5cblx0ICpcblx0ICogQHBhcmFtIHR5cGUgICAgICAgICAgICAgICAgQSB2YWx1ZSBmcm9tIHRoZSBHcmFkaWVudFR5cGUgY2xhc3MgdGhhdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZXMgd2hpY2ggZ3JhZGllbnQgdHlwZSB0byB1c2U6XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkdyYWRpZW50VHlwZS5MSU5FQVI8L2NvZGU+IG9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkdyYWRpZW50VHlwZS5SQURJQUw8L2NvZGU+LlxuXHQgKiBAcGFyYW0gY29sb3JzICAgICAgICAgICAgICBBbiBhcnJheSBvZiBSR0IgaGV4YWRlY2ltYWwgY29sb3IgdmFsdWVzIHVzZWRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gdGhlIGdyYWRpZW50OyBmb3IgZXhhbXBsZSwgcmVkIGlzIDB4RkYwMDAwLFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibHVlIGlzIDB4MDAwMEZGLCBhbmQgc28gb24uIFlvdSBjYW4gc3BlY2lmeVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cCB0byAxNSBjb2xvcnMuIEZvciBlYWNoIGNvbG9yLCBzcGVjaWZ5IGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVzcG9uZGluZyB2YWx1ZSBpbiB0aGUgYWxwaGFzIGFuZCByYXRpb3Ncblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVycy5cblx0ICogQHBhcmFtIGFscGhhcyAgICAgICAgICAgICAgQW4gYXJyYXkgb2YgYWxwaGEgdmFsdWVzIGZvciB0aGUgY29ycmVzcG9uZGluZ1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcnMgaW4gdGhlIGNvbG9ycyBhcnJheTsgdmFsaWQgdmFsdWVzIGFyZSAwXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIDEuIElmIHRoZSB2YWx1ZSBpcyBsZXNzIHRoYW4gMCwgdGhlIGRlZmF1bHRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgMC4gSWYgdGhlIHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiAxLCB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCBpcyAxLlxuXHQgKiBAcGFyYW0gcmF0aW9zICAgICAgICAgICAgICBBbiBhcnJheSBvZiBjb2xvciBkaXN0cmlidXRpb24gcmF0aW9zOyB2YWxpZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgYXJlIDAtMjU1LiBUaGlzIHZhbHVlIGRlZmluZXMgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2Ugb2YgdGhlIHdpZHRoIHdoZXJlIHRoZSBjb2xvciBpc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYW1wbGVkIGF0IDEwMCUuIFRoZSB2YWx1ZSAwIHJlcHJlc2VudHMgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgcG9zaXRpb24gaW4gdGhlIGdyYWRpZW50IGJveCwgYW5kIDI1NVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXByZXNlbnRzIHRoZSByaWdodCBwb3NpdGlvbiBpbiB0aGUgZ3JhZGllbnRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94LlxuXHQgKiBAcGFyYW0gbWF0cml4ICAgICAgICAgICAgICBBIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCBhcyBkZWZpbmVkIGJ5IHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFzaC5nZW9tLk1hdHJpeCBjbGFzcy4gVGhlIGZsYXNoLmdlb20uTWF0cml4XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzIGluY2x1ZGVzIGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Y3JlYXRlR3JhZGllbnRCb3goKTwvY29kZT4gbWV0aG9kLCB3aGljaFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXRzIHlvdSBjb252ZW5pZW50bHkgc2V0IHVwIHRoZSBtYXRyaXggZm9yIHVzZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIHRoZSA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2QuXG5cdCAqIEBwYXJhbSBzcHJlYWRNZXRob2QgICAgICAgIEEgdmFsdWUgZnJvbSB0aGUgU3ByZWFkTWV0aG9kIGNsYXNzIHRoYXRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWVzIHdoaWNoIHNwcmVhZCBtZXRob2QgdG8gdXNlLCBlaXRoZXI6XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlNwcmVhZE1ldGhvZC5QQUQ8L2NvZGU+LFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TcHJlYWRNZXRob2QuUkVGTEVDVDwvY29kZT4sIG9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlNwcmVhZE1ldGhvZC5SRVBFQVQ8L2NvZGU+LlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Gb3IgZXhhbXBsZSwgY29uc2lkZXIgYSBzaW1wbGUgbGluZWFyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRpZW50IGJldHdlZW4gdHdvIGNvbG9yczo8L3A+XG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlRoaXMgZXhhbXBsZSB1c2VzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlNwcmVhZE1ldGhvZC5QQUQ8L2NvZGU+IGZvciB0aGUgc3ByZWFkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZCwgYW5kIHRoZSBncmFkaWVudCBmaWxsIGxvb2tzIGxpa2UgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbGxvd2luZzo8L3A+XG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPklmIHlvdSB1c2UgPGNvZGU+U3ByZWFkTWV0aG9kLlJFRkxFQ1Q8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB0aGUgc3ByZWFkIG1ldGhvZCwgdGhlIGdyYWRpZW50IGZpbGwgbG9va3Ncblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlrZSB0aGUgZm9sbG93aW5nOjwvcD5cblx0ICpcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+SWYgeW91IHVzZSA8Y29kZT5TcHJlYWRNZXRob2QuUkVQRUFUPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhlIHNwcmVhZCBtZXRob2QsIHRoZSBncmFkaWVudCBmaWxsIGxvb2tzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpa2UgdGhlIGZvbGxvd2luZzo8L3A+XG5cdCAqIEBwYXJhbSBpbnRlcnBvbGF0aW9uTWV0aG9kIEEgdmFsdWUgZnJvbSB0aGUgSW50ZXJwb2xhdGlvbk1ldGhvZCBjbGFzcyB0aGF0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmllcyB3aGljaCB2YWx1ZSB0byB1c2U6XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkludGVycG9sYXRpb25NZXRob2QuTElORUFSX1JHQjwvY29kZT4gb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+SW50ZXJwb2xhdGlvbk1ldGhvZC5SR0I8L2NvZGU+XG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkZvciBleGFtcGxlLCBjb25zaWRlciBhIHNpbXBsZSBsaW5lYXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQgYmV0d2VlbiB0d28gY29sb3JzKHdpdGggdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnNwcmVhZE1ldGhvZDwvY29kZT4gcGFyYW1ldGVyIHNldCB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TcHJlYWRNZXRob2QuUkVGTEVDVDwvY29kZT4pLiBUaGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmVyZW50IGludGVycG9sYXRpb24gbWV0aG9kcyBhZmZlY3QgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVhcmFuY2UgYXMgZm9sbG93czogPC9wPlxuXHQgKiBAcGFyYW0gZm9jYWxQb2ludFJhdGlvICAgICBBIG51bWJlciB0aGF0IGNvbnRyb2xzIHRoZSBsb2NhdGlvbiBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jYWwgcG9pbnQgb2YgdGhlIGdyYWRpZW50LiAwIG1lYW5zIHRoYXQgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY2FsIHBvaW50IGlzIGluIHRoZSBjZW50ZXIuIDEgbWVhbnMgdGhhdCB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jYWwgcG9pbnQgaXMgYXQgb25lIGJvcmRlciBvZiB0aGUgZ3JhZGllbnRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lyY2xlLiAtMSBtZWFucyB0aGF0IHRoZSBmb2NhbCBwb2ludCBpcyBhdCB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXIgYm9yZGVyIG9mIHRoZSBncmFkaWVudCBjaXJjbGUuIEEgdmFsdWVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVzcyB0aGFuIC0xIG9yIGdyZWF0ZXIgdGhhbiAxIGlzIHJvdW5kZWQgdG8gLTFcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgMS4gRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgZXhhbXBsZSBzaG93c1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIDxjb2RlPmZvY2FsUG9pbnRSYXRpbzwvY29kZT4gc2V0IHRvIDAuNzU6XG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBJZiB0aGUgPGNvZGU+dHlwZTwvY29kZT4gcGFyYW1ldGVyIGlzIG5vdCB2YWxpZC5cblx0ICovXG5cdHB1YmxpYyBiZWdpbkdyYWRpZW50RmlsbCh0eXBlOkdyYWRpZW50VHlwZSwgY29sb3JzOkFycmF5PG51bWJlciAvKmludCovPiwgYWxwaGFzOkFycmF5PG51bWJlcj4sIHJhdGlvczpBcnJheTxudW1iZXIgLyppbnQqLz4sIG1hdHJpeDpNYXRyaXggPSBudWxsLCBzcHJlYWRNZXRob2Q6c3RyaW5nID0gXCJwYWRcIiwgaW50ZXJwb2xhdGlvbk1ldGhvZDpzdHJpbmcgPSBcInJnYlwiLCBmb2NhbFBvaW50UmF0aW86bnVtYmVyID0gMClcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogU3BlY2lmaWVzIGEgc2hhZGVyIGZpbGwgdXNlZCBieSBzdWJzZXF1ZW50IGNhbGxzIHRvIG90aGVyIEdyYXBoaWNzIG1ldGhvZHNcblx0ICogKHN1Y2ggYXMgPGNvZGU+bGluZVRvKCk8L2NvZGU+IG9yIDxjb2RlPmRyYXdDaXJjbGUoKTwvY29kZT4pIGZvciB0aGVcblx0ICogb2JqZWN0LiBUaGUgZmlsbCByZW1haW5zIGluIGVmZmVjdCB1bnRpbCB5b3UgY2FsbCB0aGVcblx0ICogPGNvZGU+YmVnaW5GaWxsKCk8L2NvZGU+LCA8Y29kZT5iZWdpbkJpdG1hcEZpbGwoKTwvY29kZT4sXG5cdCAqIDxjb2RlPmJlZ2luR3JhZGllbnRGaWxsKCk8L2NvZGU+LCBvciA8Y29kZT5iZWdpblNoYWRlckZpbGwoKTwvY29kZT5cblx0ICogbWV0aG9kLiBDYWxsaW5nIHRoZSA8Y29kZT5jbGVhcigpPC9jb2RlPiBtZXRob2QgY2xlYXJzIHRoZSBmaWxsLlxuXHQgKlxuXHQgKiA8cD5UaGUgYXBwbGljYXRpb24gcmVuZGVycyB0aGUgZmlsbCB3aGVuZXZlciB0aHJlZSBvciBtb3JlIHBvaW50cyBhcmVcblx0ICogZHJhd24sIG9yIHdoZW4gdGhlIDxjb2RlPmVuZEZpbGwoKTwvY29kZT4gbWV0aG9kIGlzIGNhbGxlZC48L3A+XG5cdCAqXG5cdCAqIDxwPlNoYWRlciBmaWxscyBhcmUgbm90IHN1cHBvcnRlZCB1bmRlciBHUFUgcmVuZGVyaW5nOyBmaWxsZWQgYXJlYXMgd2lsbFxuXHQgKiBiZSBjb2xvcmVkIGN5YW4uPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gc2hhZGVyIFRoZSBzaGFkZXIgdG8gdXNlIGZvciB0aGUgZmlsbC4gVGhpcyBTaGFkZXIgaW5zdGFuY2UgaXMgbm90XG5cdCAqICAgICAgICAgICAgICAgcmVxdWlyZWQgdG8gc3BlY2lmeSBhbiBpbWFnZSBpbnB1dC4gSG93ZXZlciwgaWYgYW4gaW1hZ2Vcblx0ICogICAgICAgICAgICAgICBpbnB1dCBpcyBzcGVjaWZpZWQgaW4gdGhlIHNoYWRlciwgdGhlIGlucHV0IG11c3QgYmUgcHJvdmlkZWRcblx0ICogICAgICAgICAgICAgICBtYW51YWxseS4gVG8gc3BlY2lmeSB0aGUgaW5wdXQsIHNldCB0aGUgPGNvZGU+aW5wdXQ8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgcHJvcGVydHkgb2YgdGhlIGNvcnJlc3BvbmRpbmcgU2hhZGVySW5wdXQgcHJvcGVydHkgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgPGNvZGU+U2hhZGVyLmRhdGE8L2NvZGU+IHByb3BlcnR5LlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgIDxwPldoZW4geW91IHBhc3MgYSBTaGFkZXIgaW5zdGFuY2UgYXMgYW4gYXJndW1lbnQgdGhlIHNoYWRlclxuXHQgKiAgICAgICAgICAgICAgIGlzIGNvcGllZCBpbnRlcm5hbGx5LiBUaGUgZHJhd2luZyBmaWxsIG9wZXJhdGlvbiB1c2VzIHRoYXRcblx0ICogICAgICAgICAgICAgICBpbnRlcm5hbCBjb3B5LCBub3QgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsIHNoYWRlci4gQW55XG5cdCAqICAgICAgICAgICAgICAgY2hhbmdlcyBtYWRlIHRvIHRoZSBzaGFkZXIsIHN1Y2ggYXMgY2hhbmdpbmcgYSBwYXJhbWV0ZXJcblx0ICogICAgICAgICAgICAgICB2YWx1ZSwgaW5wdXQsIG9yIGJ5dGVjb2RlLCBhcmUgbm90IGFwcGxpZWQgdG8gdGhlIGNvcGllZFxuXHQgKiAgICAgICAgICAgICAgIHNoYWRlciB0aGF0J3MgdXNlZCBmb3IgdGhlIGZpbGwuPC9wPlxuXHQgKiBAcGFyYW0gbWF0cml4IEEgbWF0cml4IG9iamVjdChvZiB0aGUgZmxhc2guZ2VvbS5NYXRyaXggY2xhc3MpLCB3aGljaCB5b3Vcblx0ICogICAgICAgICAgICAgICBjYW4gdXNlIHRvIGRlZmluZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIHNoYWRlci4gRm9yXG5cdCAqICAgICAgICAgICAgICAgZXhhbXBsZSwgeW91IGNhbiB1c2UgdGhlIGZvbGxvd2luZyBtYXRyaXggdG8gcm90YXRlIGEgc2hhZGVyXG5cdCAqICAgICAgICAgICAgICAgYnkgNDUgZGVncmVlcyhwaS80IHJhZGlhbnMpOlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgIDxwPlRoZSBjb29yZGluYXRlcyByZWNlaXZlZCBpbiB0aGUgc2hhZGVyIGFyZSBiYXNlZCBvbiB0aGVcblx0ICogICAgICAgICAgICAgICBtYXRyaXggdGhhdCBpcyBzcGVjaWZpZWQgZm9yIHRoZSA8Y29kZT5tYXRyaXg8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgcGFyYW1ldGVyLiBGb3IgYSBkZWZhdWx0KDxjb2RlPm51bGw8L2NvZGU+KSBtYXRyaXgsIHRoZVxuXHQgKiAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzIGluIHRoZSBzaGFkZXIgYXJlIGxvY2FsIHBpeGVsIGNvb3JkaW5hdGVzIHdoaWNoXG5cdCAqICAgICAgICAgICAgICAgY2FuIGJlIHVzZWQgdG8gc2FtcGxlIGFuIGlucHV0LjwvcD5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gdGhlIHNoYWRlciBvdXRwdXQgdHlwZSBpcyBub3QgY29tcGF0aWJsZSB3aXRoXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGlzIG9wZXJhdGlvbih0aGUgc2hhZGVyIG11c3Qgc3BlY2lmeSBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5waXhlbDM8L2NvZGU+IG9yIDxjb2RlPnBpeGVsNDwvY29kZT4gb3V0cHV0KS5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gdGhlIHNoYWRlciBzcGVjaWZpZXMgYW4gaW1hZ2UgaW5wdXQgdGhhdCBpc24ndFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZWQuXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIGEgQnl0ZUFycmF5IG9yIFZlY3Rvci48TnVtYmVyPiBpbnN0YW5jZSBpcyB1c2VkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhcyBhbiBpbnB1dCBhbmQgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBhbmRcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBhcmVuJ3Qgc3BlY2lmaWVkIGZvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIFNoYWRlcklucHV0LCBvciB0aGUgc3BlY2lmaWVkIHZhbHVlcyBkb24ndCBtYXRjaFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIGFtb3VudCBvZiBkYXRhIGluIHRoZSBpbnB1dCBvYmplY3QuIFNlZSB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlNoYWRlcklucHV0LmlucHV0PC9jb2RlPiBwcm9wZXJ0eSBmb3IgbW9yZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgaW5mb3JtYXRpb24uXG5cdCAqL1xuLy9cdFx0cHVibGljIGJlZ2luU2hhZGVyRmlsbChzaGFkZXI6U2hhZGVyLCBtYXRyaXg6TWF0cml4ID0gbnVsbClcbi8vXHRcdHtcbi8vXG4vL1x0XHR9XG5cblx0LyoqXG5cdCAqIENsZWFycyB0aGUgZ3JhcGhpY3MgdGhhdCB3ZXJlIGRyYXduIHRvIHRoaXMgR3JhcGhpY3Mgb2JqZWN0LCBhbmQgcmVzZXRzXG5cdCAqIGZpbGwgYW5kIGxpbmUgc3R5bGUgc2V0dGluZ3MuXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgY2xlYXIoKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBDb3BpZXMgYWxsIG9mIGRyYXdpbmcgY29tbWFuZHMgZnJvbSB0aGUgc291cmNlIEdyYXBoaWNzIG9iamVjdCBpbnRvIHRoZVxuXHQgKiBjYWxsaW5nIEdyYXBoaWNzIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHNvdXJjZUdyYXBoaWNzIFRoZSBHcmFwaGljcyBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkcmF3aW5nXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kcy5cblx0ICovXG5cdHB1YmxpYyBjb3B5RnJvbShzb3VyY2VHcmFwaGljczpHcmFwaGljcylcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogRHJhd3MgYSBjdWJpYyBCZXppZXIgY3VydmUgZnJvbSB0aGUgY3VycmVudCBkcmF3aW5nIHBvc2l0aW9uIHRvIHRoZVxuXHQgKiBzcGVjaWZpZWQgYW5jaG9yIHBvaW50LiBDdWJpYyBCZXppZXIgY3VydmVzIGNvbnNpc3Qgb2YgdHdvIGFuY2hvciBwb2ludHNcblx0ICogYW5kIHR3byBjb250cm9sIHBvaW50cy4gVGhlIGN1cnZlIGludGVycG9sYXRlcyB0aGUgdHdvIGFuY2hvciBwb2ludHMgYW5kXG5cdCAqIGN1cnZlcyB0b3dhcmQgdGhlIHR3byBjb250cm9sIHBvaW50cy5cblx0ICpcblx0ICogVGhlIGZvdXIgcG9pbnRzIHlvdSB1c2UgdG8gZHJhdyBhIGN1YmljIEJlemllciBjdXJ2ZSB3aXRoIHRoZVxuXHQgKiA8Y29kZT5jdWJpY0N1cnZlVG8oKTwvY29kZT4gbWV0aG9kIGFyZSBhcyBmb2xsb3dzOlxuXHQgKlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPlRoZSBjdXJyZW50IGRyYXdpbmcgcG9zaXRpb24gaXMgdGhlIGZpcnN0IGFuY2hvciBwb2ludC4gPC9saT5cblx0ICogICA8bGk+VGhlIGFuY2hvclggYW5kIGFuY2hvclkgcGFyYW1ldGVycyBzcGVjaWZ5IHRoZSBzZWNvbmQgYW5jaG9yIHBvaW50LlxuXHQgKiAgIDwvbGk+XG5cdCAqICAgPGxpPlRoZSA8Y29kZT5jb250cm9sWDE8L2NvZGU+IGFuZCA8Y29kZT5jb250cm9sWTE8L2NvZGU+IHBhcmFtZXRlcnNcblx0ICogICBzcGVjaWZ5IHRoZSBmaXJzdCBjb250cm9sIHBvaW50LjwvbGk+XG5cdCAqICAgPGxpPlRoZSA8Y29kZT5jb250cm9sWDI8L2NvZGU+IGFuZCA8Y29kZT5jb250cm9sWTI8L2NvZGU+IHBhcmFtZXRlcnNcblx0ICogICBzcGVjaWZ5IHRoZSBzZWNvbmQgY29udHJvbCBwb2ludC48L2xpPlxuXHQgKiA8L3VsPlxuXHQgKlxuXHQgKiBJZiB5b3UgY2FsbCB0aGUgPGNvZGU+Y3ViaWNDdXJ2ZVRvKCk8L2NvZGU+IG1ldGhvZCBiZWZvcmUgY2FsbGluZyB0aGVcblx0ICogPGNvZGU+bW92ZVRvKCk8L2NvZGU+IG1ldGhvZCwgeW91ciBjdXJ2ZSBzdGFydHMgYXQgcG9zaXRpb24gKDAsIDApLlxuXHQgKlxuXHQgKiBJZiB0aGUgPGNvZGU+Y3ViaWNDdXJ2ZVRvKCk8L2NvZGU+IG1ldGhvZCBzdWNjZWVkcywgdGhlIEZsYXNoIHJ1bnRpbWUgc2V0c1xuXHQgKiB0aGUgY3VycmVudCBkcmF3aW5nIHBvc2l0aW9uIHRvICg8Y29kZT5hbmNob3JYPC9jb2RlPixcblx0ICogPGNvZGU+YW5jaG9yWTwvY29kZT4pLiBJZiB0aGUgPGNvZGU+Y3ViaWNDdXJ2ZVRvKCk8L2NvZGU+IG1ldGhvZCBmYWlscyxcblx0ICogdGhlIGN1cnJlbnQgZHJhd2luZyBwb3NpdGlvbiByZW1haW5zIHVuY2hhbmdlZC5cblx0ICpcblx0ICogSWYgeW91ciBtb3ZpZSBjbGlwIGNvbnRhaW5zIGNvbnRlbnQgY3JlYXRlZCB3aXRoIHRoZSBGbGFzaCBkcmF3aW5nIHRvb2xzLFxuXHQgKiB0aGUgcmVzdWx0cyBvZiBjYWxscyB0byB0aGUgPGNvZGU+Y3ViaWNDdXJ2ZVRvKCk8L2NvZGU+IG1ldGhvZCBhcmUgZHJhd25cblx0ICogdW5kZXJuZWF0aCB0aGF0IGNvbnRlbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSBjb250cm9sWDEgU3BlY2lmaWVzIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBjb250cm9sXG5cdCAqICAgICAgICAgICAgICAgICAgcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50XG5cdCAqICAgICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QuXG5cdCAqIEBwYXJhbSBjb250cm9sWTEgU3BlY2lmaWVzIHRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgY29udHJvbFxuXHQgKiAgICAgICAgICAgICAgICAgIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudFxuXHQgKiAgICAgICAgICAgICAgICAgIGRpc3BsYXkgb2JqZWN0LlxuXHQgKiBAcGFyYW0gY29udHJvbFgyIFNwZWNpZmllcyB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbiBvZiB0aGUgc2Vjb25kIGNvbnRyb2xcblx0ICogICAgICAgICAgICAgICAgICBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnRcblx0ICogICAgICAgICAgICAgICAgICBkaXNwbGF5IG9iamVjdC5cblx0ICogQHBhcmFtIGNvbnRyb2xZMiBTcGVjaWZpZXMgdGhlIHZlcnRpY2FsIHBvc2l0aW9uIG9mIHRoZSBzZWNvbmQgY29udHJvbFxuXHQgKiAgICAgICAgICAgICAgICAgIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudFxuXHQgKiAgICAgICAgICAgICAgICAgIGRpc3BsYXkgb2JqZWN0LlxuXHQgKiBAcGFyYW0gYW5jaG9yWCAgIFNwZWNpZmllcyB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbiBvZiB0aGUgYW5jaG9yIHBvaW50XG5cdCAqICAgICAgICAgICAgICAgICAgcmVsYXRpdmUgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50IGRpc3BsYXlcblx0ICogICAgICAgICAgICAgICAgICBvYmplY3QuXG5cdCAqIEBwYXJhbSBhbmNob3JZICAgU3BlY2lmaWVzIHRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiBvZiB0aGUgYW5jaG9yIHBvaW50XG5cdCAqICAgICAgICAgICAgICAgICAgcmVsYXRpdmUgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50IGRpc3BsYXlcblx0ICogICAgICAgICAgICAgICAgICBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY3ViaWNDdXJ2ZVRvKGNvbnRyb2xYMTpudW1iZXIsIGNvbnRyb2xZMTpudW1iZXIsIGNvbnRyb2xYMjpudW1iZXIsIGNvbnRyb2xZMjpudW1iZXIsIGFuY2hvclg6bnVtYmVyLCBhbmNob3JZOm51bWJlcilcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogRHJhd3MgYSBjdXJ2ZSB1c2luZyB0aGUgY3VycmVudCBsaW5lIHN0eWxlIGZyb20gdGhlIGN1cnJlbnQgZHJhd2luZ1xuXHQgKiBwb3NpdGlvbiB0byhhbmNob3JYLCBhbmNob3JZKSBhbmQgdXNpbmcgdGhlIGNvbnRyb2wgcG9pbnQgdGhhdFxuXHQgKiAoPGNvZGU+Y29udHJvbFg8L2NvZGU+LCA8Y29kZT5jb250cm9sWTwvY29kZT4pIHNwZWNpZmllcy4gVGhlIGN1cnJlbnRcblx0ICogZHJhd2luZyBwb3NpdGlvbiBpcyB0aGVuIHNldCB0byg8Y29kZT5hbmNob3JYPC9jb2RlPixcblx0ICogPGNvZGU+YW5jaG9yWTwvY29kZT4pLiBJZiB0aGUgbW92aWUgY2xpcCBpbiB3aGljaCB5b3UgYXJlIGRyYXdpbmcgY29udGFpbnNcblx0ICogY29udGVudCBjcmVhdGVkIHdpdGggdGhlIEZsYXNoIGRyYXdpbmcgdG9vbHMsIGNhbGxzIHRvIHRoZVxuXHQgKiA8Y29kZT5jdXJ2ZVRvKCk8L2NvZGU+IG1ldGhvZCBhcmUgZHJhd24gdW5kZXJuZWF0aCB0aGlzIGNvbnRlbnQuIElmIHlvdVxuXHQgKiBjYWxsIHRoZSA8Y29kZT5jdXJ2ZVRvKCk8L2NvZGU+IG1ldGhvZCBiZWZvcmUgYW55IGNhbGxzIHRvIHRoZVxuXHQgKiA8Y29kZT5tb3ZlVG8oKTwvY29kZT4gbWV0aG9kLCB0aGUgZGVmYXVsdCBvZiB0aGUgY3VycmVudCBkcmF3aW5nIHBvc2l0aW9uXG5cdCAqIGlzKDAsIDApLiBJZiBhbnkgb2YgdGhlIHBhcmFtZXRlcnMgYXJlIG1pc3NpbmcsIHRoaXMgbWV0aG9kIGZhaWxzIGFuZCB0aGVcblx0ICogY3VycmVudCBkcmF3aW5nIHBvc2l0aW9uIGlzIG5vdCBjaGFuZ2VkLlxuXHQgKlxuXHQgKiA8cD5UaGUgY3VydmUgZHJhd24gaXMgYSBxdWFkcmF0aWMgQmV6aWVyIGN1cnZlLiBRdWFkcmF0aWMgQmV6aWVyIGN1cnZlc1xuXHQgKiBjb25zaXN0IG9mIHR3byBhbmNob3IgcG9pbnRzIGFuZCBvbmUgY29udHJvbCBwb2ludC4gVGhlIGN1cnZlIGludGVycG9sYXRlc1xuXHQgKiB0aGUgdHdvIGFuY2hvciBwb2ludHMgYW5kIGN1cnZlcyB0b3dhcmQgdGhlIGNvbnRyb2wgcG9pbnQuIDwvcD5cblx0ICpcblx0ICogQHBhcmFtIGNvbnRyb2xYIEEgbnVtYmVyIHRoYXQgc3BlY2lmaWVzIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgY29udHJvbCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgcGFyZW50IGRpc3BsYXkgb2JqZWN0LlxuXHQgKiBAcGFyYW0gY29udHJvbFkgQSBudW1iZXIgdGhhdCBzcGVjaWZpZXMgdGhlIHZlcnRpY2FsIHBvc2l0aW9uIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgY29udHJvbCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgcGFyZW50IGRpc3BsYXkgb2JqZWN0LlxuXHQgKiBAcGFyYW0gYW5jaG9yWCAgQSBudW1iZXIgdGhhdCBzcGVjaWZpZXMgdGhlIGhvcml6b250YWwgcG9zaXRpb24gb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICBuZXh0IGFuY2hvciBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mXG5cdCAqICAgICAgICAgICAgICAgICB0aGUgcGFyZW50IGRpc3BsYXkgb2JqZWN0LlxuXHQgKiBAcGFyYW0gYW5jaG9yWSAgQSBudW1iZXIgdGhhdCBzcGVjaWZpZXMgdGhlIHZlcnRpY2FsIHBvc2l0aW9uIG9mIHRoZSBuZXh0XG5cdCAqICAgICAgICAgICAgICAgICBhbmNob3IgcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgIHBhcmVudCBkaXNwbGF5IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBjdXJ2ZVRvKGNvbnRyb2xYOm51bWJlciwgY29udHJvbFk6bnVtYmVyLCBhbmNob3JYOm51bWJlciwgYW5jaG9yWTpudW1iZXIpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIERyYXdzIGEgY2lyY2xlLiBTZXQgdGhlIGxpbmUgc3R5bGUsIGZpbGwsIG9yIGJvdGggYmVmb3JlIHlvdSBjYWxsIHRoZVxuXHQgKiA8Y29kZT5kcmF3Q2lyY2xlKCk8L2NvZGU+IG1ldGhvZCwgYnkgY2FsbGluZyB0aGUgPGNvZGU+bGluZXN0eWxlKCk8L2NvZGU+LFxuXHQgKiA8Y29kZT5saW5lR3JhZGllbnRTdHlsZSgpPC9jb2RlPiwgPGNvZGU+YmVnaW5GaWxsKCk8L2NvZGU+LFxuXHQgKiA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiwgb3IgPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+XG5cdCAqIG1ldGhvZC5cblx0ICpcblx0ICogQHBhcmFtIHggICAgICBUaGUgPGk+eDwvaT4gbG9jYXRpb24gb2YgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlXG5cdCAqICAgICAgICAgICAgICAgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50IGRpc3BsYXkgb2JqZWN0KGluXG5cdCAqICAgICAgICAgICAgICAgcGl4ZWxzKS5cblx0ICogQHBhcmFtIHkgICAgICBUaGUgPGk+eTwvaT4gbG9jYXRpb24gb2YgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlXG5cdCAqICAgICAgICAgICAgICAgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50IGRpc3BsYXkgb2JqZWN0KGluXG5cdCAqICAgICAgICAgICAgICAgcGl4ZWxzKS5cblx0ICogQHBhcmFtIHJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSBjaXJjbGUoaW4gcGl4ZWxzKS5cblx0ICovXG5cdHB1YmxpYyBkcmF3Q2lyY2xlKHg6bnVtYmVyLCB5Om51bWJlciwgcmFkaXVzOm51bWJlcilcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogRHJhd3MgYW4gZWxsaXBzZS4gU2V0IHRoZSBsaW5lIHN0eWxlLCBmaWxsLCBvciBib3RoIGJlZm9yZSB5b3UgY2FsbCB0aGVcblx0ICogPGNvZGU+ZHJhd0VsbGlwc2UoKTwvY29kZT4gbWV0aG9kLCBieSBjYWxsaW5nIHRoZVxuXHQgKiA8Y29kZT5saW5lc3R5bGUoKTwvY29kZT4sIDxjb2RlPmxpbmVHcmFkaWVudFN0eWxlKCk8L2NvZGU+LFxuXHQgKiA8Y29kZT5iZWdpbkZpbGwoKTwvY29kZT4sIDxjb2RlPmJlZ2luR3JhZGllbnRGaWxsKCk8L2NvZGU+LCBvclxuXHQgKiA8Y29kZT5iZWdpbkJpdG1hcEZpbGwoKTwvY29kZT4gbWV0aG9kLlxuXHQgKlxuXHQgKiBAcGFyYW0geCAgICAgIFRoZSA8aT54PC9pPiBsb2NhdGlvbiBvZiB0aGUgdG9wLWxlZnQgb2YgdGhlIGJvdW5kaW5nLWJveCBvZlxuXHQgKiAgICAgICAgICAgICAgIHRoZSBlbGxpcHNlIHJlbGF0aXZlIHRvIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudFxuXHQgKiAgICAgICAgICAgICAgIGRpc3BsYXkgb2JqZWN0KGluIHBpeGVscykuXG5cdCAqIEBwYXJhbSB5ICAgICAgVGhlIDxpPnk8L2k+IGxvY2F0aW9uIG9mIHRoZSB0b3AgbGVmdCBvZiB0aGUgYm91bmRpbmctYm94IG9mXG5cdCAqICAgICAgICAgICAgICAgdGhlIGVsbGlwc2UgcmVsYXRpdmUgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50XG5cdCAqICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QoaW4gcGl4ZWxzKS5cblx0ICogQHBhcmFtIHdpZHRoICBUaGUgd2lkdGggb2YgdGhlIGVsbGlwc2UoaW4gcGl4ZWxzKS5cblx0ICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBlbGxpcHNlKGluIHBpeGVscykuXG5cdCAqL1xuXHRwdWJsaWMgZHJhd0VsbGlwc2UoeDpudW1iZXIsIHk6bnVtYmVyLCB3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFN1Ym1pdHMgYSBzZXJpZXMgb2YgSUdyYXBoaWNzRGF0YSBpbnN0YW5jZXMgZm9yIGRyYXdpbmcuIFRoaXMgbWV0aG9kXG5cdCAqIGFjY2VwdHMgYSBWZWN0b3IgY29udGFpbmluZyBvYmplY3RzIGluY2x1ZGluZyBwYXRocywgZmlsbHMsIGFuZCBzdHJva2VzXG5cdCAqIHRoYXQgaW1wbGVtZW50IHRoZSBJR3JhcGhpY3NEYXRhIGludGVyZmFjZS4gQSBWZWN0b3Igb2YgSUdyYXBoaWNzRGF0YVxuXHQgKiBpbnN0YW5jZXMgY2FuIHJlZmVyIHRvIGEgcGFydCBvZiBhIHNoYXBlLCBvciBhIGNvbXBsZXggZnVsbHkgZGVmaW5lZCBzZXRcblx0ICogb2YgZGF0YSBmb3IgcmVuZGVyaW5nIGEgY29tcGxldGUgc2hhcGUuXG5cdCAqXG5cdCAqIDxwPiBHcmFwaGljcyBwYXRocyBjYW4gY29udGFpbiBvdGhlciBncmFwaGljcyBwYXRocy4gSWYgdGhlXG5cdCAqIDxjb2RlPmdyYXBoaWNzRGF0YTwvY29kZT4gVmVjdG9yIGluY2x1ZGVzIGEgcGF0aCwgdGhhdCBwYXRoIGFuZCBhbGwgaXRzXG5cdCAqIHN1Yi1wYXRocyBhcmUgcmVuZGVyZWQgZHVyaW5nIHRoaXMgb3BlcmF0aW9uLiA8L3A+XG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZHJhd0dyYXBoaWNzRGF0YShncmFwaGljc0RhdGE6QXJyYXk8SUdyYXBoaWNzRGF0YT4pXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFN1Ym1pdHMgYSBzZXJpZXMgb2YgY29tbWFuZHMgZm9yIGRyYXdpbmcuIFRoZSA8Y29kZT5kcmF3UGF0aCgpPC9jb2RlPlxuXHQgKiBtZXRob2QgdXNlcyB2ZWN0b3IgYXJyYXlzIHRvIGNvbnNvbGlkYXRlIGluZGl2aWR1YWwgPGNvZGU+bW92ZVRvKCk8L2NvZGU+LFxuXHQgKiA8Y29kZT5saW5lVG8oKTwvY29kZT4sIGFuZCA8Y29kZT5jdXJ2ZVRvKCk8L2NvZGU+IGRyYXdpbmcgY29tbWFuZHMgaW50byBhXG5cdCAqIHNpbmdsZSBjYWxsLiBUaGUgPGNvZGU+ZHJhd1BhdGgoKTwvY29kZT4gbWV0aG9kIHBhcmFtZXRlcnMgY29tYmluZSBkcmF3aW5nXG5cdCAqIGNvbW1hbmRzIHdpdGggeC0gYW5kIHktY29vcmRpbmF0ZSB2YWx1ZSBwYWlycyBhbmQgYSBkcmF3aW5nIGRpcmVjdGlvbi4gVGhlXG5cdCAqIGRyYXdpbmcgY29tbWFuZHMgYXJlIHZhbHVlcyBmcm9tIHRoZSBHcmFwaGljc1BhdGhDb21tYW5kIGNsYXNzLiBUaGUgeC0gYW5kXG5cdCAqIHktY29vcmRpbmF0ZSB2YWx1ZSBwYWlycyBhcmUgTnVtYmVycyBpbiBhbiBhcnJheSB3aGVyZSBlYWNoIHBhaXIgZGVmaW5lcyBhXG5cdCAqIGNvb3JkaW5hdGUgbG9jYXRpb24uIFRoZSBkcmF3aW5nIGRpcmVjdGlvbiBpcyBhIHZhbHVlIGZyb20gdGhlXG5cdCAqIEdyYXBoaWNzUGF0aFdpbmRpbmcgY2xhc3MuXG5cdCAqXG5cdCAqIDxwPiBHZW5lcmFsbHksIGRyYXdpbmdzIHJlbmRlciBmYXN0ZXIgd2l0aCA8Y29kZT5kcmF3UGF0aCgpPC9jb2RlPiB0aGFuXG5cdCAqIHdpdGggYSBzZXJpZXMgb2YgaW5kaXZpZHVhbCA8Y29kZT5saW5lVG8oKTwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPmN1cnZlVG8oKTwvY29kZT4gbWV0aG9kcy4gPC9wPlxuXHQgKlxuXHQgKiA8cD4gVGhlIDxjb2RlPmRyYXdQYXRoKCk8L2NvZGU+IG1ldGhvZCB1c2VzIGEgdXNlcyBhIGZsb2F0aW5nIGNvbXB1dGF0aW9uXG5cdCAqIHNvIHJvdGF0aW9uIGFuZCBzY2FsaW5nIG9mIHNoYXBlcyBpcyBtb3JlIGFjY3VyYXRlIGFuZCBnaXZlcyBiZXR0ZXJcblx0ICogcmVzdWx0cy4gSG93ZXZlciwgY3VydmVzIHN1Ym1pdHRlZCB1c2luZyB0aGUgPGNvZGU+ZHJhd1BhdGgoKTwvY29kZT5cblx0ICogbWV0aG9kIGNhbiBoYXZlIHNtYWxsIHN1Yi1waXhlbCBhbGlnbm1lbnQgZXJyb3JzIHdoZW4gdXNlZCBpbiBjb25qdW5jdGlvblxuXHQgKiB3aXRoIHRoZSA8Y29kZT5saW5lVG8oKTwvY29kZT4gYW5kIDxjb2RlPmN1cnZlVG8oKTwvY29kZT4gbWV0aG9kcy4gPC9wPlxuXHQgKlxuXHQgKiA8cD4gVGhlIDxjb2RlPmRyYXdQYXRoKCk8L2NvZGU+IG1ldGhvZCBhbHNvIHVzZXMgc2xpZ2h0bHkgZGlmZmVyZW50IHJ1bGVzXG5cdCAqIGZvciBmaWxsaW5nIGFuZCBkcmF3aW5nIGxpbmVzLiBUaGV5IGFyZTogPC9wPlxuXHQgKlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPldoZW4gYSBmaWxsIGlzIGFwcGxpZWQgdG8gcmVuZGVyaW5nIGEgcGF0aDpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT5BIHN1Yi1wYXRoIG9mIGxlc3MgdGhhbiAzIHBvaW50cyBpcyBub3QgcmVuZGVyZWQuKEJ1dCBub3RlIHRoYXQgdGhlXG5cdCAqIHN0cm9rZSByZW5kZXJpbmcgd2lsbCBzdGlsbCBvY2N1ciwgY29uc2lzdGVudCB3aXRoIHRoZSBydWxlcyBmb3Igc3Ryb2tlc1xuXHQgKiBiZWxvdy4pPC9saT5cblx0ICogICA8bGk+QSBzdWItcGF0aCB0aGF0IGlzbid0IGNsb3NlZCh0aGUgZW5kIHBvaW50IGlzIG5vdCBlcXVhbCB0byB0aGVcblx0ICogYmVnaW4gcG9pbnQpIGlzIGltcGxpY2l0bHkgY2xvc2VkLjwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqIDwvbGk+XG5cdCAqICAgPGxpPldoZW4gYSBzdHJva2UgaXMgYXBwbGllZCB0byByZW5kZXJpbmcgYSBwYXRoOlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPlRoZSBzdWItcGF0aHMgY2FuIGJlIGNvbXBvc2VkIG9mIGFueSBudW1iZXIgb2YgcG9pbnRzLjwvbGk+XG5cdCAqICAgPGxpPlRoZSBzdWItcGF0aCBpcyBuZXZlciBpbXBsaWNpdGx5IGNsb3NlZC48L2xpPlxuXHQgKiA8L3VsPlxuXHQgKiA8L2xpPlxuXHQgKiA8L3VsPlxuXHQgKlxuXHQgKiBAcGFyYW0gd2luZGluZyBTcGVjaWZpZXMgdGhlIHdpbmRpbmcgcnVsZSB1c2luZyBhIHZhbHVlIGRlZmluZWQgaW4gdGhlXG5cdCAqICAgICAgICAgICAgICAgIEdyYXBoaWNzUGF0aFdpbmRpbmcgY2xhc3MuXG5cdCAqL1xuXHRwdWJsaWMgZHJhd1BhdGgoY29tbWFuZHM6QXJyYXk8bnVtYmVyIC8qaW50Ki8+LCBkYXRhOkFycmF5PG51bWJlcj4sIHdpbmRpbmc6R3JhcGhpY3NQYXRoV2luZGluZylcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogRHJhd3MgYSByZWN0YW5nbGUuIFNldCB0aGUgbGluZSBzdHlsZSwgZmlsbCwgb3IgYm90aCBiZWZvcmUgeW91IGNhbGwgdGhlXG5cdCAqIDxjb2RlPmRyYXdSZWN0KCk8L2NvZGU+IG1ldGhvZCwgYnkgY2FsbGluZyB0aGUgPGNvZGU+bGluZXN0eWxlKCk8L2NvZGU+LFxuXHQgKiA8Y29kZT5saW5lR3JhZGllbnRTdHlsZSgpPC9jb2RlPiwgPGNvZGU+YmVnaW5GaWxsKCk8L2NvZGU+LFxuXHQgKiA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiwgb3IgPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+XG5cdCAqIG1ldGhvZC5cblx0ICpcblx0ICogQHBhcmFtIHggICAgICBBIG51bWJlciBpbmRpY2F0aW5nIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZVxuXHQgKiAgICAgICAgICAgICAgIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50IGRpc3BsYXkgb2JqZWN0KGluIHBpeGVscykuXG5cdCAqIEBwYXJhbSB5ICAgICAgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgdmVydGljYWwgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlXG5cdCAqICAgICAgICAgICAgICAgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3QoaW4gcGl4ZWxzKS5cblx0ICogQHBhcmFtIHdpZHRoICBUaGUgd2lkdGggb2YgdGhlIHJlY3RhbmdsZShpbiBwaXhlbHMpLlxuXHQgKiBAcGFyYW0gaGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIHJlY3RhbmdsZShpbiBwaXhlbHMpLlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgSWYgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBvciA8Y29kZT5oZWlnaHQ8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzIGFyZSBub3QgYSBudW1iZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgKDxjb2RlPk51bWJlci5OYU48L2NvZGU+KS5cblx0ICovXG5cdHB1YmxpYyBkcmF3UmVjdCh4Om51bWJlciwgeTpudW1iZXIsIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcilcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogRHJhd3MgYSByb3VuZGVkIHJlY3RhbmdsZS4gU2V0IHRoZSBsaW5lIHN0eWxlLCBmaWxsLCBvciBib3RoIGJlZm9yZSB5b3Vcblx0ICogY2FsbCB0aGUgPGNvZGU+ZHJhd1JvdW5kUmVjdCgpPC9jb2RlPiBtZXRob2QsIGJ5IGNhbGxpbmcgdGhlXG5cdCAqIDxjb2RlPmxpbmVzdHlsZSgpPC9jb2RlPiwgPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4sXG5cdCAqIDxjb2RlPmJlZ2luRmlsbCgpPC9jb2RlPiwgPGNvZGU+YmVnaW5HcmFkaWVudEZpbGwoKTwvY29kZT4sIG9yXG5cdCAqIDxjb2RlPmJlZ2luQml0bWFwRmlsbCgpPC9jb2RlPiBtZXRob2QuXG5cdCAqXG5cdCAqIEBwYXJhbSB4ICAgICAgICAgICAgIEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIGhvcml6b250YWwgcG9zaXRpb24gcmVsYXRpdmVcblx0ICogICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50IGRpc3BsYXlcblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0KGluIHBpeGVscykuXG5cdCAqIEBwYXJhbSB5ICAgICAgICAgICAgIEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIHZlcnRpY2FsIHBvc2l0aW9uIHJlbGF0aXZlIHRvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIChpbiBwaXhlbHMpLlxuXHQgKiBAcGFyYW0gd2lkdGggICAgICAgICBUaGUgd2lkdGggb2YgdGhlIHJvdW5kIHJlY3RhbmdsZShpbiBwaXhlbHMpLlxuXHQgKiBAcGFyYW0gaGVpZ2h0ICAgICAgICBUaGUgaGVpZ2h0IG9mIHRoZSByb3VuZCByZWN0YW5nbGUoaW4gcGl4ZWxzKS5cblx0ICogQHBhcmFtIGVsbGlwc2VXaWR0aCAgVGhlIHdpZHRoIG9mIHRoZSBlbGxpcHNlIHVzZWQgdG8gZHJhdyB0aGUgcm91bmRlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJzKGluIHBpeGVscykuXG5cdCAqIEBwYXJhbSBlbGxpcHNlSGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGVsbGlwc2UgdXNlZCB0byBkcmF3IHRoZSByb3VuZGVkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGNvcm5lcnMoaW4gcGl4ZWxzKS4gT3B0aW9uYWw7IGlmIG5vIHZhbHVlIGlzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmllZCwgdGhlIGRlZmF1bHQgdmFsdWUgbWF0Y2hlcyB0aGF0IHByb3ZpZGVkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGZvciB0aGUgPGNvZGU+ZWxsaXBzZVdpZHRoPC9jb2RlPiBwYXJhbWV0ZXIuXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBJZiB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+LCA8Y29kZT5oZWlnaHQ8L2NvZGU+LFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+ZWxsaXBzZVdpZHRoPC9jb2RlPiBvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+ZWxsaXBzZUhlaWdodDwvY29kZT4gcGFyYW1ldGVycyBhcmUgbm90IGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG51bWJlcig8Y29kZT5OdW1iZXIuTmFOPC9jb2RlPikuXG5cdCAqL1xuXHRwdWJsaWMgZHJhd1JvdW5kUmVjdCh4Om51bWJlciwgeTpudW1iZXIsIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlciwgZWxsaXBzZVdpZHRoOm51bWJlciwgZWxsaXBzZUhlaWdodDpudW1iZXIgPSBOYU4pXG5cdHtcblxuXHR9XG5cblx0Ly9wdWJsaWMgZHJhd1JvdW5kUmVjdENvbXBsZXgoeDpGbG9hdCwgeTpGbG9hdCwgd2lkdGg6RmxvYXQsIGhlaWdodDpGbG9hdCwgdG9wTGVmdFJhZGl1czpGbG9hdCwgdG9wUmlnaHRSYWRpdXM6RmxvYXQsIGJvdHRvbUxlZnRSYWRpdXM6RmxvYXQsIGJvdHRvbVJpZ2h0UmFkaXVzOkZsb2F0KTpWb2lkO1xuXG5cdC8qKlxuXHQgKiBSZW5kZXJzIGEgc2V0IG9mIHRyaWFuZ2xlcywgdHlwaWNhbGx5IHRvIGRpc3RvcnQgYml0bWFwcyBhbmQgZ2l2ZSB0aGVtIGFcblx0ICogdGhyZWUtZGltZW5zaW9uYWwgYXBwZWFyYW5jZS4gVGhlIDxjb2RlPmRyYXdUcmlhbmdsZXMoKTwvY29kZT4gbWV0aG9kIG1hcHNcblx0ICogZWl0aGVyIHRoZSBjdXJyZW50IGZpbGwsIG9yIGEgYml0bWFwIGZpbGwsIHRvIHRoZSB0cmlhbmdsZSBmYWNlcyB1c2luZyBhXG5cdCAqIHNldCBvZih1LHYpIGNvb3JkaW5hdGVzLlxuXHQgKlxuXHQgKiA8cD4gQW55IHR5cGUgb2YgZmlsbCBjYW4gYmUgdXNlZCwgYnV0IGlmIHRoZSBmaWxsIGhhcyBhIHRyYW5zZm9ybSBtYXRyaXhcblx0ICogdGhhdCB0cmFuc2Zvcm0gbWF0cml4IGlzIGlnbm9yZWQuIDwvcD5cblx0ICpcblx0ICogPHA+IEEgPGNvZGU+dXZ0RGF0YTwvY29kZT4gcGFyYW1ldGVyIGltcHJvdmVzIHRleHR1cmUgbWFwcGluZyB3aGVuIGFcblx0ICogYml0bWFwIGZpbGwgaXMgdXNlZC4gPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gY3VsbGluZyBTcGVjaWZpZXMgd2hldGhlciB0byByZW5kZXIgdHJpYW5nbGVzIHRoYXQgZmFjZSBpbiBhXG5cdCAqICAgICAgICAgICAgICAgIHNwZWNpZmllZCBkaXJlY3Rpb24uIFRoaXMgcGFyYW1ldGVyIHByZXZlbnRzIHRoZSByZW5kZXJpbmdcblx0ICogICAgICAgICAgICAgICAgb2YgdHJpYW5nbGVzIHRoYXQgY2Fubm90IGJlIHNlZW4gaW4gdGhlIGN1cnJlbnQgdmlldy4gVGhpc1xuXHQgKiAgICAgICAgICAgICAgICBwYXJhbWV0ZXIgY2FuIGJlIHNldCB0byBhbnkgdmFsdWUgZGVmaW5lZCBieSB0aGVcblx0ICogICAgICAgICAgICAgICAgVHJpYW5nbGVDdWxsaW5nIGNsYXNzLlxuXHQgKi9cblx0cHVibGljIGRyYXdUcmlhbmdsZXModmVydGljZXM6QXJyYXk8bnVtYmVyPiwgaW5kaWNlczpBcnJheTxudW1iZXIgLyppbnQqLz4gPSBudWxsLCB1dnREYXRhOkFycmF5PG51bWJlcj4gPSBudWxsLCBjdWxsaW5nOlRyaWFuZ2xlQ3VsbGluZyA9IG51bGwpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGxpZXMgYSBmaWxsIHRvIHRoZSBsaW5lcyBhbmQgY3VydmVzIHRoYXQgd2VyZSBhZGRlZCBzaW5jZSB0aGUgbGFzdCBjYWxsXG5cdCAqIHRvIHRoZSA8Y29kZT5iZWdpbkZpbGwoKTwvY29kZT4sIDxjb2RlPmJlZ2luR3JhZGllbnRGaWxsKCk8L2NvZGU+LCBvclxuXHQgKiA8Y29kZT5iZWdpbkJpdG1hcEZpbGwoKTwvY29kZT4gbWV0aG9kLiBGbGFzaCB1c2VzIHRoZSBmaWxsIHRoYXQgd2FzXG5cdCAqIHNwZWNpZmllZCBpbiB0aGUgcHJldmlvdXMgY2FsbCB0byB0aGUgPGNvZGU+YmVnaW5GaWxsKCk8L2NvZGU+LFxuXHQgKiA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiwgb3IgPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+XG5cdCAqIG1ldGhvZC4gSWYgdGhlIGN1cnJlbnQgZHJhd2luZyBwb3NpdGlvbiBkb2VzIG5vdCBlcXVhbCB0aGUgcHJldmlvdXNcblx0ICogcG9zaXRpb24gc3BlY2lmaWVkIGluIGEgPGNvZGU+bW92ZVRvKCk8L2NvZGU+IG1ldGhvZCBhbmQgYSBmaWxsIGlzXG5cdCAqIGRlZmluZWQsIHRoZSBwYXRoIGlzIGNsb3NlZCB3aXRoIGEgbGluZSBhbmQgdGhlbiBmaWxsZWQuXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZW5kRmlsbCgpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyBhIGJpdG1hcCB0byB1c2UgZm9yIHRoZSBsaW5lIHN0cm9rZSB3aGVuIGRyYXdpbmcgbGluZXMuXG5cdCAqXG5cdCAqIDxwPlRoZSBiaXRtYXAgbGluZSBzdHlsZSBpcyB1c2VkIGZvciBzdWJzZXF1ZW50IGNhbGxzIHRvIEdyYXBoaWNzIG1ldGhvZHNcblx0ICogc3VjaCBhcyB0aGUgPGNvZGU+bGluZVRvKCk8L2NvZGU+IG1ldGhvZCBvciB0aGUgPGNvZGU+ZHJhd0NpcmNsZSgpPC9jb2RlPlxuXHQgKiBtZXRob2QuIFRoZSBsaW5lIHN0eWxlIHJlbWFpbnMgaW4gZWZmZWN0IHVudGlsIHlvdSBjYWxsIHRoZVxuXHQgKiA8Y29kZT5saW5lU3R5bGUoKTwvY29kZT4gb3IgPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4gbWV0aG9kcywgb3Jcblx0ICogdGhlIDxjb2RlPmxpbmVCaXRtYXBTdHlsZSgpPC9jb2RlPiBtZXRob2QgYWdhaW4gd2l0aCBkaWZmZXJlbnQgcGFyYW1ldGVycy5cblx0ICogPC9wPlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIGNhbGwgdGhlIDxjb2RlPmxpbmVCaXRtYXBTdHlsZSgpPC9jb2RlPiBtZXRob2QgaW4gdGhlIG1pZGRsZSBvZlxuXHQgKiBkcmF3aW5nIGEgcGF0aCB0byBzcGVjaWZ5IGRpZmZlcmVudCBzdHlsZXMgZm9yIGRpZmZlcmVudCBsaW5lIHNlZ21lbnRzXG5cdCAqIHdpdGhpbiBhIHBhdGguIDwvcD5cblx0ICpcblx0ICogPHA+Q2FsbCB0aGUgPGNvZGU+bGluZVN0eWxlKCk8L2NvZGU+IG1ldGhvZCBiZWZvcmUgeW91IGNhbGwgdGhlXG5cdCAqIDxjb2RlPmxpbmVCaXRtYXBTdHlsZSgpPC9jb2RlPiBtZXRob2QgdG8gZW5hYmxlIGEgc3Ryb2tlLCBvciBlbHNlIHRoZVxuXHQgKiB2YWx1ZSBvZiB0aGUgbGluZSBzdHlsZSBpcyA8Y29kZT51bmRlZmluZWQ8L2NvZGU+LjwvcD5cblx0ICpcblx0ICogPHA+Q2FsbHMgdG8gdGhlIDxjb2RlPmNsZWFyKCk8L2NvZGU+IG1ldGhvZCBzZXQgdGhlIGxpbmUgc3R5bGUgYmFjayB0b1xuXHQgKiA8Y29kZT51bmRlZmluZWQ8L2NvZGU+LiA8L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBiaXRtYXAgVGhlIGJpdG1hcCB0byB1c2UgZm9yIHRoZSBsaW5lIHN0cm9rZS5cblx0ICogQHBhcmFtIG1hdHJpeCBBbiBvcHRpb25hbCB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggYXMgZGVmaW5lZCBieSB0aGVcblx0ICogICAgICAgICAgICAgICBmbGFzaC5nZW9tLk1hdHJpeCBjbGFzcy4gVGhlIG1hdHJpeCBjYW4gYmUgdXNlZCB0byBzY2FsZSBvclxuXHQgKiAgICAgICAgICAgICAgIG90aGVyd2lzZSBtYW5pcHVsYXRlIHRoZSBiaXRtYXAgYmVmb3JlIGFwcGx5aW5nIGl0IHRvIHRoZVxuXHQgKiAgICAgICAgICAgICAgIGxpbmUgc3R5bGUuXG5cdCAqIEBwYXJhbSByZXBlYXQgV2hldGhlciB0byByZXBlYXQgdGhlIGJpdG1hcCBpbiBhIHRpbGVkIGZhc2hpb24uXG5cdCAqIEBwYXJhbSBzbW9vdGggV2hldGhlciBzbW9vdGhpbmcgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIGJpdG1hcC5cblx0ICovXG5cdHB1YmxpYyBsaW5lQml0bWFwU3R5bGUoYml0bWFwOkJpdG1hcERhdGEsIG1hdHJpeDpNYXRyaXggPSBudWxsLCByZXBlYXQ6Ym9vbGVhbiA9IHRydWUsIHNtb290aDpib29sZWFuID0gZmFsc2UpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyBhIGdyYWRpZW50IHRvIHVzZSBmb3IgdGhlIHN0cm9rZSB3aGVuIGRyYXdpbmcgbGluZXMuXG5cdCAqXG5cdCAqIDxwPlRoZSBncmFkaWVudCBsaW5lIHN0eWxlIGlzIHVzZWQgZm9yIHN1YnNlcXVlbnQgY2FsbHMgdG8gR3JhcGhpY3Ncblx0ICogbWV0aG9kcyBzdWNoIGFzIHRoZSA8Y29kZT5saW5lVG8oKTwvY29kZT4gbWV0aG9kcyBvciB0aGVcblx0ICogPGNvZGU+ZHJhd0NpcmNsZSgpPC9jb2RlPiBtZXRob2QuIFRoZSBsaW5lIHN0eWxlIHJlbWFpbnMgaW4gZWZmZWN0IHVudGlsXG5cdCAqIHlvdSBjYWxsIHRoZSA8Y29kZT5saW5lU3R5bGUoKTwvY29kZT4gb3IgPGNvZGU+bGluZUJpdG1hcFN0eWxlKCk8L2NvZGU+XG5cdCAqIG1ldGhvZHMsIG9yIHRoZSA8Y29kZT5saW5lR3JhZGllbnRTdHlsZSgpPC9jb2RlPiBtZXRob2QgYWdhaW4gd2l0aFxuXHQgKiBkaWZmZXJlbnQgcGFyYW1ldGVycy4gPC9wPlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIGNhbGwgdGhlIDxjb2RlPmxpbmVHcmFkaWVudFN0eWxlKCk8L2NvZGU+IG1ldGhvZCBpbiB0aGUgbWlkZGxlXG5cdCAqIG9mIGRyYXdpbmcgYSBwYXRoIHRvIHNwZWNpZnkgZGlmZmVyZW50IHN0eWxlcyBmb3IgZGlmZmVyZW50IGxpbmUgc2VnbWVudHNcblx0ICogd2l0aGluIGEgcGF0aC4gPC9wPlxuXHQgKlxuXHQgKiA8cD5DYWxsIHRoZSA8Y29kZT5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kIGJlZm9yZSB5b3UgY2FsbCB0aGVcblx0ICogPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4gbWV0aG9kIHRvIGVuYWJsZSBhIHN0cm9rZSwgb3IgZWxzZSB0aGVcblx0ICogdmFsdWUgb2YgdGhlIGxpbmUgc3R5bGUgaXMgPGNvZGU+dW5kZWZpbmVkPC9jb2RlPi48L3A+XG5cdCAqXG5cdCAqIDxwPkNhbGxzIHRvIHRoZSA8Y29kZT5jbGVhcigpPC9jb2RlPiBtZXRob2Qgc2V0IHRoZSBsaW5lIHN0eWxlIGJhY2sgdG9cblx0ICogPGNvZGU+dW5kZWZpbmVkPC9jb2RlPi4gPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gdHlwZSAgICAgICAgICAgICAgICBBIHZhbHVlIGZyb20gdGhlIEdyYWRpZW50VHlwZSBjbGFzcyB0aGF0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmllcyB3aGljaCBncmFkaWVudCB0eXBlIHRvIHVzZSwgZWl0aGVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdyYWRpZW50VHlwZS5MSU5FQVIgb3IgR3JhZGllbnRUeXBlLlJBRElBTC5cblx0ICogQHBhcmFtIGNvbG9ycyAgICAgICAgICAgICAgQW4gYXJyYXkgb2YgUkdCIGhleGFkZWNpbWFsIGNvbG9yIHZhbHVlcyB1c2VkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIHRoZSBncmFkaWVudDsgZm9yIGV4YW1wbGUsIHJlZCBpcyAweEZGMDAwMCxcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgYmx1ZSBpcyAweDAwMDBGRiwgYW5kIHNvIG9uLiBZb3UgY2FuIHNwZWNpZnlcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdXAgdG8gMTUgY29sb3JzLiBGb3IgZWFjaCBjb2xvciwgc3BlY2lmeSBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlc3BvbmRpbmcgdmFsdWUgaW4gdGhlIGFscGhhcyBhbmQgcmF0aW9zXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMuXG5cdCAqIEBwYXJhbSBhbHBoYXMgICAgICAgICAgICAgIEFuIGFycmF5IG9mIGFscGhhIHZhbHVlcyBmb3IgdGhlIGNvcnJlc3BvbmRpbmdcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JzIGluIHRoZSBjb2xvcnMgYXJyYXk7IHZhbGlkIHZhbHVlcyBhcmUgMFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byAxLiBJZiB0aGUgdmFsdWUgaXMgbGVzcyB0aGFuIDAsIHRoZSBkZWZhdWx0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIDAuIElmIHRoZSB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gMSwgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQgaXMgMS5cblx0ICogQHBhcmFtIHJhdGlvcyAgICAgICAgICAgICAgQW4gYXJyYXkgb2YgY29sb3IgZGlzdHJpYnV0aW9uIHJhdGlvczsgdmFsaWRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIGFyZSAwLTI1NS4gVGhpcyB2YWx1ZSBkZWZpbmVzIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50YWdlIG9mIHRoZSB3aWR0aCB3aGVyZSB0aGUgY29sb3IgaXNcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FtcGxlZCBhdCAxMDAlLiBUaGUgdmFsdWUgMCByZXByZXNlbnRzIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0IHBvc2l0aW9uIGluIHRoZSBncmFkaWVudCBib3gsIGFuZCAyNTVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwcmVzZW50cyB0aGUgcmlnaHQgcG9zaXRpb24gaW4gdGhlIGdyYWRpZW50XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveC5cblx0ICogQHBhcmFtIG1hdHJpeCAgICAgICAgICAgICAgQSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggYXMgZGVmaW5lZCBieSB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhc2guZ2VvbS5NYXRyaXggY2xhc3MuIFRoZSBmbGFzaC5nZW9tLk1hdHJpeFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcyBpbmNsdWRlcyBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmNyZWF0ZUdyYWRpZW50Qm94KCk8L2NvZGU+IG1ldGhvZCwgd2hpY2hcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0cyB5b3UgY29udmVuaWVudGx5IHNldCB1cCB0aGUgbWF0cml4IGZvciB1c2Vcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kLlxuXHQgKiBAcGFyYW0gc3ByZWFkTWV0aG9kICAgICAgICBBIHZhbHVlIGZyb20gdGhlIFNwcmVhZE1ldGhvZCBjbGFzcyB0aGF0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmllcyB3aGljaCBzcHJlYWQgbWV0aG9kIHRvIHVzZTpcblx0ICogQHBhcmFtIGludGVycG9sYXRpb25NZXRob2QgQSB2YWx1ZSBmcm9tIHRoZSBJbnRlcnBvbGF0aW9uTWV0aG9kIGNsYXNzIHRoYXRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWVzIHdoaWNoIHZhbHVlIHRvIHVzZS4gRm9yIGV4YW1wbGUsXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNpZGVyIGEgc2ltcGxlIGxpbmVhciBncmFkaWVudCBiZXR3ZWVuIHR3b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcnMod2l0aCB0aGUgPGNvZGU+c3ByZWFkTWV0aG9kPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXIgc2V0IHRvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlNwcmVhZE1ldGhvZC5SRUZMRUNUPC9jb2RlPikuIFRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWZmZXJlbnQgaW50ZXJwb2xhdGlvbiBtZXRob2RzIGFmZmVjdCB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwZWFyYW5jZSBhcyBmb2xsb3dzOlxuXHQgKiBAcGFyYW0gZm9jYWxQb2ludFJhdGlvICAgICBBIG51bWJlciB0aGF0IGNvbnRyb2xzIHRoZSBsb2NhdGlvbiBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jYWwgcG9pbnQgb2YgdGhlIGdyYWRpZW50LiBUaGUgdmFsdWUgMCBtZWFuc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgZm9jYWwgcG9pbnQgaXMgaW4gdGhlIGNlbnRlci4gVGhlIHZhbHVlIDFcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbnMgdGhlIGZvY2FsIHBvaW50IGlzIGF0IG9uZSBib3JkZXIgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRpZW50IGNpcmNsZS4gVGhlIHZhbHVlIC0xIG1lYW5zIHRoYXQgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY2FsIHBvaW50IGlzIGF0IHRoZSBvdGhlciBib3JkZXIgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRpZW50IGNpcmNsZS4gVmFsdWVzIGxlc3MgdGhhbiAtMSBvciBncmVhdGVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYW4gMSBhcmUgcm91bmRlZCB0byAtMSBvciAxLiBUaGUgZm9sbG93aW5nXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlIHNob3dzIGEgZ3JhZGllbnQgd2l0aCBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmZvY2FsUG9pbnRSYXRpbzwvY29kZT4gb2YgLTAuNzU6XG5cdCAqL1xuXHRwdWJsaWMgbGluZUdyYWRpZW50U3R5bGUodHlwZTpHcmFkaWVudFR5cGUsIGNvbG9yczpBcnJheTxudW1iZXIgLyppbnQqLz4sIGFscGhhczpBcnJheTxudW1iZXI+LCByYXRpb3M6QXJyYXk8bnVtYmVyPiwgbWF0cml4Ok1hdHJpeCA9IG51bGwsIHNwcmVhZE1ldGhvZDpTcHJlYWRNZXRob2QgPSBudWxsLCBpbnRlcnBvbGF0aW9uTWV0aG9kOkludGVycG9sYXRpb25NZXRob2QgPSBudWxsLCBmb2NhbFBvaW50UmF0aW86bnVtYmVyID0gMClcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogU3BlY2lmaWVzIGEgc2hhZGVyIHRvIHVzZSBmb3IgdGhlIGxpbmUgc3Ryb2tlIHdoZW4gZHJhd2luZyBsaW5lcy5cblx0ICpcblx0ICogPHA+VGhlIHNoYWRlciBsaW5lIHN0eWxlIGlzIHVzZWQgZm9yIHN1YnNlcXVlbnQgY2FsbHMgdG8gR3JhcGhpY3MgbWV0aG9kc1xuXHQgKiBzdWNoIGFzIHRoZSA8Y29kZT5saW5lVG8oKTwvY29kZT4gbWV0aG9kIG9yIHRoZSA8Y29kZT5kcmF3Q2lyY2xlKCk8L2NvZGU+XG5cdCAqIG1ldGhvZC4gVGhlIGxpbmUgc3R5bGUgcmVtYWlucyBpbiBlZmZlY3QgdW50aWwgeW91IGNhbGwgdGhlXG5cdCAqIDxjb2RlPmxpbmVTdHlsZSgpPC9jb2RlPiBvciA8Y29kZT5saW5lR3JhZGllbnRTdHlsZSgpPC9jb2RlPiBtZXRob2RzLCBvclxuXHQgKiB0aGUgPGNvZGU+bGluZUJpdG1hcFN0eWxlKCk8L2NvZGU+IG1ldGhvZCBhZ2FpbiB3aXRoIGRpZmZlcmVudCBwYXJhbWV0ZXJzLlxuXHQgKiA8L3A+XG5cdCAqXG5cdCAqIDxwPllvdSBjYW4gY2FsbCB0aGUgPGNvZGU+bGluZVNoYWRlclN0eWxlKCk8L2NvZGU+IG1ldGhvZCBpbiB0aGUgbWlkZGxlIG9mXG5cdCAqIGRyYXdpbmcgYSBwYXRoIHRvIHNwZWNpZnkgZGlmZmVyZW50IHN0eWxlcyBmb3IgZGlmZmVyZW50IGxpbmUgc2VnbWVudHNcblx0ICogd2l0aGluIGEgcGF0aC4gPC9wPlxuXHQgKlxuXHQgKiA8cD5DYWxsIHRoZSA8Y29kZT5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kIGJlZm9yZSB5b3UgY2FsbCB0aGVcblx0ICogPGNvZGU+bGluZVNoYWRlclN0eWxlKCk8L2NvZGU+IG1ldGhvZCB0byBlbmFibGUgYSBzdHJva2UsIG9yIGVsc2UgdGhlXG5cdCAqIHZhbHVlIG9mIHRoZSBsaW5lIHN0eWxlIGlzIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4uPC9wPlxuXHQgKlxuXHQgKiA8cD5DYWxscyB0byB0aGUgPGNvZGU+Y2xlYXIoKTwvY29kZT4gbWV0aG9kIHNldCB0aGUgbGluZSBzdHlsZSBiYWNrIHRvXG5cdCAqIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4uIDwvcD5cblx0ICpcblx0ICogQHBhcmFtIHNoYWRlciBUaGUgc2hhZGVyIHRvIHVzZSBmb3IgdGhlIGxpbmUgc3Ryb2tlLlxuXHQgKiBAcGFyYW0gbWF0cml4IEFuIG9wdGlvbmFsIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCBhcyBkZWZpbmVkIGJ5IHRoZVxuXHQgKiAgICAgICAgICAgICAgIGZsYXNoLmdlb20uTWF0cml4IGNsYXNzLiBUaGUgbWF0cml4IGNhbiBiZSB1c2VkIHRvIHNjYWxlIG9yXG5cdCAqICAgICAgICAgICAgICAgb3RoZXJ3aXNlIG1hbmlwdWxhdGUgdGhlIGJpdG1hcCBiZWZvcmUgYXBwbHlpbmcgaXQgdG8gdGhlXG5cdCAqICAgICAgICAgICAgICAgbGluZSBzdHlsZS5cblx0ICovXG4vL1x0XHRwdWJsaWMgbGluZVNoYWRlclN0eWxlKHNoYWRlcjpTaGFkZXIsIG1hdHJpeDpNYXRyaXggPSBudWxsKVxuLy9cdFx0e1xuLy9cbi8vXHRcdH1cblxuXHQvKipcblx0ICogU3BlY2lmaWVzIGEgbGluZSBzdHlsZSB1c2VkIGZvciBzdWJzZXF1ZW50IGNhbGxzIHRvIEdyYXBoaWNzIG1ldGhvZHMgc3VjaFxuXHQgKiBhcyB0aGUgPGNvZGU+bGluZVRvKCk8L2NvZGU+IG1ldGhvZCBvciB0aGUgPGNvZGU+ZHJhd0NpcmNsZSgpPC9jb2RlPlxuXHQgKiBtZXRob2QuIFRoZSBsaW5lIHN0eWxlIHJlbWFpbnMgaW4gZWZmZWN0IHVudGlsIHlvdSBjYWxsIHRoZVxuXHQgKiA8Y29kZT5saW5lR3JhZGllbnRTdHlsZSgpPC9jb2RlPiBtZXRob2QsIHRoZVxuXHQgKiA8Y29kZT5saW5lQml0bWFwU3R5bGUoKTwvY29kZT4gbWV0aG9kLCBvciB0aGUgPGNvZGU+bGluZVN0eWxlKCk8L2NvZGU+XG5cdCAqIG1ldGhvZCB3aXRoIGRpZmZlcmVudCBwYXJhbWV0ZXJzLlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIGNhbGwgdGhlIDxjb2RlPmxpbmVTdHlsZSgpPC9jb2RlPiBtZXRob2QgaW4gdGhlIG1pZGRsZSBvZlxuXHQgKiBkcmF3aW5nIGEgcGF0aCB0byBzcGVjaWZ5IGRpZmZlcmVudCBzdHlsZXMgZm9yIGRpZmZlcmVudCBsaW5lIHNlZ21lbnRzXG5cdCAqIHdpdGhpbiB0aGUgcGF0aC48L3A+XG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6IDwvYj5DYWxscyB0byB0aGUgPGNvZGU+Y2xlYXIoKTwvY29kZT4gbWV0aG9kIHNldCB0aGUgbGluZVxuXHQgKiBzdHlsZSBiYWNrIHRvIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4uPC9wPlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOiA8L2I+Rmxhc2ggTGl0ZSA0IHN1cHBvcnRzIG9ubHkgdGhlIGZpcnN0IHRocmVlIHBhcmFtZXRlcnNcblx0ICogKDxjb2RlPnRoaWNrbmVzczwvY29kZT4sIDxjb2RlPmNvbG9yPC9jb2RlPiwgYW5kIDxjb2RlPmFscGhhPC9jb2RlPikuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gdGhpY2tuZXNzICAgIEFuIGludGVnZXIgdGhhdCBpbmRpY2F0ZXMgdGhlIHRoaWNrbmVzcyBvZiB0aGUgbGluZSBpblxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHBvaW50czsgdmFsaWQgdmFsdWVzIGFyZSAwLTI1NS4gSWYgYSBudW1iZXIgaXMgbm90XG5cdCAqICAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWVkLCBvciBpZiB0aGUgcGFyYW1ldGVyIGlzIHVuZGVmaW5lZCwgYSBsaW5lIGlzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgbm90IGRyYXduLiBJZiBhIHZhbHVlIG9mIGxlc3MgdGhhbiAwIGlzIHBhc3NlZCwgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCBpcyAwLiBUaGUgdmFsdWUgMCBpbmRpY2F0ZXMgaGFpcmxpbmVcblx0ICogICAgICAgICAgICAgICAgICAgICB0aGlja25lc3M7IHRoZSBtYXhpbXVtIHRoaWNrbmVzcyBpcyAyNTUuIElmIGEgdmFsdWVcblx0ICogICAgICAgICAgICAgICAgICAgICBncmVhdGVyIHRoYW4gMjU1IGlzIHBhc3NlZCwgdGhlIGRlZmF1bHQgaXMgMjU1LlxuXHQgKiBAcGFyYW0gY29sb3IgICAgICAgIEEgaGV4YWRlY2ltYWwgY29sb3IgdmFsdWUgb2YgdGhlIGxpbmU7IGZvciBleGFtcGxlLFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHJlZCBpcyAweEZGMDAwMCwgYmx1ZSBpcyAweDAwMDBGRiwgYW5kIHNvIG9uLiBJZiBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgdmFsdWUgaXMgbm90IGluZGljYXRlZCwgdGhlIGRlZmF1bHQgaXMgMHgwMDAwMDBcblx0ICogICAgICAgICAgICAgICAgICAgIChibGFjaykuIE9wdGlvbmFsLlxuXHQgKiBAcGFyYW0gYWxwaGEgICAgICAgIEEgbnVtYmVyIHRoYXQgaW5kaWNhdGVzIHRoZSBhbHBoYSB2YWx1ZSBvZiB0aGUgY29sb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICBvZiB0aGUgbGluZTsgdmFsaWQgdmFsdWVzIGFyZSAwIHRvIDEuIElmIGEgdmFsdWUgaXNcblx0ICogICAgICAgICAgICAgICAgICAgICBub3QgaW5kaWNhdGVkLCB0aGUgZGVmYXVsdCBpcyAxKHNvbGlkKS4gSWYgdGhlIHZhbHVlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgaXMgbGVzcyB0aGFuIDAsIHRoZSBkZWZhdWx0IGlzIDAuIElmIHRoZSB2YWx1ZSBpc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgIGdyZWF0ZXIgdGhhbiAxLCB0aGUgZGVmYXVsdCBpcyAxLlxuXHQgKiBAcGFyYW0gcGl4ZWxIaW50aW5nKE5vdCBzdXBwb3J0ZWQgaW4gRmxhc2ggTGl0ZSA0KSBBIEJvb2xlYW4gdmFsdWUgdGhhdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmllcyB3aGV0aGVyIHRvIGhpbnQgc3Ryb2tlcyB0byBmdWxsIHBpeGVscy4gVGhpc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgIGFmZmVjdHMgYm90aCB0aGUgcG9zaXRpb24gb2YgYW5jaG9ycyBvZiBhIGN1cnZlIGFuZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHRoZSBsaW5lIHN0cm9rZSBzaXplIGl0c2VsZi4gV2l0aFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnBpeGVsSGludGluZzwvY29kZT4gc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGxpbmUgd2lkdGhzIGFyZSBhZGp1c3RlZCB0byBmdWxsIHBpeGVsIHdpZHRocy4gV2l0aFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnBpeGVsSGludGluZzwvY29kZT4gc2V0IHRvIDxjb2RlPmZhbHNlPC9jb2RlPixcblx0ICogICAgICAgICAgICAgICAgICAgICBkaXNqb2ludHMgY2FuIGFwcGVhciBmb3IgY3VydmVzIGFuZCBzdHJhaWdodCBsaW5lcy5cblx0ICogICAgICAgICAgICAgICAgICAgICBGb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZyBpbGx1c3RyYXRpb25zIHNob3cgaG93XG5cdCAqICAgICAgICAgICAgICAgICAgICAgRmxhc2ggUGxheWVyIG9yIEFkb2JlIEFJUiByZW5kZXJzIHR3byByb3VuZGVkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgcmVjdGFuZ2xlcyB0aGF0IGFyZSBpZGVudGljYWwsIGV4Y2VwdCB0aGF0IHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnBpeGVsSGludGluZzwvY29kZT4gcGFyYW1ldGVyIHVzZWQgaW4gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+bGluZVN0eWxlKCk8L2NvZGU+IG1ldGhvZCBpcyBzZXQgZGlmZmVyZW50bHlcblx0ICogICAgICAgICAgICAgICAgICAgICh0aGUgaW1hZ2VzIGFyZSBzY2FsZWQgYnkgMjAwJSwgdG8gZW1waGFzaXplIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGRpZmZlcmVuY2UpOlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxwPklmIGEgdmFsdWUgaXMgbm90IHN1cHBsaWVkLCB0aGUgbGluZSBkb2VzIG5vdCB1c2Vcblx0ICogICAgICAgICAgICAgICAgICAgICBwaXhlbCBoaW50aW5nLjwvcD5cblx0ICogQHBhcmFtIHNjYWxlTW9kZSAgIChOb3Qgc3VwcG9ydGVkIGluIEZsYXNoIExpdGUgNCkgQSB2YWx1ZSBmcm9tIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIExpbmVTY2FsZU1vZGUgY2xhc3MgdGhhdCBzcGVjaWZpZXMgd2hpY2ggc2NhbGUgbW9kZSB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgIHVzZTpcblx0ICogICAgICAgICAgICAgICAgICAgICA8dWw+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8bGk+IDxjb2RlPkxpbmVTY2FsZU1vZGUuTk9STUFMPC9jb2RlPiAtIEFsd2F5c1xuXHQgKiAgICAgICAgICAgICAgICAgICAgIHNjYWxlIHRoZSBsaW5lIHRoaWNrbmVzcyB3aGVuIHRoZSBvYmplY3QgaXMgc2NhbGVkXG5cdCAqICAgICAgICAgICAgICAgICAgICAodGhlIGRlZmF1bHQpLiA8L2xpPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGxpPiA8Y29kZT5MaW5lU2NhbGVNb2RlLk5PTkU8L2NvZGU+IC0gTmV2ZXIgc2NhbGVcblx0ICogICAgICAgICAgICAgICAgICAgICB0aGUgbGluZSB0aGlja25lc3MuIDwvbGk+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8bGk+IDxjb2RlPkxpbmVTY2FsZU1vZGUuVkVSVElDQUw8L2NvZGU+IC0gRG8gbm90XG5cdCAqICAgICAgICAgICAgICAgICAgICAgc2NhbGUgdGhlIGxpbmUgdGhpY2tuZXNzIGlmIHRoZSBvYmplY3QgaXMgc2NhbGVkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxseSA8aT5vbmx5PC9pPi4gRm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGZvbGxvd2luZyBjaXJjbGVzLCBkcmF3biB3aXRoIGEgb25lLXBpeGVsIGxpbmUsIGFuZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGVhY2ggd2l0aCB0aGUgPGNvZGU+c2NhbGVNb2RlPC9jb2RlPiBwYXJhbWV0ZXIgc2V0IHRvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+TGluZVNjYWxlTW9kZS5WRVJUSUNBTDwvY29kZT4uIFRoZSBjaXJjbGUgb24gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgbGVmdCBpcyBzY2FsZWQgdmVydGljYWxseSBvbmx5LCBhbmQgdGhlIGNpcmNsZSBvbiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICByaWdodCBpcyBzY2FsZWQgYm90aCB2ZXJ0aWNhbGx5IGFuZCBob3Jpem9udGFsbHk6XG5cdCAqICAgICAgICAgICAgICAgICAgICAgPC9saT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxsaT4gPGNvZGU+TGluZVNjYWxlTW9kZS5IT1JJWk9OVEFMPC9jb2RlPiAtIERvIG5vdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHNjYWxlIHRoZSBsaW5lIHRoaWNrbmVzcyBpZiB0aGUgb2JqZWN0IGlzIHNjYWxlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxseSA8aT5vbmx5PC9pPi4gRm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGZvbGxvd2luZyBjaXJjbGVzLCBkcmF3biB3aXRoIGEgb25lLXBpeGVsIGxpbmUsIGFuZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGVhY2ggd2l0aCB0aGUgPGNvZGU+c2NhbGVNb2RlPC9jb2RlPiBwYXJhbWV0ZXIgc2V0IHRvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+TGluZVNjYWxlTW9kZS5IT1JJWk9OVEFMPC9jb2RlPi4gVGhlIGNpcmNsZSBvblxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHRoZSBsZWZ0IGlzIHNjYWxlZCBob3Jpem9udGFsbHkgb25seSwgYW5kIHRoZSBjaXJjbGVcblx0ICogICAgICAgICAgICAgICAgICAgICBvbiB0aGUgcmlnaHQgaXMgc2NhbGVkIGJvdGggdmVydGljYWxseSBhbmRcblx0ICogICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsbHk6ICAgPC9saT5cblx0ICogICAgICAgICAgICAgICAgICAgICA8L3VsPlxuXHQgKiBAcGFyYW0gY2FwcyAgICAgICAgKE5vdCBzdXBwb3J0ZWQgaW4gRmxhc2ggTGl0ZSA0KSBBIHZhbHVlIGZyb20gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgQ2Fwc1N0eWxlIGNsYXNzIHRoYXQgc3BlY2lmaWVzIHRoZSB0eXBlIG9mIGNhcHMgYXQgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgZW5kIG9mIGxpbmVzLiBWYWxpZCB2YWx1ZXMgYXJlOlxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkNhcHNTdHlsZS5OT05FPC9jb2RlPixcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5DYXBzU3R5bGUuUk9VTkQ8L2NvZGU+LCBhbmRcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5DYXBzU3R5bGUuU1FVQVJFPC9jb2RlPi4gSWYgYSB2YWx1ZSBpcyBub3Rcblx0ICogICAgICAgICAgICAgICAgICAgICBpbmRpY2F0ZWQsIEZsYXNoIHVzZXMgcm91bmQgY2Fwcy5cblx0ICpcblx0ICogICAgICAgICAgICAgICAgICAgICA8cD5Gb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZyBpbGx1c3RyYXRpb25zIHNob3cgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgZGlmZmVyZW50IDxjb2RlPmNhcHNTdHlsZTwvY29kZT4gc2V0dGluZ3MuIEZvciBlYWNoXG5cdCAqICAgICAgICAgICAgICAgICAgICAgc2V0dGluZywgdGhlIGlsbHVzdHJhdGlvbiBzaG93cyBhIGJsdWUgbGluZSB3aXRoIGFcblx0ICogICAgICAgICAgICAgICAgICAgICB0aGlja25lc3Mgb2YgMzAoZm9yIHdoaWNoIHRoZSA8Y29kZT5jYXBzU3R5bGU8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgYXBwbGllcyksIGFuZCBhIHN1cGVyaW1wb3NlZCBibGFjayBsaW5lIHdpdGggYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHRoaWNrbmVzcyBvZiAxKGZvciB3aGljaCBubyA8Y29kZT5jYXBzU3R5bGU8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgYXBwbGllcyk6IDwvcD5cblx0ICogQHBhcmFtIGpvaW50cyAgICAgIChOb3Qgc3VwcG9ydGVkIGluIEZsYXNoIExpdGUgNCkgQSB2YWx1ZSBmcm9tIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIEpvaW50U3R5bGUgY2xhc3MgdGhhdCBzcGVjaWZpZXMgdGhlIHR5cGUgb2Ygam9pbnRcblx0ICogICAgICAgICAgICAgICAgICAgICBhcHBlYXJhbmNlIHVzZWQgYXQgYW5nbGVzLiBWYWxpZCB2YWx1ZXMgYXJlOlxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkpvaW50U3R5bGUuQkVWRUw8L2NvZGU+LFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkpvaW50U3R5bGUuTUlURVI8L2NvZGU+LCBhbmRcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5Kb2ludFN0eWxlLlJPVU5EPC9jb2RlPi4gSWYgYSB2YWx1ZSBpcyBub3Rcblx0ICogICAgICAgICAgICAgICAgICAgICBpbmRpY2F0ZWQsIEZsYXNoIHVzZXMgcm91bmQgam9pbnRzLlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxwPkZvciBleGFtcGxlLCB0aGUgZm9sbG93aW5nIGlsbHVzdHJhdGlvbnMgc2hvdyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICBkaWZmZXJlbnQgPGNvZGU+am9pbnRzPC9jb2RlPiBzZXR0aW5ncy4gRm9yIGVhY2hcblx0ICogICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLCB0aGUgaWxsdXN0cmF0aW9uIHNob3dzIGFuIGFuZ2xlZCBibHVlIGxpbmVcblx0ICogICAgICAgICAgICAgICAgICAgICB3aXRoIGEgdGhpY2tuZXNzIG9mIDMwKGZvciB3aGljaCB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5qb2ludFN0eWxlPC9jb2RlPiBhcHBsaWVzKSwgYW5kIGEgc3VwZXJpbXBvc2VkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgYW5nbGVkIGJsYWNrIGxpbmUgd2l0aCBhIHRoaWNrbmVzcyBvZiAxKGZvciB3aGljaCBub1xuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmpvaW50U3R5bGU8L2NvZGU+IGFwcGxpZXMpOiA8L3A+XG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPHA+PGI+Tm90ZTo8L2I+IEZvciA8Y29kZT5qb2ludHM8L2NvZGU+IHNldCB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkpvaW50U3R5bGUuTUlURVI8L2NvZGU+LCB5b3UgY2FuIHVzZSB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5taXRlckxpbWl0PC9jb2RlPiBwYXJhbWV0ZXIgdG8gbGltaXQgdGhlIGxlbmd0aFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIG9mIHRoZSBtaXRlci48L3A+XG5cdCAqIEBwYXJhbSBtaXRlckxpbWl0ICAoTm90IHN1cHBvcnRlZCBpbiBGbGFzaCBMaXRlIDQpIEEgbnVtYmVyIHRoYXRcblx0ICogICAgICAgICAgICAgICAgICAgICBpbmRpY2F0ZXMgdGhlIGxpbWl0IGF0IHdoaWNoIGEgbWl0ZXIgaXMgY3V0IG9mZi4gVmFsaWRcblx0ICogICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgcmFuZ2UgZnJvbSAxIHRvIDI1NShhbmQgdmFsdWVzIG91dHNpZGUgdGhhdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHJhbmdlIGFyZSByb3VuZGVkIHRvIDEgb3IgMjU1KS4gVGhpcyB2YWx1ZSBpcyBvbmx5XG5cdCAqICAgICAgICAgICAgICAgICAgICAgdXNlZCBpZiB0aGUgPGNvZGU+am9pbnRTdHlsZTwvY29kZT4gaXMgc2V0IHRvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+XCJtaXRlclwiPC9jb2RlPi4gVGhlIDxjb2RlPm1pdGVyTGltaXQ8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgdmFsdWUgcmVwcmVzZW50cyB0aGUgbGVuZ3RoIHRoYXQgYSBtaXRlciBjYW4gZXh0ZW5kXG5cdCAqICAgICAgICAgICAgICAgICAgICAgYmV5b25kIHRoZSBwb2ludCBhdCB3aGljaCB0aGUgbGluZXMgbWVldCB0byBmb3JtIGFcblx0ICogICAgICAgICAgICAgICAgICAgICBqb2ludC4gVGhlIHZhbHVlIGV4cHJlc3NlcyBhIGZhY3RvciBvZiB0aGUgbGluZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnRoaWNrbmVzczwvY29kZT4uIEZvciBleGFtcGxlLCB3aXRoIGFcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5taXRlckxpbWl0PC9jb2RlPiBmYWN0b3Igb2YgMi41IGFuZCBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dGhpY2tuZXNzPC9jb2RlPiBvZiAxMCBwaXhlbHMsIHRoZSBtaXRlciBpcyBjdXRcblx0ICogICAgICAgICAgICAgICAgICAgICBvZmYgYXQgMjUgcGl4ZWxzLlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxwPkZvciBleGFtcGxlLCBjb25zaWRlciB0aGUgZm9sbG93aW5nIGFuZ2xlZCBsaW5lcyxcblx0ICogICAgICAgICAgICAgICAgICAgICBlYWNoIGRyYXduIHdpdGggYSA8Y29kZT50aGlja25lc3M8L2NvZGU+IG9mIDIwLCBidXRcblx0ICogICAgICAgICAgICAgICAgICAgICB3aXRoIDxjb2RlPm1pdGVyTGltaXQ8L2NvZGU+IHNldCB0byAxLCAyLCBhbmQgNC5cblx0ICogICAgICAgICAgICAgICAgICAgICBTdXBlcmltcG9zZWQgYXJlIGJsYWNrIHJlZmVyZW5jZSBsaW5lcyBzaG93aW5nIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIG1lZXRpbmcgcG9pbnRzIG9mIHRoZSBqb2ludHM6PC9wPlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxwPk5vdGljZSB0aGF0IGEgZ2l2ZW4gPGNvZGU+bWl0ZXJMaW1pdDwvY29kZT4gdmFsdWVcblx0ICogICAgICAgICAgICAgICAgICAgICBoYXMgYSBzcGVjaWZpYyBtYXhpbXVtIGFuZ2xlIGZvciB3aGljaCB0aGUgbWl0ZXIgaXNcblx0ICogICAgICAgICAgICAgICAgICAgICBjdXQgb2ZmLiBUaGUgZm9sbG93aW5nIHRhYmxlIGxpc3RzIHNvbWUgZXhhbXBsZXM6PC9wPlxuXHQgKi9cblx0cHVibGljIGxpbmVTdHlsZSh0aGlja25lc3M6bnVtYmVyID0gMCwgY29sb3I6bnVtYmVyIC8qaW50Ki8gPSAwLCBhbHBoYTpudW1iZXIgPSAxLCBwaXhlbEhpbnRpbmc6Ym9vbGVhbiA9IGZhbHNlLCBzY2FsZU1vZGU6TGluZVNjYWxlTW9kZSA9IG51bGwsIGNhcHM6Q2Fwc1N0eWxlID0gbnVsbCwgam9pbnRzOkpvaW50U3R5bGUgPSBudWxsLCBtaXRlckxpbWl0Om51bWJlciA9IDMpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIERyYXdzIGEgbGluZSB1c2luZyB0aGUgY3VycmVudCBsaW5lIHN0eWxlIGZyb20gdGhlIGN1cnJlbnQgZHJhd2luZ1xuXHQgKiBwb3NpdGlvbiB0byg8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4pOyB0aGUgY3VycmVudCBkcmF3aW5nIHBvc2l0aW9uXG5cdCAqIGlzIHRoZW4gc2V0IHRvKDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPikuIElmIHRoZSBkaXNwbGF5IG9iamVjdCBpblxuXHQgKiB3aGljaCB5b3UgYXJlIGRyYXdpbmcgY29udGFpbnMgY29udGVudCB0aGF0IHdhcyBjcmVhdGVkIHdpdGggdGhlIEZsYXNoXG5cdCAqIGRyYXdpbmcgdG9vbHMsIGNhbGxzIHRvIHRoZSA8Y29kZT5saW5lVG8oKTwvY29kZT4gbWV0aG9kIGFyZSBkcmF3blxuXHQgKiB1bmRlcm5lYXRoIHRoZSBjb250ZW50LiBJZiB5b3UgY2FsbCA8Y29kZT5saW5lVG8oKTwvY29kZT4gYmVmb3JlIGFueSBjYWxsc1xuXHQgKiB0byB0aGUgPGNvZGU+bW92ZVRvKCk8L2NvZGU+IG1ldGhvZCwgdGhlIGRlZmF1bHQgcG9zaXRpb24gZm9yIHRoZSBjdXJyZW50XG5cdCAqIGRyYXdpbmcgaXMoPGk+MCwgMDwvaT4pLiBJZiBhbnkgb2YgdGhlIHBhcmFtZXRlcnMgYXJlIG1pc3NpbmcsIHRoaXNcblx0ICogbWV0aG9kIGZhaWxzIGFuZCB0aGUgY3VycmVudCBkcmF3aW5nIHBvc2l0aW9uIGlzIG5vdCBjaGFuZ2VkLlxuXHQgKlxuXHQgKiBAcGFyYW0geCBBIG51bWJlciB0aGF0IGluZGljYXRlcyB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGVcblx0ICogICAgICAgICAgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3QoaW4gcGl4ZWxzKS5cblx0ICogQHBhcmFtIHkgQSBudW1iZXIgdGhhdCBpbmRpY2F0ZXMgdGhlIHZlcnRpY2FsIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZVxuXHQgKiAgICAgICAgICByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdChpbiBwaXhlbHMpLlxuXHQgKi9cblx0cHVibGljIGxpbmVUbyh4Om51bWJlciwgeTpudW1iZXIpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIHRoZSBjdXJyZW50IGRyYXdpbmcgcG9zaXRpb24gdG8oPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+KS4gSWZcblx0ICogYW55IG9mIHRoZSBwYXJhbWV0ZXJzIGFyZSBtaXNzaW5nLCB0aGlzIG1ldGhvZCBmYWlscyBhbmQgdGhlIGN1cnJlbnRcblx0ICogZHJhd2luZyBwb3NpdGlvbiBpcyBub3QgY2hhbmdlZC5cblx0ICpcblx0ICogQHBhcmFtIHggQSBudW1iZXIgdGhhdCBpbmRpY2F0ZXMgdGhlIGhvcml6b250YWwgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlXG5cdCAqICAgICAgICAgIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50IGRpc3BsYXkgb2JqZWN0KGluIHBpeGVscykuXG5cdCAqIEBwYXJhbSB5IEEgbnVtYmVyIHRoYXQgaW5kaWNhdGVzIHRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGVcblx0ICogICAgICAgICAgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3QoaW4gcGl4ZWxzKS5cblx0ICovXG5cdHB1YmxpYyBtb3ZlVG8oeDpudW1iZXIsIHk6bnVtYmVyKVxuXHR7XG5cblx0fVxufVxuXG5leHBvcnQgPSBHcmFwaGljczsiXX0=