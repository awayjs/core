var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObjectContainer = require("awayjs-core/lib/containers/DisplayObjectContainer");

var NodeBase = require("awayjs-core/lib/core/partition/NodeBase");
var Partition = require("awayjs-core/lib/core/partition/Partition");

var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var SceneEvent = require("awayjs-core/lib/events/SceneEvent");

var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        _super.call(this);
        this._expandedPartitions = new Array();
        this._partitions = new Array();
        this._iCollectionMark = 0;

        this._iSceneGraphRoot = new DisplayObjectContainer();

        this._iSceneGraphRoot._iSetScene(this);
        this._iSceneGraphRoot._iIsRoot = true;
        this._iSceneGraphRoot.partition = new Partition(new NodeBase());
    }
    Scene.prototype.traversePartitions = function (traverser) {
        var i = 0;
        var len = this._partitions.length;

        traverser.scene = this;

        while (i < len) {
            this._iCollectionMark++;
            this._partitions[i++].traverse(traverser);
        }
    };

    Object.defineProperty(Scene.prototype, "partition", {
        get: function () {
            return this._iSceneGraphRoot.partition;
        },
        set: function (value) {
            this._iSceneGraphRoot.partition = value;

            this.dispatchEvent(new SceneEvent(SceneEvent.PARTITION_CHANGED, this._iSceneGraphRoot));
        },
        enumerable: true,
        configurable: true
    });


    Scene.prototype.contains = function (child) {
        return this._iSceneGraphRoot.contains(child);
    };

    Scene.prototype.addChild = function (child) {
        return this._iSceneGraphRoot.addChild(child);
    };

    Scene.prototype.removeChild = function (child) {
        this._iSceneGraphRoot.removeChild(child);
    };

    Scene.prototype.removeChildAt = function (index) {
        this._iSceneGraphRoot.removeChildAt(index);
    };

    Scene.prototype.getChildAt = function (index) {
        return this._iSceneGraphRoot.getChildAt(index);
    };

    Object.defineProperty(Scene.prototype, "numChildren", {
        get: function () {
            return this._iSceneGraphRoot.numChildren;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * @internal
    */
    Scene.prototype.iRegisterEntity = function (displayObject) {
        if (displayObject.partition)
            this.iRegisterPartition(displayObject.partition);

        if (displayObject.isEntity)
            displayObject._iAssignedPartition.iMarkForUpdate(displayObject);
    };

    /**
    * @internal
    */
    Scene.prototype.iRegisterPartition = function (partition) {
        this._expandedPartitions.push(partition);

        //ensure duplicates are not found in partitions array
        if (this._partitions.indexOf(partition) == -1)
            this._partitions.push(partition);
    };

    /**
    * @internal
    */
    Scene.prototype.iUnregisterEntity = function (displayObject) {
        if (displayObject.partition)
            this.iUnregisterPartition(displayObject.partition);

        if (displayObject.isEntity)
            displayObject._iAssignedPartition.iRemoveEntity(displayObject);
    };

    /**
    * @internal
    */
    Scene.prototype.iUnregisterPartition = function (partition) {
        this._expandedPartitions.splice(this._expandedPartitions.indexOf(partition), 1);

        //if no more partition references found, remove from partitions array
        if (this._expandedPartitions.indexOf(partition) == -1)
            this._partitions.splice(this._partitions.indexOf(partition), 1);
    };
    return Scene;
})(EventDispatcher);

module.exports = Scene;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvU2NlbmUudHMiXSwibmFtZXMiOlsiU2NlbmUiLCJTY2VuZS5jb25zdHJ1Y3RvciIsIlNjZW5lLnRyYXZlcnNlUGFydGl0aW9ucyIsIlNjZW5lLmNvbnRhaW5zIiwiU2NlbmUuYWRkQ2hpbGQiLCJTY2VuZS5yZW1vdmVDaGlsZCIsIlNjZW5lLnJlbW92ZUNoaWxkQXQiLCJTY2VuZS5nZXRDaGlsZEF0IiwiU2NlbmUuaVJlZ2lzdGVyRW50aXR5IiwiU2NlbmUuaVJlZ2lzdGVyUGFydGl0aW9uIiwiU2NlbmUuaVVucmVnaXN0ZXJFbnRpdHkiLCJTY2VuZS5pVW5yZWdpc3RlclBhcnRpdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUZBQThGOztBQUU5RixpRUFBMEU7QUFDMUUsbUVBQTJFOztBQUUzRSx1RUFBOEU7QUFDOUUsNkRBQXFFOztBQUVyRTtJQUFvQkEsd0JBQWVBO0lBUWxDQTtRQUVDQyxXQUFNQSxLQUFBQSxDQUFDQTtRQVJSQSxLQUFRQSxtQkFBbUJBLEdBQW9CQSxJQUFJQSxLQUFLQSxDQUFZQSxDQUFDQSxDQUFDQTtRQUN0RUEsS0FBUUEsV0FBV0EsR0FBb0JBLElBQUlBLEtBQUtBLENBQVlBLENBQUNBLENBQUNBO1FBRzlEQSxLQUFPQSxnQkFBZ0JBLEdBQUdBLENBQUNBLENBQUNBOztRQU0zQkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxJQUFJQSxzQkFBc0JBLENBQUNBLENBQUNBOztRQUVwREEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUN0Q0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQTtRQUNyQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxTQUFTQSxDQUFDQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNoRUEsQ0FBQ0E7SUFFREQscUNBQUFBLFVBQTBCQSxTQUFv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QSxJQUFJQSxhQUFhQSxDQUFDQSxRQUFRQTtZQUN6QkEsYUFBYUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxhQUFhQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtJQUNqRUEsQ0FBQ0E7O0lBS0RWOztNQURHQTsyQ0FDSEEsVUFBNEJBLFNBQW1CQTtRQUU5Q1csSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBOztRQUUvRUEscUVBQXFFQTtRQUNyRUEsSUFBSUEsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNwREEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDbEVBLENBQUNBO0lBQ0ZYLGFBQUNBO0FBQURBLENBQUNBLEVBMUhtQixlQUFlLEVBMEhsQzs7QUFFRCxzQkFBZSxDQUFBIiwiZmlsZSI6ImNvbnRhaW5lcnMvU2NlbmUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlzcGxheU9iamVjdENvbnRhaW5lclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcbmltcG9ydCBOb2RlQmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3BhcnRpdGlvbi9Ob2RlQmFzZVwiKTtcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcGFydGl0aW9uL1BhcnRpdGlvblwiKTtcbmltcG9ydCBJQ29sbGVjdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbmltcG9ydCBTY2VuZUV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvU2NlbmVFdmVudFwiKTtcblxuY2xhc3MgU2NlbmUgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcbntcblx0cHJpdmF0ZSBfZXhwYW5kZWRQYXJ0aXRpb25zOkFycmF5PFBhcnRpdGlvbj4gPSBuZXcgQXJyYXk8UGFydGl0aW9uPigpO1xuXHRwcml2YXRlIF9wYXJ0aXRpb25zOkFycmF5PFBhcnRpdGlvbj4gPSBuZXcgQXJyYXk8UGFydGl0aW9uPigpO1xuXG5cdHB1YmxpYyBfaVNjZW5lR3JhcGhSb290OkRpc3BsYXlPYmplY3RDb250YWluZXI7XG5cdHB1YmxpYyBfaUNvbGxlY3Rpb25NYXJrID0gMDtcblxuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5faVNjZW5lR3JhcGhSb290ID0gbmV3IERpc3BsYXlPYmplY3RDb250YWluZXIoKTtcblxuXHRcdHRoaXMuX2lTY2VuZUdyYXBoUm9vdC5faVNldFNjZW5lKHRoaXMpO1xuXHRcdHRoaXMuX2lTY2VuZUdyYXBoUm9vdC5faUlzUm9vdCA9IHRydWU7XG5cdFx0dGhpcy5faVNjZW5lR3JhcGhSb290LnBhcnRpdGlvbiA9IG5ldyBQYXJ0aXRpb24obmV3IE5vZGVCYXNlKCkpO1xuXHR9XG5cblx0cHVibGljIHRyYXZlcnNlUGFydGl0aW9ucyh0cmF2ZXJzZXI6SUNvbGxlY3Rvcilcblx0e1xuXHRcdHZhciBpOm51bWJlciA9IDA7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wYXJ0aXRpb25zLmxlbmd0aDtcblxuXHRcdHRyYXZlcnNlci5zY2VuZSA9IHRoaXM7XG5cblx0XHR3aGlsZSAoaSA8IGxlbikge1xuXHRcdFx0dGhpcy5faUNvbGxlY3Rpb25NYXJrKys7XG5cdFx0XHR0aGlzLl9wYXJ0aXRpb25zW2krK10udHJhdmVyc2UodHJhdmVyc2VyKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHBhcnRpdGlvbigpOlBhcnRpdGlvblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2lTY2VuZUdyYXBoUm9vdC5wYXJ0aXRpb247XG5cdH1cblxuXHRwdWJsaWMgc2V0IHBhcnRpdGlvbih2YWx1ZTpQYXJ0aXRpb24pXG5cdHtcblx0XHR0aGlzLl9pU2NlbmVHcmFwaFJvb3QucGFydGl0aW9uID0gdmFsdWU7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFNjZW5lRXZlbnQoU2NlbmVFdmVudC5QQVJUSVRJT05fQ0hBTkdFRCwgdGhpcy5faVNjZW5lR3JhcGhSb290KSk7XG5cdH1cblxuXHRwdWJsaWMgY29udGFpbnMoY2hpbGQ6RGlzcGxheU9iamVjdCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2lTY2VuZUdyYXBoUm9vdC5jb250YWlucyhjaGlsZCk7XG5cdH1cblxuXHRwdWJsaWMgYWRkQ2hpbGQoY2hpbGQ6RGlzcGxheU9iamVjdCk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2lTY2VuZUdyYXBoUm9vdC5hZGRDaGlsZChjaGlsZCk7XG5cdH1cblxuXHRwdWJsaWMgcmVtb3ZlQ2hpbGQoY2hpbGQ6RGlzcGxheU9iamVjdClcblx0e1xuXHRcdHRoaXMuX2lTY2VuZUdyYXBoUm9vdC5yZW1vdmVDaGlsZChjaGlsZCk7XG5cdH1cblxuXHRwdWJsaWMgcmVtb3ZlQ2hpbGRBdChpbmRleDpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9pU2NlbmVHcmFwaFJvb3QucmVtb3ZlQ2hpbGRBdChpbmRleCk7XG5cdH1cblxuXG5cdHB1YmxpYyBnZXRDaGlsZEF0KGluZGV4Om51bWJlcik6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2lTY2VuZUdyYXBoUm9vdC5nZXRDaGlsZEF0KGluZGV4KTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgbnVtQ2hpbGRyZW4oKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9pU2NlbmVHcmFwaFJvb3QubnVtQ2hpbGRyZW47XG5cdH1cblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgaVJlZ2lzdGVyRW50aXR5KGRpc3BsYXlPYmplY3Q6RGlzcGxheU9iamVjdClcblx0e1xuXHRcdGlmIChkaXNwbGF5T2JqZWN0LnBhcnRpdGlvbilcblx0XHRcdHRoaXMuaVJlZ2lzdGVyUGFydGl0aW9uKGRpc3BsYXlPYmplY3QucGFydGl0aW9uKTtcblxuXHRcdGlmIChkaXNwbGF5T2JqZWN0LmlzRW50aXR5KVxuXHRcdFx0ZGlzcGxheU9iamVjdC5faUFzc2lnbmVkUGFydGl0aW9uLmlNYXJrRm9yVXBkYXRlKGRpc3BsYXlPYmplY3QpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGlSZWdpc3RlclBhcnRpdGlvbihwYXJ0aXRpb246UGFydGl0aW9uKVxuXHR7XG5cdFx0dGhpcy5fZXhwYW5kZWRQYXJ0aXRpb25zLnB1c2gocGFydGl0aW9uKTtcblxuXHRcdC8vZW5zdXJlIGR1cGxpY2F0ZXMgYXJlIG5vdCBmb3VuZCBpbiBwYXJ0aXRpb25zIGFycmF5XG5cdFx0aWYgKHRoaXMuX3BhcnRpdGlvbnMuaW5kZXhPZihwYXJ0aXRpb24pID09IC0xKVxuXHRcdFx0dGhpcy5fcGFydGl0aW9ucy5wdXNoKHBhcnRpdGlvbik7XG5cdH1cblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgaVVucmVnaXN0ZXJFbnRpdHkoZGlzcGxheU9iamVjdDpEaXNwbGF5T2JqZWN0KVxuXHR7XG5cdFx0aWYgKGRpc3BsYXlPYmplY3QucGFydGl0aW9uKVxuXHRcdFx0dGhpcy5pVW5yZWdpc3RlclBhcnRpdGlvbihkaXNwbGF5T2JqZWN0LnBhcnRpdGlvbik7XG5cblx0XHRpZiAoZGlzcGxheU9iamVjdC5pc0VudGl0eSlcblx0XHRcdGRpc3BsYXlPYmplY3QuX2lBc3NpZ25lZFBhcnRpdGlvbi5pUmVtb3ZlRW50aXR5KGRpc3BsYXlPYmplY3QpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGlVbnJlZ2lzdGVyUGFydGl0aW9uKHBhcnRpdGlvbjpQYXJ0aXRpb24pXG5cdHtcblx0XHR0aGlzLl9leHBhbmRlZFBhcnRpdGlvbnMuc3BsaWNlKHRoaXMuX2V4cGFuZGVkUGFydGl0aW9ucy5pbmRleE9mKHBhcnRpdGlvbiksIDEpO1xuXG5cdFx0Ly9pZiBubyBtb3JlIHBhcnRpdGlvbiByZWZlcmVuY2VzIGZvdW5kLCByZW1vdmUgZnJvbSBwYXJ0aXRpb25zIGFycmF5XG5cdFx0aWYgKHRoaXMuX2V4cGFuZGVkUGFydGl0aW9ucy5pbmRleE9mKHBhcnRpdGlvbikgPT0gLTEpXG5cdFx0XHR0aGlzLl9wYXJ0aXRpb25zLnNwbGljZSh0aGlzLl9wYXJ0aXRpb25zLmluZGV4T2YocGFydGl0aW9uKSwgMSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gU2NlbmU7Il19