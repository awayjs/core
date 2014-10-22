var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObject = require("awayjs-core/lib/core/base/DisplayObject");

var AssetType = require("awayjs-core/lib/core/library/AssetType");

var ArgumentError = require("awayjs-core/lib/errors/ArgumentError");
var Error = require("awayjs-core/lib/errors/Error");
var RangeError = require("awayjs-core/lib/errors/RangeError");

/**
* The DisplayObjectContainer class is the base class for all objects that can
* serve as display object containers on the display list. The display list
* manages all objects displayed in the Flash runtimes. Use the
* DisplayObjectContainer class to arrange the display objects in the display
* list. Each DisplayObjectContainer object has its own child list for
* organizing the z-order of the objects. The z-order is the front-to-back
* order that determines which object is drawn in front, which is behind, and
* so on.
*
* <p>DisplayObject is an abstract base class; therefore, you cannot call
* DisplayObject directly. Invoking <code>new DisplayObject()</code> throws an
* <code>ArgumentError</code> exception.</p>
* The DisplayObjectContainer class is an abstract base class for all objects
* that can contain child objects. It cannot be instantiated directly; calling
* the <code>new DisplayObjectContainer()</code> constructor throws an
* <code>ArgumentError</code> exception.
*
* <p>For more information, see the "Display Programming" chapter of the
* <i>ActionScript 3.0 Developer's Guide</i>.</p>
*/
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    /**
    * Calling the <code>new DisplayObjectContainer()</code> constructor throws
    * an <code>ArgumentError</code> exception. You <i>can</i>, however, call
    * constructors for the following subclasses of DisplayObjectContainer:
    * <ul>
    *   <li><code>new Loader()</code></li>
    *   <li><code>new Sprite()</code></li>
    *   <li><code>new MovieClip()</code></li>
    * </ul>
    */
    function DisplayObjectContainer() {
        _super.call(this);
        this._mouseChildren = true;
        this._children = new Array();
    }
    Object.defineProperty(DisplayObjectContainer.prototype, "assetType", {
        /**
        *
        */
        get: function () {
            return AssetType.CONTAINER;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DisplayObjectContainer.prototype, "mouseChildren", {
        /**
        * Determines whether or not the children of the object are mouse, or user
        * input device, enabled. If an object is enabled, a user can interact with
        * it by using a mouse or user input device. The default is
        * <code>true</code>.
        *
        * <p>This property is useful when you create a button with an instance of
        * the Sprite class(instead of using the SimpleButton class). When you use a
        * Sprite instance to create a button, you can choose to decorate the button
        * by using the <code>addChild()</code> method to add additional Sprite
        * instances. This process can cause unexpected behavior with mouse events
        * because the Sprite instances you add as children can become the target
        * object of a mouse event when you expect the parent instance to be the
        * target object. To ensure that the parent instance serves as the target
        * objects for mouse events, you can set the <code>mouseChildren</code>
        * property of the parent instance to <code>false</code>.</p>
        *
        * <p> No event is dispatched by setting this property. You must use the
        * <code>addEventListener()</code> method to create interactive
        * functionality.</p>
        */
        get: function () {
            return this._mouseChildren;
        },
        set: function (value) {
            if (this._mouseChildren == value)
                return;

            this._mouseChildren = value;

            this._pUpdateImplicitMouseEnabled(this._pParent ? this._pParent.mouseChildren : true);
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(DisplayObjectContainer.prototype, "numChildren", {
        /**
        * Returns the number of children of this object.
        */
        get: function () {
            return this._children.length;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * Adds a child DisplayObject instance to this DisplayObjectContainer
    * instance. The child is added to the front(top) of all other children in
    * this DisplayObjectContainer instance.(To add a child to a specific index
    * position, use the <code>addChildAt()</code> method.)
    *
    * <p>If you add a child object that already has a different display object
    * container as a parent, the object is removed from the child list of the
    * other display object container. </p>
    *
    * <p><b>Note:</b> The command <code>stage.addChild()</code> can cause
    * problems with a published SWF file, including security problems and
    * conflicts with other loaded SWF files. There is only one Stage within a
    * Flash runtime instance, no matter how many SWF files you load into the
    * runtime. So, generally, objects should not be added to the Stage,
    * directly, at all. The only object the Stage should contain is the root
    * object. Create a DisplayObjectContainer to contain all of the items on the
    * display list. Then, if necessary, add that DisplayObjectContainer instance
    * to the Stage.</p>
    *
    * @param child The DisplayObject instance to add as a child of this
    *              DisplayObjectContainer instance.
    * @return The DisplayObject instance that you pass in the <code>child</code>
    *         parameter.
    * @throws ArgumentError Throws if the child is the same as the parent. Also
    *                       throws if the caller is a child(or grandchild etc.)
    *                       of the child being added.
    * @event added Dispatched when a display object is added to the display
    *              list.
    */
    DisplayObjectContainer.prototype.addChild = function (child) {
        if (child == null)
            throw new Error("Parameter child cannot be null.");

        //if child already has a parent, remove it.
        if (child._pParent)
            child._pParent.removeChildInternal(child);

        child.iSetParent(this);

        this._children.push(child);

        return child;
    };

    /**
    * Adds a child DisplayObject instance to this DisplayObjectContainer
    * instance. The child is added at the index position specified. An index of
    * 0 represents the back(bottom) of the display list for this
    * DisplayObjectContainer object.
    *
    * <p>For example, the following example shows three display objects, labeled
    * a, b, and c, at index positions 0, 2, and 1, respectively:</p>
    *
    * <p>If you add a child object that already has a different display object
    * container as a parent, the object is removed from the child list of the
    * other display object container. </p>
    *
    * @param child The DisplayObject instance to add as a child of this
    *              DisplayObjectContainer instance.
    * @param index The index position to which the child is added. If you
    *              specify a currently occupied index position, the child object
    *              that exists at that position and all higher positions are
    *              moved up one position in the child list.
    * @return The DisplayObject instance that you pass in the <code>child</code>
    *         parameter.
    * @throws ArgumentError Throws if the child is the same as the parent. Also
    *                       throws if the caller is a child(or grandchild etc.)
    *                       of the child being added.
    * @throws RangeError    Throws if the index position does not exist in the
    *                       child list.
    * @event added Dispatched when a display object is added to the display
    *              list.
    */
    DisplayObjectContainer.prototype.addChildAt = function (child, index /*int*/ ) {
        return child;
    };

    DisplayObjectContainer.prototype.addChildren = function () {
        var childarray = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            childarray[_i] = arguments[_i + 0];
        }
        var len = childarray.length;
        for (var i = 0; i < len; i++)
            this.addChild(childarray[i]);
    };

    /**
    *
    */
    DisplayObjectContainer.prototype.clone = function () {
        var clone = new DisplayObjectContainer();
        clone.pivot = this.pivot;
        clone._iMatrix3D = this._iMatrix3D;
        clone.partition = this.partition;
        clone.name = name;

        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            clone.addChild(this._children[i].clone());

        // todo: implement for all subtypes
        return clone;
    };

    /**
    * Determines whether the specified display object is a child of the
    * DisplayObjectContainer instance or the instance itself. The search
    * includes the entire display list including this DisplayObjectContainer
    * instance. Grandchildren, great-grandchildren, and so on each return
    * <code>true</code>.
    *
    * @param child The child object to test.
    * @return <code>true</code> if the <code>child</code> object is a child of
    *         the DisplayObjectContainer or the container itself; otherwise
    *         <code>false</code>.
    */
    DisplayObjectContainer.prototype.contains = function (child) {
        return this._children.indexOf(child) >= 0;
    };

    /**
    *
    */
    DisplayObjectContainer.prototype.disposeWithChildren = function () {
        this.dispose();

        while (this.numChildren > 0)
            this.getChildAt(0).dispose();
    };

    /**
    * Returns the child display object instance that exists at the specified
    * index.
    *
    * @param index The index position of the child object.
    * @return The child display object at the specified index position.
    * @throws RangeError    Throws if the index does not exist in the child
    *                       list.
    */
    DisplayObjectContainer.prototype.getChildAt = function (index /*int*/ ) {
        var child = this._children[index];

        if (child == null)
            throw new RangeError("Index does not exist in the child list of the caller");

        return child;
    };

    /**
    * Returns the child display object that exists with the specified name. If
    * more that one child display object has the specified name, the method
    * returns the first object in the child list.
    *
    * <p>The <code>getChildAt()</code> method is faster than the
    * <code>getChildByName()</code> method. The <code>getChildAt()</code> method
    * accesses a child from a cached array, whereas the
    * <code>getChildByName()</code> method has to traverse a linked list to
    * access a child.</p>
    *
    * @param name The name of the child to return.
    * @return The child display object with the specified name.
    */
    DisplayObjectContainer.prototype.getChildByName = function (name) {
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            if (this._children[i].name == name)
                return this._children[i];

        return null;
    };

    /**
    * Returns the index position of a <code>child</code> DisplayObject instance.
    *
    * @param child The DisplayObject instance to identify.
    * @return The index position of the child display object to identify.
    * @throws ArgumentError Throws if the child parameter is not a child of this
    *                       object.
    */
    DisplayObjectContainer.prototype.getChildIndex = function (child) {
        var childIndex = this._children.indexOf(child);

        if (childIndex == -1)
            throw new ArgumentError("Child parameter is not a child of the caller");

        return childIndex;
    };

    /**
    * Returns an array of objects that lie under the specified point and are
    * children(or grandchildren, and so on) of this DisplayObjectContainer
    * instance. Any child objects that are inaccessible for security reasons are
    * omitted from the returned array. To determine whether this security
    * restriction affects the returned array, call the
    * <code>areInaccessibleObjectsUnderPoint()</code> method.
    *
    * <p>The <code>point</code> parameter is in the coordinate space of the
    * Stage, which may differ from the coordinate space of the display object
    * container(unless the display object container is the Stage). You can use
    * the <code>globalToLocal()</code> and the <code>localToGlobal()</code>
    * methods to convert points between these coordinate spaces.</p>
    *
    * @param point The point under which to look.
    * @return An array of objects that lie under the specified point and are
    *         children(or grandchildren, and so on) of this
    *         DisplayObjectContainer instance.
    */
    DisplayObjectContainer.prototype.getObjectsUnderPoint = function (point) {
        return new Array();
    };

    /**
    * Removes the specified <code>child</code> DisplayObject instance from the
    * child list of the DisplayObjectContainer instance. The <code>parent</code>
    * property of the removed child is set to <code>null</code> , and the object
    * is garbage collected if no other references to the child exist. The index
    * positions of any display objects above the child in the
    * DisplayObjectContainer are decreased by 1.
    *
    * <p>The garbage collector reallocates unused memory space. When a variable
    * or object is no longer actively referenced or stored somewhere, the
    * garbage collector sweeps through and wipes out the memory space it used to
    * occupy if no other references to it exist.</p>
    *
    * @param child The DisplayObject instance to remove.
    * @return The DisplayObject instance that you pass in the <code>child</code>
    *         parameter.
    * @throws ArgumentError Throws if the child parameter is not a child of this
    *                       object.
    */
    DisplayObjectContainer.prototype.removeChild = function (child) {
        if (child == null)
            throw new Error("Parameter child cannot be null");

        this.removeChildInternal(child);

        child.iSetParent(null);

        return child;
    };

    /**
    * Removes a child DisplayObject from the specified <code>index</code>
    * position in the child list of the DisplayObjectContainer. The
    * <code>parent</code> property of the removed child is set to
    * <code>null</code>, and the object is garbage collected if no other
    * references to the child exist. The index positions of any display objects
    * above the child in the DisplayObjectContainer are decreased by 1.
    *
    * <p>The garbage collector reallocates unused memory space. When a variable
    * or object is no longer actively referenced or stored somewhere, the
    * garbage collector sweeps through and wipes out the memory space it used to
    * occupy if no other references to it exist.</p>
    *
    * @param index The child index of the DisplayObject to remove.
    * @return The DisplayObject instance that was removed.
    * @throws RangeError    Throws if the index does not exist in the child
    *                       list.
    * @throws SecurityError This child display object belongs to a sandbox to
    *                       which the calling object does not have access. You
    *                       can avoid this situation by having the child movie
    *                       call the <code>Security.allowDomain()</code> method.
    */
    DisplayObjectContainer.prototype.removeChildAt = function (index /*int*/ ) {
        return this.removeChild(this._children[index]);
    };

    /**
    * Removes all <code>child</code> DisplayObject instances from the child list
    * of the DisplayObjectContainer instance. The <code>parent</code> property
    * of the removed children is set to <code>null</code>, and the objects are
    * garbage collected if no other references to the children exist.
    *
    * The garbage collector reallocates unused memory space. When a variable or
    * object is no longer actively referenced or stored somewhere, the garbage
    * collector sweeps through and wipes out the memory space it used to occupy
    * if no other references to it exist.
    *
    * @param beginIndex The beginning position. A value smaller than 0 throws a RangeError.
    * @param endIndex The ending position. A value smaller than 0 throws a RangeError.
    * @throws RangeError    Throws if the beginIndex or endIndex positions do
    *                       not exist in the child list.
    */
    DisplayObjectContainer.prototype.removeChildren = function (beginIndex, endIndex) {
        if (typeof beginIndex === "undefined") { beginIndex = 0; }
        if (typeof endIndex === "undefined") { endIndex = 2147483647; }
        if (beginIndex < 0)
            throw new RangeError("beginIndex is out of range of the child list");

        if (endIndex > this._children.length)
            throw new RangeError("endIndex is out of range of the child list");

        for (var i = beginIndex; i < endIndex; i++)
            this.removeChild(this._children[i]);
    };

    /**
    * Changes the position of an existing child in the display object container.
    * This affects the layering of child objects. For example, the following
    * example shows three display objects, labeled a, b, and c, at index
    * positions 0, 1, and 2, respectively:
    *
    * <p>When you use the <code>setChildIndex()</code> method and specify an
    * index position that is already occupied, the only positions that change
    * are those in between the display object's former and new position. All
    * others will stay the same. If a child is moved to an index LOWER than its
    * current index, all children in between will INCREASE by 1 for their index
    * reference. If a child is moved to an index HIGHER than its current index,
    * all children in between will DECREASE by 1 for their index reference. For
    * example, if the display object container in the previous example is named
    * <code>container</code>, you can swap the position of the display objects
    * labeled a and b by calling the following code:</p>
    *
    * <p>This code results in the following arrangement of objects:</p>
    *
    * @param child The child DisplayObject instance for which you want to change
    *              the index number.
    * @param index The resulting index number for the <code>child</code> display
    *              object.
    * @throws ArgumentError Throws if the child parameter is not a child of this
    *                       object.
    * @throws RangeError    Throws if the index does not exist in the child
    *                       list.
    */
    DisplayObjectContainer.prototype.setChildIndex = function (child, index /*int*/ ) {
        //TODO
    };

    /**
    * Swaps the z-order (front-to-back order) of the two specified child
    * objects. All other child objects in the display object container remain in
    * the same index positions.
    *
    * @param child1 The first child object.
    * @param child2 The second child object.
    * @throws ArgumentError Throws if either child parameter is not a child of
    *                       this object.
    */
    DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
        //TODO
    };

    /**
    * Swaps the z-order(front-to-back order) of the child objects at the two
    * specified index positions in the child list. All other child objects in
    * the display object container remain in the same index positions.
    *
    * @param index1 The index position of the first child object.
    * @param index2 The index position of the second child object.
    * @throws RangeError If either index does not exist in the child list.
    */
    DisplayObjectContainer.prototype.swapChildrenAt = function (index1 /*int*/ , index2 /*int*/ ) {
        //TODO
    };

    /**
    * @protected
    */
    DisplayObjectContainer.prototype.pInvalidateSceneTransform = function () {
        _super.prototype.pInvalidateSceneTransform.call(this);

        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i].pInvalidateSceneTransform();
    };

    /**
    * @protected
    */
    DisplayObjectContainer.prototype._pUpdateScene = function (value) {
        _super.prototype._pUpdateScene.call(this, value);

        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i]._pUpdateScene(value);
    };

    /**
    * @protected
    */
    DisplayObjectContainer.prototype._pUpdateImplicitMouseEnabled = function (value) {
        _super.prototype._pUpdateImplicitMouseEnabled.call(this, value);

        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i]._pUpdateImplicitMouseEnabled(this._mouseChildren);
    };

    /**
    * @protected
    */
    DisplayObjectContainer.prototype._pUpdateImplicitVisibility = function (value) {
        _super.prototype._pUpdateImplicitVisibility.call(this, value);

        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i]._pUpdateImplicitVisibility(this._pImplicitVisibility);
    };

    /**
    * @protected
    */
    DisplayObjectContainer.prototype._pUpdateImplicitPartition = function (value) {
        _super.prototype._pUpdateImplicitPartition.call(this, value);

        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i]._pUpdateImplicitPartition(this._pImplicitPartition);
    };

    /**
    * @private
    *
    * @param child
    */
    DisplayObjectContainer.prototype.removeChildInternal = function (child) {
        this._children.splice(this.getChildIndex(child), 1);

        return child;
    };
    return DisplayObjectContainer;
})(DisplayObject);

module.exports = DisplayObjectContainer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvRGlzcGxheU9iamVjdENvbnRhaW5lci50cyJdLCJuYW1lcyI6WyJEaXNwbGF5T2JqZWN0Q29udGFpbmVyIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5jb25zdHJ1Y3RvciIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGQiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkQXQiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkcmVuIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5jbG9uZSIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuY29udGFpbnMiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmRpc3Bvc2VXaXRoQ2hpbGRyZW4iLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmdldENoaWxkQXQiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmdldENoaWxkQnlOYW1lIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5nZXRDaGlsZEluZGV4IiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5nZXRPYmplY3RzVW5kZXJQb2ludCIsIkRpc3BsYXlPYmplY3RDb250YWluZXIucmVtb3ZlQ2hpbGQiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnJlbW92ZUNoaWxkQXQiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnJlbW92ZUNoaWxkcmVuIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5zZXRDaGlsZEluZGV4IiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5zd2FwQ2hpbGRyZW4iLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnN3YXBDaGlsZHJlbkF0IiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5fcFVwZGF0ZVNjZW5lIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbiIsIkRpc3BsYXlPYmplY3RDb250YWluZXIucmVtb3ZlQ2hpbGRJbnRlcm5hbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0VBQzZFOztBQUc3RSxpRUFBeUU7O0FBRXpFLG1FQUEwRTtBQUMxRSxtREFBNEQ7QUFDNUQsNkRBQXFFOztBQUVyRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFvQkc7QUFDSDtJQUFxQ0EseUNBQWFBO0lBbUZqREE7Ozs7Ozs7OztNQURHQTtJQUNIQTtRQUVDQyxXQUFNQSxLQUFBQSxDQUFDQTtRQW5GUkEsS0FBUUEsY0FBY0EsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDdENBLEtBQVFBLFNBQVNBLEdBQXdCQSxJQUFJQSxLQUFLQSxDQUFnQkEsQ0FBQ0EsQ0FBQ0E7SUFtRnBFQSxDQUFDQTtJQTdFREQ7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLFNBQVNBLENBQUNBLFNBQVNBO1FBQzNCQSxDQUFDQTs7OztBQUFBQTtJQXVCREE7UUFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGNBQWNBO1FBQzNCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUF5QkEsS0FBYUE7WUFFckNBLElBQUlBLElBQUlBLENBQUNBLGNBQWNBLElBQUlBLEtBQUtBO2dCQUMvQkEsTUFBT0EsQ0FBQUE7O1lBRVJBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLEtBQUtBOztZQUUzQkEsSUFBSUEsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUNyRkEsQ0FBQ0E7Ozs7QUFWQUE7O0lBZURBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFD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O0lBQ3hFQSxDQUFDQTs7SUFPRHRCOzs7O01BREdBOzJEQUNIQSxVQUE0QkEsS0FBbUJBO1FBRTlDdUIsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7O1FBRW5EQSxPQUFPQSxLQUFLQTtJQUNiQSxDQUFDQTtJQUNGdkIsOEJBQUNBO0FBQURBLENBQUNBLEVBL2dCb0MsYUFBYSxFQStnQmpEOztBQUVELHVDQUFnQyxDQUFBIiwiZmlsZSI6ImNvbnRhaW5lcnMvRGlzcGxheU9iamVjdENvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY2VuZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb250YWluZXJzL1NjZW5lXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcbmltcG9ydCBQb2ludFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vUG9pbnRcIik7XG5pbXBvcnQgUGFydGl0aW9uXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3BhcnRpdGlvbi9QYXJ0aXRpb25cIik7XG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xuaW1wb3J0IElBc3NldFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IEFyZ3VtZW50RXJyb3JcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQXJndW1lbnRFcnJvclwiKTtcbmltcG9ydCBFcnJvclx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XG5pbXBvcnQgUmFuZ2VFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL1JhbmdlRXJyb3JcIik7XG5cbi8qKlxuICogVGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBvYmplY3RzIHRoYXQgY2FuXG4gKiBzZXJ2ZSBhcyBkaXNwbGF5IG9iamVjdCBjb250YWluZXJzIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFRoZSBkaXNwbGF5IGxpc3RcbiAqIG1hbmFnZXMgYWxsIG9iamVjdHMgZGlzcGxheWVkIGluIHRoZSBGbGFzaCBydW50aW1lcy4gVXNlIHRoZVxuICogRGlzcGxheU9iamVjdENvbnRhaW5lciBjbGFzcyB0byBhcnJhbmdlIHRoZSBkaXNwbGF5IG9iamVjdHMgaW4gdGhlIGRpc3BsYXlcbiAqIGxpc3QuIEVhY2ggRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QgaGFzIGl0cyBvd24gY2hpbGQgbGlzdCBmb3JcbiAqIG9yZ2FuaXppbmcgdGhlIHotb3JkZXIgb2YgdGhlIG9iamVjdHMuIFRoZSB6LW9yZGVyIGlzIHRoZSBmcm9udC10by1iYWNrXG4gKiBvcmRlciB0aGF0IGRldGVybWluZXMgd2hpY2ggb2JqZWN0IGlzIGRyYXduIGluIGZyb250LCB3aGljaCBpcyBiZWhpbmQsIGFuZFxuICogc28gb24uXG4gKlxuICogPHA+RGlzcGxheU9iamVjdCBpcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzOyB0aGVyZWZvcmUsIHlvdSBjYW5ub3QgY2FsbFxuICogRGlzcGxheU9iamVjdCBkaXJlY3RseS4gSW52b2tpbmcgPGNvZGU+bmV3IERpc3BsYXlPYmplY3QoKTwvY29kZT4gdGhyb3dzIGFuXG4gKiA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPiBleGNlcHRpb24uPC9wPlxuICogVGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgaXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzcyBmb3IgYWxsIG9iamVjdHNcbiAqIHRoYXQgY2FuIGNvbnRhaW4gY2hpbGQgb2JqZWN0cy4gSXQgY2Fubm90IGJlIGluc3RhbnRpYXRlZCBkaXJlY3RseTsgY2FsbGluZ1xuICogdGhlIDxjb2RlPm5ldyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyKCk8L2NvZGU+IGNvbnN0cnVjdG9yIHRocm93cyBhblxuICogPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT4gZXhjZXB0aW9uLlxuICpcbiAqIDxwPkZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgdGhlIFwiRGlzcGxheSBQcm9ncmFtbWluZ1wiIGNoYXB0ZXIgb2YgdGhlXG4gKiA8aT5BY3Rpb25TY3JpcHQgMy4wIERldmVsb3BlcidzIEd1aWRlPC9pPi48L3A+XG4gKi9cbmNsYXNzIERpc3BsYXlPYmplY3RDb250YWluZXIgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0IGltcGxlbWVudHMgSUFzc2V0XG57XG5cdHByaXZhdGUgX21vdXNlQ2hpbGRyZW46Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2NoaWxkcmVuOkFycmF5PERpc3BsYXlPYmplY3Q+ID0gbmV3IEFycmF5PERpc3BsYXlPYmplY3Q+KCk7XG5cdHB1YmxpYyBfaUlzUm9vdDpib29sZWFuO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBBc3NldFR5cGUuQ09OVEFJTkVSO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhlIGNoaWxkcmVuIG9mIHRoZSBvYmplY3QgYXJlIG1vdXNlLCBvciB1c2VyXG5cdCAqIGlucHV0IGRldmljZSwgZW5hYmxlZC4gSWYgYW4gb2JqZWN0IGlzIGVuYWJsZWQsIGEgdXNlciBjYW4gaW50ZXJhY3Qgd2l0aFxuXHQgKiBpdCBieSB1c2luZyBhIG1vdXNlIG9yIHVzZXIgaW5wdXQgZGV2aWNlLiBUaGUgZGVmYXVsdCBpc1xuXHQgKiA8Y29kZT50cnVlPC9jb2RlPi5cblx0ICpcblx0ICogPHA+VGhpcyBwcm9wZXJ0eSBpcyB1c2VmdWwgd2hlbiB5b3UgY3JlYXRlIGEgYnV0dG9uIHdpdGggYW4gaW5zdGFuY2Ugb2Zcblx0ICogdGhlIFNwcml0ZSBjbGFzcyhpbnN0ZWFkIG9mIHVzaW5nIHRoZSBTaW1wbGVCdXR0b24gY2xhc3MpLiBXaGVuIHlvdSB1c2UgYVxuXHQgKiBTcHJpdGUgaW5zdGFuY2UgdG8gY3JlYXRlIGEgYnV0dG9uLCB5b3UgY2FuIGNob29zZSB0byBkZWNvcmF0ZSB0aGUgYnV0dG9uXG5cdCAqIGJ5IHVzaW5nIHRoZSA8Y29kZT5hZGRDaGlsZCgpPC9jb2RlPiBtZXRob2QgdG8gYWRkIGFkZGl0aW9uYWwgU3ByaXRlXG5cdCAqIGluc3RhbmNlcy4gVGhpcyBwcm9jZXNzIGNhbiBjYXVzZSB1bmV4cGVjdGVkIGJlaGF2aW9yIHdpdGggbW91c2UgZXZlbnRzXG5cdCAqIGJlY2F1c2UgdGhlIFNwcml0ZSBpbnN0YW5jZXMgeW91IGFkZCBhcyBjaGlsZHJlbiBjYW4gYmVjb21lIHRoZSB0YXJnZXRcblx0ICogb2JqZWN0IG9mIGEgbW91c2UgZXZlbnQgd2hlbiB5b3UgZXhwZWN0IHRoZSBwYXJlbnQgaW5zdGFuY2UgdG8gYmUgdGhlXG5cdCAqIHRhcmdldCBvYmplY3QuIFRvIGVuc3VyZSB0aGF0IHRoZSBwYXJlbnQgaW5zdGFuY2Ugc2VydmVzIGFzIHRoZSB0YXJnZXRcblx0ICogb2JqZWN0cyBmb3IgbW91c2UgZXZlbnRzLCB5b3UgY2FuIHNldCB0aGUgPGNvZGU+bW91c2VDaGlsZHJlbjwvY29kZT5cblx0ICogcHJvcGVydHkgb2YgdGhlIHBhcmVudCBpbnN0YW5jZSB0byA8Y29kZT5mYWxzZTwvY29kZT4uPC9wPlxuXHQgKlxuXHQgKiA8cD4gTm8gZXZlbnQgaXMgZGlzcGF0Y2hlZCBieSBzZXR0aW5nIHRoaXMgcHJvcGVydHkuIFlvdSBtdXN0IHVzZSB0aGVcblx0ICogPGNvZGU+YWRkRXZlbnRMaXN0ZW5lcigpPC9jb2RlPiBtZXRob2QgdG8gY3JlYXRlIGludGVyYWN0aXZlXG5cdCAqIGZ1bmN0aW9uYWxpdHkuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBtb3VzZUNoaWxkcmVuKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21vdXNlQ2hpbGRyZW47XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1vdXNlQ2hpbGRyZW4odmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9tb3VzZUNoaWxkcmVuID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fbW91c2VDaGlsZHJlbiA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQubW91c2VDaGlsZHJlbiA6IHRydWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBvZiB0aGlzIG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBnZXQgbnVtQ2hpbGRyZW4oKTpudW1iZXIgLyppbnQqL1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2NoaWxkcmVuLmxlbmd0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGNoaWxkcmVuIG9mIHRoZSBvYmplY3QgYXJlIHRhYiBlbmFibGVkLiBFbmFibGVzIG9yXG5cdCAqIGRpc2FibGVzIHRhYmJpbmcgZm9yIHRoZSBjaGlsZHJlbiBvZiB0aGUgb2JqZWN0LiBUaGUgZGVmYXVsdCBpc1xuXHQgKiA8Y29kZT50cnVlPC9jb2RlPi5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IERvIG5vdCB1c2UgdGhlIDxjb2RlPnRhYkNoaWxkcmVuPC9jb2RlPiBwcm9wZXJ0eSB3aXRoXG5cdCAqIEZsZXguIEluc3RlYWQsIHVzZSB0aGVcblx0ICogPGNvZGU+bXguY29yZS5VSUNvbXBvbmVudC5oYXNGb2N1c2FibGVDaGlsZHJlbjwvY29kZT4gcHJvcGVydHkuPC9wPlxuXHQgKlxuXHQgKiBAdGhyb3dzIElsbGVnYWxPcGVyYXRpb25FcnJvciBDYWxsaW5nIHRoaXMgcHJvcGVydHkgb2YgdGhlIFN0YWdlIG9iamVjdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvd3MgYW4gZXhjZXB0aW9uLiBUaGUgU3RhZ2Ugb2JqZWN0IGRvZXNcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90IGltcGxlbWVudCB0aGlzIHByb3BlcnR5LlxuXHQgKi9cblx0cHVibGljIHRhYkNoaWxkcmVuOmJvb2xlYW47XG5cblx0LyoqXG5cdCAqIENhbGxpbmcgdGhlIDxjb2RlPm5ldyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyKCk8L2NvZGU+IGNvbnN0cnVjdG9yIHRocm93c1xuXHQgKiBhbiA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPiBleGNlcHRpb24uIFlvdSA8aT5jYW48L2k+LCBob3dldmVyLCBjYWxsXG5cdCAqIGNvbnN0cnVjdG9ycyBmb3IgdGhlIGZvbGxvd2luZyBzdWJjbGFzc2VzIG9mIERpc3BsYXlPYmplY3RDb250YWluZXI6XG5cdCAqIDx1bD5cblx0ICogICA8bGk+PGNvZGU+bmV3IExvYWRlcigpPC9jb2RlPjwvbGk+XG5cdCAqICAgPGxpPjxjb2RlPm5ldyBTcHJpdGUoKTwvY29kZT48L2xpPlxuXHQgKiAgIDxsaT48Y29kZT5uZXcgTW92aWVDbGlwKCk8L2NvZGU+PC9saT5cblx0ICogPC91bD5cblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICogQWRkcyBhIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gdGhpcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXG5cdCAqIGluc3RhbmNlLiBUaGUgY2hpbGQgaXMgYWRkZWQgdG8gdGhlIGZyb250KHRvcCkgb2YgYWxsIG90aGVyIGNoaWxkcmVuIGluXG5cdCAqIHRoaXMgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZS4oVG8gYWRkIGEgY2hpbGQgdG8gYSBzcGVjaWZpYyBpbmRleFxuXHQgKiBwb3NpdGlvbiwgdXNlIHRoZSA8Y29kZT5hZGRDaGlsZEF0KCk8L2NvZGU+IG1ldGhvZC4pXG5cdCAqXG5cdCAqIDxwPklmIHlvdSBhZGQgYSBjaGlsZCBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBhIGRpZmZlcmVudCBkaXNwbGF5IG9iamVjdFxuXHQgKiBjb250YWluZXIgYXMgYSBwYXJlbnQsIHRoZSBvYmplY3QgaXMgcmVtb3ZlZCBmcm9tIHRoZSBjaGlsZCBsaXN0IG9mIHRoZVxuXHQgKiBvdGhlciBkaXNwbGF5IG9iamVjdCBjb250YWluZXIuIDwvcD5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFRoZSBjb21tYW5kIDxjb2RlPnN0YWdlLmFkZENoaWxkKCk8L2NvZGU+IGNhbiBjYXVzZVxuXHQgKiBwcm9ibGVtcyB3aXRoIGEgcHVibGlzaGVkIFNXRiBmaWxlLCBpbmNsdWRpbmcgc2VjdXJpdHkgcHJvYmxlbXMgYW5kXG5cdCAqIGNvbmZsaWN0cyB3aXRoIG90aGVyIGxvYWRlZCBTV0YgZmlsZXMuIFRoZXJlIGlzIG9ubHkgb25lIFN0YWdlIHdpdGhpbiBhXG5cdCAqIEZsYXNoIHJ1bnRpbWUgaW5zdGFuY2UsIG5vIG1hdHRlciBob3cgbWFueSBTV0YgZmlsZXMgeW91IGxvYWQgaW50byB0aGVcblx0ICogcnVudGltZS4gU28sIGdlbmVyYWxseSwgb2JqZWN0cyBzaG91bGQgbm90IGJlIGFkZGVkIHRvIHRoZSBTdGFnZSxcblx0ICogZGlyZWN0bHksIGF0IGFsbC4gVGhlIG9ubHkgb2JqZWN0IHRoZSBTdGFnZSBzaG91bGQgY29udGFpbiBpcyB0aGUgcm9vdFxuXHQgKiBvYmplY3QuIENyZWF0ZSBhIERpc3BsYXlPYmplY3RDb250YWluZXIgdG8gY29udGFpbiBhbGwgb2YgdGhlIGl0ZW1zIG9uIHRoZVxuXHQgKiBkaXNwbGF5IGxpc3QuIFRoZW4sIGlmIG5lY2Vzc2FyeSwgYWRkIHRoYXQgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZVxuXHQgKiB0byB0aGUgU3RhZ2UuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gY2hpbGQgVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gYWRkIGFzIGEgY2hpbGQgb2YgdGhpc1xuXHQgKiAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZS5cblx0ICogQHJldHVybiBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0aGF0IHlvdSBwYXNzIGluIHRoZSA8Y29kZT5jaGlsZDwvY29kZT5cblx0ICogICAgICAgICBwYXJhbWV0ZXIuXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBUaHJvd3MgaWYgdGhlIGNoaWxkIGlzIHRoZSBzYW1lIGFzIHRoZSBwYXJlbnQuIEFsc29cblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRocm93cyBpZiB0aGUgY2FsbGVyIGlzIGEgY2hpbGQob3IgZ3JhbmRjaGlsZCBldGMuKVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2YgdGhlIGNoaWxkIGJlaW5nIGFkZGVkLlxuXHQgKiBAZXZlbnQgYWRkZWQgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWRkZWQgdG8gdGhlIGRpc3BsYXlcblx0ICogICAgICAgICAgICAgIGxpc3QuXG5cdCAqL1xuXHRwdWJsaWMgYWRkQ2hpbGQoY2hpbGQ6RGlzcGxheU9iamVjdCk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0aWYgKGNoaWxkID09IG51bGwpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQYXJhbWV0ZXIgY2hpbGQgY2Fubm90IGJlIG51bGwuXCIpO1xuXG5cdFx0Ly9pZiBjaGlsZCBhbHJlYWR5IGhhcyBhIHBhcmVudCwgcmVtb3ZlIGl0LlxuXHRcdGlmIChjaGlsZC5fcFBhcmVudClcblx0XHRcdGNoaWxkLl9wUGFyZW50LnJlbW92ZUNoaWxkSW50ZXJuYWwoY2hpbGQpO1xuXG5cdFx0Y2hpbGQuaVNldFBhcmVudCh0aGlzKTtcblxuXHRcdHRoaXMuX2NoaWxkcmVuLnB1c2goY2hpbGQpO1xuXG5cdFx0cmV0dXJuIGNoaWxkO1xuXHR9XG5cblxuXHQvKipcblx0ICogQWRkcyBhIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gdGhpcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXG5cdCAqIGluc3RhbmNlLiBUaGUgY2hpbGQgaXMgYWRkZWQgYXQgdGhlIGluZGV4IHBvc2l0aW9uIHNwZWNpZmllZC4gQW4gaW5kZXggb2Zcblx0ICogMCByZXByZXNlbnRzIHRoZSBiYWNrKGJvdHRvbSkgb2YgdGhlIGRpc3BsYXkgbGlzdCBmb3IgdGhpc1xuXHQgKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdC5cblx0ICpcblx0ICogPHA+Rm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgZXhhbXBsZSBzaG93cyB0aHJlZSBkaXNwbGF5IG9iamVjdHMsIGxhYmVsZWRcblx0ICogYSwgYiwgYW5kIGMsIGF0IGluZGV4IHBvc2l0aW9ucyAwLCAyLCBhbmQgMSwgcmVzcGVjdGl2ZWx5OjwvcD5cblx0ICpcblx0ICogPHA+SWYgeW91IGFkZCBhIGNoaWxkIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIGEgZGlmZmVyZW50IGRpc3BsYXkgb2JqZWN0XG5cdCAqIGNvbnRhaW5lciBhcyBhIHBhcmVudCwgdGhlIG9iamVjdCBpcyByZW1vdmVkIGZyb20gdGhlIGNoaWxkIGxpc3Qgb2YgdGhlXG5cdCAqIG90aGVyIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lci4gPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gY2hpbGQgVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gYWRkIGFzIGEgY2hpbGQgb2YgdGhpc1xuXHQgKiAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZS5cblx0ICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBwb3NpdGlvbiB0byB3aGljaCB0aGUgY2hpbGQgaXMgYWRkZWQuIElmIHlvdVxuXHQgKiAgICAgICAgICAgICAgc3BlY2lmeSBhIGN1cnJlbnRseSBvY2N1cGllZCBpbmRleCBwb3NpdGlvbiwgdGhlIGNoaWxkIG9iamVjdFxuXHQgKiAgICAgICAgICAgICAgdGhhdCBleGlzdHMgYXQgdGhhdCBwb3NpdGlvbiBhbmQgYWxsIGhpZ2hlciBwb3NpdGlvbnMgYXJlXG5cdCAqICAgICAgICAgICAgICBtb3ZlZCB1cCBvbmUgcG9zaXRpb24gaW4gdGhlIGNoaWxkIGxpc3QuXG5cdCAqIEByZXR1cm4gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdGhhdCB5b3UgcGFzcyBpbiB0aGUgPGNvZGU+Y2hpbGQ8L2NvZGU+XG5cdCAqICAgICAgICAgcGFyYW1ldGVyLlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhyb3dzIGlmIHRoZSBjaGlsZCBpcyB0aGUgc2FtZSBhcyB0aGUgcGFyZW50LiBBbHNvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aHJvd3MgaWYgdGhlIGNhbGxlciBpcyBhIGNoaWxkKG9yIGdyYW5kY2hpbGQgZXRjLilcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9mIHRoZSBjaGlsZCBiZWluZyBhZGRlZC5cblx0ICogQHRocm93cyBSYW5nZUVycm9yICAgIFRocm93cyBpZiB0aGUgaW5kZXggcG9zaXRpb24gZG9lcyBub3QgZXhpc3QgaW4gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCBsaXN0LlxuXHQgKiBAZXZlbnQgYWRkZWQgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWRkZWQgdG8gdGhlIGRpc3BsYXlcblx0ICogICAgICAgICAgICAgIGxpc3QuXG5cdCAqL1xuXHRwdWJsaWMgYWRkQ2hpbGRBdChjaGlsZDpEaXNwbGF5T2JqZWN0LCBpbmRleDpudW1iZXIgLyppbnQqLyk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIGNoaWxkO1xuXHR9XG5cblx0cHVibGljIGFkZENoaWxkcmVuKC4uLmNoaWxkYXJyYXk6QXJyYXk8RGlzcGxheU9iamVjdD4pXG5cdHtcblx0XHR2YXIgbGVuOm51bWJlciA9IGNoaWxkYXJyYXkubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8ICBsZW47IGkrKylcblx0XHRcdHRoaXMuYWRkQ2hpbGQoY2hpbGRhcnJheVtpXSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHZhciBjbG9uZTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyID0gbmV3IERpc3BsYXlPYmplY3RDb250YWluZXIoKTtcblx0XHRjbG9uZS5waXZvdCA9IHRoaXMucGl2b3Q7XG5cdFx0Y2xvbmUuX2lNYXRyaXgzRCA9IHRoaXMuX2lNYXRyaXgzRDtcblx0XHRjbG9uZS5wYXJ0aXRpb24gPSB0aGlzLnBhcnRpdGlvbjtcblx0XHRjbG9uZS5uYW1lID0gbmFtZTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKVxuXHRcdFx0Y2xvbmUuYWRkQ2hpbGQodGhpcy5fY2hpbGRyZW5baV0uY2xvbmUoKSk7XG5cblx0XHQvLyB0b2RvOiBpbXBsZW1lbnQgZm9yIGFsbCBzdWJ0eXBlc1xuXHRcdHJldHVybiBjbG9uZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBkaXNwbGF5IG9iamVjdCBpcyBhIGNoaWxkIG9mIHRoZVxuXHQgKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlIG9yIHRoZSBpbnN0YW5jZSBpdHNlbGYuIFRoZSBzZWFyY2hcblx0ICogaW5jbHVkZXMgdGhlIGVudGlyZSBkaXNwbGF5IGxpc3QgaW5jbHVkaW5nIHRoaXMgRGlzcGxheU9iamVjdENvbnRhaW5lclxuXHQgKiBpbnN0YW5jZS4gR3JhbmRjaGlsZHJlbiwgZ3JlYXQtZ3JhbmRjaGlsZHJlbiwgYW5kIHNvIG9uIGVhY2ggcmV0dXJuXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+LlxuXHQgKlxuXHQgKiBAcGFyYW0gY2hpbGQgVGhlIGNoaWxkIG9iamVjdCB0byB0ZXN0LlxuXHQgKiBAcmV0dXJuIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSA8Y29kZT5jaGlsZDwvY29kZT4gb2JqZWN0IGlzIGEgY2hpbGQgb2Zcblx0ICogICAgICAgICB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBvciB0aGUgY29udGFpbmVyIGl0c2VsZjsgb3RoZXJ3aXNlXG5cdCAqICAgICAgICAgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGNvbnRhaW5zKGNoaWxkOkRpc3BsYXlPYmplY3QpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSA+PSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZVdpdGhDaGlsZHJlbigpXG5cdHtcblx0XHR0aGlzLmRpc3Bvc2UoKTtcblxuXHRcdHdoaWxlICh0aGlzLm51bUNoaWxkcmVuID4gMClcblx0XHRcdHRoaXMuZ2V0Q2hpbGRBdCgwKS5kaXNwb3NlKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgY2hpbGQgZGlzcGxheSBvYmplY3QgaW5zdGFuY2UgdGhhdCBleGlzdHMgYXQgdGhlIHNwZWNpZmllZFxuXHQgKiBpbmRleC5cblx0ICpcblx0ICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgY2hpbGQgb2JqZWN0LlxuXHQgKiBAcmV0dXJuIFRoZSBjaGlsZCBkaXNwbGF5IG9iamVjdCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IHBvc2l0aW9uLlxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgICAgVGhyb3dzIGlmIHRoZSBpbmRleCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgY2hpbGRcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGxpc3QuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0Q2hpbGRBdChpbmRleDpudW1iZXIgLyppbnQqLyk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0dmFyIGNoaWxkOkRpc3BsYXlPYmplY3QgPSB0aGlzLl9jaGlsZHJlbltpbmRleF07XG5cblx0XHRpZiAoY2hpbGQgPT0gbnVsbClcblx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKFwiSW5kZXggZG9lcyBub3QgZXhpc3QgaW4gdGhlIGNoaWxkIGxpc3Qgb2YgdGhlIGNhbGxlclwiKTtcblxuXHRcdHJldHVybiBjaGlsZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBjaGlsZCBkaXNwbGF5IG9iamVjdCB0aGF0IGV4aXN0cyB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZS4gSWZcblx0ICogbW9yZSB0aGF0IG9uZSBjaGlsZCBkaXNwbGF5IG9iamVjdCBoYXMgdGhlIHNwZWNpZmllZCBuYW1lLCB0aGUgbWV0aG9kXG5cdCAqIHJldHVybnMgdGhlIGZpcnN0IG9iamVjdCBpbiB0aGUgY2hpbGQgbGlzdC5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPmdldENoaWxkQXQoKTwvY29kZT4gbWV0aG9kIGlzIGZhc3RlciB0aGFuIHRoZVxuXHQgKiA8Y29kZT5nZXRDaGlsZEJ5TmFtZSgpPC9jb2RlPiBtZXRob2QuIFRoZSA8Y29kZT5nZXRDaGlsZEF0KCk8L2NvZGU+IG1ldGhvZFxuXHQgKiBhY2Nlc3NlcyBhIGNoaWxkIGZyb20gYSBjYWNoZWQgYXJyYXksIHdoZXJlYXMgdGhlXG5cdCAqIDxjb2RlPmdldENoaWxkQnlOYW1lKCk8L2NvZGU+IG1ldGhvZCBoYXMgdG8gdHJhdmVyc2UgYSBsaW5rZWQgbGlzdCB0b1xuXHQgKiBhY2Nlc3MgYSBjaGlsZC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBjaGlsZCB0byByZXR1cm4uXG5cdCAqIEByZXR1cm4gVGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IHdpdGggdGhlIHNwZWNpZmllZCBuYW1lLlxuXHQgKi9cblx0cHVibGljIGdldENoaWxkQnlOYW1lKG5hbWU6c3RyaW5nKTpEaXNwbGF5T2JqZWN0XG5cdHtcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcblx0XHRcdGlmICh0aGlzLl9jaGlsZHJlbltpXS5uYW1lID09IG5hbWUpXG5cdFx0XHRcdHJldHVybiB0aGlzLl9jaGlsZHJlbltpXTtcblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGluZGV4IHBvc2l0aW9uIG9mIGEgPGNvZGU+Y2hpbGQ8L2NvZGU+IERpc3BsYXlPYmplY3QgaW5zdGFuY2UuXG5cdCAqXG5cdCAqIEBwYXJhbSBjaGlsZCBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byBpZGVudGlmeS5cblx0ICogQHJldHVybiBUaGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IHRvIGlkZW50aWZ5LlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhyb3dzIGlmIHRoZSBjaGlsZCBwYXJhbWV0ZXIgaXMgbm90IGEgY2hpbGQgb2YgdGhpc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGdldENoaWxkSW5kZXgoY2hpbGQ6RGlzcGxheU9iamVjdCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHZhciBjaGlsZEluZGV4Om51bWJlciA9IHRoaXMuX2NoaWxkcmVuLmluZGV4T2YoY2hpbGQpO1xuXG5cdFx0aWYgKGNoaWxkSW5kZXggPT0gLTEpXG5cdFx0XHR0aHJvdyBuZXcgQXJndW1lbnRFcnJvcihcIkNoaWxkIHBhcmFtZXRlciBpcyBub3QgYSBjaGlsZCBvZiB0aGUgY2FsbGVyXCIpO1xuXG5cdFx0cmV0dXJuIGNoaWxkSW5kZXg7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBhcnJheSBvZiBvYmplY3RzIHRoYXQgbGllIHVuZGVyIHRoZSBzcGVjaWZpZWQgcG9pbnQgYW5kIGFyZVxuXHQgKiBjaGlsZHJlbihvciBncmFuZGNoaWxkcmVuLCBhbmQgc28gb24pIG9mIHRoaXMgRGlzcGxheU9iamVjdENvbnRhaW5lclxuXHQgKiBpbnN0YW5jZS4gQW55IGNoaWxkIG9iamVjdHMgdGhhdCBhcmUgaW5hY2Nlc3NpYmxlIGZvciBzZWN1cml0eSByZWFzb25zIGFyZVxuXHQgKiBvbWl0dGVkIGZyb20gdGhlIHJldHVybmVkIGFycmF5LiBUbyBkZXRlcm1pbmUgd2hldGhlciB0aGlzIHNlY3VyaXR5XG5cdCAqIHJlc3RyaWN0aW9uIGFmZmVjdHMgdGhlIHJldHVybmVkIGFycmF5LCBjYWxsIHRoZVxuXHQgKiA8Y29kZT5hcmVJbmFjY2Vzc2libGVPYmplY3RzVW5kZXJQb2ludCgpPC9jb2RlPiBtZXRob2QuXG5cdCAqXG5cdCAqIDxwPlRoZSA8Y29kZT5wb2ludDwvY29kZT4gcGFyYW1ldGVyIGlzIGluIHRoZSBjb29yZGluYXRlIHNwYWNlIG9mIHRoZVxuXHQgKiBTdGFnZSwgd2hpY2ggbWF5IGRpZmZlciBmcm9tIHRoZSBjb29yZGluYXRlIHNwYWNlIG9mIHRoZSBkaXNwbGF5IG9iamVjdFxuXHQgKiBjb250YWluZXIodW5sZXNzIHRoZSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgaXMgdGhlIFN0YWdlKS4gWW91IGNhbiB1c2Vcblx0ICogdGhlIDxjb2RlPmdsb2JhbFRvTG9jYWwoKTwvY29kZT4gYW5kIHRoZSA8Y29kZT5sb2NhbFRvR2xvYmFsKCk8L2NvZGU+XG5cdCAqIG1ldGhvZHMgdG8gY29udmVydCBwb2ludHMgYmV0d2VlbiB0aGVzZSBjb29yZGluYXRlIHNwYWNlcy48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBwb2ludCBUaGUgcG9pbnQgdW5kZXIgd2hpY2ggdG8gbG9vay5cblx0ICogQHJldHVybiBBbiBhcnJheSBvZiBvYmplY3RzIHRoYXQgbGllIHVuZGVyIHRoZSBzcGVjaWZpZWQgcG9pbnQgYW5kIGFyZVxuXHQgKiAgICAgICAgIGNoaWxkcmVuKG9yIGdyYW5kY2hpbGRyZW4sIGFuZCBzbyBvbikgb2YgdGhpc1xuXHQgKiAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0T2JqZWN0c1VuZGVyUG9pbnQocG9pbnQ6UG9pbnQpOkFycmF5PERpc3BsYXlPYmplY3Q+XG5cdHtcblx0XHRyZXR1cm4gbmV3IEFycmF5PERpc3BsYXlPYmplY3Q+KCk7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIDxjb2RlPmNoaWxkPC9jb2RlPiBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIGZyb20gdGhlXG5cdCAqIGNoaWxkIGxpc3Qgb2YgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UuIFRoZSA8Y29kZT5wYXJlbnQ8L2NvZGU+XG5cdCAqIHByb3BlcnR5IG9mIHRoZSByZW1vdmVkIGNoaWxkIGlzIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPiAsIGFuZCB0aGUgb2JqZWN0XG5cdCAqIGlzIGdhcmJhZ2UgY29sbGVjdGVkIGlmIG5vIG90aGVyIHJlZmVyZW5jZXMgdG8gdGhlIGNoaWxkIGV4aXN0LiBUaGUgaW5kZXhcblx0ICogcG9zaXRpb25zIG9mIGFueSBkaXNwbGF5IG9iamVjdHMgYWJvdmUgdGhlIGNoaWxkIGluIHRoZVxuXHQgKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGFyZSBkZWNyZWFzZWQgYnkgMS5cblx0ICpcblx0ICogPHA+VGhlIGdhcmJhZ2UgY29sbGVjdG9yIHJlYWxsb2NhdGVzIHVudXNlZCBtZW1vcnkgc3BhY2UuIFdoZW4gYSB2YXJpYWJsZVxuXHQgKiBvciBvYmplY3QgaXMgbm8gbG9uZ2VyIGFjdGl2ZWx5IHJlZmVyZW5jZWQgb3Igc3RvcmVkIHNvbWV3aGVyZSwgdGhlXG5cdCAqIGdhcmJhZ2UgY29sbGVjdG9yIHN3ZWVwcyB0aHJvdWdoIGFuZCB3aXBlcyBvdXQgdGhlIG1lbW9yeSBzcGFjZSBpdCB1c2VkIHRvXG5cdCAqIG9jY3VweSBpZiBubyBvdGhlciByZWZlcmVuY2VzIHRvIGl0IGV4aXN0LjwvcD5cblx0ICpcblx0ICogQHBhcmFtIGNoaWxkIFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIHJlbW92ZS5cblx0ICogQHJldHVybiBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0aGF0IHlvdSBwYXNzIGluIHRoZSA8Y29kZT5jaGlsZDwvY29kZT5cblx0ICogICAgICAgICBwYXJhbWV0ZXIuXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBUaHJvd3MgaWYgdGhlIGNoaWxkIHBhcmFtZXRlciBpcyBub3QgYSBjaGlsZCBvZiB0aGlzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgcmVtb3ZlQ2hpbGQoY2hpbGQ6RGlzcGxheU9iamVjdCk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0aWYgKGNoaWxkID09IG51bGwpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQYXJhbWV0ZXIgY2hpbGQgY2Fubm90IGJlIG51bGxcIik7XG5cblx0XHR0aGlzLnJlbW92ZUNoaWxkSW50ZXJuYWwoY2hpbGQpO1xuXG5cdFx0Y2hpbGQuaVNldFBhcmVudChudWxsKTtcblxuXHRcdHJldHVybiBjaGlsZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGEgY2hpbGQgRGlzcGxheU9iamVjdCBmcm9tIHRoZSBzcGVjaWZpZWQgPGNvZGU+aW5kZXg8L2NvZGU+XG5cdCAqIHBvc2l0aW9uIGluIHRoZSBjaGlsZCBsaXN0IG9mIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLiBUaGVcblx0ICogPGNvZGU+cGFyZW50PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgcmVtb3ZlZCBjaGlsZCBpcyBzZXQgdG9cblx0ICogPGNvZGU+bnVsbDwvY29kZT4sIGFuZCB0aGUgb2JqZWN0IGlzIGdhcmJhZ2UgY29sbGVjdGVkIGlmIG5vIG90aGVyXG5cdCAqIHJlZmVyZW5jZXMgdG8gdGhlIGNoaWxkIGV4aXN0LiBUaGUgaW5kZXggcG9zaXRpb25zIG9mIGFueSBkaXNwbGF5IG9iamVjdHNcblx0ICogYWJvdmUgdGhlIGNoaWxkIGluIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGFyZSBkZWNyZWFzZWQgYnkgMS5cblx0ICpcblx0ICogPHA+VGhlIGdhcmJhZ2UgY29sbGVjdG9yIHJlYWxsb2NhdGVzIHVudXNlZCBtZW1vcnkgc3BhY2UuIFdoZW4gYSB2YXJpYWJsZVxuXHQgKiBvciBvYmplY3QgaXMgbm8gbG9uZ2VyIGFjdGl2ZWx5IHJlZmVyZW5jZWQgb3Igc3RvcmVkIHNvbWV3aGVyZSwgdGhlXG5cdCAqIGdhcmJhZ2UgY29sbGVjdG9yIHN3ZWVwcyB0aHJvdWdoIGFuZCB3aXBlcyBvdXQgdGhlIG1lbW9yeSBzcGFjZSBpdCB1c2VkIHRvXG5cdCAqIG9jY3VweSBpZiBubyBvdGhlciByZWZlcmVuY2VzIHRvIGl0IGV4aXN0LjwvcD5cblx0ICpcblx0ICogQHBhcmFtIGluZGV4IFRoZSBjaGlsZCBpbmRleCBvZiB0aGUgRGlzcGxheU9iamVjdCB0byByZW1vdmUuXG5cdCAqIEByZXR1cm4gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdGhhdCB3YXMgcmVtb3ZlZC5cblx0ICogQHRocm93cyBSYW5nZUVycm9yICAgIFRocm93cyBpZiB0aGUgaW5kZXggZG9lcyBub3QgZXhpc3QgaW4gdGhlIGNoaWxkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBsaXN0LlxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgVGhpcyBjaGlsZCBkaXNwbGF5IG9iamVjdCBiZWxvbmdzIHRvIGEgc2FuZGJveCB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgd2hpY2ggdGhlIGNhbGxpbmcgb2JqZWN0IGRvZXMgbm90IGhhdmUgYWNjZXNzLiBZb3Vcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGNhbiBhdm9pZCB0aGlzIHNpdHVhdGlvbiBieSBoYXZpbmcgdGhlIGNoaWxkIG1vdmllXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBjYWxsIHRoZSA8Y29kZT5TZWN1cml0eS5hbGxvd0RvbWFpbigpPC9jb2RlPiBtZXRob2QuXG5cdCAqL1xuXHRwdWJsaWMgcmVtb3ZlQ2hpbGRBdChpbmRleDpudW1iZXIgLyppbnQqLyk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5fY2hpbGRyZW5baW5kZXhdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGFsbCA8Y29kZT5jaGlsZDwvY29kZT4gRGlzcGxheU9iamVjdCBpbnN0YW5jZXMgZnJvbSB0aGUgY2hpbGQgbGlzdFxuXHQgKiBvZiB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZS4gVGhlIDxjb2RlPnBhcmVudDwvY29kZT4gcHJvcGVydHlcblx0ICogb2YgdGhlIHJlbW92ZWQgY2hpbGRyZW4gaXMgc2V0IHRvIDxjb2RlPm51bGw8L2NvZGU+LCBhbmQgdGhlIG9iamVjdHMgYXJlXG5cdCAqIGdhcmJhZ2UgY29sbGVjdGVkIGlmIG5vIG90aGVyIHJlZmVyZW5jZXMgdG8gdGhlIGNoaWxkcmVuIGV4aXN0LlxuXHQgKlxuXHQgKiBUaGUgZ2FyYmFnZSBjb2xsZWN0b3IgcmVhbGxvY2F0ZXMgdW51c2VkIG1lbW9yeSBzcGFjZS4gV2hlbiBhIHZhcmlhYmxlIG9yXG5cdCAqIG9iamVjdCBpcyBubyBsb25nZXIgYWN0aXZlbHkgcmVmZXJlbmNlZCBvciBzdG9yZWQgc29tZXdoZXJlLCB0aGUgZ2FyYmFnZVxuXHQgKiBjb2xsZWN0b3Igc3dlZXBzIHRocm91Z2ggYW5kIHdpcGVzIG91dCB0aGUgbWVtb3J5IHNwYWNlIGl0IHVzZWQgdG8gb2NjdXB5XG5cdCAqIGlmIG5vIG90aGVyIHJlZmVyZW5jZXMgdG8gaXQgZXhpc3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBiZWdpbkluZGV4IFRoZSBiZWdpbm5pbmcgcG9zaXRpb24uIEEgdmFsdWUgc21hbGxlciB0aGFuIDAgdGhyb3dzIGEgUmFuZ2VFcnJvci5cblx0ICogQHBhcmFtIGVuZEluZGV4IFRoZSBlbmRpbmcgcG9zaXRpb24uIEEgdmFsdWUgc21hbGxlciB0aGFuIDAgdGhyb3dzIGEgUmFuZ2VFcnJvci5cblx0ICogQHRocm93cyBSYW5nZUVycm9yICAgIFRocm93cyBpZiB0aGUgYmVnaW5JbmRleCBvciBlbmRJbmRleCBwb3NpdGlvbnMgZG9cblx0ICogICAgICAgICAgICAgICAgICAgICAgIG5vdCBleGlzdCBpbiB0aGUgY2hpbGQgbGlzdC5cblx0ICovXG5cdHB1YmxpYyByZW1vdmVDaGlsZHJlbihiZWdpbkluZGV4Om51bWJlciAvKmludCovID0gMCwgZW5kSW5kZXg6bnVtYmVyIC8qaW50Ki8gPSAyMTQ3NDgzNjQ3KVxuXHR7XG5cdFx0aWYgKGJlZ2luSW5kZXggPCAwKVxuXHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJiZWdpbkluZGV4IGlzIG91dCBvZiByYW5nZSBvZiB0aGUgY2hpbGQgbGlzdFwiKTtcblxuXHRcdGlmIChlbmRJbmRleCA+IHRoaXMuX2NoaWxkcmVuLmxlbmd0aClcblx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKFwiZW5kSW5kZXggaXMgb3V0IG9mIHJhbmdlIG9mIHRoZSBjaGlsZCBsaXN0XCIpO1xuXG5cdFx0Zm9yKHZhciBpOm51bWJlciAvKnVpbnQqLyA9IGJlZ2luSW5kZXg7IGkgPCBlbmRJbmRleDsgaSsrKVxuXHRcdFx0dGhpcy5yZW1vdmVDaGlsZCh0aGlzLl9jaGlsZHJlbltpXSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hhbmdlcyB0aGUgcG9zaXRpb24gb2YgYW4gZXhpc3RpbmcgY2hpbGQgaW4gdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lci5cblx0ICogVGhpcyBhZmZlY3RzIHRoZSBsYXllcmluZyBvZiBjaGlsZCBvYmplY3RzLiBGb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZ1xuXHQgKiBleGFtcGxlIHNob3dzIHRocmVlIGRpc3BsYXkgb2JqZWN0cywgbGFiZWxlZCBhLCBiLCBhbmQgYywgYXQgaW5kZXhcblx0ICogcG9zaXRpb25zIDAsIDEsIGFuZCAyLCByZXNwZWN0aXZlbHk6XG5cdCAqXG5cdCAqIDxwPldoZW4geW91IHVzZSB0aGUgPGNvZGU+c2V0Q2hpbGRJbmRleCgpPC9jb2RlPiBtZXRob2QgYW5kIHNwZWNpZnkgYW5cblx0ICogaW5kZXggcG9zaXRpb24gdGhhdCBpcyBhbHJlYWR5IG9jY3VwaWVkLCB0aGUgb25seSBwb3NpdGlvbnMgdGhhdCBjaGFuZ2Vcblx0ICogYXJlIHRob3NlIGluIGJldHdlZW4gdGhlIGRpc3BsYXkgb2JqZWN0J3MgZm9ybWVyIGFuZCBuZXcgcG9zaXRpb24uIEFsbFxuXHQgKiBvdGhlcnMgd2lsbCBzdGF5IHRoZSBzYW1lLiBJZiBhIGNoaWxkIGlzIG1vdmVkIHRvIGFuIGluZGV4IExPV0VSIHRoYW4gaXRzXG5cdCAqIGN1cnJlbnQgaW5kZXgsIGFsbCBjaGlsZHJlbiBpbiBiZXR3ZWVuIHdpbGwgSU5DUkVBU0UgYnkgMSBmb3IgdGhlaXIgaW5kZXhcblx0ICogcmVmZXJlbmNlLiBJZiBhIGNoaWxkIGlzIG1vdmVkIHRvIGFuIGluZGV4IEhJR0hFUiB0aGFuIGl0cyBjdXJyZW50IGluZGV4LFxuXHQgKiBhbGwgY2hpbGRyZW4gaW4gYmV0d2VlbiB3aWxsIERFQ1JFQVNFIGJ5IDEgZm9yIHRoZWlyIGluZGV4IHJlZmVyZW5jZS4gRm9yXG5cdCAqIGV4YW1wbGUsIGlmIHRoZSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgaW4gdGhlIHByZXZpb3VzIGV4YW1wbGUgaXMgbmFtZWRcblx0ICogPGNvZGU+Y29udGFpbmVyPC9jb2RlPiwgeW91IGNhbiBzd2FwIHRoZSBwb3NpdGlvbiBvZiB0aGUgZGlzcGxheSBvYmplY3RzXG5cdCAqIGxhYmVsZWQgYSBhbmQgYiBieSBjYWxsaW5nIHRoZSBmb2xsb3dpbmcgY29kZTo8L3A+XG5cdCAqXG5cdCAqIDxwPlRoaXMgY29kZSByZXN1bHRzIGluIHRoZSBmb2xsb3dpbmcgYXJyYW5nZW1lbnQgb2Ygb2JqZWN0czo8L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBjaGlsZCBUaGUgY2hpbGQgRGlzcGxheU9iamVjdCBpbnN0YW5jZSBmb3Igd2hpY2ggeW91IHdhbnQgdG8gY2hhbmdlXG5cdCAqICAgICAgICAgICAgICB0aGUgaW5kZXggbnVtYmVyLlxuXHQgKiBAcGFyYW0gaW5kZXggVGhlIHJlc3VsdGluZyBpbmRleCBudW1iZXIgZm9yIHRoZSA8Y29kZT5jaGlsZDwvY29kZT4gZGlzcGxheVxuXHQgKiAgICAgICAgICAgICAgb2JqZWN0LlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhyb3dzIGlmIHRoZSBjaGlsZCBwYXJhbWV0ZXIgaXMgbm90IGEgY2hpbGQgb2YgdGhpc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgICAgVGhyb3dzIGlmIHRoZSBpbmRleCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgY2hpbGRcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGxpc3QuXG5cdCAqL1xuXHRwdWJsaWMgc2V0Q2hpbGRJbmRleChjaGlsZDpEaXNwbGF5T2JqZWN0LCBpbmRleDpudW1iZXIgLyppbnQqLylcblx0e1xuXHRcdC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIFN3YXBzIHRoZSB6LW9yZGVyIChmcm9udC10by1iYWNrIG9yZGVyKSBvZiB0aGUgdHdvIHNwZWNpZmllZCBjaGlsZFxuXHQgKiBvYmplY3RzLiBBbGwgb3RoZXIgY2hpbGQgb2JqZWN0cyBpbiB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHJlbWFpbiBpblxuXHQgKiB0aGUgc2FtZSBpbmRleCBwb3NpdGlvbnMuXG5cdCAqXG5cdCAqIEBwYXJhbSBjaGlsZDEgVGhlIGZpcnN0IGNoaWxkIG9iamVjdC5cblx0ICogQHBhcmFtIGNoaWxkMiBUaGUgc2Vjb25kIGNoaWxkIG9iamVjdC5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRocm93cyBpZiBlaXRoZXIgY2hpbGQgcGFyYW1ldGVyIGlzIG5vdCBhIGNoaWxkIG9mXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGlzIG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBzd2FwQ2hpbGRyZW4oY2hpbGQxOkRpc3BsYXlPYmplY3QsIGNoaWxkMjpEaXNwbGF5T2JqZWN0KVxuXHR7XG5cdFx0Ly9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogU3dhcHMgdGhlIHotb3JkZXIoZnJvbnQtdG8tYmFjayBvcmRlcikgb2YgdGhlIGNoaWxkIG9iamVjdHMgYXQgdGhlIHR3b1xuXHQgKiBzcGVjaWZpZWQgaW5kZXggcG9zaXRpb25zIGluIHRoZSBjaGlsZCBsaXN0LiBBbGwgb3RoZXIgY2hpbGQgb2JqZWN0cyBpblxuXHQgKiB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHJlbWFpbiBpbiB0aGUgc2FtZSBpbmRleCBwb3NpdGlvbnMuXG5cdCAqXG5cdCAqIEBwYXJhbSBpbmRleDEgVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBjaGlsZCBvYmplY3QuXG5cdCAqIEBwYXJhbSBpbmRleDIgVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBzZWNvbmQgY2hpbGQgb2JqZWN0LlxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgSWYgZWl0aGVyIGluZGV4IGRvZXMgbm90IGV4aXN0IGluIHRoZSBjaGlsZCBsaXN0LlxuXHQgKi9cblx0cHVibGljIHN3YXBDaGlsZHJlbkF0KGluZGV4MTpudW1iZXIgLyppbnQqLywgaW5kZXgyOm51bWJlciAvKmludCovKVxuXHR7XG5cdFx0Ly9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBJbnZhbGlkYXRlU2NlbmVUcmFuc2Zvcm0oKVxuXHR7XG5cdFx0c3VwZXIucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpO1xuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXG5cdFx0XHR0aGlzLl9jaGlsZHJlbltpXS5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlU2NlbmUodmFsdWU6U2NlbmUpXG5cdHtcblx0XHRzdXBlci5fcFVwZGF0ZVNjZW5lKHZhbHVlKTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKVxuXHRcdFx0dGhpcy5fY2hpbGRyZW5baV0uX3BVcGRhdGVTY2VuZSh2YWx1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdHN1cGVyLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodmFsdWUpO1xuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXG5cdFx0XHR0aGlzLl9jaGlsZHJlbltpXS5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHRoaXMuX21vdXNlQ2hpbGRyZW4pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0c3VwZXIuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWUpO1xuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXG5cdFx0XHR0aGlzLl9jaGlsZHJlbltpXS5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSh0aGlzLl9wSW1wbGljaXRWaXNpYmlsaXR5KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih2YWx1ZTpQYXJ0aXRpb24pXG5cdHtcblx0XHRzdXBlci5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHZhbHVlKTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKVxuXHRcdFx0dGhpcy5fY2hpbGRyZW5baV0uX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqXG5cdCAqIEBwYXJhbSBjaGlsZFxuXHQgKi9cblx0cHJpdmF0ZSByZW1vdmVDaGlsZEludGVybmFsKGNoaWxkOkRpc3BsYXlPYmplY3QpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHRoaXMuX2NoaWxkcmVuLnNwbGljZSh0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQpLCAxKTtcblxuXHRcdHJldHVybiBjaGlsZDtcblx0fVxufVxuXG5leHBvcnQgPSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyOyJdfQ==