"use strict";
/**
 * ResourceDependency represents the data required to load, parse and resolve additional files ("dependencies")
 * required by a parser, used by ResourceLoadSession.
 *
 */
var ResourceDependency = (function () {
    function ResourceDependency(id, request, data, parser, parentParser, retrieveAsRawData, suppressAssetEvents, sub_id) {
        if (retrieveAsRawData === void 0) { retrieveAsRawData = false; }
        if (suppressAssetEvents === void 0) { suppressAssetEvents = false; }
        if (sub_id === void 0) { sub_id = 0; }
        this._id = id;
        this._sub_id = sub_id;
        this._request = request;
        this._data = data;
        this._parser = parser;
        this._parentParser = parentParser;
        this._retrieveAsRawData = retrieveAsRawData;
        this._suppressAssetEvents = suppressAssetEvents;
        this._assets = new Array();
        this._dependencies = new Array();
    }
    Object.defineProperty(ResourceDependency.prototype, "id", {
        /**
         *
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "sub_id", {
        get: function () {
            return this._sub_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "request", {
        /**
         *
         */
        get: function () {
            return this._request;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "data", {
        /**
         * The data containing the dependency to be parsed, if the resource was already loaded.
         */
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "parser", {
        /**
         *
         */
        get: function () {
            return this._parser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "parentParser", {
        /**
         * The parser which is dependent on this ResourceDependency object.
         */
        get: function () {
            return this._parentParser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "retrieveAsRawData", {
        /**
         *
         */
        get: function () {
            return this._retrieveAsRawData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "suppresAssetEvents", {
        /**
         *
         */
        get: function () {
            return this._suppressAssetEvents;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "assets", {
        /**
         *
         */
        get: function () {
            return this._assets;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceDependency.prototype, "dependencies", {
        /**
         *
         */
        get: function () {
            return this._dependencies;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * Method to set data after having already created the dependency object, e.g. after load.
     */
    ResourceDependency.prototype._iSetData = function (data) {
        this._data = data;
    };
    /**
     * @private
     *
     */
    ResourceDependency.prototype._iSetParser = function (parser) {
        this._parser = parser;
    };
    /**
     * Resolve the dependency when it's loaded with the parent parser. For example, a dependency containing an
     * ImageResource would be assigned to a Mesh instance as a BitmapMaterial, a scene graph object would be added
     * to its intended parent. The dependency should be a member of the dependencies property.
     */
    ResourceDependency.prototype.resolve = function () {
        if (this._parentParser)
            this._parentParser._iResolveDependency(this);
    };
    /**
     * Resolve a dependency failure. For example, map loading failure from a 3d file
     */
    ResourceDependency.prototype.resolveFailure = function () {
        if (this._parentParser)
            this._parentParser._iResolveDependencyFailure(this);
    };
    /**
     * Resolve the dependencies name
     */
    ResourceDependency.prototype.resolveName = function (asset) {
        if (this._parentParser)
            return this._parentParser._iResolveDependencyName(this, asset);
        return asset.name;
    };
    return ResourceDependency;
}());
exports.ResourceDependency = ResourceDependency;
