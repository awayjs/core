/**
* @class away.partition.NodeBase
*/
var NodeBase = (function () {
    /**
    *
    */
    function NodeBase() {
        this._pNumChildNodes = 0;
        this._iNumEntities = 0;
        this._pChildNodes = new Array();
    }
    Object.defineProperty(NodeBase.prototype, "boundsVisible", {
        /**
        *
        */
        get: function () {
            return this._explicitBoundsVisible;
        },
        set: function (value) {
            if (this._explicitBoundsVisible == value)
                return;

            this._explicitBoundsVisible = value;

            this._iUpdateImplicitBoundsVisible(this._iParent ? this._iParent.boundsChildrenVisible : false);
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(NodeBase.prototype, "boundsChildrenVisible", {
        get: function () {
            return this._boundsChildrenVisible;
        },
        set: function (value) {
            if (this._boundsChildrenVisible == value)
                return;

            this._boundsChildrenVisible = value;

            for (var i = 0; i < this._pNumChildNodes; ++i)
                this._pChildNodes[i]._iUpdateImplicitBoundsVisible(this._boundsChildrenVisible);
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(NodeBase.prototype, "parent", {
        /**
        *
        */
        get: function () {
            return this._iParent;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(NodeBase.prototype, "_pNumEntities", {
        /**
        *
        * @protected
        */
        get: function () {
            return this._iNumEntities;
        },
        enumerable: true,
        configurable: true
    });

    /**
    *
    * @param planes
    * @param numPlanes
    * @returns {boolean}
    * @internal
    */
    NodeBase.prototype.isInFrustum = function (planes, numPlanes) {
        return true;
    };

    /**
    *
    * @param rayPosition
    * @param rayDirection
    * @returns {boolean}
    */
    NodeBase.prototype.isIntersectingRay = function (rayPosition, rayDirection) {
        return true;
    };

    /**
    *
    * @returns {boolean}
    */
    NodeBase.prototype.isCastingShadow = function () {
        return true;
    };

    /**
    *
    * @param entity
    * @returns {away.partition.NodeBase}
    */
    NodeBase.prototype.findPartitionForEntity = function (entity) {
        return this;
    };

    /**
    *
    * @param traverser
    */
    NodeBase.prototype.acceptTraverser = function (traverser) {
        if (this._pNumEntities == 0 && !this._implicitBoundsVisible)
            return;

        if (traverser.enterNode(this)) {
            var i = 0;

            while (i < this._pNumChildNodes)
                this._pChildNodes[i++].acceptTraverser(traverser);

            if (this._implicitBoundsVisible)
                this._pBoundsPrimitive.partitionNode.acceptTraverser(traverser);
        }
    };

    /**
    *
    * @protected
    */
    NodeBase.prototype._pCreateBoundsPrimitive = function () {
        return null;
    };

    /**
    *
    * @param node
    * @internal
    */
    NodeBase.prototype.iAddNode = function (node) {
        node._iParent = this;
        this._iNumEntities += node._pNumEntities;
        this._pChildNodes[this._pNumChildNodes++] = node;

        node._iUpdateImplicitBoundsVisible(this.boundsChildrenVisible);

        var numEntities = node._pNumEntities;
        node = this;

        do {
            node._iNumEntities += numEntities;
        } while((node = node._iParent) != null);
    };

    /**
    *
    * @param node
    * @internal
    */
    NodeBase.prototype.iRemoveNode = function (node) {
        var index = this._pChildNodes.indexOf(node);
        this._pChildNodes[index] = this._pChildNodes[--this._pNumChildNodes];
        this._pChildNodes.pop();

        node._iUpdateImplicitBoundsVisible(false);

        var numEntities = node._pNumEntities;
        node = this;

        do {
            node._pNumEntities -= numEntities;
        } while((node = node._iParent) != null);
    };

    NodeBase.prototype._iUpdateImplicitBoundsVisible = function (value) {
        if (this._implicitBoundsVisible == this._explicitBoundsVisible || value)
            return;

        this._implicitBoundsVisible = this._explicitBoundsVisible || value;

        this._iUpdateEntityBounds();

        for (var i = 0; i < this._pNumChildNodes; ++i)
            this._pChildNodes[i]._iUpdateImplicitBoundsVisible(this._boundsChildrenVisible);
    };

    /**
    * @internal
    */
    NodeBase.prototype._iIsBoundsVisible = function () {
        return this._implicitBoundsVisible;
    };

    //		public _pUpdateNumEntities(value:number)
    //		{
    //			var diff:number = value - this._pNumEntities;
    //			var node:NodeBase = this;
    //
    //			do {
    //				node._pNumEntities += diff;
    //			} while ((node = node._iParent) != null);
    //		}
    NodeBase.prototype._iUpdateEntityBounds = function () {
        if (this._pBoundsPrimitive) {
            this._pBoundsPrimitive.dispose();
            this._pBoundsPrimitive = null;
        }

        if (this._implicitBoundsVisible)
            this._pBoundsPrimitive = this._pCreateBoundsPrimitive();
    };
    return NodeBase;
})();

module.exports = NodeBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcGFydGl0aW9uL05vZGVCYXNlLnRzIl0sIm5hbWVzIjpbIk5vZGVCYXNlIiwiTm9kZUJhc2UuY29uc3RydWN0b3IiLCJOb2RlQmFzZS5pc0luRnJ1c3R1bSIsIk5vZGVCYXNlLmlzSW50ZXJzZWN0aW5nUmF5IiwiTm9kZUJhc2UuaXNDYXN0aW5nU2hhZG93IiwiTm9kZUJhc2UuZmluZFBhcnRpdGlvbkZvckVudGl0eSIsIk5vZGVCYXNlLmFjY2VwdFRyYXZlcnNlciIsIk5vZGVCYXNlLl9wQ3JlYXRlQm91bmRzUHJpbWl0aXZlIiwiTm9kZUJhc2UuaUFkZE5vZGUiLCJOb2RlQmFzZS5pUmVtb3ZlTm9kZSIsIk5vZGVCYXNlLl9pVXBkYXRlSW1wbGljaXRCb3VuZHNWaXNpYmxlIiwiTm9kZUJhc2UuX2lJc0JvdW5kc1Zpc2libGUiLCJOb2RlQmFzZS5faVVwZGF0ZUVudGl0eUJvdW5kcyJdLCJtYXBwaW5ncyI6IkFBQUE7O0VBT0c7QUFDSDtJQW9FQ0E7O01BREdBO0lBQ0hBO1FBN0RBQyxLQUFPQSxlQUFlQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUdsQ0EsS0FBT0EsYUFBYUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUE0RC9CQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFXQSxDQUFDQTtJQUMxQ0EsQ0FBQ0E7SUF2REREO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxzQkFBc0JBO1FBQ25DQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUF5QkEsS0FBYUE7WUFFckNBLElBQUlBLElBQUlBLENBQUNBLHNCQUFzQkEsSUFBSUEsS0FBS0E7Z0JBQ3ZDQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsQ0FBQ0Esc0JBQXNCQSxHQUFHQSxLQUFLQTs7WUFFbkNBLElBQUlBLENBQUNBLDZCQUE2QkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EscUJBQXFCQSxH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Q0FBQ0E7WUFDbkRBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLDZCQUE2QkEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxDQUFDQTtJQUNsRkEsQ0FBQ0E7O0lBS0RWOztNQURHQTsyQ0FDSEE7UUFFQ1csT0FBT0EsSUFBSUEsQ0FBQ0Esc0JBQXNCQTtJQUNuQ0EsQ0FBQ0E7O0lBWURYLDRDQVYyQ0E7SUFDNUNBLEtBQUtBO0lBQ0xBLGtEQUFrREE7SUFDbERBLDhCQUE4QkE7SUFDOUJBLEVBQUVBO0lBQ0ZBLFNBQVNBO0lBQ1RBLGlDQUFpQ0E7SUFDakNBLDhDQUE4Q0E7SUFDOUNBLEtBQUtBOzhDQUVKQTtRQUVDWSxJQUFJQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUVBO1lBQzNCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1lBQ2hDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLElBQUlBO1NBQzdCQTs7UUFFREEsSUFBSUEsSUFBSUEsQ0FBQ0Esc0JBQXNCQTtZQUM5QkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxJQUFJQSxDQUFDQSx1QkFBdUJBLENBQUNBLENBQUNBLENBQUNBO0lBQzFEQSxDQUFDQTtJQUNGWixnQkFBQ0E7QUFBREEsQ0FBQ0EsSUFBQTs7QUFFRCx5QkFBa0IsQ0FBQSIsImZpbGUiOiJjb3JlL3BhcnRpdGlvbi9Ob2RlQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGFuZTNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9QbGFuZTNEXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBJQ29sbGVjdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuXG4vKipcbiAqIEBjbGFzcyBhd2F5LnBhcnRpdGlvbi5Ob2RlQmFzZVxuICovXG5jbGFzcyBOb2RlQmFzZVxue1xuXHRwcml2YXRlIF9ib3VuZHNDaGlsZHJlblZpc2libGU6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfZXhwbGljaXRCb3VuZHNWaXNpYmxlOmJvb2xlYW47XG5cdHByaXZhdGUgX2ltcGxpY2l0Qm91bmRzVmlzaWJsZTpib29sZWFuO1xuXHRwdWJsaWMgX2lQYXJlbnQ6Tm9kZUJhc2U7XG5cdHB1YmxpYyBfcENoaWxkTm9kZXM6QXJyYXk8Tm9kZUJhc2U+O1xuXHRwdWJsaWMgX3BOdW1DaGlsZE5vZGVzOm51bWJlciA9IDA7XG5cdHB1YmxpYyBfcEJvdW5kc1ByaW1pdGl2ZTpJRW50aXR5O1xuXG5cdHB1YmxpYyBfaU51bUVudGl0aWVzOm51bWJlciA9IDA7XG5cdHB1YmxpYyBfaUNvbGxlY3Rpb25NYXJrOm51bWJlcjsvLyA9IDA7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJvdW5kc1Zpc2libGUoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRCb3VuZHNWaXNpYmxlO1xuXHR9XG5cblx0cHVibGljIHNldCBib3VuZHNWaXNpYmxlKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fZXhwbGljaXRCb3VuZHNWaXNpYmxlID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZXhwbGljaXRCb3VuZHNWaXNpYmxlID0gdmFsdWU7XG5cblx0XHR0aGlzLl9pVXBkYXRlSW1wbGljaXRCb3VuZHNWaXNpYmxlKHRoaXMuX2lQYXJlbnQ/IHRoaXMuX2lQYXJlbnQuYm91bmRzQ2hpbGRyZW5WaXNpYmxlIDogZmFsc2UpO1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0IGJvdW5kc0NoaWxkcmVuVmlzaWJsZSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9ib3VuZHNDaGlsZHJlblZpc2libGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJvdW5kc0NoaWxkcmVuVmlzaWJsZSh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2JvdW5kc0NoaWxkcmVuVmlzaWJsZSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2JvdW5kc0NoaWxkcmVuVmlzaWJsZSA9IHZhbHVlO1xuXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgdGhpcy5fcE51bUNoaWxkTm9kZXM7ICsraSlcblx0XHRcdHRoaXMuX3BDaGlsZE5vZGVzW2ldLl9pVXBkYXRlSW1wbGljaXRCb3VuZHNWaXNpYmxlKHRoaXMuX2JvdW5kc0NoaWxkcmVuVmlzaWJsZSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgcGFyZW50KCk6Tm9kZUJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9pUGFyZW50O1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBnZXQgX3BOdW1FbnRpdGllcygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2lOdW1FbnRpdGllcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0dGhpcy5fcENoaWxkTm9kZXMgPSBuZXcgQXJyYXk8Tm9kZUJhc2U+KCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHBsYW5lc1xuXHQgKiBAcGFyYW0gbnVtUGxhbmVzXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBpc0luRnJ1c3R1bShwbGFuZXM6QXJyYXk8UGxhbmUzRD4sIG51bVBsYW5lczpudW1iZXIpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSByYXlQb3NpdGlvblxuXHQgKiBAcGFyYW0gcmF5RGlyZWN0aW9uXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0cHVibGljIGlzSW50ZXJzZWN0aW5nUmF5KHJheVBvc2l0aW9uOlZlY3RvcjNELCByYXlEaXJlY3Rpb246VmVjdG9yM0QpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0cHVibGljIGlzQ2FzdGluZ1NoYWRvdygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBlbnRpdHlcblx0ICogQHJldHVybnMge2F3YXkucGFydGl0aW9uLk5vZGVCYXNlfVxuXHQgKi9cblx0cHVibGljIGZpbmRQYXJ0aXRpb25Gb3JFbnRpdHkoZW50aXR5OklFbnRpdHkpOk5vZGVCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gdHJhdmVyc2VyXG5cdCAqL1xuXHRwdWJsaWMgYWNjZXB0VHJhdmVyc2VyKHRyYXZlcnNlcjpJQ29sbGVjdG9yKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BOdW1FbnRpdGllcyA9PSAwICYmICF0aGlzLl9pbXBsaWNpdEJvdW5kc1Zpc2libGUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAodHJhdmVyc2VyLmVudGVyTm9kZSh0aGlzKSkge1xuXHRcdFx0dmFyIGk6bnVtYmVyID0gMDtcblxuXHRcdFx0d2hpbGUgKGkgPCB0aGlzLl9wTnVtQ2hpbGROb2Rlcylcblx0XHRcdFx0dGhpcy5fcENoaWxkTm9kZXNbaSsrXS5hY2NlcHRUcmF2ZXJzZXIodHJhdmVyc2VyKTtcblxuXHRcdFx0aWYgKHRoaXMuX2ltcGxpY2l0Qm91bmRzVmlzaWJsZSlcblx0XHRcdFx0dGhpcy5fcEJvdW5kc1ByaW1pdGl2ZS5wYXJ0aXRpb25Ob2RlLmFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgX3BDcmVhdGVCb3VuZHNQcmltaXRpdmUoKTpJRW50aXR5XG5cdHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gbm9kZVxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBpQWRkTm9kZShub2RlOk5vZGVCYXNlKVxuXHR7XG5cdFx0bm9kZS5faVBhcmVudCA9IHRoaXM7XG5cdFx0dGhpcy5faU51bUVudGl0aWVzICs9IG5vZGUuX3BOdW1FbnRpdGllcztcblx0XHR0aGlzLl9wQ2hpbGROb2Rlc1sgdGhpcy5fcE51bUNoaWxkTm9kZXMrKyBdID0gbm9kZTtcblxuXHRcdG5vZGUuX2lVcGRhdGVJbXBsaWNpdEJvdW5kc1Zpc2libGUodGhpcy5ib3VuZHNDaGlsZHJlblZpc2libGUpO1xuXG5cdFx0dmFyIG51bUVudGl0aWVzOm51bWJlciA9IG5vZGUuX3BOdW1FbnRpdGllcztcblx0XHRub2RlID0gdGhpcztcblxuXHRcdGRvIHtcblx0XHRcdG5vZGUuX2lOdW1FbnRpdGllcyArPSBudW1FbnRpdGllcztcblx0XHR9IHdoaWxlICgobm9kZSA9IG5vZGUuX2lQYXJlbnQpICE9IG51bGwpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBub2RlXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGlSZW1vdmVOb2RlKG5vZGU6Tm9kZUJhc2UpXG5cdHtcblx0XHR2YXIgaW5kZXg6bnVtYmVyID0gdGhpcy5fcENoaWxkTm9kZXMuaW5kZXhPZihub2RlKTtcblx0XHR0aGlzLl9wQ2hpbGROb2Rlc1tpbmRleF0gPSB0aGlzLl9wQ2hpbGROb2Rlc1stLXRoaXMuX3BOdW1DaGlsZE5vZGVzXTtcblx0XHR0aGlzLl9wQ2hpbGROb2Rlcy5wb3AoKTtcblxuXHRcdG5vZGUuX2lVcGRhdGVJbXBsaWNpdEJvdW5kc1Zpc2libGUoZmFsc2UpO1xuXG5cdFx0dmFyIG51bUVudGl0aWVzOm51bWJlciA9IG5vZGUuX3BOdW1FbnRpdGllcztcblx0XHRub2RlID0gdGhpcztcblxuXHRcdGRvIHtcblx0XHRcdG5vZGUuX3BOdW1FbnRpdGllcyAtPSBudW1FbnRpdGllcztcblx0XHR9IHdoaWxlICgobm9kZSA9IG5vZGUuX2lQYXJlbnQpICE9IG51bGwpO1xuXHR9XG5cblx0cHJpdmF0ZSBfaVVwZGF0ZUltcGxpY2l0Qm91bmRzVmlzaWJsZSh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2ltcGxpY2l0Qm91bmRzVmlzaWJsZSA9PSB0aGlzLl9leHBsaWNpdEJvdW5kc1Zpc2libGUgfHwgdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9pbXBsaWNpdEJvdW5kc1Zpc2libGUgPSB0aGlzLl9leHBsaWNpdEJvdW5kc1Zpc2libGUgfHwgdmFsdWU7XG5cblx0XHR0aGlzLl9pVXBkYXRlRW50aXR5Qm91bmRzKCk7XG5cblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCB0aGlzLl9wTnVtQ2hpbGROb2RlczsgKytpKVxuXHRcdFx0dGhpcy5fcENoaWxkTm9kZXNbaV0uX2lVcGRhdGVJbXBsaWNpdEJvdW5kc1Zpc2libGUodGhpcy5fYm91bmRzQ2hpbGRyZW5WaXNpYmxlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaUlzQm91bmRzVmlzaWJsZSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9pbXBsaWNpdEJvdW5kc1Zpc2libGU7XG5cdH1cblxuLy9cdFx0cHVibGljIF9wVXBkYXRlTnVtRW50aXRpZXModmFsdWU6bnVtYmVyKVxuLy9cdFx0e1xuLy9cdFx0XHR2YXIgZGlmZjpudW1iZXIgPSB2YWx1ZSAtIHRoaXMuX3BOdW1FbnRpdGllcztcbi8vXHRcdFx0dmFyIG5vZGU6Tm9kZUJhc2UgPSB0aGlzO1xuLy9cbi8vXHRcdFx0ZG8ge1xuLy9cdFx0XHRcdG5vZGUuX3BOdW1FbnRpdGllcyArPSBkaWZmO1xuLy9cdFx0XHR9IHdoaWxlICgobm9kZSA9IG5vZGUuX2lQYXJlbnQpICE9IG51bGwpO1xuLy9cdFx0fVxuXG5cdHB1YmxpYyBfaVVwZGF0ZUVudGl0eUJvdW5kcygpXG5cdHtcblx0XHRpZiAodGhpcy5fcEJvdW5kc1ByaW1pdGl2ZSkge1xuXHRcdFx0dGhpcy5fcEJvdW5kc1ByaW1pdGl2ZS5kaXNwb3NlKCk7XG5cdFx0XHR0aGlzLl9wQm91bmRzUHJpbWl0aXZlID0gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5faW1wbGljaXRCb3VuZHNWaXNpYmxlKVxuXHRcdFx0dGhpcy5fcEJvdW5kc1ByaW1pdGl2ZSA9IHRoaXMuX3BDcmVhdGVCb3VuZHNQcmltaXRpdmUoKTtcblx0fVxufVxuXG5leHBvcnQgPSBOb2RlQmFzZTsiXX0=