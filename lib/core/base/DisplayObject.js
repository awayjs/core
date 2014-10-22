var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AxisAlignedBoundingBox = require("awayjs-core/lib/bounds/AxisAlignedBoundingBox");

var AlignmentMode = require("awayjs-core/lib/core/base/AlignmentMode");

var OrientationMode = require("awayjs-core/lib/core/base/OrientationMode");

var MathConsts = require("awayjs-core/lib/core/geom/MathConsts");
var Matrix3D = require("awayjs-core/lib/core/geom/Matrix3D");
var Matrix3DUtils = require("awayjs-core/lib/core/geom/Matrix3DUtils");
var Point = require("awayjs-core/lib/core/geom/Point");

var Transform = require("awayjs-core/lib/core/geom/Transform");
var Vector3D = require("awayjs-core/lib/core/geom/Vector3D");

var PickingCollisionVO = require("awayjs-core/lib/core/pick/PickingCollisionVO");

var NamedAssetBase = require("awayjs-core/lib/core/library/NamedAssetBase");

var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var DisplayObjectEvent = require("awayjs-core/lib/events/DisplayObjectEvent");
var SceneEvent = require("awayjs-core/lib/events/SceneEvent");

/**
* The DisplayObject class is the base class for all objects that can be
* placed on the display list. The display list manages all objects displayed
* in flash. Use the DisplayObjectContainer class to arrange the
* display objects in the display list. DisplayObjectContainer objects can
* have child display objects, while other display objects, such as Shape and
* TextField objects, are "leaf" nodes that have only parents and siblings, no
* children.
*
* <p>The DisplayObject class supports basic functionality like the <i>x</i>
* and <i>y</i> position of an object, as well as more advanced properties of
* the object such as its transformation matrix. </p>
*
* <p>DisplayObject is an abstract base class; therefore, you cannot call
* DisplayObject directly. Invoking <code>new DisplayObject()</code> throws an
* <code>ArgumentError</code> exception. </p>
*
* <p>All display objects inherit from the DisplayObject class.</p>
*
* <p>The DisplayObject class itself does not include any APIs for rendering
* content onscreen. For that reason, if you want create a custom subclass of
* the DisplayObject class, you will want to extend one of its subclasses that
* do have APIs for rendering content onscreen, such as the Shape, Sprite,
* Bitmap, SimpleButton, TextField, or MovieClip class.</p>
*
* <p>The DisplayObject class contains several broadcast events. Normally, the
* target of any particular event is a specific DisplayObject instance. For
* example, the target of an <code>added</code> event is the specific
* DisplayObject instance that was added to the display list. Having a single
* target restricts the placement of event listeners to that target and in
* some cases the target's ancestors on the display list. With broadcast
* events, however, the target is not a specific DisplayObject instance, but
* rather all DisplayObject instances, including those that are not on the
* display list. This means that you can add a listener to any DisplayObject
* instance to listen for broadcast events. In addition to the broadcast
* events listed in the DisplayObject class's Events table, the DisplayObject
* class also inherits two broadcast events from the EventDispatcher class:
* <code>activate</code> and <code>deactivate</code>.</p>
*
* <p>Some properties previously used in the ActionScript 1.0 and 2.0
* MovieClip, TextField, and Button classes(such as <code>_alpha</code>,
* <code>_height</code>, <code>_name</code>, <code>_width</code>,
* <code>_x</code>, <code>_y</code>, and others) have equivalents in the
* ActionScript 3.0 DisplayObject class that are renamed so that they no
* longer begin with the underscore(_) character.</p>
*
* <p>For more information, see the "Display Programming" chapter of the
* <i>ActionScript 3.0 Developer's Guide</i>.</p>
*
* @event added            Dispatched when a display object is added to the
*                         display list. The following methods trigger this
*                         event:
*                         <code>DisplayObjectContainer.addChild()</code>,
*                         <code>DisplayObjectContainer.addChildAt()</code>.
* @event addedToStage     Dispatched when a display object is added to the on
*                         stage display list, either directly or through the
*                         addition of a sub tree in which the display object
*                         is contained. The following methods trigger this
*                         event:
*                         <code>DisplayObjectContainer.addChild()</code>,
*                         <code>DisplayObjectContainer.addChildAt()</code>.
* @event enterFrame       [broadcast event] Dispatched when the playhead is
*                         entering a new frame. If the playhead is not
*                         moving, or if there is only one frame, this event
*                         is dispatched continuously in conjunction with the
*                         frame rate. This event is a broadcast event, which
*                         means that it is dispatched by all display objects
*                         with a listener registered for this event.
* @event exitFrame        [broadcast event] Dispatched when the playhead is
*                         exiting the current frame. All frame scripts have
*                         been run. If the playhead is not moving, or if
*                         there is only one frame, this event is dispatched
*                         continuously in conjunction with the frame rate.
*                         This event is a broadcast event, which means that
*                         it is dispatched by all display objects with a
*                         listener registered for this event.
* @event frameConstructed [broadcast event] Dispatched after the constructors
*                         of frame display objects have run but before frame
*                         scripts have run. If the playhead is not moving, or
*                         if there is only one frame, this event is
*                         dispatched continuously in conjunction with the
*                         frame rate. This event is a broadcast event, which
*                         means that it is dispatched by all display objects
*                         with a listener registered for this event.
* @event removed          Dispatched when a display object is about to be
*                         removed from the display list. Two methods of the
*                         DisplayObjectContainer class generate this event:
*                         <code>removeChild()</code> and
*                         <code>removeChildAt()</code>.
*
*                         <p>The following methods of a
*                         DisplayObjectContainer object also generate this
*                         event if an object must be removed to make room for
*                         the new object: <code>addChild()</code>,
*                         <code>addChildAt()</code>, and
*                         <code>setChildIndex()</code>. </p>
* @event removedFromStage Dispatched when a display object is about to be
*                         removed from the display list, either directly or
*                         through the removal of a sub tree in which the
*                         display object is contained. Two methods of the
*                         DisplayObjectContainer class generate this event:
*                         <code>removeChild()</code> and
*                         <code>removeChildAt()</code>.
*
*                         <p>The following methods of a
*                         DisplayObjectContainer object also generate this
*                         event if an object must be removed to make room for
*                         the new object: <code>addChild()</code>,
*                         <code>addChildAt()</code>, and
*                         <code>setChildIndex()</code>. </p>
* @event render           [broadcast event] Dispatched when the display list
*                         is about to be updated and rendered. This event
*                         provides the last opportunity for objects listening
*                         for this event to make changes before the display
*                         list is rendered. You must call the
*                         <code>invalidate()</code> method of the Stage
*                         object each time you want a <code>render</code>
*                         event to be dispatched. <code>Render</code> events
*                         are dispatched to an object only if there is mutual
*                         trust between it and the object that called
*                         <code>Stage.invalidate()</code>. This event is a
*                         broadcast event, which means that it is dispatched
*                         by all display objects with a listener registered
*                         for this event.
*
*                         <p><b>Note: </b>This event is not dispatched if the
*                         display is not rendering. This is the case when the
*                         content is either minimized or obscured. </p>
*/
var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    /**
    * Creates a new <code>DisplayObject</code> instance.
    */
    function DisplayObject() {
        _super.call(this);
        this._pSceneTransform = new Matrix3D();
        this._pSceneTransformDirty = true;
        this._matrix3D = new Matrix3D();
        this._matrix3DDirty = true;
        this._inverseSceneTransform = new Matrix3D();
        this._inverseSceneTransformDirty = true;
        this._scenePosition = new Vector3D();
        this._scenePositionDirty = true;
        this._explicitVisibility = true;
        this._pImplicitVisibility = true;
        this._explicitMouseEnabled = true;
        this._pImplicitMouseEnabled = true;
        this._positionDirty = true;
        this._rotationDirty = true;
        this._scaleDirty = true;
        this._rotationX = 0;
        this._rotationY = 0;
        this._rotationZ = 0;
        this._eulers = new Vector3D();
        this._flipY = new Matrix3D();
        this._zOffset = 0;
        this._pScaleX = 1;
        this._pScaleY = 1;
        this._pScaleZ = 1;
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._pivot = new Vector3D();
        this._orientationMatrix = new Matrix3D();
        this._pivotZero = true;
        this._pivotDirty = true;
        this._pos = new Vector3D();
        this._rot = new Vector3D();
        this._sca = new Vector3D();
        this._pIgnoreTransform = false;
        this._pBoundsInvalid = true;
        this._worldBoundsInvalid = true;
        this._pRenderables = new Array();
        /**
        *
        */
        this.alignmentMode = AlignmentMode.REGISTRATION_POINT;
        /**
        *
        */
        this.castsShadows = true;
        /**
        *
        */
        this.orientationMode = OrientationMode.DEFAULT;

        // Cached vector of transformation components used when
        // recomposing the transform matrix in updateTransform()
        this._transformComponents = new Array(3); //_transformComponents = new Vector.<Vector3D>(3, true);

        this._transformComponents[0] = this._pos;
        this._transformComponents[1] = this._rot;
        this._transformComponents[2] = this._sca;

        //creation of associated transform object
        this._transform = new Transform(this);

        this._matrix3D.identity();

        this._flipY.appendScale(1, -1, 1);

        this._pBounds = this.pCreateDefaultBoundingVolume();

        this._worldBounds = this.pCreateDefaultBoundingVolume();
    }
    Object.defineProperty(DisplayObject.prototype, "bounds", {
        /**
        *
        */
        get: function () {
            if (this._pBoundsInvalid)
                this.pUpdateBounds();

            return this._pBounds;
        },
        set: function (value) {
            if (this._pBounds == value)
                return;

            this._pBounds = value;

            this._worldBounds = value.clone();

            this.pInvalidateBounds();

            if (this._boundsVisible)
                this._partitionNode._iUpdateEntityBounds();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "depth", {
        /**
        * Indicates the depth of the display object, in pixels. The depth is
        * calculated based on the bounds of the content of the display object. When
        * you set the <code>depth</code> property, the <code>scaleZ</code> property
        * is adjusted accordingly, as shown in the following code:
        *
        * <p>Except for TextField and Video objects, a display object with no
        * content (such as an empty sprite) has a depth of 0, even if you try to
        * set <code>depth</code> to a different value.</p>
        */
        get: function () {
            if (this._pBoundsInvalid)
                this.pUpdateBounds();

            return this._depth;
        },
        set: function (val) {
            if (this._depth == val)
                return;

            this._depth == val;

            this._pScaleZ = val / this.bounds.aabb.depth;

            this.invalidateScale();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "eulers", {
        /**
        * Defines the rotation of the 3d object as a <code>Vector3D</code> object containing euler angles for rotation around x, y and z axis.
        */
        get: function () {
            this._eulers.x = this._rotationX * MathConsts.RADIANS_TO_DEGREES;
            this._eulers.y = this._rotationY * MathConsts.RADIANS_TO_DEGREES;
            this._eulers.z = this._rotationZ * MathConsts.RADIANS_TO_DEGREES;

            return this._eulers;
        },
        set: function (value) {
            this._rotationX = value.x * MathConsts.DEGREES_TO_RADIANS;
            this._rotationY = value.y * MathConsts.DEGREES_TO_RADIANS;
            this._rotationZ = value.z * MathConsts.DEGREES_TO_RADIANS;

            this.invalidateRotation();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "height", {
        /**
        * An indexed array that contains each filter object currently associated
        * with the display object. The flash.filters package contains several
        * classes that define specific filters you can use.
        *
        * <p>Filters can be applied in Flash Professional at design time, or at run
        * time by using ActionScript code. To apply a filter by using ActionScript,
        * you must make a temporary copy of the entire <code>filters</code> array,
        * modify the temporary array, then assign the value of the temporary array
        * back to the <code>filters</code> array. You cannot directly add a new
        * filter object to the <code>filters</code> array.</p>
        *
        * <p>To add a filter by using ActionScript, perform the following steps
        * (assume that the target display object is named
        * <code>myDisplayObject</code>):</p>
        *
        * <ol>
        *   <li>Create a new filter object by using the constructor method of your
        * chosen filter class.</li>
        *   <li>Assign the value of the <code>myDisplayObject.filters</code> array
        * to a temporary array, such as one named <code>myFilters</code>.</li>
        *   <li>Add the new filter object to the <code>myFilters</code> temporary
        * array.</li>
        *   <li>Assign the value of the temporary array to the
        * <code>myDisplayObject.filters</code> array.</li>
        * </ol>
        *
        * <p>If the <code>filters</code> array is undefined, you do not need to use
        * a temporary array. Instead, you can directly assign an array literal that
        * contains one or more filter objects that you create. The first example in
        * the Examples section adds a drop shadow filter by using code that handles
        * both defined and undefined <code>filters</code> arrays.</p>
        *
        * <p>To modify an existing filter object, you must use the technique of
        * modifying a copy of the <code>filters</code> array:</p>
        *
        * <ol>
        *   <li>Assign the value of the <code>filters</code> array to a temporary
        * array, such as one named <code>myFilters</code>.</li>
        *   <li>Modify the property by using the temporary array,
        * <code>myFilters</code>. For example, to set the quality property of the
        * first filter in the array, you could use the following code:
        * <code>myFilters[0].quality = 1;</code></li>
        *   <li>Assign the value of the temporary array to the <code>filters</code>
        * array.</li>
        * </ol>
        *
        * <p>At load time, if a display object has an associated filter, it is
        * marked to cache itself as a transparent bitmap. From this point forward,
        * as long as the display object has a valid filter list, the player caches
        * the display object as a bitmap. This source bitmap is used as a source
        * image for the filter effects. Each display object usually has two bitmaps:
        * one with the original unfiltered source display object and another for the
        * final image after filtering. The final image is used when rendering. As
        * long as the display object does not change, the final image does not need
        * updating.</p>
        *
        * <p>The flash.filters package includes classes for filters. For example, to
        * create a DropShadow filter, you would write:</p>
        *
        * @throws ArgumentError When <code>filters</code> includes a ShaderFilter
        *                       and the shader output type is not compatible with
        *                       this operation(the shader must specify a
        *                       <code>pixel4</code> output).
        * @throws ArgumentError When <code>filters</code> includes a ShaderFilter
        *                       and the shader doesn't specify any image input or
        *                       the first input is not an <code>image4</code> input.
        * @throws ArgumentError When <code>filters</code> includes a ShaderFilter
        *                       and the shader specifies an image input that isn't
        *                       provided.
        * @throws ArgumentError When <code>filters</code> includes a ShaderFilter, a
        *                       ByteArray or Vector.<Number> instance as a shader
        *                       input, and the <code>width</code> and
        *                       <code>height</code> properties aren't specified for
        *                       the ShaderInput object, or the specified values
        *                       don't match the amount of data in the input data.
        *                       See the <code>ShaderInput.input</code> property for
        *                       more information.
        */
        //		public filters:Array<Dynamic>;
        /**
        * Indicates the height of the display object, in pixels. The height is
        * calculated based on the bounds of the content of the display object. When
        * you set the <code>height</code> property, the <code>scaleY</code> property
        * is adjusted accordingly, as shown in the following code:
        *
        * <p>Except for TextField and Video objects, a display object with no
        * content (such as an empty sprite) has a height of 0, even if you try to
        * set <code>height</code> to a different value.</p>
        */
        get: function () {
            if (this._pBoundsInvalid)
                this.pUpdateBounds();

            return this._height;
        },
        set: function (val) {
            if (this._height == val)
                return;

            this._height == val;

            this._pScaleY = val / this.bounds.aabb.height;

            this.invalidateScale();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "index", {
        /**
        * Indicates the instance container index of the DisplayObject. The object can be
        * identified in the child list of its parent display object container by
        * calling the <code>getChildByIndex()</code> method of the display object
        * container.
        *
        * <p>If the DisplayObject has no parent container, index defaults to 0.</p>
        */
        get: function () {
            if (this._pParent)
                return this._pParent.getChildIndex(this);

            return 0;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "inverseSceneTransform", {
        /**
        *
        */
        get: function () {
            if (this._inverseSceneTransformDirty) {
                this._inverseSceneTransform.copyFrom(this.sceneTransform);
                this._inverseSceneTransform.invert();
                this._inverseSceneTransformDirty = false;
            }
            return this._inverseSceneTransform;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "ignoreTransform", {
        /**
        *
        */
        get: function () {
            return this._pIgnoreTransform;
        },
        set: function (value) {
            if (this._pIgnoreTransform == value)
                return;

            this._pIgnoreTransform = value;

            if (value) {
                this._pSceneTransform.identity();
                this._scenePosition.setTo(0, 0, 0);
            }

            this.pInvalidateSceneTransform();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "isEntity", {
        /**
        *
        */
        get: function () {
            return this._pIsEntity;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "loaderInfo", {
        /**
        * Returns a LoaderInfo object containing information about loading the file
        * to which this display object belongs. The <code>loaderInfo</code> property
        * is defined only for the root display object of a SWF file or for a loaded
        * Bitmap(not for a Bitmap that is drawn with ActionScript). To find the
        * <code>loaderInfo</code> object associated with the SWF file that contains
        * a display object named <code>myDisplayObject</code>, use
        * <code>myDisplayObject.root.loaderInfo</code>.
        *
        * <p>A large SWF file can monitor its download by calling
        * <code>this.root.loaderInfo.addEventListener(Event.COMPLETE,
        * func)</code>.</p>
        */
        get: function () {
            return this._loaderInfo;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "mouseEnabled", {
        /**
        * Specifies whether this object receives mouse, or other user input,
        * messages. The default value is <code>true</code>, which means that by
        * default any InteractiveObject instance that is on the display list
        * receives mouse events or other user input events. If
        * <code>mouseEnabled</code> is set to <code>false</code>, the instance does
        * not receive any mouse events(or other user input events like keyboard
        * events). Any children of this instance on the display list are not
        * affected. To change the <code>mouseEnabled</code> behavior for all
        * children of an object on the display list, use
        * <code>flash.display.DisplayObjectContainer.mouseChildren</code>.
        *
        * <p> No event is dispatched by setting this property. You must use the
        * <code>addEventListener()</code> method to create interactive
        * functionality.</p>
        */
        get: function () {
            return this._explicitMouseEnabled;
        },
        set: function (value) {
            if (this._explicitMouseEnabled == value)
                return;

            this._explicitMouseEnabled = value;

            this._pUpdateImplicitMouseEnabled(this._pParent ? this._pParent.mouseChildren : true);
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "mouseX", {
        /**
        * Indicates the x coordinate of the mouse or user input device position, in
        * pixels.
        *
        * <p><b>Note</b>: For a DisplayObject that has been rotated, the returned x
        * coordinate will reflect the non-rotated object.</p>
        */
        get: function () {
            return this._mouseX;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "mouseY", {
        /**
        * Indicates the y coordinate of the mouse or user input device position, in
        * pixels.
        *
        * <p><b>Note</b>: For a DisplayObject that has been rotated, the returned y
        * coordinate will reflect the non-rotated object.</p>
        */
        get: function () {
            return this._mouseY;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "parent", {
        /**
        * Indicates the DisplayObjectContainer object that contains this display
        * object. Use the <code>parent</code> property to specify a relative path to
        * display objects that are above the current display object in the display
        * list hierarchy.
        *
        * <p>You can use <code>parent</code> to move up multiple levels in the
        * display list as in the following:</p>
        *
        * @throws SecurityError The parent display object belongs to a security
        *                       sandbox to which you do not have access. You can
        *                       avoid this situation by having the parent movie call
        *                       the <code>Security.allowDomain()</code> method.
        */
        get: function () {
            return this._pParent;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "partition", {
        /**
        *
        */
        get: function () {
            return this._explicitPartition;
        },
        set: function (value) {
            if (this._explicitPartition == value)
                return;

            if (this._pScene && this._explicitPartition)
                this._pScene.iUnregisterPartition(this._explicitPartition);

            this._explicitPartition = value;

            if (this._pScene && value)
                this._pScene.iRegisterPartition(value);

            this._pUpdateImplicitPartition(this._pParent ? this._pParent._iAssignedPartition : null);
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "partitionNode", {
        /**
        *
        */
        get: function () {
            if (!this._partitionNode)
                this._partitionNode = this.pCreateEntityPartitionNode();

            return this._partitionNode;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "pickingCollider", {
        /**
        *
        */
        get: function () {
            return this._pPickingCollider;
        },
        set: function (value) {
            this._pPickingCollider = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "pivot", {
        /**
        * Defines the local point around which the object rotates.
        */
        get: function () {
            return this._pivot;
        },
        set: function (pivot) {
            this._pivot = pivot.clone();

            this.invalidatePivot();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "root", {
        /**
        * For a display object in a loaded SWF file, the <code>root</code> property
        * is the top-most display object in the portion of the display list's tree
        * structure represented by that SWF file. For a Bitmap object representing a
        * loaded image file, the <code>root</code> property is the Bitmap object
        * itself. For the instance of the main class of the first SWF file loaded,
        * the <code>root</code> property is the display object itself. The
        * <code>root</code> property of the Stage object is the Stage object itself.
        * The <code>root</code> property is set to <code>null</code> for any display
        * object that has not been added to the display list, unless it has been
        * added to a display object container that is off the display list but that
        * is a child of the top-most display object in a loaded SWF file.
        *
        * <p>For example, if you create a new Sprite object by calling the
        * <code>Sprite()</code> constructor method, its <code>root</code> property
        * is <code>null</code> until you add it to the display list(or to a display
        * object container that is off the display list but that is a child of the
        * top-most display object in a SWF file).</p>
        *
        * <p>For a loaded SWF file, even though the Loader object used to load the
        * file may not be on the display list, the top-most display object in the
        * SWF file has its <code>root</code> property set to itself. The Loader
        * object does not have its <code>root</code> property set until it is added
        * as a child of a display object for which the <code>root</code> property is
        * set.</p>
        */
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "rotationX", {
        /**
        * Indicates the x-axis rotation of the DisplayObject instance, in degrees,
        * from its original orientation relative to the 3D parent container. Values
        * from 0 to 180 represent clockwise rotation; values from 0 to -180
        * represent counterclockwise rotation. Values outside this range are added
        * to or subtracted from 360 to obtain a value within the range.
        */
        get: function () {
            return this._rotationX * MathConsts.RADIANS_TO_DEGREES;
        },
        set: function (val) {
            if (this.rotationX == val)
                return;

            this._rotationX = val * MathConsts.DEGREES_TO_RADIANS;

            this.invalidateRotation();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "rotationY", {
        /**
        * Indicates the y-axis rotation of the DisplayObject instance, in degrees,
        * from its original orientation relative to the 3D parent container. Values
        * from 0 to 180 represent clockwise rotation; values from 0 to -180
        * represent counterclockwise rotation. Values outside this range are added
        * to or subtracted from 360 to obtain a value within the range.
        */
        get: function () {
            return this._rotationY * MathConsts.RADIANS_TO_DEGREES;
        },
        set: function (val) {
            if (this.rotationY == val)
                return;

            this._rotationY = val * MathConsts.DEGREES_TO_RADIANS;

            this.invalidateRotation();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "rotationZ", {
        /**
        * Indicates the z-axis rotation of the DisplayObject instance, in degrees,
        * from its original orientation relative to the 3D parent container. Values
        * from 0 to 180 represent clockwise rotation; values from 0 to -180
        * represent counterclockwise rotation. Values outside this range are added
        * to or subtracted from 360 to obtain a value within the range.
        */
        get: function () {
            return this._rotationZ * MathConsts.RADIANS_TO_DEGREES;
        },
        set: function (val) {
            if (this.rotationZ == val)
                return;

            this._rotationZ = val * MathConsts.DEGREES_TO_RADIANS;

            this.invalidateRotation();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "scaleX", {
        /**
        * Indicates the horizontal scale(percentage) of the object as applied from
        * the registration point. The default registration point is(0,0). 1.0
        * equals 100% scale.
        *
        * <p>Scaling the local coordinate system changes the <code>x</code> and
        * <code>y</code> property values, which are defined in whole pixels. </p>
        */
        get: function () {
            return this._pScaleX;
        },
        set: function (val) {
            if (this._pScaleX == val)
                return;

            this._pScaleX = val;

            this.invalidateScale();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "scaleY", {
        /**
        * Indicates the vertical scale(percentage) of an object as applied from the
        * registration point of the object. The default registration point is(0,0).
        * 1.0 is 100% scale.
        *
        * <p>Scaling the local coordinate system changes the <code>x</code> and
        * <code>y</code> property values, which are defined in whole pixels. </p>
        */
        get: function () {
            return this._pScaleY;
        },
        set: function (val) {
            if (this._pScaleY == val)
                return;

            this._pScaleY = val;

            this.invalidateScale();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "scaleZ", {
        /**
        * Indicates the depth scale(percentage) of an object as applied from the
        * registration point of the object. The default registration point is(0,0).
        * 1.0 is 100% scale.
        *
        * <p>Scaling the local coordinate system changes the <code>x</code>,
        * <code>y</code> and <code>z</code> property values, which are defined in
        * whole pixels. </p>
        */
        get: function () {
            return this._pScaleZ;
        },
        set: function (val) {
            if (this._pScaleZ == val)
                return;

            this._pScaleZ = val;

            this.invalidateScale();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "scene", {
        /**
        *
        */
        get: function () {
            return this._pScene;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "scenePosition", {
        /**
        *
        */
        get: function () {
            if (this._scenePositionDirty) {
                if (!this._pivotZero && this.alignmentMode == AlignmentMode.PIVOT_POINT) {
                    var pivotScale = new Vector3D(this._pivot.x / this._pScaleX, this._pivot.y / this._pScaleY, this._pivot.z / this._pScaleZ);
                    this._scenePosition = this.sceneTransform.transformVector(pivotScale);
                    //this._scenePosition.decrementBy(new Vector3D(this._pivot.x*this._pScaleX, this._pivot.y*this._pScaleY, this._pivot.z*this._pScaleZ));
                } else {
                    this.sceneTransform.copyColumnTo(3, this._scenePosition);
                }

                this._scenePositionDirty = false;
            }
            return this._scenePosition;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "sceneTransform", {
        get: function () {
            if (this._pSceneTransformDirty)
                this.pUpdateSceneTransform();

            return this._pSceneTransform;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "shaderPickingDetails", {
        /**
        *
        */
        get: function () {
            return this._shaderPickingDetails;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "boundsVisible", {
        /**
        *
        */
        get: function () {
            return this._boundsVisible;
        },
        set: function (value) {
            if (value == this._boundsVisible)
                return;

            this._boundsVisible = value;

            this._partitionNode.boundsVisible = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "transform", {
        /**
        * An object with properties pertaining to a display object's matrix, color
        * transform, and pixel bounds. The specific properties  -  matrix,
        * colorTransform, and three read-only properties
        * (<code>concatenatedMatrix</code>, <code>concatenatedColorTransform</code>,
        * and <code>pixelBounds</code>)  -  are described in the entry for the
        * Transform class.
        *
        * <p>Each of the transform object's properties is itself an object. This
        * concept is important because the only way to set new values for the matrix
        * or colorTransform objects is to create a new object and copy that object
        * into the transform.matrix or transform.colorTransform property.</p>
        *
        * <p>For example, to increase the <code>tx</code> value of a display
        * object's matrix, you must make a copy of the entire matrix object, then
        * copy the new object into the matrix property of the transform object:</p>
        * <pre xml:space="preserve"><code> public myMatrix:Matrix =
        * myDisplayObject.transform.matrix; myMatrix.tx += 10;
        * myDisplayObject.transform.matrix = myMatrix; </code></pre>
        *
        * <p>You cannot directly set the <code>tx</code> property. The following
        * code has no effect on <code>myDisplayObject</code>: </p>
        * <pre xml:space="preserve"><code> myDisplayObject.transform.matrix.tx +=
        * 10; </code></pre>
        *
        * <p>You can also copy an entire transform object and assign it to another
        * display object's transform property. For example, the following code
        * copies the entire transform object from <code>myOldDisplayObj</code> to
        * <code>myNewDisplayObj</code>:</p>
        * <code>myNewDisplayObj.transform = myOldDisplayObj.transform;</code>
        *
        * <p>The resulting display object, <code>myNewDisplayObj</code>, now has the
        * same values for its matrix, color transform, and pixel bounds as the old
        * display object, <code>myOldDisplayObj</code>.</p>
        *
        * <p>Note that AIR for TV devices use hardware acceleration, if it is
        * available, for color transforms.</p>
        */
        get: function () {
            return this._transform;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "visible", {
        /**
        * Whether or not the display object is visible. Display objects that are not
        * visible are disabled. For example, if <code>visible=false</code> for an
        * InteractiveObject instance, it cannot be clicked.
        */
        get: function () {
            return this._explicitVisibility;
        },
        set: function (value) {
            if (this._explicitVisibility == value)
                return;

            this._explicitVisibility = value;

            this._pUpdateImplicitVisibility(this._pParent ? this._pParent._iIsVisible() : true);
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "width", {
        /**
        * Indicates the width of the display object, in pixels. The width is
        * calculated based on the bounds of the content of the display object. When
        * you set the <code>width</code> property, the <code>scaleX</code> property
        * is adjusted accordingly, as shown in the following code:
        *
        * <p>Except for TextField and Video objects, a display object with no
        * content(such as an empty sprite) has a width of 0, even if you try to set
        * <code>width</code> to a different value.</p>
        */
        get: function () {
            if (this._pBoundsInvalid)
                this.pUpdateBounds();

            return this._width;
        },
        set: function (val) {
            if (this._width == val)
                return;

            this._width == val;

            this._pScaleX = val / this.bounds.aabb.width;

            this.invalidateScale();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "worldBounds", {
        /**
        *
        */
        get: function () {
            // Since this getter is invoked every iteration of the render loop, and
            // the prefab construct could affect the bounds of the entity, the prefab is
            // validated here to give it a chance to rebuild.
            if (this._iSourcePrefab)
                this._iSourcePrefab._iValidate();

            if (this._worldBoundsInvalid) {
                this._worldBoundsInvalid = false;
                this._worldBounds.transformFrom(this.bounds, this.sceneTransform);
            }

            return this._worldBounds;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "x", {
        /**
        * Indicates the <i>x</i> coordinate of the DisplayObject instance relative
        * to the local coordinates of the parent DisplayObjectContainer. If the
        * object is inside a DisplayObjectContainer that has transformations, it is
        * in the local coordinate system of the enclosing DisplayObjectContainer.
        * Thus, for a DisplayObjectContainer rotated 90° counterclockwise, the
        * DisplayObjectContainer's children inherit a coordinate system that is
        * rotated 90° counterclockwise. The object's coordinates refer to the
        * registration point position.
        */
        get: function () {
            return this._x;
        },
        set: function (val) {
            if (this._x == val)
                return;

            this._x = val;

            this.invalidatePosition();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "y", {
        /**
        * Indicates the <i>y</i> coordinate of the DisplayObject instance relative
        * to the local coordinates of the parent DisplayObjectContainer. If the
        * object is inside a DisplayObjectContainer that has transformations, it is
        * in the local coordinate system of the enclosing DisplayObjectContainer.
        * Thus, for a DisplayObjectContainer rotated 90° counterclockwise, the
        * DisplayObjectContainer's children inherit a coordinate system that is
        * rotated 90° counterclockwise. The object's coordinates refer to the
        * registration point position.
        */
        get: function () {
            return this._y;
        },
        set: function (val) {
            if (this._y == val)
                return;

            this._y = val;

            this.invalidatePosition();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "z", {
        /**
        * Indicates the z coordinate position along the z-axis of the DisplayObject
        * instance relative to the 3D parent container. The z property is used for
        * 3D coordinates, not screen or pixel coordinates.
        *
        * <p>When you set a <code>z</code> property for a display object to
        * something other than the default value of <code>0</code>, a corresponding
        * Matrix3D object is automatically created. for adjusting a display object's
        * position and orientation in three dimensions. When working with the
        * z-axis, the existing behavior of x and y properties changes from screen or
        * pixel coordinates to positions relative to the 3D parent container.</p>
        *
        * <p>For example, a child of the <code>_root</code> at position x = 100, y =
        * 100, z = 200 is not drawn at pixel location(100,100). The child is drawn
        * wherever the 3D projection calculation puts it. The calculation is:</p>
        *
        * <p><code>(x~~cameraFocalLength/cameraRelativeZPosition,
        * y~~cameraFocalLength/cameraRelativeZPosition)</code></p>
        */
        get: function () {
            return this._z;
        },
        set: function (val) {
            if (this._z == val)
                return;

            this._z = val;

            this.invalidatePosition();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "zOffset", {
        /**
        *
        */
        get: function () {
            return this._zOffset;
        },
        set: function (value) {
            this._zOffset = value;
        },
        enumerable: true,
        configurable: true
    });


    /**
    *
    */
    DisplayObject.prototype.addEventListener = function (type, listener) {
        _super.prototype.addEventListener.call(this, type, listener);

        switch (type) {
            case DisplayObjectEvent.POSITION_CHANGED:
                this._listenToPositionChanged = true;
                break;
            case DisplayObjectEvent.ROTATION_CHANGED:
                this._listenToRotationChanged = true;
                break;
            case DisplayObjectEvent.SCALE_CHANGED:
                this._listenToScaleChanged = true;
                break;
        }
    };

    /**
    *
    */
    DisplayObject.prototype.clone = function () {
        var clone = new DisplayObject();
        clone.pivot = this.pivot;
        clone._iMatrix3D = this._iMatrix3D;
        clone.name = name;

        // todo: implement for all subtypes
        return clone;
    };

    /**
    *
    */
    DisplayObject.prototype.dispose = function () {
        if (this.parent)
            this.parent.removeChild(this);

        while (this._pRenderables.length)
            this._pRenderables[0].dispose();
    };

    /**
    * @inheritDoc
    */
    DisplayObject.prototype.disposeAsset = function () {
        this.dispose();
    };

    /**
    * Returns a rectangle that defines the area of the display object relative
    * to the coordinate system of the <code>targetCoordinateSpace</code> object.
    * Consider the following code, which shows how the rectangle returned can
    * vary depending on the <code>targetCoordinateSpace</code> parameter that
    * you pass to the method:
    *
    * <p><b>Note:</b> Use the <code>localToGlobal()</code> and
    * <code>globalToLocal()</code> methods to convert the display object's local
    * coordinates to display coordinates, or display coordinates to local
    * coordinates, respectively.</p>
    *
    * <p>The <code>getBounds()</code> method is similar to the
    * <code>getRect()</code> method; however, the Rectangle returned by the
    * <code>getBounds()</code> method includes any strokes on shapes, whereas
    * the Rectangle returned by the <code>getRect()</code> method does not. For
    * an example, see the description of the <code>getRect()</code> method.</p>
    *
    * @param targetCoordinateSpace The display object that defines the
    *                              coordinate system to use.
    * @return The rectangle that defines the area of the display object relative
    *         to the <code>targetCoordinateSpace</code> object's coordinate
    *         system.
    */
    DisplayObject.prototype.getBounds = function (targetCoordinateSpace) {
        return this._bounds;
    };

    /**
    * Returns a rectangle that defines the boundary of the display object, based
    * on the coordinate system defined by the <code>targetCoordinateSpace</code>
    * parameter, excluding any strokes on shapes. The values that the
    * <code>getRect()</code> method returns are the same or smaller than those
    * returned by the <code>getBounds()</code> method.
    *
    * <p><b>Note:</b> Use <code>localToGlobal()</code> and
    * <code>globalToLocal()</code> methods to convert the display object's local
    * coordinates to Stage coordinates, or Stage coordinates to local
    * coordinates, respectively.</p>
    *
    * @param targetCoordinateSpace The display object that defines the
    *                              coordinate system to use.
    * @return The rectangle that defines the area of the display object relative
    *         to the <code>targetCoordinateSpace</code> object's coordinate
    *         system.
    */
    DisplayObject.prototype.getRect = function (targetCoordinateSpace) {
        return this._bounds;
    };

    /**
    * Converts the <code>point</code> object from the Stage(global) coordinates
    * to the display object's(local) coordinates.
    *
    * <p>To use this method, first create an instance of the Point class. The
    * <i>x</i> and <i>y</i> values that you assign represent global coordinates
    * because they relate to the origin(0,0) of the main display area. Then
    * pass the Point instance as the parameter to the
    * <code>globalToLocal()</code> method. The method returns a new Point object
    * with <i>x</i> and <i>y</i> values that relate to the origin of the display
    * object instead of the origin of the Stage.</p>
    *
    * @param point An object created with the Point class. The Point object
    *              specifies the <i>x</i> and <i>y</i> coordinates as
    *              properties.
    * @return A Point object with coordinates relative to the display object.
    */
    DisplayObject.prototype.globalToLocal = function (point) {
        return point;
    };

    /**
    * Converts a two-dimensional point from the Stage(global) coordinates to a
    * three-dimensional display object's(local) coordinates.
    *
    * <p>To use this method, first create an instance of the Point class. The x
    * and y values that you assign to the Point object represent global
    * coordinates because they are relative to the origin(0,0) of the main
    * display area. Then pass the Point object to the
    * <code>globalToLocal3D()</code> method as the <code>point</code> parameter.
    * The method returns three-dimensional coordinates as a Vector3D object
    * containing <code>x</code>, <code>y</code>, and <code>z</code> values that
    * are relative to the origin of the three-dimensional display object.</p>
    *
    * @param point A two dimensional Point object representing global x and y
    *              coordinates.
    * @return A Vector3D object with coordinates relative to the
    *         three-dimensional display object.
    */
    DisplayObject.prototype.globalToLocal3D = function (point) {
        return new Vector3D();
    };

    /**
    * Evaluates the bounding box of the display object to see if it overlaps or
    * intersects with the bounding box of the <code>obj</code> display object.
    *
    * @param obj The display object to test against.
    * @return <code>true</code> if the bounding boxes of the display objects
    *         intersect; <code>false</code> if not.
    */
    DisplayObject.prototype.hitTestObject = function (obj) {
        return false;
    };

    /**
    * Evaluates the display object to see if it overlaps or intersects with the
    * point specified by the <code>x</code> and <code>y</code> parameters. The
    * <code>x</code> and <code>y</code> parameters specify a point in the
    * coordinate space of the Stage, not the display object container that
    * contains the display object(unless that display object container is the
    * Stage).
    *
    * @param x         The <i>x</i> coordinate to test against this object.
    * @param y         The <i>y</i> coordinate to test against this object.
    * @param shapeFlag Whether to check against the actual pixels of the object
    *                 (<code>true</code>) or the bounding box
    *                 (<code>false</code>).
    * @return <code>true</code> if the display object overlaps or intersects
    *         with the specified point; <code>false</code> otherwise.
    */
    DisplayObject.prototype.hitTestPoint = function (x, y, shapeFlag) {
        if (typeof shapeFlag === "undefined") { shapeFlag = false; }
        return false;
    };

    /**
    * @inheritDoc
    */
    DisplayObject.prototype.isIntersectingRay = function (rayPosition, rayDirection) {
        var localRayPosition = this.inverseSceneTransform.transformVector(rayPosition);
        var localRayDirection = this.inverseSceneTransform.deltaTransformVector(rayDirection);
        var pickingCollisionVO = this._iPickingCollisionVO;

        if (!pickingCollisionVO.localNormal)
            pickingCollisionVO.localNormal = new Vector3D();

        var rayEntryDistance = this.bounds.rayIntersection(localRayPosition, localRayDirection, pickingCollisionVO.localNormal);

        if (rayEntryDistance < 0)
            return false;

        pickingCollisionVO.rayEntryDistance = rayEntryDistance;
        pickingCollisionVO.localRayPosition = localRayPosition;
        pickingCollisionVO.localRayDirection = localRayDirection;
        pickingCollisionVO.rayPosition = rayPosition;
        pickingCollisionVO.rayDirection = rayDirection;
        pickingCollisionVO.rayOriginIsInsideBounds = rayEntryDistance == 0;

        return true;
    };

    /**
    * Converts a three-dimensional point of the three-dimensional display
    * object's(local) coordinates to a two-dimensional point in the Stage
    * (global) coordinates.
    *
    * <p>For example, you can only use two-dimensional coordinates(x,y) to draw
    * with the <code>display.Graphics</code> methods. To draw a
    * three-dimensional object, you need to map the three-dimensional
    * coordinates of a display object to two-dimensional coordinates. First,
    * create an instance of the Vector3D class that holds the x-, y-, and z-
    * coordinates of the three-dimensional display object. Then pass the
    * Vector3D object to the <code>local3DToGlobal()</code> method as the
    * <code>point3d</code> parameter. The method returns a two-dimensional Point
    * object that can be used with the Graphics API to draw the
    * three-dimensional object.</p>
    *
    * @param point3d A Vector3D object containing either a three-dimensional
    *                point or the coordinates of the three-dimensional display
    *                object.
    * @return A two-dimensional point representing a three-dimensional point in
    *         two-dimensional space.
    */
    DisplayObject.prototype.local3DToGlobal = function (point3d) {
        return new Point();
    };

    /**
    * Rotates the 3d object around to face a point defined relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
    *
    * @param    target        The vector defining the point to be looked at
    * @param    upAxis        An optional vector used to define the desired up orientation of the 3d object after rotation has occurred
    */
    DisplayObject.prototype.lookAt = function (target, upAxis) {
        if (typeof upAxis === "undefined") { upAxis = null; }
        var yAxis;
        var zAxis;
        var xAxis;
        var raw;

        if (upAxis == null)
            upAxis = Vector3D.Y_AXIS;
        else
            upAxis.normalize();

        zAxis = target.subtract(this._iMatrix3D.position);
        zAxis.normalize();

        xAxis = upAxis.crossProduct(zAxis);
        xAxis.normalize();

        if (xAxis.length < 0.05) {
            xAxis.x = upAxis.y;
            xAxis.y = upAxis.x;
            xAxis.z = 0;
            xAxis.normalize();
        }

        yAxis = zAxis.crossProduct(xAxis);

        raw = Matrix3DUtils.RAW_DATA_CONTAINER;

        raw[0] = xAxis.x;
        raw[1] = xAxis.y;
        raw[2] = xAxis.z;
        raw[3] = 0;

        raw[4] = yAxis.x;
        raw[5] = yAxis.y;
        raw[6] = yAxis.z;
        raw[7] = 0;

        raw[8] = zAxis.x;
        raw[9] = zAxis.y;
        raw[10] = zAxis.z;
        raw[11] = 0;

        var m = new Matrix3D();
        m.copyRawDataFrom(raw);

        var vec = m.decompose()[1];

        this._rotationX = vec.x;
        this._rotationY = vec.y;
        this._rotationZ = vec.z;

        this.invalidateRotation();
    };

    /**
    * Converts the <code>point</code> object from the display object's(local)
    * coordinates to the Stage(global) coordinates.
    *
    * <p>This method allows you to convert any given <i>x</i> and <i>y</i>
    * coordinates from values that are relative to the origin(0,0) of a
    * specific display object(local coordinates) to values that are relative to
    * the origin of the Stage(global coordinates).</p>
    *
    * <p>To use this method, first create an instance of the Point class. The
    * <i>x</i> and <i>y</i> values that you assign represent local coordinates
    * because they relate to the origin of the display object.</p>
    *
    * <p>You then pass the Point instance that you created as the parameter to
    * the <code>localToGlobal()</code> method. The method returns a new Point
    * object with <i>x</i> and <i>y</i> values that relate to the origin of the
    * Stage instead of the origin of the display object.</p>
    *
    * @param point The name or identifier of a point created with the Point
    *              class, specifying the <i>x</i> and <i>y</i> coordinates as
    *              properties.
    * @return A Point object with coordinates relative to the Stage.
    */
    DisplayObject.prototype.localToGlobal = function (point) {
        return new Point();
    };

    /**
    * Moves the 3d object directly to a point in space
    *
    * @param    dx        The amount of movement along the local x axis.
    * @param    dy        The amount of movement along the local y axis.
    * @param    dz        The amount of movement along the local z axis.
    */
    DisplayObject.prototype.moveTo = function (dx, dy, dz) {
        if (this._x == dx && this._y == dy && this._z == dz)
            return;

        this._x = dx;
        this._y = dy;
        this._z = dz;

        this.invalidatePosition();
    };

    /**
    * Moves the local point around which the object rotates.
    *
    * @param    dx        The amount of movement along the local x axis.
    * @param    dy        The amount of movement along the local y axis.
    * @param    dz        The amount of movement along the local z axis.
    */
    DisplayObject.prototype.movePivot = function (dx, dy, dz) {
        if (this._pivot == null)
            this._pivot = new Vector3D();

        this._pivot.x += dx;
        this._pivot.y += dy;
        this._pivot.z += dz;

        this.invalidatePivot();
    };

    /**
    * Rotates the 3d object around it's local x-axis
    *
    * @param    angle        The amount of rotation in degrees
    */
    DisplayObject.prototype.pitch = function (angle) {
        this.rotate(Vector3D.X_AXIS, angle);
    };

    /**
    *
    */
    DisplayObject.prototype.getRenderSceneTransform = function (camera) {
        if (this.orientationMode == OrientationMode.CAMERA_PLANE) {
            var comps = camera.sceneTransform.decompose();
            var scale = comps[2];
            comps[0] = this.scenePosition;
            scale.x = this._pScaleX;
            scale.y = this._pScaleY;
            scale.z = this._pScaleZ;
            this._orientationMatrix.recompose(comps);

            //add in case of pivot
            if (!this._pivotZero && this.alignmentMode == AlignmentMode.PIVOT_POINT)
                this._orientationMatrix.prependTranslation(-this._pivot.x / this._pScaleX, -this._pivot.y / this._pScaleY, -this._pivot.z / this._pScaleZ);

            return this._orientationMatrix;
        }

        return this.sceneTransform;
    };

    /**
    * Rotates the 3d object around it's local z-axis
    *
    * @param    angle        The amount of rotation in degrees
    */
    DisplayObject.prototype.roll = function (angle) {
        this.rotate(Vector3D.Z_AXIS, angle);
    };

    /**
    * Rotates the 3d object around an axis by a defined angle
    *
    * @param    axis        The vector defining the axis of rotation
    * @param    angle        The amount of rotation in degrees
    */
    DisplayObject.prototype.rotate = function (axis, angle) {
        var m = new Matrix3D();
        m.prependRotation(angle, axis);

        var vec = m.decompose()[1];

        this._rotationX += vec.x;
        this._rotationY += vec.y;
        this._rotationZ += vec.z;

        this.invalidateRotation();
    };

    /**
    * Rotates the 3d object directly to a euler angle
    *
    * @param    ax        The angle in degrees of the rotation around the x axis.
    * @param    ay        The angle in degrees of the rotation around the y axis.
    * @param    az        The angle in degrees of the rotation around the z axis.
    */
    DisplayObject.prototype.rotateTo = function (ax, ay, az) {
        this._rotationX = ax * MathConsts.DEGREES_TO_RADIANS;
        this._rotationY = ay * MathConsts.DEGREES_TO_RADIANS;
        this._rotationZ = az * MathConsts.DEGREES_TO_RADIANS;

        this.invalidateRotation();
    };

    /**
    *
    */
    DisplayObject.prototype.removeEventListener = function (type, listener) {
        _super.prototype.removeEventListener.call(this, type, listener);

        if (this.hasEventListener(type, listener))
            return;

        switch (type) {
            case DisplayObjectEvent.POSITION_CHANGED:
                this._listenToPositionChanged = false;
                break;

            case DisplayObjectEvent.ROTATION_CHANGED:
                this._listenToRotationChanged = false;
                break;

            case DisplayObjectEvent.SCALE_CHANGED:
                this._listenToScaleChanged = false;
                break;
        }
    };

    /**
    * Moves the 3d object along a vector by a defined length
    *
    * @param    axis        The vector defining the axis of movement
    * @param    distance    The length of the movement
    */
    DisplayObject.prototype.translate = function (axis, distance) {
        var x = axis.x, y = axis.y, z = axis.z;
        var len = distance / Math.sqrt(x * x + y * y + z * z);

        this._x += x * len;
        this._y += y * len;
        this._z += z * len;

        this.invalidatePosition();
    };

    /**
    * Moves the 3d object along a vector by a defined length
    *
    * @param    axis        The vector defining the axis of movement
    * @param    distance    The length of the movement
    */
    DisplayObject.prototype.translateLocal = function (axis, distance) {
        var x = axis.x, y = axis.y, z = axis.z;
        var len = distance / Math.sqrt(x * x + y * y + z * z);

        this._iMatrix3D.prependTranslation(x * len, y * len, z * len);

        this._matrix3D.copyColumnTo(3, this._pos);

        this._x = this._pos.x;
        this._y = this._pos.y;
        this._z = this._pos.z;

        this.invalidatePosition();
    };

    /**
    * Rotates the 3d object around it's local y-axis
    *
    * @param    angle        The amount of rotation in degrees
    */
    DisplayObject.prototype.yaw = function (angle) {
        this.rotate(Vector3D.Y_AXIS, angle);
    };

    Object.defineProperty(DisplayObject.prototype, "_iAssignedPartition", {
        /**
        * @internal
        */
        get: function () {
            return this._pImplicitPartition;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObject.prototype, "_iMatrix3D", {
        /**
        * The transformation of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
        *
        * @internal
        */
        get: function () {
            if (this._matrix3DDirty)
                this._pUpdateMatrix3D();

            return this._matrix3D;
        },
        set: function (val) {
            // TODO: From AS3 - Do we still need this in JS ?
            //ridiculous matrix error
            /*
            if (!val.rawData[0]) {
            
            var raw:number[] = Matrix3DUtils.RAW_DATA_CONTAINER;
            val.copyRawDataTo(raw);
            raw[0] = this._smallestNumber;
            val.copyRawDataFrom(raw);
            }
            //*/
            var elements = val.decompose();
            var vec;

            vec = elements[0];

            if (this._x != vec.x || this._y != vec.y || this._z != vec.z) {
                this._x = vec.x;
                this._y = vec.y;
                this._z = vec.z;

                this.invalidatePosition();
            }

            vec = elements[1];

            if (this._rotationX != vec.x || this._rotationY != vec.y || this._rotationZ != vec.z) {
                this._rotationX = vec.x;
                this._rotationY = vec.y;
                this._rotationZ = vec.z;

                this.invalidateRotation();
            }

            vec = elements[2];

            if (this._pScaleX != vec.x || this._pScaleY != vec.y || this._pScaleZ != vec.z) {
                this._pScaleX = vec.x;
                this._pScaleY = vec.y;
                this._pScaleZ = vec.z;

                this.invalidateScale();
            }
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObject.prototype, "_iPickingCollisionVO", {
        /**
        * @internal
        */
        get: function () {
            if (!this._pPickingCollisionVO)
                this._pPickingCollisionVO = new PickingCollisionVO(this);

            return this._pPickingCollisionVO;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * @internal
    */
    DisplayObject.prototype.iSetParent = function (value) {
        this._pParent = value;

        if (value) {
            this._pUpdateImplicitMouseEnabled(value.mouseChildren);
            this._pUpdateImplicitVisibility(value._iIsVisible());
            this._pUpdateImplicitPartition(value._iAssignedPartition);
            this._iSetScene(value._pScene);
        } else {
            this._pUpdateImplicitMouseEnabled(true);
            this._pUpdateImplicitVisibility(true);
            this._pUpdateImplicitPartition(null);

            this._iSetScene(null);
        }
    };

    /**
    * @protected
    */
    DisplayObject.prototype.pCreateDefaultBoundingVolume = function () {
        // point lights should be using sphere bounds
        // directional lights should be using null bounds
        return new AxisAlignedBoundingBox();
    };

    /**
    * @protected
    */
    DisplayObject.prototype.pCreateEntityPartitionNode = function () {
        throw new AbstractMethodError();
    };

    /**
    * @protected
    */
    DisplayObject.prototype.pInvalidateBounds = function () {
        this._pBoundsInvalid = true;
        this._worldBoundsInvalid = true;

        if (this.isEntity)
            this.invalidatePartition();
    };

    /**
    * @protected
    */
    DisplayObject.prototype.pInvalidateSceneTransform = function () {
        this._pSceneTransformDirty = !this._pIgnoreTransform;
        this._inverseSceneTransformDirty = !this._pIgnoreTransform;
        this._scenePositionDirty = !this._pIgnoreTransform;

        this._worldBoundsInvalid = !this._pIgnoreTransform;

        if (this.isEntity)
            this.invalidatePartition();

        if (this._listenToSceneTransformChanged)
            this.notifySceneTransformChange();
    };

    /**
    * @protected
    */
    DisplayObject.prototype.pUpdateBounds = function () {
        this._width = this._pBounds.aabb.width * this._pScaleX;
        this._height = this._pBounds.aabb.height * this._pScaleY;
        this._depth = this._pBounds.aabb.depth * this._pScaleZ;

        this._pBoundsInvalid = false;
    };

    /**
    * @protected
    */
    DisplayObject.prototype._pUpdateImplicitMouseEnabled = function (value) {
        this._pImplicitMouseEnabled = this._explicitMouseEnabled && value;

        // If there is a parent and this child does not have a picking collider, use its parent's picking collider.
        if (this._pImplicitMouseEnabled && this._pParent && !this._pPickingCollider)
            this._pPickingCollider = this._pParent._pPickingCollider;
    };

    /**
    * @protected
    */
    DisplayObject.prototype._pUpdateImplicitPartition = function (value) {
        // assign parent implicit partition if no explicit one is given
        this._pImplicitPartition = this._explicitPartition || value;
    };

    /**
    * @protected
    */
    DisplayObject.prototype._pUpdateImplicitVisibility = function (value) {
        this._pImplicitVisibility = this._explicitVisibility && value;
    };

    /**
    * @protected
    */
    DisplayObject.prototype._pUpdateMatrix3D = function () {
        this._pos.x = this._x;
        this._pos.y = this._y;
        this._pos.z = this._z;

        this._rot.x = this._rotationX;
        this._rot.y = this._rotationY;
        this._rot.z = this._rotationZ;

        this._sca.x = this._pScaleX;
        this._sca.y = this._pScaleY;
        this._sca.z = this._pScaleZ;

        this._matrix3D.recompose(this._transformComponents);

        if (!this._pivotZero) {
            this._matrix3D.prependTranslation(-this._pivot.x / this._pScaleX, -this._pivot.y / this._pScaleY, -this._pivot.z / this._pScaleZ);
            if (this.alignmentMode != AlignmentMode.PIVOT_POINT)
                this._matrix3D.appendTranslation(this._pivot.x, this._pivot.y, this._pivot.z);
        }

        this._matrix3DDirty = false;
        this._positionDirty = false;
        this._rotationDirty = false;
        this._scaleDirty = false;
        this._pivotDirty = false;
    };

    /**
    * @protected
    */
    DisplayObject.prototype.pUpdateSceneTransform = function () {
        if (this._pParent && !this._pParent._iIsRoot) {
            this._pSceneTransform.copyFrom(this._pParent.sceneTransform);
            this._pSceneTransform.prepend(this._iMatrix3D);
        } else {
            this._pSceneTransform.copyFrom(this._iMatrix3D);
        }

        this._pSceneTransformDirty = false;
    };

    DisplayObject.prototype._iAddRenderable = function (renderable) {
        this._pRenderables.push(renderable);

        return renderable;
    };

    DisplayObject.prototype._iRemoveRenderable = function (renderable) {
        var index = this._pRenderables.indexOf(renderable);

        this._pRenderables.splice(index, 1);

        return renderable;
    };

    /**
    * //TODO
    *
    * @param shortestCollisionDistance
    * @param findClosest
    * @returns {boolean}
    *
    * @internal
    */
    DisplayObject.prototype._iTestCollision = function (shortestCollisionDistance, findClosest) {
        return false;
    };

    /**
    *
    */
    DisplayObject.prototype._iInternalUpdate = function () {
        if (this._iController)
            this._iController.update();
    };

    /**
    * @internal
    */
    DisplayObject.prototype._iIsVisible = function () {
        return this._pImplicitVisibility;
    };

    /**
    * @internal
    */
    DisplayObject.prototype._iIsMouseEnabled = function () {
        return this._pImplicitMouseEnabled;
    };

    /**
    * @internal
    */
    DisplayObject.prototype._iSetScene = function (value) {
        // test to see if we're switching roots while we're already using a scene partition
        /*
        if (value == null)
        this._oldScene = this._pScene;
        
        if (this._explicitPartition && this._oldScene && this._oldScene != this._pScene)
        this.partition = null;
        
        if (value)
        this._oldScene = null;
        
        // end of stupid partition test code
        //*/
        if (this._pScene == value)
            return;

        this._pUpdateScene(value);

        if (!this._pSceneTransformDirty && !this._pIgnoreTransform)
            this.pInvalidateSceneTransform();
    };

    /**
    * @protected
    */
    DisplayObject.prototype._pUpdateScene = function (value) {
        if (this._pScene) {
            this._pScene.dispatchEvent(new SceneEvent(SceneEvent.REMOVED_FROM_SCENE, this));

            //unregister entity from current scene
            this._pScene.iUnregisterEntity(this);
        }

        this._pScene = value;

        if (value) {
            value.dispatchEvent(new SceneEvent(SceneEvent.ADDED_TO_SCENE, this));

            //register entity with new scene
            value.iRegisterEntity(this);
        }

        this.notifySceneChange();
    };

    /**
    * @private
    */
    DisplayObject.prototype.notifyPositionChanged = function () {
        if (!this._positionChanged)
            this._positionChanged = new DisplayObjectEvent(DisplayObjectEvent.POSITION_CHANGED, this);

        this.dispatchEvent(this._positionChanged);
    };

    /**
    * @private
    */
    DisplayObject.prototype.notifyRotationChanged = function () {
        if (!this._rotationChanged)
            this._rotationChanged = new DisplayObjectEvent(DisplayObjectEvent.ROTATION_CHANGED, this);

        this.dispatchEvent(this._rotationChanged);
    };

    /**
    * @private
    */
    DisplayObject.prototype.notifyScaleChanged = function () {
        if (!this._scaleChanged)
            this._scaleChanged = new DisplayObjectEvent(DisplayObjectEvent.SCALE_CHANGED, this);

        this.dispatchEvent(this._scaleChanged);
    };

    /**
    * @private
    */
    DisplayObject.prototype.notifySceneChange = function () {
        if (this._listenToSceneChanged) {
            if (!this._scenechanged)
                this._scenechanged = new DisplayObjectEvent(DisplayObjectEvent.SCENE_CHANGED, this);

            this.dispatchEvent(this._scenechanged);
        }
    };

    /**
    * @private
    */
    DisplayObject.prototype.notifySceneTransformChange = function () {
        if (!this._sceneTransformChanged)
            this._sceneTransformChanged = new DisplayObjectEvent(DisplayObjectEvent.SCENETRANSFORM_CHANGED, this);

        this.dispatchEvent(this._sceneTransformChanged);
    };

    /**
    * Invalidates the 3D transformation matrix, causing it to be updated upon the next request
    *
    * @private
    */
    DisplayObject.prototype.invalidateMatrix3D = function () {
        if (this._matrix3DDirty)
            return;

        this._matrix3DDirty = true;

        if (!this._pSceneTransformDirty && !this._pIgnoreTransform)
            this.pInvalidateSceneTransform();
    };

    /**
    * @private
    */
    DisplayObject.prototype.invalidatePartition = function () {
        if (this._iAssignedPartition)
            this._iAssignedPartition.iMarkForUpdate(this);
    };

    /**
    * @private
    */
    DisplayObject.prototype.invalidatePivot = function () {
        this._pivotZero = (this._pivot.x == 0) && (this._pivot.y == 0) && (this._pivot.z == 0);

        if (this._pivotDirty)
            return;

        this._pivotDirty = true;

        this.invalidateMatrix3D();
    };

    /**
    * @private
    */
    DisplayObject.prototype.invalidatePosition = function () {
        if (this._positionDirty)
            return;

        this._positionDirty = true;

        this.invalidateMatrix3D();

        if (this._listenToPositionChanged)
            this.notifyPositionChanged();
    };

    /**
    * @private
    */
    DisplayObject.prototype.invalidateRotation = function () {
        if (this._rotationDirty)
            return;

        this._rotationDirty = true;

        this.invalidateMatrix3D();

        if (this._listenToRotationChanged)
            this.notifyRotationChanged();
    };

    /**
    * @private
    */
    DisplayObject.prototype.invalidateScale = function () {
        if (this._scaleDirty)
            return;

        this._scaleDirty = true;

        this.invalidateMatrix3D();

        if (this._listenToScaleChanged)
            this.notifyScaleChanged();
    };
    return DisplayObject;
})(NamedAssetBase);

module.exports = DisplayObject;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvYmFzZS9EaXNwbGF5T2JqZWN0LnRzIl0sIm5hbWVzIjpbIkRpc3BsYXlPYmplY3QiLCJEaXNwbGF5T2JqZWN0LmNvbnN0cnVjdG9yIiwiRGlzcGxheU9iamVjdC5hZGRFdmVudExpc3RlbmVyIiwiRGlzcGxheU9iamVjdC5jbG9uZSIsIkRpc3BsYXlPYmplY3QuZGlzcG9zZSIsIkRpc3BsYXlPYmplY3QuZGlzcG9zZUFzc2V0IiwiRGlzcGxheU9iamVjdC5nZXRCb3VuZHMiLCJEaXNwbGF5T2JqZWN0LmdldFJlY3QiLCJEaXNwbGF5T2JqZWN0Lmdsb2JhbFRvTG9jYWwiLCJEaXNwbGF5T2JqZWN0Lmdsb2JhbFRvTG9jYWwzRCIsIkRpc3BsYXlPYmplY3QuaGl0VGVzdE9iamVjdCIsIkRpc3BsYXlPYmplY3QuaGl0VGVzdFBvaW50IiwiRGlzcGxheU9iamVjdC5pc0ludGVyc2VjdGluZ1JheSIsIkRpc3BsYXlPYmplY3QubG9jYWwzRFRvR2xvYmFsIiwiRGlzcGxheU9iamVjdC5sb29rQXQiLCJEaXNwbGF5T2JqZWN0LmxvY2FsVG9HbG9iYWwiLCJEaXNwbGF5T2JqZWN0Lm1vdmVUbyIsIkRpc3BsYXlPYmplY3QubW92ZVBpdm90IiwiRGlzcGxheU9iamVjdC5waXRjaCIsIkRpc3BsYXlPYmplY3QuZ2V0UmVuZGVyU2NlbmVUcmFuc2Zvcm0iLCJEaXNwbGF5T2JqZWN0LnJvbGwiLCJEaXNwbGF5T2JqZWN0LnJvdGF0ZSIsIkRpc3BsYXlPYmplY3Qucm90YXRlVG8iLCJEaXNwbGF5T2JqZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIiLCJEaXNwbGF5T2JqZWN0LnRyYW5zbGF0ZSIsIkRpc3BsYXlPYmplY3QudHJhbnNsYXRlTG9jYWwiLCJEaXNwbGF5T2JqZWN0LnlhdyIsIkRpc3BsYXlPYmplY3QuaVNldFBhcmVudCIsIkRpc3BsYXlPYmplY3QucENyZWF0ZURlZmF1bHRCb3VuZGluZ1ZvbHVtZSIsIkRpc3BsYXlPYmplY3QucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJEaXNwbGF5T2JqZWN0LnBJbnZhbGlkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5wVXBkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVNYXRyaXgzRCIsIkRpc3BsYXlPYmplY3QucFVwZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5faUFkZFJlbmRlcmFibGUiLCJEaXNwbGF5T2JqZWN0Ll9pUmVtb3ZlUmVuZGVyYWJsZSIsIkRpc3BsYXlPYmplY3QuX2lUZXN0Q29sbGlzaW9uIiwiRGlzcGxheU9iamVjdC5faUludGVybmFsVXBkYXRlIiwiRGlzcGxheU9iamVjdC5faUlzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QuX2lJc01vdXNlRW5hYmxlZCIsIkRpc3BsYXlPYmplY3QuX2lTZXRTY2VuZSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVTY2VuZSIsIkRpc3BsYXlPYmplY3Qubm90aWZ5UG9zaXRpb25DaGFuZ2VkIiwiRGlzcGxheU9iamVjdC5ub3RpZnlSb3RhdGlvbkNoYW5nZWQiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjYWxlQ2hhbmdlZCIsIkRpc3BsYXlPYmplY3Qubm90aWZ5U2NlbmVDaGFuZ2UiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQaXZvdCIsIkRpc3BsYXlPYmplY3QuaW52YWxpZGF0ZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlUm90YXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVTY2FsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscUZBQXlGOztBQUt6RixzRUFBNEU7O0FBRzVFLDBFQUFnRjs7QUFFaEYsZ0VBQXVFO0FBQ3ZFLDREQUFvRTtBQUNwRSxzRUFBNEU7QUFDNUUsc0RBQThEOztBQUU5RCw4REFBcUU7QUFDckUsNERBQW9FOztBQUlwRSxnRkFBcUY7O0FBRXJGLDJFQUFpRjs7QUFFakYsK0VBQW9GO0FBQ3BGLDZFQUFrRjtBQUNsRiw2REFBb0U7O0FBR3BFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWdJRztBQUNIO0lBQTRCQSxnQ0FBY0E7SUEwcEN6Q0E7O01BREdBO0lBQ0hBO1FBRUNDLFdBQU1BLEtBQUFBLENBQUNBO1FBOW9DUkEsS0FBT0EsZ0JBQWdCQSxHQUFZQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNsREEsS0FBT0EscUJBQXFCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQVU1Q0EsS0FBUUEsU0FBU0EsR0FBWUEsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDNUNBLEtBQVFBLGNBQWNBLEdBQVdBLElBQUlBLENBQUNBO1FBRXRDQSxLQUFRQSxzQkFBc0JBLEdBQVlBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO1FBQ3pEQSxLQUFRQSwyQkFBMkJBLEdBQVdBLElBQUlBLENBQUNBO1FBQ25EQSxLQUFRQSxjQUFjQSxHQUFZQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqREEsS0FBUUEsbUJBQW1CQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUMzQ0EsS0FBUUEsbUJBQW1CQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUMzQ0Es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Q0FBQ0EsQ0FBQ0E7WUFDbEJBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBO1lBQ2xCQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtZQUNYQSxLQUFLQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtTQUNqQkE7O1FBRURBLEtBQUtBLEdBQUdBLEtBQUtBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBOztRQUVqQ0EsR0FBR0EsR0FBR0EsYUFBYUEsQ0FBQ0Esa0JBQWtCQTs7UUFFdENBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBO1FBQ2hCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNoQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDaEJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBOztRQUVWQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNoQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDaEJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBO1FBQ2hCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTs7UUFFVkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDaEJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBO1FBQ2hCQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7O1FBRVhBLElBQUlBLENBQUNBLEdBQVlBLElBQUlBLFFBQVFBLENB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Q0EsRUFBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsRUFBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7Z0JBQzdEQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDZkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2ZBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBOztnQkFFZkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQTthQUN6QkE7O1lBRURBLEdBQUdBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBOztZQUVqQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7Z0JBQ3JGQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDdkJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBO2dCQUN2QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7O2dCQUV2QkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQTthQUN6QkE7O1lBRURBLEdBQUdBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBOztZQUVqQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7Z0JBQy9FQSxJQUFJQSxDQUFD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QSxDQUFDQSxFQUFFQTtRQUNyQkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUE7UUFDckJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBOztRQUVyQkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUE7UUFDN0JBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBO1FBQzdCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQTs7UUFFN0JBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBO1FBQzNCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQTtRQUMzQkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUE7O1FBRTNCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBOztRQUVuREEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBRUE7WUFDckJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFDM0hBLElBQUlBLElBQUlBLENBQUNBLGFBQWFBLElBQUlBLGFB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QSxNQUFPQSxDQUFBQTs7UUFFUkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUE7O1FBRTFCQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBOztRQUV6QkEsSUFBSUEsSUFBSUEsQ0FBQ0Esd0JBQXdCQTtZQUNoQ0EsSUFBSUEsQ0FBQ0EscUJBQXFCQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUMvQkEsQ0FBQ0E7O0lBS0R2RDs7TUFER0E7OENBQ0hBO1FBRUN3RCxJQUFJQSxJQUFJQSxDQUFDQSxXQUFXQTtZQUNuQkEsTUFBT0EsQ0FBQUE7O1FBRVJBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLElBQUlBOztRQUV2QkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQTs7UUFFekJBLElBQUlBLElBQUlBLENBQUNBLHFCQUFxQkE7WUFDN0JBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDNUJBLENBQUNBO0lBQ0Z4RCxxQkFBQ0E7QUFBREEsQ0FBQ0EsRUEvcUUyQixjQUFjLEVBK3FFekM7O0FBRUQsOEJBQXVCLENBQUEiLCJmaWxlIjoiY29yZS9iYXNlL0Rpc3BsYXlPYmplY3QuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXhpc0FsaWduZWRCb3VuZGluZ0JveFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2JvdW5kcy9BeGlzQWxpZ25lZEJvdW5kaW5nQm94XCIpO1xuaW1wb3J0IEJvdW5kaW5nVm9sdW1lQmFzZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvYm91bmRzL0JvdW5kaW5nVm9sdW1lQmFzZVwiKTtcbmltcG9ydCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyXCIpO1xuaW1wb3J0IFNjZW5lXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb250YWluZXJzL1NjZW5lXCIpO1xuaW1wb3J0IENvbnRyb2xsZXJCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvbnRyb2xsZXJzL0NvbnRyb2xsZXJCYXNlXCIpO1xuaW1wb3J0IEFsaWdubWVudE1vZGVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0FsaWdubWVudE1vZGVcIik7XG5pbXBvcnQgQmxlbmRNb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0JsZW5kTW9kZVwiKTtcbmltcG9ydCBMb2FkZXJJbmZvXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0xvYWRlckluZm9cIik7XG5pbXBvcnQgT3JpZW50YXRpb25Nb2RlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9PcmllbnRhdGlvbk1vZGVcIik7XG5pbXBvcnQgSUJpdG1hcERyYXdhYmxlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9JQml0bWFwRHJhd2FibGVcIik7XG5pbXBvcnQgTWF0aENvbnN0c1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9NYXRoQ29uc3RzXCIpO1xuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgTWF0cml4M0RVdGlsc1x0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vTWF0cml4M0RVdGlsc1wiKTtcbmltcG9ydCBQb2ludFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL1BvaW50XCIpO1xuaW1wb3J0IFJlY3RhbmdsZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9SZWN0YW5nbGVcIik7XG5pbXBvcnQgVHJhbnNmb3JtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL1RyYW5zZm9ybVwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IEVudGl0eU5vZGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xuaW1wb3J0IFBhcnRpdGlvblx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcGFydGl0aW9uL1BhcnRpdGlvblwiKTtcbmltcG9ydCBJUGlja2luZ0NvbGxpZGVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcGljay9JUGlja2luZ0NvbGxpZGVyXCIpO1xuaW1wb3J0IFBpY2tpbmdDb2xsaXNpb25WT1x0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9waWNrL1BpY2tpbmdDb2xsaXNpb25WT1wiKTtcbmltcG9ydCBJUmVuZGVyYWJsZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcG9vbC9JUmVuZGVyYWJsZVwiKTtcbmltcG9ydCBOYW1lZEFzc2V0QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvTmFtZWRBc3NldEJhc2VcIik7XG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XG5pbXBvcnQgRGlzcGxheU9iamVjdEV2ZW50XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRGlzcGxheU9iamVjdEV2ZW50XCIpO1xuaW1wb3J0IFNjZW5lRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvU2NlbmVFdmVudFwiKTtcbmltcG9ydCBQcmVmYWJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcHJlZmFicy9QcmVmYWJCYXNlXCIpO1xuXG4vKipcbiAqIFRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgb2JqZWN0cyB0aGF0IGNhbiBiZVxuICogcGxhY2VkIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFRoZSBkaXNwbGF5IGxpc3QgbWFuYWdlcyBhbGwgb2JqZWN0cyBkaXNwbGF5ZWRcbiAqIGluIGZsYXNoLiBVc2UgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgdG8gYXJyYW5nZSB0aGVcbiAqIGRpc3BsYXkgb2JqZWN0cyBpbiB0aGUgZGlzcGxheSBsaXN0LiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdHMgY2FuXG4gKiBoYXZlIGNoaWxkIGRpc3BsYXkgb2JqZWN0cywgd2hpbGUgb3RoZXIgZGlzcGxheSBvYmplY3RzLCBzdWNoIGFzIFNoYXBlIGFuZFxuICogVGV4dEZpZWxkIG9iamVjdHMsIGFyZSBcImxlYWZcIiBub2RlcyB0aGF0IGhhdmUgb25seSBwYXJlbnRzIGFuZCBzaWJsaW5ncywgbm9cbiAqIGNoaWxkcmVuLlxuICpcbiAqIDxwPlRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIHN1cHBvcnRzIGJhc2ljIGZ1bmN0aW9uYWxpdHkgbGlrZSB0aGUgPGk+eDwvaT5cbiAqIGFuZCA8aT55PC9pPiBwb3NpdGlvbiBvZiBhbiBvYmplY3QsIGFzIHdlbGwgYXMgbW9yZSBhZHZhbmNlZCBwcm9wZXJ0aWVzIG9mXG4gKiB0aGUgb2JqZWN0IHN1Y2ggYXMgaXRzIHRyYW5zZm9ybWF0aW9uIG1hdHJpeC4gPC9wPlxuICpcbiAqIDxwPkRpc3BsYXlPYmplY3QgaXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzczsgdGhlcmVmb3JlLCB5b3UgY2Fubm90IGNhbGxcbiAqIERpc3BsYXlPYmplY3QgZGlyZWN0bHkuIEludm9raW5nIDxjb2RlPm5ldyBEaXNwbGF5T2JqZWN0KCk8L2NvZGU+IHRocm93cyBhblxuICogPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT4gZXhjZXB0aW9uLiA8L3A+XG4gKlxuICogPHA+QWxsIGRpc3BsYXkgb2JqZWN0cyBpbmhlcml0IGZyb20gdGhlIERpc3BsYXlPYmplY3QgY2xhc3MuPC9wPlxuICpcbiAqIDxwPlRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGl0c2VsZiBkb2VzIG5vdCBpbmNsdWRlIGFueSBBUElzIGZvciByZW5kZXJpbmdcbiAqIGNvbnRlbnQgb25zY3JlZW4uIEZvciB0aGF0IHJlYXNvbiwgaWYgeW91IHdhbnQgY3JlYXRlIGEgY3VzdG9tIHN1YmNsYXNzIG9mXG4gKiB0aGUgRGlzcGxheU9iamVjdCBjbGFzcywgeW91IHdpbGwgd2FudCB0byBleHRlbmQgb25lIG9mIGl0cyBzdWJjbGFzc2VzIHRoYXRcbiAqIGRvIGhhdmUgQVBJcyBmb3IgcmVuZGVyaW5nIGNvbnRlbnQgb25zY3JlZW4sIHN1Y2ggYXMgdGhlIFNoYXBlLCBTcHJpdGUsXG4gKiBCaXRtYXAsIFNpbXBsZUJ1dHRvbiwgVGV4dEZpZWxkLCBvciBNb3ZpZUNsaXAgY2xhc3MuPC9wPlxuICpcbiAqIDxwPlRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGNvbnRhaW5zIHNldmVyYWwgYnJvYWRjYXN0IGV2ZW50cy4gTm9ybWFsbHksIHRoZVxuICogdGFyZ2V0IG9mIGFueSBwYXJ0aWN1bGFyIGV2ZW50IGlzIGEgc3BlY2lmaWMgRGlzcGxheU9iamVjdCBpbnN0YW5jZS4gRm9yXG4gKiBleGFtcGxlLCB0aGUgdGFyZ2V0IG9mIGFuIDxjb2RlPmFkZGVkPC9jb2RlPiBldmVudCBpcyB0aGUgc3BlY2lmaWNcbiAqIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdGhhdCB3YXMgYWRkZWQgdG8gdGhlIGRpc3BsYXkgbGlzdC4gSGF2aW5nIGEgc2luZ2xlXG4gKiB0YXJnZXQgcmVzdHJpY3RzIHRoZSBwbGFjZW1lbnQgb2YgZXZlbnQgbGlzdGVuZXJzIHRvIHRoYXQgdGFyZ2V0IGFuZCBpblxuICogc29tZSBjYXNlcyB0aGUgdGFyZ2V0J3MgYW5jZXN0b3JzIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFdpdGggYnJvYWRjYXN0XG4gKiBldmVudHMsIGhvd2V2ZXIsIHRoZSB0YXJnZXQgaXMgbm90IGEgc3BlY2lmaWMgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgYnV0XG4gKiByYXRoZXIgYWxsIERpc3BsYXlPYmplY3QgaW5zdGFuY2VzLCBpbmNsdWRpbmcgdGhvc2UgdGhhdCBhcmUgbm90IG9uIHRoZVxuICogZGlzcGxheSBsaXN0LiBUaGlzIG1lYW5zIHRoYXQgeW91IGNhbiBhZGQgYSBsaXN0ZW5lciB0byBhbnkgRGlzcGxheU9iamVjdFxuICogaW5zdGFuY2UgdG8gbGlzdGVuIGZvciBicm9hZGNhc3QgZXZlbnRzLiBJbiBhZGRpdGlvbiB0byB0aGUgYnJvYWRjYXN0XG4gKiBldmVudHMgbGlzdGVkIGluIHRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzJ3MgRXZlbnRzIHRhYmxlLCB0aGUgRGlzcGxheU9iamVjdFxuICogY2xhc3MgYWxzbyBpbmhlcml0cyB0d28gYnJvYWRjYXN0IGV2ZW50cyBmcm9tIHRoZSBFdmVudERpc3BhdGNoZXIgY2xhc3M6XG4gKiA8Y29kZT5hY3RpdmF0ZTwvY29kZT4gYW5kIDxjb2RlPmRlYWN0aXZhdGU8L2NvZGU+LjwvcD5cbiAqXG4gKiA8cD5Tb21lIHByb3BlcnRpZXMgcHJldmlvdXNseSB1c2VkIGluIHRoZSBBY3Rpb25TY3JpcHQgMS4wIGFuZCAyLjBcbiAqIE1vdmllQ2xpcCwgVGV4dEZpZWxkLCBhbmQgQnV0dG9uIGNsYXNzZXMoc3VjaCBhcyA8Y29kZT5fYWxwaGE8L2NvZGU+LFxuICogPGNvZGU+X2hlaWdodDwvY29kZT4sIDxjb2RlPl9uYW1lPC9jb2RlPiwgPGNvZGU+X3dpZHRoPC9jb2RlPixcbiAqIDxjb2RlPl94PC9jb2RlPiwgPGNvZGU+X3k8L2NvZGU+LCBhbmQgb3RoZXJzKSBoYXZlIGVxdWl2YWxlbnRzIGluIHRoZVxuICogQWN0aW9uU2NyaXB0IDMuMCBEaXNwbGF5T2JqZWN0IGNsYXNzIHRoYXQgYXJlIHJlbmFtZWQgc28gdGhhdCB0aGV5IG5vXG4gKiBsb25nZXIgYmVnaW4gd2l0aCB0aGUgdW5kZXJzY29yZShfKSBjaGFyYWN0ZXIuPC9wPlxuICpcbiAqIDxwPkZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgdGhlIFwiRGlzcGxheSBQcm9ncmFtbWluZ1wiIGNoYXB0ZXIgb2YgdGhlXG4gKiA8aT5BY3Rpb25TY3JpcHQgMy4wIERldmVsb3BlcidzIEd1aWRlPC9pPi48L3A+XG4gKiBcbiAqIEBldmVudCBhZGRlZCAgICAgICAgICAgIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSBsaXN0LiBUaGUgZm9sbG93aW5nIG1ldGhvZHMgdHJpZ2dlciB0aGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGQoKTwvY29kZT4sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkQXQoKTwvY29kZT4uXG4gKiBAZXZlbnQgYWRkZWRUb1N0YWdlICAgICBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhZGRlZCB0byB0aGUgb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWdlIGRpc3BsYXkgbGlzdCwgZWl0aGVyIGRpcmVjdGx5IG9yIHRocm91Z2ggdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbiBvZiBhIHN1YiB0cmVlIGluIHdoaWNoIHRoZSBkaXNwbGF5IG9iamVjdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgaXMgY29udGFpbmVkLiBUaGUgZm9sbG93aW5nIG1ldGhvZHMgdHJpZ2dlciB0aGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGQoKTwvY29kZT4sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkQXQoKTwvY29kZT4uXG4gKiBAZXZlbnQgZW50ZXJGcmFtZSAgICAgICBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIHdoZW4gdGhlIHBsYXloZWFkIGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBlbnRlcmluZyBhIG5ldyBmcmFtZS4gSWYgdGhlIHBsYXloZWFkIGlzIG5vdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgbW92aW5nLCBvciBpZiB0aGVyZSBpcyBvbmx5IG9uZSBmcmFtZSwgdGhpcyBldmVudFxuICogICAgICAgICAgICAgICAgICAgICAgICAgaXMgZGlzcGF0Y2hlZCBjb250aW51b3VzbHkgaW4gY29uanVuY3Rpb24gd2l0aCB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lIHJhdGUuIFRoaXMgZXZlbnQgaXMgYSBicm9hZGNhc3QgZXZlbnQsIHdoaWNoXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBtZWFucyB0aGF0IGl0IGlzIGRpc3BhdGNoZWQgYnkgYWxsIGRpc3BsYXkgb2JqZWN0c1xuICogICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBhIGxpc3RlbmVyIHJlZ2lzdGVyZWQgZm9yIHRoaXMgZXZlbnQuXG4gKiBAZXZlbnQgZXhpdEZyYW1lICAgICAgICBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIHdoZW4gdGhlIHBsYXloZWFkIGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBleGl0aW5nIHRoZSBjdXJyZW50IGZyYW1lLiBBbGwgZnJhbWUgc2NyaXB0cyBoYXZlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBiZWVuIHJ1bi4gSWYgdGhlIHBsYXloZWFkIGlzIG5vdCBtb3ZpbmcsIG9yIGlmXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGVyZSBpcyBvbmx5IG9uZSBmcmFtZSwgdGhpcyBldmVudCBpcyBkaXNwYXRjaGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51b3VzbHkgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgZnJhbWUgcmF0ZS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXMgZXZlbnQgaXMgYSBicm9hZGNhc3QgZXZlbnQsIHdoaWNoIG1lYW5zIHRoYXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGl0IGlzIGRpc3BhdGNoZWQgYnkgYWxsIGRpc3BsYXkgb2JqZWN0cyB3aXRoIGFcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyIHJlZ2lzdGVyZWQgZm9yIHRoaXMgZXZlbnQuXG4gKiBAZXZlbnQgZnJhbWVDb25zdHJ1Y3RlZCBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIGFmdGVyIHRoZSBjb25zdHJ1Y3RvcnNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG9mIGZyYW1lIGRpc3BsYXkgb2JqZWN0cyBoYXZlIHJ1biBidXQgYmVmb3JlIGZyYW1lXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHRzIGhhdmUgcnVuLiBJZiB0aGUgcGxheWhlYWQgaXMgbm90IG1vdmluZywgb3JcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHRoZXJlIGlzIG9ubHkgb25lIGZyYW1lLCB0aGlzIGV2ZW50IGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaGVkIGNvbnRpbnVvdXNseSBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWUgcmF0ZS4gVGhpcyBldmVudCBpcyBhIGJyb2FkY2FzdCBldmVudCwgd2hpY2hcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5zIHRoYXQgaXQgaXMgZGlzcGF0Y2hlZCBieSBhbGwgZGlzcGxheSBvYmplY3RzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIGEgbGlzdGVuZXIgcmVnaXN0ZXJlZCBmb3IgdGhpcyBldmVudC5cbiAqIEBldmVudCByZW1vdmVkICAgICAgICAgIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFib3V0IHRvIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGRpc3BsYXkgbGlzdC4gVHdvIG1ldGhvZHMgb2YgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIGdlbmVyYXRlIHRoaXMgZXZlbnQ6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5yZW1vdmVDaGlsZCgpPC9jb2RlPiBhbmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkQXQoKTwvY29kZT4uXG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgPHA+VGhlIGZvbGxvd2luZyBtZXRob2RzIG9mIGFcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IGFsc28gZ2VuZXJhdGUgdGhpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgaWYgYW4gb2JqZWN0IG11c3QgYmUgcmVtb3ZlZCB0byBtYWtlIHJvb20gZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgbmV3IG9iamVjdDogPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5hZGRDaGlsZEF0KCk8L2NvZGU+LCBhbmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnNldENoaWxkSW5kZXgoKTwvY29kZT4uIDwvcD5cbiAqIEBldmVudCByZW1vdmVkRnJvbVN0YWdlIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFib3V0IHRvIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGRpc3BsYXkgbGlzdCwgZWl0aGVyIGRpcmVjdGx5IG9yXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdWdoIHRoZSByZW1vdmFsIG9mIGEgc3ViIHRyZWUgaW4gd2hpY2ggdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5IG9iamVjdCBpcyBjb250YWluZWQuIFR3byBtZXRob2RzIG9mIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBjbGFzcyBnZW5lcmF0ZSB0aGlzIGV2ZW50OlxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGQoKTwvY29kZT4gYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5yZW1vdmVDaGlsZEF0KCk8L2NvZGU+LlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlRoZSBmb2xsb3dpbmcgbWV0aG9kcyBvZiBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdCBhbHNvIGdlbmVyYXRlIHRoaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IGlmIGFuIG9iamVjdCBtdXN0IGJlIHJlbW92ZWQgdG8gbWFrZSByb29tIGZvclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG5ldyBvYmplY3Q6IDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+LFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+YWRkQ2hpbGRBdCgpPC9jb2RlPiwgYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5zZXRDaGlsZEluZGV4KCk8L2NvZGU+LiA8L3A+XG4gKiBAZXZlbnQgcmVuZGVyICAgICAgICAgICBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIHdoZW4gdGhlIGRpc3BsYXkgbGlzdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgaXMgYWJvdXQgdG8gYmUgdXBkYXRlZCBhbmQgcmVuZGVyZWQuIFRoaXMgZXZlbnRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVzIHRoZSBsYXN0IG9wcG9ydHVuaXR5IGZvciBvYmplY3RzIGxpc3RlbmluZ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoaXMgZXZlbnQgdG8gbWFrZSBjaGFuZ2VzIGJlZm9yZSB0aGUgZGlzcGxheVxuICogICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCBpcyByZW5kZXJlZC4gWW91IG11c3QgY2FsbCB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmludmFsaWRhdGUoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBTdGFnZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IGVhY2ggdGltZSB5b3Ugd2FudCBhIDxjb2RlPnJlbmRlcjwvY29kZT5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IHRvIGJlIGRpc3BhdGNoZWQuIDxjb2RlPlJlbmRlcjwvY29kZT4gZXZlbnRzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBhcmUgZGlzcGF0Y2hlZCB0byBhbiBvYmplY3Qgb25seSBpZiB0aGVyZSBpcyBtdXR1YWxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRydXN0IGJldHdlZW4gaXQgYW5kIHRoZSBvYmplY3QgdGhhdCBjYWxsZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlN0YWdlLmludmFsaWRhdGUoKTwvY29kZT4uIFRoaXMgZXZlbnQgaXMgYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgYnJvYWRjYXN0IGV2ZW50LCB3aGljaCBtZWFucyB0aGF0IGl0IGlzIGRpc3BhdGNoZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGJ5IGFsbCBkaXNwbGF5IG9iamVjdHMgd2l0aCBhIGxpc3RlbmVyIHJlZ2lzdGVyZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB0aGlzIGV2ZW50LlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxiPk5vdGU6IDwvYj5UaGlzIGV2ZW50IGlzIG5vdCBkaXNwYXRjaGVkIGlmIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSBpcyBub3QgcmVuZGVyaW5nLiBUaGlzIGlzIHRoZSBjYXNlIHdoZW4gdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50IGlzIGVpdGhlciBtaW5pbWl6ZWQgb3Igb2JzY3VyZWQuIDwvcD5cbiAqL1xuY2xhc3MgRGlzcGxheU9iamVjdCBleHRlbmRzIE5hbWVkQXNzZXRCYXNlIGltcGxlbWVudHMgSUJpdG1hcERyYXdhYmxlXG57XG5cdHByaXZhdGUgX2xvYWRlckluZm86TG9hZGVySW5mbztcblx0cHJpdmF0ZSBfbW91c2VYOm51bWJlcjtcblx0cHJpdmF0ZSBfbW91c2VZOm51bWJlcjtcblx0cHJpdmF0ZSBfcm9vdDpEaXNwbGF5T2JqZWN0Q29udGFpbmVyO1xuXHRwcml2YXRlIF9ib3VuZHM6UmVjdGFuZ2xlO1xuXHRwcml2YXRlIF9ib3VuZHNWaXNpYmxlOmJvb2xlYW47XG5cdHByaXZhdGUgX2RlcHRoOm51bWJlcjtcblx0cHJpdmF0ZSBfaGVpZ2h0Om51bWJlcjtcblx0cHJpdmF0ZSBfd2lkdGg6bnVtYmVyO1xuXG5cdHB1YmxpYyBfcFNjZW5lOlNjZW5lO1xuXHRwdWJsaWMgX3BQYXJlbnQ6RGlzcGxheU9iamVjdENvbnRhaW5lcjtcblx0cHVibGljIF9wU2NlbmVUcmFuc2Zvcm06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0cHVibGljIF9wU2NlbmVUcmFuc2Zvcm1EaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHVibGljIF9wSXNFbnRpdHk6Ym9vbGVhbjtcblxuXHRwcml2YXRlIF9leHBsaWNpdFBhcnRpdGlvbjpQYXJ0aXRpb247XG5cdHB1YmxpYyBfcEltcGxpY2l0UGFydGl0aW9uOlBhcnRpdGlvbjtcblx0cHJpdmF0ZSBfcGFydGl0aW9uTm9kZTpFbnRpdHlOb2RlO1xuXG5cdHByaXZhdGUgX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cdHByaXZhdGUgX3NjZW5lY2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cdHByaXZhdGUgX3RyYW5zZm9ybTpUcmFuc2Zvcm07XG5cdHByaXZhdGUgX21hdHJpeDNEOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cdHByaXZhdGUgX21hdHJpeDNERGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cblx0cHJpdmF0ZSBfaW52ZXJzZVNjZW5lVHJhbnNmb3JtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cdHByaXZhdGUgX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9zY2VuZVBvc2l0aW9uOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX3NjZW5lUG9zaXRpb25EaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfZXhwbGljaXRWaXNpYmlsaXR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwdWJsaWMgX3BJbXBsaWNpdFZpc2liaWxpdHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2V4cGxpY2l0TW91c2VFbmFibGVkOmJvb2xlYW4gPSB0cnVlO1xuXHRwdWJsaWMgX3BJbXBsaWNpdE1vdXNlRW5hYmxlZDpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfbGlzdGVuVG9TY2VuZVRyYW5zZm9ybUNoYW5nZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfbGlzdGVuVG9TY2VuZUNoYW5nZWQ6Ym9vbGVhbjtcblxuXHRwcml2YXRlIF9wb3NpdGlvbkRpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9yb3RhdGlvbkRpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9zY2FsZURpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXG5cdHByaXZhdGUgX3Bvc2l0aW9uQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cdHByaXZhdGUgX3JvdGF0aW9uQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cdHByaXZhdGUgX3NjYWxlQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cblx0cHJpdmF0ZSBfcm90YXRpb25YOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX3JvdGF0aW9uWTpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9yb3RhdGlvblo6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfZXVsZXJzOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX2ZsaXBZOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cblx0cHJpdmF0ZSBfbGlzdGVuVG9Qb3NpdGlvbkNoYW5nZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfbGlzdGVuVG9Sb3RhdGlvbkNoYW5nZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfbGlzdGVuVG9TY2FsZUNoYW5nZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfek9mZnNldDpudW1iZXIgPSAwO1xuXG5cdHB1YmxpYyBfcFNjYWxlWDpudW1iZXIgPSAxO1xuXHRwdWJsaWMgX3BTY2FsZVk6bnVtYmVyID0gMTtcblx0cHVibGljIF9wU2NhbGVaOm51bWJlciA9IDE7XG5cdHByaXZhdGUgX3g6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfeTpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF96Om51bWJlciA9IDA7XG5cdHByaXZhdGUgX3Bpdm90OlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX29yaWVudGF0aW9uTWF0cml4Ok1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cdHByaXZhdGUgX3Bpdm90WmVybzpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfcGl2b3REaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfcG9zOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX3JvdDpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXHRwcml2YXRlIF9zY2E6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblx0cHJpdmF0ZSBfdHJhbnNmb3JtQ29tcG9uZW50czpBcnJheTxWZWN0b3IzRD47XG5cblx0cHVibGljIF9wSWdub3JlVHJhbnNmb3JtOmJvb2xlYW4gPSBmYWxzZTtcblxuXHRwcml2YXRlIF9zaGFkZXJQaWNraW5nRGV0YWlsczpib29sZWFuO1xuXG5cdHB1YmxpYyBfcFBpY2tpbmdDb2xsaXNpb25WTzpQaWNraW5nQ29sbGlzaW9uVk87XG5cblx0cHVibGljIF9wQm91bmRzOkJvdW5kaW5nVm9sdW1lQmFzZTtcblx0cHVibGljIF9wQm91bmRzSW52YWxpZDpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfd29ybGRCb3VuZHM6Qm91bmRpbmdWb2x1bWVCYXNlO1xuXHRwcml2YXRlIF93b3JsZEJvdW5kc0ludmFsaWQ6Ym9vbGVhbiA9IHRydWU7XG5cblx0cHVibGljIF9wUGlja2luZ0NvbGxpZGVyOklQaWNraW5nQ29sbGlkZXI7XG5cblx0cHVibGljIF9wUmVuZGVyYWJsZXM6QXJyYXk8SVJlbmRlcmFibGU+ID0gbmV3IEFycmF5PElSZW5kZXJhYmxlPigpO1xuXG5cdHB1YmxpYyBfaVNvdXJjZVByZWZhYjpQcmVmYWJCYXNlO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGFsaWdubWVudE1vZGU6c3RyaW5nID0gQWxpZ25tZW50TW9kZS5SRUdJU1RSQVRJT05fUE9JTlQ7XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgYWxwaGEgdHJhbnNwYXJlbmN5IHZhbHVlIG9mIHRoZSBvYmplY3Qgc3BlY2lmaWVkLiBWYWxpZFxuXHQgKiB2YWx1ZXMgYXJlIDAoZnVsbHkgdHJhbnNwYXJlbnQpIHRvIDEoZnVsbHkgb3BhcXVlKS4gVGhlIGRlZmF1bHQgdmFsdWUgaXNcblx0ICogMS4gRGlzcGxheSBvYmplY3RzIHdpdGggPGNvZGU+YWxwaGE8L2NvZGU+IHNldCB0byAwIDxpPmFyZTwvaT4gYWN0aXZlLFxuXHQgKiBldmVuIHRob3VnaCB0aGV5IGFyZSBpbnZpc2libGUuXG5cdCAqL1xuXHRwdWJsaWMgYWxwaGE6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBBIHZhbHVlIGZyb20gdGhlIEJsZW5kTW9kZSBjbGFzcyB0aGF0IHNwZWNpZmllcyB3aGljaCBibGVuZCBtb2RlIHRvIHVzZS4gQVxuXHQgKiBiaXRtYXAgY2FuIGJlIGRyYXduIGludGVybmFsbHkgaW4gdHdvIHdheXMuIElmIHlvdSBoYXZlIGEgYmxlbmQgbW9kZVxuXHQgKiBlbmFibGVkIG9yIGFuIGV4dGVybmFsIGNsaXBwaW5nIG1hc2ssIHRoZSBiaXRtYXAgaXMgZHJhd24gYnkgYWRkaW5nIGFcblx0ICogYml0bWFwLWZpbGxlZCBzcXVhcmUgc2hhcGUgdG8gdGhlIHZlY3RvciByZW5kZXIuIElmIHlvdSBhdHRlbXB0IHRvIHNldFxuXHQgKiB0aGlzIHByb3BlcnR5IHRvIGFuIGludmFsaWQgdmFsdWUsIEZsYXNoIHJ1bnRpbWVzIHNldCB0aGUgdmFsdWUgdG9cblx0ICogPGNvZGU+QmxlbmRNb2RlLk5PUk1BTDwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPlRoZSA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IGFmZmVjdHMgZWFjaCBwaXhlbCBvZiB0aGUgZGlzcGxheVxuXHQgKiBvYmplY3QuIEVhY2ggcGl4ZWwgaXMgY29tcG9zZWQgb2YgdGhyZWUgY29uc3RpdHVlbnQgY29sb3JzKHJlZCwgZ3JlZW4sXG5cdCAqIGFuZCBibHVlKSwgYW5kIGVhY2ggY29uc3RpdHVlbnQgY29sb3IgaGFzIGEgdmFsdWUgYmV0d2VlbiAweDAwIGFuZCAweEZGLlxuXHQgKiBGbGFzaCBQbGF5ZXIgb3IgQWRvYmUgQUlSIGNvbXBhcmVzIGVhY2ggY29uc3RpdHVlbnQgY29sb3Igb2Ygb25lIHBpeGVsIGluXG5cdCAqIHRoZSBtb3ZpZSBjbGlwIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgY29sb3Igb2YgdGhlIHBpeGVsIGluIHRoZVxuXHQgKiBiYWNrZ3JvdW5kLiBGb3IgZXhhbXBsZSwgaWYgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiBpcyBzZXQgdG9cblx0ICogPGNvZGU+QmxlbmRNb2RlLkxJR0hURU48L2NvZGU+LCBGbGFzaCBQbGF5ZXIgb3IgQWRvYmUgQUlSIGNvbXBhcmVzIHRoZSByZWRcblx0ICogdmFsdWUgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHdpdGggdGhlIHJlZCB2YWx1ZSBvZiB0aGUgYmFja2dyb3VuZCwgYW5kIHVzZXNcblx0ICogdGhlIGxpZ2h0ZXIgb2YgdGhlIHR3byBhcyB0aGUgdmFsdWUgZm9yIHRoZSByZWQgY29tcG9uZW50IG9mIHRoZSBkaXNwbGF5ZWRcblx0ICogY29sb3IuPC9wPlxuXHQgKlxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIHRhYmxlIGRlc2NyaWJlcyB0aGUgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiBzZXR0aW5ncy4gVGhlXG5cdCAqIEJsZW5kTW9kZSBjbGFzcyBkZWZpbmVzIHN0cmluZyB2YWx1ZXMgeW91IGNhbiB1c2UuIFRoZSBpbGx1c3RyYXRpb25zIGluXG5cdCAqIHRoZSB0YWJsZSBzaG93IDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gdmFsdWVzIGFwcGxpZWQgdG8gYSBjaXJjdWxhciBkaXNwbGF5XG5cdCAqIG9iamVjdCgyKSBzdXBlcmltcG9zZWQgb24gYW5vdGhlciBkaXNwbGF5IG9iamVjdCgxKS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgYmxlbmRNb2RlOkJsZW5kTW9kZTtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYm91bmRzKCk6Qm91bmRpbmdWb2x1bWVCYXNlXG5cdHtcblx0XHRpZiAodGhpcy5fcEJvdW5kc0ludmFsaWQpXG5cdFx0XHR0aGlzLnBVcGRhdGVCb3VuZHMoKTtcblxuXHRcdHJldHVybiB0aGlzLl9wQm91bmRzO1xuXHR9XG5cblx0cHVibGljIHNldCBib3VuZHModmFsdWU6Qm91bmRpbmdWb2x1bWVCYXNlKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BCb3VuZHMgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wQm91bmRzID0gdmFsdWU7XG5cblx0XHR0aGlzLl93b3JsZEJvdW5kcyA9IHZhbHVlLmNsb25lKCk7XG5cblx0XHR0aGlzLnBJbnZhbGlkYXRlQm91bmRzKCk7XG5cblx0XHRpZiAodGhpcy5fYm91bmRzVmlzaWJsZSlcblx0XHRcdHRoaXMuX3BhcnRpdGlvbk5vZGUuX2lVcGRhdGVFbnRpdHlCb3VuZHMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJZiBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIE5NRSB3aWxsIHVzZSB0aGUgc29mdHdhcmUgcmVuZGVyZXIgdG8gY2FjaGVcblx0ICogYW4gaW50ZXJuYWwgYml0bWFwIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gRm9yIG5hdGl2ZSB0YXJnZXRzLFxuXHQgKiB0aGlzIGlzIG9mdGVuIG11Y2ggc2xvd2VyIHRoYW4gdGhlIGRlZmF1bHQgaGFyZHdhcmUgcmVuZGVyZXIuIFdoZW4geW91XG5cdCAqIGFyZSB1c2luZyB0aGUgRmxhc2ggdGFyZ2V0LCB0aGlzIGNhY2hpbmcgbWF5IGluY3JlYXNlIHBlcmZvcm1hbmNlIGZvciBkaXNwbGF5XG5cdCAqIG9iamVjdHMgdGhhdCBjb250YWluIGNvbXBsZXggdmVjdG9yIGNvbnRlbnQuXG5cdCAqXG5cdCAqIDxwPkFsbCB2ZWN0b3IgZGF0YSBmb3IgYSBkaXNwbGF5IG9iamVjdCB0aGF0IGhhcyBhIGNhY2hlZCBiaXRtYXAgaXMgZHJhd25cblx0ICogdG8gdGhlIGJpdG1hcCBpbnN0ZWFkIG9mIHRoZSBtYWluIGRpc3BsYXkuIElmXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXBNYXRyaXg8L2NvZGU+IGlzIG51bGwgb3IgdW5zdXBwb3J0ZWQsIHRoZSBiaXRtYXAgaXNcblx0ICogdGhlbiBjb3BpZWQgdG8gdGhlIG1haW4gZGlzcGxheSBhcyB1bnN0cmV0Y2hlZCwgdW5yb3RhdGVkIHBpeGVscyBzbmFwcGVkXG5cdCAqIHRvIHRoZSBuZWFyZXN0IHBpeGVsIGJvdW5kYXJpZXMuIFBpeGVscyBhcmUgbWFwcGVkIDEgdG8gMSB3aXRoIHRoZSBwYXJlbnRcblx0ICogb2JqZWN0LiBJZiB0aGUgYm91bmRzIG9mIHRoZSBiaXRtYXAgY2hhbmdlLCB0aGUgYml0bWFwIGlzIHJlY3JlYXRlZFxuXHQgKiBpbnN0ZWFkIG9mIGJlaW5nIHN0cmV0Y2hlZC48L3A+XG5cdCAqXG5cdCAqIDxwPklmIDxjb2RlPmNhY2hlQXNCaXRtYXBNYXRyaXg8L2NvZGU+IGlzIG5vbi1udWxsIGFuZCBzdXBwb3J0ZWQsIHRoZVxuXHQgKiBvYmplY3QgaXMgZHJhd24gdG8gdGhlIG9mZi1zY3JlZW4gYml0bWFwIHVzaW5nIHRoYXQgbWF0cml4IGFuZCB0aGVcblx0ICogc3RyZXRjaGVkIGFuZC9vciByb3RhdGVkIHJlc3VsdHMgb2YgdGhhdCByZW5kZXJpbmcgYXJlIHVzZWQgdG8gZHJhdyB0aGVcblx0ICogb2JqZWN0IHRvIHRoZSBtYWluIGRpc3BsYXkuPC9wPlxuXHQgKlxuXHQgKiA8cD5ObyBpbnRlcm5hbCBiaXRtYXAgaXMgY3JlYXRlZCB1bmxlc3MgdGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+XG5cdCAqIHByb3BlcnR5IGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPi48L3A+XG5cdCAqXG5cdCAqIDxwPkFmdGVyIHlvdSBzZXQgdGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IHRvXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgcmVuZGVyaW5nIGRvZXMgbm90IGNoYW5nZSwgaG93ZXZlciB0aGUgZGlzcGxheVxuXHQgKiBvYmplY3QgcGVyZm9ybXMgcGl4ZWwgc25hcHBpbmcgYXV0b21hdGljYWxseS4gVGhlIGFuaW1hdGlvbiBzcGVlZCBjYW4gYmVcblx0ICogc2lnbmlmaWNhbnRseSBmYXN0ZXIgZGVwZW5kaW5nIG9uIHRoZSBjb21wbGV4aXR5IG9mIHRoZSB2ZWN0b3IgY29udGVudC5cblx0ICogPC9wPlxuXHQgKlxuXHQgKiA8cD5UaGUgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgaXMgYXV0b21hdGljYWxseSBzZXQgdG9cblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4gd2hlbmV2ZXIgeW91IGFwcGx5IGEgZmlsdGVyIHRvIGEgZGlzcGxheSBvYmplY3Qod2hlblxuXHQgKiBpdHMgPGNvZGU+ZmlsdGVyPC9jb2RlPiBhcnJheSBpcyBub3QgZW1wdHkpLCBhbmQgaWYgYSBkaXNwbGF5IG9iamVjdCBoYXMgYVxuXHQgKiBmaWx0ZXIgYXBwbGllZCB0byBpdCwgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gaXMgcmVwb3J0ZWQgYXNcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4gZm9yIHRoYXQgZGlzcGxheSBvYmplY3QsIGV2ZW4gaWYgeW91IHNldCB0aGUgcHJvcGVydHkgdG9cblx0ICogPGNvZGU+ZmFsc2U8L2NvZGU+LiBJZiB5b3UgY2xlYXIgYWxsIGZpbHRlcnMgZm9yIGEgZGlzcGxheSBvYmplY3QsIHRoZVxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBzZXR0aW5nIGNoYW5nZXMgdG8gd2hhdCBpdCB3YXMgbGFzdCBzZXQgdG8uPC9wPlxuXHQgKlxuXHQgKiA8cD5BIGRpc3BsYXkgb2JqZWN0IGRvZXMgbm90IHVzZSBhIGJpdG1hcCBldmVuIGlmIHRoZVxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4gYW5kXG5cdCAqIGluc3RlYWQgcmVuZGVycyBmcm9tIHZlY3RvciBkYXRhIGluIHRoZSBmb2xsb3dpbmcgY2FzZXM6PC9wPlxuXHQgKlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPlRoZSBiaXRtYXAgaXMgdG9vIGxhcmdlLiBJbiBBSVIgMS41IGFuZCBGbGFzaCBQbGF5ZXIgMTAsIHRoZSBtYXhpbXVtXG5cdCAqIHNpemUgZm9yIGEgYml0bWFwIGltYWdlIGlzIDgsMTkxIHBpeGVscyBpbiB3aWR0aCBvciBoZWlnaHQsIGFuZCB0aGUgdG90YWxcblx0ICogbnVtYmVyIG9mIHBpeGVscyBjYW5ub3QgZXhjZWVkIDE2LDc3NywyMTUgcGl4ZWxzLihTbywgaWYgYSBiaXRtYXAgaW1hZ2Vcblx0ICogaXMgOCwxOTEgcGl4ZWxzIHdpZGUsIGl0IGNhbiBvbmx5IGJlIDIsMDQ4IHBpeGVscyBoaWdoLikgSW4gRmxhc2ggUGxheWVyIDlcblx0ICogYW5kIGVhcmxpZXIsIHRoZSBsaW1pdGF0aW9uIGlzIGlzIDI4ODAgcGl4ZWxzIGluIGhlaWdodCBhbmQgMiw4ODAgcGl4ZWxzXG5cdCAqIGluIHdpZHRoLjwvbGk+XG5cdCAqICAgPGxpPlRoZSBiaXRtYXAgZmFpbHMgdG8gYWxsb2NhdGUob3V0IG9mIG1lbW9yeSBlcnJvcikuIDwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqXG5cdCAqIDxwPlRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSBpcyBiZXN0IHVzZWQgd2l0aCBtb3ZpZSBjbGlwc1xuXHQgKiB0aGF0IGhhdmUgbW9zdGx5IHN0YXRpYyBjb250ZW50IGFuZCB0aGF0IGRvIG5vdCBzY2FsZSBhbmQgcm90YXRlXG5cdCAqIGZyZXF1ZW50bHkuIFdpdGggc3VjaCBtb3ZpZSBjbGlwcywgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gY2FuIGxlYWQgdG9cblx0ICogcGVyZm9ybWFuY2UgaW5jcmVhc2VzIHdoZW4gdGhlIG1vdmllIGNsaXAgaXMgdHJhbnNsYXRlZCh3aGVuIGl0cyA8aT54PC9pPlxuXHQgKiBhbmQgPGk+eTwvaT4gcG9zaXRpb24gaXMgY2hhbmdlZCkuPC9wPlxuXHQgKi9cblx0cHVibGljIGNhY2hlQXNCaXRtYXA6Ym9vbGVhbjtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBjYXN0c1NoYWRvd3M6Ym9vbGVhbiA9IHRydWU7XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgZGVwdGggb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBpbiBwaXhlbHMuIFRoZSBkZXB0aCBpc1xuXHQgKiBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBib3VuZHMgb2YgdGhlIGNvbnRlbnQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBXaGVuXG5cdCAqIHlvdSBzZXQgdGhlIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0eSwgdGhlIDxjb2RlPnNjYWxlWjwvY29kZT4gcHJvcGVydHlcblx0ICogaXMgYWRqdXN0ZWQgYWNjb3JkaW5nbHksIGFzIHNob3duIGluIHRoZSBmb2xsb3dpbmcgY29kZTpcblx0ICpcblx0ICogPHA+RXhjZXB0IGZvciBUZXh0RmllbGQgYW5kIFZpZGVvIG9iamVjdHMsIGEgZGlzcGxheSBvYmplY3Qgd2l0aCBub1xuXHQgKiBjb250ZW50IChzdWNoIGFzIGFuIGVtcHR5IHNwcml0ZSkgaGFzIGEgZGVwdGggb2YgMCwgZXZlbiBpZiB5b3UgdHJ5IHRvXG5cdCAqIHNldCA8Y29kZT5kZXB0aDwvY29kZT4gdG8gYSBkaWZmZXJlbnQgdmFsdWUuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBkZXB0aCgpOm51bWJlclxuXHR7XG5cdFx0aWYgKHRoaXMuX3BCb3VuZHNJbnZhbGlkKVxuXHRcdFx0dGhpcy5wVXBkYXRlQm91bmRzKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fZGVwdGg7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGRlcHRoKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fZGVwdGggPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZGVwdGggPT0gdmFsO1xuXG5cdFx0dGhpcy5fcFNjYWxlWiA9IHZhbC90aGlzLmJvdW5kcy5hYWJiLmRlcHRoO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSByb3RhdGlvbiBvZiB0aGUgM2Qgb2JqZWN0IGFzIGEgPGNvZGU+VmVjdG9yM0Q8L2NvZGU+IG9iamVjdCBjb250YWluaW5nIGV1bGVyIGFuZ2xlcyBmb3Igcm90YXRpb24gYXJvdW5kIHgsIHkgYW5kIHogYXhpcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgZXVsZXJzKCk6VmVjdG9yM0Rcblx0e1xuXHRcdHRoaXMuX2V1bGVycy54ID0gdGhpcy5fcm90YXRpb25YKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xuXHRcdHRoaXMuX2V1bGVycy55ID0gdGhpcy5fcm90YXRpb25ZKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xuXHRcdHRoaXMuX2V1bGVycy56ID0gdGhpcy5fcm90YXRpb25aKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2V1bGVycztcblx0fVxuXG5cdHB1YmxpYyBzZXQgZXVsZXJzKHZhbHVlOlZlY3RvcjNEKVxuXHR7XG5cdFx0dGhpcy5fcm90YXRpb25YID0gdmFsdWUueCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblx0XHR0aGlzLl9yb3RhdGlvblkgPSB2YWx1ZS55Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZhbHVlLnoqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIG9iamVjdCB0aGF0IGNhbiBjb250YWluIGFueSBleHRyYSBkYXRhLlxuXHQgKi9cblx0cHVibGljIGV4dHJhOk9iamVjdDtcblxuXHQvKipcblx0ICogQW4gaW5kZXhlZCBhcnJheSB0aGF0IGNvbnRhaW5zIGVhY2ggZmlsdGVyIG9iamVjdCBjdXJyZW50bHkgYXNzb2NpYXRlZFxuXHQgKiB3aXRoIHRoZSBkaXNwbGF5IG9iamVjdC4gVGhlIGZsYXNoLmZpbHRlcnMgcGFja2FnZSBjb250YWlucyBzZXZlcmFsXG5cdCAqIGNsYXNzZXMgdGhhdCBkZWZpbmUgc3BlY2lmaWMgZmlsdGVycyB5b3UgY2FuIHVzZS5cblx0ICpcblx0ICogPHA+RmlsdGVycyBjYW4gYmUgYXBwbGllZCBpbiBGbGFzaCBQcm9mZXNzaW9uYWwgYXQgZGVzaWduIHRpbWUsIG9yIGF0IHJ1blxuXHQgKiB0aW1lIGJ5IHVzaW5nIEFjdGlvblNjcmlwdCBjb2RlLiBUbyBhcHBseSBhIGZpbHRlciBieSB1c2luZyBBY3Rpb25TY3JpcHQsXG5cdCAqIHlvdSBtdXN0IG1ha2UgYSB0ZW1wb3JhcnkgY29weSBvZiB0aGUgZW50aXJlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5LFxuXHQgKiBtb2RpZnkgdGhlIHRlbXBvcmFyeSBhcnJheSwgdGhlbiBhc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSB0ZW1wb3JhcnkgYXJyYXlcblx0ICogYmFjayB0byB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkuIFlvdSBjYW5ub3QgZGlyZWN0bHkgYWRkIGEgbmV3XG5cdCAqIGZpbHRlciBvYmplY3QgdG8gdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5LjwvcD5cblx0ICpcblx0ICogPHA+VG8gYWRkIGEgZmlsdGVyIGJ5IHVzaW5nIEFjdGlvblNjcmlwdCwgcGVyZm9ybSB0aGUgZm9sbG93aW5nIHN0ZXBzXG5cdCAqIChhc3N1bWUgdGhhdCB0aGUgdGFyZ2V0IGRpc3BsYXkgb2JqZWN0IGlzIG5hbWVkXG5cdCAqIDxjb2RlPm15RGlzcGxheU9iamVjdDwvY29kZT4pOjwvcD5cblx0ICpcblx0ICogPG9sPlxuXHQgKiAgIDxsaT5DcmVhdGUgYSBuZXcgZmlsdGVyIG9iamVjdCBieSB1c2luZyB0aGUgY29uc3RydWN0b3IgbWV0aG9kIG9mIHlvdXJcblx0ICogY2hvc2VuIGZpbHRlciBjbGFzcy48L2xpPlxuXHQgKiAgIDxsaT5Bc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT5teURpc3BsYXlPYmplY3QuZmlsdGVyczwvY29kZT4gYXJyYXlcblx0ICogdG8gYSB0ZW1wb3JhcnkgYXJyYXksIHN1Y2ggYXMgb25lIG5hbWVkIDxjb2RlPm15RmlsdGVyczwvY29kZT4uPC9saT5cblx0ICogICA8bGk+QWRkIHRoZSBuZXcgZmlsdGVyIG9iamVjdCB0byB0aGUgPGNvZGU+bXlGaWx0ZXJzPC9jb2RlPiB0ZW1wb3Jhcnlcblx0ICogYXJyYXkuPC9saT5cblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgdGVtcG9yYXJ5IGFycmF5IHRvIHRoZVxuXHQgKiA8Y29kZT5teURpc3BsYXlPYmplY3QuZmlsdGVyczwvY29kZT4gYXJyYXkuPC9saT5cblx0ICogPC9vbD5cblx0ICpcblx0ICogPHA+SWYgdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5IGlzIHVuZGVmaW5lZCwgeW91IGRvIG5vdCBuZWVkIHRvIHVzZVxuXHQgKiBhIHRlbXBvcmFyeSBhcnJheS4gSW5zdGVhZCwgeW91IGNhbiBkaXJlY3RseSBhc3NpZ24gYW4gYXJyYXkgbGl0ZXJhbCB0aGF0XG5cdCAqIGNvbnRhaW5zIG9uZSBvciBtb3JlIGZpbHRlciBvYmplY3RzIHRoYXQgeW91IGNyZWF0ZS4gVGhlIGZpcnN0IGV4YW1wbGUgaW5cblx0ICogdGhlIEV4YW1wbGVzIHNlY3Rpb24gYWRkcyBhIGRyb3Agc2hhZG93IGZpbHRlciBieSB1c2luZyBjb2RlIHRoYXQgaGFuZGxlc1xuXHQgKiBib3RoIGRlZmluZWQgYW5kIHVuZGVmaW5lZCA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheXMuPC9wPlxuXHQgKlxuXHQgKiA8cD5UbyBtb2RpZnkgYW4gZXhpc3RpbmcgZmlsdGVyIG9iamVjdCwgeW91IG11c3QgdXNlIHRoZSB0ZWNobmlxdWUgb2Zcblx0ICogbW9kaWZ5aW5nIGEgY29weSBvZiB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXk6PC9wPlxuXHQgKlxuXHQgKiA8b2w+XG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5IHRvIGEgdGVtcG9yYXJ5XG5cdCAqIGFycmF5LCBzdWNoIGFzIG9uZSBuYW1lZCA8Y29kZT5teUZpbHRlcnM8L2NvZGU+LjwvbGk+XG5cdCAqICAgPGxpPk1vZGlmeSB0aGUgcHJvcGVydHkgYnkgdXNpbmcgdGhlIHRlbXBvcmFyeSBhcnJheSxcblx0ICogPGNvZGU+bXlGaWx0ZXJzPC9jb2RlPi4gRm9yIGV4YW1wbGUsIHRvIHNldCB0aGUgcXVhbGl0eSBwcm9wZXJ0eSBvZiB0aGVcblx0ICogZmlyc3QgZmlsdGVyIGluIHRoZSBhcnJheSwgeW91IGNvdWxkIHVzZSB0aGUgZm9sbG93aW5nIGNvZGU6XG5cdCAqIDxjb2RlPm15RmlsdGVyc1swXS5xdWFsaXR5ID0gMTs8L2NvZGU+PC9saT5cblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgdGVtcG9yYXJ5IGFycmF5IHRvIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPlxuXHQgKiBhcnJheS48L2xpPlxuXHQgKiA8L29sPlxuXHQgKlxuXHQgKiA8cD5BdCBsb2FkIHRpbWUsIGlmIGEgZGlzcGxheSBvYmplY3QgaGFzIGFuIGFzc29jaWF0ZWQgZmlsdGVyLCBpdCBpc1xuXHQgKiBtYXJrZWQgdG8gY2FjaGUgaXRzZWxmIGFzIGEgdHJhbnNwYXJlbnQgYml0bWFwLiBGcm9tIHRoaXMgcG9pbnQgZm9yd2FyZCxcblx0ICogYXMgbG9uZyBhcyB0aGUgZGlzcGxheSBvYmplY3QgaGFzIGEgdmFsaWQgZmlsdGVyIGxpc3QsIHRoZSBwbGF5ZXIgY2FjaGVzXG5cdCAqIHRoZSBkaXNwbGF5IG9iamVjdCBhcyBhIGJpdG1hcC4gVGhpcyBzb3VyY2UgYml0bWFwIGlzIHVzZWQgYXMgYSBzb3VyY2Vcblx0ICogaW1hZ2UgZm9yIHRoZSBmaWx0ZXIgZWZmZWN0cy4gRWFjaCBkaXNwbGF5IG9iamVjdCB1c3VhbGx5IGhhcyB0d28gYml0bWFwczpcblx0ICogb25lIHdpdGggdGhlIG9yaWdpbmFsIHVuZmlsdGVyZWQgc291cmNlIGRpc3BsYXkgb2JqZWN0IGFuZCBhbm90aGVyIGZvciB0aGVcblx0ICogZmluYWwgaW1hZ2UgYWZ0ZXIgZmlsdGVyaW5nLiBUaGUgZmluYWwgaW1hZ2UgaXMgdXNlZCB3aGVuIHJlbmRlcmluZy4gQXNcblx0ICogbG9uZyBhcyB0aGUgZGlzcGxheSBvYmplY3QgZG9lcyBub3QgY2hhbmdlLCB0aGUgZmluYWwgaW1hZ2UgZG9lcyBub3QgbmVlZFxuXHQgKiB1cGRhdGluZy48L3A+XG5cdCAqXG5cdCAqIDxwPlRoZSBmbGFzaC5maWx0ZXJzIHBhY2thZ2UgaW5jbHVkZXMgY2xhc3NlcyBmb3IgZmlsdGVycy4gRm9yIGV4YW1wbGUsIHRvXG5cdCAqIGNyZWF0ZSBhIERyb3BTaGFkb3cgZmlsdGVyLCB5b3Ugd291bGQgd3JpdGU6PC9wPlxuXHQgKlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgV2hlbiA8Y29kZT5maWx0ZXJzPC9jb2RlPiBpbmNsdWRlcyBhIFNoYWRlckZpbHRlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzaGFkZXIgb3V0cHV0IHR5cGUgaXMgbm90IGNvbXBhdGlibGUgd2l0aFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvcGVyYXRpb24odGhlIHNoYWRlciBtdXN0IHNwZWNpZnkgYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cGl4ZWw0PC9jb2RlPiBvdXRwdXQpLlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgV2hlbiA8Y29kZT5maWx0ZXJzPC9jb2RlPiBpbmNsdWRlcyBhIFNoYWRlckZpbHRlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzaGFkZXIgZG9lc24ndCBzcGVjaWZ5IGFueSBpbWFnZSBpbnB1dCBvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIGZpcnN0IGlucHV0IGlzIG5vdCBhbiA8Y29kZT5pbWFnZTQ8L2NvZGU+IGlucHV0LlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgV2hlbiA8Y29kZT5maWx0ZXJzPC9jb2RlPiBpbmNsdWRlcyBhIFNoYWRlckZpbHRlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzaGFkZXIgc3BlY2lmaWVzIGFuIGltYWdlIGlucHV0IHRoYXQgaXNuJ3Rcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVkLlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgV2hlbiA8Y29kZT5maWx0ZXJzPC9jb2RlPiBpbmNsdWRlcyBhIFNoYWRlckZpbHRlciwgYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgQnl0ZUFycmF5IG9yIFZlY3Rvci48TnVtYmVyPiBpbnN0YW5jZSBhcyBhIHNoYWRlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQsIGFuZCB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IGFuZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzIGFyZW4ndCBzcGVjaWZpZWQgZm9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgU2hhZGVySW5wdXQgb2JqZWN0LCBvciB0aGUgc3BlY2lmaWVkIHZhbHVlc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgZG9uJ3QgbWF0Y2ggdGhlIGFtb3VudCBvZiBkYXRhIGluIHRoZSBpbnB1dCBkYXRhLlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgU2VlIHRoZSA8Y29kZT5TaGFkZXJJbnB1dC5pbnB1dDwvY29kZT4gcHJvcGVydHkgZm9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBtb3JlIGluZm9ybWF0aW9uLlxuXHQgKi9cbi8vXHRcdHB1YmxpYyBmaWx0ZXJzOkFycmF5PER5bmFtaWM+O1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGhlaWdodCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy4gVGhlIGhlaWdodCBpc1xuXHQgKiBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBib3VuZHMgb2YgdGhlIGNvbnRlbnQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBXaGVuXG5cdCAqIHlvdSBzZXQgdGhlIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydHksIHRoZSA8Y29kZT5zY2FsZVk8L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIGFkanVzdGVkIGFjY29yZGluZ2x5LCBhcyBzaG93biBpbiB0aGUgZm9sbG93aW5nIGNvZGU6XG5cdCAqXG5cdCAqIDxwPkV4Y2VwdCBmb3IgVGV4dEZpZWxkIGFuZCBWaWRlbyBvYmplY3RzLCBhIGRpc3BsYXkgb2JqZWN0IHdpdGggbm9cblx0ICogY29udGVudCAoc3VjaCBhcyBhbiBlbXB0eSBzcHJpdGUpIGhhcyBhIGhlaWdodCBvZiAwLCBldmVuIGlmIHlvdSB0cnkgdG9cblx0ICogc2V0IDxjb2RlPmhlaWdodDwvY29kZT4gdG8gYSBkaWZmZXJlbnQgdmFsdWUuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBoZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdGlmICh0aGlzLl9wQm91bmRzSW52YWxpZClcblx0XHRcdHRoaXMucFVwZGF0ZUJvdW5kcygpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2hlaWdodDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgaGVpZ2h0KHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5faGVpZ2h0ID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2hlaWdodCA9PSB2YWw7XG5cblx0XHR0aGlzLl9wU2NhbGVZID0gdmFsL3RoaXMuYm91bmRzLmFhYmIuaGVpZ2h0O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGluc3RhbmNlIGNvbnRhaW5lciBpbmRleCBvZiB0aGUgRGlzcGxheU9iamVjdC4gVGhlIG9iamVjdCBjYW4gYmVcblx0ICogaWRlbnRpZmllZCBpbiB0aGUgY2hpbGQgbGlzdCBvZiBpdHMgcGFyZW50IGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBieVxuXHQgKiBjYWxsaW5nIHRoZSA8Y29kZT5nZXRDaGlsZEJ5SW5kZXgoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBkaXNwbGF5IG9iamVjdFxuXHQgKiBjb250YWluZXIuXG5cdCAqXG5cdCAqIDxwPklmIHRoZSBEaXNwbGF5T2JqZWN0IGhhcyBubyBwYXJlbnQgY29udGFpbmVyLCBpbmRleCBkZWZhdWx0cyB0byAwLjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgaW5kZXgoKTpudW1iZXJcblx0e1xuXHRcdGlmICh0aGlzLl9wUGFyZW50KVxuXHRcdFx0cmV0dXJuIHRoaXMuX3BQYXJlbnQuZ2V0Q2hpbGRJbmRleCh0aGlzKTtcblxuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGludmVyc2VTY2VuZVRyYW5zZm9ybSgpOk1hdHJpeDNEXG5cdHtcblx0XHRpZiAodGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtRGlydHkpIHtcblx0XHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybS5jb3B5RnJvbSh0aGlzLnNjZW5lVHJhbnNmb3JtKTtcblx0XHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybS5pbnZlcnQoKTtcblx0XHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5ID0gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm07XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgaWdub3JlVHJhbnNmb3JtKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BJZ25vcmVUcmFuc2Zvcm07XG5cdH1cblxuXHRwdWJsaWMgc2V0IGlnbm9yZVRyYW5zZm9ybSh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BJZ25vcmVUcmFuc2Zvcm0gPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wSWdub3JlVHJhbnNmb3JtID0gdmFsdWU7XG5cblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5pZGVudGl0eSgpO1xuXHRcdFx0dGhpcy5fc2NlbmVQb3NpdGlvbi5zZXRUbygwLCAwLCAwKTtcblx0XHR9XG5cblx0XHR0aGlzLnBJbnZhbGlkYXRlU2NlbmVUcmFuc2Zvcm0oKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBpc0VudGl0eSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcElzRW50aXR5O1xuXHR9XG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgTG9hZGVySW5mbyBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCBsb2FkaW5nIHRoZSBmaWxlXG5cdCAqIHRvIHdoaWNoIHRoaXMgZGlzcGxheSBvYmplY3QgYmVsb25ncy4gVGhlIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIGRlZmluZWQgb25seSBmb3IgdGhlIHJvb3QgZGlzcGxheSBvYmplY3Qgb2YgYSBTV0YgZmlsZSBvciBmb3IgYSBsb2FkZWRcblx0ICogQml0bWFwKG5vdCBmb3IgYSBCaXRtYXAgdGhhdCBpcyBkcmF3biB3aXRoIEFjdGlvblNjcmlwdCkuIFRvIGZpbmQgdGhlXG5cdCAqIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhlIFNXRiBmaWxlIHRoYXQgY29udGFpbnNcblx0ICogYSBkaXNwbGF5IG9iamVjdCBuYW1lZCA8Y29kZT5teURpc3BsYXlPYmplY3Q8L2NvZGU+LCB1c2Vcblx0ICogPGNvZGU+bXlEaXNwbGF5T2JqZWN0LnJvb3QubG9hZGVySW5mbzwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPkEgbGFyZ2UgU1dGIGZpbGUgY2FuIG1vbml0b3IgaXRzIGRvd25sb2FkIGJ5IGNhbGxpbmdcblx0ICogPGNvZGU+dGhpcy5yb290LmxvYWRlckluZm8uYWRkRXZlbnRMaXN0ZW5lcihFdmVudC5DT01QTEVURSxcblx0ICogZnVuYyk8L2NvZGU+LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgbG9hZGVySW5mbygpOkxvYWRlckluZm9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkZXJJbmZvO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBjYWxsaW5nIGRpc3BsYXkgb2JqZWN0IGlzIG1hc2tlZCBieSB0aGUgc3BlY2lmaWVkIDxjb2RlPm1hc2s8L2NvZGU+XG5cdCAqIG9iamVjdC4gVG8gZW5zdXJlIHRoYXQgbWFza2luZyB3b3JrcyB3aGVuIHRoZSBTdGFnZSBpcyBzY2FsZWQsIHRoZVxuXHQgKiA8Y29kZT5tYXNrPC9jb2RlPiBkaXNwbGF5IG9iamVjdCBtdXN0IGJlIGluIGFuIGFjdGl2ZSBwYXJ0IG9mIHRoZSBkaXNwbGF5XG5cdCAqIGxpc3QuIFRoZSA8Y29kZT5tYXNrPC9jb2RlPiBvYmplY3QgaXRzZWxmIGlzIG5vdCBkcmF3bi4gU2V0XG5cdCAqIDxjb2RlPm1hc2s8L2NvZGU+IHRvIDxjb2RlPm51bGw8L2NvZGU+IHRvIHJlbW92ZSB0aGUgbWFzay5cblx0ICpcblx0ICogPHA+VG8gYmUgYWJsZSB0byBzY2FsZSBhIG1hc2sgb2JqZWN0LCBpdCBtdXN0IGJlIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFRvXG5cdCAqIGJlIGFibGUgdG8gZHJhZyBhIG1hc2sgU3ByaXRlIG9iamVjdChieSBjYWxsaW5nIGl0c1xuXHQgKiA8Y29kZT5zdGFydERyYWcoKTwvY29kZT4gbWV0aG9kKSwgaXQgbXVzdCBiZSBvbiB0aGUgZGlzcGxheSBsaXN0LiBUbyBjYWxsXG5cdCAqIHRoZSA8Y29kZT5zdGFydERyYWcoKTwvY29kZT4gbWV0aG9kIGZvciBhIG1hc2sgc3ByaXRlIGJhc2VkIG9uIGFcblx0ICogPGNvZGU+bW91c2VEb3duPC9jb2RlPiBldmVudCBiZWluZyBkaXNwYXRjaGVkIGJ5IHRoZSBzcHJpdGUsIHNldCB0aGVcblx0ICogc3ByaXRlJ3MgPGNvZGU+YnV0dG9uTW9kZTwvY29kZT4gcHJvcGVydHkgdG8gPGNvZGU+dHJ1ZTwvY29kZT4uPC9wPlxuXHQgKlxuXHQgKiA8cD5XaGVuIGRpc3BsYXkgb2JqZWN0cyBhcmUgY2FjaGVkIGJ5IHNldHRpbmcgdGhlXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuIHRoZVxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwTWF0cml4PC9jb2RlPiBwcm9wZXJ0eSB0byBhIE1hdHJpeCBvYmplY3QsIGJvdGggdGhlXG5cdCAqIG1hc2sgYW5kIHRoZSBkaXNwbGF5IG9iamVjdCBiZWluZyBtYXNrZWQgbXVzdCBiZSBwYXJ0IG9mIHRoZSBzYW1lIGNhY2hlZFxuXHQgKiBiaXRtYXAuIFRodXMsIGlmIHRoZSBkaXNwbGF5IG9iamVjdCBpcyBjYWNoZWQsIHRoZW4gdGhlIG1hc2sgbXVzdCBiZSBhXG5cdCAqIGNoaWxkIG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gSWYgYW4gYW5jZXN0b3Igb2YgdGhlIGRpc3BsYXkgb2JqZWN0IG9uIHRoZVxuXHQgKiBkaXNwbGF5IGxpc3QgaXMgY2FjaGVkLCB0aGVuIHRoZSBtYXNrIG11c3QgYmUgYSBjaGlsZCBvZiB0aGF0IGFuY2VzdG9yIG9yXG5cdCAqIG9uZSBvZiBpdHMgZGVzY2VuZGVudHMuIElmIG1vcmUgdGhhbiBvbmUgYW5jZXN0b3Igb2YgdGhlIG1hc2tlZCBvYmplY3QgaXNcblx0ICogY2FjaGVkLCB0aGVuIHRoZSBtYXNrIG11c3QgYmUgYSBkZXNjZW5kZW50IG9mIHRoZSBjYWNoZWQgY29udGFpbmVyIGNsb3Nlc3Rcblx0ICogdG8gdGhlIG1hc2tlZCBvYmplY3QgaW4gdGhlIGRpc3BsYXkgbGlzdC48L3A+XG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBBIHNpbmdsZSA8Y29kZT5tYXNrPC9jb2RlPiBvYmplY3QgY2Fubm90IGJlIHVzZWQgdG8gbWFza1xuXHQgKiBtb3JlIHRoYW4gb25lIGNhbGxpbmcgZGlzcGxheSBvYmplY3QuIFdoZW4gdGhlIDxjb2RlPm1hc2s8L2NvZGU+IGlzXG5cdCAqIGFzc2lnbmVkIHRvIGEgc2Vjb25kIGRpc3BsYXkgb2JqZWN0LCBpdCBpcyByZW1vdmVkIGFzIHRoZSBtYXNrIG9mIHRoZVxuXHQgKiBmaXJzdCBvYmplY3QsIGFuZCB0aGF0IG9iamVjdCdzIDxjb2RlPm1hc2s8L2NvZGU+IHByb3BlcnR5IGJlY29tZXNcblx0ICogPGNvZGU+bnVsbDwvY29kZT4uPC9wPlxuXHQgKi9cblx0cHVibGljIG1hc2s6RGlzcGxheU9iamVjdDtcblxuXHQvKipcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdGhpcyBvYmplY3QgcmVjZWl2ZXMgbW91c2UsIG9yIG90aGVyIHVzZXIgaW5wdXQsXG5cdCAqIG1lc3NhZ2VzLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyA8Y29kZT50cnVlPC9jb2RlPiwgd2hpY2ggbWVhbnMgdGhhdCBieVxuXHQgKiBkZWZhdWx0IGFueSBJbnRlcmFjdGl2ZU9iamVjdCBpbnN0YW5jZSB0aGF0IGlzIG9uIHRoZSBkaXNwbGF5IGxpc3Rcblx0ICogcmVjZWl2ZXMgbW91c2UgZXZlbnRzIG9yIG90aGVyIHVzZXIgaW5wdXQgZXZlbnRzLiBJZlxuXHQgKiA8Y29kZT5tb3VzZUVuYWJsZWQ8L2NvZGU+IGlzIHNldCB0byA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSBpbnN0YW5jZSBkb2VzXG5cdCAqIG5vdCByZWNlaXZlIGFueSBtb3VzZSBldmVudHMob3Igb3RoZXIgdXNlciBpbnB1dCBldmVudHMgbGlrZSBrZXlib2FyZFxuXHQgKiBldmVudHMpLiBBbnkgY2hpbGRyZW4gb2YgdGhpcyBpbnN0YW5jZSBvbiB0aGUgZGlzcGxheSBsaXN0IGFyZSBub3Rcblx0ICogYWZmZWN0ZWQuIFRvIGNoYW5nZSB0aGUgPGNvZGU+bW91c2VFbmFibGVkPC9jb2RlPiBiZWhhdmlvciBmb3IgYWxsXG5cdCAqIGNoaWxkcmVuIG9mIGFuIG9iamVjdCBvbiB0aGUgZGlzcGxheSBsaXN0LCB1c2Vcblx0ICogPGNvZGU+Zmxhc2guZGlzcGxheS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLm1vdXNlQ2hpbGRyZW48L2NvZGU+LlxuXHQgKlxuXHQgKiA8cD4gTm8gZXZlbnQgaXMgZGlzcGF0Y2hlZCBieSBzZXR0aW5nIHRoaXMgcHJvcGVydHkuIFlvdSBtdXN0IHVzZSB0aGVcblx0ICogPGNvZGU+YWRkRXZlbnRMaXN0ZW5lcigpPC9jb2RlPiBtZXRob2QgdG8gY3JlYXRlIGludGVyYWN0aXZlXG5cdCAqIGZ1bmN0aW9uYWxpdHkuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBtb3VzZUVuYWJsZWQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRNb3VzZUVuYWJsZWQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1vdXNlRW5hYmxlZCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZXhwbGljaXRNb3VzZUVuYWJsZWQgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh0aGlzLl9wUGFyZW50PyB0aGlzLl9wUGFyZW50Lm1vdXNlQ2hpbGRyZW4gOiB0cnVlKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgeCBjb29yZGluYXRlIG9mIHRoZSBtb3VzZSBvciB1c2VyIGlucHV0IGRldmljZSBwb3NpdGlvbiwgaW5cblx0ICogcGl4ZWxzLlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlPC9iPjogRm9yIGEgRGlzcGxheU9iamVjdCB0aGF0IGhhcyBiZWVuIHJvdGF0ZWQsIHRoZSByZXR1cm5lZCB4XG5cdCAqIGNvb3JkaW5hdGUgd2lsbCByZWZsZWN0IHRoZSBub24tcm90YXRlZCBvYmplY3QuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBtb3VzZVgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9tb3VzZVg7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIG1vdXNlIG9yIHVzZXIgaW5wdXQgZGV2aWNlIHBvc2l0aW9uLCBpblxuXHQgKiBwaXhlbHMuXG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU8L2I+OiBGb3IgYSBEaXNwbGF5T2JqZWN0IHRoYXQgaGFzIGJlZW4gcm90YXRlZCwgdGhlIHJldHVybmVkIHlcblx0ICogY29vcmRpbmF0ZSB3aWxsIHJlZmxlY3QgdGhlIG5vbi1yb3RhdGVkIG9iamVjdC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1vdXNlWSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21vdXNlWTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGluc3RhbmNlIG5hbWUgb2YgdGhlIERpc3BsYXlPYmplY3QuIFRoZSBvYmplY3QgY2FuIGJlXG5cdCAqIGlkZW50aWZpZWQgaW4gdGhlIGNoaWxkIGxpc3Qgb2YgaXRzIHBhcmVudCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgYnlcblx0ICogY2FsbGluZyB0aGUgPGNvZGU+Z2V0Q2hpbGRCeU5hbWUoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBkaXNwbGF5IG9iamVjdFxuXHQgKiBjb250YWluZXIuXG5cdCAqXG5cdCAqIEB0aHJvd3MgSWxsZWdhbE9wZXJhdGlvbkVycm9yIElmIHlvdSBhcmUgYXR0ZW1wdGluZyB0byBzZXQgdGhpcyBwcm9wZXJ0eVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbiBhbiBvYmplY3QgdGhhdCB3YXMgcGxhY2VkIG9uIHRoZSB0aW1lbGluZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiB0aGUgRmxhc2ggYXV0aG9yaW5nIHRvb2wuXG5cdCAqL1xuXHRwdWJsaWMgbmFtZTpzdHJpbmc7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgb3JpZW50YXRpb25Nb2RlOnN0cmluZyA9IE9yaWVudGF0aW9uTW9kZS5ERUZBVUxUO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IHRoYXQgY29udGFpbnMgdGhpcyBkaXNwbGF5XG5cdCAqIG9iamVjdC4gVXNlIHRoZSA8Y29kZT5wYXJlbnQ8L2NvZGU+IHByb3BlcnR5IHRvIHNwZWNpZnkgYSByZWxhdGl2ZSBwYXRoIHRvXG5cdCAqIGRpc3BsYXkgb2JqZWN0cyB0aGF0IGFyZSBhYm92ZSB0aGUgY3VycmVudCBkaXNwbGF5IG9iamVjdCBpbiB0aGUgZGlzcGxheVxuXHQgKiBsaXN0IGhpZXJhcmNoeS5cblx0ICpcblx0ICogPHA+WW91IGNhbiB1c2UgPGNvZGU+cGFyZW50PC9jb2RlPiB0byBtb3ZlIHVwIG11bHRpcGxlIGxldmVscyBpbiB0aGVcblx0ICogZGlzcGxheSBsaXN0IGFzIGluIHRoZSBmb2xsb3dpbmc6PC9wPlxuXHQgKlxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgVGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdCBiZWxvbmdzIHRvIGEgc2VjdXJpdHlcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHNhbmRib3ggdG8gd2hpY2ggeW91IGRvIG5vdCBoYXZlIGFjY2Vzcy4gWW91IGNhblxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYXZvaWQgdGhpcyBzaXR1YXRpb24gYnkgaGF2aW5nIHRoZSBwYXJlbnQgbW92aWUgY2FsbFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIDxjb2RlPlNlY3VyaXR5LmFsbG93RG9tYWluKCk8L2NvZGU+IG1ldGhvZC5cblx0ICovXG5cdHB1YmxpYyBnZXQgcGFyZW50KCk6RGlzcGxheU9iamVjdENvbnRhaW5lclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BQYXJlbnQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgcGFydGl0aW9uKCk6UGFydGl0aW9uXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRQYXJ0aXRpb247XG5cdH1cblxuXHRwdWJsaWMgc2V0IHBhcnRpdGlvbih2YWx1ZTpQYXJ0aXRpb24pXG5cdHtcblx0XHRpZiAodGhpcy5fZXhwbGljaXRQYXJ0aXRpb24gPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAodGhpcy5fcFNjZW5lICYmIHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uKVxuXHRcdFx0dGhpcy5fcFNjZW5lLmlVbnJlZ2lzdGVyUGFydGl0aW9uKHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uKTtcblxuXHRcdHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fcFNjZW5lICYmIHZhbHVlKVxuXHRcdFx0dGhpcy5fcFNjZW5lLmlSZWdpc3RlclBhcnRpdGlvbih2YWx1ZSk7XG5cblx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24odGhpcy5fcFBhcmVudD8gdGhpcy5fcFBhcmVudC5faUFzc2lnbmVkUGFydGl0aW9uIDogbnVsbCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgcGFydGl0aW9uTm9kZSgpOkVudGl0eU5vZGVcblx0e1xuXHRcdGlmICghdGhpcy5fcGFydGl0aW9uTm9kZSlcblx0XHRcdHRoaXMuX3BhcnRpdGlvbk5vZGUgPSB0aGlzLnBDcmVhdGVFbnRpdHlQYXJ0aXRpb25Ob2RlKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcGFydGl0aW9uTm9kZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBwaWNraW5nQ29sbGlkZXIoKTpJUGlja2luZ0NvbGxpZGVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFBpY2tpbmdDb2xsaWRlcjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcGlja2luZ0NvbGxpZGVyKHZhbHVlOklQaWNraW5nQ29sbGlkZXIpXG5cdHtcblx0XHR0aGlzLl9wUGlja2luZ0NvbGxpZGVyID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgbG9jYWwgcG9pbnQgYXJvdW5kIHdoaWNoIHRoZSBvYmplY3Qgcm90YXRlcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgcGl2b3QoKTpWZWN0b3IzRFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3Bpdm90O1xuXHR9XG5cblxuXHRwdWJsaWMgc2V0IHBpdm90KHBpdm90OlZlY3RvcjNEKVxuXHR7XG5cdFx0dGhpcy5fcGl2b3QgPSBwaXZvdC5jbG9uZSgpO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUGl2b3QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3IgYSBkaXNwbGF5IG9iamVjdCBpbiBhIGxvYWRlZCBTV0YgZmlsZSwgdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIHRoZSB0b3AtbW9zdCBkaXNwbGF5IG9iamVjdCBpbiB0aGUgcG9ydGlvbiBvZiB0aGUgZGlzcGxheSBsaXN0J3MgdHJlZVxuXHQgKiBzdHJ1Y3R1cmUgcmVwcmVzZW50ZWQgYnkgdGhhdCBTV0YgZmlsZS4gRm9yIGEgQml0bWFwIG9iamVjdCByZXByZXNlbnRpbmcgYVxuXHQgKiBsb2FkZWQgaW1hZ2UgZmlsZSwgdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzIHRoZSBCaXRtYXAgb2JqZWN0XG5cdCAqIGl0c2VsZi4gRm9yIHRoZSBpbnN0YW5jZSBvZiB0aGUgbWFpbiBjbGFzcyBvZiB0aGUgZmlyc3QgU1dGIGZpbGUgbG9hZGVkLFxuXHQgKiB0aGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXMgdGhlIGRpc3BsYXkgb2JqZWN0IGl0c2VsZi4gVGhlXG5cdCAqIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBTdGFnZSBvYmplY3QgaXMgdGhlIFN0YWdlIG9iamVjdCBpdHNlbGYuXG5cdCAqIFRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4gZm9yIGFueSBkaXNwbGF5XG5cdCAqIG9iamVjdCB0aGF0IGhhcyBub3QgYmVlbiBhZGRlZCB0byB0aGUgZGlzcGxheSBsaXN0LCB1bmxlc3MgaXQgaGFzIGJlZW5cblx0ICogYWRkZWQgdG8gYSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgdGhhdCBpcyBvZmYgdGhlIGRpc3BsYXkgbGlzdCBidXQgdGhhdFxuXHQgKiBpcyBhIGNoaWxkIG9mIHRoZSB0b3AtbW9zdCBkaXNwbGF5IG9iamVjdCBpbiBhIGxvYWRlZCBTV0YgZmlsZS5cblx0ICpcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGlmIHlvdSBjcmVhdGUgYSBuZXcgU3ByaXRlIG9iamVjdCBieSBjYWxsaW5nIHRoZVxuXHQgKiA8Y29kZT5TcHJpdGUoKTwvY29kZT4gY29uc3RydWN0b3IgbWV0aG9kLCBpdHMgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHlcblx0ICogaXMgPGNvZGU+bnVsbDwvY29kZT4gdW50aWwgeW91IGFkZCBpdCB0byB0aGUgZGlzcGxheSBsaXN0KG9yIHRvIGEgZGlzcGxheVxuXHQgKiBvYmplY3QgY29udGFpbmVyIHRoYXQgaXMgb2ZmIHRoZSBkaXNwbGF5IGxpc3QgYnV0IHRoYXQgaXMgYSBjaGlsZCBvZiB0aGVcblx0ICogdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gYSBTV0YgZmlsZSkuPC9wPlxuXHQgKlxuXHQgKiA8cD5Gb3IgYSBsb2FkZWQgU1dGIGZpbGUsIGV2ZW4gdGhvdWdoIHRoZSBMb2FkZXIgb2JqZWN0IHVzZWQgdG8gbG9hZCB0aGVcblx0ICogZmlsZSBtYXkgbm90IGJlIG9uIHRoZSBkaXNwbGF5IGxpc3QsIHRoZSB0b3AtbW9zdCBkaXNwbGF5IG9iamVjdCBpbiB0aGVcblx0ICogU1dGIGZpbGUgaGFzIGl0cyA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBzZXQgdG8gaXRzZWxmLiBUaGUgTG9hZGVyXG5cdCAqIG9iamVjdCBkb2VzIG5vdCBoYXZlIGl0cyA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBzZXQgdW50aWwgaXQgaXMgYWRkZWRcblx0ICogYXMgYSBjaGlsZCBvZiBhIGRpc3BsYXkgb2JqZWN0IGZvciB3aGljaCB0aGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXNcblx0ICogc2V0LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgcm9vdCgpOkRpc3BsYXlPYmplY3RDb250YWluZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yb290O1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsIGZyb20gaXRzXG5cdCAqIG9yaWdpbmFsIG9yaWVudGF0aW9uLiBWYWx1ZXMgZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uO1xuXHQgKiB2YWx1ZXMgZnJvbSAwIHRvIC0xODAgcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlXG5cdCAqIHRoaXMgcmFuZ2UgYXJlIGFkZGVkIHRvIG9yIHN1YnRyYWN0ZWQgZnJvbSAzNjAgdG8gb2J0YWluIGEgdmFsdWUgd2l0aGluXG5cdCAqIHRoZSByYW5nZS4gRm9yIGV4YW1wbGUsIHRoZSBzdGF0ZW1lbnQgPGNvZGU+bXlfdmlkZW8ucm90YXRpb24gPSA0NTA8L2NvZGU+XG5cdCAqIGlzIHRoZSBzYW1lIGFzIDxjb2RlPiBteV92aWRlby5yb3RhdGlvbiA9IDkwPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyByb3RhdGlvbjpudW1iZXI7IC8vVE9ET1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHgtYXhpcyByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcyxcblx0ICogZnJvbSBpdHMgb3JpZ2luYWwgb3JpZW50YXRpb24gcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFZhbHVlc1xuXHQgKiBmcm9tIDAgdG8gMTgwIHJlcHJlc2VudCBjbG9ja3dpc2Ugcm90YXRpb247IHZhbHVlcyBmcm9tIDAgdG8gLTE4MFxuXHQgKiByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGUgdGhpcyByYW5nZSBhcmUgYWRkZWRcblx0ICogdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW4gdGhlIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIGdldCByb3RhdGlvblgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yb3RhdGlvblgqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHJvdGF0aW9uWCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMucm90YXRpb25YID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3JvdGF0aW9uWCA9IHZhbCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB5LWF4aXMgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsXG5cdCAqIGZyb20gaXRzIG9yaWdpbmFsIG9yaWVudGF0aW9uIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLiBWYWx1ZXNcblx0ICogZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uOyB2YWx1ZXMgZnJvbSAwIHRvIC0xODBcblx0ICogcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlIHRoaXMgcmFuZ2UgYXJlIGFkZGVkXG5cdCAqIHRvIG9yIHN1YnRyYWN0ZWQgZnJvbSAzNjAgdG8gb2J0YWluIGEgdmFsdWUgd2l0aGluIHRoZSByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgcm90YXRpb25ZKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcm90YXRpb25ZKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xuXHR9XG5cblx0cHVibGljIHNldCByb3RhdGlvblkodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLnJvdGF0aW9uWSA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9yb3RhdGlvblkgPSB2YWwqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgei1heGlzIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLFxuXHQgKiBmcm9tIGl0cyBvcmlnaW5hbCBvcmllbnRhdGlvbiByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVmFsdWVzXG5cdCAqIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjsgdmFsdWVzIGZyb20gMCB0byAtMTgwXG5cdCAqIHJlcHJlc2VudCBjb3VudGVyY2xvY2t3aXNlIHJvdGF0aW9uLiBWYWx1ZXMgb3V0c2lkZSB0aGlzIHJhbmdlIGFyZSBhZGRlZFxuXHQgKiB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJvdGF0aW9uWigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3JvdGF0aW9uWipNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcblx0fVxuXG5cdHB1YmxpYyBzZXQgcm90YXRpb25aKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5yb3RhdGlvblogPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcm90YXRpb25aID0gdmFsKk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgY3VycmVudCBzY2FsaW5nIGdyaWQgdGhhdCBpcyBpbiBlZmZlY3QuIElmIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPixcblx0ICogdGhlIGVudGlyZSBkaXNwbGF5IG9iamVjdCBpcyBzY2FsZWQgbm9ybWFsbHkgd2hlbiBhbnkgc2NhbGUgdHJhbnNmb3JtYXRpb25cblx0ICogaXMgYXBwbGllZC5cblx0ICpcblx0ICogPHA+V2hlbiB5b3UgZGVmaW5lIHRoZSA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0eSwgdGhlIGRpc3BsYXlcblx0ICogb2JqZWN0IGlzIGRpdmlkZWQgaW50byBhIGdyaWQgd2l0aCBuaW5lIHJlZ2lvbnMgYmFzZWQgb24gdGhlXG5cdCAqIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHJlY3RhbmdsZSwgd2hpY2ggZGVmaW5lcyB0aGUgY2VudGVyIHJlZ2lvbiBvZiB0aGVcblx0ICogZ3JpZC4gVGhlIGVpZ2h0IG90aGVyIHJlZ2lvbnMgb2YgdGhlIGdyaWQgYXJlIHRoZSBmb2xsb3dpbmcgYXJlYXM6IDwvcD5cblx0ICpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT5UaGUgdXBwZXItbGVmdCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogICA8bGk+VGhlIGFyZWEgYWJvdmUgdGhlIHJlY3RhbmdsZSA8L2xpPlxuXHQgKiAgIDxsaT5UaGUgdXBwZXItcmlnaHQgY29ybmVyIG91dHNpZGUgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XG5cdCAqICAgPGxpPlRoZSBhcmVhIHRvIHRoZSBsZWZ0IG9mIHRoZSByZWN0YW5nbGU8L2xpPlxuXHQgKiAgIDxsaT5UaGUgYXJlYSB0byB0aGUgcmlnaHQgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XG5cdCAqICAgPGxpPlRoZSBsb3dlci1sZWZ0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxuXHQgKiAgIDxsaT5UaGUgYXJlYSBiZWxvdyB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogICA8bGk+VGhlIGxvd2VyLXJpZ2h0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxuXHQgKiA8L3VsPlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIHRoaW5rIG9mIHRoZSBlaWdodCByZWdpb25zIG91dHNpZGUgb2YgdGhlIGNlbnRlcihkZWZpbmVkIGJ5XG5cdCAqIHRoZSByZWN0YW5nbGUpIGFzIGJlaW5nIGxpa2UgYSBwaWN0dXJlIGZyYW1lIHRoYXQgaGFzIHNwZWNpYWwgcnVsZXNcblx0ICogYXBwbGllZCB0byBpdCB3aGVuIHNjYWxlZC48L3A+XG5cdCAqXG5cdCAqIDxwPldoZW4gdGhlIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHByb3BlcnR5IGlzIHNldCBhbmQgYSBkaXNwbGF5IG9iamVjdFxuXHQgKiBpcyBzY2FsZWQsIGFsbCB0ZXh0IGFuZCBncmFkaWVudHMgYXJlIHNjYWxlZCBub3JtYWxseTsgaG93ZXZlciwgZm9yIG90aGVyXG5cdCAqIHR5cGVzIG9mIG9iamVjdHMgdGhlIGZvbGxvd2luZyBydWxlcyBhcHBseTo8L3A+XG5cdCAqXG5cdCAqIDx1bD5cblx0ICogICA8bGk+Q29udGVudCBpbiB0aGUgY2VudGVyIHJlZ2lvbiBpcyBzY2FsZWQgbm9ybWFsbHkuIDwvbGk+XG5cdCAqICAgPGxpPkNvbnRlbnQgaW4gdGhlIGNvcm5lcnMgaXMgbm90IHNjYWxlZC4gPC9saT5cblx0ICogICA8bGk+Q29udGVudCBpbiB0aGUgdG9wIGFuZCBib3R0b20gcmVnaW9ucyBpcyBzY2FsZWQgaG9yaXpvbnRhbGx5IG9ubHkuXG5cdCAqIENvbnRlbnQgaW4gdGhlIGxlZnQgYW5kIHJpZ2h0IHJlZ2lvbnMgaXMgc2NhbGVkIHZlcnRpY2FsbHkgb25seS48L2xpPlxuXHQgKiAgIDxsaT5BbGwgZmlsbHMoaW5jbHVkaW5nIGJpdG1hcHMsIHZpZGVvLCBhbmQgZ3JhZGllbnRzKSBhcmUgc3RyZXRjaGVkIHRvXG5cdCAqIGZpdCB0aGVpciBzaGFwZXMuPC9saT5cblx0ICogPC91bD5cblx0ICpcblx0ICogPHA+SWYgYSBkaXNwbGF5IG9iamVjdCBpcyByb3RhdGVkLCBhbGwgc3Vic2VxdWVudCBzY2FsaW5nIGlzIG5vcm1hbChhbmRcblx0ICogdGhlIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHByb3BlcnR5IGlzIGlnbm9yZWQpLjwvcD5cblx0ICpcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoZSBmb2xsb3dpbmcgZGlzcGxheSBvYmplY3QgYW5kIGEgcmVjdGFuZ2xlIHRoYXRcblx0ICogaXMgYXBwbGllZCBhcyB0aGUgZGlzcGxheSBvYmplY3QncyA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPjo8L3A+XG5cdCAqXG5cdCAqIDxwPkEgY29tbW9uIHVzZSBmb3Igc2V0dGluZyA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBpcyB0byBzZXQgdXAgYSBkaXNwbGF5XG5cdCAqIG9iamVjdCB0byBiZSB1c2VkIGFzIGEgY29tcG9uZW50LCBpbiB3aGljaCBlZGdlIHJlZ2lvbnMgcmV0YWluIHRoZSBzYW1lXG5cdCAqIHdpZHRoIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBzY2FsZWQuPC9wPlxuXHQgKlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgSWYgeW91IHBhc3MgYW4gaW52YWxpZCBhcmd1bWVudCB0byB0aGUgbWV0aG9kLlxuXHQgKi9cblx0cHVibGljIHNjYWxlOUdyaWQ6UmVjdGFuZ2xlO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGhvcml6b250YWwgc2NhbGUocGVyY2VudGFnZSkgb2YgdGhlIG9iamVjdCBhcyBhcHBsaWVkIGZyb21cblx0ICogdGhlIHJlZ2lzdHJhdGlvbiBwb2ludC4gVGhlIGRlZmF1bHQgcmVnaXN0cmF0aW9uIHBvaW50IGlzKDAsMCkuIDEuMFxuXHQgKiBlcXVhbHMgMTAwJSBzY2FsZS5cblx0ICpcblx0ICogPHA+U2NhbGluZyB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gY2hhbmdlcyB0aGUgPGNvZGU+eDwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IHZhbHVlcywgd2hpY2ggYXJlIGRlZmluZWQgaW4gd2hvbGUgcGl4ZWxzLiA8L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjYWxlWCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BTY2FsZVg7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNjYWxlWCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BTY2FsZVggPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFNjYWxlWCA9IHZhbDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB2ZXJ0aWNhbCBzY2FsZShwZXJjZW50YWdlKSBvZiBhbiBvYmplY3QgYXMgYXBwbGllZCBmcm9tIHRoZVxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIG9iamVjdC4gVGhlIGRlZmF1bHQgcmVnaXN0cmF0aW9uIHBvaW50IGlzKDAsMCkuXG5cdCAqIDEuMCBpcyAxMDAlIHNjYWxlLlxuXHQgKlxuXHQgKiA8cD5TY2FsaW5nIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBjaGFuZ2VzIHRoZSA8Y29kZT54PC9jb2RlPiBhbmRcblx0ICogPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgdmFsdWVzLCB3aGljaCBhcmUgZGVmaW5lZCBpbiB3aG9sZSBwaXhlbHMuIDwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2NhbGVZKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFNjYWxlWTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc2NhbGVZKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fcFNjYWxlWSA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wU2NhbGVZID0gdmFsO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGRlcHRoIHNjYWxlKHBlcmNlbnRhZ2UpIG9mIGFuIG9iamVjdCBhcyBhcHBsaWVkIGZyb20gdGhlXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgb2JqZWN0LiBUaGUgZGVmYXVsdCByZWdpc3RyYXRpb24gcG9pbnQgaXMoMCwwKS5cblx0ICogMS4wIGlzIDEwMCUgc2NhbGUuXG5cdCAqXG5cdCAqIDxwPlNjYWxpbmcgdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIGNoYW5nZXMgdGhlIDxjb2RlPng8L2NvZGU+LFxuXHQgKiA8Y29kZT55PC9jb2RlPiBhbmQgPGNvZGU+ejwvY29kZT4gcHJvcGVydHkgdmFsdWVzLCB3aGljaCBhcmUgZGVmaW5lZCBpblxuXHQgKiB3aG9sZSBwaXhlbHMuIDwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2NhbGVaKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFNjYWxlWjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc2NhbGVaKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fcFNjYWxlWiA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wU2NhbGVaID0gdmFsO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBzY2VuZSgpOlNjZW5lXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFNjZW5lO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjZW5lUG9zaXRpb24oKTpWZWN0b3IzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX3NjZW5lUG9zaXRpb25EaXJ0eSkge1xuXHRcdFx0aWYgKCF0aGlzLl9waXZvdFplcm8gJiYgdGhpcy5hbGlnbm1lbnRNb2RlID09IEFsaWdubWVudE1vZGUuUElWT1RfUE9JTlQpIHtcblx0XHRcdFx0dmFyIHBpdm90U2NhbGU6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QodGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYLCB0aGlzLl9waXZvdC55L3RoaXMuX3BTY2FsZVksIHRoaXMuX3Bpdm90LnovdGhpcy5fcFNjYWxlWilcblx0XHRcdFx0XHR0aGlzLl9zY2VuZVBvc2l0aW9uID0gdGhpcy5zY2VuZVRyYW5zZm9ybS50cmFuc2Zvcm1WZWN0b3IocGl2b3RTY2FsZSk7XG5cdFx0XHRcdC8vdGhpcy5fc2NlbmVQb3NpdGlvbi5kZWNyZW1lbnRCeShuZXcgVmVjdG9yM0QodGhpcy5fcGl2b3QueCp0aGlzLl9wU2NhbGVYLCB0aGlzLl9waXZvdC55KnRoaXMuX3BTY2FsZVksIHRoaXMuX3Bpdm90LnoqdGhpcy5fcFNjYWxlWikpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zY2VuZVRyYW5zZm9ybS5jb3B5Q29sdW1uVG8oMywgdGhpcy5fc2NlbmVQb3NpdGlvbik7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3NjZW5lUG9zaXRpb25EaXJ0eSA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fc2NlbmVQb3NpdGlvbjtcblx0fVxuXG5cdHB1YmxpYyBnZXQgc2NlbmVUcmFuc2Zvcm0oKTpNYXRyaXgzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX3BTY2VuZVRyYW5zZm9ybURpcnR5KVxuXHRcdFx0dGhpcy5wVXBkYXRlU2NlbmVUcmFuc2Zvcm0oKTtcblxuXHRcdHJldHVybiB0aGlzLl9wU2NlbmVUcmFuc2Zvcm07XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHNjcm9sbCByZWN0YW5nbGUgYm91bmRzIG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gVGhlIGRpc3BsYXkgb2JqZWN0IGlzXG5cdCAqIGNyb3BwZWQgdG8gdGhlIHNpemUgZGVmaW5lZCBieSB0aGUgcmVjdGFuZ2xlLCBhbmQgaXQgc2Nyb2xscyB3aXRoaW4gdGhlXG5cdCAqIHJlY3RhbmdsZSB3aGVuIHlvdSBjaGFuZ2UgdGhlIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0aWVzXG5cdCAqIG9mIHRoZSA8Y29kZT5zY3JvbGxSZWN0PC9jb2RlPiBvYmplY3QuXG5cdCAqXG5cdCAqIDxwPlRoZSBwcm9wZXJ0aWVzIG9mIHRoZSA8Y29kZT5zY3JvbGxSZWN0PC9jb2RlPiBSZWN0YW5nbGUgb2JqZWN0IHVzZSB0aGVcblx0ICogZGlzcGxheSBvYmplY3QncyBjb29yZGluYXRlIHNwYWNlIGFuZCBhcmUgc2NhbGVkIGp1c3QgbGlrZSB0aGUgb3ZlcmFsbFxuXHQgKiBkaXNwbGF5IG9iamVjdC4gVGhlIGNvcm5lciBib3VuZHMgb2YgdGhlIGNyb3BwZWQgd2luZG93IG9uIHRoZSBzY3JvbGxpbmdcblx0ICogZGlzcGxheSBvYmplY3QgYXJlIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0KDAsMCkgYW5kIHRoZSBwb2ludFxuXHQgKiBkZWZpbmVkIGJ5IHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSByZWN0YW5nbGUuIFRoZXkgYXJlIG5vdCBjZW50ZXJlZFxuXHQgKiBhcm91bmQgdGhlIG9yaWdpbiwgYnV0IHVzZSB0aGUgb3JpZ2luIHRvIGRlZmluZSB0aGUgdXBwZXItbGVmdCBjb3JuZXIgb2Zcblx0ICogdGhlIGFyZWEuIEEgc2Nyb2xsZWQgZGlzcGxheSBvYmplY3QgYWx3YXlzIHNjcm9sbHMgaW4gd2hvbGUgcGl4ZWxcblx0ICogaW5jcmVtZW50cy4gPC9wPlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIHNjcm9sbCBhbiBvYmplY3QgbGVmdCBhbmQgcmlnaHQgYnkgc2V0dGluZyB0aGUgPGNvZGU+eDwvY29kZT5cblx0ICogcHJvcGVydHkgb2YgdGhlIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IFJlY3RhbmdsZSBvYmplY3QuIFlvdSBjYW4gc2Nyb2xsXG5cdCAqIGFuIG9iamVjdCB1cCBhbmQgZG93biBieSBzZXR0aW5nIHRoZSA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGVcblx0ICogPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gUmVjdGFuZ2xlIG9iamVjdC4gSWYgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIHJvdGF0ZWRcblx0ICogOTDCsCBhbmQgeW91IHNjcm9sbCBpdCBsZWZ0IGFuZCByaWdodCwgdGhlIGRpc3BsYXkgb2JqZWN0IGFjdHVhbGx5IHNjcm9sbHNcblx0ICogdXAgYW5kIGRvd24uPC9wPlxuXHQgKi9cblx0cHVibGljIHNjcm9sbFJlY3Q6UmVjdGFuZ2xlO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBzaGFkZXJQaWNraW5nRGV0YWlscygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9zaGFkZXJQaWNraW5nRGV0YWlscztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBib3VuZHNWaXNpYmxlKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kc1Zpc2libGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJvdW5kc1Zpc2libGUodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9ib3VuZHNWaXNpYmxlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYm91bmRzVmlzaWJsZSA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcGFydGl0aW9uTm9kZS5ib3VuZHNWaXNpYmxlID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQW4gb2JqZWN0IHdpdGggcHJvcGVydGllcyBwZXJ0YWluaW5nIHRvIGEgZGlzcGxheSBvYmplY3QncyBtYXRyaXgsIGNvbG9yXG5cdCAqIHRyYW5zZm9ybSwgYW5kIHBpeGVsIGJvdW5kcy4gVGhlIHNwZWNpZmljIHByb3BlcnRpZXMgIC0gIG1hdHJpeCxcblx0ICogY29sb3JUcmFuc2Zvcm0sIGFuZCB0aHJlZSByZWFkLW9ubHkgcHJvcGVydGllc1xuXHQgKiAoPGNvZGU+Y29uY2F0ZW5hdGVkTWF0cml4PC9jb2RlPiwgPGNvZGU+Y29uY2F0ZW5hdGVkQ29sb3JUcmFuc2Zvcm08L2NvZGU+LFxuXHQgKiBhbmQgPGNvZGU+cGl4ZWxCb3VuZHM8L2NvZGU+KSAgLSAgYXJlIGRlc2NyaWJlZCBpbiB0aGUgZW50cnkgZm9yIHRoZVxuXHQgKiBUcmFuc2Zvcm0gY2xhc3MuXG5cdCAqXG5cdCAqIDxwPkVhY2ggb2YgdGhlIHRyYW5zZm9ybSBvYmplY3QncyBwcm9wZXJ0aWVzIGlzIGl0c2VsZiBhbiBvYmplY3QuIFRoaXNcblx0ICogY29uY2VwdCBpcyBpbXBvcnRhbnQgYmVjYXVzZSB0aGUgb25seSB3YXkgdG8gc2V0IG5ldyB2YWx1ZXMgZm9yIHRoZSBtYXRyaXhcblx0ICogb3IgY29sb3JUcmFuc2Zvcm0gb2JqZWN0cyBpcyB0byBjcmVhdGUgYSBuZXcgb2JqZWN0IGFuZCBjb3B5IHRoYXQgb2JqZWN0XG5cdCAqIGludG8gdGhlIHRyYW5zZm9ybS5tYXRyaXggb3IgdHJhbnNmb3JtLmNvbG9yVHJhbnNmb3JtIHByb3BlcnR5LjwvcD5cblx0ICpcblx0ICogPHA+Rm9yIGV4YW1wbGUsIHRvIGluY3JlYXNlIHRoZSA8Y29kZT50eDwvY29kZT4gdmFsdWUgb2YgYSBkaXNwbGF5XG5cdCAqIG9iamVjdCdzIG1hdHJpeCwgeW91IG11c3QgbWFrZSBhIGNvcHkgb2YgdGhlIGVudGlyZSBtYXRyaXggb2JqZWN0LCB0aGVuXG5cdCAqIGNvcHkgdGhlIG5ldyBvYmplY3QgaW50byB0aGUgbWF0cml4IHByb3BlcnR5IG9mIHRoZSB0cmFuc2Zvcm0gb2JqZWN0OjwvcD5cblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPjxjb2RlPiBwdWJsaWMgbXlNYXRyaXg6TWF0cml4ID1cblx0ICogbXlEaXNwbGF5T2JqZWN0LnRyYW5zZm9ybS5tYXRyaXg7IG15TWF0cml4LnR4ICs9IDEwO1xuXHQgKiBteURpc3BsYXlPYmplY3QudHJhbnNmb3JtLm1hdHJpeCA9IG15TWF0cml4OyA8L2NvZGU+PC9wcmU+XG5cdCAqXG5cdCAqIDxwPllvdSBjYW5ub3QgZGlyZWN0bHkgc2V0IHRoZSA8Y29kZT50eDwvY29kZT4gcHJvcGVydHkuIFRoZSBmb2xsb3dpbmdcblx0ICogY29kZSBoYXMgbm8gZWZmZWN0IG9uIDxjb2RlPm15RGlzcGxheU9iamVjdDwvY29kZT46IDwvcD5cblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPjxjb2RlPiBteURpc3BsYXlPYmplY3QudHJhbnNmb3JtLm1hdHJpeC50eCArPVxuXHQgKiAxMDsgPC9jb2RlPjwvcHJlPlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIGFsc28gY29weSBhbiBlbnRpcmUgdHJhbnNmb3JtIG9iamVjdCBhbmQgYXNzaWduIGl0IHRvIGFub3RoZXJcblx0ICogZGlzcGxheSBvYmplY3QncyB0cmFuc2Zvcm0gcHJvcGVydHkuIEZvciBleGFtcGxlLCB0aGUgZm9sbG93aW5nIGNvZGVcblx0ICogY29waWVzIHRoZSBlbnRpcmUgdHJhbnNmb3JtIG9iamVjdCBmcm9tIDxjb2RlPm15T2xkRGlzcGxheU9iajwvY29kZT4gdG9cblx0ICogPGNvZGU+bXlOZXdEaXNwbGF5T2JqPC9jb2RlPjo8L3A+XG5cdCAqIDxjb2RlPm15TmV3RGlzcGxheU9iai50cmFuc2Zvcm0gPSBteU9sZERpc3BsYXlPYmoudHJhbnNmb3JtOzwvY29kZT5cblx0ICpcblx0ICogPHA+VGhlIHJlc3VsdGluZyBkaXNwbGF5IG9iamVjdCwgPGNvZGU+bXlOZXdEaXNwbGF5T2JqPC9jb2RlPiwgbm93IGhhcyB0aGVcblx0ICogc2FtZSB2YWx1ZXMgZm9yIGl0cyBtYXRyaXgsIGNvbG9yIHRyYW5zZm9ybSwgYW5kIHBpeGVsIGJvdW5kcyBhcyB0aGUgb2xkXG5cdCAqIGRpc3BsYXkgb2JqZWN0LCA8Y29kZT5teU9sZERpc3BsYXlPYmo8L2NvZGU+LjwvcD5cblx0ICpcblx0ICogPHA+Tm90ZSB0aGF0IEFJUiBmb3IgVFYgZGV2aWNlcyB1c2UgaGFyZHdhcmUgYWNjZWxlcmF0aW9uLCBpZiBpdCBpc1xuXHQgKiBhdmFpbGFibGUsIGZvciBjb2xvciB0cmFuc2Zvcm1zLjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgdHJhbnNmb3JtKCk6VHJhbnNmb3JtXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdHJhbnNmb3JtO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgb3Igbm90IHRoZSBkaXNwbGF5IG9iamVjdCBpcyB2aXNpYmxlLiBEaXNwbGF5IG9iamVjdHMgdGhhdCBhcmUgbm90XG5cdCAqIHZpc2libGUgYXJlIGRpc2FibGVkLiBGb3IgZXhhbXBsZSwgaWYgPGNvZGU+dmlzaWJsZT1mYWxzZTwvY29kZT4gZm9yIGFuXG5cdCAqIEludGVyYWN0aXZlT2JqZWN0IGluc3RhbmNlLCBpdCBjYW5ub3QgYmUgY2xpY2tlZC5cblx0ICovXG5cdHB1YmxpYyBnZXQgdmlzaWJsZSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9leHBsaWNpdFZpc2liaWxpdHk7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHZpc2libGUodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9leHBsaWNpdFZpc2liaWxpdHkgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9leHBsaWNpdFZpc2liaWxpdHkgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodGhpcy5fcFBhcmVudD8gdGhpcy5fcFBhcmVudC5faUlzVmlzaWJsZSgpIDogdHJ1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB3aWR0aCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy4gVGhlIHdpZHRoIGlzXG5cdCAqIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGJvdW5kcyBvZiB0aGUgY29udGVudCBvZiB0aGUgZGlzcGxheSBvYmplY3QuIFdoZW5cblx0ICogeW91IHNldCB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IHByb3BlcnR5LCB0aGUgPGNvZGU+c2NhbGVYPC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiBpcyBhZGp1c3RlZCBhY2NvcmRpbmdseSwgYXMgc2hvd24gaW4gdGhlIGZvbGxvd2luZyBjb2RlOlxuXHQgKlxuXHQgKiA8cD5FeGNlcHQgZm9yIFRleHRGaWVsZCBhbmQgVmlkZW8gb2JqZWN0cywgYSBkaXNwbGF5IG9iamVjdCB3aXRoIG5vXG5cdCAqIGNvbnRlbnQoc3VjaCBhcyBhbiBlbXB0eSBzcHJpdGUpIGhhcyBhIHdpZHRoIG9mIDAsIGV2ZW4gaWYgeW91IHRyeSB0byBzZXRcblx0ICogPGNvZGU+d2lkdGg8L2NvZGU+IHRvIGEgZGlmZmVyZW50IHZhbHVlLjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTpudW1iZXJcblx0e1xuXHRcdGlmICh0aGlzLl9wQm91bmRzSW52YWxpZClcblx0XHRcdHRoaXMucFVwZGF0ZUJvdW5kcygpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3dpZHRoO1xuXHR9XG5cblx0cHVibGljIHNldCB3aWR0aCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3dpZHRoID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3dpZHRoID09IHZhbDtcblxuXHRcdHRoaXMuX3BTY2FsZVggPSB2YWwvdGhpcy5ib3VuZHMuYWFiYi53aWR0aDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgd29ybGRCb3VuZHMoKTpCb3VuZGluZ1ZvbHVtZUJhc2Vcblx0e1xuXHRcdC8vIFNpbmNlIHRoaXMgZ2V0dGVyIGlzIGludm9rZWQgZXZlcnkgaXRlcmF0aW9uIG9mIHRoZSByZW5kZXIgbG9vcCwgYW5kXG5cdFx0Ly8gdGhlIHByZWZhYiBjb25zdHJ1Y3QgY291bGQgYWZmZWN0IHRoZSBib3VuZHMgb2YgdGhlIGVudGl0eSwgdGhlIHByZWZhYiBpc1xuXHRcdC8vIHZhbGlkYXRlZCBoZXJlIHRvIGdpdmUgaXQgYSBjaGFuY2UgdG8gcmVidWlsZC5cblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xuXG5cdFx0aWYgKHRoaXMuX3dvcmxkQm91bmRzSW52YWxpZCkge1xuXHRcdFx0dGhpcy5fd29ybGRCb3VuZHNJbnZhbGlkID0gZmFsc2U7XG5cdFx0XHR0aGlzLl93b3JsZEJvdW5kcy50cmFuc2Zvcm1Gcm9tKHRoaXMuYm91bmRzLCB0aGlzLnNjZW5lVHJhbnNmb3JtKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5fd29ybGRCb3VuZHM7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHJlbGF0aXZlXG5cdCAqIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IERpc3BsYXlPYmplY3RDb250YWluZXIuIElmIHRoZVxuXHQgKiBvYmplY3QgaXMgaW5zaWRlIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciB0aGF0IGhhcyB0cmFuc2Zvcm1hdGlvbnMsIGl0IGlzXG5cdCAqIGluIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBvZiB0aGUgZW5jbG9zaW5nIERpc3BsYXlPYmplY3RDb250YWluZXIuXG5cdCAqIFRodXMsIGZvciBhIERpc3BsYXlPYmplY3RDb250YWluZXIgcm90YXRlZCA5MMKwIGNvdW50ZXJjbG9ja3dpc2UsIHRoZVxuXHQgKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyJ3MgY2hpbGRyZW4gaW5oZXJpdCBhIGNvb3JkaW5hdGUgc3lzdGVtIHRoYXQgaXNcblx0ICogcm90YXRlZCA5MMKwIGNvdW50ZXJjbG9ja3dpc2UuIFRoZSBvYmplY3QncyBjb29yZGluYXRlcyByZWZlciB0byB0aGVcblx0ICogcmVnaXN0cmF0aW9uIHBvaW50IHBvc2l0aW9uLlxuXHQgKi9cblx0cHVibGljIGdldCB4KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5feDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgeCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3ggPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5feCA9IHZhbDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSA8aT55PC9pPiBjb29yZGluYXRlIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHJlbGF0aXZlXG5cdCAqIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IERpc3BsYXlPYmplY3RDb250YWluZXIuIElmIHRoZVxuXHQgKiBvYmplY3QgaXMgaW5zaWRlIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciB0aGF0IGhhcyB0cmFuc2Zvcm1hdGlvbnMsIGl0IGlzXG5cdCAqIGluIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBvZiB0aGUgZW5jbG9zaW5nIERpc3BsYXlPYmplY3RDb250YWluZXIuXG5cdCAqIFRodXMsIGZvciBhIERpc3BsYXlPYmplY3RDb250YWluZXIgcm90YXRlZCA5MMKwIGNvdW50ZXJjbG9ja3dpc2UsIHRoZVxuXHQgKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyJ3MgY2hpbGRyZW4gaW5oZXJpdCBhIGNvb3JkaW5hdGUgc3lzdGVtIHRoYXQgaXNcblx0ICogcm90YXRlZCA5MMKwIGNvdW50ZXJjbG9ja3dpc2UuIFRoZSBvYmplY3QncyBjb29yZGluYXRlcyByZWZlciB0byB0aGVcblx0ICogcmVnaXN0cmF0aW9uIHBvaW50IHBvc2l0aW9uLlxuXHQgKi9cblx0cHVibGljIGdldCB5KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5feTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgeSh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3kgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5feSA9IHZhbDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB6IGNvb3JkaW5hdGUgcG9zaXRpb24gYWxvbmcgdGhlIHotYXhpcyBvZiB0aGUgRGlzcGxheU9iamVjdFxuXHQgKiBpbnN0YW5jZSByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVGhlIHogcHJvcGVydHkgaXMgdXNlZCBmb3Jcblx0ICogM0QgY29vcmRpbmF0ZXMsIG5vdCBzY3JlZW4gb3IgcGl4ZWwgY29vcmRpbmF0ZXMuXG5cdCAqXG5cdCAqIDxwPldoZW4geW91IHNldCBhIDxjb2RlPno8L2NvZGU+IHByb3BlcnR5IGZvciBhIGRpc3BsYXkgb2JqZWN0IHRvXG5cdCAqIHNvbWV0aGluZyBvdGhlciB0aGFuIHRoZSBkZWZhdWx0IHZhbHVlIG9mIDxjb2RlPjA8L2NvZGU+LCBhIGNvcnJlc3BvbmRpbmdcblx0ICogTWF0cml4M0Qgb2JqZWN0IGlzIGF1dG9tYXRpY2FsbHkgY3JlYXRlZC4gZm9yIGFkanVzdGluZyBhIGRpc3BsYXkgb2JqZWN0J3Ncblx0ICogcG9zaXRpb24gYW5kIG9yaWVudGF0aW9uIGluIHRocmVlIGRpbWVuc2lvbnMuIFdoZW4gd29ya2luZyB3aXRoIHRoZVxuXHQgKiB6LWF4aXMsIHRoZSBleGlzdGluZyBiZWhhdmlvciBvZiB4IGFuZCB5IHByb3BlcnRpZXMgY2hhbmdlcyBmcm9tIHNjcmVlbiBvclxuXHQgKiBwaXhlbCBjb29yZGluYXRlcyB0byBwb3NpdGlvbnMgcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuPC9wPlxuXHQgKlxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgYSBjaGlsZCBvZiB0aGUgPGNvZGU+X3Jvb3Q8L2NvZGU+IGF0IHBvc2l0aW9uIHggPSAxMDAsIHkgPVxuXHQgKiAxMDAsIHogPSAyMDAgaXMgbm90IGRyYXduIGF0IHBpeGVsIGxvY2F0aW9uKDEwMCwxMDApLiBUaGUgY2hpbGQgaXMgZHJhd25cblx0ICogd2hlcmV2ZXIgdGhlIDNEIHByb2plY3Rpb24gY2FsY3VsYXRpb24gcHV0cyBpdC4gVGhlIGNhbGN1bGF0aW9uIGlzOjwvcD5cblx0ICpcblx0ICogPHA+PGNvZGU+KHh+fmNhbWVyYUZvY2FsTGVuZ3RoL2NhbWVyYVJlbGF0aXZlWlBvc2l0aW9uLFxuXHQgKiB5fn5jYW1lcmFGb2NhbExlbmd0aC9jYW1lcmFSZWxhdGl2ZVpQb3NpdGlvbik8L2NvZGU+PC9wPlxuXHQgKi9cblx0cHVibGljIGdldCB6KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fejtcblx0fVxuXG5cdHB1YmxpYyBzZXQgeih2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3ogPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5feiA9IHZhbDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgek9mZnNldCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3pPZmZzZXQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHpPZmZzZXQodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fek9mZnNldCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgPGNvZGU+RGlzcGxheU9iamVjdDwvY29kZT4gaW5zdGFuY2UuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0Ly8gQ2FjaGVkIHZlY3RvciBvZiB0cmFuc2Zvcm1hdGlvbiBjb21wb25lbnRzIHVzZWQgd2hlblxuXHRcdC8vIHJlY29tcG9zaW5nIHRoZSB0cmFuc2Zvcm0gbWF0cml4IGluIHVwZGF0ZVRyYW5zZm9ybSgpXG5cblx0XHR0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzID0gbmV3IEFycmF5PFZlY3RvcjNEPigzKTsvL190cmFuc2Zvcm1Db21wb25lbnRzID0gbmV3IFZlY3Rvci48VmVjdG9yM0Q+KDMsIHRydWUpO1xuXG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50c1swXSA9IHRoaXMuX3Bvcztcblx0XHR0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzWzFdID0gdGhpcy5fcm90O1xuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHNbMl0gPSB0aGlzLl9zY2E7XG5cblx0XHQvL2NyZWF0aW9uIG9mIGFzc29jaWF0ZWQgdHJhbnNmb3JtIG9iamVjdFxuXHRcdHRoaXMuX3RyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0odGhpcyk7XG5cblx0XHR0aGlzLl9tYXRyaXgzRC5pZGVudGl0eSgpO1xuXG5cdFx0dGhpcy5fZmxpcFkuYXBwZW5kU2NhbGUoMSwgLTEsIDEpO1xuXG5cdFx0dGhpcy5fcEJvdW5kcyA9IHRoaXMucENyZWF0ZURlZmF1bHRCb3VuZGluZ1ZvbHVtZSgpO1xuXG5cdFx0dGhpcy5fd29ybGRCb3VuZHMgPSB0aGlzLnBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTpzdHJpbmcsIGxpc3RlbmVyOkZ1bmN0aW9uKVxuXHR7XG5cdFx0c3VwZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG5cblx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlBPU0lUSU9OX0NIQU5HRUQ6XG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VEOlxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuU0NBTEVfQ0hBTkdFRDpcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9TY2FsZUNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHZhciBjbG9uZTpEaXNwbGF5T2JqZWN0ID0gbmV3IERpc3BsYXlPYmplY3QoKTtcblx0XHRjbG9uZS5waXZvdCA9IHRoaXMucGl2b3Q7XG5cdFx0Y2xvbmUuX2lNYXRyaXgzRCA9IHRoaXMuX2lNYXRyaXgzRDtcblx0XHRjbG9uZS5uYW1lID0gbmFtZTtcblxuXHRcdC8vIHRvZG86IGltcGxlbWVudCBmb3IgYWxsIHN1YnR5cGVzXG5cdFx0cmV0dXJuIGNsb25lO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHRpZiAodGhpcy5wYXJlbnQpXG5cdFx0XHR0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcblxuXHRcdHdoaWxlICh0aGlzLl9wUmVuZGVyYWJsZXMubGVuZ3RoKVxuXHRcdFx0dGhpcy5fcFJlbmRlcmFibGVzWzBdLmRpc3Bvc2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGRpc3Bvc2VBc3NldCgpXG5cdHtcblx0XHR0aGlzLmRpc3Bvc2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYXJlYSBvZiB0aGUgZGlzcGxheSBvYmplY3QgcmVsYXRpdmVcblx0ICogdG8gdGhlIGNvb3JkaW5hdGUgc3lzdGVtIG9mIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IG9iamVjdC5cblx0ICogQ29uc2lkZXIgdGhlIGZvbGxvd2luZyBjb2RlLCB3aGljaCBzaG93cyBob3cgdGhlIHJlY3RhbmdsZSByZXR1cm5lZCBjYW5cblx0ICogdmFyeSBkZXBlbmRpbmcgb24gdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gcGFyYW1ldGVyIHRoYXRcblx0ICogeW91IHBhc3MgdG8gdGhlIG1ldGhvZDpcblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFVzZSB0aGUgPGNvZGU+bG9jYWxUb0dsb2JhbCgpPC9jb2RlPiBhbmRcblx0ICogPGNvZGU+Z2xvYmFsVG9Mb2NhbCgpPC9jb2RlPiBtZXRob2RzIHRvIGNvbnZlcnQgdGhlIGRpc3BsYXkgb2JqZWN0J3MgbG9jYWxcblx0ICogY29vcmRpbmF0ZXMgdG8gZGlzcGxheSBjb29yZGluYXRlcywgb3IgZGlzcGxheSBjb29yZGluYXRlcyB0byBsb2NhbFxuXHQgKiBjb29yZGluYXRlcywgcmVzcGVjdGl2ZWx5LjwvcD5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPmdldEJvdW5kcygpPC9jb2RlPiBtZXRob2QgaXMgc2ltaWxhciB0byB0aGVcblx0ICogPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2Q7IGhvd2V2ZXIsIHRoZSBSZWN0YW5nbGUgcmV0dXJuZWQgYnkgdGhlXG5cdCAqIDxjb2RlPmdldEJvdW5kcygpPC9jb2RlPiBtZXRob2QgaW5jbHVkZXMgYW55IHN0cm9rZXMgb24gc2hhcGVzLCB3aGVyZWFzXG5cdCAqIHRoZSBSZWN0YW5nbGUgcmV0dXJuZWQgYnkgdGhlIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kIGRvZXMgbm90LiBGb3Jcblx0ICogYW4gZXhhbXBsZSwgc2VlIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2QuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gdGFyZ2V0Q29vcmRpbmF0ZVNwYWNlIFRoZSBkaXNwbGF5IG9iamVjdCB0aGF0IGRlZmluZXMgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZSBzeXN0ZW0gdG8gdXNlLlxuXHQgKiBAcmV0dXJuIFRoZSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZSBkaXNwbGF5IG9iamVjdCByZWxhdGl2ZVxuXHQgKiAgICAgICAgIHRvIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IG9iamVjdCdzIGNvb3JkaW5hdGVcblx0ICogICAgICAgICBzeXN0ZW0uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0Qm91bmRzKHRhcmdldENvb3JkaW5hdGVTcGFjZTpEaXNwbGF5T2JqZWN0KTpSZWN0YW5nbGVcblx0e1xuXHRcdHJldHVybiB0aGlzLl9ib3VuZHM7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBib3VuZGFyeSBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGJhc2VkXG5cdCAqIG9uIHRoZSBjb29yZGluYXRlIHN5c3RlbSBkZWZpbmVkIGJ5IHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+XG5cdCAqIHBhcmFtZXRlciwgZXhjbHVkaW5nIGFueSBzdHJva2VzIG9uIHNoYXBlcy4gVGhlIHZhbHVlcyB0aGF0IHRoZVxuXHQgKiA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZCByZXR1cm5zIGFyZSB0aGUgc2FtZSBvciBzbWFsbGVyIHRoYW4gdGhvc2Vcblx0ICogcmV0dXJuZWQgYnkgdGhlIDxjb2RlPmdldEJvdW5kcygpPC9jb2RlPiBtZXRob2QuXG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBVc2UgPGNvZGU+bG9jYWxUb0dsb2JhbCgpPC9jb2RlPiBhbmRcblx0ICogPGNvZGU+Z2xvYmFsVG9Mb2NhbCgpPC9jb2RlPiBtZXRob2RzIHRvIGNvbnZlcnQgdGhlIGRpc3BsYXkgb2JqZWN0J3MgbG9jYWxcblx0ICogY29vcmRpbmF0ZXMgdG8gU3RhZ2UgY29vcmRpbmF0ZXMsIG9yIFN0YWdlIGNvb3JkaW5hdGVzIHRvIGxvY2FsXG5cdCAqIGNvb3JkaW5hdGVzLCByZXNwZWN0aXZlbHkuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gdGFyZ2V0Q29vcmRpbmF0ZVNwYWNlIFRoZSBkaXNwbGF5IG9iamVjdCB0aGF0IGRlZmluZXMgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZSBzeXN0ZW0gdG8gdXNlLlxuXHQgKiBAcmV0dXJuIFRoZSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZSBkaXNwbGF5IG9iamVjdCByZWxhdGl2ZVxuXHQgKiAgICAgICAgIHRvIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IG9iamVjdCdzIGNvb3JkaW5hdGVcblx0ICogICAgICAgICBzeXN0ZW0uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0UmVjdCh0YXJnZXRDb29yZGluYXRlU3BhY2U6RGlzcGxheU9iamVjdCk6UmVjdGFuZ2xlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzOyAvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyB0aGUgPGNvZGU+cG9pbnQ8L2NvZGU+IG9iamVjdCBmcm9tIHRoZSBTdGFnZShnbG9iYWwpIGNvb3JkaW5hdGVzXG5cdCAqIHRvIHRoZSBkaXNwbGF5IG9iamVjdCdzKGxvY2FsKSBjb29yZGluYXRlcy5cblx0ICpcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcblx0ICogPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHlvdSBhc3NpZ24gcmVwcmVzZW50IGdsb2JhbCBjb29yZGluYXRlc1xuXHQgKiBiZWNhdXNlIHRoZXkgcmVsYXRlIHRvIHRoZSBvcmlnaW4oMCwwKSBvZiB0aGUgbWFpbiBkaXNwbGF5IGFyZWEuIFRoZW5cblx0ICogcGFzcyB0aGUgUG9pbnQgaW5zdGFuY2UgYXMgdGhlIHBhcmFtZXRlciB0byB0aGVcblx0ICogPGNvZGU+Z2xvYmFsVG9Mb2NhbCgpPC9jb2RlPiBtZXRob2QuIFRoZSBtZXRob2QgcmV0dXJucyBhIG5ldyBQb2ludCBvYmplY3Rcblx0ICogd2l0aCA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXlcblx0ICogb2JqZWN0IGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgU3RhZ2UuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9pbnQgQW4gb2JqZWN0IGNyZWF0ZWQgd2l0aCB0aGUgUG9pbnQgY2xhc3MuIFRoZSBQb2ludCBvYmplY3Rcblx0ICogICAgICAgICAgICAgIHNwZWNpZmllcyB0aGUgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IGNvb3JkaW5hdGVzIGFzXG5cdCAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzLlxuXHQgKiBAcmV0dXJuIEEgUG9pbnQgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmUgdG8gdGhlIGRpc3BsYXkgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGdsb2JhbFRvTG9jYWwocG9pbnQ6UG9pbnQpOlBvaW50XG5cdHtcblx0XHRyZXR1cm4gcG9pbnQ7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgdHdvLWRpbWVuc2lvbmFsIHBvaW50IGZyb20gdGhlIFN0YWdlKGdsb2JhbCkgY29vcmRpbmF0ZXMgdG8gYVxuXHQgKiB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5IG9iamVjdCdzKGxvY2FsKSBjb29yZGluYXRlcy5cblx0ICpcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGUgeFxuXHQgKiBhbmQgeSB2YWx1ZXMgdGhhdCB5b3UgYXNzaWduIHRvIHRoZSBQb2ludCBvYmplY3QgcmVwcmVzZW50IGdsb2JhbFxuXHQgKiBjb29yZGluYXRlcyBiZWNhdXNlIHRoZXkgYXJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4oMCwwKSBvZiB0aGUgbWFpblxuXHQgKiBkaXNwbGF5IGFyZWEuIFRoZW4gcGFzcyB0aGUgUG9pbnQgb2JqZWN0IHRvIHRoZVxuXHQgKiA8Y29kZT5nbG9iYWxUb0xvY2FsM0QoKTwvY29kZT4gbWV0aG9kIGFzIHRoZSA8Y29kZT5wb2ludDwvY29kZT4gcGFyYW1ldGVyLlxuXHQgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhyZWUtZGltZW5zaW9uYWwgY29vcmRpbmF0ZXMgYXMgYSBWZWN0b3IzRCBvYmplY3Rcblx0ICogY29udGFpbmluZyA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIGFuZCA8Y29kZT56PC9jb2RlPiB2YWx1ZXMgdGhhdFxuXHQgKiBhcmUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbiBvZiB0aGUgdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheSBvYmplY3QuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9pbnQgQSB0d28gZGltZW5zaW9uYWwgUG9pbnQgb2JqZWN0IHJlcHJlc2VudGluZyBnbG9iYWwgeCBhbmQgeVxuXHQgKiAgICAgICAgICAgICAgY29vcmRpbmF0ZXMuXG5cdCAqIEByZXR1cm4gQSBWZWN0b3IzRCBvYmplY3Qgd2l0aCBjb29yZGluYXRlcyByZWxhdGl2ZSB0byB0aGVcblx0ICogICAgICAgICB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBnbG9iYWxUb0xvY2FsM0QocG9pbnQ6UG9pbnQpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gbmV3IFZlY3RvcjNEKCk7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIEV2YWx1YXRlcyB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBkaXNwbGF5IG9iamVjdCB0byBzZWUgaWYgaXQgb3ZlcmxhcHMgb3Jcblx0ICogaW50ZXJzZWN0cyB3aXRoIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIDxjb2RlPm9iajwvY29kZT4gZGlzcGxheSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBvYmogVGhlIGRpc3BsYXkgb2JqZWN0IHRvIHRlc3QgYWdhaW5zdC5cblx0ICogQHJldHVybiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgYm91bmRpbmcgYm94ZXMgb2YgdGhlIGRpc3BsYXkgb2JqZWN0c1xuXHQgKiAgICAgICAgIGludGVyc2VjdDsgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cblx0ICovXG5cdHB1YmxpYyBoaXRUZXN0T2JqZWN0KG9iajpEaXNwbGF5T2JqZWN0KTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gZmFsc2U7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIEV2YWx1YXRlcyB0aGUgZGlzcGxheSBvYmplY3QgdG8gc2VlIGlmIGl0IG92ZXJsYXBzIG9yIGludGVyc2VjdHMgd2l0aCB0aGVcblx0ICogcG9pbnQgc3BlY2lmaWVkIGJ5IHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcGFyYW1ldGVycy4gVGhlXG5cdCAqIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwYXJhbWV0ZXJzIHNwZWNpZnkgYSBwb2ludCBpbiB0aGVcblx0ICogY29vcmRpbmF0ZSBzcGFjZSBvZiB0aGUgU3RhZ2UsIG5vdCB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHRoYXRcblx0ICogY29udGFpbnMgdGhlIGRpc3BsYXkgb2JqZWN0KHVubGVzcyB0aGF0IGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBpcyB0aGVcblx0ICogU3RhZ2UpLlxuXHQgKlxuXHQgKiBAcGFyYW0geCAgICAgICAgIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIHRvIHRlc3QgYWdhaW5zdCB0aGlzIG9iamVjdC5cblx0ICogQHBhcmFtIHkgICAgICAgICBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSB0byB0ZXN0IGFnYWluc3QgdGhpcyBvYmplY3QuXG5cdCAqIEBwYXJhbSBzaGFwZUZsYWcgV2hldGhlciB0byBjaGVjayBhZ2FpbnN0IHRoZSBhY3R1YWwgcGl4ZWxzIG9mIHRoZSBvYmplY3Rcblx0ICogICAgICAgICAgICAgICAgICg8Y29kZT50cnVlPC9jb2RlPikgb3IgdGhlIGJvdW5kaW5nIGJveFxuXHQgKiAgICAgICAgICAgICAgICAgKDxjb2RlPmZhbHNlPC9jb2RlPikuXG5cdCAqIEByZXR1cm4gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIGRpc3BsYXkgb2JqZWN0IG92ZXJsYXBzIG9yIGludGVyc2VjdHNcblx0ICogICAgICAgICB3aXRoIHRoZSBzcGVjaWZpZWQgcG9pbnQ7IDxjb2RlPmZhbHNlPC9jb2RlPiBvdGhlcndpc2UuXG5cdCAqL1xuXHRwdWJsaWMgaGl0VGVzdFBvaW50KHg6bnVtYmVyLCB5Om51bWJlciwgc2hhcGVGbGFnOmJvb2xlYW4gPSBmYWxzZSk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIGZhbHNlOyAvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGlzSW50ZXJzZWN0aW5nUmF5KHJheVBvc2l0aW9uOlZlY3RvcjNELCByYXlEaXJlY3Rpb246VmVjdG9yM0QpOmJvb2xlYW5cblx0e1xuXHRcdHZhciBsb2NhbFJheVBvc2l0aW9uOlZlY3RvcjNEID0gdGhpcy5pbnZlcnNlU2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHJheVBvc2l0aW9uKTtcblx0XHR2YXIgbG9jYWxSYXlEaXJlY3Rpb246VmVjdG9yM0QgPSB0aGlzLmludmVyc2VTY2VuZVRyYW5zZm9ybS5kZWx0YVRyYW5zZm9ybVZlY3RvcihyYXlEaXJlY3Rpb24pO1xuXHRcdHZhciBwaWNraW5nQ29sbGlzaW9uVk86UGlja2luZ0NvbGxpc2lvblZPID0gdGhpcy5faVBpY2tpbmdDb2xsaXNpb25WTztcblxuXHRcdGlmICghcGlja2luZ0NvbGxpc2lvblZPLmxvY2FsTm9ybWFsKVxuXHRcdFx0cGlja2luZ0NvbGxpc2lvblZPLmxvY2FsTm9ybWFsID0gbmV3IFZlY3RvcjNEKCk7XG5cblx0XHR2YXIgcmF5RW50cnlEaXN0YW5jZTpudW1iZXIgPSB0aGlzLmJvdW5kcy5yYXlJbnRlcnNlY3Rpb24obG9jYWxSYXlQb3NpdGlvbiwgbG9jYWxSYXlEaXJlY3Rpb24sIHBpY2tpbmdDb2xsaXNpb25WTy5sb2NhbE5vcm1hbCk7XG5cblx0XHRpZiAocmF5RW50cnlEaXN0YW5jZSA8IDApXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRwaWNraW5nQ29sbGlzaW9uVk8ucmF5RW50cnlEaXN0YW5jZSA9IHJheUVudHJ5RGlzdGFuY2U7XG5cdFx0cGlja2luZ0NvbGxpc2lvblZPLmxvY2FsUmF5UG9zaXRpb24gPSBsb2NhbFJheVBvc2l0aW9uO1xuXHRcdHBpY2tpbmdDb2xsaXNpb25WTy5sb2NhbFJheURpcmVjdGlvbiA9IGxvY2FsUmF5RGlyZWN0aW9uO1xuXHRcdHBpY2tpbmdDb2xsaXNpb25WTy5yYXlQb3NpdGlvbiA9IHJheVBvc2l0aW9uO1xuXHRcdHBpY2tpbmdDb2xsaXNpb25WTy5yYXlEaXJlY3Rpb24gPSByYXlEaXJlY3Rpb247XG5cdFx0cGlja2luZ0NvbGxpc2lvblZPLnJheU9yaWdpbklzSW5zaWRlQm91bmRzID0gcmF5RW50cnlEaXN0YW5jZSA9PSAwO1xuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSB0aHJlZS1kaW1lbnNpb25hbCBwb2ludCBvZiB0aGUgdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheVxuXHQgKiBvYmplY3Qncyhsb2NhbCkgY29vcmRpbmF0ZXMgdG8gYSB0d28tZGltZW5zaW9uYWwgcG9pbnQgaW4gdGhlIFN0YWdlXG5cdCAqIChnbG9iYWwpIGNvb3JkaW5hdGVzLlxuXHQgKlxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgeW91IGNhbiBvbmx5IHVzZSB0d28tZGltZW5zaW9uYWwgY29vcmRpbmF0ZXMoeCx5KSB0byBkcmF3XG5cdCAqIHdpdGggdGhlIDxjb2RlPmRpc3BsYXkuR3JhcGhpY3M8L2NvZGU+IG1ldGhvZHMuIFRvIGRyYXcgYVxuXHQgKiB0aHJlZS1kaW1lbnNpb25hbCBvYmplY3QsIHlvdSBuZWVkIHRvIG1hcCB0aGUgdGhyZWUtZGltZW5zaW9uYWxcblx0ICogY29vcmRpbmF0ZXMgb2YgYSBkaXNwbGF5IG9iamVjdCB0byB0d28tZGltZW5zaW9uYWwgY29vcmRpbmF0ZXMuIEZpcnN0LFxuXHQgKiBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFZlY3RvcjNEIGNsYXNzIHRoYXQgaG9sZHMgdGhlIHgtLCB5LSwgYW5kIHotXG5cdCAqIGNvb3JkaW5hdGVzIG9mIHRoZSB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5IG9iamVjdC4gVGhlbiBwYXNzIHRoZVxuXHQgKiBWZWN0b3IzRCBvYmplY3QgdG8gdGhlIDxjb2RlPmxvY2FsM0RUb0dsb2JhbCgpPC9jb2RlPiBtZXRob2QgYXMgdGhlXG5cdCAqIDxjb2RlPnBvaW50M2Q8L2NvZGU+IHBhcmFtZXRlci4gVGhlIG1ldGhvZCByZXR1cm5zIGEgdHdvLWRpbWVuc2lvbmFsIFBvaW50XG5cdCAqIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHdpdGggdGhlIEdyYXBoaWNzIEFQSSB0byBkcmF3IHRoZVxuXHQgKiB0aHJlZS1kaW1lbnNpb25hbCBvYmplY3QuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9pbnQzZCBBIFZlY3RvcjNEIG9iamVjdCBjb250YWluaW5nIGVpdGhlciBhIHRocmVlLWRpbWVuc2lvbmFsXG5cdCAqICAgICAgICAgICAgICAgIHBvaW50IG9yIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheVxuXHQgKiAgICAgICAgICAgICAgICBvYmplY3QuXG5cdCAqIEByZXR1cm4gQSB0d28tZGltZW5zaW9uYWwgcG9pbnQgcmVwcmVzZW50aW5nIGEgdGhyZWUtZGltZW5zaW9uYWwgcG9pbnQgaW5cblx0ICogICAgICAgICB0d28tZGltZW5zaW9uYWwgc3BhY2UuXG5cdCAqL1xuXHRwdWJsaWMgbG9jYWwzRFRvR2xvYmFsKHBvaW50M2Q6VmVjdG9yM0QpOlBvaW50XG5cdHtcblx0XHRyZXR1cm4gbmV3IFBvaW50KCk7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgdG8gZmFjZSBhIHBvaW50IGRlZmluZWQgcmVsYXRpdmUgdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgPGNvZGU+T2JqZWN0Q29udGFpbmVyM0Q8L2NvZGU+LlxuXHQgKlxuXHQgKiBAcGFyYW0gICAgdGFyZ2V0ICAgICAgICBUaGUgdmVjdG9yIGRlZmluaW5nIHRoZSBwb2ludCB0byBiZSBsb29rZWQgYXRcblx0ICogQHBhcmFtICAgIHVwQXhpcyAgICAgICAgQW4gb3B0aW9uYWwgdmVjdG9yIHVzZWQgdG8gZGVmaW5lIHRoZSBkZXNpcmVkIHVwIG9yaWVudGF0aW9uIG9mIHRoZSAzZCBvYmplY3QgYWZ0ZXIgcm90YXRpb24gaGFzIG9jY3VycmVkXG5cdCAqL1xuXHRwdWJsaWMgbG9va0F0KHRhcmdldDpWZWN0b3IzRCwgdXBBeGlzOlZlY3RvcjNEID0gbnVsbClcblx0e1xuXG5cdFx0dmFyIHlBeGlzOlZlY3RvcjNEO1xuXHRcdHZhciB6QXhpczpWZWN0b3IzRDtcblx0XHR2YXIgeEF4aXM6VmVjdG9yM0Q7XG5cdFx0dmFyIHJhdzpBcnJheTxudW1iZXI+O1xuXG5cdFx0aWYgKHVwQXhpcyA9PSBudWxsKVxuXHRcdFx0dXBBeGlzID0gVmVjdG9yM0QuWV9BWElTO1xuXHRcdGVsc2Vcblx0XHRcdHVwQXhpcy5ub3JtYWxpemUoKTtcblxuXHRcdHpBeGlzID0gdGFyZ2V0LnN1YnRyYWN0KHRoaXMuX2lNYXRyaXgzRC5wb3NpdGlvbik7XG5cdFx0ekF4aXMubm9ybWFsaXplKCk7XG5cblx0XHR4QXhpcyA9IHVwQXhpcy5jcm9zc1Byb2R1Y3QoekF4aXMpO1xuXHRcdHhBeGlzLm5vcm1hbGl6ZSgpO1xuXG5cdFx0aWYgKHhBeGlzLmxlbmd0aCA8IDAuMDUpIHtcblx0XHRcdHhBeGlzLnggPSB1cEF4aXMueTtcblx0XHRcdHhBeGlzLnkgPSB1cEF4aXMueDtcblx0XHRcdHhBeGlzLnogPSAwO1xuXHRcdFx0eEF4aXMubm9ybWFsaXplKCk7XG5cdFx0fVxuXG5cdFx0eUF4aXMgPSB6QXhpcy5jcm9zc1Byb2R1Y3QoeEF4aXMpO1xuXG5cdFx0cmF3ID0gTWF0cml4M0RVdGlscy5SQVdfREFUQV9DT05UQUlORVI7XG5cblx0XHRyYXdbMF0gPSB4QXhpcy54O1xuXHRcdHJhd1sxXSA9IHhBeGlzLnk7XG5cdFx0cmF3WzJdID0geEF4aXMuejtcblx0XHRyYXdbM10gPSAwO1xuXG5cdFx0cmF3WzRdID0geUF4aXMueDtcblx0XHRyYXdbNV0gPSB5QXhpcy55O1xuXHRcdHJhd1s2XSA9IHlBeGlzLno7XG5cdFx0cmF3WzddID0gMDtcblxuXHRcdHJhd1s4XSA9IHpBeGlzLng7XG5cdFx0cmF3WzldID0gekF4aXMueTtcblx0XHRyYXdbMTBdID0gekF4aXMuejtcblx0XHRyYXdbMTFdID0gMDtcblxuXHRcdHZhciBtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cdFx0bS5jb3B5UmF3RGF0YUZyb20ocmF3KTtcblxuXHRcdHZhciB2ZWM6VmVjdG9yM0QgPSBtLmRlY29tcG9zZSgpWzFdO1xuXG5cdFx0dGhpcy5fcm90YXRpb25YID0gdmVjLng7XG5cdFx0dGhpcy5fcm90YXRpb25ZID0gdmVjLnk7XG5cdFx0dGhpcy5fcm90YXRpb25aID0gdmVjLno7XG5cblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIHRoZSA8Y29kZT5wb2ludDwvY29kZT4gb2JqZWN0IGZyb20gdGhlIGRpc3BsYXkgb2JqZWN0J3MobG9jYWwpXG5cdCAqIGNvb3JkaW5hdGVzIHRvIHRoZSBTdGFnZShnbG9iYWwpIGNvb3JkaW5hdGVzLlxuXHQgKlxuXHQgKiA8cD5UaGlzIG1ldGhvZCBhbGxvd3MgeW91IHRvIGNvbnZlcnQgYW55IGdpdmVuIDxpPng8L2k+IGFuZCA8aT55PC9pPlxuXHQgKiBjb29yZGluYXRlcyBmcm9tIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luKDAsMCkgb2YgYVxuXHQgKiBzcGVjaWZpYyBkaXNwbGF5IG9iamVjdChsb2NhbCBjb29yZGluYXRlcykgdG8gdmFsdWVzIHRoYXQgYXJlIHJlbGF0aXZlIHRvXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFN0YWdlKGdsb2JhbCBjb29yZGluYXRlcykuPC9wPlxuXHQgKlxuXHQgKiA8cD5UbyB1c2UgdGhpcyBtZXRob2QsIGZpcnN0IGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9pbnQgY2xhc3MuIFRoZVxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgeW91IGFzc2lnbiByZXByZXNlbnQgbG9jYWwgY29vcmRpbmF0ZXNcblx0ICogYmVjYXVzZSB0aGV5IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdC48L3A+XG5cdCAqXG5cdCAqIDxwPllvdSB0aGVuIHBhc3MgdGhlIFBvaW50IGluc3RhbmNlIHRoYXQgeW91IGNyZWF0ZWQgYXMgdGhlIHBhcmFtZXRlciB0b1xuXHQgKiB0aGUgPGNvZGU+bG9jYWxUb0dsb2JhbCgpPC9jb2RlPiBtZXRob2QuIFRoZSBtZXRob2QgcmV0dXJucyBhIG5ldyBQb2ludFxuXHQgKiBvYmplY3Qgd2l0aCA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlXG5cdCAqIFN0YWdlIGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9pbnQgVGhlIG5hbWUgb3IgaWRlbnRpZmllciBvZiBhIHBvaW50IGNyZWF0ZWQgd2l0aCB0aGUgUG9pbnRcblx0ICogICAgICAgICAgICAgIGNsYXNzLCBzcGVjaWZ5aW5nIHRoZSA8aT54PC9pPiBhbmQgPGk+eTwvaT4gY29vcmRpbmF0ZXMgYXNcblx0ICogICAgICAgICAgICAgIHByb3BlcnRpZXMuXG5cdCAqIEByZXR1cm4gQSBQb2ludCBvYmplY3Qgd2l0aCBjb29yZGluYXRlcyByZWxhdGl2ZSB0byB0aGUgU3RhZ2UuXG5cdCAqL1xuXHRwdWJsaWMgbG9jYWxUb0dsb2JhbChwb2ludDpQb2ludCk6UG9pbnRcblx0e1xuXHRcdHJldHVybiBuZXcgUG9pbnQoKTsgLy9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgdGhlIDNkIG9iamVjdCBkaXJlY3RseSB0byBhIHBvaW50IGluIHNwYWNlXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBkeCAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeCBheGlzLlxuXHQgKiBAcGFyYW0gICAgZHkgICAgICAgIFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgYWxvbmcgdGhlIGxvY2FsIHkgYXhpcy5cblx0ICogQHBhcmFtICAgIGR6ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB6IGF4aXMuXG5cdCAqL1xuXG5cdHB1YmxpYyBtb3ZlVG8oZHg6bnVtYmVyLCBkeTpudW1iZXIsIGR6Om51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl94ID09IGR4ICYmIHRoaXMuX3kgPT0gZHkgJiYgdGhpcy5feiA9PSBkeilcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3ggPSBkeDtcblx0XHR0aGlzLl95ID0gZHk7XG5cdFx0dGhpcy5feiA9IGR6O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyB0aGUgbG9jYWwgcG9pbnQgYXJvdW5kIHdoaWNoIHRoZSBvYmplY3Qgcm90YXRlcy5cblx0ICpcblx0ICogQHBhcmFtICAgIGR4ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB4IGF4aXMuXG5cdCAqIEBwYXJhbSAgICBkeSAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeSBheGlzLlxuXHQgKiBAcGFyYW0gICAgZHogICAgICAgIFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgYWxvbmcgdGhlIGxvY2FsIHogYXhpcy5cblx0ICovXG5cdHB1YmxpYyBtb3ZlUGl2b3QoZHg6bnVtYmVyLCBkeTpudW1iZXIsIGR6Om51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9waXZvdCA9PSBudWxsKVxuXHRcdFx0dGhpcy5fcGl2b3QgPSBuZXcgVmVjdG9yM0QoKTtcblxuXHRcdHRoaXMuX3Bpdm90LnggKz0gZHg7XG5cdFx0dGhpcy5fcGl2b3QueSArPSBkeTtcblx0XHR0aGlzLl9waXZvdC56ICs9IGR6O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUGl2b3QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIGl0J3MgbG9jYWwgeC1heGlzXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBhbmdsZSAgICAgICAgVGhlIGFtb3VudCBvZiByb3RhdGlvbiBpbiBkZWdyZWVzXG5cdCAqL1xuXHRwdWJsaWMgcGl0Y2goYW5nbGU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5yb3RhdGUoVmVjdG9yM0QuWF9BWElTLCBhbmdsZSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXRSZW5kZXJTY2VuZVRyYW5zZm9ybShjYW1lcmE6Q2FtZXJhKTpNYXRyaXgzRFxuXHR7XG5cdFx0aWYgKHRoaXMub3JpZW50YXRpb25Nb2RlID09IE9yaWVudGF0aW9uTW9kZS5DQU1FUkFfUExBTkUpIHtcblx0XHRcdHZhciBjb21wczpBcnJheTxWZWN0b3IzRD4gPSBjYW1lcmEuc2NlbmVUcmFuc2Zvcm0uZGVjb21wb3NlKCk7XG5cdFx0XHR2YXIgc2NhbGU6VmVjdG9yM0QgPSBjb21wc1syXTtcblx0XHRcdGNvbXBzWzBdID0gdGhpcy5zY2VuZVBvc2l0aW9uO1xuXHRcdFx0c2NhbGUueCA9IHRoaXMuX3BTY2FsZVg7XG5cdFx0XHRzY2FsZS55ID0gdGhpcy5fcFNjYWxlWTtcblx0XHRcdHNjYWxlLnogPSB0aGlzLl9wU2NhbGVaO1xuXHRcdFx0dGhpcy5fb3JpZW50YXRpb25NYXRyaXgucmVjb21wb3NlKGNvbXBzKTtcblxuXHRcdFx0Ly9hZGQgaW4gY2FzZSBvZiBwaXZvdFxuXHRcdFx0aWYgKCF0aGlzLl9waXZvdFplcm8gJiYgdGhpcy5hbGlnbm1lbnRNb2RlID09IEFsaWdubWVudE1vZGUuUElWT1RfUE9JTlQpXG5cdFx0XHRcdHRoaXMuX29yaWVudGF0aW9uTWF0cml4LnByZXBlbmRUcmFuc2xhdGlvbigtdGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYLCAtdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZLCAtdGhpcy5fcGl2b3Quei90aGlzLl9wU2NhbGVaKTtcblxuXHRcdFx0cmV0dXJuIHRoaXMuX29yaWVudGF0aW9uTWF0cml4O1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnNjZW5lVHJhbnNmb3JtO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgaXQncyBsb2NhbCB6LWF4aXNcblx0ICpcblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcblx0ICovXG5cdHB1YmxpYyByb2xsKGFuZ2xlOm51bWJlcilcblx0e1xuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELlpfQVhJUywgYW5nbGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgYW4gYXhpcyBieSBhIGRlZmluZWQgYW5nbGVcblx0ICpcblx0ICogQHBhcmFtICAgIGF4aXMgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIGF4aXMgb2Ygcm90YXRpb25cblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcblx0ICovXG5cdHB1YmxpYyByb3RhdGUoYXhpczpWZWN0b3IzRCwgYW5nbGU6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIG06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0XHRtLnByZXBlbmRSb3RhdGlvbihhbmdsZSwgYXhpcyk7XG5cblx0XHR2YXIgdmVjOlZlY3RvcjNEID0gbS5kZWNvbXBvc2UoKVsxXTtcblxuXHRcdHRoaXMuX3JvdGF0aW9uWCArPSB2ZWMueDtcblx0XHR0aGlzLl9yb3RhdGlvblkgKz0gdmVjLnk7XG5cdFx0dGhpcy5fcm90YXRpb25aICs9IHZlYy56O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgZGlyZWN0bHkgdG8gYSBldWxlciBhbmdsZVxuXHQgKlxuXHQgKiBAcGFyYW0gICAgYXggICAgICAgIFRoZSBhbmdsZSBpbiBkZWdyZWVzIG9mIHRoZSByb3RhdGlvbiBhcm91bmQgdGhlIHggYXhpcy5cblx0ICogQHBhcmFtICAgIGF5ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB5IGF4aXMuXG5cdCAqIEBwYXJhbSAgICBheiAgICAgICAgVGhlIGFuZ2xlIGluIGRlZ3JlZXMgb2YgdGhlIHJvdGF0aW9uIGFyb3VuZCB0aGUgeiBheGlzLlxuXHQgKi9cblx0cHVibGljIHJvdGF0ZVRvKGF4Om51bWJlciwgYXk6bnVtYmVyLCBhejpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9yb3RhdGlvblggPSBheCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblx0XHR0aGlzLl9yb3RhdGlvblkgPSBheSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblx0XHR0aGlzLl9yb3RhdGlvblogPSBheipNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBsaXN0ZW5lcjpGdW5jdGlvbilcblx0e1xuXHRcdHN1cGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuXG5cdFx0aWYgKHRoaXMuaGFzRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlBPU0lUSU9OX0NIQU5HRUQ6XG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VEOlxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuU0NBTEVfQ0hBTkdFRDpcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9TY2FsZUNoYW5nZWQgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIHRoZSAzZCBvYmplY3QgYWxvbmcgYSB2ZWN0b3IgYnkgYSBkZWZpbmVkIGxlbmd0aFxuXHQgKlxuXHQgKiBAcGFyYW0gICAgYXhpcyAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgYXhpcyBvZiBtb3ZlbWVudFxuXHQgKiBAcGFyYW0gICAgZGlzdGFuY2UgICAgVGhlIGxlbmd0aCBvZiB0aGUgbW92ZW1lbnRcblx0ICovXG5cdHB1YmxpYyB0cmFuc2xhdGUoYXhpczpWZWN0b3IzRCwgZGlzdGFuY2U6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIHg6bnVtYmVyID0gYXhpcy54LCB5Om51bWJlciA9IGF4aXMueSwgejpudW1iZXIgPSBheGlzLno7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSBkaXN0YW5jZS9NYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KTtcblxuXHRcdHRoaXMuX3ggKz0geCpsZW47XG5cdFx0dGhpcy5feSArPSB5Kmxlbjtcblx0XHR0aGlzLl96ICs9IHoqbGVuO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGFsb25nIGEgdmVjdG9yIGJ5IGEgZGVmaW5lZCBsZW5ndGhcblx0ICpcblx0ICogQHBhcmFtICAgIGF4aXMgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIGF4aXMgb2YgbW92ZW1lbnRcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XG5cdCAqL1xuXHRwdWJsaWMgdHJhbnNsYXRlTG9jYWwoYXhpczpWZWN0b3IzRCwgZGlzdGFuY2U6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIHg6bnVtYmVyID0gYXhpcy54LCB5Om51bWJlciA9IGF4aXMueSwgejpudW1iZXIgPSBheGlzLno7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSBkaXN0YW5jZS9NYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KTtcblxuXHRcdHRoaXMuX2lNYXRyaXgzRC5wcmVwZW5kVHJhbnNsYXRpb24oeCpsZW4sIHkqbGVuLCB6Kmxlbik7XG5cblx0XHR0aGlzLl9tYXRyaXgzRC5jb3B5Q29sdW1uVG8oMywgdGhpcy5fcG9zKTtcblxuXHRcdHRoaXMuX3ggPSB0aGlzLl9wb3MueDtcblx0XHR0aGlzLl95ID0gdGhpcy5fcG9zLnk7XG5cdFx0dGhpcy5feiA9IHRoaXMuX3Bvcy56O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIGl0J3MgbG9jYWwgeS1heGlzXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBhbmdsZSAgICAgICAgVGhlIGFtb3VudCBvZiByb3RhdGlvbiBpbiBkZWdyZWVzXG5cdCAqL1xuXHRwdWJsaWMgeWF3KGFuZ2xlOm51bWJlcilcblx0e1xuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELllfQVhJUywgYW5nbGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pQ29udHJvbGxlcjpDb250cm9sbGVyQmFzZTtcblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IF9pQXNzaWduZWRQYXJ0aXRpb24oKTpQYXJ0aXRpb25cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb247XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHRyYW5zZm9ybWF0aW9uIG9mIHRoZSAzZCBvYmplY3QsIHJlbGF0aXZlIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IDxjb2RlPk9iamVjdENvbnRhaW5lcjNEPC9jb2RlPi5cblx0ICpcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IF9pTWF0cml4M0QoKTpNYXRyaXgzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX21hdHJpeDNERGlydHkpXG5cdFx0XHR0aGlzLl9wVXBkYXRlTWF0cml4M0QoKTtcblxuXHRcdHJldHVybiB0aGlzLl9tYXRyaXgzRDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgX2lNYXRyaXgzRCh2YWw6TWF0cml4M0QpXG5cdHtcblxuXHRcdC8vIFRPRE86IEZyb20gQVMzIC0gRG8gd2Ugc3RpbGwgbmVlZCB0aGlzIGluIEpTID9cblx0XHQvL3JpZGljdWxvdXMgbWF0cml4IGVycm9yXG5cdFx0Lypcblx0XHRpZiAoIXZhbC5yYXdEYXRhWzBdKSB7XG5cblx0XHRcdHZhciByYXc6bnVtYmVyW10gPSBNYXRyaXgzRFV0aWxzLlJBV19EQVRBX0NPTlRBSU5FUjtcblx0XHRcdHZhbC5jb3B5UmF3RGF0YVRvKHJhdyk7XG5cdFx0XHRyYXdbMF0gPSB0aGlzLl9zbWFsbGVzdE51bWJlcjtcblx0XHRcdHZhbC5jb3B5UmF3RGF0YUZyb20ocmF3KTtcblx0XHR9XG5cdFx0Ly8qL1xuXHRcdHZhciBlbGVtZW50czpBcnJheTxWZWN0b3IzRD4gPSB2YWwuZGVjb21wb3NlKCk7XG5cdFx0dmFyIHZlYzpWZWN0b3IzRDtcblxuXHRcdHZlYyA9IGVsZW1lbnRzWzBdO1xuXG5cdFx0aWYgKHRoaXMuX3ggIT0gdmVjLnggfHwgdGhpcy5feSAhPSB2ZWMueSB8fCB0aGlzLl96ICE9IHZlYy56KSB7XG5cdFx0XHR0aGlzLl94ID0gdmVjLng7XG5cdFx0XHR0aGlzLl95ID0gdmVjLnk7XG5cdFx0XHR0aGlzLl96ID0gdmVjLno7XG5cblx0XHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XG5cdFx0fVxuXG5cdFx0dmVjID0gZWxlbWVudHNbMV07XG5cblx0XHRpZiAodGhpcy5fcm90YXRpb25YICE9IHZlYy54IHx8IHRoaXMuX3JvdGF0aW9uWSAhPSB2ZWMueSB8fCB0aGlzLl9yb3RhdGlvblogIT0gdmVjLnopIHtcblx0XHRcdHRoaXMuX3JvdGF0aW9uWCA9IHZlYy54O1xuXHRcdFx0dGhpcy5fcm90YXRpb25ZID0gdmVjLnk7XG5cdFx0XHR0aGlzLl9yb3RhdGlvblogPSB2ZWMuejtcblxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0XHR9XG5cblx0XHR2ZWMgPSBlbGVtZW50c1syXTtcblxuXHRcdGlmICh0aGlzLl9wU2NhbGVYICE9IHZlYy54IHx8IHRoaXMuX3BTY2FsZVkgIT0gdmVjLnkgfHwgdGhpcy5fcFNjYWxlWiAhPSB2ZWMueikge1xuXHRcdFx0dGhpcy5fcFNjYWxlWCA9IHZlYy54O1xuXHRcdFx0dGhpcy5fcFNjYWxlWSA9IHZlYy55O1xuXHRcdFx0dGhpcy5fcFNjYWxlWiA9IHZlYy56O1xuXG5cdFx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBnZXQgX2lQaWNraW5nQ29sbGlzaW9uVk8oKTpQaWNraW5nQ29sbGlzaW9uVk9cblx0e1xuXHRcdGlmICghdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTylcblx0XHRcdHRoaXMuX3BQaWNraW5nQ29sbGlzaW9uVk8gPSBuZXcgUGlja2luZ0NvbGxpc2lvblZPKHRoaXMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3BQaWNraW5nQ29sbGlzaW9uVk87XG5cdH1cblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgaVNldFBhcmVudCh2YWx1ZTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyKVxuXHR7XG5cdFx0dGhpcy5fcFBhcmVudCA9IHZhbHVlO1xuXG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodmFsdWUubW91c2VDaGlsZHJlbik7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHZhbHVlLl9pSXNWaXNpYmxlKCkpO1xuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHZhbHVlLl9pQXNzaWduZWRQYXJ0aXRpb24pO1xuXHRcdFx0dGhpcy5faVNldFNjZW5lKHZhbHVlLl9wU2NlbmUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodHJ1ZSk7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHRydWUpO1xuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKG51bGwpO1xuXG5cdFx0XHR0aGlzLl9pU2V0U2NlbmUobnVsbCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwQ3JlYXRlRGVmYXVsdEJvdW5kaW5nVm9sdW1lKCk6Qm91bmRpbmdWb2x1bWVCYXNlXG5cdHtcblx0XHQvLyBwb2ludCBsaWdodHMgc2hvdWxkIGJlIHVzaW5nIHNwaGVyZSBib3VuZHNcblx0XHQvLyBkaXJlY3Rpb25hbCBsaWdodHMgc2hvdWxkIGJlIHVzaW5nIG51bGwgYm91bmRzXG5cdFx0cmV0dXJuIG5ldyBBeGlzQWxpZ25lZEJvdW5kaW5nQm94KCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBDcmVhdGVFbnRpdHlQYXJ0aXRpb25Ob2RlKCk6RW50aXR5Tm9kZVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcEludmFsaWRhdGVCb3VuZHMoKVxuXHR7XG5cdFx0dGhpcy5fcEJvdW5kc0ludmFsaWQgPSB0cnVlO1xuXHRcdHRoaXMuX3dvcmxkQm91bmRzSW52YWxpZCA9IHRydWU7XG5cblxuXHRcdGlmICh0aGlzLmlzRW50aXR5KVxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUGFydGl0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBJbnZhbGlkYXRlU2NlbmVUcmFuc2Zvcm0oKVxuXHR7XG5cdFx0dGhpcy5fcFNjZW5lVHJhbnNmb3JtRGlydHkgPSAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybTtcblx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xuXHRcdHRoaXMuX3NjZW5lUG9zaXRpb25EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xuXG5cdFx0dGhpcy5fd29ybGRCb3VuZHNJbnZhbGlkID0gIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm07XG5cblx0XHRpZiAodGhpcy5pc0VudGl0eSlcblx0XHRcdHRoaXMuaW52YWxpZGF0ZVBhcnRpdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvU2NlbmVUcmFuc2Zvcm1DaGFuZ2VkKVxuXHRcdFx0dGhpcy5ub3RpZnlTY2VuZVRyYW5zZm9ybUNoYW5nZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwVXBkYXRlQm91bmRzKClcblx0e1xuXHRcdHRoaXMuX3dpZHRoID0gdGhpcy5fcEJvdW5kcy5hYWJiLndpZHRoKnRoaXMuX3BTY2FsZVg7XG5cdFx0dGhpcy5faGVpZ2h0ID0gdGhpcy5fcEJvdW5kcy5hYWJiLmhlaWdodCp0aGlzLl9wU2NhbGVZO1xuXHRcdHRoaXMuX2RlcHRoID0gdGhpcy5fcEJvdW5kcy5hYWJiLmRlcHRoKnRoaXMuX3BTY2FsZVo7XG5cblx0XHR0aGlzLl9wQm91bmRzSW52YWxpZCA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl9wSW1wbGljaXRNb3VzZUVuYWJsZWQgPSB0aGlzLl9leHBsaWNpdE1vdXNlRW5hYmxlZCAmJiB2YWx1ZTtcblxuXHRcdC8vIElmIHRoZXJlIGlzIGEgcGFyZW50IGFuZCB0aGlzIGNoaWxkIGRvZXMgbm90IGhhdmUgYSBwaWNraW5nIGNvbGxpZGVyLCB1c2UgaXRzIHBhcmVudCdzIHBpY2tpbmcgY29sbGlkZXIuXG5cdFx0aWYgKHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZCAmJiB0aGlzLl9wUGFyZW50ICYmICF0aGlzLl9wUGlja2luZ0NvbGxpZGVyKVxuXHRcdFx0dGhpcy5fcFBpY2tpbmdDb2xsaWRlciA9ICB0aGlzLl9wUGFyZW50Ll9wUGlja2luZ0NvbGxpZGVyO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHZhbHVlOlBhcnRpdGlvbilcblx0e1xuXHRcdC8vIGFzc2lnbiBwYXJlbnQgaW1wbGljaXQgcGFydGl0aW9uIGlmIG5vIGV4cGxpY2l0IG9uZSBpcyBnaXZlblxuXHRcdHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbiA9IHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uIHx8IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0dGhpcy5fcEltcGxpY2l0VmlzaWJpbGl0eSA9IHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eSAmJiB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgX3BVcGRhdGVNYXRyaXgzRCgpXG5cdHtcblxuXHRcdHRoaXMuX3Bvcy54ID0gdGhpcy5feDtcblx0XHR0aGlzLl9wb3MueSA9IHRoaXMuX3k7XG5cdFx0dGhpcy5fcG9zLnogPSB0aGlzLl96O1xuXG5cdFx0dGhpcy5fcm90LnggPSB0aGlzLl9yb3RhdGlvblg7XG5cdFx0dGhpcy5fcm90LnkgPSB0aGlzLl9yb3RhdGlvblk7XG5cdFx0dGhpcy5fcm90LnogPSB0aGlzLl9yb3RhdGlvblo7XG5cblx0XHR0aGlzLl9zY2EueCA9IHRoaXMuX3BTY2FsZVg7XG5cdFx0dGhpcy5fc2NhLnkgPSB0aGlzLl9wU2NhbGVZO1xuXHRcdHRoaXMuX3NjYS56ID0gdGhpcy5fcFNjYWxlWjtcblxuXHRcdHRoaXMuX21hdHJpeDNELnJlY29tcG9zZSh0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzKTtcblxuXHRcdGlmICghdGhpcy5fcGl2b3RaZXJvKSB7XG5cdFx0XHR0aGlzLl9tYXRyaXgzRC5wcmVwZW5kVHJhbnNsYXRpb24oLXRoaXMuX3Bpdm90LngvdGhpcy5fcFNjYWxlWCwgLXRoaXMuX3Bpdm90LnkvdGhpcy5fcFNjYWxlWSwgLXRoaXMuX3Bpdm90LnovdGhpcy5fcFNjYWxlWik7XG5cdFx0XHRpZiAodGhpcy5hbGlnbm1lbnRNb2RlICE9IEFsaWdubWVudE1vZGUuUElWT1RfUE9JTlQpXG5cdFx0XHRcdHRoaXMuX21hdHJpeDNELmFwcGVuZFRyYW5zbGF0aW9uKHRoaXMuX3Bpdm90LngsIHRoaXMuX3Bpdm90LnksIHRoaXMuX3Bpdm90LnopO1xuXHRcdH1cblxuXHRcdHRoaXMuX21hdHJpeDNERGlydHkgPSBmYWxzZTtcblx0XHR0aGlzLl9wb3NpdGlvbkRpcnR5ID0gZmFsc2U7XG5cdFx0dGhpcy5fcm90YXRpb25EaXJ0eSA9IGZhbHNlO1xuXHRcdHRoaXMuX3NjYWxlRGlydHkgPSBmYWxzZTtcblx0XHR0aGlzLl9waXZvdERpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBVcGRhdGVTY2VuZVRyYW5zZm9ybSgpXG5cdHtcblx0XHRpZiAodGhpcy5fcFBhcmVudCAmJiAhdGhpcy5fcFBhcmVudC5faUlzUm9vdCkge1xuXHRcdFx0dGhpcy5fcFNjZW5lVHJhbnNmb3JtLmNvcHlGcm9tKHRoaXMuX3BQYXJlbnQuc2NlbmVUcmFuc2Zvcm0pO1xuXHRcdFx0dGhpcy5fcFNjZW5lVHJhbnNmb3JtLnByZXBlbmQodGhpcy5faU1hdHJpeDNEKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcFNjZW5lVHJhbnNmb3JtLmNvcHlGcm9tKHRoaXMuX2lNYXRyaXgzRCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fcFNjZW5lVHJhbnNmb3JtRGlydHkgPSBmYWxzZTtcblx0fVxuXG5cdHB1YmxpYyBfaUFkZFJlbmRlcmFibGUocmVuZGVyYWJsZTpJUmVuZGVyYWJsZSk6SVJlbmRlcmFibGVcblx0e1xuXHRcdHRoaXMuX3BSZW5kZXJhYmxlcy5wdXNoKHJlbmRlcmFibGUpO1xuXG5cdFx0cmV0dXJuIHJlbmRlcmFibGU7XG5cdH1cblxuXG5cdHB1YmxpYyBfaVJlbW92ZVJlbmRlcmFibGUocmVuZGVyYWJsZTpJUmVuZGVyYWJsZSk6SVJlbmRlcmFibGVcblx0e1xuXHRcdHZhciBpbmRleDpudW1iZXIgPSB0aGlzLl9wUmVuZGVyYWJsZXMuaW5kZXhPZihyZW5kZXJhYmxlKTtcblxuXHRcdHRoaXMuX3BSZW5kZXJhYmxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuXG5cdFx0cmV0dXJuIHJlbmRlcmFibGU7XG5cdH1cblxuXHQvKipcblx0ICogLy9UT0RPXG5cdCAqXG5cdCAqIEBwYXJhbSBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlXG5cdCAqIEBwYXJhbSBmaW5kQ2xvc2VzdFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICpcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgX2lUZXN0Q29sbGlzaW9uKHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2U6bnVtYmVyLCBmaW5kQ2xvc2VzdDpib29sZWFuKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBfaUludGVybmFsVXBkYXRlKClcblx0e1xuXHRcdGlmICh0aGlzLl9pQ29udHJvbGxlcilcblx0XHRcdHRoaXMuX2lDb250cm9sbGVyLnVwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pSXNWaXNpYmxlKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BJbXBsaWNpdFZpc2liaWxpdHk7XG5cdH1cblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgX2lJc01vdXNlRW5hYmxlZCgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSW1wbGljaXRNb3VzZUVuYWJsZWQ7XG5cdH1cblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgX2lTZXRTY2VuZSh2YWx1ZTpTY2VuZSlcblx0e1xuXHRcdC8vIHRlc3QgdG8gc2VlIGlmIHdlJ3JlIHN3aXRjaGluZyByb290cyB3aGlsZSB3ZSdyZSBhbHJlYWR5IHVzaW5nIGEgc2NlbmUgcGFydGl0aW9uXG5cdFx0Lypcblx0XHRpZiAodmFsdWUgPT0gbnVsbClcblx0XHRcdHRoaXMuX29sZFNjZW5lID0gdGhpcy5fcFNjZW5lO1xuXG5cdFx0aWYgKHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uICYmIHRoaXMuX29sZFNjZW5lICYmIHRoaXMuX29sZFNjZW5lICE9IHRoaXMuX3BTY2VuZSlcblx0XHRcdHRoaXMucGFydGl0aW9uID0gbnVsbDtcblxuXHRcdGlmICh2YWx1ZSlcblx0XHRcdHRoaXMuX29sZFNjZW5lID0gbnVsbDtcblxuXHRcdC8vIGVuZCBvZiBzdHVwaWQgcGFydGl0aW9uIHRlc3QgY29kZVxuXHRcdC8vKi9cblxuXHRcdGlmICh0aGlzLl9wU2NlbmUgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wVXBkYXRlU2NlbmUodmFsdWUpO1xuXG5cdFx0aWYgKCF0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSAmJiAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybSlcblx0XHRcdHRoaXMucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZVNjZW5lKHZhbHVlOlNjZW5lKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BTY2VuZSkge1xuXHRcdFx0dGhpcy5fcFNjZW5lLmRpc3BhdGNoRXZlbnQobmV3IFNjZW5lRXZlbnQoU2NlbmVFdmVudC5SRU1PVkVEX0ZST01fU0NFTkUsIHRoaXMpKTtcblxuXHRcdFx0Ly91bnJlZ2lzdGVyIGVudGl0eSBmcm9tIGN1cnJlbnQgc2NlbmVcblx0XHRcdHRoaXMuX3BTY2VuZS5pVW5yZWdpc3RlckVudGl0eSh0aGlzKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wU2NlbmUgPSB2YWx1ZTtcblxuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0dmFsdWUuZGlzcGF0Y2hFdmVudChuZXcgU2NlbmVFdmVudChTY2VuZUV2ZW50LkFEREVEX1RPX1NDRU5FLCB0aGlzKSk7XG5cblx0XHRcdC8vcmVnaXN0ZXIgZW50aXR5IHdpdGggbmV3IHNjZW5lXG5cdFx0XHR2YWx1ZS5pUmVnaXN0ZXJFbnRpdHkodGhpcyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5ub3RpZnlTY2VuZUNoYW5nZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG5vdGlmeVBvc2l0aW9uQ2hhbmdlZCgpXG5cdHtcblx0XHRpZiAoIXRoaXMuX3Bvc2l0aW9uQ2hhbmdlZClcblx0XHRcdHRoaXMuX3Bvc2l0aW9uQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3Bvc2l0aW9uQ2hhbmdlZCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgbm90aWZ5Um90YXRpb25DaGFuZ2VkKClcblx0e1xuXHRcdGlmICghdGhpcy5fcm90YXRpb25DaGFuZ2VkKVxuXHRcdFx0dGhpcy5fcm90YXRpb25DaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuUk9UQVRJT05fQ0hBTkdFRCwgdGhpcyk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fcm90YXRpb25DaGFuZ2VkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBub3RpZnlTY2FsZUNoYW5nZWQoKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9zY2FsZUNoYW5nZWQpXG5cdFx0XHR0aGlzLl9zY2FsZUNoYW5nZWQgPSBuZXcgRGlzcGxheU9iamVjdEV2ZW50KERpc3BsYXlPYmplY3RFdmVudC5TQ0FMRV9DSEFOR0VELCB0aGlzKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zY2FsZUNoYW5nZWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG5vdGlmeVNjZW5lQ2hhbmdlKClcblx0e1xuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1NjZW5lQ2hhbmdlZCkge1xuXHRcdFx0aWYgKCF0aGlzLl9zY2VuZWNoYW5nZWQpXG5cdFx0XHRcdHRoaXMuX3NjZW5lY2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlNDRU5FX0NIQU5HRUQsIHRoaXMpO1xuXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fc2NlbmVjaGFuZ2VkKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgbm90aWZ5U2NlbmVUcmFuc2Zvcm1DaGFuZ2UoKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9zY2VuZVRyYW5zZm9ybUNoYW5nZWQpXG5cdFx0XHR0aGlzLl9zY2VuZVRyYW5zZm9ybUNoYW5nZWQgPSBuZXcgRGlzcGxheU9iamVjdEV2ZW50KERpc3BsYXlPYmplY3RFdmVudC5TQ0VORVRSQU5TRk9STV9DSEFOR0VELCB0aGlzKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zY2VuZVRyYW5zZm9ybUNoYW5nZWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEludmFsaWRhdGVzIHRoZSAzRCB0cmFuc2Zvcm1hdGlvbiBtYXRyaXgsIGNhdXNpbmcgaXQgdG8gYmUgdXBkYXRlZCB1cG9uIHRoZSBuZXh0IHJlcXVlc3Rcblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgaW52YWxpZGF0ZU1hdHJpeDNEKCk6dm9pZFxuXHR7XG5cdFx0aWYgKHRoaXMuX21hdHJpeDNERGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9tYXRyaXgzRERpcnR5ID0gdHJ1ZTtcblxuXHRcdGlmICghdGhpcy5fcFNjZW5lVHJhbnNmb3JtRGlydHkgJiYgIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm0pXG5cdFx0XHR0aGlzLnBJbnZhbGlkYXRlU2NlbmVUcmFuc2Zvcm0oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBpbnZhbGlkYXRlUGFydGl0aW9uKClcblx0e1xuXHRcdGlmICh0aGlzLl9pQXNzaWduZWRQYXJ0aXRpb24pXG5cdFx0XHR0aGlzLl9pQXNzaWduZWRQYXJ0aXRpb24uaU1hcmtGb3JVcGRhdGUodGhpcyk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgaW52YWxpZGF0ZVBpdm90KClcblx0e1xuXHRcdHRoaXMuX3Bpdm90WmVybyA9ICh0aGlzLl9waXZvdC54ID09IDApICYmICh0aGlzLl9waXZvdC55ID09IDApICYmICh0aGlzLl9waXZvdC56ID09IDApO1xuXG5cdFx0aWYgKHRoaXMuX3Bpdm90RGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9waXZvdERpcnR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdHJpeDNEKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgaW52YWxpZGF0ZVBvc2l0aW9uKClcblx0e1xuXHRcdGlmICh0aGlzLl9wb3NpdGlvbkRpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcG9zaXRpb25EaXJ0eSA9IHRydWU7XG5cblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xuXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkKVxuXHRcdFx0dGhpcy5ub3RpZnlQb3NpdGlvbkNoYW5nZWQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBpbnZhbGlkYXRlUm90YXRpb24oKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3JvdGF0aW9uRGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9yb3RhdGlvbkRpcnR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdHJpeDNEKCk7XG5cblx0XHRpZiAodGhpcy5fbGlzdGVuVG9Sb3RhdGlvbkNoYW5nZWQpXG5cdFx0XHR0aGlzLm5vdGlmeVJvdGF0aW9uQ2hhbmdlZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIGludmFsaWRhdGVTY2FsZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fc2NhbGVEaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3NjYWxlRGlydHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0cml4M0QoKTtcblxuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1NjYWxlQ2hhbmdlZClcblx0XHRcdHRoaXMubm90aWZ5U2NhbGVDaGFuZ2VkKCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gRGlzcGxheU9iamVjdDsiXX0=