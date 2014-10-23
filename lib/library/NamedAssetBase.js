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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L25hbWVkYXNzZXRiYXNlLnRzIl0sIm5hbWVzIjpbIk5hbWVkQXNzZXRCYXNlIiwiTmFtZWRBc3NldEJhc2UuY29uc3RydWN0b3IiLCJOYW1lZEFzc2V0QmFzZS5hc3NldFR5cGUiLCJOYW1lZEFzc2V0QmFzZS5vcmlnaW5hbE5hbWUiLCJOYW1lZEFzc2V0QmFzZS5pZCIsIk5hbWVkQXNzZXRCYXNlLm5hbWUiLCJOYW1lZEFzc2V0QmFzZS5kaXNwb3NlIiwiTmFtZWRBc3NldEJhc2UuYXNzZXROYW1lc3BhY2UiLCJOYW1lZEFzc2V0QmFzZS5hc3NldEZ1bGxQYXRoIiwiTmFtZWRBc3NldEJhc2UuYXNzZXRQYXRoRXF1YWxzIiwiTmFtZWRBc3NldEJhc2UucmVzZXRBc3NldFBhdGgiLCJOYW1lZEFzc2V0QmFzZS51cGRhdGVGdWxsUGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxtQkFBbUIsV0FBWSw0Q0FBNEMsQ0FBQyxDQUFDO0FBQ3BGLElBQU8sVUFBVSxXQUFjLG1DQUFtQyxDQUFDLENBQUM7QUFDcEUsSUFBTyxlQUFlLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQUU3RSxJQUFNLGNBQWM7SUFBU0EsVUFBdkJBLGNBQWNBLFVBQXdCQTtJQVkzQ0EsU0FaS0EsY0FBY0EsQ0FZUEEsSUFBa0JBO1FBQWxCQyxvQkFBa0JBLEdBQWxCQSxXQUFrQkE7UUFFN0JBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxjQUFjQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtRQUVyQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0E7WUFDaEJBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBO1FBRWZBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO1FBQ2xCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUUxQkEsSUFB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LENBQUVBLENBQUNBO0lBQ25EQSxDQUFDQTtJQTVHYVgsdUJBQVFBLEdBQVVBLENBQUNBLENBQUNBO0lBUXBCQSxnQ0FBaUJBLEdBQVVBLFNBQVNBLENBQUNBO0lBcUdwREEscUJBQUNBO0FBQURBLENBL0dBLEFBK0dDQSxFQS9HNEIsZUFBZSxFQStHM0M7QUFFRCxBQUF3QixpQkFBZixjQUFjLENBQUMiLCJmaWxlIjoibGlicmFyeS9OYW1lZEFzc2V0QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcbmltcG9ydCBBc3NldEV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0Fzc2V0RXZlbnRcIik7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIik7XG5cbmNsYXNzIE5hbWVkQXNzZXRCYXNlIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyXG57XG5cdHB1YmxpYyBzdGF0aWMgSURfQ09VTlQ6bnVtYmVyID0gMDtcblxuXHRwcml2YXRlIF9vcmlnaW5hbE5hbWU6c3RyaW5nO1xuXHRwcml2YXRlIF9uYW1lc3BhY2U6c3RyaW5nO1xuXHRwcml2YXRlIF9uYW1lOnN0cmluZztcblx0cHJpdmF0ZSBfaWQ6bnVtYmVyO1xuXHRwcml2YXRlIF9mdWxsX3BhdGg6QXJyYXk8c3RyaW5nPjtcblxuXHRwdWJsaWMgc3RhdGljIERFRkFVTFRfTkFNRVNQQUNFOnN0cmluZyA9ICdkZWZhdWx0JztcblxuXHRjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyA9IG51bGwpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5faWQgPSBOYW1lZEFzc2V0QmFzZS5JRF9DT1VOVCsrO1xuXG5cdFx0aWYgKG5hbWUgPT0gbnVsbClcblx0XHRcdG5hbWUgPSAnbnVsbCc7XG5cblx0XHR0aGlzLl9uYW1lID0gbmFtZTtcblx0XHR0aGlzLl9vcmlnaW5hbE5hbWUgPSBuYW1lO1xuXG5cdFx0dGhpcy51cGRhdGVGdWxsUGF0aCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgb3JpZ2luYWwgbmFtZSB1c2VkIGZvciB0aGlzIGFzc2V0IGluIHRoZSByZXNvdXJjZSAoZS5nLiBmaWxlKSBpbiB3aGljaFxuXHQgKiBpdCB3YXMgZm91bmQuIFRoaXMgbWF5IG5vdCBiZSB0aGUgc2FtZSBhcyA8Y29kZT5uYW1lPC9jb2RlPiwgd2hpY2ggbWF5XG5cdCAqIGhhdmUgY2hhbmdlZCBkdWUgdG8gb2YgYSBuYW1lIGNvbmZsaWN0LlxuXHQgKi9cblx0cHVibGljIGdldCBvcmlnaW5hbE5hbWUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl9vcmlnaW5hbE5hbWU7XG5cdH1cblxuXHQvKipcblx0ICogQSB1bmlxdWUgaWQgZm9yIHRoZSBhc3NldCwgdXNlZCB0byBpZGVudGlmeSBhc3NldHMgaW4gYW4gYXNzb2NpYXRpdmUgYXJyYXlcblx0ICovXG5cdHB1YmxpYyBnZXQgaWQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9pZDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX25hbWU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG5hbWUodmFsOnN0cmluZylcblx0e1xuXHRcdHZhciBwcmV2OnN0cmluZztcblxuXHRcdHByZXYgPSB0aGlzLl9uYW1lO1xuXHRcdHRoaXMuX25hbWUgPSB2YWw7XG5cblx0XHRpZiAodGhpcy5fbmFtZSA9PSBudWxsKVxuXHRcdFx0dGhpcy5fbmFtZSA9ICdudWxsJztcblxuXHRcdHRoaXMudXBkYXRlRnVsbFBhdGgoKTtcblxuXHRcdC8vaWYgKGhhc0V2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9SRU5BTUUpKVxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQXNzZXRFdmVudChBc3NldEV2ZW50LkFTU0VUX1JFTkFNRSwgPElBc3NldD4gdGhpcywgcHJldikpO1xuXG5cdH1cblxuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0cHVibGljIGdldCBhc3NldE5hbWVzcGFjZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX25hbWVzcGFjZTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgYXNzZXRGdWxsUGF0aCgpOkFycmF5PHN0cmluZz5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9mdWxsX3BhdGg7XG5cdH1cblxuXHRwdWJsaWMgYXNzZXRQYXRoRXF1YWxzKG5hbWU6c3RyaW5nLCBuczpzdHJpbmcpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiAodGhpcy5fbmFtZSA9PSBuYW1lICYmICghbnMgfHwgdGhpcy5fbmFtZXNwYWNlID09IG5zKSk7XG5cdH1cblxuXHRwdWJsaWMgcmVzZXRBc3NldFBhdGgobmFtZTpzdHJpbmcsIG5zOnN0cmluZyA9IG51bGwsIG92ZXJyaWRlT3JpZ2luYWw6Ym9vbGVhbiA9IHRydWUpOnZvaWRcblx0e1xuXG5cdFx0dGhpcy5fbmFtZSA9IG5hbWU/IG5hbWUgOiAnbnVsbCc7XG5cdFx0dGhpcy5fbmFtZXNwYWNlID0gbnM/IG5zIDogTmFtZWRBc3NldEJhc2UuREVGQVVMVF9OQU1FU1BBQ0U7XG5cblx0XHRpZiAob3ZlcnJpZGVPcmlnaW5hbClcblx0XHRcdHRoaXMuX29yaWdpbmFsTmFtZSA9IHRoaXMuX25hbWU7XG5cblx0XHR0aGlzLnVwZGF0ZUZ1bGxQYXRoKCk7XG5cdH1cblxuXHRwcml2YXRlIHVwZGF0ZUZ1bGxQYXRoKCk6dm9pZFxuXHR7XG5cdFx0dGhpcy5fZnVsbF9wYXRoID0gWyB0aGlzLl9uYW1lc3BhY2UsIHRoaXMuX25hbWUgXTtcblx0fVxufVxuXG5leHBvcnQgPSBOYW1lZEFzc2V0QmFzZTsiXX0=