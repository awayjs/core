"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractMethodError_1 = require("../errors/AbstractMethodError");
var AssetEvent_1 = require("../events/AssetEvent");
var EventDispatcher_1 = require("../events/EventDispatcher");
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
            throw new AbstractMethodError_1.AbstractMethodError();
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
            this.dispatchEvent(new AssetEvent_1.AssetEvent(AssetEvent_1.AssetEvent.RENAME, this, prev));
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    AssetBase.prototype.invalidate = function () {
        this.dispatchEvent(new AssetEvent_1.AssetEvent(AssetEvent_1.AssetEvent.INVALIDATE, this));
    };
    /**
     * @inheritDoc
     */
    AssetBase.prototype.dispose = function () {
        this.dispatchEvent(new AssetEvent_1.AssetEvent(AssetEvent_1.AssetEvent.DISPOSE, this));
    };
    AssetBase.prototype.clear = function () {
        this.dispatchEvent(new AssetEvent_1.AssetEvent(AssetEvent_1.AssetEvent.CLEAR, this));
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
}(EventDispatcher_1.EventDispatcher));
exports.AssetBase = AssetBase;
