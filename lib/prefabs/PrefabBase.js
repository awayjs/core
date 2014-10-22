var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NamedAssetBase = require("awayjs-core/lib/core/library/NamedAssetBase");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");

/**
* PrefabBase is an abstract base class for prefabs, which are prebuilt display objects that allow easy cloning and updating
*/
var PrefabBase = (function (_super) {
    __extends(PrefabBase, _super);
    //		public _pBatchObjects:Array<BatchObject> = new Array<BatchObject>();
    /**
    * Creates a new PrefabBase object.
    */
    function PrefabBase() {
        _super.call(this);
        this._pObjects = new Array();
    }
    /**
    * Returns a display object generated from this prefab
    */
    PrefabBase.prototype.getNewObject = function () {
        var object = this._pCreateObject();

        this._pObjects.push(object);

        return object;
    };

    //		public getNewBatchObject():BatchObject
    //		{
    //			var object:BatchObject = this._pCreateBatchObject();
    //
    //			this._pBatchObjects.push(object);
    //
    //			return object;
    //		}
    PrefabBase.prototype._pCreateObject = function () {
        throw new AbstractMethodError();
    };

    PrefabBase.prototype._iValidate = function () {
        // To be overridden when necessary
    };
    return PrefabBase;
})(NamedAssetBase);

module.exports = PrefabBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZWZhYnMvUHJlZmFiQmFzZS50cyJdLCJuYW1lcyI6WyJQcmVmYWJCYXNlIiwiUHJlZmFiQmFzZS5jb25zdHJ1Y3RvciIsIlByZWZhYkJhc2UuZ2V0TmV3T2JqZWN0IiwiUHJlZmFiQmFzZS5fcENyZWF0ZU9iamVjdCIsIlByZWZhYkJhc2UuX2lWYWxpZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkVBQ2lGO0FBQ2pGLCtFQUFvRjs7QUFFcEY7O0VBRUc7QUFDSDtJQUF5QkEsNkJBQWNBO0lBU3RDQSx3RUFMdUVBO0lBRXZFQTs7TUFFR0E7SUFDSEE7UUFFQ0MsV0FBTUEsS0FBQUEsQ0FBQ0E7UUFUUkEsS0FBT0EsU0FBU0EsR0FBd0JBLElBQUlBLEtBQUtBLENBQWdCQSxDQUFDQSxDQUFDQTtJQVVuRUEsQ0FBQ0E7SUFLREQ7O01BREdBO3dDQUNIQTtRQUVDRSxJQUFJQSxNQUFNQSxHQUFpQkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0E7O1FBRWhEQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTs7UUFFM0JBLE9BQU9BLE1BQU1BO0lBQ2RBLENBQUNBOztJQVdERiwwQ0FUeUNBO0lBQzFDQSxLQUFLQTtJQUNMQSx5REFBeURBO0lBQ3pEQSxFQUFFQTtJQUNGQSxzQ0FBc0NBO0lBQ3RDQSxFQUFFQTtJQUNGQSxtQkFBbUJBO0lBQ25CQSxLQUFLQTswQ0FFSkE7UUFFQ0csTUFBTUEsSUFBSUEsbUJBQW1CQSxDQUFDQSxDQUFDQTtJQUNoQ0EsQ0FBQ0E7O0lBRURILGtDQUFBQTtRQUVDSSxrQ0FBa0NBO0lBQ25DQSxDQUFDQTtJQUNGSixrQkFBQ0E7QUFBREEsQ0FBQ0EsRUE1Q3dCLGNBQWMsRUE0Q3RDOztBQUVELDJCQUFvQixDQUFBIiwiZmlsZSI6InByZWZhYnMvUHJlZmFiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcblxuLyoqXG4gKiBQcmVmYWJCYXNlIGlzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIHByZWZhYnMsIHdoaWNoIGFyZSBwcmVidWlsdCBkaXNwbGF5IG9iamVjdHMgdGhhdCBhbGxvdyBlYXN5IGNsb25pbmcgYW5kIHVwZGF0aW5nXG4gKi9cbmNsYXNzIFByZWZhYkJhc2UgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZVxue1xuXHRwdWJsaWMgX3BPYmplY3RzOkFycmF5PERpc3BsYXlPYmplY3Q+ID0gbmV3IEFycmF5PERpc3BsYXlPYmplY3Q+KCk7XG5cbi8vXHRcdHB1YmxpYyBfcEJhdGNoT2JqZWN0czpBcnJheTxCYXRjaE9iamVjdD4gPSBuZXcgQXJyYXk8QmF0Y2hPYmplY3Q+KCk7XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgUHJlZmFiQmFzZSBvYmplY3QuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBkaXNwbGF5IG9iamVjdCBnZW5lcmF0ZWQgZnJvbSB0aGlzIHByZWZhYlxuXHQgKi9cblx0cHVibGljIGdldE5ld09iamVjdCgpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHZhciBvYmplY3Q6RGlzcGxheU9iamVjdCA9IHRoaXMuX3BDcmVhdGVPYmplY3QoKTtcblxuXHRcdHRoaXMuX3BPYmplY3RzLnB1c2gob2JqZWN0KTtcblxuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuLy9cdFx0cHVibGljIGdldE5ld0JhdGNoT2JqZWN0KCk6QmF0Y2hPYmplY3Rcbi8vXHRcdHtcbi8vXHRcdFx0dmFyIG9iamVjdDpCYXRjaE9iamVjdCA9IHRoaXMuX3BDcmVhdGVCYXRjaE9iamVjdCgpO1xuLy9cbi8vXHRcdFx0dGhpcy5fcEJhdGNoT2JqZWN0cy5wdXNoKG9iamVjdCk7XG4vL1xuLy9cdFx0XHRyZXR1cm4gb2JqZWN0O1xuLy9cdFx0fVxuXG5cdHB1YmxpYyBfcENyZWF0ZU9iamVjdCgpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgX2lWYWxpZGF0ZSgpXG5cdHtcblx0XHQvLyBUbyBiZSBvdmVycmlkZGVuIHdoZW4gbmVjZXNzYXJ5XG5cdH1cbn1cblxuZXhwb3J0ID0gUHJlZmFiQmFzZTsiXX0=