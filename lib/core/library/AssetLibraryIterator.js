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
            /*
            for each (asset in _assets) {
            // Skip this assets if filtering on type and this is wrong type
            if (assetTypeFilter && asset.assetType != assetTypeFilter)
            continue;
            
            // Skip this asset if filtering on namespace and this is wrong namespace
            if (namespaceFilter && asset.assetNamespace != namespaceFilter)
            continue;
            
            // Skip this asset if a filter func has been provided and it returns false
            if (filterFunc != null && !filterFunc(asset))
            continue;
            
            _filtered[idx++] = asset;
            }
            */
        } else {
            this._filtered = this._assets;
        }
    };
    return AssetLibraryIterator;
})();

module.exports = AssetLibraryIterator;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbGlicmFyeS9Bc3NldExpYnJhcnlJdGVyYXRvci50cyJdLCJuYW1lcyI6WyJBc3NldExpYnJhcnlJdGVyYXRvciIsIkFzc2V0TGlicmFyeUl0ZXJhdG9yLmNvbnN0cnVjdG9yIiwiQXNzZXRMaWJyYXJ5SXRlcmF0b3IubmV4dCIsIkFzc2V0TGlicmFyeUl0ZXJhdG9yLnJlc2V0IiwiQXNzZXRMaWJyYXJ5SXRlcmF0b3Iuc2V0SW5kZXgiLCJBc3NldExpYnJhcnlJdGVyYXRvci5maWx0ZXIiXSwibWFwcGluZ3MiOiJBQUFBO0lBVUNBLDhCQUFZQSxNQUFvQkEsRUFBRUEsZUFBc0JBLEVBQUVBLGVBQXNCQSxFQUFFQSxVQUFVQTtRQUUzRkMsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUE7UUFDckJBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLGVBQWVBLEVBQUVBLGVBQWVBLEVBQUVBLFVBQVVBLENBQUNBO0lBQzFEQSxDQUFDQTtJQUVERDtRQUFBQSxLQUFBQTtZQUVDQSx3Q0FBd0NBO1lBQ3hDQSxPQUFPQSxDQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFFQSxHQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFFQSxHQUFHQSxJQUFJQTtRQUNqRkEsQ0FBQ0E7Ozs7QUFBQUE7SUFFREE7UUFBQUEsS0FBQUE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUE7UUFDN0JBLENBQUNBOzs7O0FBQUFBO0lBRURBLHNDQUFBQTtRQUVDRSxJQUFJQSxJQUFJQSxHQUFVQSxJQUFJQTs7UUFFdEJBLElBQUlBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BO1lBQ3BDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTs7UUFFbENBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBOztRQUVYQSxPQUFPQSxJQUFJQTtJQUNaQSxDQUFDQTs7SUFFREYsdUNBQUFBO1FBRUNHLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBO0lBQ2RBLENBQUNBOztJQUVESCwwQ0FBQUEsVUFBZ0JBLEtBQVlBO1FBRTNCSSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQTtJQUNsQkEsQ0FBQ0E7O0lBRURKLHdDQUFBQSxVQUFlQSxlQUFzQkEsRUFBRUEsZUFBc0JBLEVBQUVBLFVBQVVBO1FBRXhFSyxJQUFJQSxlQUFlQSxJQUFJQSxlQUFlQSxDQUFFQTtZQUV2Q0EsSUFBSUEsR0FBR0E7WUFDUEEsSUFBSUEsS0FBS0E7O1lBR1RBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ1BBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLENBQUNBLEVBQUNBLHNCQUFzQkE7O1lBRTNEQSxJQUFJQSxDQUFDQSxHQUFVQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQTs7WUFFbENBLEtBQUtBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUVBO2dCQUVsQ0EsS0FBS0EsR0FBWUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O2dCQUVoQ0EsK0RBQStEQTtnQkFDL0RBLElBQUlBLGVBQWVBLElBQUlBLEtBQUtBLENBQUNBLFNBQVNBLElBQUlBLGVBQWVBO29CQUN4REEsUUFBU0EsQ0FBQUE7O2dCQUVWQSx3RUFBd0VBO2dCQUN4RUEsSUFBSUEsZUFBZUEsSUFBSUEsS0FBS0EsQ0FBQ0EsY0FBY0EsSUFBSUEsZUFBZUE7b0JBQzdEQSxRQUFTQSxDQUFBQTs7Z0JBRVZBLDBFQUEwRUE7Z0JBQzFFQSxJQUFJQSxVQUFVQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxDQUFDQTtvQkFDM0NBLFFBQVNBLENBQUFBOztnQkFFVkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsR0FBR0EsS0FBS0E7YUFFN0JBO1lBRURBOzs7Ozs7Ozs7Ozs7Ozs7O2NBZ0JHQTtTQUVIQSxLQUFNQTtZQUNOQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQTtTQUM3QkE7SUFDRkEsQ0FBQ0E7SUFDRkwsNEJBQUNBO0FBQURBLENBQUNBLElBQUE7O0FBRUQscUNBQThCLENBQUEiLCJmaWxlIjoiY29yZS9saWJyYXJ5L0Fzc2V0TGlicmFyeUl0ZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0lBc3NldFwiKTtcblxuY2xhc3MgQXNzZXRMaWJyYXJ5SXRlcmF0b3JcbntcblxuXHRwcml2YXRlICBfYXNzZXRzOkFycmF5PElBc3NldD47XG5cdHByaXZhdGUgX2ZpbHRlcmVkOkFycmF5PElBc3NldD47XG5cblx0cHJpdmF0ZSBfaWR4Om51bWJlcjtcblxuXHRjb25zdHJ1Y3Rvcihhc3NldHM6QXJyYXk8SUFzc2V0PiwgYXNzZXRUeXBlRmlsdGVyOnN0cmluZywgbmFtZXNwYWNlRmlsdGVyOnN0cmluZywgZmlsdGVyRnVuYylcblx0e1xuXHRcdHRoaXMuX2Fzc2V0cyA9IGFzc2V0cztcblx0XHR0aGlzLmZpbHRlcihhc3NldFR5cGVGaWx0ZXIsIG5hbWVzcGFjZUZpbHRlciwgZmlsdGVyRnVuYyk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGN1cnJlbnRBc3NldCgpOklBc3NldFxuXHR7XG5cdFx0Ly8gUmV0dXJuIGN1cnJlbnQsIG9yIG51bGwgaWYgbm8gY3VycmVudFxuXHRcdHJldHVybiAoIHRoaXMuX2lkeCA8IHRoaXMuX2ZpbHRlcmVkLmxlbmd0aCApPyB0aGlzLl9maWx0ZXJlZFsgdGhpcy5faWR4IF0gOiBudWxsO1xuXHR9XG5cblx0cHVibGljIGdldCBudW1Bc3NldHMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9maWx0ZXJlZC5sZW5ndGg7XG5cdH1cblxuXHRwdWJsaWMgbmV4dCgpOklBc3NldFxuXHR7XG5cdFx0dmFyIG5leHQ6SUFzc2V0ID0gbnVsbDtcblxuXHRcdGlmICh0aGlzLl9pZHggPCB0aGlzLl9maWx0ZXJlZC5sZW5ndGgpXG5cdFx0XHRuZXh0ID0gdGhpcy5fZmlsdGVyZWRbdGhpcy5faWR4XTtcblxuXHRcdHRoaXMuX2lkeCsrO1xuXG5cdFx0cmV0dXJuIG5leHQ7XG5cdH1cblxuXHRwdWJsaWMgcmVzZXQoKVxuXHR7XG5cdFx0dGhpcy5faWR4ID0gMDtcblx0fVxuXG5cdHB1YmxpYyBzZXRJbmRleChpbmRleDpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9pZHggPSBpbmRleDtcblx0fVxuXG5cdHByaXZhdGUgZmlsdGVyKGFzc2V0VHlwZUZpbHRlcjpzdHJpbmcsIG5hbWVzcGFjZUZpbHRlcjpzdHJpbmcsIGZpbHRlckZ1bmMpXG5cdHtcblx0XHRpZiAoYXNzZXRUeXBlRmlsdGVyIHx8IG5hbWVzcGFjZUZpbHRlcikge1xuXG5cdFx0XHR2YXIgaWR4Om51bWJlcjtcblx0XHRcdHZhciBhc3NldDpJQXNzZXQ7XG5cblxuXHRcdFx0aWR4ID0gMDtcblx0XHRcdHRoaXMuX2ZpbHRlcmVkID0gbmV3IEFycmF5PElBc3NldD4oKTsvL25ldyBWZWN0b3IuPElBc3NldD47XG5cblx0XHRcdHZhciBsOm51bWJlciA9IHRoaXMuX2Fzc2V0cy5sZW5ndGg7XG5cblx0XHRcdGZvciAodmFyIGM6bnVtYmVyID0gMDsgYyA8IGw7IGMrKykge1xuXG5cdFx0XHRcdGFzc2V0ID0gPElBc3NldD4gdGhpcy5fYXNzZXRzW2NdO1xuXG5cdFx0XHRcdC8vIFNraXAgdGhpcyBhc3NldHMgaWYgZmlsdGVyaW5nIG9uIHR5cGUgYW5kIHRoaXMgaXMgd3JvbmcgdHlwZVxuXHRcdFx0XHRpZiAoYXNzZXRUeXBlRmlsdGVyICYmIGFzc2V0LmFzc2V0VHlwZSAhPSBhc3NldFR5cGVGaWx0ZXIpXG5cdFx0XHRcdFx0Y29udGludWU7XG5cblx0XHRcdFx0Ly8gU2tpcCB0aGlzIGFzc2V0IGlmIGZpbHRlcmluZyBvbiBuYW1lc3BhY2UgYW5kIHRoaXMgaXMgd3JvbmcgbmFtZXNwYWNlXG5cdFx0XHRcdGlmIChuYW1lc3BhY2VGaWx0ZXIgJiYgYXNzZXQuYXNzZXROYW1lc3BhY2UgIT0gbmFtZXNwYWNlRmlsdGVyKVxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXG5cdFx0XHRcdC8vIFNraXAgdGhpcyBhc3NldCBpZiBhIGZpbHRlciBmdW5jIGhhcyBiZWVuIHByb3ZpZGVkIGFuZCBpdCByZXR1cm5zIGZhbHNlXG5cdFx0XHRcdGlmIChmaWx0ZXJGdW5jICE9IG51bGwgJiYgIWZpbHRlckZ1bmMoYXNzZXQpKVxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXG5cdFx0XHRcdHRoaXMuX2ZpbHRlcmVkW2lkeCsrXSA9IGFzc2V0O1xuXG5cdFx0XHR9XG5cblx0XHRcdC8qXG5cdFx0XHQgZm9yIGVhY2ggKGFzc2V0IGluIF9hc3NldHMpIHtcblx0XHRcdCAvLyBTa2lwIHRoaXMgYXNzZXRzIGlmIGZpbHRlcmluZyBvbiB0eXBlIGFuZCB0aGlzIGlzIHdyb25nIHR5cGVcblx0XHRcdCBpZiAoYXNzZXRUeXBlRmlsdGVyICYmIGFzc2V0LmFzc2V0VHlwZSAhPSBhc3NldFR5cGVGaWx0ZXIpXG5cdFx0XHQgY29udGludWU7XG5cblx0XHRcdCAvLyBTa2lwIHRoaXMgYXNzZXQgaWYgZmlsdGVyaW5nIG9uIG5hbWVzcGFjZSBhbmQgdGhpcyBpcyB3cm9uZyBuYW1lc3BhY2Vcblx0XHRcdCBpZiAobmFtZXNwYWNlRmlsdGVyICYmIGFzc2V0LmFzc2V0TmFtZXNwYWNlICE9IG5hbWVzcGFjZUZpbHRlcilcblx0XHRcdCBjb250aW51ZTtcblxuXHRcdFx0IC8vIFNraXAgdGhpcyBhc3NldCBpZiBhIGZpbHRlciBmdW5jIGhhcyBiZWVuIHByb3ZpZGVkIGFuZCBpdCByZXR1cm5zIGZhbHNlXG5cdFx0XHQgaWYgKGZpbHRlckZ1bmMgIT0gbnVsbCAmJiAhZmlsdGVyRnVuYyhhc3NldCkpXG5cdFx0XHQgY29udGludWU7XG5cblx0XHRcdCBfZmlsdGVyZWRbaWR4KytdID0gYXNzZXQ7XG5cdFx0XHQgfVxuXHRcdFx0ICovXG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fZmlsdGVyZWQgPSB0aGlzLl9hc3NldHM7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCA9IEFzc2V0TGlicmFyeUl0ZXJhdG9yOyJdfQ==