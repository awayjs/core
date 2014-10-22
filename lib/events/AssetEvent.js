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
        if (typeof asset === "undefined") { asset = null; }
        if (typeof prevName === "undefined") { prevName = null; }
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
    AssetEvent.ASSET_COMPLETE = "assetComplete";

    AssetEvent.ASSET_RENAME = 'assetRename';

    AssetEvent.ASSET_CONFLICT_RESOLVED = 'assetConflictResolved';

    AssetEvent.TEXTURE_SIZE_ERROR = 'textureSizeError';
    return AssetEvent;
})(Event);

module.exports = AssetEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9Bc3NldEV2ZW50LnRzIl0sIm5hbWVzIjpbIkFzc2V0RXZlbnQiLCJBc3NldEV2ZW50LmNvbnN0cnVjdG9yIiwiQXNzZXRFdmVudC5jbG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQzJEOztBQUUzRDs7RUFFRztBQUNIO0lBQXlCQSw2QkFBS0E7SUE0QjdCQTs7TUFER0E7SUFDSEEsb0JBQVlBLElBQVdBLEVBQUVBLEtBQW1CQSxFQUFFQSxRQUFzQkE7UUFBM0NDLG9DQUFBQSxLQUFLQSxHQUFVQSxJQUFJQTtBQUFBQSxRQUFFQSx1Q0FBQUEsUUFBUUEsR0FBVUEsSUFBSUE7QUFBQUEsUUFFbkVBLFdBQU1BLE9BQUFBLElBQUlBLENBQUNBOztRQUVYQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQTtRQUNuQkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsUUFBUUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDcEVBLENBQUNBO0lBS0REO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxNQUFNQTtRQUNuQkEsQ0FBQ0E7Ozs7QUFBQUE7SUFLREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFNBQVNBO1FBQ3RCQSxDQUFDQTs7OztBQUFBQTtJQUtEQTs7TUFER0E7aUNBQ0hBO1FBRUNFLE9BQWVBLElBQUlBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBO0lBQ3pFQSxDQUFDQTtJQXJEREYsNEJBQXNDQSxlQUFlQTs7SUFLckRBLDBCQUFvQ0EsYUFBYUE7O0lBS2pEQSxxQ0FBK0NBLHVCQUF1QkE7O0lBS3RFQSxnQ0FBMENBLGtCQUFrQkE7SUF1QzdEQSxrQkFBQ0E7QUFBREEsQ0FBQ0EsRUEzRHdCLEtBQUssRUEyRDdCOztBQUVELDJCQUFvQixDQUFBIiwiZmlsZSI6ImV2ZW50cy9Bc3NldEV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuXG4vKipcbiAqIEBjbGFzcyBhd2F5LmV2ZW50cy5Bc3NldEV2ZW50XG4gKi9cbmNsYXNzIEFzc2V0RXZlbnQgZXh0ZW5kcyBFdmVudFxue1xuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgQVNTRVRfQ09NUExFVEU6c3RyaW5nID0gXCJhc3NldENvbXBsZXRlXCI7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIEFTU0VUX1JFTkFNRTpzdHJpbmcgPSAnYXNzZXRSZW5hbWUnO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBBU1NFVF9DT05GTElDVF9SRVNPTFZFRDpzdHJpbmcgPSAnYXNzZXRDb25mbGljdFJlc29sdmVkJztcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgVEVYVFVSRV9TSVpFX0VSUk9SOnN0cmluZyA9ICd0ZXh0dXJlU2l6ZUVycm9yJztcblxuXHRwcml2YXRlIF9hc3NldDpJQXNzZXQ7XG5cdHByaXZhdGUgX3ByZXZOYW1lOnN0cmluZztcblxuXHQvKipcblx0ICpcblx0ICovXG5cdGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nLCBhc3NldDpJQXNzZXQgPSBudWxsLCBwcmV2TmFtZTpzdHJpbmcgPSBudWxsKVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cblx0XHR0aGlzLl9hc3NldCA9IGFzc2V0O1xuXHRcdHRoaXMuX3ByZXZOYW1lID0gcHJldk5hbWUgfHwgKHRoaXMuX2Fzc2V0PyB0aGlzLl9hc3NldC5uYW1lIDogbnVsbCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXQoKTpJQXNzZXRcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hc3NldDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhc3NldFByZXZOYW1lKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcHJldk5hbWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOkV2ZW50XG5cdHtcblx0XHRyZXR1cm4gPEV2ZW50PiBuZXcgQXNzZXRFdmVudCh0aGlzLnR5cGUsIHRoaXMuYXNzZXQsIHRoaXMuYXNzZXRQcmV2TmFtZSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gQXNzZXRFdmVudDsiXX0=