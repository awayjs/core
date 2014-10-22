var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CollectorBase = require("awayjs-core/lib/core/traverse/CollectorBase");

/**
* @class away.traverse.EntityCollector
*/
var EntityCollector = (function (_super) {
    __extends(EntityCollector, _super);
    function EntityCollector() {
        _super.call(this);
        this._pNumLights = 0;
        this._numDirectionalLights = 0;
        this._numPointLights = 0;
        this._numLightProbes = 0;

        this._pLights = new Array();
        this._directionalLights = new Array();
        this._pointLights = new Array();
        this._lightProbes = new Array();
    }
    Object.defineProperty(EntityCollector.prototype, "directionalLights", {
        /**
        *
        */
        get: function () {
            return this._directionalLights;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(EntityCollector.prototype, "lightProbes", {
        /**
        *
        */
        get: function () {
            return this._lightProbes;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(EntityCollector.prototype, "lights", {
        /**
        *
        */
        get: function () {
            return this._pLights;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(EntityCollector.prototype, "pointLights", {
        /**
        *
        */
        get: function () {
            return this._pointLights;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(EntityCollector.prototype, "skyBox", {
        /**
        *
        */
        get: function () {
            return this._pSkybox;
        },
        enumerable: true,
        configurable: true
    });

    /**
    *
    * @param entity
    */
    EntityCollector.prototype.applyDirectionalLight = function (entity) {
        this._directionalLights[this._numDirectionalLights++] = entity;
    };

    /**
    *
    * @param entity
    */
    EntityCollector.prototype.applyLightProbe = function (entity) {
        this._lightProbes[this._numLightProbes++] = entity;
    };

    /**
    *
    * @param entity
    */
    EntityCollector.prototype.applyPointLight = function (entity) {
        this._pointLights[this._numPointLights++] = entity;
    };

    /**
    *
    * @param entity
    */
    EntityCollector.prototype.applySkybox = function (entity) {
        this._pSkybox = entity;
    };

    /**
    *
    */
    EntityCollector.prototype.clear = function () {
        _super.prototype.clear.call(this);

        this._pSkybox = null;

        if (this._pNumLights > 0)
            this._pLights.length = this._pNumLights = 0;

        if (this._numDirectionalLights > 0)
            this._directionalLights.length = this._numDirectionalLights = 0;

        if (this._numPointLights > 0)
            this._pointLights.length = this._numPointLights = 0;

        if (this._numLightProbes > 0)
            this._lightProbes.length = this._numLightProbes = 0;
    };
    return EntityCollector;
})(CollectorBase);

module.exports = EntityCollector;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvdHJhdmVyc2UvRW50aXR5Q29sbGVjdG9yLnRzIl0sIm5hbWVzIjpbIkVudGl0eUNvbGxlY3RvciIsIkVudGl0eUNvbGxlY3Rvci5jb25zdHJ1Y3RvciIsIkVudGl0eUNvbGxlY3Rvci5hcHBseURpcmVjdGlvbmFsTGlnaHQiLCJFbnRpdHlDb2xsZWN0b3IuYXBwbHlMaWdodFByb2JlIiwiRW50aXR5Q29sbGVjdG9yLmFwcGx5UG9pbnRMaWdodCIsIkVudGl0eUNvbGxlY3Rvci5hcHBseVNreWJveCIsIkVudGl0eUNvbGxlY3Rvci5jbGVhciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMEVBQ2lGOztBQU9qRjs7RUFFRztBQUNIO0lBQThCQSxrQ0FBYUE7SUFzRDFDQTtRQUVDQyxXQUFNQSxLQUFBQSxDQUFDQTtRQWhEUkEsS0FBT0EsV0FBV0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFFOUJBLEtBQVFBLHFCQUFxQkEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDekNBLEtBQVFBLGVBQWVBLEdBQVVBLENBQUNBLENBQUNBO1FBQ25DQSxLQUFRQSxlQUFlQSxHQUFVQSxDQUFDQSxDQUFDQTs7UUE4Q2xDQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFZQSxDQUFDQTtRQUN0Q0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFtQkEsQ0FBQ0E7UUFDdkRBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLEtBQUtBLENBQWFBLENBQUNBO1FBQzNDQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFhQSxDQUFDQTtJQUM1Q0EsQ0FBQ0E7SUE3Q0REO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxrQkFBa0JBO1FBQy9CQSxDQUFDQTs7OztBQUFBQTtJQUtEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUE7UUFDekJBLENBQUNBOzs7O0FBQUFBO0lBS0RBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxRQUFRQTtRQUNyQkEsQ0FBQ0E7Ozs7QUFBQUE7SUFLREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFlBQVlBO1FBQ3pCQSxDQUFDQTs7OztBQUFBQTtJQUtEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsUUFBUUE7UUFDckJBLENBQUNBOzs7O0FBQUFBO0lBZ0JEQTs7O01BREdBO3NEQUNIQSxVQUE2QkEsTUFBY0E7UUFFMUNFLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBRUEsSUFBSUEsQ0FBQ0EscUJBQXFCQSxFQUFFQSxDQUFFQSxHQUFzQkEsTUFBTUE7SUFDcEZBLENBQUNBOztJQU1ERjs7O01BREdBO2dEQUNIQSxVQUF1QkEsTUFBY0E7UUFFcENHLElBQUlBLENBQUNBLFlBQVlBLENBQUVBLElBQUlBLENBQUNBLGVBQWVBLEVBQUVBLENBQUVBLEdBQWdCQSxNQUFNQTtJQUNsRUEsQ0FBQ0E7O0lBTURIOzs7TUFER0E7Z0RBQ0hBLFVBQXVCQSxNQUFjQTtRQUVwQ0ksSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBRUEsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBRUEsR0FBZ0JBLE1BQU1BO0lBQ2xFQSxDQUFDQTs7SUFNREo7OztNQURHQTs0Q0FDSEEsVUFBbUJBLE1BQWNBO1FBRWhDSyxJQUFJQSxDQUFDQSxRQUFRQSxHQUFZQSxNQUFNQTtJQUNoQ0EsQ0FBQ0E7O0lBS0RMOztNQURHQTtzQ0FDSEE7UUFFQ00sZ0JBQUtBLENBQUNBLEtBQUtBLEtBQUNBLEtBQUFBLENBQUNBOztRQUViQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQTs7UUFFcEJBLElBQUlBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLENBQUNBO1lBQ3ZCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxDQUFDQSxDQUFDQTs7UUFFN0NBLElBQUlBLElBQUlBLENBQUNBLHFCQUFxQkEsR0FBR0EsQ0FBQ0E7WUFDakNBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EscUJBQXFCQSxHQUFHQSxDQUFDQSxDQUFDQTs7UUFFakVBLElBQUlBLElBQUlBLENBQUNBLGVBQWVBLEdBQUdBLENBQUNBO1lBQzNCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxDQUFDQSxDQUFDQTs7UUFFckRBLElBQUlBLElBQUlBLENBQUNBLGVBQWVBLEdBQUdBLENBQUNBO1lBQzNCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxDQUFDQSxDQUFDQTtJQUN0REEsQ0FBQ0E7SUFDRk4sdUJBQUNBO0FBQURBLENBQUNBLEVBekg2QixhQUFhLEVBeUgxQzs7QUFFRCxnQ0FBeUIsQ0FBQSIsImZpbGUiOiJjb3JlL3RyYXZlcnNlL0VudGl0eUNvbGxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaWdodEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9MaWdodEJhc2VcIik7XG5pbXBvcnQgQ29sbGVjdG9yQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvdHJhdmVyc2UvQ29sbGVjdG9yQmFzZVwiKTtcbmltcG9ydCBEaXJlY3Rpb25hbExpZ2h0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZW50aXRpZXMvRGlyZWN0aW9uYWxMaWdodFwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5pbXBvcnQgTGlnaHRQcm9iZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZW50aXRpZXMvTGlnaHRQcm9iZVwiKTtcbmltcG9ydCBQb2ludExpZ2h0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9Qb2ludExpZ2h0XCIpO1xuaW1wb3J0IFNreWJveFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9Ta3lib3hcIik7XG5cbi8qKlxuICogQGNsYXNzIGF3YXkudHJhdmVyc2UuRW50aXR5Q29sbGVjdG9yXG4gKi9cbmNsYXNzIEVudGl0eUNvbGxlY3RvciBleHRlbmRzIENvbGxlY3RvckJhc2Vcbntcblx0cHVibGljIF9wU2t5Ym94OlNreWJveDtcblx0cHVibGljIF9wTGlnaHRzOkFycmF5PExpZ2h0QmFzZT47XG5cdHByaXZhdGUgX2RpcmVjdGlvbmFsTGlnaHRzOkFycmF5PERpcmVjdGlvbmFsTGlnaHQ+O1xuXHRwcml2YXRlIF9wb2ludExpZ2h0czpBcnJheTxQb2ludExpZ2h0Pjtcblx0cHJpdmF0ZSBfbGlnaHRQcm9iZXM6QXJyYXk8TGlnaHRQcm9iZT47XG5cblx0cHVibGljIF9wTnVtTGlnaHRzOm51bWJlciA9IDA7XG5cblx0cHJpdmF0ZSBfbnVtRGlyZWN0aW9uYWxMaWdodHM6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfbnVtUG9pbnRMaWdodHM6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfbnVtTGlnaHRQcm9iZXM6bnVtYmVyID0gMDtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgZGlyZWN0aW9uYWxMaWdodHMoKTpBcnJheTxEaXJlY3Rpb25hbExpZ2h0PlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RpcmVjdGlvbmFsTGlnaHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGxpZ2h0UHJvYmVzKCk6QXJyYXk8TGlnaHRQcm9iZT5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9saWdodFByb2Jlcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBsaWdodHMoKTpBcnJheTxMaWdodEJhc2U+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcExpZ2h0cztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBwb2ludExpZ2h0cygpOkFycmF5PFBvaW50TGlnaHQ+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcG9pbnRMaWdodHM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgc2t5Qm94KCk6U2t5Ym94XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFNreWJveDtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9wTGlnaHRzID0gbmV3IEFycmF5PExpZ2h0QmFzZT4oKTtcblx0XHR0aGlzLl9kaXJlY3Rpb25hbExpZ2h0cyA9IG5ldyBBcnJheTxEaXJlY3Rpb25hbExpZ2h0PigpO1xuXHRcdHRoaXMuX3BvaW50TGlnaHRzID0gbmV3IEFycmF5PFBvaW50TGlnaHQ+KCk7XG5cdFx0dGhpcy5fbGlnaHRQcm9iZXMgPSBuZXcgQXJyYXk8TGlnaHRQcm9iZT4oKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gZW50aXR5XG5cdCAqL1xuXHRwdWJsaWMgYXBwbHlEaXJlY3Rpb25hbExpZ2h0KGVudGl0eTpJRW50aXR5KVxuXHR7XG5cdFx0dGhpcy5fZGlyZWN0aW9uYWxMaWdodHNbIHRoaXMuX251bURpcmVjdGlvbmFsTGlnaHRzKysgXSA9IDxEaXJlY3Rpb25hbExpZ2h0PiBlbnRpdHk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGVudGl0eVxuXHQgKi9cblx0cHVibGljIGFwcGx5TGlnaHRQcm9iZShlbnRpdHk6SUVudGl0eSlcblx0e1xuXHRcdHRoaXMuX2xpZ2h0UHJvYmVzWyB0aGlzLl9udW1MaWdodFByb2JlcysrIF0gPSA8TGlnaHRQcm9iZT4gZW50aXR5O1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBlbnRpdHlcblx0ICovXG5cdHB1YmxpYyBhcHBseVBvaW50TGlnaHQoZW50aXR5OklFbnRpdHkpXG5cdHtcblx0XHR0aGlzLl9wb2ludExpZ2h0c1sgdGhpcy5fbnVtUG9pbnRMaWdodHMrKyBdID0gPFBvaW50TGlnaHQ+IGVudGl0eTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gZW50aXR5XG5cdCAqL1xuXHRwdWJsaWMgYXBwbHlTa3lib3goZW50aXR5OklFbnRpdHkpXG5cdHtcblx0XHR0aGlzLl9wU2t5Ym94ID0gPFNreWJveD4gZW50aXR5O1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgY2xlYXIoKVxuXHR7XG5cdFx0c3VwZXIuY2xlYXIoKTtcblxuXHRcdHRoaXMuX3BTa3lib3ggPSBudWxsO1xuXG5cdFx0aWYgKHRoaXMuX3BOdW1MaWdodHMgPiAwKVxuXHRcdFx0dGhpcy5fcExpZ2h0cy5sZW5ndGggPSB0aGlzLl9wTnVtTGlnaHRzID0gMDtcblxuXHRcdGlmICh0aGlzLl9udW1EaXJlY3Rpb25hbExpZ2h0cyA+IDApXG5cdFx0XHR0aGlzLl9kaXJlY3Rpb25hbExpZ2h0cy5sZW5ndGggPSB0aGlzLl9udW1EaXJlY3Rpb25hbExpZ2h0cyA9IDA7XG5cblx0XHRpZiAodGhpcy5fbnVtUG9pbnRMaWdodHMgPiAwKVxuXHRcdFx0dGhpcy5fcG9pbnRMaWdodHMubGVuZ3RoID0gdGhpcy5fbnVtUG9pbnRMaWdodHMgPSAwO1xuXG5cdFx0aWYgKHRoaXMuX251bUxpZ2h0UHJvYmVzID4gMClcblx0XHRcdHRoaXMuX2xpZ2h0UHJvYmVzLmxlbmd0aCA9IHRoaXMuX251bUxpZ2h0UHJvYmVzID0gMDtcblx0fVxufVxuXG5leHBvcnQgPSBFbnRpdHlDb2xsZWN0b3I7Il19