"use strict";
var AssetLibraryIterator = (function () {
    function AssetLibraryIterator(assets, assetTypeFilter, namespaceFilter, filterFunc) {
        this._assets = assets;
        this.filter(assetTypeFilter, namespaceFilter, filterFunc);
    }
    Object.defineProperty(AssetLibraryIterator.prototype, "currentAsset", {
        get: function () {
            // Return current, or null if no current
            return (this._idx < this._filtered.length) ? this._filtered[this._idx] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetLibraryIterator.prototype, "numAssets", {
        get: function () {
            return this._filtered.length;
        },
        enumerable: true,
        configurable: true
    });
    AssetLibraryIterator.prototype.next = function () {
        var next = null;
        if (this._idx < this._filtered.length)
            next = this._filtered[this._idx];
        this._idx++;
        return next;
    };
    AssetLibraryIterator.prototype.reset = function () {
        this._idx = 0;
    };
    AssetLibraryIterator.prototype.setIndex = function (index) {
        this._idx = index;
    };
    AssetLibraryIterator.prototype.filter = function (assetTypeFilter, namespaceFilter, filterFunc) {
        if (assetTypeFilter || namespaceFilter) {
            var idx;
            var asset;
            idx = 0;
            this._filtered = new Array(); //new Vector.<IAsset>;
            var l = this._assets.length;
            for (var c = 0; c < l; c++) {
                asset = this._assets[c];
                // Skip this assets if filtering on type and this is wrong type
                if (assetTypeFilter && asset.assetType != assetTypeFilter)
                    continue;
                // Skip this asset if filtering on namespace and this is wrong namespace
                if (namespaceFilter && asset.assetNamespace != namespaceFilter)
                    continue;
                // Skip this asset if a filter func has been provided and it returns false
                if (filterFunc != null && !filterFunc(asset))
                    continue;
                this._filtered[idx++] = asset;
            }
        }
        else {
            this._filtered = this._assets;
        }
    };
    return AssetLibraryIterator;
}());
exports.AssetLibraryIterator = AssetLibraryIterator;
