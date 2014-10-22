var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");

var SceneEvent = (function (_super) {
    __extends(SceneEvent, _super);
    function SceneEvent(type, displayObject) {
        _super.call(this, type);

        this.displayObject = displayObject;
    }
    SceneEvent.ADDED_TO_SCENE = "addedToScene";

    SceneEvent.REMOVED_FROM_SCENE = "removedFromScene";

    SceneEvent.PARTITION_CHANGED = "partitionChanged";
    return SceneEvent;
})(Event);

module.exports = SceneEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9TY2VuZUV2ZW50LnRzIl0sIm5hbWVzIjpbIlNjZW5lRXZlbnQiLCJTY2VuZUV2ZW50LmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFDMkQ7O0FBRTNEO0lBQXlCQSw2QkFBS0E7SUFzQjdCQSxvQkFBWUEsSUFBV0EsRUFBRUEsYUFBMkJBO1FBRW5EQyxXQUFNQSxPQUFBQSxJQUFJQSxDQUFDQTs7UUFFWEEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsYUFBYUE7SUFDbkNBLENBQUNBO0lBdEJERCw0QkFBc0NBLGNBQWNBOztJQUtwREEsZ0NBQTBDQSxrQkFBa0JBOztJQUs1REEsK0JBQXlDQSxrQkFBa0JBO0lBYTVEQSxrQkFBQ0E7QUFBREEsQ0FBQ0EsRUE1QndCLEtBQUssRUE0QjdCOztBQUVELDJCQUFvQixDQUFBIiwiZmlsZSI6ImV2ZW50cy9TY2VuZUV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcblxuY2xhc3MgU2NlbmVFdmVudCBleHRlbmRzIEV2ZW50XG57XG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBBRERFRF9UT19TQ0VORTpzdHJpbmcgPSBcImFkZGVkVG9TY2VuZVwiO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBSRU1PVkVEX0ZST01fU0NFTkU6c3RyaW5nID0gXCJyZW1vdmVkRnJvbVNjZW5lXCI7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIFBBUlRJVElPTl9DSEFOR0VEOnN0cmluZyA9IFwicGFydGl0aW9uQ2hhbmdlZFwiO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRpc3BsYXlPYmplY3Q6RGlzcGxheU9iamVjdDtcblxuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZywgZGlzcGxheU9iamVjdDpEaXNwbGF5T2JqZWN0KVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cblx0XHR0aGlzLmRpc3BsYXlPYmplY3QgPSBkaXNwbGF5T2JqZWN0O1xuXHR9XG59XG5cbmV4cG9ydCA9IFNjZW5lRXZlbnQ7Il19