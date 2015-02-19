var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
/**
 * @class away.events.AssetEvent
 */
var AssetEvent = (function (_super) {
    __extends(AssetEvent, _super);
    /**
     *
     */
    function AssetEvent(type, asset, prevName) {
        if (asset === void 0) { asset = null; }
        if (prevName === void 0) { prevName = null; }
        _super.call(this, type);
        this._asset = asset;
        this._prevName = prevName || (this._asset ? this._asset.name : null);
    }
    Object.defineProperty(AssetEvent.prototype, "asset", {
        /**
         *
         */
        get: function () {
            return this._asset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetEvent.prototype, "assetPrevName", {
        /**
         *
         */
        get: function () {
            return this._prevName;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    AssetEvent.prototype.clone = function () {
        return new AssetEvent(this.type, this.asset, this.assetPrevName);
    };
    /**
     *
     */
    AssetEvent.ASSET_COMPLETE = "assetComplete";
    /**
     *
     */
    AssetEvent.ASSET_RENAME = 'assetRename';
    /**
     *
     */
    AssetEvent.ASSET_CONFLICT_RESOLVED = 'assetConflictResolved';
    /**
     *
     */
    AssetEvent.TEXTURE_SIZE_ERROR = 'textureSizeError';
    return AssetEvent;
})(Event);
module.exports = AssetEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvQXNzZXRFdmVudC50cyJdLCJuYW1lcyI6WyJBc3NldEV2ZW50IiwiQXNzZXRFdmVudC5jb25zdHJ1Y3RvciIsIkFzc2V0RXZlbnQuYXNzZXQiLCJBc3NldEV2ZW50LmFzc2V0UHJldk5hbWUiLCJBc3NldEV2ZW50LmNsb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBRTNELEFBR0E7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFjQTtJQXlCN0JBOztPQUVHQTtJQUNIQSxTQTVCS0EsVUFBVUEsQ0E0QkhBLElBQVdBLEVBQUVBLEtBQW1CQSxFQUFFQSxRQUFzQkE7UUFBM0NDLHFCQUFtQkEsR0FBbkJBLFlBQW1CQTtRQUFFQSx3QkFBc0JBLEdBQXRCQSxlQUFzQkE7UUFFbkVBLGtCQUFNQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUVaQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUNwQkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsUUFBUUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDckVBLENBQUNBO0lBS0RELHNCQUFXQSw2QkFBS0E7UUFIaEJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7OztPQUFBRjtJQUtEQSxzQkFBV0EscUNBQWFBO1FBSHhCQTs7V0FFR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDdkJBLENBQUNBOzs7T0FBQUg7SUFFREE7O09BRUdBO0lBQ0lBLDBCQUFLQSxHQUFaQTtRQUVDSSxNQUFNQSxDQUFTQSxJQUFJQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtJQUMxRUEsQ0FBQ0E7SUF4RERKOztPQUVHQTtJQUNXQSx5QkFBY0EsR0FBVUEsZUFBZUEsQ0FBQ0E7SUFFdERBOztPQUVHQTtJQUNXQSx1QkFBWUEsR0FBVUEsYUFBYUEsQ0FBQ0E7SUFFbERBOztPQUVHQTtJQUNXQSxrQ0FBdUJBLEdBQVVBLHVCQUF1QkEsQ0FBQ0E7SUFFdkVBOztPQUVHQTtJQUNXQSw2QkFBa0JBLEdBQVVBLGtCQUFrQkEsQ0FBQ0E7SUF1QzlEQSxpQkFBQ0E7QUFBREEsQ0EzREEsQUEyRENBLEVBM0R3QixLQUFLLEVBMkQ3QjtBQUVELEFBQW9CLGlCQUFYLFVBQVUsQ0FBQyIsImZpbGUiOiJldmVudHMvQXNzZXRFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcclxuaW1wb3J0IEV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnRcIik7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGF3YXkuZXZlbnRzLkFzc2V0RXZlbnRcclxuICovXHJcbmNsYXNzIEFzc2V0RXZlbnQgZXh0ZW5kcyBFdmVudFxyXG57XHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIEFTU0VUX0NPTVBMRVRFOnN0cmluZyA9IFwiYXNzZXRDb21wbGV0ZVwiO1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgQVNTRVRfUkVOQU1FOnN0cmluZyA9ICdhc3NldFJlbmFtZSc7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBBU1NFVF9DT05GTElDVF9SRVNPTFZFRDpzdHJpbmcgPSAnYXNzZXRDb25mbGljdFJlc29sdmVkJztcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIFRFWFRVUkVfU0laRV9FUlJPUjpzdHJpbmcgPSAndGV4dHVyZVNpemVFcnJvcic7XHJcblxyXG5cdHByaXZhdGUgX2Fzc2V0OklBc3NldDtcclxuXHRwcml2YXRlIF9wcmV2TmFtZTpzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcsIGFzc2V0OklBc3NldCA9IG51bGwsIHByZXZOYW1lOnN0cmluZyA9IG51bGwpXHJcblx0e1xyXG5cdFx0c3VwZXIodHlwZSk7XHJcblxyXG5cdFx0dGhpcy5fYXNzZXQgPSBhc3NldDtcclxuXHRcdHRoaXMuX3ByZXZOYW1lID0gcHJldk5hbWUgfHwgKHRoaXMuX2Fzc2V0PyB0aGlzLl9hc3NldC5uYW1lIDogbnVsbCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYXNzZXQoKTpJQXNzZXRcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYXNzZXQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYXNzZXRQcmV2TmFtZSgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wcmV2TmFtZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGNsb25lKCk6RXZlbnRcclxuXHR7XHJcblx0XHRyZXR1cm4gPEV2ZW50PiBuZXcgQXNzZXRFdmVudCh0aGlzLnR5cGUsIHRoaXMuYXNzZXQsIHRoaXMuYXNzZXRQcmV2TmFtZSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBBc3NldEV2ZW50OyJdfQ==