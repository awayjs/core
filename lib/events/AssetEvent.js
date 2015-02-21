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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvQXNzZXRFdmVudC50cyJdLCJuYW1lcyI6WyJBc3NldEV2ZW50IiwiQXNzZXRFdmVudC5jb25zdHJ1Y3RvciIsIkFzc2V0RXZlbnQuYXNzZXQiLCJBc3NldEV2ZW50LmFzc2V0UHJldk5hbWUiLCJBc3NldEV2ZW50LmNsb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBRTNELEFBR0E7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFjQTtJQXlCN0JBOztPQUVHQTtJQUNIQSxTQTVCS0EsVUFBVUEsQ0E0QkhBLElBQVdBLEVBQUVBLEtBQW1CQSxFQUFFQSxRQUFzQkE7UUFBM0NDLHFCQUFtQkEsR0FBbkJBLFlBQW1CQTtRQUFFQSx3QkFBc0JBLEdBQXRCQSxlQUFzQkE7UUFFbkVBLGtCQUFNQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUVaQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUNwQkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsUUFBUUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDckVBLENBQUNBO0lBS0RELHNCQUFXQSw2QkFBS0E7UUFIaEJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7OztPQUFBRjtJQUtEQSxzQkFBV0EscUNBQWFBO1FBSHhCQTs7V0FFR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDdkJBLENBQUNBOzs7T0FBQUg7SUFFREE7O09BRUdBO0lBQ0lBLDBCQUFLQSxHQUFaQTtRQUVDSSxNQUFNQSxDQUFTQSxJQUFJQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtJQUMxRUEsQ0FBQ0E7SUF4RERKOztPQUVHQTtJQUNXQSx5QkFBY0EsR0FBVUEsZUFBZUEsQ0FBQ0E7SUFFdERBOztPQUVHQTtJQUNXQSx1QkFBWUEsR0FBVUEsYUFBYUEsQ0FBQ0E7SUFFbERBOztPQUVHQTtJQUNXQSxrQ0FBdUJBLEdBQVVBLHVCQUF1QkEsQ0FBQ0E7SUFFdkVBOztPQUVHQTtJQUNXQSw2QkFBa0JBLEdBQVVBLGtCQUFrQkEsQ0FBQ0E7SUF1QzlEQSxpQkFBQ0E7QUFBREEsQ0EzREEsQUEyRENBLEVBM0R3QixLQUFLLEVBMkQ3QjtBQUVELEFBQW9CLGlCQUFYLFVBQVUsQ0FBQyIsImZpbGUiOiJldmVudHMvQXNzZXRFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuXG4vKipcbiAqIEBjbGFzcyBhd2F5LmV2ZW50cy5Bc3NldEV2ZW50XG4gKi9cbmNsYXNzIEFzc2V0RXZlbnQgZXh0ZW5kcyBFdmVudFxue1xuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgQVNTRVRfQ09NUExFVEU6c3RyaW5nID0gXCJhc3NldENvbXBsZXRlXCI7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIEFTU0VUX1JFTkFNRTpzdHJpbmcgPSAnYXNzZXRSZW5hbWUnO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBBU1NFVF9DT05GTElDVF9SRVNPTFZFRDpzdHJpbmcgPSAnYXNzZXRDb25mbGljdFJlc29sdmVkJztcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgVEVYVFVSRV9TSVpFX0VSUk9SOnN0cmluZyA9ICd0ZXh0dXJlU2l6ZUVycm9yJztcblxuXHRwcml2YXRlIF9hc3NldDpJQXNzZXQ7XG5cdHByaXZhdGUgX3ByZXZOYW1lOnN0cmluZztcblxuXHQvKipcblx0ICpcblx0ICovXG5cdGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nLCBhc3NldDpJQXNzZXQgPSBudWxsLCBwcmV2TmFtZTpzdHJpbmcgPSBudWxsKVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cblx0XHR0aGlzLl9hc3NldCA9IGFzc2V0O1xuXHRcdHRoaXMuX3ByZXZOYW1lID0gcHJldk5hbWUgfHwgKHRoaXMuX2Fzc2V0PyB0aGlzLl9hc3NldC5uYW1lIDogbnVsbCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXQoKTpJQXNzZXRcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hc3NldDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhc3NldFByZXZOYW1lKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcHJldk5hbWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOkV2ZW50XG5cdHtcblx0XHRyZXR1cm4gPEV2ZW50PiBuZXcgQXNzZXRFdmVudCh0aGlzLnR5cGUsIHRoaXMuYXNzZXQsIHRoaXMuYXNzZXRQcmV2TmFtZSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gQXNzZXRFdmVudDsiXX0=