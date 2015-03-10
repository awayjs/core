var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var AssetEvent = require("awayjs-core/lib/events/AssetEvent");
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var AssetBase = (function (_super) {
    __extends(AssetBase, _super);
    function AssetBase(name) {
        if (name === void 0) { name = null; }
        _super.call(this);
        this._id = AssetBase.ID_COUNT++;
        if (name == null)
            name = 'null';
        this._name = name;
        this._originalName = name;
        this.updateFullPath();
    }
    Object.defineProperty(AssetBase.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            throw new AbstractMethodError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetBase.prototype, "originalName", {
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
    Object.defineProperty(AssetBase.prototype, "id", {
        /**
         * A unique id for the asset, used to identify assets in an associative array
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetBase.prototype, "name", {
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
    AssetBase.prototype.dispose = function () {
        throw new AbstractMethodError();
    };
    Object.defineProperty(AssetBase.prototype, "assetNamespace", {
        get: function () {
            return this._namespace;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetBase.prototype, "assetFullPath", {
        get: function () {
            return this._full_path;
        },
        enumerable: true,
        configurable: true
    });
    AssetBase.prototype.assetPathEquals = function (name, ns) {
        return (this._name == name && (!ns || this._namespace == ns));
    };
    AssetBase.prototype.isAsset = function (assetClass) {
        return this.assetType == assetClass.assetType;
    };
    AssetBase.prototype.resetAssetPath = function (name, ns, overrideOriginal) {
        if (ns === void 0) { ns = null; }
        if (overrideOriginal === void 0) { overrideOriginal = true; }
        this._name = name ? name : 'null';
        this._namespace = ns ? ns : AssetBase.DEFAULT_NAMESPACE;
        if (overrideOriginal)
            this._originalName = this._name;
        this.updateFullPath();
    };
    AssetBase.prototype.updateFullPath = function () {
        this._full_path = [this._namespace, this._name];
    };
    AssetBase.ID_COUNT = 0;
    AssetBase.DEFAULT_NAMESPACE = 'default';
    return AssetBase;
})(EventDispatcher);
module.exports = AssetBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0QmFzZS50cyJdLCJuYW1lcyI6WyJBc3NldEJhc2UiLCJBc3NldEJhc2UuY29uc3RydWN0b3IiLCJBc3NldEJhc2UuYXNzZXRUeXBlIiwiQXNzZXRCYXNlLm9yaWdpbmFsTmFtZSIsIkFzc2V0QmFzZS5pZCIsIkFzc2V0QmFzZS5uYW1lIiwiQXNzZXRCYXNlLmRpc3Bvc2UiLCJBc3NldEJhc2UuYXNzZXROYW1lc3BhY2UiLCJBc3NldEJhc2UuYXNzZXRGdWxsUGF0aCIsIkFzc2V0QmFzZS5hc3NldFBhdGhFcXVhbHMiLCJBc3NldEJhc2UuaXNBc3NldCIsIkFzc2V0QmFzZS5yZXNldEFzc2V0UGF0aCIsIkFzc2V0QmFzZS51cGRhdGVGdWxsUGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsSUFBTyxtQkFBbUIsV0FBWSw0Q0FBNEMsQ0FBQyxDQUFDO0FBQ3BGLElBQU8sVUFBVSxXQUFjLG1DQUFtQyxDQUFDLENBQUM7QUFDcEUsSUFBTyxlQUFlLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQUU3RSxJQUFNLFNBQVM7SUFBU0EsVUFBbEJBLFNBQVNBLFVBQXdCQTtJQVl0Q0EsU0FaS0EsU0FBU0EsQ0FZRkEsSUFBa0JBO1FBQWxCQyxvQkFBa0JBLEdBQWxCQSxXQUFrQkE7UUFFN0JBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtRQUVoQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0E7WUFDaEJBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBO1FBRWZBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO1FBQ2xCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUUxQkEsSUFBSUEsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7SUFDdkJBLENBQUNBO0lBS0RE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QSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFFQSxDQUFDQTtJQUNuREEsQ0FBQ0E7SUFsSGFaLGtCQUFRQSxHQUFVQSxDQUFDQSxDQUFDQTtJQVFwQkEsMkJBQWlCQSxHQUFVQSxTQUFTQSxDQUFDQTtJQTJHcERBLGdCQUFDQTtBQUFEQSxDQXJIQSxBQXFIQ0EsRUFySHVCLGVBQWUsRUFxSHRDO0FBRUQsQUFBbUIsaUJBQVYsU0FBUyxDQUFDIiwiZmlsZSI6ImxpYnJhcnkvQXNzZXRCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IElBc3NldENsYXNzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRDbGFzc1wiKTtcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcbmltcG9ydCBBc3NldEV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0Fzc2V0RXZlbnRcIik7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIik7XG5cbmNsYXNzIEFzc2V0QmFzZSBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxue1xuXHRwdWJsaWMgc3RhdGljIElEX0NPVU5UOm51bWJlciA9IDA7XG5cblx0cHJpdmF0ZSBfb3JpZ2luYWxOYW1lOnN0cmluZztcblx0cHJpdmF0ZSBfbmFtZXNwYWNlOnN0cmluZztcblx0cHJpdmF0ZSBfbmFtZTpzdHJpbmc7XG5cdHByaXZhdGUgX2lkOm51bWJlcjtcblx0cHJpdmF0ZSBfZnVsbF9wYXRoOkFycmF5PHN0cmluZz47XG5cblx0cHVibGljIHN0YXRpYyBERUZBVUxUX05BTUVTUEFDRTpzdHJpbmcgPSAnZGVmYXVsdCc7XG5cblx0Y29uc3RydWN0b3IobmFtZTpzdHJpbmcgPSBudWxsKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX2lkID0gQXNzZXRCYXNlLklEX0NPVU5UKys7XG5cblx0XHRpZiAobmFtZSA9PSBudWxsKVxuXHRcdFx0bmFtZSA9ICdudWxsJztcblxuXHRcdHRoaXMuX25hbWUgPSBuYW1lO1xuXHRcdHRoaXMuX29yaWdpbmFsTmFtZSA9IG5hbWU7XG5cblx0XHR0aGlzLnVwZGF0ZUZ1bGxQYXRoKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBvcmlnaW5hbCBuYW1lIHVzZWQgZm9yIHRoaXMgYXNzZXQgaW4gdGhlIHJlc291cmNlIChlLmcuIGZpbGUpIGluIHdoaWNoXG5cdCAqIGl0IHdhcyBmb3VuZC4gVGhpcyBtYXkgbm90IGJlIHRoZSBzYW1lIGFzIDxjb2RlPm5hbWU8L2NvZGU+LCB3aGljaCBtYXlcblx0ICogaGF2ZSBjaGFuZ2VkIGR1ZSB0byBvZiBhIG5hbWUgY29uZmxpY3QuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG9yaWdpbmFsTmFtZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX29yaWdpbmFsTmFtZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIGFzc2V0LCB1c2VkIHRvIGlkZW50aWZ5IGFzc2V0cyBpbiBhbiBhc3NvY2lhdGl2ZSBhcnJheVxuXHQgKi9cblx0cHVibGljIGdldCBpZCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2lkO1xuXHR9XG5cblx0cHVibGljIGdldCBuYW1lKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbmFtZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbmFtZSh2YWw6c3RyaW5nKVxuXHR7XG5cdFx0dmFyIHByZXY6c3RyaW5nO1xuXG5cdFx0cHJldiA9IHRoaXMuX25hbWU7XG5cdFx0dGhpcy5fbmFtZSA9IHZhbDtcblxuXHRcdGlmICh0aGlzLl9uYW1lID09IG51bGwpXG5cdFx0XHR0aGlzLl9uYW1lID0gJ251bGwnO1xuXG5cdFx0dGhpcy51cGRhdGVGdWxsUGF0aCgpO1xuXG5cdFx0Ly9pZiAoaGFzRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX1JFTkFNRSkpXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBBc3NldEV2ZW50KEFzc2V0RXZlbnQuQVNTRVRfUkVOQU1FLCA8SUFzc2V0PiB0aGlzLCBwcmV2KSk7XG5cblx0fVxuXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGFzc2V0TmFtZXNwYWNlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbmFtZXNwYWNlO1xuXHR9XG5cblx0cHVibGljIGdldCBhc3NldEZ1bGxQYXRoKCk6QXJyYXk8c3RyaW5nPlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2Z1bGxfcGF0aDtcblx0fVxuXG5cdHB1YmxpYyBhc3NldFBhdGhFcXVhbHMobmFtZTpzdHJpbmcsIG5zOnN0cmluZyk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLl9uYW1lID09IG5hbWUgJiYgKCFucyB8fCB0aGlzLl9uYW1lc3BhY2UgPT0gbnMpKTtcblx0fVxuXG5cblx0cHVibGljIGlzQXNzZXQoYXNzZXRDbGFzczpJQXNzZXRDbGFzcyk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuYXNzZXRUeXBlID09IGFzc2V0Q2xhc3MuYXNzZXRUeXBlO1xuXHR9XG5cblx0cHVibGljIHJlc2V0QXNzZXRQYXRoKG5hbWU6c3RyaW5nLCBuczpzdHJpbmcgPSBudWxsLCBvdmVycmlkZU9yaWdpbmFsOmJvb2xlYW4gPSB0cnVlKTp2b2lkXG5cdHtcblxuXHRcdHRoaXMuX25hbWUgPSBuYW1lPyBuYW1lIDogJ251bGwnO1xuXHRcdHRoaXMuX25hbWVzcGFjZSA9IG5zPyBucyA6IEFzc2V0QmFzZS5ERUZBVUxUX05BTUVTUEFDRTtcblxuXHRcdGlmIChvdmVycmlkZU9yaWdpbmFsKVxuXHRcdFx0dGhpcy5fb3JpZ2luYWxOYW1lID0gdGhpcy5fbmFtZTtcblxuXHRcdHRoaXMudXBkYXRlRnVsbFBhdGgoKTtcblx0fVxuXG5cdHByaXZhdGUgdXBkYXRlRnVsbFBhdGgoKTp2b2lkXG5cdHtcblx0XHR0aGlzLl9mdWxsX3BhdGggPSBbIHRoaXMuX25hbWVzcGFjZSwgdGhpcy5fbmFtZSBdO1xuXHR9XG59XG5cbmV4cG9ydCA9IEFzc2V0QmFzZTsiXX0=