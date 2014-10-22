var EntityListItemPool = require("awayjs-core/lib/core/pool/EntityListItemPool");

/**
* @class away.traverse.CollectorBase
*/
var CollectorBase = (function () {
    function CollectorBase() {
        this._numCullPlanes = 0;
        this._pNumEntities = 0;
        this._pNumInteractiveEntities = 0;
        this._pEntityListItemPool = new EntityListItemPool();
    }
    Object.defineProperty(CollectorBase.prototype, "camera", {
        /**
        *
        */
        get: function () {
            return this._pCamera;
        },
        set: function (value) {
            this._pCamera = value;
            this._cullPlanes = this._pCamera.frustumPlanes;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(CollectorBase.prototype, "cullPlanes", {
        /**
        *
        */
        get: function () {
            return this._customCullPlanes;
        },
        set: function (value) {
            this._customCullPlanes = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(CollectorBase.prototype, "entityHead", {
        /**
        *
        */
        get: function () {
            return this._pEntityHead;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(CollectorBase.prototype, "numEntities", {
        /**
        *
        */
        get: function () {
            return this._pNumEntities;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(CollectorBase.prototype, "numInteractiveEntities", {
        /**
        *
        */
        get: function () {
            return this._pNumInteractiveEntities;
        },
        enumerable: true,
        configurable: true
    });

    /**
    *
    */
    CollectorBase.prototype.clear = function () {
        this._pNumEntities = this._pNumInteractiveEntities = 0;
        this._cullPlanes = this._customCullPlanes ? this._customCullPlanes : (this._pCamera ? this._pCamera.frustumPlanes : null);
        this._numCullPlanes = this._cullPlanes ? this._cullPlanes.length : 0;
        this._pEntityHead = null;
        this._pEntityListItemPool.freeAll();
    };

    /**
    *
    * @param node
    * @returns {boolean}
    */
    CollectorBase.prototype.enterNode = function (node) {
        var enter = this.scene._iCollectionMark != node._iCollectionMark && node.isInFrustum(this._cullPlanes, this._numCullPlanes);

        node._iCollectionMark = this.scene._iCollectionMark;

        return enter;
    };

    /**
    *
    * @param entity
    */
    CollectorBase.prototype.applyDirectionalLight = function (entity) {
        //don't do anything here
    };

    /**
    *
    * @param entity
    */
    CollectorBase.prototype.applyEntity = function (entity) {
        this._pNumEntities++;

        if (entity._iIsMouseEnabled())
            this._pNumInteractiveEntities++;

        var item = this._pEntityListItemPool.getItem();
        item.entity = entity;

        item.next = this._pEntityHead;
        this._pEntityHead = item;
    };

    /**
    *
    * @param entity
    */
    CollectorBase.prototype.applyLightProbe = function (entity) {
        //don't do anything here
    };

    /**
    *
    * @param entity
    */
    CollectorBase.prototype.applyPointLight = function (entity) {
        //don't do anything here
    };

    /**
    *
    * @param entity
    */
    CollectorBase.prototype.applySkybox = function (entity) {
        //don't do anything here
    };
    return CollectorBase;
})();

module.exports = CollectorBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvdHJhdmVyc2UvQ29sbGVjdG9yQmFzZS50cyJdLCJuYW1lcyI6WyJDb2xsZWN0b3JCYXNlIiwiQ29sbGVjdG9yQmFzZS5jb25zdHJ1Y3RvciIsIkNvbGxlY3RvckJhc2UuY2xlYXIiLCJDb2xsZWN0b3JCYXNlLmVudGVyTm9kZSIsIkNvbGxlY3RvckJhc2UuYXBwbHlEaXJlY3Rpb25hbExpZ2h0IiwiQ29sbGVjdG9yQmFzZS5hcHBseUVudGl0eSIsIkNvbGxlY3RvckJhc2UuYXBwbHlMaWdodFByb2JlIiwiQ29sbGVjdG9yQmFzZS5hcHBseVBvaW50TGlnaHQiLCJDb2xsZWN0b3JCYXNlLmFwcGx5U2t5Ym94Il0sIm1hcHBpbmdzIjoiQUFBQSxnRkFHc0Y7O0FBT3RGOztFQUVHO0FBQ0g7SUFhQ0E7UUFKQUMsS0FBUUEsY0FBY0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDbENBLEtBQU9BLGFBQWFBLEdBQVVBLENBQUNBLENBQUNBO1FBQ2hDQSxLQUFPQSx3QkFBd0JBLEdBQVVBLENBQUNBLENBQUNBO1FBSTFDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEdBQUdBLElBQUlBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7SUFDckRBLENBQUNBO0lBS0REO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxRQUFRQTtRQUNyQkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBa0JBLEtBQVlBO1lBRTdCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFLQTtZQUNyQkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsYUFBYUE7UUFDL0NBLENBQUNBOzs7O0FBTkFBOztJQVdEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQTtRQUM5QkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBc0JBLEtBQW9CQTtZQUV6Q0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxLQUFLQTtRQUMvQkEsQ0FBQ0E7Ozs7QUFMQUE7O0lBVURBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxZQUFZQTtRQUN6QkEsQ0FBQ0E7Ozs7QUFBQUE7SUFLREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGFBQWFBO1FBQzFCQSxDQUFDQTs7OztBQUFBQTtJQUtEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0Esd0JBQXdCQTtRQUNyQ0EsQ0FBQ0E7Ozs7QUFBQUE7SUFLREE7O01BREdBO29DQUNIQTtRQUVDRSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQSx3QkFBd0JBLEdBQUdBLENBQUNBO1FBQ3REQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUVBLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBR0EsQ0FBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsYUFBYUEsR0FBR0EsSUFBSUEsQ0FBRUE7UUFDekhBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLEdBQUVBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBO1FBQ25FQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQTtRQUN4QkEsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtJQUNwQ0EsQ0FBQ0E7O0lBT0RGOzs7O01BREdBO3dDQUNIQSxVQUFpQkEsSUFBYUE7UUFFN0JHLElBQUlBLEtBQUtBLEdBQVdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLGdCQUFnQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxJQUFJQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTs7UUFFbklBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQTs7UUFFbkRBLE9BQU9BLEtBQUtBO0lBQ2JBLENBQUNBOztJQU1ESDs7O01BREdBO29EQUNIQSxVQUE2QkEsTUFBY0E7UUFFMUNJLHdCQUF3QkE7SUFDekJBLENBQUNBOztJQU1ESjs7O01BREdBOzBDQUNIQSxVQUFtQkEsTUFBY0E7UUFFaENLLElBQUlBLENBQUNBLGFBQWFBLEVBQUVBOztRQUVwQkEsSUFBSUEsTUFBTUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtZQUM1QkEsSUFBSUEsQ0FBQ0Esd0JBQXdCQSxFQUFFQSxDQUFDQTs7UUFFakNBLElBQUlBLElBQUlBLEdBQWtCQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1FBQzdEQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQTs7UUFFcEJBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBO1FBQzdCQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQTtJQUN6QkEsQ0FBQ0E7O0lBTURMOzs7TUFER0E7OENBQ0hBLFVBQXVCQSxNQUFjQTtRQUVwQ00sd0JBQXdCQTtJQUN6QkEsQ0FBQ0E7O0lBTUROOzs7TUFER0E7OENBQ0hBLFVBQXVCQSxNQUFjQTtRQUVwQ08sd0JBQXdCQTtJQUN6QkEsQ0FBQ0E7O0lBTURQOzs7TUFER0E7MENBQ0hBLFVBQW1CQSxNQUFjQTtRQUVoQ1Esd0JBQXdCQTtJQUN6QkEsQ0FBQ0E7SUFDRlIscUJBQUNBO0FBQURBLENBQUNBLElBQUE7O0FBRUQsOEJBQXVCLENBQUEiLCJmaWxlIjoiY29yZS90cmF2ZXJzZS9Db2xsZWN0b3JCYXNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNjZW5lXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvbnRhaW5lcnMvU2NlbmVcIik7XG5pbXBvcnQgUGxhbmUzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vUGxhbmUzRFwiKTtcbmltcG9ydCBFbnRpdHlMaXN0SXRlbVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcG9vbC9FbnRpdHlMaXN0SXRlbVwiKTtcbmltcG9ydCBFbnRpdHlMaXN0SXRlbVBvb2xcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9wb29sL0VudGl0eUxpc3RJdGVtUG9vbFwiKTtcbmltcG9ydCBOb2RlQmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3BhcnRpdGlvbi9Ob2RlQmFzZVwiKTtcbmltcG9ydCBJUmVuZGVyZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcmVuZGVyL0lSZW5kZXJlclwiKTtcbmltcG9ydCBJQ29sbGVjdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0NhbWVyYVwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5cbi8qKlxuICogQGNsYXNzIGF3YXkudHJhdmVyc2UuQ29sbGVjdG9yQmFzZVxuICovXG5jbGFzcyBDb2xsZWN0b3JCYXNlIGltcGxlbWVudHMgSUNvbGxlY3Rvclxue1xuXHRwdWJsaWMgc2NlbmU6U2NlbmU7XG5cblx0cHVibGljIF9wRW50aXR5SGVhZDpFbnRpdHlMaXN0SXRlbTtcblx0cHVibGljIF9wRW50aXR5TGlzdEl0ZW1Qb29sOkVudGl0eUxpc3RJdGVtUG9vbDtcblx0cHVibGljIF9wQ2FtZXJhOkNhbWVyYTtcblx0cHJpdmF0ZSBfY3VzdG9tQ3VsbFBsYW5lczpBcnJheTxQbGFuZTNEPjtcblx0cHJpdmF0ZSBfY3VsbFBsYW5lczpBcnJheTxQbGFuZTNEPjtcblx0cHJpdmF0ZSBfbnVtQ3VsbFBsYW5lczpudW1iZXIgPSAwO1xuXHRwdWJsaWMgX3BOdW1FbnRpdGllczpudW1iZXIgPSAwO1xuXHRwdWJsaWMgX3BOdW1JbnRlcmFjdGl2ZUVudGl0aWVzOm51bWJlciA9IDA7XG5cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0dGhpcy5fcEVudGl0eUxpc3RJdGVtUG9vbCA9IG5ldyBFbnRpdHlMaXN0SXRlbVBvb2woKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBjYW1lcmEoKTpDYW1lcmFcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQ2FtZXJhO1xuXHR9XG5cblx0cHVibGljIHNldCBjYW1lcmEodmFsdWU6Q2FtZXJhKVxuXHR7XG5cdFx0dGhpcy5fcENhbWVyYSA9IHZhbHVlO1xuXHRcdHRoaXMuX2N1bGxQbGFuZXMgPSB0aGlzLl9wQ2FtZXJhLmZydXN0dW1QbGFuZXM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgY3VsbFBsYW5lcygpOkFycmF5PFBsYW5lM0Q+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY3VzdG9tQ3VsbFBsYW5lcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgY3VsbFBsYW5lcyh2YWx1ZTpBcnJheTxQbGFuZTNEPilcblx0e1xuXHRcdHRoaXMuX2N1c3RvbUN1bGxQbGFuZXMgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBlbnRpdHlIZWFkKCk6RW50aXR5TGlzdEl0ZW1cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wRW50aXR5SGVhZDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBudW1FbnRpdGllcygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BOdW1FbnRpdGllcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBudW1JbnRlcmFjdGl2ZUVudGl0aWVzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE51bUludGVyYWN0aXZlRW50aXRpZXM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBjbGVhcigpXG5cdHtcblx0XHR0aGlzLl9wTnVtRW50aXRpZXMgPSB0aGlzLl9wTnVtSW50ZXJhY3RpdmVFbnRpdGllcyA9IDA7XG5cdFx0dGhpcy5fY3VsbFBsYW5lcyA9IHRoaXMuX2N1c3RvbUN1bGxQbGFuZXM/IHRoaXMuX2N1c3RvbUN1bGxQbGFuZXMgOiAoIHRoaXMuX3BDYW1lcmE/IHRoaXMuX3BDYW1lcmEuZnJ1c3R1bVBsYW5lcyA6IG51bGwgKTtcblx0XHR0aGlzLl9udW1DdWxsUGxhbmVzID0gdGhpcy5fY3VsbFBsYW5lcz8gdGhpcy5fY3VsbFBsYW5lcy5sZW5ndGggOiAwO1xuXHRcdHRoaXMuX3BFbnRpdHlIZWFkID0gbnVsbDtcblx0XHR0aGlzLl9wRW50aXR5TGlzdEl0ZW1Qb29sLmZyZWVBbGwoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gbm9kZVxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdHB1YmxpYyBlbnRlck5vZGUobm9kZTpOb2RlQmFzZSk6Ym9vbGVhblxuXHR7XG5cdFx0dmFyIGVudGVyOmJvb2xlYW4gPSB0aGlzLnNjZW5lLl9pQ29sbGVjdGlvbk1hcmsgIT0gbm9kZS5faUNvbGxlY3Rpb25NYXJrICYmIG5vZGUuaXNJbkZydXN0dW0odGhpcy5fY3VsbFBsYW5lcywgdGhpcy5fbnVtQ3VsbFBsYW5lcyk7XG5cblx0XHRub2RlLl9pQ29sbGVjdGlvbk1hcmsgPSB0aGlzLnNjZW5lLl9pQ29sbGVjdGlvbk1hcms7XG5cblx0XHRyZXR1cm4gZW50ZXI7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGVudGl0eVxuXHQgKi9cblx0cHVibGljIGFwcGx5RGlyZWN0aW9uYWxMaWdodChlbnRpdHk6SUVudGl0eSlcblx0e1xuXHRcdC8vZG9uJ3QgZG8gYW55dGhpbmcgaGVyZVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBlbnRpdHlcblx0ICovXG5cdHB1YmxpYyBhcHBseUVudGl0eShlbnRpdHk6SUVudGl0eSlcblx0e1xuXHRcdHRoaXMuX3BOdW1FbnRpdGllcysrO1xuXG5cdFx0aWYgKGVudGl0eS5faUlzTW91c2VFbmFibGVkKCkpXG5cdFx0XHR0aGlzLl9wTnVtSW50ZXJhY3RpdmVFbnRpdGllcysrO1xuXG5cdFx0dmFyIGl0ZW06RW50aXR5TGlzdEl0ZW0gPSB0aGlzLl9wRW50aXR5TGlzdEl0ZW1Qb29sLmdldEl0ZW0oKTtcblx0XHRpdGVtLmVudGl0eSA9IGVudGl0eTtcblxuXHRcdGl0ZW0ubmV4dCA9IHRoaXMuX3BFbnRpdHlIZWFkO1xuXHRcdHRoaXMuX3BFbnRpdHlIZWFkID0gaXRlbTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gZW50aXR5XG5cdCAqL1xuXHRwdWJsaWMgYXBwbHlMaWdodFByb2JlKGVudGl0eTpJRW50aXR5KVxuXHR7XG5cdFx0Ly9kb24ndCBkbyBhbnl0aGluZyBoZXJlXG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGVudGl0eVxuXHQgKi9cblx0cHVibGljIGFwcGx5UG9pbnRMaWdodChlbnRpdHk6SUVudGl0eSlcblx0e1xuXHRcdC8vZG9uJ3QgZG8gYW55dGhpbmcgaGVyZVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBlbnRpdHlcblx0ICovXG5cdHB1YmxpYyBhcHBseVNreWJveChlbnRpdHk6SUVudGl0eSlcblx0e1xuXHRcdC8vZG9uJ3QgZG8gYW55dGhpbmcgaGVyZVxuXHR9XG59XG5cbmV4cG9ydCA9IENvbGxlY3RvckJhc2U7Il19