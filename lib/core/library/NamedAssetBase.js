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
        if (typeof name === "undefined") { name = null; }
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
        if (typeof ns === "undefined") { ns = null; }
        if (typeof overrideOriginal === "undefined") { overrideOriginal = true; }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbGlicmFyeS9OYW1lZEFzc2V0QmFzZS50cyJdLCJuYW1lcyI6WyJOYW1lZEFzc2V0QmFzZSIsIk5hbWVkQXNzZXRCYXNlLmNvbnN0cnVjdG9yIiwiTmFtZWRBc3NldEJhc2UuZGlzcG9zZSIsIk5hbWVkQXNzZXRCYXNlLmFzc2V0UGF0aEVxdWFscyIsIk5hbWVkQXNzZXRCYXNlLnJlc2V0QXNzZXRQYXRoIiwiTmFtZWRBc3NldEJhc2UudXBkYXRlRnVsbFBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLCtFQUNvRjtBQUNwRiw2REFBb0U7QUFDcEUsdUVBQTZFOztBQUU3RTtJQUE2QkEsaUNBQWVBO0lBWTNDQSx3QkFBWUEsSUFBa0JBO1FBQWxCQyxtQ0FBQUEsSUFBSUEsR0FBVUEsSUFBSUE7QUFBQUEsUUFFN0JBLFdBQU1BLEtBQUFBLENBQUNBOztRQUVQQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxjQUFjQSxDQUFDQSxRQUFRQSxFQUFFQTs7UUFFcENBLElBQUlBLElBQUlBLElBQUlBLElBQUlBO1lBQ2ZBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBOztRQUVmQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQTtRQUNqQkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsSUFBSUE7O1FBRXpCQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQTtJQUN0QkEsQ0FBQ0E7SUFLREQ7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE1BQU1BLElBQUlBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7UUFDaENBLENBQUNBOzs7O0FBQUFBO0lBT0RBO1FBQUFBOzs7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGFBQWFBO1FBQzFCQSxDQUFDQTs7OztBQUFBQTtJQUtEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsR0FBR0E7UUFDaEJBLENBQUNBOzs7O0FBQUFBO0lBRURBO1FBQUFBLEtBQUFBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLEtBQUtBO1FBQ2xCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFnQkEsR0FBVUE7WUFFekJBLElBQUlBLElBQUlBOztZQUVSQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQTtZQUNqQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsR0FBR0E7O1lBRWhCQSxJQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQTtnQkFDckJBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLE1BQU1BLENBQUNBOztZQUVyQkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0E7O1lBRXJCQSxnREFBZ0RBO1lBQ2hEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxVQUFVQSxDQUFDQSxVQUFVQSxDQUFDQSxZQUFZQSxFQUFXQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUVqRkEsQ0FBQ0E7Ozs7QUFqQkFBOztJQW1CREEsbUNBQUFBO1FBRUNFLE1BQU1BLElBQUlBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7SUFDaENBLENBQUNBOztJQUVERjtRQUFBQSxLQUFBQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxVQUFVQTtRQUN2QkEsQ0FBQ0E7Ozs7QUFBQUE7SUFFREE7UUFBQUEsS0FBQUE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsVUFBVUE7UUFDdkJBLENBQUNBOzs7O0FBQUFBO0lBRURBLDJDQUFBQSxVQUF1QkEsSUFBV0EsRUFBRUEsRUFBU0E7UUFFNUNHLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLElBQUlBLEVBQUVBLENBQUNBLENBQUNBO0lBQzlEQSxDQUFDQTs7SUFFREgsMENBQUFBLFVBQXNCQSxJQUFXQSxFQUFFQSxFQUFnQkEsRUFBRUEsZ0JBQStCQTtRQUFqREksaUNBQUFBLEVBQUVBLEdBQVVBLElBQUlBO0FBQUFBLFFBQUVBLCtDQUFBQSxnQkFBZ0JBLEdBQVdBLElBQUlBO0FBQUFBLFFBR25GQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxHQUFFQSxJQUFJQSxHQUFHQSxNQUFNQTtRQUNoQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUEsR0FBRUEsRUFBRUEsR0FBR0EsY0FBY0EsQ0FBQ0EsaUJBQWlCQTs7UUFFM0RBLElBQUlBLGdCQUFnQkE7WUFDbkJBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBOztRQUVqQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0E7SUFDdEJBLENBQUNBOztJQUVESiwwQ0FBQUE7UUFFQ0ssSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBRUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBRUE7SUFDbERBLENBQUNBO0lBNUdETCwwQkFBZ0NBLENBQUNBOztJQVFqQ0EsbUNBQXlDQSxTQUFTQTtJQXFHbkRBLHNCQUFDQTtBQUFEQSxDQUFDQSxFQS9HNEIsZUFBZSxFQStHM0M7O0FBRUQsK0JBQXdCLENBQUEiLCJmaWxlIjoiY29yZS9saWJyYXJ5L05hbWVkQXNzZXRCYXNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcbmltcG9ydCBBc3NldEV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0Fzc2V0RXZlbnRcIik7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIik7XG5cbmNsYXNzIE5hbWVkQXNzZXRCYXNlIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyXG57XG5cdHB1YmxpYyBzdGF0aWMgSURfQ09VTlQ6bnVtYmVyID0gMDtcblxuXHRwcml2YXRlIF9vcmlnaW5hbE5hbWU6c3RyaW5nO1xuXHRwcml2YXRlIF9uYW1lc3BhY2U6c3RyaW5nO1xuXHRwcml2YXRlIF9uYW1lOnN0cmluZztcblx0cHJpdmF0ZSBfaWQ6bnVtYmVyO1xuXHRwcml2YXRlIF9mdWxsX3BhdGg6QXJyYXk8c3RyaW5nPjtcblxuXHRwdWJsaWMgc3RhdGljIERFRkFVTFRfTkFNRVNQQUNFOnN0cmluZyA9ICdkZWZhdWx0JztcblxuXHRjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyA9IG51bGwpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5faWQgPSBOYW1lZEFzc2V0QmFzZS5JRF9DT1VOVCsrO1xuXG5cdFx0aWYgKG5hbWUgPT0gbnVsbClcblx0XHRcdG5hbWUgPSAnbnVsbCc7XG5cblx0XHR0aGlzLl9uYW1lID0gbmFtZTtcblx0XHR0aGlzLl9vcmlnaW5hbE5hbWUgPSBuYW1lO1xuXG5cdFx0dGhpcy51cGRhdGVGdWxsUGF0aCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgb3JpZ2luYWwgbmFtZSB1c2VkIGZvciB0aGlzIGFzc2V0IGluIHRoZSByZXNvdXJjZSAoZS5nLiBmaWxlKSBpbiB3aGljaFxuXHQgKiBpdCB3YXMgZm91bmQuIFRoaXMgbWF5IG5vdCBiZSB0aGUgc2FtZSBhcyA8Y29kZT5uYW1lPC9jb2RlPiwgd2hpY2ggbWF5XG5cdCAqIGhhdmUgY2hhbmdlZCBkdWUgdG8gb2YgYSBuYW1lIGNvbmZsaWN0LlxuXHQgKi9cblx0cHVibGljIGdldCBvcmlnaW5hbE5hbWUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl9vcmlnaW5hbE5hbWU7XG5cdH1cblxuXHQvKipcblx0ICogQSB1bmlxdWUgaWQgZm9yIHRoZSBhc3NldCwgdXNlZCB0byBpZGVudGlmeSBhc3NldHMgaW4gYW4gYXNzb2NpYXRpdmUgYXJyYXlcblx0ICovXG5cdHB1YmxpYyBnZXQgaWQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9pZDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgbmFtZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX25hbWU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG5hbWUodmFsOnN0cmluZylcblx0e1xuXHRcdHZhciBwcmV2OnN0cmluZztcblxuXHRcdHByZXYgPSB0aGlzLl9uYW1lO1xuXHRcdHRoaXMuX25hbWUgPSB2YWw7XG5cblx0XHRpZiAodGhpcy5fbmFtZSA9PSBudWxsKVxuXHRcdFx0dGhpcy5fbmFtZSA9ICdudWxsJztcblxuXHRcdHRoaXMudXBkYXRlRnVsbFBhdGgoKTtcblxuXHRcdC8vaWYgKGhhc0V2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9SRU5BTUUpKVxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQXNzZXRFdmVudChBc3NldEV2ZW50LkFTU0VUX1JFTkFNRSwgPElBc3NldD4gdGhpcywgcHJldikpO1xuXG5cdH1cblxuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0cHVibGljIGdldCBhc3NldE5hbWVzcGFjZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX25hbWVzcGFjZTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgYXNzZXRGdWxsUGF0aCgpOkFycmF5PHN0cmluZz5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9mdWxsX3BhdGg7XG5cdH1cblxuXHRwdWJsaWMgYXNzZXRQYXRoRXF1YWxzKG5hbWU6c3RyaW5nLCBuczpzdHJpbmcpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiAodGhpcy5fbmFtZSA9PSBuYW1lICYmICghbnMgfHwgdGhpcy5fbmFtZXNwYWNlID09IG5zKSk7XG5cdH1cblxuXHRwdWJsaWMgcmVzZXRBc3NldFBhdGgobmFtZTpzdHJpbmcsIG5zOnN0cmluZyA9IG51bGwsIG92ZXJyaWRlT3JpZ2luYWw6Ym9vbGVhbiA9IHRydWUpOnZvaWRcblx0e1xuXG5cdFx0dGhpcy5fbmFtZSA9IG5hbWU/IG5hbWUgOiAnbnVsbCc7XG5cdFx0dGhpcy5fbmFtZXNwYWNlID0gbnM/IG5zIDogTmFtZWRBc3NldEJhc2UuREVGQVVMVF9OQU1FU1BBQ0U7XG5cblx0XHRpZiAob3ZlcnJpZGVPcmlnaW5hbClcblx0XHRcdHRoaXMuX29yaWdpbmFsTmFtZSA9IHRoaXMuX25hbWU7XG5cblx0XHR0aGlzLnVwZGF0ZUZ1bGxQYXRoKCk7XG5cdH1cblxuXHRwcml2YXRlIHVwZGF0ZUZ1bGxQYXRoKCk6dm9pZFxuXHR7XG5cdFx0dGhpcy5fZnVsbF9wYXRoID0gWyB0aGlzLl9uYW1lc3BhY2UsIHRoaXMuX25hbWUgXTtcblx0fVxufVxuXG5leHBvcnQgPSBOYW1lZEFzc2V0QmFzZTsiXX0=