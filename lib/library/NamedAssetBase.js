var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var AssetEvent = require("awayjs-core/lib/events/AssetEvent");
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var NamedAssetBase = (function (_super) {
    __extends(NamedAssetBase, _super);
    function NamedAssetBase(name) {
        if (name === void 0) { name = null; }
        _super.call(this);
        this._id = NamedAssetBase.ID_COUNT++;
        if (name == null)
            name = 'null';
        this._name = name;
        this._originalName = name;
        this.updateFullPath();
    }
    Object.defineProperty(NamedAssetBase.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            throw new AbstractMethodError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NamedAssetBase.prototype, "originalName", {
        /**
         * The original name used for this asset in the resource (e.g. file) in which
         * it was found. This may not be the same as <code>name</code>, which may
         * have changed due to of a name conflict.
         */
        get: function () {
            return this._originalName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NamedAssetBase.prototype, "id", {
        /**
         * A unique id for the asset, used to identify assets in an associative array
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NamedAssetBase.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (val) {
            var prev;
            prev = this._name;
            this._name = val;
            if (this._name == null)
                this._name = 'null';
            this.updateFullPath();
            //if (hasEventListener(AssetEvent.ASSET_RENAME))
            this.dispatchEvent(new AssetEvent(AssetEvent.ASSET_RENAME, this, prev));
        },
        enumerable: true,
        configurable: true
    });
    NamedAssetBase.prototype.dispose = function () {
        throw new AbstractMethodError();
    };
    Object.defineProperty(NamedAssetBase.prototype, "assetNamespace", {
        get: function () {
            return this._namespace;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NamedAssetBase.prototype, "assetFullPath", {
        get: function () {
            return this._full_path;
        },
        enumerable: true,
        configurable: true
    });
    NamedAssetBase.prototype.assetPathEquals = function (name, ns) {
        return (this._name == name && (!ns || this._namespace == ns));
    };
    NamedAssetBase.prototype.resetAssetPath = function (name, ns, overrideOriginal) {
        if (ns === void 0) { ns = null; }
        if (overrideOriginal === void 0) { overrideOriginal = true; }
        this._name = name ? name : 'null';
        this._namespace = ns ? ns : NamedAssetBase.DEFAULT_NAMESPACE;
        if (overrideOriginal)
            this._originalName = this._name;
        this.updateFullPath();
    };
    NamedAssetBase.prototype.updateFullPath = function () {
        this._full_path = [this._namespace, this._name];
    };
    NamedAssetBase.ID_COUNT = 0;
    NamedAssetBase.DEFAULT_NAMESPACE = 'default';
    return NamedAssetBase;
})(EventDispatcher);
module.exports = NamedAssetBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L05hbWVkQXNzZXRCYXNlLnRzIl0sIm5hbWVzIjpbIk5hbWVkQXNzZXRCYXNlIiwiTmFtZWRBc3NldEJhc2UuY29uc3RydWN0b3IiLCJOYW1lZEFzc2V0QmFzZS5hc3NldFR5cGUiLCJOYW1lZEFzc2V0QmFzZS5vcmlnaW5hbE5hbWUiLCJOYW1lZEFzc2V0QmFzZS5pZCIsIk5hbWVkQXNzZXRCYXNlLm5hbWUiLCJOYW1lZEFzc2V0QmFzZS5kaXNwb3NlIiwiTmFtZWRBc3NldEJhc2UuYXNzZXROYW1lc3BhY2UiLCJOYW1lZEFzc2V0QmFzZS5hc3NldEZ1bGxQYXRoIiwiTmFtZWRBc3NldEJhc2UuYXNzZXRQYXRoRXF1YWxzIiwiTmFtZWRBc3NldEJhc2UucmVzZXRBc3NldFBhdGgiLCJOYW1lZEFzc2V0QmFzZS51cGRhdGVGdWxsUGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxtQkFBbUIsV0FBWSw0Q0FBNEMsQ0FBQyxDQUFDO0FBQ3BGLElBQU8sVUFBVSxXQUFjLG1DQUFtQyxDQUFDLENBQUM7QUFDcEUsSUFBTyxlQUFlLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQUU3RSxJQUFNLGNBQWM7SUFBU0EsVUFBdkJBLGNBQWNBLFVBQXdCQTtJQVkzQ0EsU0FaS0EsY0FBY0EsQ0FZUEEsSUFBa0JBO1FBQWxCQyxvQkFBa0JBLEdBQWxCQSxXQUFrQkE7UUFFN0JBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxjQUFjQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtRQUVyQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0E7WUFDaEJBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBO1FBRWZBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO1FBQ2xCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUUxQkEsSUFB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LENBQUVBLENBQUNBO0lBQ25EQSxDQUFDQTtJQTVHYVgsdUJBQVFBLEdBQVVBLENBQUNBLENBQUNBO0lBUXBCQSxnQ0FBaUJBLEdBQVVBLFNBQVNBLENBQUNBO0lBcUdwREEscUJBQUNBO0FBQURBLENBL0dBLEFBK0dDQSxFQS9HNEIsZUFBZSxFQStHM0M7QUFFRCxBQUF3QixpQkFBZixjQUFjLENBQUMiLCJmaWxlIjoibGlicmFyeS9OYW1lZEFzc2V0QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcclxuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xyXG5pbXBvcnQgQXNzZXRFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9Bc3NldEV2ZW50XCIpO1xyXG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIik7XHJcblxyXG5jbGFzcyBOYW1lZEFzc2V0QmFzZSBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxyXG57XHJcblx0cHVibGljIHN0YXRpYyBJRF9DT1VOVDpudW1iZXIgPSAwO1xyXG5cclxuXHRwcml2YXRlIF9vcmlnaW5hbE5hbWU6c3RyaW5nO1xyXG5cdHByaXZhdGUgX25hbWVzcGFjZTpzdHJpbmc7XHJcblx0cHJpdmF0ZSBfbmFtZTpzdHJpbmc7XHJcblx0cHJpdmF0ZSBfaWQ6bnVtYmVyO1xyXG5cdHByaXZhdGUgX2Z1bGxfcGF0aDpBcnJheTxzdHJpbmc+O1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIERFRkFVTFRfTkFNRVNQQUNFOnN0cmluZyA9ICdkZWZhdWx0JztcclxuXHJcblx0Y29uc3RydWN0b3IobmFtZTpzdHJpbmcgPSBudWxsKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5faWQgPSBOYW1lZEFzc2V0QmFzZS5JRF9DT1VOVCsrO1xyXG5cclxuXHRcdGlmIChuYW1lID09IG51bGwpXHJcblx0XHRcdG5hbWUgPSAnbnVsbCc7XHJcblxyXG5cdFx0dGhpcy5fbmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLl9vcmlnaW5hbE5hbWUgPSBuYW1lO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlRnVsbFBhdGgoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG9yaWdpbmFsIG5hbWUgdXNlZCBmb3IgdGhpcyBhc3NldCBpbiB0aGUgcmVzb3VyY2UgKGUuZy4gZmlsZSkgaW4gd2hpY2hcclxuXHQgKiBpdCB3YXMgZm91bmQuIFRoaXMgbWF5IG5vdCBiZSB0aGUgc2FtZSBhcyA8Y29kZT5uYW1lPC9jb2RlPiwgd2hpY2ggbWF5XHJcblx0ICogaGF2ZSBjaGFuZ2VkIGR1ZSB0byBvZiBhIG5hbWUgY29uZmxpY3QuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBvcmlnaW5hbE5hbWUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fb3JpZ2luYWxOYW1lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQSB1bmlxdWUgaWQgZm9yIHRoZSBhc3NldCwgdXNlZCB0byBpZGVudGlmeSBhc3NldHMgaW4gYW4gYXNzb2NpYXRpdmUgYXJyYXlcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGlkKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lkO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBuYW1lKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX25hbWU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG5hbWUodmFsOnN0cmluZylcclxuXHR7XHJcblx0XHR2YXIgcHJldjpzdHJpbmc7XHJcblxyXG5cdFx0cHJldiA9IHRoaXMuX25hbWU7XHJcblx0XHR0aGlzLl9uYW1lID0gdmFsO1xyXG5cclxuXHRcdGlmICh0aGlzLl9uYW1lID09IG51bGwpXHJcblx0XHRcdHRoaXMuX25hbWUgPSAnbnVsbCc7XHJcblxyXG5cdFx0dGhpcy51cGRhdGVGdWxsUGF0aCgpO1xyXG5cclxuXHRcdC8vaWYgKGhhc0V2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9SRU5BTUUpKVxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBBc3NldEV2ZW50KEFzc2V0RXZlbnQuQVNTRVRfUkVOQU1FLCA8SUFzc2V0PiB0aGlzLCBwcmV2KSk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IGFzc2V0TmFtZXNwYWNlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX25hbWVzcGFjZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgYXNzZXRGdWxsUGF0aCgpOkFycmF5PHN0cmluZz5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZnVsbF9wYXRoO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGFzc2V0UGF0aEVxdWFscyhuYW1lOnN0cmluZywgbnM6c3RyaW5nKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuICh0aGlzLl9uYW1lID09IG5hbWUgJiYgKCFucyB8fCB0aGlzLl9uYW1lc3BhY2UgPT0gbnMpKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZXNldEFzc2V0UGF0aChuYW1lOnN0cmluZywgbnM6c3RyaW5nID0gbnVsbCwgb3ZlcnJpZGVPcmlnaW5hbDpib29sZWFuID0gdHJ1ZSk6dm9pZFxyXG5cdHtcclxuXHJcblx0XHR0aGlzLl9uYW1lID0gbmFtZT8gbmFtZSA6ICdudWxsJztcclxuXHRcdHRoaXMuX25hbWVzcGFjZSA9IG5zPyBucyA6IE5hbWVkQXNzZXRCYXNlLkRFRkFVTFRfTkFNRVNQQUNFO1xyXG5cclxuXHRcdGlmIChvdmVycmlkZU9yaWdpbmFsKVxyXG5cdFx0XHR0aGlzLl9vcmlnaW5hbE5hbWUgPSB0aGlzLl9uYW1lO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlRnVsbFBhdGgoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdXBkYXRlRnVsbFBhdGgoKTp2b2lkXHJcblx0e1xyXG5cdFx0dGhpcy5fZnVsbF9wYXRoID0gWyB0aGlzLl9uYW1lc3BhY2UsIHRoaXMuX25hbWUgXTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IE5hbWVkQXNzZXRCYXNlOyJdfQ==