/**
* The TextLineMetrics class contains information about the text position and
* measurements of a line of text within a text field. All measurements are in
* pixels. Objects of this class are returned by the
* <code>away.entities.TextField.getLineMetrics()</code> method.
*/
var TextLineMetrics = (function () {
    /**
    * Creates a TextLineMetrics object. The TextLineMetrics object contains
    * information about the text metrics of a line of text in a text field.
    * Objects of this class are returned by the
    * away.entities.TextField.getLineMetrics() method.
    *
    * @param x           The left position of the first character in pixels.
    * @param width       The width of the text of the selected lines (not
    *                    necessarily the complete text) in pixels.
    * @param height      The height of the text of the selected lines (not
    *                    necessarily the complete text) in pixels.
    * @param ascent      The length from the baseline to the top of the line
    *                    height in pixels.
    * @param descent     The length from the baseline to the bottom depth of
    *                    the line in pixels.
    * @param leading     The measurement of the vertical distance between the
    *                    lines of text.
    */
    function TextLineMetrics(x, width, height, ascent, descent, leading) {
        if (typeof x === "undefined") { x = NaN; }
        if (typeof width === "undefined") { width = NaN; }
        if (typeof height === "undefined") { height = NaN; }
        if (typeof ascent === "undefined") { ascent = NaN; }
        if (typeof descent === "undefined") { descent = NaN; }
        if (typeof leading === "undefined") { leading = NaN; }
    }
    return TextLineMetrics;
})();

module.exports = TextLineMetrics;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvdGV4dC9UZXh0TGluZU1ldHJpY3MudHMiXSwibmFtZXMiOlsiVGV4dExpbmVNZXRyaWNzIiwiVGV4dExpbmVNZXRyaWNzLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7RUFLRztBQUNIO0lBNERDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFER0E7SUFDSEEseUJBQVlBLENBQWNBLEVBQUVBLEtBQWtCQSxFQUFFQSxNQUFtQkEsRUFBRUEsTUFBbUJBLEVBQUVBLE9BQW9CQSxFQUFFQSxPQUFvQkE7UUFBeEhDLGdDQUFBQSxDQUFDQSxHQUFVQSxHQUFHQTtBQUFBQSxRQUFFQSxvQ0FBQUEsS0FBS0EsR0FBVUEsR0FBR0E7QUFBQUEsUUFBRUEscUNBQUFBLE1BQU1BLEdBQVVBLEdBQUdBO0FBQUFBLFFBQUVBLHFDQUFBQSxNQUFNQSxHQUFVQSxHQUFHQTtBQUFBQSxRQUFFQSxzQ0FBQUEsT0FBT0EsR0FBVUEsR0FBR0E7QUFBQUEsUUFBRUEsc0NBQUFBLE9BQU9BLEdBQVVBLEdBQUdBO0FBQUFBLElBR3BJQSxDQUFDQTtJQUNGRCx1QkFBQ0E7QUFBREEsQ0FBQ0EsSUFBQTs7QUFFRCxnQ0FBeUIsQ0FBQSIsImZpbGUiOiJjb3JlL3RleHQvVGV4dExpbmVNZXRyaWNzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGUgVGV4dExpbmVNZXRyaWNzIGNsYXNzIGNvbnRhaW5zIGluZm9ybWF0aW9uIGFib3V0IHRoZSB0ZXh0IHBvc2l0aW9uIGFuZFxuICogbWVhc3VyZW1lbnRzIG9mIGEgbGluZSBvZiB0ZXh0IHdpdGhpbiBhIHRleHQgZmllbGQuIEFsbCBtZWFzdXJlbWVudHMgYXJlIGluXG4gKiBwaXhlbHMuIE9iamVjdHMgb2YgdGhpcyBjbGFzcyBhcmUgcmV0dXJuZWQgYnkgdGhlIFxuICogPGNvZGU+YXdheS5lbnRpdGllcy5UZXh0RmllbGQuZ2V0TGluZU1ldHJpY3MoKTwvY29kZT4gbWV0aG9kLlxuICovXG5jbGFzcyBUZXh0TGluZU1ldHJpY3Ncbntcblx0LyoqXG5cdCAqIFRoZSBhc2NlbnQgdmFsdWUgb2YgdGhlIHRleHQgaXMgdGhlIGxlbmd0aCBmcm9tIHRoZSBiYXNlbGluZSB0byB0aGUgdG9wIG9mXG5cdCAqIHRoZSBsaW5lIGhlaWdodCBpbiBwaXhlbHMuXG5cdCAqL1xuXHRwdWJsaWMgYXNjZW50Om51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIGRlc2NlbnQgdmFsdWUgb2YgdGhlIHRleHQgaXMgdGhlIGxlbmd0aCBmcm9tIHRoZSBiYXNlbGluZSB0byB0aGVcblx0ICogYm90dG9tIGRlcHRoIG9mIHRoZSBsaW5lIGluIHBpeGVscy5cblx0ICovXG5cdHB1YmxpYyBkZXNjZW50Om51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIGhlaWdodCB2YWx1ZSBvZiB0aGUgdGV4dCBvZiB0aGUgc2VsZWN0ZWQgbGluZXMgKG5vdCBuZWNlc3NhcmlseSB0aGVcblx0ICogY29tcGxldGUgdGV4dCkgaW4gcGl4ZWxzLiBUaGUgaGVpZ2h0IG9mIHRoZSB0ZXh0IGxpbmUgZG9lcyBub3QgaW5jbHVkZSB0aGVcblx0ICogZ3V0dGVyIGhlaWdodC5cblx0ICovXG5cdHB1YmxpYyBoZWlnaHQ6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGVhZGluZyB2YWx1ZSBpcyB0aGUgbWVhc3VyZW1lbnQgb2YgdGhlIHZlcnRpY2FsIGRpc3RhbmNlIGJldHdlZW4gdGhlXG5cdCAqIGxpbmVzIG9mIHRleHQuXG5cdCAqL1xuXHRwdWJsaWMgbGVhZGluZzpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSB3aWR0aCB2YWx1ZSBpcyB0aGUgd2lkdGggb2YgdGhlIHRleHQgb2YgdGhlIHNlbGVjdGVkIGxpbmVzIChub3Rcblx0ICogbmVjZXNzYXJpbHkgdGhlIGNvbXBsZXRlIHRleHQpIGluIHBpeGVscy4gVGhlIHdpZHRoIG9mIHRoZSB0ZXh0IGxpbmUgaXNcblx0ICogbm90IHRoZSBzYW1lIGFzIHRoZSB3aWR0aCBvZiB0aGUgdGV4dCBmaWVsZC4gVGhlIHdpZHRoIG9mIHRoZSB0ZXh0IGxpbmUgaXNcblx0ICogcmVsYXRpdmUgdG8gdGhlIHRleHQgZmllbGQgd2lkdGgsIG1pbnVzIHRoZSBndXR0ZXIgd2lkdGggb2YgNCBwaXhlbHNcblx0ICogKDIgcGl4ZWxzIG9uIGVhY2ggc2lkZSkuXG5cdCAqL1xuXHRwdWJsaWMgd2lkdGg6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgeCB2YWx1ZSBpcyB0aGUgbGVmdCBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHBpeGVscy4gVGhpc1xuXHQgKiB2YWx1ZSBpbmNsdWRlcyB0aGUgbWFyZ2luLCBpbmRlbnQgKGlmIGFueSksIGFuZCBndXR0ZXIgd2lkdGhzLlxuXHQgKi9cblx0cHVibGljIHg6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgVGV4dExpbmVNZXRyaWNzIG9iamVjdC4gVGhlIFRleHRMaW5lTWV0cmljcyBvYmplY3QgY29udGFpbnNcblx0ICogaW5mb3JtYXRpb24gYWJvdXQgdGhlIHRleHQgbWV0cmljcyBvZiBhIGxpbmUgb2YgdGV4dCBpbiBhIHRleHQgZmllbGQuXG5cdCAqIE9iamVjdHMgb2YgdGhpcyBjbGFzcyBhcmUgcmV0dXJuZWQgYnkgdGhlXG5cdCAqIGF3YXkuZW50aXRpZXMuVGV4dEZpZWxkLmdldExpbmVNZXRyaWNzKCkgbWV0aG9kLlxuXHQgKlxuXHQgKiBAcGFyYW0geCAgICAgICAgICAgVGhlIGxlZnQgcG9zaXRpb24gb2YgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiBwaXhlbHMuXG5cdCAqIEBwYXJhbSB3aWR0aCAgICAgICBUaGUgd2lkdGggb2YgdGhlIHRleHQgb2YgdGhlIHNlbGVjdGVkIGxpbmVzIChub3Rcblx0ICogICAgICAgICAgICAgICAgICAgIG5lY2Vzc2FyaWx5IHRoZSBjb21wbGV0ZSB0ZXh0KSBpbiBwaXhlbHMuXG5cdCAqIEBwYXJhbSBoZWlnaHQgICAgICBUaGUgaGVpZ2h0IG9mIHRoZSB0ZXh0IG9mIHRoZSBzZWxlY3RlZCBsaW5lcyAobm90XG5cdCAqICAgICAgICAgICAgICAgICAgICBuZWNlc3NhcmlseSB0aGUgY29tcGxldGUgdGV4dCkgaW4gcGl4ZWxzLlxuXHQgKiBAcGFyYW0gYXNjZW50ICAgICAgVGhlIGxlbmd0aCBmcm9tIHRoZSBiYXNlbGluZSB0byB0aGUgdG9wIG9mIHRoZSBsaW5lXG5cdCAqICAgICAgICAgICAgICAgICAgICBoZWlnaHQgaW4gcGl4ZWxzLlxuXHQgKiBAcGFyYW0gZGVzY2VudCAgICAgVGhlIGxlbmd0aCBmcm9tIHRoZSBiYXNlbGluZSB0byB0aGUgYm90dG9tIGRlcHRoIG9mXG5cdCAqICAgICAgICAgICAgICAgICAgICB0aGUgbGluZSBpbiBwaXhlbHMuXG5cdCAqIEBwYXJhbSBsZWFkaW5nICAgICBUaGUgbWVhc3VyZW1lbnQgb2YgdGhlIHZlcnRpY2FsIGRpc3RhbmNlIGJldHdlZW4gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICBsaW5lcyBvZiB0ZXh0LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoeDpudW1iZXIgPSBOYU4sIHdpZHRoOm51bWJlciA9IE5hTiwgaGVpZ2h0Om51bWJlciA9IE5hTiwgYXNjZW50Om51bWJlciA9IE5hTiwgZGVzY2VudDpudW1iZXIgPSBOYU4sIGxlYWRpbmc6bnVtYmVyID0gTmFOKVxuXHR7XG5cblx0fVxufVxuXG5leHBvcnQgPSBUZXh0TGluZU1ldHJpY3M7Il19