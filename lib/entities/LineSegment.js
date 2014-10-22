var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObject = require("awayjs-core/lib/core/base/DisplayObject");

var AssetType = require("awayjs-core/lib/core/library/AssetType");
var EntityNode = require("awayjs-core/lib/core/partition/EntityNode");

var MaterialEvent = require("awayjs-core/lib/events/MaterialEvent");

/**
* A Line Segment primitive.
*/
var LineSegment = (function (_super) {
    __extends(LineSegment, _super);
    /**
    * Create a line segment
    *
    * @param startPosition Start position of the line segment
    * @param endPosition Ending position of the line segment
    * @param thickness Thickness of the line
    */
    function LineSegment(material, startPosition, endPosition, thickness) {
        if (typeof thickness === "undefined") { thickness = 1; }
        var _this = this;
        _super.call(this);

        this._pIsEntity = true;

        this.onSizeChangedDelegate = function (event) {
            return _this.onSizeChanged(event);
        };

        this.material = material;

        this._startPosition = startPosition;
        this._endPosition = endPosition;
        this._halfThickness = thickness * 0.5;
    }
    Object.defineProperty(LineSegment.prototype, "animator", {
        /**
        * Defines the animator of the line segment. Act on the line segment's geometry. Defaults to null
        */
        get: function () {
            return this._animator;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LineSegment.prototype, "assetType", {
        /**
        *
        */
        get: function () {
            return AssetType.LINE_SEGMENT;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LineSegment.prototype, "startPostion", {
        /**
        *
        */
        get: function () {
            return this._startPosition;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LineSegment.prototype, "startPosition", {
        set: function (value) {
            if (this._startPosition == value)
                return;

            this._startPosition = value;

            this.notifyRenderableUpdate();
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LineSegment.prototype, "endPosition", {
        /**
        *
        */
        get: function () {
            return this._endPosition;
        },
        set: function (value) {
            if (this._endPosition == value)
                return;

            this._endPosition = value;

            this.notifyRenderableUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(LineSegment.prototype, "material", {
        /**
        *
        */
        get: function () {
            return this._material;
        },
        set: function (value) {
            if (value == this._material)
                return;

            if (this._material) {
                this._material.iRemoveOwner(this);
                this._material.removeEventListener(MaterialEvent.SIZE_CHANGED, this.onSizeChangedDelegate);
            }

            this._material = value;

            if (this._material) {
                this._material.iAddOwner(this);
                this._material.addEventListener(MaterialEvent.SIZE_CHANGED, this.onSizeChangedDelegate);
            }
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(LineSegment.prototype, "thickness", {
        /**
        *
        */
        get: function () {
            return this._halfThickness * 2;
        },
        set: function (value) {
            if (this._halfThickness == value)
                return;

            this._halfThickness = value * 0.5;

            this.notifyRenderableUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(LineSegment.prototype, "uvTransform", {
        /**
        *
        */
        get: function () {
            return this._uvTransform;
        },
        set: function (value) {
            this._uvTransform = value;
        },
        enumerable: true,
        configurable: true
    });


    LineSegment.prototype.dispose = function () {
        this._startPosition = null;
        this._endPosition = null;
    };

    /**
    * @protected
    */
    LineSegment.prototype.pCreateEntityPartitionNode = function () {
        return new EntityNode(this);
    };

    /**
    * @protected
    */
    LineSegment.prototype.pUpdateBounds = function () {
        this._pBounds.fromExtremes(this._startPosition.x, this._startPosition.y, this._startPosition.z, this._endPosition.x, this._endPosition.y, this._endPosition.z);

        _super.prototype.pUpdateBounds.call(this);
    };

    /**
    * @private
    */
    LineSegment.prototype.onSizeChanged = function (event) {
        this.notifyRenderableUpdate();
    };

    /**
    * @private
    */
    LineSegment.prototype.notifyRenderableUpdate = function () {
        var len = this._pRenderables.length;
        for (var i = 0; i < len; i++)
            this._pRenderables[i].invalidateVertexData("vertices"); //TODO
    };

    LineSegment.prototype._iCollectRenderables = function (renderer) {
        // Since this getter is invoked every iteration of the render loop, and
        // the prefab construct could affect the sub-meshes, the prefab is
        // validated here to give it a chance to rebuild.
        if (this._iSourcePrefab)
            this._iSourcePrefab._iValidate();

        this._iCollectRenderable(renderer);
    };

    LineSegment.prototype._iCollectRenderable = function (renderer) {
        //TODO
    };
    return LineSegment;
})(DisplayObject);

module.exports = LineSegment;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL0xpbmVTZWdtZW50LnRzIl0sIm5hbWVzIjpbIkxpbmVTZWdtZW50IiwiTGluZVNlZ21lbnQuY29uc3RydWN0b3IiLCJMaW5lU2VnbWVudC5kaXNwb3NlIiwiTGluZVNlZ21lbnQucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJMaW5lU2VnbWVudC5wVXBkYXRlQm91bmRzIiwiTGluZVNlZ21lbnQub25TaXplQ2hhbmdlZCIsIkxpbmVTZWdtZW50Lm5vdGlmeVJlbmRlcmFibGVVcGRhdGUiLCJMaW5lU2VnbWVudC5faUNvbGxlY3RSZW5kZXJhYmxlcyIsIkxpbmVTZWdtZW50Ll9pQ29sbGVjdFJlbmRlcmFibGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNFQUM2RTs7QUFLN0UsaUVBQXlFO0FBQ3pFLHFFQUE2RTs7QUFFN0UsbUVBQTBFOztBQUkxRTs7RUFFRztBQUNIO0lBQTBCQSw4QkFBYUE7SUFrSXRDQTs7Ozs7O01BREdBO0lBQ0hBLHFCQUFZQSxRQUFxQkEsRUFBRUEsYUFBc0JBLEVBQUVBLFdBQW9CQSxFQUFFQSxTQUFvQkE7UUFBcEJDLHdDQUFBQSxTQUFTQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFyR0EsaUJBYUNBO1FBWEFBLFdBQU1BLEtBQUFBLENBQUNBOztRQUVQQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQTs7UUFFdEJBLElBQUlBLENBQUNBLHFCQUFxQkEsR0FBR0EsVUFBQ0EsS0FBbUJBO21CQUFLQSxLQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUF6QkEsQ0FBeUJBOztRQUUvRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUE7O1FBRXhCQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxhQUFhQTtRQUNuQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0E7UUFDL0JBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLFNBQVNBLEdBQUNBLEdBQUdBO0lBQ3BDQSxDQUFDQTtJQS9IREQ7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFNBQVNBO1FBQ3RCQSxDQUFDQTs7OztBQUFBQTtJQUtEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsU0FBU0EsQ0FBQ0EsWUFBWUE7UUFDOUJBLENBQUNBOzs7O0FBQUFBO0lBS0RBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxjQUFjQTtRQUMzQkEsQ0FBQ0E7Ozs7QUFBQUE7SUFFREE7UUFBQUEsS0FBQUEsVUFBeUJBLEtBQWNBO1lBRXRDQSxJQUFJQSxJQUFJQSxDQUFDQSxjQUFjQSxJQUFJQSxLQUFLQTtnQkFDL0JBLE1BQU9BLENBQUFBOztZQUVSQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxLQUFLQTs7WUFFM0JBLElBQUlBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLENBQUNBOzs7O0FBQUFBO0lBS0RBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxZQUFZQTtRQUN6QkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBdUJBLEtBQWNBO1lBRXBDQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxJQUFJQSxLQUFLQTtnQkFDN0JBLE1BQU9BLENBQUFBOztZQUVSQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxLQUFLQTs7WUFFekJBLElBQUlBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLENBQUNBOzs7O0FBVkFBOztJQWVEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsU0FBU0E7UUFDdEJBLENBQUNBO1FBRURBLEtBQUFBLFVBQW9CQSxLQUFrQkE7WUFFckNBLElBQUlBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLFNBQVNBO2dCQUMxQkEsTUFBT0EsQ0FBQUE7O1lBRVJBLElBQUlBLElBQUlBLENBQUNBLFNBQVNBLENBQUVBO2dCQUNuQkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2pDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxtQkFBbUJBLENBQUNBLGFBQWFBLENBQUNBLFlBQVlBLEVBQUVBLElBQUlBLENBQUNBLHFCQUFxQkEsQ0FBQ0E7YUFDMUZBOztZQUdEQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxLQUFLQTs7WUFFdEJBLElBQUlBLElBQUlBLENBQUNBLFNBQVNBLENBQUVBO2dCQUNuQkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQzlCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxnQkFBZ0JBLENBQUNBLGFBQWFBLENBQUNBLFlBQVlBLEVBQUVBLElBQUlBLENBQUNBLHFCQUFxQkEsQ0FBQ0E7YUFDdkZBO1FBQ0ZBLENBQUNBOzs7O0FBbkJBQTs7SUF3QkRBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFDQSxDQUFDQTtRQUM3QkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBcUJBLEtBQVlBO1lBRWhDQSxJQUFJQSxJQUFJQSxDQUFDQSxjQUFjQSxJQUFJQSxLQUFLQTtnQkFDL0JBLE1BQU9BLENBQUFBOztZQUVSQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxLQUFLQSxHQUFDQSxHQUFHQTs7WUFFL0JBLElBQUlBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLENBQUNBOzs7O0FBVkFBOztJQWVEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUE7UUFDekJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXVCQSxLQUFpQkE7WUFFdkNBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLEtBQUtBO1FBQzFCQSxDQUFDQTs7OztBQUxBQTs7SUE2QkRBLGdDQUFBQTtRQUVDRSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQTtRQUMxQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUE7SUFDekJBLENBQUNBOztJQUtERjs7TUFER0E7dURBQ0hBO1FBRUNHLE9BQU9BLElBQUlBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBO0lBQzVCQSxDQUFDQTs7SUFLREg7O01BREdBOzBDQUNIQTtRQUVDSSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTs7UUFFOUpBLGdCQUFLQSxDQUFDQSxhQUFhQSxLQUFDQSxLQUFBQSxDQUFDQTtJQUN0QkEsQ0FBQ0E7O0lBS0RKOztNQURHQTswQ0FDSEEsVUFBc0JBLEtBQW1CQTtRQUV4Q0ssSUFBSUEsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxDQUFDQTtJQUM5QkEsQ0FBQ0E7O0lBS0RMOztNQURHQTttREFDSEE7UUFFQ00sSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUE7UUFDMUNBLEtBQUtBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBO1lBQ2xDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxvQkFBb0JBLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLE1BQU1BO0FBQVBBLElBQ3pEQSxDQUFDQTs7SUFFRE4sNkNBQUFBLFVBQTRCQSxRQUFrQkE7UUFFN0NPLHVFQUF1RUE7UUFDdkVBLGtFQUFrRUE7UUFDbEVBLGlEQUFpREE7UUFDakRBLElBQUlBLElBQUlBLENBQUNBLGNBQWNBO1lBQ3RCQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTs7UUFFbENBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7SUFDbkNBLENBQUNBOztJQUVEUCw0Q0FBQUEsVUFBMkJBLFFBQWtCQTtRQUU1Q1EsTUFBTUE7SUFDUEEsQ0FBQ0E7SUFDRlIsbUJBQUNBO0FBQURBLENBQUNBLEVBMU15QixhQUFhLEVBME10Qzs7QUFFRCw0QkFBcUIsQ0FBQSIsImZpbGUiOiJlbnRpdGllcy9MaW5lU2VnbWVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJQW5pbWF0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IElNYXRlcmlhbE93bmVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0lNYXRlcmlhbE93bmVyXCIpO1xuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBVVlRyYW5zZm9ybVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL1VWVHJhbnNmb3JtXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcbmltcG9ydCBJUmVuZGVyZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcmVuZGVyL0lSZW5kZXJlclwiKTtcbmltcG9ydCBNYXRlcmlhbEV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL01hdGVyaWFsRXZlbnRcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcblxuLyoqXG4gKiBBIExpbmUgU2VnbWVudCBwcmltaXRpdmUuXG4gKi9cbmNsYXNzIExpbmVTZWdtZW50IGV4dGVuZHMgRGlzcGxheU9iamVjdCBpbXBsZW1lbnRzIElFbnRpdHksIElNYXRlcmlhbE93bmVyXG57XG5cdHByaXZhdGUgX2FuaW1hdG9yOklBbmltYXRvcjtcblx0cHJpdmF0ZSBfbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlO1xuXHRwcml2YXRlIF91dlRyYW5zZm9ybTpVVlRyYW5zZm9ybTtcblxuXHRwcml2YXRlIG9uU2l6ZUNoYW5nZWREZWxlZ2F0ZTooZXZlbnQ6TWF0ZXJpYWxFdmVudCkgPT4gdm9pZDtcblxuXHRwdWJsaWMgX3N0YXJ0UG9zaXRpb246VmVjdG9yM0Q7XG5cdHB1YmxpYyBfZW5kUG9zaXRpb246VmVjdG9yM0Q7XG5cdHB1YmxpYyBfaGFsZlRoaWNrbmVzczpudW1iZXI7XG5cblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgYW5pbWF0b3Igb2YgdGhlIGxpbmUgc2VnbWVudC4gQWN0IG9uIHRoZSBsaW5lIHNlZ21lbnQncyBnZW9tZXRyeS4gRGVmYXVsdHMgdG8gbnVsbFxuXHQgKi9cblx0cHVibGljIGdldCBhbmltYXRvcigpOklBbmltYXRvclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FuaW1hdG9yO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5MSU5FX1NFR01FTlQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgc3RhcnRQb3N0aW9uKCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zdGFydFBvc2l0aW9uO1xuXHR9XG5cblx0cHVibGljIHNldCBzdGFydFBvc2l0aW9uKHZhbHVlOlZlY3RvcjNEKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3N0YXJ0UG9zaXRpb24gPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9zdGFydFBvc2l0aW9uID0gdmFsdWU7XG5cblx0XHR0aGlzLm5vdGlmeVJlbmRlcmFibGVVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBlbmRQb3NpdGlvbigpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZW5kUG9zaXRpb247XG5cdH1cblxuXHRwdWJsaWMgc2V0IGVuZFBvc2l0aW9uKHZhbHVlOlZlY3RvcjNEKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2VuZFBvc2l0aW9uID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZW5kUG9zaXRpb24gPSB2YWx1ZTtcblxuXHRcdHRoaXMubm90aWZ5UmVuZGVyYWJsZVVwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1hdGVyaWFsKCk6TWF0ZXJpYWxCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1hdGVyaWFsKHZhbHVlOk1hdGVyaWFsQmFzZSlcblx0e1xuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9tYXRlcmlhbClcblx0XHRcdHJldHVybjtcblxuXHRcdGlmICh0aGlzLl9tYXRlcmlhbCkge1xuXHRcdFx0dGhpcy5fbWF0ZXJpYWwuaVJlbW92ZU93bmVyKHRoaXMpO1xuXHRcdFx0dGhpcy5fbWF0ZXJpYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihNYXRlcmlhbEV2ZW50LlNJWkVfQ0hBTkdFRCwgdGhpcy5vblNpemVDaGFuZ2VkRGVsZWdhdGUpO1xuXHRcdH1cblxuXG5cdFx0dGhpcy5fbWF0ZXJpYWwgPSB2YWx1ZTtcblxuXHRcdGlmICh0aGlzLl9tYXRlcmlhbCkge1xuXHRcdFx0dGhpcy5fbWF0ZXJpYWwuaUFkZE93bmVyKHRoaXMpO1xuXHRcdFx0dGhpcy5fbWF0ZXJpYWwuYWRkRXZlbnRMaXN0ZW5lcihNYXRlcmlhbEV2ZW50LlNJWkVfQ0hBTkdFRCwgdGhpcy5vblNpemVDaGFuZ2VkRGVsZWdhdGUpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB0aGlja25lc3MoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9oYWxmVGhpY2tuZXNzKjI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHRoaWNrbmVzcyh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5faGFsZlRoaWNrbmVzcyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2hhbGZUaGlja25lc3MgPSB2YWx1ZSowLjU7XG5cblx0XHR0aGlzLm5vdGlmeVJlbmRlcmFibGVVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB1dlRyYW5zZm9ybSgpOlVWVHJhbnNmb3JtXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXZUcmFuc2Zvcm07XG5cdH1cblxuXHRwdWJsaWMgc2V0IHV2VHJhbnNmb3JtKHZhbHVlOlVWVHJhbnNmb3JtKVxuXHR7XG5cdFx0dGhpcy5fdXZUcmFuc2Zvcm0gPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBsaW5lIHNlZ21lbnRcblx0ICpcblx0ICogQHBhcmFtIHN0YXJ0UG9zaXRpb24gU3RhcnQgcG9zaXRpb24gb2YgdGhlIGxpbmUgc2VnbWVudFxuXHQgKiBAcGFyYW0gZW5kUG9zaXRpb24gRW5kaW5nIHBvc2l0aW9uIG9mIHRoZSBsaW5lIHNlZ21lbnRcblx0ICogQHBhcmFtIHRoaWNrbmVzcyBUaGlja25lc3Mgb2YgdGhlIGxpbmVcblx0ICovXG5cdGNvbnN0cnVjdG9yKG1hdGVyaWFsOk1hdGVyaWFsQmFzZSwgc3RhcnRQb3NpdGlvbjpWZWN0b3IzRCwgZW5kUG9zaXRpb246VmVjdG9yM0QsIHRoaWNrbmVzczpudW1iZXIgPSAxKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3BJc0VudGl0eSA9IHRydWU7XG5cblx0XHR0aGlzLm9uU2l6ZUNoYW5nZWREZWxlZ2F0ZSA9IChldmVudDpNYXRlcmlhbEV2ZW50KSA9PiB0aGlzLm9uU2l6ZUNoYW5nZWQoZXZlbnQpO1xuXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXG5cdFx0dGhpcy5fc3RhcnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XG5cdFx0dGhpcy5fZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcblx0XHR0aGlzLl9oYWxmVGhpY2tuZXNzID0gdGhpY2tuZXNzKjAuNTtcblx0fVxuXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHRoaXMuX3N0YXJ0UG9zaXRpb24gPSBudWxsO1xuXHRcdHRoaXMuX2VuZFBvc2l0aW9uID0gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUoKTpFbnRpdHlOb2RlXG5cdHtcblx0XHRyZXR1cm4gbmV3IEVudGl0eU5vZGUodGhpcyk7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBVcGRhdGVCb3VuZHMoKVxuXHR7XG5cdFx0dGhpcy5fcEJvdW5kcy5mcm9tRXh0cmVtZXModGhpcy5fc3RhcnRQb3NpdGlvbi54LCB0aGlzLl9zdGFydFBvc2l0aW9uLnksIHRoaXMuX3N0YXJ0UG9zaXRpb24ueiwgdGhpcy5fZW5kUG9zaXRpb24ueCwgdGhpcy5fZW5kUG9zaXRpb24ueSwgdGhpcy5fZW5kUG9zaXRpb24ueik7XG5cblx0XHRzdXBlci5wVXBkYXRlQm91bmRzKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgb25TaXplQ2hhbmdlZChldmVudDpNYXRlcmlhbEV2ZW50KVxuXHR7XG5cdFx0dGhpcy5ub3RpZnlSZW5kZXJhYmxlVXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgbm90aWZ5UmVuZGVyYWJsZVVwZGF0ZSgpXG5cdHtcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3BSZW5kZXJhYmxlcy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9wUmVuZGVyYWJsZXNbaV0uaW52YWxpZGF0ZVZlcnRleERhdGEoXCJ2ZXJ0aWNlc1wiKTsgLy9UT0RPXG5cdH1cblxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZXMocmVuZGVyZXI6SVJlbmRlcmVyKVxuXHR7XG5cdFx0Ly8gU2luY2UgdGhpcyBnZXR0ZXIgaXMgaW52b2tlZCBldmVyeSBpdGVyYXRpb24gb2YgdGhlIHJlbmRlciBsb29wLCBhbmRcblx0XHQvLyB0aGUgcHJlZmFiIGNvbnN0cnVjdCBjb3VsZCBhZmZlY3QgdGhlIHN1Yi1tZXNoZXMsIHRoZSBwcmVmYWIgaXNcblx0XHQvLyB2YWxpZGF0ZWQgaGVyZSB0byBnaXZlIGl0IGEgY2hhbmNlIHRvIHJlYnVpbGQuXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcblxuXHRcdHRoaXMuX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlcik7XG5cdH1cblxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlcjpJUmVuZGVyZXIpXG5cdHtcblx0XHQvL1RPRE9cblx0fVxufVxuXG5leHBvcnQgPSBMaW5lU2VnbWVudDsiXX0=