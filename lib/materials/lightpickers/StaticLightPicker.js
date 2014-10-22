var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DirectionalLight = require("awayjs-core/lib/entities/DirectionalLight");
var LightProbe = require("awayjs-core/lib/entities/LightProbe");
var PointLight = require("awayjs-core/lib/entities/PointLight");
var Event = require("awayjs-core/lib/events/Event");
var LightEvent = require("awayjs-core/lib/events/LightEvent");
var LightPickerBase = require("awayjs-core/lib/materials/lightpickers/LightPickerBase");

/**
* StaticLightPicker is a light picker that provides a static set of lights. The lights can be reassigned, but
* if the configuration changes (number of directional lights, point lights, etc), a material recompilation may
* occur.
*/
var StaticLightPicker = (function (_super) {
    __extends(StaticLightPicker, _super);
    /**
    * Creates a new StaticLightPicker object.
    * @param lights The lights to be used for shading.
    */
    function StaticLightPicker(lights) {
        var _this = this;
        _super.call(this);

        this._onCastShadowChangeDelegate = function (event) {
            return _this.onCastShadowChange(event);
        };

        this.lights = lights;
    }
    Object.defineProperty(StaticLightPicker.prototype, "lights", {
        /**
        * The lights used for shading.
        */
        get: function () {
            return this._lights;
        },
        set: function (value) {
            var numPointLights = 0;
            var numDirectionalLights = 0;
            var numCastingPointLights = 0;
            var numCastingDirectionalLights = 0;
            var numLightProbes = 0;
            var light;

            if (this._lights)
                this.clearListeners();

            this._lights = value;
            this._pAllPickedLights = value;
            this._pPointLights = new Array();
            this._pCastingPointLights = new Array();
            this._pDirectionalLights = new Array();
            this._pCastingDirectionalLights = new Array();
            this._pLightProbes = new Array();

            var len = value.length;

            for (var i = 0; i < len; ++i) {
                light = value[i];
                light.addEventListener(LightEvent.CASTS_SHADOW_CHANGE, this._onCastShadowChangeDelegate);

                if (light instanceof PointLight) {
                    if (light.castsShadows)
                        this._pCastingPointLights[numCastingPointLights++] = light;
                    else
                        this._pPointLights[numPointLights++] = light;
                } else if (light instanceof DirectionalLight) {
                    if (light.castsShadows)
                        this._pCastingDirectionalLights[numCastingDirectionalLights++] = light;
                    else
                        this._pDirectionalLights[numDirectionalLights++] = light;
                } else if (light instanceof LightProbe) {
                    this._pLightProbes[numLightProbes++] = light;
                }
            }

            if (this._pNumDirectionalLights == numDirectionalLights && this._pNumPointLights == numPointLights && this._pNumLightProbes == numLightProbes && this._pNumCastingPointLights == numCastingPointLights && this._pNumCastingDirectionalLights == numCastingDirectionalLights)
                return;

            this._pNumDirectionalLights = numDirectionalLights;
            this._pNumCastingDirectionalLights = numCastingDirectionalLights;
            this._pNumPointLights = numPointLights;
            this._pNumCastingPointLights = numCastingPointLights;
            this._pNumLightProbes = numLightProbes;

            // MUST HAVE MULTIPLE OF 4 ELEMENTS!
            this._pLightProbeWeights = new Array(Math.ceil(numLightProbes / 4) * 4);

            // notify material lights have changed
            this.dispatchEvent(new Event(Event.CHANGE));
        },
        enumerable: true,
        configurable: true
    });


    /**
    * Remove configuration change listeners on the lights.
    */
    StaticLightPicker.prototype.clearListeners = function () {
        var len = this._lights.length;
        for (var i = 0; i < len; ++i)
            this._lights[i].removeEventListener(LightEvent.CASTS_SHADOW_CHANGE, this._onCastShadowChangeDelegate);
    };

    /**
    * Notifies the material of a configuration change.
    */
    StaticLightPicker.prototype.onCastShadowChange = function (event) {
        // TODO: Assign to special caster collections, just append it to the lights in SinglePass
        // But keep seperated in multipass
        var light = event.target;

        if (light instanceof PointLight)
            this.updatePointCasting(light);
        else if (light instanceof DirectionalLight)
            this.updateDirectionalCasting(light);

        this.dispatchEvent(new Event(Event.CHANGE));
    };

    /**
    * Called when a directional light's shadow casting configuration changes.
    */
    StaticLightPicker.prototype.updateDirectionalCasting = function (light) {
        var dl = light;

        if (light.castsShadows) {
            --this._pNumDirectionalLights;
            ++this._pNumCastingDirectionalLights;

            this._pDirectionalLights.splice(this._pDirectionalLights.indexOf(dl), 1);
            this._pCastingDirectionalLights.push(light);
        } else {
            ++this._pNumDirectionalLights;
            --this._pNumCastingDirectionalLights;

            this._pCastingDirectionalLights.splice(this._pCastingDirectionalLights.indexOf(dl), 1);
            this._pDirectionalLights.push(light);
        }
    };

    /**
    * Called when a point light's shadow casting configuration changes.
    */
    StaticLightPicker.prototype.updatePointCasting = function (light) {
        var pl = light;

        if (light.castsShadows) {
            --this._pNumPointLights;
            ++this._pNumCastingPointLights;
            this._pPointLights.splice(this._pPointLights.indexOf(pl), 1);
            this._pCastingPointLights.push(light);
        } else {
            ++this._pNumPointLights;
            --this._pNumCastingPointLights;

            this._pCastingPointLights.splice(this._pCastingPointLights.indexOf(pl), 1);
            this._pPointLights.push(light);
        }
    };
    return StaticLightPicker;
})(LightPickerBase);

module.exports = StaticLightPicker;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdGVyaWFscy9saWdodHBpY2tlcnMvU3RhdGljTGlnaHRQaWNrZXIudHMiXSwibmFtZXMiOlsiU3RhdGljTGlnaHRQaWNrZXIiLCJTdGF0aWNMaWdodFBpY2tlci5jb25zdHJ1Y3RvciIsIlN0YXRpY0xpZ2h0UGlja2VyLmNsZWFyTGlzdGVuZXJzIiwiU3RhdGljTGlnaHRQaWNrZXIub25DYXN0U2hhZG93Q2hhbmdlIiwiU3RhdGljTGlnaHRQaWNrZXIudXBkYXRlRGlyZWN0aW9uYWxDYXN0aW5nIiwiU3RhdGljTGlnaHRQaWNrZXIudXBkYXRlUG9pbnRDYXN0aW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyRUFDa0Y7QUFDbEYsK0RBQXVFO0FBQ3ZFLCtEQUF1RTtBQUN2RSxtREFBNEQ7QUFDNUQsNkRBQXFFO0FBQ3JFLHVGQUE4Rjs7QUFFOUY7Ozs7RUFJRztBQUNIO0lBQWdDQSxvQ0FBZUE7SUFTOUNBOzs7TUFER0E7SUFDSEEsMkJBQVlBLE1BQU1BO1FBQWxCQyxpQkFPQ0E7UUFMQUEsV0FBTUEsS0FBQUEsQ0FBQ0E7O1FBRVBBLElBQUlBLENBQUNBLDJCQUEyQkEsR0FBR0EsVUFBQ0EsS0FBZ0JBO21CQUFLQSxLQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLEtBQUtBLENBQUNBO1FBQTlCQSxDQUE4QkE7O1FBRXZGQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQTtJQUNyQkEsQ0FBQ0E7SUFLREQ7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLE9BQU9BO1FBQ3BCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFrQkEsS0FBZ0JBO1lBRWpDQSxJQUFJQSxjQUFjQSxHQUFVQSxDQUFDQTtZQUM3QkEsSUFBSUEsb0JBQW9CQSxHQUFVQSxDQUFDQTtZQUNuQ0EsSUFBSUEscUJBQXFCQSxHQUFVQSxDQUFDQTtZQUNwQ0EsSUFBSUEsMkJBQTJCQSxHQUFVQSxDQUFDQTtZQUMxQ0EsSUFBSUEsY0FBY0EsR0FBVUEsQ0FB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SUEsQ0FBQ0EsdUJBQXVCQTs7WUFFOUJBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUMxRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7U0FDOUJBO0lBQ0ZBLENBQUNBO0lBQ0ZMLHlCQUFDQTtBQUFEQSxDQUFDQSxFQTlKK0IsZUFBZSxFQThKOUM7O0FBRUQsa0NBQTJCLENBQUEiLCJmaWxlIjoibWF0ZXJpYWxzL2xpZ2h0cGlja2Vycy9TdGF0aWNMaWdodFBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaWdodEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9MaWdodEJhc2VcIik7XG5pbXBvcnQgRGlyZWN0aW9uYWxMaWdodFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0RpcmVjdGlvbmFsTGlnaHRcIik7XG5pbXBvcnQgTGlnaHRQcm9iZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZW50aXRpZXMvTGlnaHRQcm9iZVwiKTtcbmltcG9ydCBQb2ludExpZ2h0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9Qb2ludExpZ2h0XCIpO1xuaW1wb3J0IEV2ZW50XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcbmltcG9ydCBMaWdodEV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvTGlnaHRFdmVudFwiKTtcbmltcG9ydCBMaWdodFBpY2tlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9tYXRlcmlhbHMvbGlnaHRwaWNrZXJzL0xpZ2h0UGlja2VyQmFzZVwiKTtcblxuLyoqXG4gKiBTdGF0aWNMaWdodFBpY2tlciBpcyBhIGxpZ2h0IHBpY2tlciB0aGF0IHByb3ZpZGVzIGEgc3RhdGljIHNldCBvZiBsaWdodHMuIFRoZSBsaWdodHMgY2FuIGJlIHJlYXNzaWduZWQsIGJ1dFxuICogaWYgdGhlIGNvbmZpZ3VyYXRpb24gY2hhbmdlcyAobnVtYmVyIG9mIGRpcmVjdGlvbmFsIGxpZ2h0cywgcG9pbnQgbGlnaHRzLCBldGMpLCBhIG1hdGVyaWFsIHJlY29tcGlsYXRpb24gbWF5XG4gKiBvY2N1ci5cbiAqL1xuY2xhc3MgU3RhdGljTGlnaHRQaWNrZXIgZXh0ZW5kcyBMaWdodFBpY2tlckJhc2Vcbntcblx0cHJpdmF0ZSBfbGlnaHRzOkFycmF5PGFueT47XG5cdHByaXZhdGUgX29uQ2FzdFNoYWRvd0NoYW5nZURlbGVnYXRlOkZ1bmN0aW9uO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IFN0YXRpY0xpZ2h0UGlja2VyIG9iamVjdC5cblx0ICogQHBhcmFtIGxpZ2h0cyBUaGUgbGlnaHRzIHRvIGJlIHVzZWQgZm9yIHNoYWRpbmcuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihsaWdodHMpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fb25DYXN0U2hhZG93Q2hhbmdlRGVsZWdhdGUgPSAoZXZlbnQ6TGlnaHRFdmVudCkgPT4gdGhpcy5vbkNhc3RTaGFkb3dDaGFuZ2UoZXZlbnQpO1xuXG5cdFx0dGhpcy5saWdodHMgPSBsaWdodHM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGxpZ2h0cyB1c2VkIGZvciBzaGFkaW5nLlxuXHQgKi9cblx0cHVibGljIGdldCBsaWdodHMoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xpZ2h0cztcblx0fVxuXG5cdHB1YmxpYyBzZXQgbGlnaHRzKHZhbHVlOkFycmF5PGFueT4pXG5cdHtcblx0XHR2YXIgbnVtUG9pbnRMaWdodHM6bnVtYmVyID0gMDtcblx0XHR2YXIgbnVtRGlyZWN0aW9uYWxMaWdodHM6bnVtYmVyID0gMDtcblx0XHR2YXIgbnVtQ2FzdGluZ1BvaW50TGlnaHRzOm51bWJlciA9IDA7XG5cdFx0dmFyIG51bUNhc3RpbmdEaXJlY3Rpb25hbExpZ2h0czpudW1iZXIgPSAwO1xuXHRcdHZhciBudW1MaWdodFByb2JlczpudW1iZXIgPSAwO1xuXHRcdHZhciBsaWdodDpMaWdodEJhc2U7XG5cblx0XHRpZiAodGhpcy5fbGlnaHRzKVxuXHRcdFx0dGhpcy5jbGVhckxpc3RlbmVycygpO1xuXG5cdFx0dGhpcy5fbGlnaHRzID0gdmFsdWU7XG5cdFx0dGhpcy5fcEFsbFBpY2tlZExpZ2h0cyA9IHZhbHVlO1xuXHRcdHRoaXMuX3BQb2ludExpZ2h0cyA9IG5ldyBBcnJheTxQb2ludExpZ2h0PigpO1xuXHRcdHRoaXMuX3BDYXN0aW5nUG9pbnRMaWdodHMgPSBuZXcgQXJyYXk8UG9pbnRMaWdodD4oKTtcblx0XHR0aGlzLl9wRGlyZWN0aW9uYWxMaWdodHMgPSBuZXcgQXJyYXk8RGlyZWN0aW9uYWxMaWdodD4oKTtcblx0XHR0aGlzLl9wQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzID0gbmV3IEFycmF5PERpcmVjdGlvbmFsTGlnaHQ+KCk7XG5cdFx0dGhpcy5fcExpZ2h0UHJvYmVzID0gbmV3IEFycmF5PExpZ2h0UHJvYmU+KCk7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHZhbHVlLmxlbmd0aDtcblxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKSB7XG5cdFx0XHRsaWdodCA9IHZhbHVlW2ldO1xuXHRcdFx0bGlnaHQuYWRkRXZlbnRMaXN0ZW5lcihMaWdodEV2ZW50LkNBU1RTX1NIQURPV19DSEFOR0UsIHRoaXMuX29uQ2FzdFNoYWRvd0NoYW5nZURlbGVnYXRlKTtcblxuXHRcdFx0aWYgKGxpZ2h0IGluc3RhbmNlb2YgUG9pbnRMaWdodCkge1xuXHRcdFx0XHRpZiAobGlnaHQuY2FzdHNTaGFkb3dzKVxuXHRcdFx0XHRcdHRoaXMuX3BDYXN0aW5nUG9pbnRMaWdodHNbbnVtQ2FzdGluZ1BvaW50TGlnaHRzKytdID0gPFBvaW50TGlnaHQ+IGxpZ2h0O1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy5fcFBvaW50TGlnaHRzW251bVBvaW50TGlnaHRzKytdID0gPFBvaW50TGlnaHQ+IGxpZ2h0O1xuXG5cdFx0XHR9IGVsc2UgaWYgKGxpZ2h0IGluc3RhbmNlb2YgRGlyZWN0aW9uYWxMaWdodCkge1xuXHRcdFx0XHRpZiAobGlnaHQuY2FzdHNTaGFkb3dzKVxuXHRcdFx0XHRcdHRoaXMuX3BDYXN0aW5nRGlyZWN0aW9uYWxMaWdodHNbbnVtQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzKytdID0gPERpcmVjdGlvbmFsTGlnaHQ+IGxpZ2h0O1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy5fcERpcmVjdGlvbmFsTGlnaHRzW251bURpcmVjdGlvbmFsTGlnaHRzKytdID0gPERpcmVjdGlvbmFsTGlnaHQ+IGxpZ2h0O1xuXG5cdFx0XHR9IGVsc2UgaWYgKGxpZ2h0IGluc3RhbmNlb2YgTGlnaHRQcm9iZSkge1xuXHRcdFx0XHR0aGlzLl9wTGlnaHRQcm9iZXNbbnVtTGlnaHRQcm9iZXMrK10gPSA8TGlnaHRQcm9iZT4gbGlnaHQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3BOdW1EaXJlY3Rpb25hbExpZ2h0cyA9PSBudW1EaXJlY3Rpb25hbExpZ2h0cyAmJiB0aGlzLl9wTnVtUG9pbnRMaWdodHMgPT0gbnVtUG9pbnRMaWdodHMgJiYgdGhpcy5fcE51bUxpZ2h0UHJvYmVzID09IG51bUxpZ2h0UHJvYmVzICYmIHRoaXMuX3BOdW1DYXN0aW5nUG9pbnRMaWdodHMgPT0gbnVtQ2FzdGluZ1BvaW50TGlnaHRzICYmIHRoaXMuX3BOdW1DYXN0aW5nRGlyZWN0aW9uYWxMaWdodHMgPT0gbnVtQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcE51bURpcmVjdGlvbmFsTGlnaHRzID0gbnVtRGlyZWN0aW9uYWxMaWdodHM7XG5cdFx0dGhpcy5fcE51bUNhc3RpbmdEaXJlY3Rpb25hbExpZ2h0cyA9IG51bUNhc3RpbmdEaXJlY3Rpb25hbExpZ2h0cztcblx0XHR0aGlzLl9wTnVtUG9pbnRMaWdodHMgPSBudW1Qb2ludExpZ2h0cztcblx0XHR0aGlzLl9wTnVtQ2FzdGluZ1BvaW50TGlnaHRzID0gbnVtQ2FzdGluZ1BvaW50TGlnaHRzO1xuXHRcdHRoaXMuX3BOdW1MaWdodFByb2JlcyA9IG51bUxpZ2h0UHJvYmVzO1xuXG5cdFx0Ly8gTVVTVCBIQVZFIE1VTFRJUExFIE9GIDQgRUxFTUVOVFMhXG5cdFx0dGhpcy5fcExpZ2h0UHJvYmVXZWlnaHRzID0gbmV3IEFycmF5PG51bWJlcj4oTWF0aC5jZWlsKG51bUxpZ2h0UHJvYmVzLzQpKjQpO1xuXG5cdFx0Ly8gbm90aWZ5IG1hdGVyaWFsIGxpZ2h0cyBoYXZlIGNoYW5nZWRcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KEV2ZW50LkNIQU5HRSkpO1xuXG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIGNvbmZpZ3VyYXRpb24gY2hhbmdlIGxpc3RlbmVycyBvbiB0aGUgbGlnaHRzLlxuXHQgKi9cblx0cHJpdmF0ZSBjbGVhckxpc3RlbmVycygpXG5cdHtcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2xpZ2h0cy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXG5cdFx0XHR0aGlzLl9saWdodHNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihMaWdodEV2ZW50LkNBU1RTX1NIQURPV19DSEFOR0UsIHRoaXMuX29uQ2FzdFNoYWRvd0NoYW5nZURlbGVnYXRlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBOb3RpZmllcyB0aGUgbWF0ZXJpYWwgb2YgYSBjb25maWd1cmF0aW9uIGNoYW5nZS5cblx0ICovXG5cdHByaXZhdGUgb25DYXN0U2hhZG93Q2hhbmdlKGV2ZW50OkxpZ2h0RXZlbnQpXG5cdHtcblx0XHQvLyBUT0RPOiBBc3NpZ24gdG8gc3BlY2lhbCBjYXN0ZXIgY29sbGVjdGlvbnMsIGp1c3QgYXBwZW5kIGl0IHRvIHRoZSBsaWdodHMgaW4gU2luZ2xlUGFzc1xuXHRcdC8vIEJ1dCBrZWVwIHNlcGVyYXRlZCBpbiBtdWx0aXBhc3NcblxuXHRcdHZhciBsaWdodDpMaWdodEJhc2UgPSA8TGlnaHRCYXNlPiBldmVudC50YXJnZXQ7XG5cblx0XHRpZiAobGlnaHQgaW5zdGFuY2VvZiBQb2ludExpZ2h0KVxuXHRcdFx0dGhpcy51cGRhdGVQb2ludENhc3RpbmcoPFBvaW50TGlnaHQ+IGxpZ2h0KTtcblx0XHRlbHNlIGlmIChsaWdodCBpbnN0YW5jZW9mIERpcmVjdGlvbmFsTGlnaHQpXG5cdFx0XHR0aGlzLnVwZGF0ZURpcmVjdGlvbmFsQ2FzdGluZyg8RGlyZWN0aW9uYWxMaWdodD4gbGlnaHQpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChFdmVudC5DSEFOR0UpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgd2hlbiBhIGRpcmVjdGlvbmFsIGxpZ2h0J3Mgc2hhZG93IGNhc3RpbmcgY29uZmlndXJhdGlvbiBjaGFuZ2VzLlxuXHQgKi9cblx0cHJpdmF0ZSB1cGRhdGVEaXJlY3Rpb25hbENhc3RpbmcobGlnaHQ6RGlyZWN0aW9uYWxMaWdodClcblx0e1xuXHRcdHZhciBkbDpEaXJlY3Rpb25hbExpZ2h0ID0gPERpcmVjdGlvbmFsTGlnaHQ+IGxpZ2h0O1xuXG5cdFx0aWYgKGxpZ2h0LmNhc3RzU2hhZG93cykge1xuXHRcdFx0LS10aGlzLl9wTnVtRGlyZWN0aW9uYWxMaWdodHM7XG5cdFx0XHQrK3RoaXMuX3BOdW1DYXN0aW5nRGlyZWN0aW9uYWxMaWdodHM7XG5cblxuXHRcdFx0dGhpcy5fcERpcmVjdGlvbmFsTGlnaHRzLnNwbGljZSh0aGlzLl9wRGlyZWN0aW9uYWxMaWdodHMuaW5kZXhPZihkbCksIDEpO1xuXHRcdFx0dGhpcy5fcENhc3RpbmdEaXJlY3Rpb25hbExpZ2h0cy5wdXNoKGxpZ2h0KTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHQrK3RoaXMuX3BOdW1EaXJlY3Rpb25hbExpZ2h0cztcblx0XHRcdC0tdGhpcy5fcE51bUNhc3RpbmdEaXJlY3Rpb25hbExpZ2h0cztcblxuXHRcdFx0dGhpcy5fcENhc3RpbmdEaXJlY3Rpb25hbExpZ2h0cy5zcGxpY2UodGhpcy5fcENhc3RpbmdEaXJlY3Rpb25hbExpZ2h0cy5pbmRleE9mKGRsKSwgMSk7XG5cdFx0XHR0aGlzLl9wRGlyZWN0aW9uYWxMaWdodHMucHVzaChsaWdodCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCB3aGVuIGEgcG9pbnQgbGlnaHQncyBzaGFkb3cgY2FzdGluZyBjb25maWd1cmF0aW9uIGNoYW5nZXMuXG5cdCAqL1xuXHRwcml2YXRlIHVwZGF0ZVBvaW50Q2FzdGluZyhsaWdodDpQb2ludExpZ2h0KVxuXHR7XG5cdFx0dmFyIHBsOlBvaW50TGlnaHQgPSA8UG9pbnRMaWdodD4gbGlnaHQ7XG5cblx0XHRpZiAobGlnaHQuY2FzdHNTaGFkb3dzKSB7XG5cdFx0XHQtLXRoaXMuX3BOdW1Qb2ludExpZ2h0cztcblx0XHRcdCsrdGhpcy5fcE51bUNhc3RpbmdQb2ludExpZ2h0cztcblx0XHRcdHRoaXMuX3BQb2ludExpZ2h0cy5zcGxpY2UodGhpcy5fcFBvaW50TGlnaHRzLmluZGV4T2YocGwpLCAxKTtcblx0XHRcdHRoaXMuX3BDYXN0aW5nUG9pbnRMaWdodHMucHVzaChsaWdodCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCsrdGhpcy5fcE51bVBvaW50TGlnaHRzO1xuXHRcdFx0LS10aGlzLl9wTnVtQ2FzdGluZ1BvaW50TGlnaHRzO1xuXG5cdFx0XHR0aGlzLl9wQ2FzdGluZ1BvaW50TGlnaHRzLnNwbGljZSh0aGlzLl9wQ2FzdGluZ1BvaW50TGlnaHRzLmluZGV4T2YocGwpLCAxKTtcblx0XHRcdHRoaXMuX3BQb2ludExpZ2h0cy5wdXNoKGxpZ2h0KTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0ID0gU3RhdGljTGlnaHRQaWNrZXI7Il19