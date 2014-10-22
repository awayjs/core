var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/core/library/AssetType");
var NamedAssetBase = require("awayjs-core/lib/core/library/NamedAssetBase");

/**
* LightPickerBase provides an abstract base clase for light picker classes. These classes are responsible for
* feeding materials with relevant lights. Usually, StaticLightPicker can be used, but LightPickerBase can be
* extended to provide more application-specific dynamic selection of lights.
*
* @see StaticLightPicker
*/
var LightPickerBase = (function (_super) {
    __extends(LightPickerBase, _super);
    /**
    * Creates a new LightPickerBase object.
    */
    function LightPickerBase() {
        _super.call(this);
        this._pNumPointLights = 0;
        this._pNumDirectionalLights = 0;
        this._pNumCastingPointLights = 0;
        this._pNumCastingDirectionalLights = 0;
        this._pNumLightProbes = 0;
    }
    /**
    * Disposes resources used by the light picker.
    */
    LightPickerBase.prototype.dispose = function () {
    };

    Object.defineProperty(LightPickerBase.prototype, "assetType", {
        /**
        * @inheritDoc
        */
        get: function () {
            return AssetType.LIGHT_PICKER;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LightPickerBase.prototype, "numDirectionalLights", {
        /**
        * The maximum amount of directional lights that will be provided.
        */
        get: function () {
            return this._pNumDirectionalLights;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LightPickerBase.prototype, "numPointLights", {
        /**
        * The maximum amount of point lights that will be provided.
        */
        get: function () {
            return this._pNumPointLights;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LightPickerBase.prototype, "numCastingDirectionalLights", {
        /**
        * The maximum amount of directional lights that cast shadows.
        */
        get: function () {
            return this._pNumCastingDirectionalLights;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LightPickerBase.prototype, "numCastingPointLights", {
        /**
        * The amount of point lights that cast shadows.
        */
        get: function () {
            return this._pNumCastingPointLights;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LightPickerBase.prototype, "numLightProbes", {
        /**
        * The maximum amount of light probes that will be provided.
        */
        get: function () {
            return this._pNumLightProbes;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LightPickerBase.prototype, "pointLights", {
        /**
        * The collected point lights to be used for shading.
        */
        get: function () {
            return this._pPointLights;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LightPickerBase.prototype, "directionalLights", {
        /**
        * The collected directional lights to be used for shading.
        */
        get: function () {
            return this._pDirectionalLights;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LightPickerBase.prototype, "castingPointLights", {
        /**
        * The collected point lights that cast shadows to be used for shading.
        */
        get: function () {
            return this._pCastingPointLights;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LightPickerBase.prototype, "castingDirectionalLights", {
        /**
        * The collected directional lights that cast shadows to be used for shading.
        */
        get: function () {
            return this._pCastingDirectionalLights;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LightPickerBase.prototype, "lightProbes", {
        /**
        * The collected light probes to be used for shading.
        */
        get: function () {
            return this._pLightProbes;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LightPickerBase.prototype, "lightProbeWeights", {
        /**
        * The weights for each light probe, defining their influence on the object.
        */
        get: function () {
            return this._pLightProbeWeights;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LightPickerBase.prototype, "allPickedLights", {
        /**
        * A collection of all the collected lights.
        */
        get: function () {
            return this._pAllPickedLights;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * Updates set of lights for a given renderable and EntityCollector. Always call super.collectLights() after custom overridden code.
    */
    LightPickerBase.prototype.collectLights = function (renderable) {
        this.updateProbeWeights(renderable);
    };

    /**
    * Updates the weights for the light probes, based on the renderable's position relative to them.
    * @param renderable The renderble for which to calculate the light probes' influence.
    */
    LightPickerBase.prototype.updateProbeWeights = function (renderable) {
        // todo: this will cause the same calculations to occur per TriangleSubMesh. See if this can be improved.
        var objectPos = renderable.sourceEntity.scenePosition;
        var lightPos;

        var rx = objectPos.x, ry = objectPos.y, rz = objectPos.z;
        var dx, dy, dz;
        var w, total = 0;
        var i;

        for (i = 0; i < this._pNumLightProbes; ++i) {
            lightPos = this._pLightProbes[i].scenePosition;
            dx = rx - lightPos.x;
            dy = ry - lightPos.y;
            dz = rz - lightPos.z;

            // weight is inversely proportional to square of distance
            w = dx * dx + dy * dy + dz * dz;

            // just... huge if at the same spot
            w = w > .00001 ? 1 / w : 50000000;
            this._pLightProbeWeights[i] = w;
            total += w;
        }

        // normalize
        total = 1 / total;

        for (i = 0; i < this._pNumLightProbes; ++i)
            this._pLightProbeWeights[i] *= total;
    };
    return LightPickerBase;
})(NamedAssetBase);

module.exports = LightPickerBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdGVyaWFscy9saWdodHBpY2tlcnMvTGlnaHRQaWNrZXJCYXNlLnRzIl0sIm5hbWVzIjpbIkxpZ2h0UGlja2VyQmFzZSIsIkxpZ2h0UGlja2VyQmFzZS5jb25zdHJ1Y3RvciIsIkxpZ2h0UGlja2VyQmFzZS5kaXNwb3NlIiwiTGlnaHRQaWNrZXJCYXNlLmNvbGxlY3RMaWdodHMiLCJMaWdodFBpY2tlckJhc2UudXBkYXRlUHJvYmVXZWlnaHRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpRUFFeUU7QUFDekUsMkVBQWtGOztBQVFsRjs7Ozs7O0VBTUc7QUFDSDtJQUE4QkEsa0NBQWNBO0lBbUIzQ0E7O01BREdBO0lBQ0hBO1FBRUNDLFdBQU1BLEtBQUFBLENBQUNBO1FBbkJSQSxLQUFPQSxnQkFBZ0JBLEdBQVVBLENBQUNBLENBQUNBO1FBQ25DQSxLQUFPQSxzQkFBc0JBLEdBQVVBLENBQUNBLENBQUNBO1FBQ3pDQSxLQUFPQSx1QkFBdUJBLEdBQVVBLENBQUNBLENBQUNBO1FBQzFDQSxLQUFPQSw2QkFBNkJBLEdBQVVBLENBQUNBLENBQUNBO1FBQ2hEQSxLQUFPQSxnQkFBZ0JBLEdBQVVBLENBQUNBLENBQUNBO0lBZ0JuQ0EsQ0FBQ0E7SUFLREQ7O01BREdBO3dDQUNIQTtJQUVBRSxDQUFDQTs7SUFLREY7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLFNBQVNBLENBQUNBLFlBQVlBO1FBQzlCQSxDQUFDQTs7OztBQUFBQTtJQUtEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0Esc0JBQXNCQTtRQUNuQ0EsQ0FBQ0E7Ozs7QUFBQUE7SUFLREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGdCQUFnQkE7UUFDN0JBLENBQUNBOzs7O0FBQUFBO0lBS0RBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSw2QkFBNkJBO1FBQzFDQSxDQUFDQTs7OztBQUFB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QUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLEVBQUVBLENBQUNBO1lBQ3pDQSxJQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLEtBQUtBLENBQUNBO0lBQ3ZDQSxDQUFDQTtJQUNGSix1QkFBQ0E7QUFBREEsQ0FBQ0EsRUFwTDZCLGNBQWMsRUFvTDNDOztBQUVELGdDQUF5QixDQUFBIiwiZmlsZSI6Im1hdGVyaWFscy9saWdodHBpY2tlcnMvTGlnaHRQaWNrZXJCYXNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpZ2h0QmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0xpZ2h0QmFzZVwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xuaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xuaW1wb3J0IElBc3NldFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IElSZW5kZXJhYmxlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3Bvb2wvSVJlbmRlcmFibGVcIik7XG5pbXBvcnQgSUNvbGxlY3Rvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS90cmF2ZXJzZS9JQ29sbGVjdG9yXCIpO1xuaW1wb3J0IERpcmVjdGlvbmFsTGlnaHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9EaXJlY3Rpb25hbExpZ2h0XCIpO1xuaW1wb3J0IExpZ2h0UHJvYmVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0xpZ2h0UHJvYmVcIik7XG5pbXBvcnQgUG9pbnRMaWdodFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZW50aXRpZXMvUG9pbnRMaWdodFwiKTtcblxuLyoqXG4gKiBMaWdodFBpY2tlckJhc2UgcHJvdmlkZXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzZSBmb3IgbGlnaHQgcGlja2VyIGNsYXNzZXMuIFRoZXNlIGNsYXNzZXMgYXJlIHJlc3BvbnNpYmxlIGZvclxuICogZmVlZGluZyBtYXRlcmlhbHMgd2l0aCByZWxldmFudCBsaWdodHMuIFVzdWFsbHksIFN0YXRpY0xpZ2h0UGlja2VyIGNhbiBiZSB1c2VkLCBidXQgTGlnaHRQaWNrZXJCYXNlIGNhbiBiZVxuICogZXh0ZW5kZWQgdG8gcHJvdmlkZSBtb3JlIGFwcGxpY2F0aW9uLXNwZWNpZmljIGR5bmFtaWMgc2VsZWN0aW9uIG9mIGxpZ2h0cy5cbiAqXG4gKiBAc2VlIFN0YXRpY0xpZ2h0UGlja2VyXG4gKi9cbmNsYXNzIExpZ2h0UGlja2VyQmFzZSBleHRlbmRzIE5hbWVkQXNzZXRCYXNlIGltcGxlbWVudHMgSUFzc2V0XG57XG5cdHB1YmxpYyBfcE51bVBvaW50TGlnaHRzOm51bWJlciA9IDA7XG5cdHB1YmxpYyBfcE51bURpcmVjdGlvbmFsTGlnaHRzOm51bWJlciA9IDA7XG5cdHB1YmxpYyBfcE51bUNhc3RpbmdQb2ludExpZ2h0czpudW1iZXIgPSAwO1xuXHRwdWJsaWMgX3BOdW1DYXN0aW5nRGlyZWN0aW9uYWxMaWdodHM6bnVtYmVyID0gMDtcblx0cHVibGljIF9wTnVtTGlnaHRQcm9iZXM6bnVtYmVyID0gMDtcblxuXHRwdWJsaWMgX3BBbGxQaWNrZWRMaWdodHM6QXJyYXk8TGlnaHRCYXNlPjtcblx0cHVibGljIF9wUG9pbnRMaWdodHM6QXJyYXk8UG9pbnRMaWdodD47XG5cdHB1YmxpYyBfcENhc3RpbmdQb2ludExpZ2h0czpBcnJheTxQb2ludExpZ2h0Pjtcblx0cHVibGljIF9wRGlyZWN0aW9uYWxMaWdodHM6QXJyYXk8RGlyZWN0aW9uYWxMaWdodD47XG5cdHB1YmxpYyBfcENhc3RpbmdEaXJlY3Rpb25hbExpZ2h0czpBcnJheTxEaXJlY3Rpb25hbExpZ2h0Pjtcblx0cHVibGljIF9wTGlnaHRQcm9iZXM6QXJyYXk8TGlnaHRQcm9iZT47XG5cdHB1YmxpYyBfcExpZ2h0UHJvYmVXZWlnaHRzOkFycmF5PG51bWJlcj47XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgTGlnaHRQaWNrZXJCYXNlIG9iamVjdC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICogRGlzcG9zZXMgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIGxpZ2h0IHBpY2tlci5cblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5MSUdIVF9QSUNLRVI7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG1heGltdW0gYW1vdW50IG9mIGRpcmVjdGlvbmFsIGxpZ2h0cyB0aGF0IHdpbGwgYmUgcHJvdmlkZWQuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG51bURpcmVjdGlvbmFsTGlnaHRzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE51bURpcmVjdGlvbmFsTGlnaHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBwb2ludCBsaWdodHMgdGhhdCB3aWxsIGJlIHByb3ZpZGVkLlxuXHQgKi9cblx0cHVibGljIGdldCBudW1Qb2ludExpZ2h0cygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BOdW1Qb2ludExpZ2h0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbWF4aW11bSBhbW91bnQgb2YgZGlyZWN0aW9uYWwgbGlnaHRzIHRoYXQgY2FzdCBzaGFkb3dzLlxuXHQgKi9cblx0cHVibGljIGdldCBudW1DYXN0aW5nRGlyZWN0aW9uYWxMaWdodHMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTnVtQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBhbW91bnQgb2YgcG9pbnQgbGlnaHRzIHRoYXQgY2FzdCBzaGFkb3dzLlxuXHQgKi9cblx0cHVibGljIGdldCBudW1DYXN0aW5nUG9pbnRMaWdodHMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTnVtQ2FzdGluZ1BvaW50TGlnaHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBsaWdodCBwcm9iZXMgdGhhdCB3aWxsIGJlIHByb3ZpZGVkLlxuXHQgKi9cblx0cHVibGljIGdldCBudW1MaWdodFByb2JlcygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BOdW1MaWdodFByb2Jlcztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgY29sbGVjdGVkIHBvaW50IGxpZ2h0cyB0byBiZSB1c2VkIGZvciBzaGFkaW5nLlxuXHQgKi9cblx0cHVibGljIGdldCBwb2ludExpZ2h0cygpOkFycmF5PFBvaW50TGlnaHQ+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFBvaW50TGlnaHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBjb2xsZWN0ZWQgZGlyZWN0aW9uYWwgbGlnaHRzIHRvIGJlIHVzZWQgZm9yIHNoYWRpbmcuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGRpcmVjdGlvbmFsTGlnaHRzKCk6QXJyYXk8RGlyZWN0aW9uYWxMaWdodD5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wRGlyZWN0aW9uYWxMaWdodHM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGNvbGxlY3RlZCBwb2ludCBsaWdodHMgdGhhdCBjYXN0IHNoYWRvd3MgdG8gYmUgdXNlZCBmb3Igc2hhZGluZy5cblx0ICovXG5cdHB1YmxpYyBnZXQgY2FzdGluZ1BvaW50TGlnaHRzKCk6QXJyYXk8UG9pbnRMaWdodD5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQ2FzdGluZ1BvaW50TGlnaHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBjb2xsZWN0ZWQgZGlyZWN0aW9uYWwgbGlnaHRzIHRoYXQgY2FzdCBzaGFkb3dzIHRvIGJlIHVzZWQgZm9yIHNoYWRpbmcuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNhc3RpbmdEaXJlY3Rpb25hbExpZ2h0cygpOkFycmF5PERpcmVjdGlvbmFsTGlnaHQ+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcENhc3RpbmdEaXJlY3Rpb25hbExpZ2h0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgY29sbGVjdGVkIGxpZ2h0IHByb2JlcyB0byBiZSB1c2VkIGZvciBzaGFkaW5nLlxuXHQgKi9cblx0cHVibGljIGdldCBsaWdodFByb2JlcygpOkFycmF5PExpZ2h0UHJvYmU+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcExpZ2h0UHJvYmVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB3ZWlnaHRzIGZvciBlYWNoIGxpZ2h0IHByb2JlLCBkZWZpbmluZyB0aGVpciBpbmZsdWVuY2Ugb24gdGhlIG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBnZXQgbGlnaHRQcm9iZVdlaWdodHMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcExpZ2h0UHJvYmVXZWlnaHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgY29sbGVjdGlvbiBvZiBhbGwgdGhlIGNvbGxlY3RlZCBsaWdodHMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFsbFBpY2tlZExpZ2h0cygpOkFycmF5PExpZ2h0QmFzZT5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQWxsUGlja2VkTGlnaHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgc2V0IG9mIGxpZ2h0cyBmb3IgYSBnaXZlbiByZW5kZXJhYmxlIGFuZCBFbnRpdHlDb2xsZWN0b3IuIEFsd2F5cyBjYWxsIHN1cGVyLmNvbGxlY3RMaWdodHMoKSBhZnRlciBjdXN0b20gb3ZlcnJpZGRlbiBjb2RlLlxuXHQgKi9cblx0cHVibGljIGNvbGxlY3RMaWdodHMocmVuZGVyYWJsZTpJUmVuZGVyYWJsZSlcblx0e1xuXHRcdHRoaXMudXBkYXRlUHJvYmVXZWlnaHRzKHJlbmRlcmFibGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIHdlaWdodHMgZm9yIHRoZSBsaWdodCBwcm9iZXMsIGJhc2VkIG9uIHRoZSByZW5kZXJhYmxlJ3MgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlbS5cblx0ICogQHBhcmFtIHJlbmRlcmFibGUgVGhlIHJlbmRlcmJsZSBmb3Igd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBsaWdodCBwcm9iZXMnIGluZmx1ZW5jZS5cblx0ICovXG5cdHByaXZhdGUgdXBkYXRlUHJvYmVXZWlnaHRzKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpXG5cdHtcblx0XHQvLyB0b2RvOiB0aGlzIHdpbGwgY2F1c2UgdGhlIHNhbWUgY2FsY3VsYXRpb25zIHRvIG9jY3VyIHBlciBUcmlhbmdsZVN1Yk1lc2guIFNlZSBpZiB0aGlzIGNhbiBiZSBpbXByb3ZlZC5cblx0XHR2YXIgb2JqZWN0UG9zOlZlY3RvcjNEID0gcmVuZGVyYWJsZS5zb3VyY2VFbnRpdHkuc2NlbmVQb3NpdGlvbjtcblx0XHR2YXIgbGlnaHRQb3M6VmVjdG9yM0Q7XG5cblx0XHR2YXIgcng6bnVtYmVyID0gb2JqZWN0UG9zLngsIHJ5Om51bWJlciA9IG9iamVjdFBvcy55LCByejpudW1iZXIgPSBvYmplY3RQb3Muejtcblx0XHR2YXIgZHg6bnVtYmVyLCBkeTpudW1iZXIsIGR6Om51bWJlcjtcblx0XHR2YXIgdzpudW1iZXIsIHRvdGFsOm51bWJlciA9IDA7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXG5cdFx0Ly8gY2FsY3VsYXRlcyB3ZWlnaHRzIGZvciBwcm9iZXNcblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fcE51bUxpZ2h0UHJvYmVzOyArK2kpIHtcblxuXHRcdFx0bGlnaHRQb3MgPSB0aGlzLl9wTGlnaHRQcm9iZXNbaV0uc2NlbmVQb3NpdGlvbjtcblx0XHRcdGR4ID0gcnggLSBsaWdodFBvcy54O1xuXHRcdFx0ZHkgPSByeSAtIGxpZ2h0UG9zLnk7XG5cdFx0XHRkeiA9IHJ6IC0gbGlnaHRQb3Muejtcblx0XHRcdC8vIHdlaWdodCBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHNxdWFyZSBvZiBkaXN0YW5jZVxuXHRcdFx0dyA9IGR4KmR4ICsgZHkqZHkgKyBkeipkejtcblxuXHRcdFx0Ly8ganVzdC4uLiBodWdlIGlmIGF0IHRoZSBzYW1lIHNwb3Rcblx0XHRcdHcgPSB3ID4gLjAwMDAxPyAxL3cgOiA1MDAwMDAwMDtcblx0XHRcdHRoaXMuX3BMaWdodFByb2JlV2VpZ2h0c1tpXSA9IHc7XG5cdFx0XHR0b3RhbCArPSB3O1xuXHRcdH1cblxuXHRcdC8vIG5vcm1hbGl6ZVxuXHRcdHRvdGFsID0gMS90b3RhbDtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9wTnVtTGlnaHRQcm9iZXM7ICsraSlcblx0XHRcdHRoaXMuX3BMaWdodFByb2JlV2VpZ2h0c1tpXSAqPSB0b3RhbDtcblx0fVxufVxuXG5leHBvcnQgPSBMaWdodFBpY2tlckJhc2U7Il19