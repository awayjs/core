var ByteArray = require("awayjs-core/lib/utils/ByteArray");

var ParserUtils = (function () {
    function ParserUtils() {
    }
    /**
    * Converts an ArrayBuffer to a base64 string
    *
    * @param image data as a ByteArray
    *
    * @return HTMLImageElement
    *
    */
    ParserUtils.arrayBufferToImage = function (data) {
        var byteStr = '';
        var bytes = new Uint8Array(data);
        var len = bytes.byteLength;

        for (var i = 0; i < len; i++)
            byteStr += String.fromCharCode(bytes[i]);

        var base64Image = window.btoa(byteStr);
        var str = 'data:image/png;base64,' + base64Image;
        var img = new Image();
        img.src = str;

        return img;
    };

    /**
    * Converts an ByteArray to an Image - returns an HTMLImageElement
    *
    * @param image data as a ByteArray
    *
    * @return HTMLImageElement
    *
    */
    ParserUtils.byteArrayToImage = function (data) {
        var byteStr = '';
        var bytes = new Uint8Array(data.arraybytes);
        var len = bytes.byteLength;

        for (var i = 0; i < len; i++)
            byteStr += String.fromCharCode(bytes[i]);

        var base64Image = window.btoa(byteStr);
        var str = 'data:image/png;base64,' + base64Image;
        var img = new Image();
        img.src = str;

        return img;
    };

    /**
    * Converts an Blob to an Image - returns an HTMLImageElement
    *
    * @param image data as a Blob
    *
    * @return HTMLImageElement
    *
    */
    ParserUtils.blobToImage = function (data) {
        var URLObj = window['URL'] || window['webkitURL'];
        var src = URLObj.createObjectURL(data);
        var img = new Image();
        img.src = src;

        return img;
    };

    /**
    * Returns a object as ByteArray, if possible.
    *
    * @param data The object to return as ByteArray
    *
    * @return The ByteArray or null
    *
    */
    ParserUtils.toByteArray = function (data) {
        var b = new ByteArray();
        b.setArrayBuffer(data);
        return b;
    };

    /**
    * Returns a object as String, if possible.
    *
    * @param data The object to return as String
    * @param length The length of the returned String
    *
    * @return The String or null
    *
    */
    ParserUtils.toString = function (data, length) {
        if (typeof length === "undefined") { length = 0; }
        if (typeof data === 'string') {
            var s = data;

            if (s['substr'] != null)
                return s.substr(0, s.length);
        }

        if (data instanceof ByteArray) {
            var ba = data;
            ba.position = 0;
            return ba.readUTFBytes(Math.min(ba.getBytesAvailable(), length));
        }

        return null;
        /*
        var ba:ByteArray;
        
        length ||= uint.MAX_VALUE;
        
        if (data is String)
        return String(data).substr(0, length);
        
        ba = toByteArray(data);
        if (ba) {
        ba.position = 0;
        return ba.readUTFBytes(Math.min(ba.bytesAvailable, length));
        }
        
        return null;
        
        */
    };
    return ParserUtils;
})();

module.exports = ParserUtils;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlcnMvUGFyc2VyVXRpbHMudHMiXSwibmFtZXMiOlsiUGFyc2VyVXRpbHMiLCJQYXJzZXJVdGlscy5jb25zdHJ1Y3RvciIsIlBhcnNlclV0aWxzLmFycmF5QnVmZmVyVG9JbWFnZSIsIlBhcnNlclV0aWxzLmJ5dGVBcnJheVRvSW1hZ2UiLCJQYXJzZXJVdGlscy5ibG9iVG9JbWFnZSIsIlBhcnNlclV0aWxzLnRvQnl0ZUFycmF5IiwiUGFyc2VyVXRpbHMudG9TdHJpbmciXSwibWFwcGluZ3MiOiJBQUFBLDBEQUFpRTs7QUFFakU7SUFBQUE7SUFvSUFDLENBQUNBO0FBQUFELElBekhBQTs7Ozs7OztNQURHQTtxQ0FDSEEsVUFBaUNBLElBQWdCQTtRQUVoREUsSUFBSUEsT0FBT0EsR0FBVUEsRUFBRUE7UUFDdkJBLElBQUlBLEtBQUtBLEdBQWNBLElBQUlBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBO1FBQzNDQSxJQUFJQSxHQUFHQSxHQUFVQSxLQUFLQSxDQUFDQSxVQUFVQTs7UUFFakNBLEtBQUtBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBO1lBQzNCQSxPQUFPQSxJQUFJQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFFQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFBQTs7UUFFM0NBLElBQUlBLFdBQVdBLEdBQVVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1FBQzdDQSxJQUFJQSxHQUFHQSxHQUFVQSx3QkFBd0JBLEdBQUdBLFdBQVdBO1FBQ3ZEQSxJQUFJQSxHQUFHQSxHQUF1Q0EsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDekRBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBOztRQUViQSxPQUFPQSxHQUFHQTtJQUNYQSxDQUFDQTs7SUFVREY7Ozs7Ozs7TUFER0E7bUNBQ0hBLFVBQStCQSxJQUFjQTtRQUU1Q0csSUFBSUEsT0FBT0EsR0FBVUEsRUFBRUE7UUFDdkJBLElBQUlBLEtBQUtBLEdBQWNBLElBQUlBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1FBQ3REQSxJQUFJQSxHQUFHQSxHQUFVQSxLQUFLQSxDQUFDQSxVQUFVQTs7UUFFakNBLEtBQUtBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBO1lBQzNCQSxPQUFPQSxJQUFJQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFFQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFBQTs7UUFFM0NBLElBQUlBLFdBQVdBLEdBQVVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1FBQzdDQSxJQUFJQSxHQUFHQSxHQUFVQSx3QkFBd0JBLEdBQUdBLFdBQVdBO1FBQ3ZEQSxJQUFJQSxHQUFHQSxHQUF1Q0EsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDekRBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBOztRQUViQSxPQUFPQSxHQUFHQTtJQUNYQSxDQUFDQTs7SUFVREg7Ozs7Ozs7TUFER0E7OEJBQ0hBLFVBQTBCQSxJQUFTQTtRQUVsQ0ksSUFBSUEsTUFBTUEsR0FBT0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7UUFDckRBLElBQUlBLEdBQUdBLEdBQUdBLE1BQU1BLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBO1FBQ3RDQSxJQUFJQSxHQUFHQSxHQUF1Q0EsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDekRBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBOztRQUViQSxPQUFPQSxHQUFHQTtJQUNYQSxDQUFDQTs7SUFVREo7Ozs7Ozs7TUFER0E7OEJBQ0hBLFVBQTBCQSxJQUFRQTtRQUVqQ0ssSUFBSUEsQ0FBQ0EsR0FBYUEsSUFBSUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDakNBLENBQUNBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBO1FBQ3RCQSxPQUFPQSxDQUFDQTtJQUNUQSxDQUFDQTs7SUFXREw7Ozs7Ozs7O01BREdBOzJCQUNIQSxVQUF1QkEsSUFBUUEsRUFBRUEsTUFBaUJBO1FBQWpCTSxxQ0FBQUEsTUFBTUEsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFHakRBLElBQUlBLE9BQU9BLElBQUlBLEtBQUtBLFFBQVFBLENBQUVBO1lBQzdCQSxJQUFJQSxDQUFDQSxHQUFtQkEsSUFBSUE7O1lBRTVCQSxJQUFJQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxJQUFJQTtnQkFDdEJBLE9BQU9BLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1NBQzlCQTs7UUFFREEsSUFBSUEsSUFBSUEsWUFBWUEsU0FBU0EsQ0FBRUE7WUFDOUJBLElBQUlBLEVBQUVBLEdBQXlCQSxJQUFJQTtZQUNuQ0EsRUFBRUEsQ0FBQ0EsUUFBUUEsR0FBR0EsQ0FBQ0E7WUFDZkEsT0FBT0EsRUFBRUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtTQUNoRUE7O1FBRURBLE9BQU9BLElBQUlBO1FBRVhBOzs7Ozs7Ozs7Ozs7Ozs7O1VBZ0JHQTtJQUVKQSxDQUFDQTtJQUNGTixtQkFBQ0E7QUFBREEsQ0FBQ0EsSUFBQTs7QUFFRCw0QkFBcUIsQ0FBQSIsImZpbGUiOiJwYXJzZXJzL1BhcnNlclV0aWxzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJ5dGVBcnJheVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL0J5dGVBcnJheVwiKTtcblxuY2xhc3MgUGFyc2VyVXRpbHNcbntcblxuXHQvKipcblx0ICogQ29udmVydHMgYW4gQXJyYXlCdWZmZXIgdG8gYSBiYXNlNjQgc3RyaW5nXG5cdCAqXG5cdCAqIEBwYXJhbSBpbWFnZSBkYXRhIGFzIGEgQnl0ZUFycmF5XG5cdCAqXG5cdCAqIEByZXR1cm4gSFRNTEltYWdlRWxlbWVudFxuXHQgKlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBhcnJheUJ1ZmZlclRvSW1hZ2UoZGF0YTpBcnJheUJ1ZmZlcik6SFRNTEltYWdlRWxlbWVudFxuXHR7XG5cdFx0dmFyIGJ5dGVTdHI6c3RyaW5nID0gJyc7XG5cdFx0dmFyIGJ5dGVzOlVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheShkYXRhKTtcblx0XHR2YXIgbGVuOm51bWJlciA9IGJ5dGVzLmJ5dGVMZW5ndGg7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0Ynl0ZVN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzWyBpIF0pXG5cblx0XHR2YXIgYmFzZTY0SW1hZ2U6c3RyaW5nID0gd2luZG93LmJ0b2EoYnl0ZVN0cik7XG5cdFx0dmFyIHN0cjpzdHJpbmcgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LCcgKyBiYXNlNjRJbWFnZTtcblx0XHR2YXIgaW1nOkhUTUxJbWFnZUVsZW1lbnQgPSA8SFRNTEltYWdlRWxlbWVudD4gbmV3IEltYWdlKCk7XG5cdFx0aW1nLnNyYyA9IHN0cjtcblxuXHRcdHJldHVybiBpbWc7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYW4gQnl0ZUFycmF5IHRvIGFuIEltYWdlIC0gcmV0dXJucyBhbiBIVE1MSW1hZ2VFbGVtZW50XG5cdCAqXG5cdCAqIEBwYXJhbSBpbWFnZSBkYXRhIGFzIGEgQnl0ZUFycmF5XG5cdCAqXG5cdCAqIEByZXR1cm4gSFRNTEltYWdlRWxlbWVudFxuXHQgKlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBieXRlQXJyYXlUb0ltYWdlKGRhdGE6Qnl0ZUFycmF5KTpIVE1MSW1hZ2VFbGVtZW50XG5cdHtcblx0XHR2YXIgYnl0ZVN0cjpzdHJpbmcgPSAnJztcblx0XHR2YXIgYnl0ZXM6VWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KGRhdGEuYXJyYXlieXRlcyk7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSBieXRlcy5ieXRlTGVuZ3RoO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdGJ5dGVTdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1sgaSBdKVxuXG5cdFx0dmFyIGJhc2U2NEltYWdlOnN0cmluZyA9IHdpbmRvdy5idG9hKGJ5dGVTdHIpO1xuXHRcdHZhciBzdHI6c3RyaW5nID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwnICsgYmFzZTY0SW1hZ2U7XG5cdFx0dmFyIGltZzpIVE1MSW1hZ2VFbGVtZW50ID0gPEhUTUxJbWFnZUVsZW1lbnQ+IG5ldyBJbWFnZSgpO1xuXHRcdGltZy5zcmMgPSBzdHI7XG5cblx0XHRyZXR1cm4gaW1nO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGFuIEJsb2IgdG8gYW4gSW1hZ2UgLSByZXR1cm5zIGFuIEhUTUxJbWFnZUVsZW1lbnRcblx0ICpcblx0ICogQHBhcmFtIGltYWdlIGRhdGEgYXMgYSBCbG9iXG5cdCAqXG5cdCAqIEByZXR1cm4gSFRNTEltYWdlRWxlbWVudFxuXHQgKlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBibG9iVG9JbWFnZShkYXRhOkJsb2IpOkhUTUxJbWFnZUVsZW1lbnRcblx0e1xuXHRcdHZhciBVUkxPYmo6VVJMID0gd2luZG93WydVUkwnXSB8fCB3aW5kb3dbJ3dlYmtpdFVSTCddO1xuXHRcdHZhciBzcmMgPSBVUkxPYmouY3JlYXRlT2JqZWN0VVJMKGRhdGEpO1xuXHRcdHZhciBpbWc6SFRNTEltYWdlRWxlbWVudCA9IDxIVE1MSW1hZ2VFbGVtZW50PiBuZXcgSW1hZ2UoKTtcblx0XHRpbWcuc3JjID0gc3JjO1xuXG5cdFx0cmV0dXJuIGltZztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgb2JqZWN0IGFzIEJ5dGVBcnJheSwgaWYgcG9zc2libGUuXG5cdCAqXG5cdCAqIEBwYXJhbSBkYXRhIFRoZSBvYmplY3QgdG8gcmV0dXJuIGFzIEJ5dGVBcnJheVxuXHQgKlxuXHQgKiBAcmV0dXJuIFRoZSBCeXRlQXJyYXkgb3IgbnVsbFxuXHQgKlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyB0b0J5dGVBcnJheShkYXRhOmFueSk6Qnl0ZUFycmF5XG5cdHtcblx0XHR2YXIgYjpCeXRlQXJyYXkgPSBuZXcgQnl0ZUFycmF5KCk7XG5cdFx0Yi5zZXRBcnJheUJ1ZmZlcihkYXRhKTtcblx0XHRyZXR1cm4gYjtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgb2JqZWN0IGFzIFN0cmluZywgaWYgcG9zc2libGUuXG5cdCAqXG5cdCAqIEBwYXJhbSBkYXRhIFRoZSBvYmplY3QgdG8gcmV0dXJuIGFzIFN0cmluZ1xuXHQgKiBAcGFyYW0gbGVuZ3RoIFRoZSBsZW5ndGggb2YgdGhlIHJldHVybmVkIFN0cmluZ1xuXHQgKlxuXHQgKiBAcmV0dXJuIFRoZSBTdHJpbmcgb3IgbnVsbFxuXHQgKlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyB0b1N0cmluZyhkYXRhOmFueSwgbGVuZ3RoOm51bWJlciA9IDApOnN0cmluZ1xuXHR7XG5cblx0XHRpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHR2YXIgczpzdHJpbmcgPSA8c3RyaW5nPiBkYXRhO1xuXG5cdFx0XHRpZiAoc1snc3Vic3RyJ10gIT0gbnVsbClcblx0XHRcdFx0cmV0dXJuIHMuc3Vic3RyKDAsIHMubGVuZ3RoKTtcblx0XHR9XG5cblx0XHRpZiAoZGF0YSBpbnN0YW5jZW9mIEJ5dGVBcnJheSkge1xuXHRcdFx0dmFyIGJhOkJ5dGVBcnJheSA9IDxCeXRlQXJyYXk+IGRhdGE7XG5cdFx0XHRiYS5wb3NpdGlvbiA9IDA7XG5cdFx0XHRyZXR1cm4gYmEucmVhZFVURkJ5dGVzKE1hdGgubWluKGJhLmdldEJ5dGVzQXZhaWxhYmxlKCksIGxlbmd0aCkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXG5cdFx0Lypcblx0XHQgdmFyIGJhOkJ5dGVBcnJheTtcblxuXHRcdCBsZW5ndGggfHw9IHVpbnQuTUFYX1ZBTFVFO1xuXG5cdFx0IGlmIChkYXRhIGlzIFN0cmluZylcblx0XHQgcmV0dXJuIFN0cmluZyhkYXRhKS5zdWJzdHIoMCwgbGVuZ3RoKTtcblxuXHRcdCBiYSA9IHRvQnl0ZUFycmF5KGRhdGEpO1xuXHRcdCBpZiAoYmEpIHtcblx0XHQgYmEucG9zaXRpb24gPSAwO1xuXHRcdCByZXR1cm4gYmEucmVhZFVURkJ5dGVzKE1hdGgubWluKGJhLmJ5dGVzQXZhaWxhYmxlLCBsZW5ndGgpKTtcblx0XHQgfVxuXG5cdFx0IHJldHVybiBudWxsO1xuXG5cdFx0ICovXG5cblx0fVxufVxuXG5leHBvcnQgPSBQYXJzZXJVdGlsczsiXX0=