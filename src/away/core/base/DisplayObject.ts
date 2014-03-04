///<reference path="../../_definitions.ts"/>

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
module away.base
{
	export class DisplayObject extends away.library.NamedAssetBase implements IBitmapDrawable
	{
		private _loaderInfo:LoaderInfo;
		private _mouseX:number;
		private _mouseY:number;
		private _root:away.containers.DisplayObjectContainer;
		private _bounds:away.geom.Rectangle;
		private _depth:number;
		private _height:number;
		private _width:number;

		public _pScene:away.containers.Scene;
		public _pParent:away.containers.DisplayObjectContainer;
		public _pSceneTransform:away.geom.Matrix3D = new away.geom.Matrix3D();
		public _pSceneTransformDirty:boolean = true;
		public _pIsEntity:boolean;

		private _explicitPartition:away.partition.Partition;
		public _pImplicitPartition:away.partition.Partition;
		private _partitionNode:away.partition.EntityNode;

		private _sceneTransformChanged:away.events.DisplayObjectEvent;
		private _scenechanged:away.events.DisplayObjectEvent;
		private _transform:away.geom.Transform;
		private _matrix3D:away.geom.Matrix3D = new away.geom.Matrix3D();
		private _matrix3DDirty:boolean = true;

		private _inverseSceneTransform:away.geom.Matrix3D = new away.geom.Matrix3D();
		private _inverseSceneTransformDirty:boolean = true;
		private _scenePosition:away.geom.Vector3D = new away.geom.Vector3D();
		private _scenePositionDirty:boolean = true;
		private _explicitVisibility:boolean = true;
		public _pImplicitVisibility:boolean = true;
		private _explicitMouseEnabled:boolean = true;
		public _pImplicitMouseEnabled:boolean = true;
		private _listenToSceneTransformChanged:boolean;
		private _listenToSceneChanged:boolean;

		private _positionDirty:boolean = true;
		private _rotationDirty:boolean = true;
		private _scaleDirty:boolean = true;

		private _positionChanged:away.events.DisplayObjectEvent;
		private _rotationChanged:away.events.DisplayObjectEvent;
		private _scaleChanged:away.events.DisplayObjectEvent;

		private _rotationX:number = 0;
		private _rotationY:number = 0;
		private _rotationZ:number = 0;
		private _eulers:away.geom.Vector3D = new away.geom.Vector3D();
		private _flipY:away.geom.Matrix3D = new away.geom.Matrix3D();

		private _listenToPositionChanged:boolean;
		private _listenToRotationChanged:boolean;
		private _listenToScaleChanged:boolean;
		private _zOffset:number = 0;

		public _pScaleX:number = 1;
		public _pScaleY:number = 1;
		public _pScaleZ:number = 1;
		private _x:number = 0;
		private _y:number = 0;
		private _z:number = 0;
		private _pivotPoint:away.geom.Vector3D = new away.geom.Vector3D();
		private _orientationMatrix:away.geom.Matrix3D = new away.geom.Matrix3D();
		private _pivotZero:boolean = true;
		private _pivotDirty:boolean = true;
		private _pos:away.geom.Vector3D = new away.geom.Vector3D();
		private _rot:away.geom.Vector3D = new away.geom.Vector3D();
		private _sca:away.geom.Vector3D = new away.geom.Vector3D();
		private _transformComponents:away.geom.Vector3D[];

		public _pIgnoreTransform:boolean = false;

		private _showBounds:boolean;
		private _boundsIsShown:boolean;
		private _shaderPickingDetails:boolean;

		private _pickingCollisionVO:away.pick.PickingCollisionVO;

		public _pBounds:away.bounds.BoundingVolumeBase;
		public _pBoundsInvalid:boolean = true;
		private _worldBounds:away.bounds.BoundingVolumeBase;
		private _worldBoundsInvalid:boolean = true;

		private _pickingCollider:away.pick.IPickingCollider;

		public _pRenderables:Array<away.pool.IRenderable> = new Array<away.pool.IRenderable>();

		/**
		 *
		 */
		public alignmentMode:string = AlignmentMode.REGISTRATION_POINT;

		/**
		 * Indicates the alpha transparency value of the object specified. Valid
		 * values are 0(fully transparent) to 1(fully opaque). The default value is
		 * 1. Display objects with <code>alpha</code> set to 0 <i>are</i> active,
		 * even though they are invisible.
		 */
		public alpha:number;

		/**
		 * A value from the BlendMode class that specifies which blend mode to use. A
		 * bitmap can be drawn internally in two ways. If you have a blend mode
		 * enabled or an external clipping mask, the bitmap is drawn by adding a
		 * bitmap-filled square shape to the vector render. If you attempt to set
		 * this property to an invalid value, Flash runtimes set the value to
		 * <code>BlendMode.NORMAL</code>.
		 *
		 * <p>The <code>blendMode</code> property affects each pixel of the display
		 * object. Each pixel is composed of three constituent colors(red, green,
		 * and blue), and each constituent color has a value between 0x00 and 0xFF.
		 * Flash Player or Adobe AIR compares each constituent color of one pixel in
		 * the movie clip with the corresponding color of the pixel in the
		 * background. For example, if <code>blendMode</code> is set to
		 * <code>BlendMode.LIGHTEN</code>, Flash Player or Adobe AIR compares the red
		 * value of the display object with the red value of the background, and uses
		 * the lighter of the two as the value for the red component of the displayed
		 * color.</p>
		 *
		 * <p>The following table describes the <code>blendMode</code> settings. The
		 * BlendMode class defines string values you can use. The illustrations in
		 * the table show <code>blendMode</code> values applied to a circular display
		 * object(2) superimposed on another display object(1).</p>
		 */
		public blendMode:BlendMode;

		/**
		 *
		 */
		public get bounds():away.bounds.BoundingVolumeBase
		{
			if (this._pBoundsInvalid)
				this.pUpdateBounds();

			return this._pBounds;
		}

		public set bounds(value:away.bounds.BoundingVolumeBase)
		{
			if (this._showBounds)
				this.removeBounds();

			this._pBounds = value;
			this._worldBounds = value.clone();

			this.pInvalidateBounds();

			if (this._showBounds)
				this.addBounds();
		}

		/**
		 * If set to <code>true</code>, NME will use the software renderer to cache
		 * an internal bitmap representation of the display object. For native targets,
		 * this is often much slower than the default hardware renderer. When you
		 * are using the Flash target, this caching may increase performance for display
		 * objects that contain complex vector content.
		 *
		 * <p>All vector data for a display object that has a cached bitmap is drawn
		 * to the bitmap instead of the main display. If
		 * <code>cacheAsBitmapMatrix</code> is null or unsupported, the bitmap is
		 * then copied to the main display as unstretched, unrotated pixels snapped
		 * to the nearest pixel boundaries. Pixels are mapped 1 to 1 with the parent
		 * object. If the bounds of the bitmap change, the bitmap is recreated
		 * instead of being stretched.</p>
		 *
		 * <p>If <code>cacheAsBitmapMatrix</code> is non-null and supported, the
		 * object is drawn to the off-screen bitmap using that matrix and the
		 * stretched and/or rotated results of that rendering are used to draw the
		 * object to the main display.</p>
		 *
		 * <p>No internal bitmap is created unless the <code>cacheAsBitmap</code>
		 * property is set to <code>true</code>.</p>
		 *
		 * <p>After you set the <code>cacheAsBitmap</code> property to
		 * <code>true</code>, the rendering does not change, however the display
		 * object performs pixel snapping automatically. The animation speed can be
		 * significantly faster depending on the complexity of the vector content.
		 * </p>
		 *
		 * <p>The <code>cacheAsBitmap</code> property is automatically set to
		 * <code>true</code> whenever you apply a filter to a display object(when
		 * its <code>filter</code> array is not empty), and if a display object has a
		 * filter applied to it, <code>cacheAsBitmap</code> is reported as
		 * <code>true</code> for that display object, even if you set the property to
		 * <code>false</code>. If you clear all filters for a display object, the
		 * <code>cacheAsBitmap</code> setting changes to what it was last set to.</p>
		 *
		 * <p>A display object does not use a bitmap even if the
		 * <code>cacheAsBitmap</code> property is set to <code>true</code> and
		 * instead renders from vector data in the following cases:</p>
		 *
		 * <ul>
		 *   <li>The bitmap is too large. In AIR 1.5 and Flash Player 10, the maximum
		 * size for a bitmap image is 8,191 pixels in width or height, and the total
		 * number of pixels cannot exceed 16,777,215 pixels.(So, if a bitmap image
		 * is 8,191 pixels wide, it can only be 2,048 pixels high.) In Flash Player 9
		 * and earlier, the limitation is is 2880 pixels in height and 2,880 pixels
		 * in width.</li>
		 *   <li>The bitmap fails to allocate(out of memory error). </li>
		 * </ul>
		 *
		 * <p>The <code>cacheAsBitmap</code> property is best used with movie clips
		 * that have mostly static content and that do not scale and rotate
		 * frequently. With such movie clips, <code>cacheAsBitmap</code> can lead to
		 * performance increases when the movie clip is translated(when its <i>x</i>
		 * and <i>y</i> position is changed).</p>
		 */
		public cacheAsBitmap:boolean;

		/**
		 *
		 */
		public castsShadows:boolean = true;

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
		public get depth():number
		{
			if (this._pBoundsInvalid)
				this.pUpdateBounds();

			return this._depth;
		}

		public set depth(val:number)
		{
			if (this._depth == val)
				return;

			this._depth == val;

			this._pScaleZ = val/this.bounds.aabb.depth;

			this.invalidateScale();
		}

		/**
		 * Defines the rotation of the 3d object as a <code>Vector3D</code> object containing euler angles for rotation around x, y and z axis.
		 */
		public get eulers():away.geom.Vector3D
		{
			this._eulers.x = this._rotationX*away.geom.MathConsts.RADIANS_TO_DEGREES;
			this._eulers.y = this._rotationY*away.geom.MathConsts.RADIANS_TO_DEGREES;
			this._eulers.z = this._rotationZ*away.geom.MathConsts.RADIANS_TO_DEGREES;

			return this._eulers;
		}

		public set eulers(value:away.geom.Vector3D)
		{
			this._rotationX = value.x*away.geom.MathConsts.DEGREES_TO_RADIANS;
			this._rotationY = value.y*away.geom.MathConsts.DEGREES_TO_RADIANS;
			this._rotationZ = value.z*away.geom.MathConsts.DEGREES_TO_RADIANS;

			this.invalidateRotation();
		}

		/**
		 * An object that can contain any extra data.
		 */
		public extra:Object;

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
		public get height():number
		{
			if (this._pBoundsInvalid)
				this.pUpdateBounds();

			return this._height;
		}

		public set height(val:number)
		{
			if (this._height == val)
				return;

			this._height == val;

			this._pScaleY = val/this.bounds.aabb.height;

			this.invalidateScale();
		}

		/**
		 * Indicates the instance container index of the DisplayObject. The object can be
		 * identified in the child list of its parent display object container by
		 * calling the <code>getChildByIndex()</code> method of the display object
		 * container.
		 *
		 * <p>If the DisplayObject has no parent container, index defaults to 0.</p>
		 */
		public get index():number
		{
			if (this._pParent)
				return this._pParent.getChildIndex(this);

			return 0;
		}

		/**
		 *
		 */
		public get inverseSceneTransform():away.geom.Matrix3D
		{
			if (this._inverseSceneTransformDirty) {
				this._inverseSceneTransform.copyFrom(this.sceneTransform);
				this._inverseSceneTransform.invert();
				this._inverseSceneTransformDirty = false;
			}
			return this._inverseSceneTransform;
		}

		/**
		 *
		 */
		public get ignoreTransform():boolean
		{
			return this._pIgnoreTransform;
		}

		public set ignoreTransform(value:boolean)
		{
			if (this._pIgnoreTransform == value)
				return;

			this._pIgnoreTransform = value;

			if (value) {
				this._pSceneTransform.identity();
				this._scenePosition.setTo(0, 0, 0);
			}

			this.pInvalidateSceneTransform();
		}

		/**
		 *
		 */
		public get isEntity()
		{
			return this._pIsEntity;
		}
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
		public get loaderInfo():LoaderInfo
		{
			return this._loaderInfo;
		}

		/**
		 * The calling display object is masked by the specified <code>mask</code>
		 * object. To ensure that masking works when the Stage is scaled, the
		 * <code>mask</code> display object must be in an active part of the display
		 * list. The <code>mask</code> object itself is not drawn. Set
		 * <code>mask</code> to <code>null</code> to remove the mask.
		 *
		 * <p>To be able to scale a mask object, it must be on the display list. To
		 * be able to drag a mask Sprite object(by calling its
		 * <code>startDrag()</code> method), it must be on the display list. To call
		 * the <code>startDrag()</code> method for a mask sprite based on a
		 * <code>mouseDown</code> event being dispatched by the sprite, set the
		 * sprite's <code>buttonMode</code> property to <code>true</code>.</p>
		 *
		 * <p>When display objects are cached by setting the
		 * <code>cacheAsBitmap</code> property to <code>true</code> an the
		 * <code>cacheAsBitmapMatrix</code> property to a Matrix object, both the
		 * mask and the display object being masked must be part of the same cached
		 * bitmap. Thus, if the display object is cached, then the mask must be a
		 * child of the display object. If an ancestor of the display object on the
		 * display list is cached, then the mask must be a child of that ancestor or
		 * one of its descendents. If more than one ancestor of the masked object is
		 * cached, then the mask must be a descendent of the cached container closest
		 * to the masked object in the display list.</p>
		 *
		 * <p><b>Note:</b> A single <code>mask</code> object cannot be used to mask
		 * more than one calling display object. When the <code>mask</code> is
		 * assigned to a second display object, it is removed as the mask of the
		 * first object, and that object's <code>mask</code> property becomes
		 * <code>null</code>.</p>
		 */
		public mask:DisplayObject;

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
		public get mouseEnabled():boolean
		{
			return this._explicitMouseEnabled;
		}

		public set mouseEnabled(value:boolean)
		{
			if (this._explicitMouseEnabled == value)
				return;

			this._explicitMouseEnabled = value;

			this._pUpdateImplicitMouseEnabled(this._pParent? this._pParent.mouseChildren : true);
		}


		/**
		 * Indicates the x coordinate of the mouse or user input device position, in
		 * pixels.
		 *
		 * <p><b>Note</b>: For a DisplayObject that has been rotated, the returned x
		 * coordinate will reflect the non-rotated object.</p>
		 */
		public get mouseX():number
		{
			return this._mouseX;
		}

		/**
		 * Indicates the y coordinate of the mouse or user input device position, in
		 * pixels.
		 *
		 * <p><b>Note</b>: For a DisplayObject that has been rotated, the returned y
		 * coordinate will reflect the non-rotated object.</p>
		 */
		public get mouseY():number
		{
			return this._mouseY;
		}

		/**
		 * Indicates the instance name of the DisplayObject. The object can be
		 * identified in the child list of its parent display object container by
		 * calling the <code>getChildByName()</code> method of the display object
		 * container.
		 *
		 * @throws IllegalOperationError If you are attempting to set this property
		 *                               on an object that was placed on the timeline
		 *                               in the Flash authoring tool.
		 */
		public name:string;

		/**
		 *
		 */
		public orientationMode:string = OrientationMode.DEFAULT;

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
		public get parent():away.containers.DisplayObjectContainer
		{
			return this._pParent;
		}

		/**
		 *
		 */
		public get partition():away.partition.Partition
		{
			return this._explicitPartition;
		}

		public set partition(value:away.partition.Partition)
		{
			if (this._explicitPartition == value)
				return;

			if (this._pScene && this._explicitPartition)
				this._pScene.iUnregisterPartition(this._explicitPartition);

			this._explicitPartition = value;

			if (this._pScene && value)
				this._pScene.iRegisterPartition(value);

			this._pUpdateImplicitPartition(this._pParent? this._pParent._iAssignedPartition : null);
		}

		/**
		 *
		 */
		public get partitionNode():away.partition.EntityNode
		{
			if (!this._partitionNode)
				this._partitionNode = this.pCreateEntityPartitionNode();

			return this._partitionNode;
		}

		/**
		 *
		 */
		public get pickingCollider():away.pick.IPickingCollider
		{
			return this._pickingCollider;
		}

		public set pickingCollider(value:away.pick.IPickingCollider)
		{
			this._pickingCollider = value;
		}

		/**
		 * Defines the local point around which the object rotates.
		 */
		public get pivotPoint():away.geom.Vector3D
		{
			return this._pivotPoint;
		}


		public set pivotPoint(pivot:away.geom.Vector3D)
		{
			this._pivotPoint = pivot.clone();

			this.invalidatePivot();
		}

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
		public get root():away.containers.DisplayObjectContainer
		{
			return this._root;
		}

		/**
		 * Indicates the rotation of the DisplayObject instance, in degrees, from its
		 * original orientation. Values from 0 to 180 represent clockwise rotation;
		 * values from 0 to -180 represent counterclockwise rotation. Values outside
		 * this range are added to or subtracted from 360 to obtain a value within
		 * the range. For example, the statement <code>my_video.rotation = 450</code>
		 * is the same as <code> my_video.rotation = 90</code>.
		 */
		public rotation:number;

		/**
		 * Indicates the x-axis rotation of the DisplayObject instance, in degrees,
		 * from its original orientation relative to the 3D parent container. Values
		 * from 0 to 180 represent clockwise rotation; values from 0 to -180
		 * represent counterclockwise rotation. Values outside this range are added
		 * to or subtracted from 360 to obtain a value within the range.
		 */
		public get rotationX():number
		{
			return this._rotationX*away.geom.MathConsts.RADIANS_TO_DEGREES;
		}

		public set rotationX(val:number)
		{
			if (this.rotationX == val)
				return;

			this._rotationX = val*away.geom.MathConsts.DEGREES_TO_RADIANS;

			this.invalidateRotation();
		}

		/**
		 * Indicates the y-axis rotation of the DisplayObject instance, in degrees,
		 * from its original orientation relative to the 3D parent container. Values
		 * from 0 to 180 represent clockwise rotation; values from 0 to -180
		 * represent counterclockwise rotation. Values outside this range are added
		 * to or subtracted from 360 to obtain a value within the range.
		 */
		public get rotationY():number
		{
			return this._rotationY*away.geom.MathConsts.RADIANS_TO_DEGREES;
		}

		public set rotationY(val:number)
		{
			if (this.rotationY == val)
				return;

			this._rotationY = val*away.geom.MathConsts.DEGREES_TO_RADIANS;

			this.invalidateRotation();
		}

		/**
		 * Indicates the z-axis rotation of the DisplayObject instance, in degrees,
		 * from its original orientation relative to the 3D parent container. Values
		 * from 0 to 180 represent clockwise rotation; values from 0 to -180
		 * represent counterclockwise rotation. Values outside this range are added
		 * to or subtracted from 360 to obtain a value within the range.
		 */
		public get rotationZ():number
		{
			return this._rotationZ*away.geom.MathConsts.RADIANS_TO_DEGREES;
		}

		public set rotationZ(val:number)
		{
			if (this.rotationZ == val)
				return;

			this._rotationZ = val*away.geom.MathConsts.DEGREES_TO_RADIANS;

			this.invalidateRotation();
		}

		/**
		 * The current scaling grid that is in effect. If set to <code>null</code>,
		 * the entire display object is scaled normally when any scale transformation
		 * is applied.
		 *
		 * <p>When you define the <code>scale9Grid</code> property, the display
		 * object is divided into a grid with nine regions based on the
		 * <code>scale9Grid</code> rectangle, which defines the center region of the
		 * grid. The eight other regions of the grid are the following areas: </p>
		 *
		 * <ul>
		 *   <li>The upper-left corner outside of the rectangle</li>
		 *   <li>The area above the rectangle </li>
		 *   <li>The upper-right corner outside of the rectangle</li>
		 *   <li>The area to the left of the rectangle</li>
		 *   <li>The area to the right of the rectangle</li>
		 *   <li>The lower-left corner outside of the rectangle</li>
		 *   <li>The area below the rectangle</li>
		 *   <li>The lower-right corner outside of the rectangle</li>
		 * </ul>
		 *
		 * <p>You can think of the eight regions outside of the center(defined by
		 * the rectangle) as being like a picture frame that has special rules
		 * applied to it when scaled.</p>
		 *
		 * <p>When the <code>scale9Grid</code> property is set and a display object
		 * is scaled, all text and gradients are scaled normally; however, for other
		 * types of objects the following rules apply:</p>
		 *
		 * <ul>
		 *   <li>Content in the center region is scaled normally. </li>
		 *   <li>Content in the corners is not scaled. </li>
		 *   <li>Content in the top and bottom regions is scaled horizontally only.
		 * Content in the left and right regions is scaled vertically only.</li>
		 *   <li>All fills(including bitmaps, video, and gradients) are stretched to
		 * fit their shapes.</li>
		 * </ul>
		 *
		 * <p>If a display object is rotated, all subsequent scaling is normal(and
		 * the <code>scale9Grid</code> property is ignored).</p>
		 *
		 * <p>For example, consider the following display object and a rectangle that
		 * is applied as the display object's <code>scale9Grid</code>:</p>
		 *
		 * <p>A common use for setting <code>scale9Grid</code> is to set up a display
		 * object to be used as a component, in which edge regions retain the same
		 * width when the component is scaled.</p>
		 *
		 * @throws ArgumentError If you pass an invalid argument to the method.
		 */
		public scale9Grid:away.geom.Rectangle;

		/**
		 * Indicates the horizontal scale(percentage) of the object as applied from
		 * the registration point. The default registration point is(0,0). 1.0
		 * equals 100% scale.
		 *
		 * <p>Scaling the local coordinate system changes the <code>x</code> and
		 * <code>y</code> property values, which are defined in whole pixels. </p>
		 */
		public get scaleX():number
		{
			return this._pScaleX;
		}

		public set scaleX(val:number)
		{
			if (this._pScaleX == val)
				return;

			this._pScaleX = val;

			this.invalidateScale();
		}

		/**
		 * Indicates the vertical scale(percentage) of an object as applied from the
		 * registration point of the object. The default registration point is(0,0).
		 * 1.0 is 100% scale.
		 *
		 * <p>Scaling the local coordinate system changes the <code>x</code> and
		 * <code>y</code> property values, which are defined in whole pixels. </p>
		 */
		public get scaleY():number
		{
			return this._pScaleY;
		}

		public set scaleY(val:number)
		{
			if (this._pScaleY == val)
				return;

			this._pScaleY = val;

			this.invalidateScale();
		}

		/**
		 * Indicates the depth scale(percentage) of an object as applied from the
		 * registration point of the object. The default registration point is(0,0).
		 * 1.0 is 100% scale.
		 *
		 * <p>Scaling the local coordinate system changes the <code>x</code>,
		 * <code>y</code> and <code>z</code> property values, which are defined in
		 * whole pixels. </p>
		 */
		public get scaleZ():number
		{
			return this._pScaleZ;
		}

		public set scaleZ(val:number)
		{
			if (this._pScaleZ == val)
				return;

			this._pScaleZ = val;

			this.invalidateScale();
		}

		/**
		 *
		 */
		public get scene():away.containers.Scene
		{
			return this._pScene;
		}

		/**
		 *
		 */
		public get scenePosition():away.geom.Vector3D
		{
			if (this._scenePositionDirty) {
				if (!this._pivotZero && this.alignmentMode == AlignmentMode.PIVOT_POINT) {
					this._scenePosition = this.sceneTransform.transformVector(this._pivotPoint);
					//this._scenePosition.decrementBy(new away.geom.Vector3D(this._pivotPoint.x*this._pScaleX, this._pivotPoint.y*this._pScaleY, this._pivotPoint.z*this._pScaleZ));
				} else {
					this.sceneTransform.copyColumnTo(3, this._scenePosition);
				}

				this._scenePositionDirty = false;
			}
			return this._scenePosition;
		}

		public get sceneTransform():away.geom.Matrix3D
		{
			if (this._pSceneTransformDirty)
				this.pUpdateSceneTransform();

			return this._pSceneTransform;
		}

		/**
		 * The scroll rectangle bounds of the display object. The display object is
		 * cropped to the size defined by the rectangle, and it scrolls within the
		 * rectangle when you change the <code>x</code> and <code>y</code> properties
		 * of the <code>scrollRect</code> object.
		 *
		 * <p>The properties of the <code>scrollRect</code> Rectangle object use the
		 * display object's coordinate space and are scaled just like the overall
		 * display object. The corner bounds of the cropped window on the scrolling
		 * display object are the origin of the display object(0,0) and the point
		 * defined by the width and height of the rectangle. They are not centered
		 * around the origin, but use the origin to define the upper-left corner of
		 * the area. A scrolled display object always scrolls in whole pixel
		 * increments. </p>
		 *
		 * <p>You can scroll an object left and right by setting the <code>x</code>
		 * property of the <code>scrollRect</code> Rectangle object. You can scroll
		 * an object up and down by setting the <code>y</code> property of the
		 * <code>scrollRect</code> Rectangle object. If the display object is rotated
		 * 90° and you scroll it left and right, the display object actually scrolls
		 * up and down.</p>
		 */
		public scrollRect:away.geom.Rectangle;

		/**
		 *
		 */
		public get shaderPickingDetails():boolean
		{
			return this._shaderPickingDetails;
		}

		/**
		 *
		 */
		public get showBounds():boolean
		{
			return this._showBounds;
		}

		public set showBounds(value:boolean)
		{
			if (value == this._showBounds)
				return;

			this._showBounds = value;

//			if (this._showBounds)
//				this.addChild(this._pBounds.boundingEntity);
//			else
//				this.removeBounds();
		}

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
		public get transform():away.geom.Transform
		{
			return this._transform;
		}

		/**
		 * Whether or not the display object is visible. Display objects that are not
		 * visible are disabled. For example, if <code>visible=false</code> for an
		 * InteractiveObject instance, it cannot be clicked.
		 */
		public get visible():boolean
		{
			return this._explicitVisibility;
		}

		public set visible(value:boolean)
		{
			if (this._explicitVisibility == value)
				return;

			this._explicitVisibility = value;

			this._pUpdateImplicitVisibility(this._pParent? this._pParent._iIsVisible() : true);
		}

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
		public get width():number
		{
			if (this._pBoundsInvalid)
				this.pUpdateBounds();

			return this._width;
		}

		public set width(val:number)
		{
			if (this._width == val)
				return;

			this._width == val;

			this._pScaleX = val/this.bounds.aabb.width;

			this.invalidateScale();
		}

		/**
		 *
		 */
		public get worldBounds():away.bounds.BoundingVolumeBase
		{
			if (this._worldBoundsInvalid) {
				this._worldBoundsInvalid = false;
				this._worldBounds.transformFrom(this.bounds, this.sceneTransform);
			}

			return this._worldBounds;
		}

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
		public get x():number
		{
			return this._x;
		}

		public set x(val:number)
		{
			if (this._x == val)
				return;

			this._x = val;

			this.invalidatePosition();
		}

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
		public get y():number
		{
			return this._y;
		}

		public set y(val:number)
		{
			if (this._y == val)
				return;

			this._y = val;

			this.invalidatePosition();
		}

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
		public get z():number
		{
			return this._z;
		}

		public set z(val:number)
		{
			if (this._z == val)
				return;

			this._z = val;

			this.invalidatePosition();
		}

		/**
		 *
		 */
		public get zOffset():number
		{
			return this._zOffset;
		}

		public set zOffset(value:number)
		{
			this._zOffset = value;
		}

		/**
		 * Creates a new <code>DisplayObject</code> instance.
		 */
		constructor()
		{
			super();

			// Cached vector of transformation components used when
			// recomposing the transform matrix in updateTransform()

			this._transformComponents = new Array<away.geom.Vector3D>(3);//_transformComponents = new Vector.<Vector3D>(3, true);

			this._transformComponents[0] = this._pos;
			this._transformComponents[1] = this._rot;
			this._transformComponents[2] = this._sca;

			//creation of associated transform object
			this._transform = new away.geom.Transform(this);

			this._matrix3D.identity();

			this._flipY.appendScale(1, -1, 1);

			this._pBounds = this.pCreateDefaultBoundingVolume();

			this._worldBounds = this.pCreateDefaultBoundingVolume();
		}

		/**
		 *
		 */
		public addEventListener(type:string, listener:Function)
		{
			super.addEventListener(type, listener);//, priority, useWeakReference);

			switch (type) {
				case away.events.DisplayObjectEvent.POSITION_CHANGED:
					this._listenToPositionChanged = true;
					break;
				case away.events.DisplayObjectEvent.ROTATION_CHANGED:
					this._listenToRotationChanged = true;
					break;
				case away.events.DisplayObjectEvent.SCALE_CHANGED:
					this._listenToScaleChanged = true;
					break;
			}
		}

		/**
		 *
		 */
		public clone():DisplayObject
		{
			var clone:DisplayObject = new DisplayObject();
			clone.pivotPoint = this.pivotPoint;
			clone._iMatrix3D = this._iMatrix3D;
			clone.name = name;

			// todo: implement for all subtypes
			return clone;
		}

		/**
		 *
		 */
		public dispose()
		{
			if (this.parent)
				this.parent.removeChild(this);

			var len:number = this._pRenderables.length;
			for (var i:number = 0; i < len; i++)
				this._pRenderables[i].dispose();
		}

		/**
		 * @inheritDoc
		 */
		public disposeAsset()
		{
			this.dispose();
		}

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
		public getBounds(targetCoordinateSpace:DisplayObject):away.geom.Rectangle
		{
			return this._bounds; //TODO
		}

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
		public getRect(targetCoordinateSpace:DisplayObject):away.geom.Rectangle
		{
			return this._bounds; //TODO
		}

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
		public globalToLocal(point:away.geom.Point):away.geom.Point
		{
			return point; //TODO
		}

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
		public globalToLocal3D(point:away.geom.Point):away.geom.Vector3D
		{
			return new away.geom.Vector3D(); //TODO
		}

		/**
		 * Evaluates the bounding box of the display object to see if it overlaps or
		 * intersects with the bounding box of the <code>obj</code> display object.
		 *
		 * @param obj The display object to test against.
		 * @return <code>true</code> if the bounding boxes of the display objects
		 *         intersect; <code>false</code> if not.
		 */
		public hitTestObject(obj:DisplayObject):boolean
		{
			return false; //TODO
		}

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
		public hitTestPoint(x:number, y:number, shapeFlag:boolean = false):boolean
		{
			return false; //TODO
		}

		/**
		 * @inheritDoc
		 */
		public isIntersectingRay(rayPosition:away.geom.Vector3D, rayDirection:away.geom.Vector3D):boolean
		{
			var localRayPosition:away.geom.Vector3D = this.inverseSceneTransform.transformVector(rayPosition);
			var localRayDirection:away.geom.Vector3D = this.inverseSceneTransform.deltaTransformVector(rayDirection);
			var pickingCollisionVO:away.pick.PickingCollisionVO = this._iPickingCollisionVO;

			if (!pickingCollisionVO.localNormal)
				pickingCollisionVO.localNormal = new away.geom.Vector3D();

			var rayEntryDistance:number = this.bounds.rayIntersection(localRayPosition, localRayDirection, pickingCollisionVO.localNormal);

			if (rayEntryDistance < 0)
				return false;

			pickingCollisionVO.rayEntryDistance = rayEntryDistance;
			pickingCollisionVO.localRayPosition = localRayPosition;
			pickingCollisionVO.localRayDirection = localRayDirection;
			pickingCollisionVO.rayPosition = rayPosition;
			pickingCollisionVO.rayDirection = rayDirection;
			pickingCollisionVO.rayOriginIsInsideBounds = rayEntryDistance == 0;

			return true;
		}

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
		public local3DToGlobal(point3d:away.geom.Vector3D):away.geom.Point
		{
			return new away.geom.Point(); //TODO
		}

		/**
		 * Rotates the 3d object around to face a point defined relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
		 *
		 * @param    target        The vector defining the point to be looked at
		 * @param    upAxis        An optional vector used to define the desired up orientation of the 3d object after rotation has occurred
		 */
		public lookAt(target:away.geom.Vector3D, upAxis:away.geom.Vector3D = null)
		{

			var yAxis:away.geom.Vector3D;
			var zAxis:away.geom.Vector3D;
			var xAxis:away.geom.Vector3D;
			var raw:Array<number>;

			if (upAxis == null)
				upAxis = away.geom.Vector3D.Y_AXIS;
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

			raw = away.geom.Matrix3DUtils.RAW_DATA_CONTAINER;

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

			var m:away.geom.Matrix3D = new away.geom.Matrix3D();
			m.copyRawDataFrom(raw);

			var vec:away.geom.Vector3D = m.decompose()[1];

			this._rotationX = vec.x;
			this._rotationY = vec.y;
			this._rotationZ = vec.z;

			this.invalidateRotation();
		}

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
		public localToGlobal(point:away.geom.Point):away.geom.Point
		{
			return new away.geom.Point(); //TODO
		}

		/**
		 * Moves the 3d object directly to a point in space
		 *
		 * @param    dx        The amount of movement along the local x axis.
		 * @param    dy        The amount of movement along the local y axis.
		 * @param    dz        The amount of movement along the local z axis.
		 */

		public moveTo(dx:number, dy:number, dz:number)
		{
			if (this._x == dx && this._y == dy && this._z == dz)
				return;

			this._x = dx;
			this._y = dy;
			this._z = dz;

			this.invalidatePosition();
		}

		/**
		 * Moves the local point around which the object rotates.
		 *
		 * @param    dx        The amount of movement along the local x axis.
		 * @param    dy        The amount of movement along the local y axis.
		 * @param    dz        The amount of movement along the local z axis.
		 */
		public movePivot(dx:number, dy:number, dz:number)
		{
			if (this._pivotPoint == null)
				this._pivotPoint = new away.geom.Vector3D();

			this._pivotPoint.x += dx;
			this._pivotPoint.y += dy;
			this._pivotPoint.z += dz;

			this.invalidatePivot();
		}

		/**
		 * Rotates the 3d object around it's local x-axis
		 *
		 * @param    angle        The amount of rotation in degrees
		 */
		public pitch(angle:number)
		{
			this.rotate(away.geom.Vector3D.X_AXIS, angle);
		}

		/**
		 *
		 */
		public getRenderSceneTransform(camera:away.entities.Camera):away.geom.Matrix3D
		{
			if (this.orientationMode == OrientationMode.CAMERA_PLANE) {
				var comps:away.geom.Vector3D[] = camera.sceneTransform.decompose();
				var scale:away.geom.Vector3D = comps[2];
				comps[0] = this.scenePosition;
				scale.x = this._pScaleX;
				scale.y = this._pScaleY;
				this._orientationMatrix.recompose(comps);

				//add in case of pivot
				if (!this._pivotZero && this.alignmentMode == AlignmentMode.PIVOT_POINT)
					this._orientationMatrix.prependTranslation(-this._pivotPoint.x, -this._pivotPoint.y, -this._pivotPoint.z);

				return this._orientationMatrix;
			}

			return this.sceneTransform;
		}

		/**
		 * Rotates the 3d object around it's local z-axis
		 *
		 * @param    angle        The amount of rotation in degrees
		 */
		public roll(angle:number)
		{
			this.rotate(away.geom.Vector3D.Z_AXIS, angle);
		}

		/**
		 * Rotates the 3d object around an axis by a defined angle
		 *
		 * @param    axis        The vector defining the axis of rotation
		 * @param    angle        The amount of rotation in degrees
		 */
		public rotate(axis:away.geom.Vector3D, angle:number)
		{
			var m:away.geom.Matrix3D = new away.geom.Matrix3D();
			m.prependRotation(angle, axis);

			var vec:away.geom.Vector3D = m.decompose()[1];

			this._rotationX += vec.x;
			this._rotationY += vec.y;
			this._rotationZ += vec.z;

			this.invalidateRotation();
		}

		/**
		 * Rotates the 3d object directly to a euler angle
		 *
		 * @param    ax        The angle in degrees of the rotation around the x axis.
		 * @param    ay        The angle in degrees of the rotation around the y axis.
		 * @param    az        The angle in degrees of the rotation around the z axis.
		 */
		public rotateTo(ax:number, ay:number, az:number)
		{
			this._rotationX = ax*away.geom.MathConsts.DEGREES_TO_RADIANS;
			this._rotationY = ay*away.geom.MathConsts.DEGREES_TO_RADIANS;
			this._rotationZ = az*away.geom.MathConsts.DEGREES_TO_RADIANS;

			this.invalidateRotation();
		}

		/**
		 *
		 */
		public removeEventListener(type:string, listener:Function)
		{
			super.removeEventListener(type, listener);

			if (this.hasEventListener(type, listener))
				return;

			switch (type) {
				case away.events.DisplayObjectEvent.POSITION_CHANGED:
					this._listenToPositionChanged = false;
					break;

				case away.events.DisplayObjectEvent.ROTATION_CHANGED:
					this._listenToRotationChanged = false;
					break;

				case away.events.DisplayObjectEvent.SCALE_CHANGED:
					this._listenToScaleChanged = false;
					break;
			}
		}

		/**
		 * Moves the 3d object along a vector by a defined length
		 *
		 * @param    axis        The vector defining the axis of movement
		 * @param    distance    The length of the movement
		 */
		public translate(axis:away.geom.Vector3D, distance:number)
		{
			var x:number = axis.x, y:number = axis.y, z:number = axis.z;
			var len:number = distance/Math.sqrt(x*x + y*y + z*z);

			this._x += x*len;
			this._y += y*len;
			this._z += z*len;

			this.invalidatePosition();
		}

		/**
		 * Moves the 3d object along a vector by a defined length
		 *
		 * @param    axis        The vector defining the axis of movement
		 * @param    distance    The length of the movement
		 */
		public translateLocal(axis:away.geom.Vector3D, distance:number)
		{
			var x:number = axis.x, y:number = axis.y, z:number = axis.z;
			var len:number = distance/Math.sqrt(x*x + y*y + z*z);

			this._iMatrix3D.prependTranslation(x*len, y*len, z*len);

			this._matrix3D.copyColumnTo(3, this._pos);

			this._x = this._pos.x;
			this._y = this._pos.y;
			this._z = this._pos.z;

			this.invalidatePosition();
		}

		/**
		 * Rotates the 3d object around it's local y-axis
		 *
		 * @param    angle        The amount of rotation in degrees
		 */
		public yaw(angle:number)
		{
			this.rotate(away.geom.Vector3D.Y_AXIS, angle);
		}

		/**
		 * @internal
		 */
		public _iController:away.controllers.ControllerBase;

		/**
		 * @internal
		 */
		public get _iAssignedPartition():away.partition.Partition
		{
			return this._pImplicitPartition;
		}

		/**
		 * The transformation of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
		 *
		 * @internal
		 */
		public get _iMatrix3D():away.geom.Matrix3D
		{
			if (this._matrix3DDirty)
				this._pUpdateMatrix3D();

			return this._matrix3D;
		}

		public set _iMatrix3D(val:away.geom.Matrix3D)
		{

			// TODO: From AS3 - Do we still need this in JS ?
			//ridiculous matrix error
			/*
			if (!val.rawData[0]) {

				var raw:number[] = away.geom.Matrix3DUtils.RAW_DATA_CONTAINER;
				val.copyRawDataTo(raw);
				raw[0] = this._smallestNumber;
				val.copyRawDataFrom(raw);
			}
			//*/
			var elements:away.geom.Vector3D[] = val.decompose();
			var vec:away.geom.Vector3D;

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
		}

		/**
		 * @internal
		 */
		public get _iPickingCollisionVO():away.pick.PickingCollisionVO
		{
			if (!this._pickingCollisionVO)
				this._pickingCollisionVO = new away.pick.PickingCollisionVO(this);

			return this._pickingCollisionVO;
		}

		/**
		 * @internal
		 */
		public iSetParent(value:away.containers.DisplayObjectContainer)
		{
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
		}

		/**
		 * @protected
		 */
		public pCreateDefaultBoundingVolume():away.bounds.BoundingVolumeBase
		{
			// point lights should be using sphere bounds
			// directional lights should be using null bounds
			return new away.bounds.AxisAlignedBoundingBox();
		}

		/**
		 * @protected
		 */
		public pCreateEntityPartitionNode():away.partition.EntityNode
		{
			throw new away.errors.AbstractMethodError();
		}

		/**
		 * @protected
		 */
		public pInvalidateBounds()
		{
			this._pBoundsInvalid = true;
			this._worldBoundsInvalid = true;
		}

		/**
		 * @protected
		 */
		public pInvalidateSceneTransform()
		{
			this._pSceneTransformDirty = !this._pIgnoreTransform;
			this._inverseSceneTransformDirty = !this._pIgnoreTransform;
			this._scenePositionDirty = !this._pIgnoreTransform;

			this._worldBoundsInvalid = !this._pIgnoreTransform;

			if (this._listenToSceneTransformChanged)
				this.notifySceneTransformChange();
		}

		/**
		 * @protected
		 */
		public pUpdateBounds()
		{
			this._width = this._pBounds.aabb.width*this._pScaleX;
			this._height = this._pBounds.aabb.height*this._pScaleY;
			this._depth = this._pBounds.aabb.depth*this._pScaleZ;

			this._pBoundsInvalid = false;
		}

		/**
		 * @protected
		 */
		public _pUpdateImplicitMouseEnabled(value:boolean)
		{
			this._pImplicitMouseEnabled = this._explicitMouseEnabled && value;

			// If there is a parent and this child does not have a picking collider, use its parent's picking collider.
			if (this._pImplicitMouseEnabled && this._pParent && !this._pickingCollider)
				this._pickingCollider =  this._pParent._pickingCollider;
		}

		/**
		 * @protected
		 */
		public _pUpdateImplicitPartition(value:away.partition.Partition)
		{
			// assign parent implicit partition if no explicit one is given
			this._pImplicitPartition = this._explicitPartition || value;
		}

		/**
		 * @protected
		 */
		public _pUpdateImplicitVisibility(value:boolean)
		{
			this._pImplicitVisibility = this._explicitVisibility && value;
		}

		/**
		 * @protected
		 */
		public _pUpdateMatrix3D()
		{

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
				this._matrix3D.prependTranslation(-this._pivotPoint.x, -this._pivotPoint.y, -this._pivotPoint.z);
				if (this.alignmentMode != AlignmentMode.PIVOT_POINT)
					this._matrix3D.appendTranslation(this._pivotPoint.x*this._pScaleX, this._pivotPoint.y*this._pScaleY, this._pivotPoint.z*this._pScaleZ);
			}

			this._matrix3DDirty = false;
			this._positionDirty = false;
			this._rotationDirty = false;
			this._scaleDirty = false;
			this._pivotDirty = false;
		}

		/**
		 * @protected
		 */
		public pUpdateSceneTransform()
		{
			if (this._pParent && !this._pParent._iIsRoot) {
				this._pSceneTransform.copyFrom(this._pParent.sceneTransform);
				this._pSceneTransform.prepend(this._iMatrix3D);
			} else {
				this._pSceneTransform.copyFrom(this._iMatrix3D);
			}

			this._pSceneTransformDirty = false;
		}

		public _iAddRenderable(renderable:away.pool.IRenderable):away.pool.IRenderable
		{
			this._pRenderables.push(renderable);

			return renderable;
		}


		public _iRemoveRenderable(renderable:away.pool.IRenderable):away.pool.IRenderable
		{
			var index:number = this._pRenderables.indexOf(renderable);

			this._pRenderables.splice(index, 1);

			return renderable;
		}

		/**
		 * @internal
		 */
		public _iCollidesBefore(shortestCollisionDistance:number, findClosest:boolean):boolean
		{
			return true;
		}

		/**
		 *
		 */
		public _iInternalUpdate()
		{
			if (this._iController)
				this._iController.update();
		}

		/**
		 * @internal
		 */
		public _iIsVisible():boolean
		{
			return this._pImplicitVisibility;
		}

		/**
		 * @internal
		 */
		public _iIsMouseEnabled():boolean
		{
			return this._pImplicitMouseEnabled;
		}

		/**
		 * @internal
		 */
		public _iSetScene(value:away.containers.Scene)
		{
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
		}

		/**
		 * @protected
		 */
		public _pUpdateScene(value:away.containers.Scene)
		{
			if (this._pScene) {
				this._pScene.dispatchEvent(new away.events.SceneEvent(away.events.SceneEvent.REMOVED_FROM_SCENE, this));

				//unregister entity from current scene
				this._pScene.iUnregisterEntity(this);
			}

			this._pScene = value;

			if (value) {
				value.dispatchEvent(new away.events.SceneEvent(away.events.SceneEvent.ADDED_TO_SCENE, this));

				//register entity with new scene
				value.iRegisterEntity(this);
			}

			this.notifySceneChange();
		}

		/**
		 * @private
		 */
		private addBounds()
		{
			if (!this._boundsIsShown) {
				this._boundsIsShown = true;
//				this.addChild(this._pBounds.boundingEntity);//TODO turn this into a Node-based bounding Entity
			}
		}

		/**
		 * @private
		 */
		private notifyPositionChanged()
		{
			if (!this._positionChanged)
				this._positionChanged = new away.events.DisplayObjectEvent(away.events.DisplayObjectEvent.POSITION_CHANGED, this);

			this.dispatchEvent(this._positionChanged);
		}

		/**
		 * @private
		 */
		private notifyRotationChanged()
		{
			if (!this._rotationChanged)
				this._rotationChanged = new away.events.DisplayObjectEvent(away.events.DisplayObjectEvent.ROTATION_CHANGED, this);

			this.dispatchEvent(this._rotationChanged);
		}

		/**
		 * @private
		 */
		private notifyScaleChanged()
		{
			if (!this._scaleChanged)
				this._scaleChanged = new away.events.DisplayObjectEvent(away.events.DisplayObjectEvent.SCALE_CHANGED, this);

			this.dispatchEvent(this._scaleChanged);
		}

		/**
		 * @private
		 */
		private notifySceneChange()
		{
			if (this._listenToSceneChanged) {
				if (!this._scenechanged)
					this._scenechanged = new away.events.DisplayObjectEvent(away.events.DisplayObjectEvent.SCENE_CHANGED, this);

				this.dispatchEvent(this._scenechanged);
			}
		}

		/**
		 * @private
		 */
		private notifySceneTransformChange()
		{
			if (!this._sceneTransformChanged)
				this._sceneTransformChanged = new away.events.DisplayObjectEvent(away.events.DisplayObjectEvent.SCENETRANSFORM_CHANGED, this);

			this.dispatchEvent(this._sceneTransformChanged);
		}

		/**
		 * Invalidates the 3D transformation matrix, causing it to be updated upon the next request
		 *
		 * @private
		 */
		private invalidateMatrix3D():void
		{
			if (this._matrix3DDirty)
				return;

			this._matrix3DDirty = true;

			if (!this._pSceneTransformDirty && !this._pIgnoreTransform)
				this.pInvalidateSceneTransform();
		}

		/**
		 * @private
		 */
		private invalidatePivot()
		{
			this._pivotZero = (this._pivotPoint.x == 0) && (this._pivotPoint.y == 0) && (this._pivotPoint.z == 0);

			if (this._pivotDirty)
				return;

			this._pivotDirty = true;

			this.invalidateMatrix3D();
		}

		/**
		 * @private
		 */
		private invalidatePosition()
		{
			if (this._positionDirty)
				return;

			this._positionDirty = true;

			this.invalidateMatrix3D();

			if (this._listenToPositionChanged)
				this.notifyPositionChanged();
		}

		/**
		 * @private
		 */
		private invalidateRotation()
		{
			if (this._rotationDirty)
				return;

			this._rotationDirty = true;

			this.invalidateMatrix3D();

			if (this._listenToRotationChanged)
				this.notifyRotationChanged();
		}

		/**
		 * @private
		 */
		private invalidateScale()
		{
			if (this._scaleDirty)
				return;

			this._scaleDirty = true;

			this.invalidateMatrix3D();

			if (this._listenToScaleChanged)
				this.notifyScaleChanged();
		}

		/**
		 * @private
		 */
		private removeBounds()
		{
			if (this._boundsIsShown) {
				this._boundsIsShown = false;
//				this.removeChild(this._pBounds.boundingEntity);
				this._pBounds.disposeRenderable();
			}
		}
	}
}
