var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObject = require("awayjs-core/lib/core/base/DisplayObject");

/**
* The TextField class is used to create display objects for text display and
* input. <ph outputclass="flexonly">You can use the TextField class to
* perform low-level text rendering. However, in Flex, you typically use the
* Label, Text, TextArea, and TextInput controls to process text. <ph
* outputclass="flashonly">You can give a text field an instance name in the
* Property inspector and use the methods and properties of the TextField
* class to manipulate it with ActionScript. TextField instance names are
* displayed in the Movie Explorer and in the Insert Target Path dialog box in
* the Actions panel.
*
* <p>To create a text field dynamically, use the <code>TextField()</code>
* constructor.</p>
*
* <p>The methods of the TextField class let you set, select, and manipulate
* text in a dynamic or input text field that you create during authoring or
* at runtime. </p>
*
* <p>ActionScript provides several ways to format your text at runtime. The
* TextFormat class lets you set character and paragraph formatting for
* TextField objects. You can apply Cascading Style Sheets(CSS) styles to
* text fields by using the <code>TextField.styleSheet</code> property and the
* StyleSheet class. You can use CSS to style built-in HTML tags, define new
* formatting tags, or apply styles. You can assign HTML formatted text, which
* optionally uses CSS styles, directly to a text field. HTML text that you
* assign to a text field can contain embedded media(movie clips, SWF files,
* GIF files, PNG files, and JPEG files). The text wraps around the embedded
* media in the same way that a web browser wraps text around media embedded
* in an HTML document. </p>
*
* <p>Flash Player supports a subset of HTML tags that you can use to format
* text. See the list of supported HTML tags in the description of the
* <code>htmlText</code> property.</p>
*
* @event change                    Dispatched after a control value is
*                                  modified, unlike the
*                                  <code>textInput</code> event, which is
*                                  dispatched before the value is modified.
*                                  Unlike the W3C DOM Event Model version of
*                                  the <code>change</code> event, which
*                                  dispatches the event only after the
*                                  control loses focus, the ActionScript 3.0
*                                  version of the <code>change</code> event
*                                  is dispatched any time the control
*                                  changes. For example, if a user types text
*                                  into a text field, a <code>change</code>
*                                  event is dispatched after every keystroke.
* @event link                      Dispatched when a user clicks a hyperlink
*                                  in an HTML-enabled text field, where the
*                                  URL begins with "event:". The remainder of
*                                  the URL after "event:" is placed in the
*                                  text property of the LINK event.
*
*                                  <p><b>Note:</b> The default behavior,
*                                  adding the text to the text field, occurs
*                                  only when Flash Player generates the
*                                  event, which in this case happens when a
*                                  user attempts to input text. You cannot
*                                  put text into a text field by sending it
*                                  <code>textInput</code> events.</p>
* @event scroll                    Dispatched by a TextField object
*                                  <i>after</i> the user scrolls.
* @event textInput                 Flash Player dispatches the
*                                  <code>textInput</code> event when a user
*                                  enters one or more characters of text.
*                                  Various text input methods can generate
*                                  this event, including standard keyboards,
*                                  input method editors(IMEs), voice or
*                                  speech recognition systems, and even the
*                                  act of pasting plain text with no
*                                  formatting or style information.
* @event textInteractionModeChange Flash Player dispatches the
*                                  <code>textInteractionModeChange</code>
*                                  event when a user changes the interaction
*                                  mode of a text field. for example on
*                                  Android, one can toggle from NORMAL mode
*                                  to SELECTION mode using context menu
*                                  options
*/
var TextField = (function (_super) {
    __extends(TextField, _super);
    /**
    * Creates a new TextField instance. After you create the TextField instance,
    * call the <code>addChild()</code> or <code>addChildAt()</code> method of
    * the parent DisplayObjectContainer object to add the TextField instance to
    * the display list.
    *
    * <p>The default size for a text field is 100 x 100 pixels.</p>
    */
    function TextField() {
        _super.call(this);
        this._text = "";
    }
    Object.defineProperty(TextField.prototype, "bottomScrollV", {
        /**
        * An integer(1-based index) that indicates the bottommost line that is
        * currently visible in the specified text field. Think of the text field as
        * a window onto a block of text. The <code>scrollV</code> property is the
        * 1-based index of the topmost visible line in the window.
        *
        * <p>All the text between the lines indicated by <code>scrollV</code> and
        * <code>bottomScrollV</code> is currently visible in the text field.</p>
        */
        get: function () {
            return this._bottomScrollV;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TextField.prototype, "caretIndex", {
        /**
        * The index of the insertion point(caret) position. If no insertion point
        * is displayed, the value is the position the insertion point would be if
        * you restored focus to the field(typically where the insertion point last
        * was, or 0 if the field has not had focus).
        *
        * <p>Selection span indexes are zero-based(for example, the first position
        * is 0, the second position is 1, and so on).</p>
        */
        get: function () {
            return this._caretIndex;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TextField.prototype, "length", {
        /**
        * The number of characters in a text field. A character such as tab
        * (<code>\t</code>) counts as one character.
        */
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * The maximum value of <code>scrollH</code>.
    */
    TextField.prototype.maxScrollH = function () {
        return this._maxScrollH;
    };

    /**
    * The maximum value of <code>scrollV</code>.
    */
    TextField.prototype.maxScrollV = function () {
        return this._maxScrollV;
    };

    Object.defineProperty(TextField.prototype, "numLines", {
        /**
        * Defines the number of text lines in a multiline text field. If
        * <code>wordWrap</code> property is set to <code>true</code>, the number of
        * lines increases when text wraps.
        */
        get: function () {
            return this._numLines;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TextField.prototype, "selectionBeginIndex", {
        /**
        * The zero-based character index value of the first character in the current
        * selection. For example, the first character is 0, the second character is
        * 1, and so on. If no text is selected, this property is the value of
        * <code>caretIndex</code>.
        */
        get: function () {
            return this._selectionBeginIndex;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TextField.prototype, "selectionEndIndex", {
        /**
        * The zero-based character index value of the last character in the current
        * selection. For example, the first character is 0, the second character is
        * 1, and so on. If no text is selected, this property is the value of
        * <code>caretIndex</code>.
        */
        get: function () {
            return this._selectionEndIndex;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TextField.prototype, "text", {
        /**
        * A string that is the current text in the text field. Lines are separated
        * by the carriage return character(<code>'\r'</code>, ASCII 13). This
        * property contains unformatted text in the text field, without HTML tags.
        *
        * <p>To get the text in HTML form, use the <code>htmlText</code>
        * property.</p>
        */
        get: function () {
            return this._text;
        },
        set: function (value) {
            if (this._text == value)
                return;

            this._text = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(TextField.prototype, "textHeight", {
        /**
        * The height of the text in pixels.
        */
        get: function () {
            return this._textHeight;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TextField.prototype, "textInteractionMode", {
        /**
        * The interaction mode property, Default value is
        * TextInteractionMode.NORMAL. On mobile platforms, the normal mode implies
        * that the text can be scrolled but not selected. One can switch to the
        * selectable mode through the in-built context menu on the text field. On
        * Desktop, the normal mode implies that the text is in scrollable as well as
        * selection mode.
        */
        get: function () {
            return this._textInteractionMode;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TextField.prototype, "textWidth", {
        /**
        * The width of the text in pixels.
        */
        get: function () {
            return this._textWidth;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * Appends the string specified by the <code>newText</code> parameter to the
    * end of the text of the text field. This method is more efficient than an
    * addition assignment(<code>+=</code>) on a <code>text</code> property
    * (such as <code>someTextField.text += moreText</code>), particularly for a
    * text field that contains a significant amount of content.
    *
    * @param newText The string to append to the existing text.
    */
    TextField.prototype.appendText = function (newText) {
        //TODO
    };

    /**
    * Returns a rectangle that is the bounding box of the character.
    *
    * @param charIndex The zero-based index value for the character(for
    *                  example, the first position is 0, the second position is
    *                  1, and so on).
    * @return A rectangle with <code>x</code> and <code>y</code> minimum and
    *         maximum values defining the bounding box of the character.
    */
    TextField.prototype.getCharBoundaries = function (charIndex) {
        return this._charBoundaries;
    };

    /**
    * Returns the zero-based index value of the character at the point specified
    * by the <code>x</code> and <code>y</code> parameters.
    *
    * @param x The <i>x</i> coordinate of the character.
    * @param y The <i>y</i> coordinate of the character.
    * @return The zero-based index value of the character(for example, the
    *         first position is 0, the second position is 1, and so on). Returns
    *         -1 if the point is not over any character.
    */
    TextField.prototype.getCharIndexAtPoint = function (x, y) {
        return this._charIndexAtPoint;
    };

    /**
    * Given a character index, returns the index of the first character in the
    * same paragraph.
    *
    * @param charIndex The zero-based index value of the character(for example,
    *                  the first character is 0, the second character is 1, and
    *                  so on).
    * @return The zero-based index value of the first character in the same
    *         paragraph.
    * @throws RangeError The character index specified is out of range.
    */
    TextField.prototype.getFirstCharInParagraph = function (charIndex /*int*/ ) {
        return this._firstCharInParagraph;
    };

    /**
    * Returns a DisplayObject reference for the given <code>id</code>, for an
    * image or SWF file that has been added to an HTML-formatted text field by
    * using an <code><img></code> tag. The <code><img></code> tag is in the
    * following format:
    *
    * <p><pre xml:space="preserve"><code> <img src = 'filename.jpg' id =
    * 'instanceName' ></code></pre></p>
    *
    * @param id The <code>id</code> to match(in the <code>id</code> attribute
    *           of the <code><img></code> tag).
    * @return The display object corresponding to the image or SWF file with the
    *         matching <code>id</code> attribute in the <code><img></code> tag
    *         of the text field. For media loaded from an external source, this
    *         object is a Loader object, and, once loaded, the media object is a
    *         child of that Loader object. For media embedded in the SWF file,
    *         it is the loaded object. If no <code><img></code> tag with the
    *         matching <code>id</code> exists, the method returns
    *         <code>null</code>.
    */
    TextField.prototype.getImageReference = function (id) {
        return this._imageReference;
    };

    /**
    * Returns the zero-based index value of the line at the point specified by
    * the <code>x</code> and <code>y</code> parameters.
    *
    * @param x The <i>x</i> coordinate of the line.
    * @param y The <i>y</i> coordinate of the line.
    * @return The zero-based index value of the line(for example, the first
    *         line is 0, the second line is 1, and so on). Returns -1 if the
    *         point is not over any line.
    */
    TextField.prototype.getLineIndexAtPoint = function (x, y) {
        return this._lineIndexAtPoint;
    };

    /**
    * Returns the zero-based index value of the line containing the character
    * specified by the <code>charIndex</code> parameter.
    *
    * @param charIndex The zero-based index value of the character(for example,
    *                  the first character is 0, the second character is 1, and
    *                  so on).
    * @return The zero-based index value of the line.
    * @throws RangeError The character index specified is out of range.
    */
    TextField.prototype.getLineIndexOfChar = function (charIndex /*int*/ ) {
        return this._lineIndexOfChar;
    };

    /**
    * Returns the number of characters in a specific text line.
    *
    * @param lineIndex The line number for which you want the length.
    * @return The number of characters in the line.
    * @throws RangeError The line number specified is out of range.
    */
    TextField.prototype.getLineLength = function (lineIndex /*int*/ ) {
        return this._lineLength;
    };

    /**
    * Returns metrics information about a given text line.
    *
    * @param lineIndex The line number for which you want metrics information.
    * @return A TextLineMetrics object.
    * @throws RangeError The line number specified is out of range.
    */
    TextField.prototype.getLineMetrics = function (lineIndex /*int*/ ) {
        return this._lineMetrics;
    };

    /**
    * Returns the character index of the first character in the line that the
    * <code>lineIndex</code> parameter specifies.
    *
    * @param lineIndex The zero-based index value of the line(for example, the
    *                  first line is 0, the second line is 1, and so on).
    * @return The zero-based index value of the first character in the line.
    * @throws RangeError The line number specified is out of range.
    */
    TextField.prototype.getLineOffset = function (lineIndex /*int*/ ) {
        return this._lineOffset;
    };

    /**
    * Returns the text of the line specified by the <code>lineIndex</code>
    * parameter.
    *
    * @param lineIndex The zero-based index value of the line(for example, the
    *                  first line is 0, the second line is 1, and so on).
    * @return The text string contained in the specified line.
    * @throws RangeError The line number specified is out of range.
    */
    TextField.prototype.getLineText = function (lineIndex /*int*/ ) {
        return this._lineText;
    };

    /**
    * Given a character index, returns the length of the paragraph containing
    * the given character. The length is relative to the first character in the
    * paragraph(as returned by <code>getFirstCharInParagraph()</code>), not to
    * the character index passed in.
    *
    * @param charIndex The zero-based index value of the character(for example,
    *                  the first character is 0, the second character is 1, and
    *                  so on).
    * @return Returns the number of characters in the paragraph.
    * @throws RangeError The character index specified is out of range.
    */
    TextField.prototype.getParagraphLength = function (charIndex /*int*/ ) {
        return this._paragraphLength;
    };

    /**
    * Returns a TextFormat object that contains formatting information for the
    * range of text that the <code>beginIndex</code> and <code>endIndex</code>
    * parameters specify. Only properties that are common to the entire text
    * specified are set in the resulting TextFormat object. Any property that is
    * <i>mixed</i>, meaning that it has different values at different points in
    * the text, has a value of <code>null</code>.
    *
    * <p>If you do not specify values for these parameters, this method is
    * applied to all the text in the text field. </p>
    *
    * <p>The following table describes three possible usages:</p>
    *
    * @return The TextFormat object that represents the formatting properties
    *         for the specified text.
    * @throws RangeError The <code>beginIndex</code> or <code>endIndex</code>
    *                    specified is out of range.
    */
    TextField.prototype.getTextFormat = function (beginIndex, endIndex) {
        if (typeof beginIndex === "undefined") { beginIndex = -1; }
        if (typeof endIndex === "undefined") { endIndex = -1; }
        return this._textFormat;
    };

    /**
    * Replaces the current selection with the contents of the <code>value</code>
    * parameter. The text is inserted at the position of the current selection,
    * using the current default character format and default paragraph format.
    * The text is not treated as HTML.
    *
    * <p>You can use the <code>replaceSelectedText()</code> method to insert and
    * delete text without disrupting the character and paragraph formatting of
    * the rest of the text.</p>
    *
    * <p><b>Note:</b> This method does not work if a style sheet is applied to
    * the text field.</p>
    *
    * @param value The string to replace the currently selected text.
    * @throws Error This method cannot be used on a text field with a style
    *               sheet.
    */
    TextField.prototype.replaceSelectedText = function (value) {
    };

    /**
    * Replaces the range of characters that the <code>beginIndex</code> and
    * <code>endIndex</code> parameters specify with the contents of the
    * <code>newText</code> parameter. As designed, the text from
    * <code>beginIndex</code> to <code>endIndex-1</code> is replaced.
    *
    * <p><b>Note:</b> This method does not work if a style sheet is applied to
    * the text field.</p>
    *
    * @param beginIndex The zero-based index value for the start position of the
    *                   replacement range.
    * @param endIndex   The zero-based index position of the first character
    *                   after the desired text span.
    * @param newText    The text to use to replace the specified range of
    *                   characters.
    * @throws Error This method cannot be used on a text field with a style
    *               sheet.
    */
    TextField.prototype.replaceText = function (beginIndex /*int*/ , endIndex /*int*/ , newText) {
    };

    /**
    * Sets as selected the text designated by the index values of the first and
    * last characters, which are specified with the <code>beginIndex</code> and
    * <code>endIndex</code> parameters. If the two parameter values are the
    * same, this method sets the insertion point, as if you set the
    * <code>caretIndex</code> property.
    *
    * @param beginIndex The zero-based index value of the first character in the
    *                   selection(for example, the first character is 0, the
    *                   second character is 1, and so on).
    * @param endIndex   The zero-based index value of the last character in the
    *                   selection.
    */
    TextField.prototype.setSelection = function (beginIndex /*int*/ , endIndex /*int*/ ) {
    };

    /**
    * Applies the text formatting that the <code>format</code> parameter
    * specifies to the specified text in a text field. The value of
    * <code>format</code> must be a TextFormat object that specifies the desired
    * text formatting changes. Only the non-null properties of
    * <code>format</code> are applied to the text field. Any property of
    * <code>format</code> that is set to <code>null</code> is not applied. By
    * default, all of the properties of a newly created TextFormat object are
    * set to <code>null</code>.
    *
    * <p><b>Note:</b> This method does not work if a style sheet is applied to
    * the text field.</p>
    *
    * <p>The <code>setTextFormat()</code> method changes the text formatting
    * applied to a range of characters or to the entire body of text in a text
    * field. To apply the properties of format to all text in the text field, do
    * not specify values for <code>beginIndex</code> and <code>endIndex</code>.
    * To apply the properties of the format to a range of text, specify values
    * for the <code>beginIndex</code> and the <code>endIndex</code> parameters.
    * You can use the <code>length</code> property to determine the index
    * values.</p>
    *
    * <p>The two types of formatting information in a TextFormat object are
    * character level formatting and paragraph level formatting. Each character
    * in a text field can have its own character formatting settings, such as
    * font name, font size, bold, and italic.</p>
    *
    * <p>For paragraphs, the first character of the paragraph is examined for
    * the paragraph formatting settings for the entire paragraph. Examples of
    * paragraph formatting settings are left margin, right margin, and
    * indentation.</p>
    *
    * <p>Any text inserted manually by the user, or replaced by the
    * <code>replaceSelectedText()</code> method, receives the default text field
    * formatting for new text, and not the formatting specified for the text
    * insertion point. To set the default formatting for new text, use
    * <code>defaultTextFormat</code>.</p>
    *
    * @param format A TextFormat object that contains character and paragraph
    *               formatting information.
    * @throws Error      This method cannot be used on a text field with a style
    *                    sheet.
    * @throws RangeError The <code>beginIndex</code> or <code>endIndex</code>
    *                    specified is out of range.
    */
    TextField.prototype.setTextFormat = function (format, beginIndex, endIndex) {
        if (typeof beginIndex === "undefined") { beginIndex = -1; }
        if (typeof endIndex === "undefined") { endIndex = -1; }
    };

    /**
    * Returns true if an embedded font is available with the specified
    * <code>fontName</code> and <code>fontStyle</code> where
    * <code>Font.fontType</code> is <code>flash.text.FontType.EMBEDDED</code>.
    * Starting with Flash Player 10, two kinds of embedded fonts can appear in a
    * SWF file. Normal embedded fonts are only used with TextField objects. CFF
    * embedded fonts are only used with the flash.text.engine classes. The two
    * types are distinguished by the <code>fontType</code> property of the
    * <code>Font</code> class, as returned by the <code>enumerateFonts()</code>
    * function.
    *
    * <p>TextField cannot use a font of type <code>EMBEDDED_CFF</code>. If
    * <code>embedFonts</code> is set to <code>true</code> and the only font
    * available at run time with the specified name and style is of type
    * <code>EMBEDDED_CFF</code>, Flash Player fails to render the text, as if no
    * embedded font were available with the specified name and style.</p>
    *
    * <p>If both <code>EMBEDDED</code> and <code>EMBEDDED_CFF</code> fonts are
    * available with the same name and style, the <code>EMBEDDED</code> font is
    * selected and text renders with the <code>EMBEDDED</code> font.</p>
    *
    * @param fontName  The name of the embedded font to check.
    * @param fontStyle Specifies the font style to check. Use
    *                  <code>flash.text.FontStyle</code>
    * @return <code>true</code> if a compatible embedded font is available,
    *         otherwise <code>false</code>.
    * @throws ArgumentError The <code>fontStyle</code> specified is not a member
    *                       of <code>flash.text.FontStyle</code>.
    */
    TextField.isFontCompatible = function (fontName, fontStyle) {
        return false;
    };
    return TextField;
})(DisplayObject);

module.exports = TextField;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL1RleHRGaWVsZC50cyJdLCJuYW1lcyI6WyJUZXh0RmllbGQiLCJUZXh0RmllbGQuY29uc3RydWN0b3IiLCJUZXh0RmllbGQubWF4U2Nyb2xsSCIsIlRleHRGaWVsZC5tYXhTY3JvbGxWIiwiVGV4dEZpZWxkLmFwcGVuZFRleHQiLCJUZXh0RmllbGQuZ2V0Q2hhckJvdW5kYXJpZXMiLCJUZXh0RmllbGQuZ2V0Q2hhckluZGV4QXRQb2ludCIsIlRleHRGaWVsZC5nZXRGaXJzdENoYXJJblBhcmFncmFwaCIsIlRleHRGaWVsZC5nZXRJbWFnZVJlZmVyZW5jZSIsIlRleHRGaWVsZC5nZXRMaW5lSW5kZXhBdFBvaW50IiwiVGV4dEZpZWxkLmdldExpbmVJbmRleE9mQ2hhciIsIlRleHRGaWVsZC5nZXRMaW5lTGVuZ3RoIiwiVGV4dEZpZWxkLmdldExpbmVNZXRyaWNzIiwiVGV4dEZpZWxkLmdldExpbmVPZmZzZXQiLCJUZXh0RmllbGQuZ2V0TGluZVRleHQiLCJUZXh0RmllbGQuZ2V0UGFyYWdyYXBoTGVuZ3RoIiwiVGV4dEZpZWxkLmdldFRleHRGb3JtYXQiLCJUZXh0RmllbGQucmVwbGFjZVNlbGVjdGVkVGV4dCIsIlRleHRGaWVsZC5yZXBsYWNlVGV4dCIsIlRleHRGaWVsZC5zZXRTZWxlY3Rpb24iLCJUZXh0RmllbGQuc2V0VGV4dEZvcm1hdCIsIlRleHRGaWVsZC5pc0ZvbnRDb21wYXRpYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzRUFBNkU7O0FBVTdFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE4RUc7QUFDSDtJQUF3QkEsNEJBQWFBO0lBcWxCcENBOzs7Ozs7O01BREdBO0lBQ0hBO1FBRUNDLFdBQU1BLEtBQUFBLENBQUNBO1FBN2tCUkEsS0FBUUEsS0FBS0EsR0FBVUEsRUFBRUEsQ0FBQ0E7SUE4a0IxQkEsQ0FBQ0E7SUE3Y0REO1FBQUFBOzs7Ozs7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxjQUFjQTtRQUMzQkEsQ0FBQ0E7Ozs7QUFBQUE7SUFXREE7UUFBQUE7Ozs7Ozs7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFdBQVdBO1FBQ3hCQSxDQUFDQTs7OztBQUFBQTtJQTJHREE7UUFBQUE7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxPQUFPQTtRQUNwQkEsQ0FBQ0E7Ozs7QUFBQUE7SUFnQkRBOztNQURHQTtxQ0FDSEE7UUFFQ0UsT0FBT0EsSUFBSUEsQ0FBQ0EsV0FBV0E7SUFDeEJBLENBQUNBOztJQUtERjs7TUFER0E7cUNBQ0hBO1FBRUNHLE9BQU9BLElBQUlBLENBQUNBLFdBQVdBO0lBQ3hCQSxDQUFDQTs7SUE4QkRIO1FBQUFBOzs7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFNBQVNBO1FBQ3RCQSxDQUFDQTs7OztBQUFBQTtJQThHREE7UUFBQUE7Ozs7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLG9CQUFvQkE7UUFDakNBLENBQUNBOzs7O0FBQUFBO0lBUURBO1FBQUFBOzs7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxrQkFBa0JBO1FBQy9CQSxDQUFDQTs7OztBQUFBQTtJQTBDREE7UUFBQUE7Ozs7Ozs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsS0FBS0E7UUFDbEJBLENBQUNBO1FBRURBLEtBQUFBLFVBQWdCQSxLQUFZQTtZQUUzQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsS0FBS0E7Z0JBQ3RCQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0E7UUFDbkJBLENBQUNBOzs7O0FBUkFBOztJQXdCREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFdBQVdBO1FBQ3hCQSxDQUFDQTs7OztBQUFBQTtJQVVEQTtRQUFBQTs7Ozs7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxvQkFBb0JBO1FBQ2pDQSxDQUFDQTs7OztBQUFBQTtJQUtEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsVUFBVUE7UUFDdkJBLENBQUNBOzs7O0FBQUFBO0lBb0VEQTs7Ozs7Ozs7TUFER0E7cUNBQ0hBLFVBQWtCQSxPQUFjQTtRQUUvQkksTUFBTUE7SUFDUEEsQ0FBQ0E7O0lBV0RKOzs7Ozs7OztNQURHQTs0Q0FDSEEsVUFBeUJBLFNBQWdCQTtRQUV4Q0ssT0FBT0EsSUFBSUEsQ0FBQ0EsZUFBZUE7SUFDNUJBLENBQUNBOztJQVlETDs7Ozs7Ozs7O01BREdBOzhDQUNIQSxVQUEyQkEsQ0FBUUEsRUFBRUEsQ0FBUUE7UUFFNUNNLE9BQU9BLElBQUlBLENBQUNBLGlCQUFpQkE7SUFDOUJBLENBQUNBOztJQWFETjs7Ozs7Ozs7OztNQURHQTtrREFDSEEsVUFBK0JBLFNBQWdCQSxDQUFDQSxPQUFPQTtRQUV0RE8sT0FBT0EsSUFBSUEsQ0FBQ0EscUJBQXFCQTtJQUNsQ0EsQ0FBQ0E7O0lBc0JEUDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQURHQTs0Q0FDSEEsVUFBeUJBLEVBQVNBO1FBRWpDUSxPQUFPQSxJQUFJQSxDQUFDQSxlQUFlQTtJQUM1QkEsQ0FBQ0E7O0lBWURSOzs7Ozs7Ozs7TUFER0E7OENBQ0hBLFVBQTJCQSxDQUFRQSxFQUFFQSxDQUFRQTtRQUU1Q1MsT0FBT0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQTtJQUM5QkEsQ0FBQ0E7O0lBWURUOzs7Ozs7Ozs7TUFER0E7NkNBQ0hBLFVBQTBCQSxTQUFnQkEsQ0FBQ0EsT0FBT0E7UUFFakRVLE9BQU9BLElBQUlBLENBQUNBLGdCQUFnQkE7SUFDN0JBLENBQUNBOztJQVNEVjs7Ozs7O01BREdBO3dDQUNIQSxVQUFxQkEsU0FBZ0JBLENBQUNBLE9BQU9BO1FBRTVDVyxPQUFPQSxJQUFJQSxDQUFDQSxXQUFXQTtJQUN4QkEsQ0FBQ0E7O0lBU0RYOzs7Ozs7TUFER0E7eUNBQ0hBLFVBQXNCQSxTQUFnQkEsQ0FBQ0EsT0FBT0E7UUFFN0NZLE9BQU9BLElBQUlBLENBQUNBLFlBQVlBO0lBQ3pCQSxDQUFDQTs7SUFXRFo7Ozs7Ozs7O01BREdBO3dDQUNIQSxVQUFxQkEsU0FBZ0JBLENBQUNBLE9BQU9BO1FBRTVDYSxPQUFPQSxJQUFJQSxDQUFDQSxXQUFXQTtJQUN4QkEsQ0FBQ0E7O0lBV0RiOzs7Ozs7OztNQURHQTtzQ0FDSEEsVUFBbUJBLFNBQWdCQSxDQUFDQSxPQUFPQTtRQUUxQ2MsT0FBT0EsSUFBSUEsQ0FBQ0EsU0FBU0E7SUFDdEJBLENBQUNBOztJQWNEZDs7Ozs7Ozs7Ozs7TUFER0E7NkNBQ0hBLFVBQTBCQSxTQUFnQkEsQ0FBQ0EsT0FBT0E7UUFFakRlLE9BQU9BLElBQUlBLENBQUNBLGdCQUFnQkE7SUFDN0JBLENBQUNBOztJQW9CRGY7Ozs7Ozs7Ozs7Ozs7Ozs7O01BREdBO3dDQUNIQSxVQUFxQkEsVUFBOEJBLEVBQUVBLFFBQTRCQTtRQUE1RGdCLHlDQUFBQSxVQUFVQSxHQUFrQkEsQ0FBQ0EsQ0FBQ0E7QUFBQUEsUUFBRUEsdUNBQUFBLFFBQVFBLEdBQWtCQSxDQUFDQSxDQUFDQTtBQUFBQSxRQUVoRkEsT0FBT0EsSUFBSUEsQ0FBQ0EsV0FBV0E7SUFDeEJBLENBQUNBOztJQW1CRGhCOzs7Ozs7Ozs7Ozs7Ozs7O01BREdBOzhDQUNIQSxVQUEyQkEsS0FBWUE7SUFHdkNpQixDQUFDQTs7SUFvQkRqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFER0E7c0NBQ0hBLFVBQW1CQSxVQUFpQkEsQ0FBQ0EsT0FBT0EsR0FBRUEsUUFBZUEsQ0FBQ0EsT0FBT0EsR0FBRUEsT0FBY0E7SUFHckZrQixDQUFDQTs7SUFlRGxCOzs7Ozs7Ozs7Ozs7TUFER0E7dUNBQ0hBLFVBQW9CQSxVQUFpQkEsQ0FBQ0EsT0FBT0EsR0FBRUEsUUFBZUEsQ0FBQ0EsT0FBT0E7SUFHdEVtQixDQUFDQTs7SUErQ0RuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFER0E7d0NBQ0hBLFVBQXFCQSxNQUFpQkEsRUFBRUEsVUFBOEJBLEVBQUVBLFFBQTRCQTtRQUE1RG9CLHlDQUFBQSxVQUFVQSxHQUFrQkEsQ0FBQ0EsQ0FBQ0E7QUFBQUEsUUFBRUEsdUNBQUFBLFFBQVFBLEdBQWtCQSxDQUFDQSxDQUFDQTtBQUFBQSxJQUdwR0EsQ0FBQ0E7O0lBK0JEcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFER0E7aUNBQ0hBLFVBQStCQSxRQUFlQSxFQUFFQSxTQUFnQkE7UUFFL0RxQixPQUFPQSxLQUFLQTtJQUNiQSxDQUFDQTtJQUNGckIsaUJBQUNBO0FBQURBLENBQUNBLEVBMTdCdUIsYUFBYSxFQTA3QnBDOztBQUVELDBCQUFtQixDQUFBIiwiZmlsZSI6ImVudGl0aWVzL1RleHRGaWVsZC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgUmVjdGFuZ2xlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vUmVjdGFuZ2xlXCIpO1xuaW1wb3J0IEFudGlBbGlhc1R5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3RleHQvQW50aUFsaWFzVHlwZVwiKTtcbmltcG9ydCBHcmlkRml0VHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS90ZXh0L0dyaWRGaXRUeXBlXCIpO1xuaW1wb3J0IFRleHRGaWVsZEF1dG9TaXplXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvdGV4dC9UZXh0RmllbGRBdXRvU2l6ZVwiKTtcbmltcG9ydCBUZXh0RmllbGRUeXBlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS90ZXh0L1RleHRGaWVsZFR5cGVcIik7XG5pbXBvcnQgVGV4dEZvcm1hdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS90ZXh0L1RleHRGb3JtYXRcIik7XG5pbXBvcnQgVGV4dEludGVyYWN0aW9uTW9kZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3RleHQvVGV4dEludGVyYWN0aW9uTW9kZVwiKTtcbmltcG9ydCBUZXh0TGluZU1ldHJpY3NcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3RleHQvVGV4dExpbmVNZXRyaWNzXCIpO1xuXG4vKipcbiAqIFRoZSBUZXh0RmllbGQgY2xhc3MgaXMgdXNlZCB0byBjcmVhdGUgZGlzcGxheSBvYmplY3RzIGZvciB0ZXh0IGRpc3BsYXkgYW5kXG4gKiBpbnB1dC4gPHBoIG91dHB1dGNsYXNzPVwiZmxleG9ubHlcIj5Zb3UgY2FuIHVzZSB0aGUgVGV4dEZpZWxkIGNsYXNzIHRvXG4gKiBwZXJmb3JtIGxvdy1sZXZlbCB0ZXh0IHJlbmRlcmluZy4gSG93ZXZlciwgaW4gRmxleCwgeW91IHR5cGljYWxseSB1c2UgdGhlXG4gKiBMYWJlbCwgVGV4dCwgVGV4dEFyZWEsIGFuZCBUZXh0SW5wdXQgY29udHJvbHMgdG8gcHJvY2VzcyB0ZXh0LiA8cGhcbiAqIG91dHB1dGNsYXNzPVwiZmxhc2hvbmx5XCI+WW91IGNhbiBnaXZlIGEgdGV4dCBmaWVsZCBhbiBpbnN0YW5jZSBuYW1lIGluIHRoZVxuICogUHJvcGVydHkgaW5zcGVjdG9yIGFuZCB1c2UgdGhlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgb2YgdGhlIFRleHRGaWVsZFxuICogY2xhc3MgdG8gbWFuaXB1bGF0ZSBpdCB3aXRoIEFjdGlvblNjcmlwdC4gVGV4dEZpZWxkIGluc3RhbmNlIG5hbWVzIGFyZVxuICogZGlzcGxheWVkIGluIHRoZSBNb3ZpZSBFeHBsb3JlciBhbmQgaW4gdGhlIEluc2VydCBUYXJnZXQgUGF0aCBkaWFsb2cgYm94IGluXG4gKiB0aGUgQWN0aW9ucyBwYW5lbC5cbiAqXG4gKiA8cD5UbyBjcmVhdGUgYSB0ZXh0IGZpZWxkIGR5bmFtaWNhbGx5LCB1c2UgdGhlIDxjb2RlPlRleHRGaWVsZCgpPC9jb2RlPlxuICogY29uc3RydWN0b3IuPC9wPlxuICpcbiAqIDxwPlRoZSBtZXRob2RzIG9mIHRoZSBUZXh0RmllbGQgY2xhc3MgbGV0IHlvdSBzZXQsIHNlbGVjdCwgYW5kIG1hbmlwdWxhdGVcbiAqIHRleHQgaW4gYSBkeW5hbWljIG9yIGlucHV0IHRleHQgZmllbGQgdGhhdCB5b3UgY3JlYXRlIGR1cmluZyBhdXRob3Jpbmcgb3JcbiAqIGF0IHJ1bnRpbWUuIDwvcD5cbiAqXG4gKiA8cD5BY3Rpb25TY3JpcHQgcHJvdmlkZXMgc2V2ZXJhbCB3YXlzIHRvIGZvcm1hdCB5b3VyIHRleHQgYXQgcnVudGltZS4gVGhlXG4gKiBUZXh0Rm9ybWF0IGNsYXNzIGxldHMgeW91IHNldCBjaGFyYWN0ZXIgYW5kIHBhcmFncmFwaCBmb3JtYXR0aW5nIGZvclxuICogVGV4dEZpZWxkIG9iamVjdHMuIFlvdSBjYW4gYXBwbHkgQ2FzY2FkaW5nIFN0eWxlIFNoZWV0cyhDU1MpIHN0eWxlcyB0b1xuICogdGV4dCBmaWVsZHMgYnkgdXNpbmcgdGhlIDxjb2RlPlRleHRGaWVsZC5zdHlsZVNoZWV0PC9jb2RlPiBwcm9wZXJ0eSBhbmQgdGhlXG4gKiBTdHlsZVNoZWV0IGNsYXNzLiBZb3UgY2FuIHVzZSBDU1MgdG8gc3R5bGUgYnVpbHQtaW4gSFRNTCB0YWdzLCBkZWZpbmUgbmV3XG4gKiBmb3JtYXR0aW5nIHRhZ3MsIG9yIGFwcGx5IHN0eWxlcy4gWW91IGNhbiBhc3NpZ24gSFRNTCBmb3JtYXR0ZWQgdGV4dCwgd2hpY2hcbiAqIG9wdGlvbmFsbHkgdXNlcyBDU1Mgc3R5bGVzLCBkaXJlY3RseSB0byBhIHRleHQgZmllbGQuIEhUTUwgdGV4dCB0aGF0IHlvdVxuICogYXNzaWduIHRvIGEgdGV4dCBmaWVsZCBjYW4gY29udGFpbiBlbWJlZGRlZCBtZWRpYShtb3ZpZSBjbGlwcywgU1dGIGZpbGVzLFxuICogR0lGIGZpbGVzLCBQTkcgZmlsZXMsIGFuZCBKUEVHIGZpbGVzKS4gVGhlIHRleHQgd3JhcHMgYXJvdW5kIHRoZSBlbWJlZGRlZFxuICogbWVkaWEgaW4gdGhlIHNhbWUgd2F5IHRoYXQgYSB3ZWIgYnJvd3NlciB3cmFwcyB0ZXh0IGFyb3VuZCBtZWRpYSBlbWJlZGRlZFxuICogaW4gYW4gSFRNTCBkb2N1bWVudC4gPC9wPlxuICpcbiAqIDxwPkZsYXNoIFBsYXllciBzdXBwb3J0cyBhIHN1YnNldCBvZiBIVE1MIHRhZ3MgdGhhdCB5b3UgY2FuIHVzZSB0byBmb3JtYXRcbiAqIHRleHQuIFNlZSB0aGUgbGlzdCBvZiBzdXBwb3J0ZWQgSFRNTCB0YWdzIGluIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGVcbiAqIDxjb2RlPmh0bWxUZXh0PC9jb2RlPiBwcm9wZXJ0eS48L3A+XG4gKiBcbiAqIEBldmVudCBjaGFuZ2UgICAgICAgICAgICAgICAgICAgIERpc3BhdGNoZWQgYWZ0ZXIgYSBjb250cm9sIHZhbHVlIGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllZCwgdW5saWtlIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dGV4dElucHV0PC9jb2RlPiBldmVudCwgd2hpY2ggaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoZWQgYmVmb3JlIHRoZSB2YWx1ZSBpcyBtb2RpZmllZC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVubGlrZSB0aGUgVzNDIERPTSBFdmVudCBNb2RlbCB2ZXJzaW9uIG9mXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgPGNvZGU+Y2hhbmdlPC9jb2RlPiBldmVudCwgd2hpY2hcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoZXMgdGhlIGV2ZW50IG9ubHkgYWZ0ZXIgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sIGxvc2VzIGZvY3VzLCB0aGUgQWN0aW9uU2NyaXB0IDMuMFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiBvZiB0aGUgPGNvZGU+Y2hhbmdlPC9jb2RlPiBldmVudFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgZGlzcGF0Y2hlZCBhbnkgdGltZSB0aGUgY29udHJvbFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlcy4gRm9yIGV4YW1wbGUsIGlmIGEgdXNlciB0eXBlcyB0ZXh0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRvIGEgdGV4dCBmaWVsZCwgYSA8Y29kZT5jaGFuZ2U8L2NvZGU+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCBpcyBkaXNwYXRjaGVkIGFmdGVyIGV2ZXJ5IGtleXN0cm9rZS5cbiAqIEBldmVudCBsaW5rICAgICAgICAgICAgICAgICAgICAgIERpc3BhdGNoZWQgd2hlbiBhIHVzZXIgY2xpY2tzIGEgaHlwZXJsaW5rXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBhbiBIVE1MLWVuYWJsZWQgdGV4dCBmaWVsZCwgd2hlcmUgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVUkwgYmVnaW5zIHdpdGggXCJldmVudDpcIi4gVGhlIHJlbWFpbmRlciBvZlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIFVSTCBhZnRlciBcImV2ZW50OlwiIGlzIHBsYWNlZCBpbiB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgcHJvcGVydHkgb2YgdGhlIExJTksgZXZlbnQuXG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGI+Tm90ZTo8L2I+IFRoZSBkZWZhdWx0IGJlaGF2aW9yLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkaW5nIHRoZSB0ZXh0IHRvIHRoZSB0ZXh0IGZpZWxkLCBvY2N1cnNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ubHkgd2hlbiBGbGFzaCBQbGF5ZXIgZ2VuZXJhdGVzIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsIHdoaWNoIGluIHRoaXMgY2FzZSBoYXBwZW5zIHdoZW4gYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlciBhdHRlbXB0cyB0byBpbnB1dCB0ZXh0LiBZb3UgY2Fubm90XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXQgdGV4dCBpbnRvIGEgdGV4dCBmaWVsZCBieSBzZW5kaW5nIGl0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT50ZXh0SW5wdXQ8L2NvZGU+IGV2ZW50cy48L3A+XG4gKiBAZXZlbnQgc2Nyb2xsICAgICAgICAgICAgICAgICAgICBEaXNwYXRjaGVkIGJ5IGEgVGV4dEZpZWxkIG9iamVjdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+YWZ0ZXI8L2k+IHRoZSB1c2VyIHNjcm9sbHMuXG4gKiBAZXZlbnQgdGV4dElucHV0ICAgICAgICAgICAgICAgICBGbGFzaCBQbGF5ZXIgZGlzcGF0Y2hlcyB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnRleHRJbnB1dDwvY29kZT4gZXZlbnQgd2hlbiBhIHVzZXJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGVycyBvbmUgb3IgbW9yZSBjaGFyYWN0ZXJzIG9mIHRleHQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWYXJpb3VzIHRleHQgaW5wdXQgbWV0aG9kcyBjYW4gZ2VuZXJhdGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgZXZlbnQsIGluY2x1ZGluZyBzdGFuZGFyZCBrZXlib2FyZHMsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCBtZXRob2QgZWRpdG9ycyhJTUVzKSwgdm9pY2Ugb3JcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVjaCByZWNvZ25pdGlvbiBzeXN0ZW1zLCBhbmQgZXZlbiB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdCBvZiBwYXN0aW5nIHBsYWluIHRleHQgd2l0aCBub1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGluZyBvciBzdHlsZSBpbmZvcm1hdGlvbi5cbiAqIEBldmVudCB0ZXh0SW50ZXJhY3Rpb25Nb2RlQ2hhbmdlIEZsYXNoIFBsYXllciBkaXNwYXRjaGVzIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dGV4dEludGVyYWN0aW9uTW9kZUNoYW5nZTwvY29kZT5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IHdoZW4gYSB1c2VyIGNoYW5nZXMgdGhlIGludGVyYWN0aW9uXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlIG9mIGEgdGV4dCBmaWVsZC4gZm9yIGV4YW1wbGUgb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFuZHJvaWQsIG9uZSBjYW4gdG9nZ2xlIGZyb20gTk9STUFMIG1vZGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIFNFTEVDVElPTiBtb2RlIHVzaW5nIGNvbnRleHQgbWVudVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xuICovXG5jbGFzcyBUZXh0RmllbGQgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0XG57XG5cdHByaXZhdGUgX2JvdHRvbVNjcm9sbFY6bnVtYmVyO1xuXHRwcml2YXRlIF9jYXJldEluZGV4Om51bWJlcjtcblx0cHJpdmF0ZSBfbGVuZ3RoOm51bWJlcjtcblx0cHJpdmF0ZSBfbWF4U2Nyb2xsSDpudW1iZXI7XG5cdHByaXZhdGUgX21heFNjcm9sbFY6bnVtYmVyO1xuXHRwcml2YXRlIF9udW1MaW5lczpudW1iZXI7XG5cdHByaXZhdGUgX3NlbGVjdGlvbkJlZ2luSW5kZXg6bnVtYmVyO1xuXHRwcml2YXRlIF9zZWxlY3Rpb25FbmRJbmRleDpudW1iZXI7XG5cdHByaXZhdGUgX3RleHQ6c3RyaW5nID0gXCJcIjtcblx0cHJpdmF0ZSBfdGV4dEhlaWdodDpudW1iZXI7XG5cdHByaXZhdGUgX3RleHRJbnRlcmFjdGlvbk1vZGU6VGV4dEludGVyYWN0aW9uTW9kZTtcblx0cHJpdmF0ZSBfdGV4dFdpZHRoOm51bWJlcjtcblxuXHRwcml2YXRlIF9jaGFyQm91bmRhcmllczpSZWN0YW5nbGU7XG5cdHByaXZhdGUgX2NoYXJJbmRleEF0UG9pbnQ6bnVtYmVyO1xuXHRwcml2YXRlIF9maXJzdENoYXJJblBhcmFncmFwaDpudW1iZXI7XG5cdHByaXZhdGUgX2ltYWdlUmVmZXJlbmNlOkRpc3BsYXlPYmplY3Rcblx0cHJpdmF0ZSBfbGluZUluZGV4QXRQb2ludDpudW1iZXI7XG5cdHByaXZhdGUgX2xpbmVJbmRleE9mQ2hhcjpudW1iZXI7XG5cdHByaXZhdGUgX2xpbmVMZW5ndGg6bnVtYmVyO1xuXHRwcml2YXRlIF9saW5lTWV0cmljczpUZXh0TGluZU1ldHJpY3M7XG5cdHByaXZhdGUgX2xpbmVPZmZzZXQ6bnVtYmVyO1xuXHRwcml2YXRlIF9saW5lVGV4dDpzdHJpbmc7XG5cdHByaXZhdGUgX3BhcmFncmFwaExlbmd0aDpudW1iZXI7XG5cdHByaXZhdGUgX3RleHRGb3JtYXQ6VGV4dEZvcm1hdDtcblxuXHQvKipcblx0ICogV2hlbiBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4gYW5kIHRoZSB0ZXh0IGZpZWxkIGlzIG5vdCBpbiBmb2N1cywgRmxhc2hcblx0ICogUGxheWVyIGhpZ2hsaWdodHMgdGhlIHNlbGVjdGlvbiBpbiB0aGUgdGV4dCBmaWVsZCBpbiBncmF5LiBXaGVuIHNldCB0b1xuXHQgKiA8Y29kZT5mYWxzZTwvY29kZT4gYW5kIHRoZSB0ZXh0IGZpZWxkIGlzIG5vdCBpbiBmb2N1cywgRmxhc2ggUGxheWVyIGRvZXNcblx0ICogbm90IGhpZ2hsaWdodCB0aGUgc2VsZWN0aW9uIGluIHRoZSB0ZXh0IGZpZWxkLlxuXHQgKiBcblx0ICogQGRlZmF1bHQgZmFsc2Vcblx0ICovXG5cdHB1YmxpYyBhbHdheXNTaG93U2VsZWN0aW9uOmJvb2xlYW5cblxuXHQvKipcblx0ICogVGhlIHR5cGUgb2YgYW50aS1hbGlhc2luZyB1c2VkIGZvciB0aGlzIHRleHQgZmllbGQuIFVzZVxuXHQgKiA8Y29kZT5mbGFzaC50ZXh0LkFudGlBbGlhc1R5cGU8L2NvZGU+IGNvbnN0YW50cyBmb3IgdGhpcyBwcm9wZXJ0eS4gWW91IGNhblxuXHQgKiBjb250cm9sIHRoaXMgc2V0dGluZyBvbmx5IGlmIHRoZSBmb250IGlzIGVtYmVkZGVkKHdpdGggdGhlXG5cdCAqIDxjb2RlPmVtYmVkRm9udHM8L2NvZGU+IHByb3BlcnR5IHNldCB0byA8Y29kZT50cnVlPC9jb2RlPikuIFRoZSBkZWZhdWx0XG5cdCAqIHNldHRpbmcgaXMgPGNvZGU+Zmxhc2gudGV4dC5BbnRpQWxpYXNUeXBlLk5PUk1BTDwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPlRvIHNldCB2YWx1ZXMgZm9yIHRoaXMgcHJvcGVydHksIHVzZSB0aGUgZm9sbG93aW5nIHN0cmluZyB2YWx1ZXM6PC9wPlxuXHQgKi9cblx0cHVibGljIGFudGlBbGlhc1R5cGU6QW50aUFsaWFzVHlwZTtcblxuXHQvKipcblx0ICogQ29udHJvbHMgYXV0b21hdGljIHNpemluZyBhbmQgYWxpZ25tZW50IG9mIHRleHQgZmllbGRzLiBBY2NlcHRhYmxlIHZhbHVlc1xuXHQgKiBmb3IgdGhlIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplPC9jb2RlPiBjb25zdGFudHM6XG5cdCAqIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLk5PTkU8L2NvZGU+KHRoZSBkZWZhdWx0KSxcblx0ICogPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuTEVGVDwvY29kZT4sIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLlJJR0hUPC9jb2RlPixcblx0ICogYW5kIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLkNFTlRFUjwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPklmIDxjb2RlPmF1dG9TaXplPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuTk9ORTwvY29kZT5cblx0ICogKHRoZSBkZWZhdWx0KSBubyByZXNpemluZyBvY2N1cnMuPC9wPlxuXHQgKlxuXHQgKiA8cD5JZiA8Y29kZT5hdXRvU2l6ZTwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLkxFRlQ8L2NvZGU+LFxuXHQgKiB0aGUgdGV4dCBpcyB0cmVhdGVkIGFzIGxlZnQtanVzdGlmaWVkIHRleHQsIG1lYW5pbmcgdGhhdCB0aGUgbGVmdCBtYXJnaW5cblx0ICogb2YgdGhlIHRleHQgZmllbGQgcmVtYWlucyBmaXhlZCBhbmQgYW55IHJlc2l6aW5nIG9mIGEgc2luZ2xlIGxpbmUgb2YgdGhlXG5cdCAqIHRleHQgZmllbGQgaXMgb24gdGhlIHJpZ2h0IG1hcmdpbi4gSWYgdGhlIHRleHQgaW5jbHVkZXMgYSBsaW5lIGJyZWFrKGZvclxuXHQgKiBleGFtcGxlLCA8Y29kZT5cIlxcblwiPC9jb2RlPiBvciA8Y29kZT5cIlxcclwiPC9jb2RlPiksIHRoZSBib3R0b20gaXMgYWxzb1xuXHQgKiByZXNpemVkIHRvIGZpdCB0aGUgbmV4dCBsaW5lIG9mIHRleHQuIElmIDxjb2RlPndvcmRXcmFwPC9jb2RlPiBpcyBhbHNvIHNldFxuXHQgKiB0byA8Y29kZT50cnVlPC9jb2RlPiwgb25seSB0aGUgYm90dG9tIG9mIHRoZSB0ZXh0IGZpZWxkIGlzIHJlc2l6ZWQgYW5kIHRoZVxuXHQgKiByaWdodCBzaWRlIHJlbWFpbnMgZml4ZWQuPC9wPlxuXHQgKlxuXHQgKiA8cD5JZiA8Y29kZT5hdXRvU2l6ZTwvY29kZT4gaXMgc2V0IHRvXG5cdCAqIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLlJJR0hUPC9jb2RlPiwgdGhlIHRleHQgaXMgdHJlYXRlZCBhc1xuXHQgKiByaWdodC1qdXN0aWZpZWQgdGV4dCwgbWVhbmluZyB0aGF0IHRoZSByaWdodCBtYXJnaW4gb2YgdGhlIHRleHQgZmllbGRcblx0ICogcmVtYWlucyBmaXhlZCBhbmQgYW55IHJlc2l6aW5nIG9mIGEgc2luZ2xlIGxpbmUgb2YgdGhlIHRleHQgZmllbGQgaXMgb25cblx0ICogdGhlIGxlZnQgbWFyZ2luLiBJZiB0aGUgdGV4dCBpbmNsdWRlcyBhIGxpbmUgYnJlYWsoZm9yIGV4YW1wbGUsXG5cdCAqIDxjb2RlPlwiXFxuXCIgb3IgXCJcXHJcIik8L2NvZGU+LCB0aGUgYm90dG9tIGlzIGFsc28gcmVzaXplZCB0byBmaXQgdGhlIG5leHRcblx0ICogbGluZSBvZiB0ZXh0LiBJZiA8Y29kZT53b3JkV3JhcDwvY29kZT4gaXMgYWxzbyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sXG5cdCAqIG9ubHkgdGhlIGJvdHRvbSBvZiB0aGUgdGV4dCBmaWVsZCBpcyByZXNpemVkIGFuZCB0aGUgbGVmdCBzaWRlIHJlbWFpbnNcblx0ICogZml4ZWQuPC9wPlxuXHQgKlxuXHQgKiA8cD5JZiA8Y29kZT5hdXRvU2l6ZTwvY29kZT4gaXMgc2V0IHRvXG5cdCAqIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLkNFTlRFUjwvY29kZT4sIHRoZSB0ZXh0IGlzIHRyZWF0ZWQgYXNcblx0ICogY2VudGVyLWp1c3RpZmllZCB0ZXh0LCBtZWFuaW5nIHRoYXQgYW55IHJlc2l6aW5nIG9mIGEgc2luZ2xlIGxpbmUgb2YgdGhlXG5cdCAqIHRleHQgZmllbGQgaXMgZXF1YWxseSBkaXN0cmlidXRlZCB0byBib3RoIHRoZSByaWdodCBhbmQgbGVmdCBtYXJnaW5zLiBJZlxuXHQgKiB0aGUgdGV4dCBpbmNsdWRlcyBhIGxpbmUgYnJlYWsoZm9yIGV4YW1wbGUsIDxjb2RlPlwiXFxuXCI8L2NvZGU+IG9yXG5cdCAqIDxjb2RlPlwiXFxyXCI8L2NvZGU+KSwgdGhlIGJvdHRvbSBpcyBhbHNvIHJlc2l6ZWQgdG8gZml0IHRoZSBuZXh0IGxpbmUgb2Zcblx0ICogdGV4dC4gSWYgPGNvZGU+d29yZFdyYXA8L2NvZGU+IGlzIGFsc28gc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCBvbmx5IHRoZVxuXHQgKiBib3R0b20gb2YgdGhlIHRleHQgZmllbGQgaXMgcmVzaXplZCBhbmQgdGhlIGxlZnQgYW5kIHJpZ2h0IHNpZGVzIHJlbWFpblxuXHQgKiBmaXhlZC48L3A+XG5cdCAqIFxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhlIDxjb2RlPmF1dG9TaXplPC9jb2RlPiBzcGVjaWZpZWQgaXMgbm90IGEgbWVtYmVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBvZiBmbGFzaC50ZXh0LlRleHRGaWVsZEF1dG9TaXplLlxuXHQgKi9cblx0cHVibGljIGF1dG9TaXplOlRleHRGaWVsZEF1dG9TaXplO1xuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgd2hldGhlciB0aGUgdGV4dCBmaWVsZCBoYXMgYSBiYWNrZ3JvdW5kIGZpbGwuIElmXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBoYXMgYSBiYWNrZ3JvdW5kIGZpbGwuIElmXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaGFzIG5vIGJhY2tncm91bmQgZmlsbC4gVXNlIHRoZVxuXHQgKiA8Y29kZT5iYWNrZ3JvdW5kQ29sb3I8L2NvZGU+IHByb3BlcnR5IHRvIHNldCB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiBhXG5cdCAqIHRleHQgZmllbGQuXG5cdCAqIFxuXHQgKiBAZGVmYXVsdCBmYWxzZVxuXHQgKi9cblx0cHVibGljIGJhY2tncm91bmQ6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIGNvbG9yIG9mIHRoZSB0ZXh0IGZpZWxkIGJhY2tncm91bmQuIFRoZSBkZWZhdWx0IHZhbHVlIGlzXG5cdCAqIDxjb2RlPjB4RkZGRkZGPC9jb2RlPih3aGl0ZSkuIFRoaXMgcHJvcGVydHkgY2FuIGJlIHJldHJpZXZlZCBvciBzZXQsIGV2ZW5cblx0ICogaWYgdGhlcmUgY3VycmVudGx5IGlzIG5vIGJhY2tncm91bmQsIGJ1dCB0aGUgY29sb3IgaXMgdmlzaWJsZSBvbmx5IGlmIHRoZVxuXHQgKiB0ZXh0IGZpZWxkIGhhcyB0aGUgPGNvZGU+YmFja2dyb3VuZDwvY29kZT4gcHJvcGVydHkgc2V0IHRvXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGJhY2tncm91bmRDb2xvcjpudW1iZXIgLyppbnQqLztcblxuXHQvKipcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdGhlIHRleHQgZmllbGQgaGFzIGEgYm9yZGVyLiBJZiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlXG5cdCAqIHRleHQgZmllbGQgaGFzIGEgYm9yZGVyLiBJZiA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSB0ZXh0IGZpZWxkIGhhcyBub1xuXHQgKiBib3JkZXIuIFVzZSB0aGUgPGNvZGU+Ym9yZGVyQ29sb3I8L2NvZGU+IHByb3BlcnR5IHRvIHNldCB0aGUgYm9yZGVyIGNvbG9yLlxuXHQgKiBcblx0ICogQGRlZmF1bHQgZmFsc2Vcblx0ICovXG5cdHB1YmxpYyBib3JkZXI6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIGNvbG9yIG9mIHRoZSB0ZXh0IGZpZWxkIGJvcmRlci4gVGhlIGRlZmF1bHQgdmFsdWUgaXNcblx0ICogPGNvZGU+MHgwMDAwMDA8L2NvZGU+KGJsYWNrKS4gVGhpcyBwcm9wZXJ0eSBjYW4gYmUgcmV0cmlldmVkIG9yIHNldCwgZXZlblxuXHQgKiBpZiB0aGVyZSBjdXJyZW50bHkgaXMgbm8gYm9yZGVyLCBidXQgdGhlIGNvbG9yIGlzIHZpc2libGUgb25seSBpZiB0aGUgdGV4dFxuXHQgKiBmaWVsZCBoYXMgdGhlIDxjb2RlPmJvcmRlcjwvY29kZT4gcHJvcGVydHkgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGJvcmRlckNvbG9yOm51bWJlciAvKmludCovO1xuXG5cdC8qKlxuXHQgKiBBbiBpbnRlZ2VyKDEtYmFzZWQgaW5kZXgpIHRoYXQgaW5kaWNhdGVzIHRoZSBib3R0b21tb3N0IGxpbmUgdGhhdCBpc1xuXHQgKiBjdXJyZW50bHkgdmlzaWJsZSBpbiB0aGUgc3BlY2lmaWVkIHRleHQgZmllbGQuIFRoaW5rIG9mIHRoZSB0ZXh0IGZpZWxkIGFzXG5cdCAqIGEgd2luZG93IG9udG8gYSBibG9jayBvZiB0ZXh0LiBUaGUgPGNvZGU+c2Nyb2xsVjwvY29kZT4gcHJvcGVydHkgaXMgdGhlXG5cdCAqIDEtYmFzZWQgaW5kZXggb2YgdGhlIHRvcG1vc3QgdmlzaWJsZSBsaW5lIGluIHRoZSB3aW5kb3cuXG5cdCAqXG5cdCAqIDxwPkFsbCB0aGUgdGV4dCBiZXR3ZWVuIHRoZSBsaW5lcyBpbmRpY2F0ZWQgYnkgPGNvZGU+c2Nyb2xsVjwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPmJvdHRvbVNjcm9sbFY8L2NvZGU+IGlzIGN1cnJlbnRseSB2aXNpYmxlIGluIHRoZSB0ZXh0IGZpZWxkLjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgYm90dG9tU2Nyb2xsVigpOm51bWJlciAvKmludCovXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYm90dG9tU2Nyb2xsVjtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgaW5kZXggb2YgdGhlIGluc2VydGlvbiBwb2ludChjYXJldCkgcG9zaXRpb24uIElmIG5vIGluc2VydGlvbiBwb2ludFxuXHQgKiBpcyBkaXNwbGF5ZWQsIHRoZSB2YWx1ZSBpcyB0aGUgcG9zaXRpb24gdGhlIGluc2VydGlvbiBwb2ludCB3b3VsZCBiZSBpZlxuXHQgKiB5b3UgcmVzdG9yZWQgZm9jdXMgdG8gdGhlIGZpZWxkKHR5cGljYWxseSB3aGVyZSB0aGUgaW5zZXJ0aW9uIHBvaW50IGxhc3Rcblx0ICogd2FzLCBvciAwIGlmIHRoZSBmaWVsZCBoYXMgbm90IGhhZCBmb2N1cykuXG5cdCAqXG5cdCAqIDxwPlNlbGVjdGlvbiBzcGFuIGluZGV4ZXMgYXJlIHplcm8tYmFzZWQoZm9yIGV4YW1wbGUsIHRoZSBmaXJzdCBwb3NpdGlvblxuXHQgKiBpcyAwLCB0aGUgc2Vjb25kIHBvc2l0aW9uIGlzIDEsIGFuZCBzbyBvbikuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBjYXJldEluZGV4KCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9jYXJldEluZGV4O1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgQm9vbGVhbiB2YWx1ZSB0aGF0IHNwZWNpZmllcyB3aGV0aGVyIGV4dHJhIHdoaXRlIHNwYWNlKHNwYWNlcywgbGluZVxuXHQgKiBicmVha3MsIGFuZCBzbyBvbikgaW4gYSB0ZXh0IGZpZWxkIHdpdGggSFRNTCB0ZXh0IGlzIHJlbW92ZWQuIFRoZSBkZWZhdWx0XG5cdCAqIHZhbHVlIGlzIDxjb2RlPmZhbHNlPC9jb2RlPi4gVGhlIDxjb2RlPmNvbmRlbnNlV2hpdGU8L2NvZGU+IHByb3BlcnR5IG9ubHlcblx0ICogYWZmZWN0cyB0ZXh0IHNldCB3aXRoIHRoZSA8Y29kZT5odG1sVGV4dDwvY29kZT4gcHJvcGVydHksIG5vdCB0aGVcblx0ICogPGNvZGU+dGV4dDwvY29kZT4gcHJvcGVydHkuIElmIHlvdSBzZXQgdGV4dCB3aXRoIHRoZSA8Y29kZT50ZXh0PC9jb2RlPlxuXHQgKiBwcm9wZXJ0eSwgPGNvZGU+Y29uZGVuc2VXaGl0ZTwvY29kZT4gaXMgaWdub3JlZC5cblx0ICpcblx0ICogPHA+SWYgPGNvZGU+Y29uZGVuc2VXaGl0ZTwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCB1c2Ugc3RhbmRhcmRcblx0ICogSFRNTCBjb21tYW5kcyBzdWNoIGFzIDxjb2RlPjxCUj48L2NvZGU+IGFuZCA8Y29kZT48UD48L2NvZGU+IHRvIHBsYWNlIGxpbmVcblx0ICogYnJlYWtzIGluIHRoZSB0ZXh0IGZpZWxkLjwvcD5cblx0ICpcblx0ICogPHA+U2V0IHRoZSA8Y29kZT5jb25kZW5zZVdoaXRlPC9jb2RlPiBwcm9wZXJ0eSBiZWZvcmUgc2V0dGluZyB0aGVcblx0ICogPGNvZGU+aHRtbFRleHQ8L2NvZGU+IHByb3BlcnR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyBjb25kZW5zZVdoaXRlOmJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB0aGUgZm9ybWF0IGFwcGxpZWQgdG8gbmV3bHkgaW5zZXJ0ZWQgdGV4dCwgc3VjaCBhcyB0ZXh0IGVudGVyZWRcblx0ICogYnkgYSB1c2VyIG9yIHRleHQgaW5zZXJ0ZWQgd2l0aCB0aGUgPGNvZGU+cmVwbGFjZVNlbGVjdGVkVGV4dCgpPC9jb2RlPlxuXHQgKiBtZXRob2QuXG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBXaGVuIHNlbGVjdGluZyBjaGFyYWN0ZXJzIHRvIGJlIHJlcGxhY2VkIHdpdGhcblx0ICogPGNvZGU+c2V0U2VsZWN0aW9uKCk8L2NvZGU+IGFuZCA8Y29kZT5yZXBsYWNlU2VsZWN0ZWRUZXh0KCk8L2NvZGU+LCB0aGVcblx0ICogPGNvZGU+ZGVmYXVsdFRleHRGb3JtYXQ8L2NvZGU+IHdpbGwgYmUgYXBwbGllZCBvbmx5IGlmIHRoZSB0ZXh0IGhhcyBiZWVuXG5cdCAqIHNlbGVjdGVkIHVwIHRvIGFuZCBpbmNsdWRpbmcgdGhlIGxhc3QgY2hhcmFjdGVyLiBIZXJlIGlzIGFuIGV4YW1wbGU6PC9wPlxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+IHB1YmxpYyBteV90eHQ6VGV4dEZpZWxkIG5ldyBUZXh0RmllbGQoKTtcblx0ICogbXlfdHh0LnRleHQgPSBcIkZsYXNoIE1hY2ludG9zaCB2ZXJzaW9uXCI7IHB1YmxpYyBteV9mbXQ6VGV4dEZvcm1hdCA9IG5ld1xuXHQgKiBUZXh0Rm9ybWF0KCk7IG15X2ZtdC5jb2xvciA9IDB4RkYwMDAwOyBteV90eHQuZGVmYXVsdFRleHRGb3JtYXQgPSBteV9mbXQ7XG5cdCAqIG15X3R4dC5zZXRTZWxlY3Rpb24oNiwxNSk7IC8vIHBhcnRpYWwgdGV4dCBzZWxlY3RlZCAtIGRlZmF1bHRUZXh0Rm9ybWF0XG5cdCAqIG5vdCBhcHBsaWVkIG15X3R4dC5zZXRTZWxlY3Rpb24oNiwyMyk7IC8vIHRleHQgc2VsZWN0ZWQgdG8gZW5kIC1cblx0ICogZGVmYXVsdFRleHRGb3JtYXQgYXBwbGllZCBteV90eHQucmVwbGFjZVNlbGVjdGVkVGV4dChcIldpbmRvd3MgdmVyc2lvblwiKTtcblx0ICogPC9wcmU+XG5cdCAqXG5cdCAqIDxwPldoZW4geW91IGFjY2VzcyB0aGUgPGNvZGU+ZGVmYXVsdFRleHRGb3JtYXQ8L2NvZGU+IHByb3BlcnR5LCB0aGVcblx0ICogcmV0dXJuZWQgVGV4dEZvcm1hdCBvYmplY3QgaGFzIGFsbCBvZiBpdHMgcHJvcGVydGllcyBkZWZpbmVkLiBObyBwcm9wZXJ0eVxuXHQgKiBpcyA8Y29kZT5udWxsPC9jb2RlPi48L3A+XG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBZb3UgY2FuJ3Qgc2V0IHRoaXMgcHJvcGVydHkgaWYgYSBzdHlsZSBzaGVldCBpcyBhcHBsaWVkIHRvXG5cdCAqIHRoZSB0ZXh0IGZpZWxkLjwvcD5cblx0ICogXG5cdCAqIEB0aHJvd3MgRXJyb3IgVGhpcyBtZXRob2QgY2Fubm90IGJlIHVzZWQgb24gYSB0ZXh0IGZpZWxkIHdpdGggYSBzdHlsZVxuXHQgKiAgICAgICAgICAgICAgIHNoZWV0LlxuXHQgKi9cblx0cHVibGljIGRlZmF1bHRUZXh0Rm9ybWF0OlRleHRGb3JtYXQ7XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIHRoZSB0ZXh0IGZpZWxkIGlzIGEgcGFzc3dvcmQgdGV4dCBmaWVsZC4gSWYgdGhlIHZhbHVlIG9mXG5cdCAqIHRoaXMgcHJvcGVydHkgaXMgPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSB0ZXh0IGZpZWxkIGlzIHRyZWF0ZWQgYXMgYVxuXHQgKiBwYXNzd29yZCB0ZXh0IGZpZWxkIGFuZCBoaWRlcyB0aGUgaW5wdXQgY2hhcmFjdGVycyB1c2luZyBhc3Rlcmlza3MgaW5zdGVhZFxuXHQgKiBvZiB0aGUgYWN0dWFsIGNoYXJhY3RlcnMuIElmIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaXMgbm90XG5cdCAqIHRyZWF0ZWQgYXMgYSBwYXNzd29yZCB0ZXh0IGZpZWxkLiBXaGVuIHBhc3N3b3JkIG1vZGUgaXMgZW5hYmxlZCwgdGhlIEN1dFxuXHQgKiBhbmQgQ29weSBjb21tYW5kcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBrZXlib2FyZCBzaG9ydGN1dHMgd2lsbCBub3Rcblx0ICogZnVuY3Rpb24uIFRoaXMgc2VjdXJpdHkgbWVjaGFuaXNtIHByZXZlbnRzIGFuIHVuc2NydXB1bG91cyB1c2VyIGZyb20gdXNpbmdcblx0ICogdGhlIHNob3J0Y3V0cyB0byBkaXNjb3ZlciBhIHBhc3N3b3JkIG9uIGFuIHVuYXR0ZW5kZWQgY29tcHV0ZXIuXG5cdCAqIFxuXHQgKiBAZGVmYXVsdCBmYWxzZVxuXHQgKi9cblx0cHVibGljIGRpc3BsYXlBc1Bhc3N3b3JkOmJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIHRvIHJlbmRlciBieSB1c2luZyBlbWJlZGRlZCBmb250IG91dGxpbmVzLiBJZlxuXHQgKiA8Y29kZT5mYWxzZTwvY29kZT4sIEZsYXNoIFBsYXllciByZW5kZXJzIHRoZSB0ZXh0IGZpZWxkIGJ5IHVzaW5nIGRldmljZVxuXHQgKiBmb250cy5cblx0ICpcblx0ICogPHA+SWYgeW91IHNldCB0aGUgPGNvZGU+ZW1iZWRGb250czwvY29kZT4gcHJvcGVydHkgdG8gPGNvZGU+dHJ1ZTwvY29kZT5cblx0ICogZm9yIGEgdGV4dCBmaWVsZCwgeW91IG11c3Qgc3BlY2lmeSBhIGZvbnQgZm9yIHRoYXQgdGV4dCBieSB1c2luZyB0aGVcblx0ICogPGNvZGU+Zm9udDwvY29kZT4gcHJvcGVydHkgb2YgYSBUZXh0Rm9ybWF0IG9iamVjdCBhcHBsaWVkIHRvIHRoZSB0ZXh0XG5cdCAqIGZpZWxkLiBJZiB0aGUgc3BlY2lmaWVkIGZvbnQgaXMgbm90IGVtYmVkZGVkIGluIHRoZSBTV0YgZmlsZSwgdGhlIHRleHQgaXNcblx0ICogbm90IGRpc3BsYXllZC48L3A+XG5cdCAqIFxuXHQgKiBAZGVmYXVsdCBmYWxzZVxuXHQgKi9cblx0cHVibGljIGVtYmVkRm9udHM6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIHR5cGUgb2YgZ3JpZCBmaXR0aW5nIHVzZWQgZm9yIHRoaXMgdGV4dCBmaWVsZC4gVGhpcyBwcm9wZXJ0eSBhcHBsaWVzXG5cdCAqIG9ubHkgaWYgdGhlIDxjb2RlPmZsYXNoLnRleHQuQW50aUFsaWFzVHlwZTwvY29kZT4gcHJvcGVydHkgb2YgdGhlIHRleHRcblx0ICogZmllbGQgaXMgc2V0IHRvIDxjb2RlPmZsYXNoLnRleHQuQW50aUFsaWFzVHlwZS5BRFZBTkNFRDwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPlRoZSB0eXBlIG9mIGdyaWQgZml0dGluZyB1c2VkIGRldGVybWluZXMgd2hldGhlciBGbGFzaCBQbGF5ZXIgZm9yY2VzXG5cdCAqIHN0cm9uZyBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBsaW5lcyB0byBmaXQgdG8gYSBwaXhlbCBvciBzdWJwaXhlbCBncmlkLFxuXHQgKiBvciBub3QgYXQgYWxsLjwvcD5cblx0ICpcblx0ICogPHA+Rm9yIHRoZSA8Y29kZT5mbGFzaC50ZXh0LkdyaWRGaXRUeXBlPC9jb2RlPiBwcm9wZXJ0eSwgeW91IGNhbiB1c2UgdGhlXG5cdCAqIGZvbGxvd2luZyBzdHJpbmcgdmFsdWVzOjwvcD5cblx0ICogXG5cdCAqIEBkZWZhdWx0IHBpeGVsXG5cdCAqL1xuXHRwdWJsaWMgZ3JpZEZpdFR5cGU6R3JpZEZpdFR5cGU7XG5cblx0LyoqXG5cdCAqIENvbnRhaW5zIHRoZSBIVE1MIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0ZXh0IGZpZWxkIGNvbnRlbnRzLlxuXHQgKlxuXHQgKiA8cD5GbGFzaCBQbGF5ZXIgc3VwcG9ydHMgdGhlIGZvbGxvd2luZyBIVE1MIHRhZ3M6PC9wPlxuXHQgKlxuXHQgKiA8cD5GbGFzaCBQbGF5ZXIgYW5kIEFJUiBhbHNvIHN1cHBvcnQgZXhwbGljaXQgY2hhcmFjdGVyIGNvZGVzLCBzdWNoIGFzXG5cdCAqICYjMzg7KEFTQ0lJIGFtcGVyc2FuZCkgYW5kICYjeDIwQUM7KFVuaWNvZGUg4oKsIHN5bWJvbCkuIDwvcD5cblx0ICovXG5cdHB1YmxpYyBodG1sVGV4dDpzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBpbiBhIHRleHQgZmllbGQuIEEgY2hhcmFjdGVyIHN1Y2ggYXMgdGFiXG5cdCAqICg8Y29kZT5cXHQ8L2NvZGU+KSBjb3VudHMgYXMgb25lIGNoYXJhY3Rlci5cblx0ICovXG5cdHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9sZW5ndGg7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG1heGltdW0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhhdCB0aGUgdGV4dCBmaWVsZCBjYW4gY29udGFpbiwgYXNcblx0ICogZW50ZXJlZCBieSBhIHVzZXIuIEEgc2NyaXB0IGNhbiBpbnNlcnQgbW9yZSB0ZXh0IHRoYW5cblx0ICogPGNvZGU+bWF4Q2hhcnM8L2NvZGU+IGFsbG93czsgdGhlIDxjb2RlPm1heENoYXJzPC9jb2RlPiBwcm9wZXJ0eSBpbmRpY2F0ZXNcblx0ICogb25seSBob3cgbXVjaCB0ZXh0IGEgdXNlciBjYW4gZW50ZXIuIElmIHRoZSB2YWx1ZSBvZiB0aGlzIHByb3BlcnR5IGlzXG5cdCAqIDxjb2RlPjA8L2NvZGU+LCBhIHVzZXIgY2FuIGVudGVyIGFuIHVubGltaXRlZCBhbW91bnQgb2YgdGV4dC5cblx0ICogXG5cdCAqIEBkZWZhdWx0IDBcblx0ICovXG5cdHB1YmxpYyBtYXhDaGFyczpudW1iZXIgLyppbnQqLztcblxuXHQvKipcblx0ICogVGhlIG1heGltdW0gdmFsdWUgb2YgPGNvZGU+c2Nyb2xsSDwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgbWF4U2Nyb2xsSCgpOm51bWJlciAvKmludCovXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWF4U2Nyb2xsSDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbWF4aW11bSB2YWx1ZSBvZiA8Y29kZT5zY3JvbGxWPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBtYXhTY3JvbGxWKCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9tYXhTY3JvbGxWO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgQm9vbGVhbiB2YWx1ZSB0aGF0IGluZGljYXRlcyB3aGV0aGVyIEZsYXNoIFBsYXllciBhdXRvbWF0aWNhbGx5IHNjcm9sbHNcblx0ICogbXVsdGlsaW5lIHRleHQgZmllbGRzIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGEgdGV4dCBmaWVsZCBhbmQgcm9sbHMgdGhlXG5cdCAqIG1vdXNlIHdoZWVsLiBCeSBkZWZhdWx0LCB0aGlzIHZhbHVlIGlzIDxjb2RlPnRydWU8L2NvZGU+LiBUaGlzIHByb3BlcnR5IGlzXG5cdCAqIHVzZWZ1bCBpZiB5b3Ugd2FudCB0byBwcmV2ZW50IG1vdXNlIHdoZWVsIHNjcm9sbGluZyBvZiB0ZXh0IGZpZWxkcywgb3Jcblx0ICogaW1wbGVtZW50IHlvdXIgb3duIHRleHQgZmllbGQgc2Nyb2xsaW5nLlxuXHQgKi9cblx0cHVibGljIG1vdXNlV2hlZWxFbmFibGVkOmJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIGZpZWxkIGlzIGEgbXVsdGlsaW5lIHRleHQgZmllbGQuIElmIHRoZSB2YWx1ZSBpc1xuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaXMgbXVsdGlsaW5lOyBpZiB0aGUgdmFsdWUgaXNcblx0ICogPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBpcyBhIHNpbmdsZS1saW5lIHRleHQgZmllbGQuIEluIGEgZmllbGRcblx0ICogb2YgdHlwZSA8Y29kZT5UZXh0RmllbGRUeXBlLklOUFVUPC9jb2RlPiwgdGhlIDxjb2RlPm11bHRpbGluZTwvY29kZT4gdmFsdWVcblx0ICogZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSA8Y29kZT5FbnRlcjwvY29kZT4ga2V5IGNyZWF0ZXMgYSBuZXcgbGluZShhIHZhbHVlXG5cdCAqIG9mIDxjb2RlPmZhbHNlPC9jb2RlPiwgYW5kIHRoZSA8Y29kZT5FbnRlcjwvY29kZT4ga2V5IGlzIGlnbm9yZWQpLiBJZiB5b3Vcblx0ICogcGFzdGUgdGV4dCBpbnRvIGEgPGNvZGU+VGV4dEZpZWxkPC9jb2RlPiB3aXRoIGEgPGNvZGU+bXVsdGlsaW5lPC9jb2RlPlxuXHQgKiB2YWx1ZSBvZiA8Y29kZT5mYWxzZTwvY29kZT4sIG5ld2xpbmVzIGFyZSBzdHJpcHBlZCBvdXQgb2YgdGhlIHRleHQuXG5cdCAqIFxuXHQgKiBAZGVmYXVsdCBmYWxzZVxuXHQgKi9cblx0cHVibGljIG11bHRpbGluZTpib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSBudW1iZXIgb2YgdGV4dCBsaW5lcyBpbiBhIG11bHRpbGluZSB0ZXh0IGZpZWxkLiBJZlxuXHQgKiA8Y29kZT53b3JkV3JhcDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgbnVtYmVyIG9mXG5cdCAqIGxpbmVzIGluY3JlYXNlcyB3aGVuIHRleHQgd3JhcHMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG51bUxpbmVzKCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9udW1MaW5lcztcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHNldCBvZiBjaGFyYWN0ZXJzIHRoYXQgYSB1c2VyIGNhbiBlbnRlciBpbnRvIHRoZSB0ZXh0IGZpZWxkLlxuXHQgKiBJZiB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPnJlc3RyaWN0PC9jb2RlPiBwcm9wZXJ0eSBpcyA8Y29kZT5udWxsPC9jb2RlPixcblx0ICogeW91IGNhbiBlbnRlciBhbnkgY2hhcmFjdGVyLiBJZiB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPnJlc3RyaWN0PC9jb2RlPlxuXHQgKiBwcm9wZXJ0eSBpcyBhbiBlbXB0eSBzdHJpbmcsIHlvdSBjYW5ub3QgZW50ZXIgYW55IGNoYXJhY3Rlci4gSWYgdGhlIHZhbHVlXG5cdCAqIG9mIHRoZSA8Y29kZT5yZXN0cmljdDwvY29kZT4gcHJvcGVydHkgaXMgYSBzdHJpbmcgb2YgY2hhcmFjdGVycywgeW91IGNhblxuXHQgKiBlbnRlciBvbmx5IGNoYXJhY3RlcnMgaW4gdGhlIHN0cmluZyBpbnRvIHRoZSB0ZXh0IGZpZWxkLiBUaGUgc3RyaW5nIGlzXG5cdCAqIHNjYW5uZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LiBZb3UgY2FuIHNwZWNpZnkgYSByYW5nZSBieSB1c2luZyB0aGUgaHlwaGVuXG5cdCAqICgtKSBjaGFyYWN0ZXIuIE9ubHkgdXNlciBpbnRlcmFjdGlvbiBpcyByZXN0cmljdGVkOyBhIHNjcmlwdCBjYW4gcHV0IGFueVxuXHQgKiB0ZXh0IGludG8gdGhlIHRleHQgZmllbGQuIDxwaCBvdXRwdXRjbGFzcz1cImZsYXNob25seVwiPlRoaXMgcHJvcGVydHkgZG9lc1xuXHQgKiBub3Qgc3luY2hyb25pemUgd2l0aCB0aGUgRW1iZWQgZm9udCBvcHRpb25zIGluIHRoZSBQcm9wZXJ0eSBpbnNwZWN0b3IuXG5cdCAqXG5cdCAqIDxwPklmIHRoZSBzdHJpbmcgYmVnaW5zIHdpdGggYSBjYXJldCheKSBjaGFyYWN0ZXIsIGFsbCBjaGFyYWN0ZXJzIGFyZVxuXHQgKiBpbml0aWFsbHkgYWNjZXB0ZWQgYW5kIHN1Y2NlZWRpbmcgY2hhcmFjdGVycyBpbiB0aGUgc3RyaW5nIGFyZSBleGNsdWRlZFxuXHQgKiBmcm9tIHRoZSBzZXQgb2YgYWNjZXB0ZWQgY2hhcmFjdGVycy4gSWYgdGhlIHN0cmluZyBkb2VzIG5vdCBiZWdpbiB3aXRoIGFcblx0ICogY2FyZXQoXikgY2hhcmFjdGVyLCBubyBjaGFyYWN0ZXJzIGFyZSBpbml0aWFsbHkgYWNjZXB0ZWQgYW5kIHN1Y2NlZWRpbmdcblx0ICogY2hhcmFjdGVycyBpbiB0aGUgc3RyaW5nIGFyZSBpbmNsdWRlZCBpbiB0aGUgc2V0IG9mIGFjY2VwdGVkXG5cdCAqIGNoYXJhY3RlcnMuPC9wPlxuXHQgKlxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIGV4YW1wbGUgYWxsb3dzIG9ubHkgdXBwZXJjYXNlIGNoYXJhY3RlcnMsIHNwYWNlcywgYW5kXG5cdCAqIG51bWJlcnMgdG8gYmUgZW50ZXJlZCBpbnRvIGEgdGV4dCBmaWVsZDo8L3A+XG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gbXlfdHh0LnJlc3RyaWN0ID0gXCJBLVogMC05XCI7IDwvcHJlPlxuXHQgKlxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIGV4YW1wbGUgaW5jbHVkZXMgYWxsIGNoYXJhY3RlcnMsIGJ1dCBleGNsdWRlcyBsb3dlcmNhc2Vcblx0ICogbGV0dGVyczo8L3A+XG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gbXlfdHh0LnJlc3RyaWN0ID0gXCJeYS16XCI7IDwvcHJlPlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIHVzZSBhIGJhY2tzbGFzaCB0byBlbnRlciBhIF4gb3IgLSB2ZXJiYXRpbS4gVGhlIGFjY2VwdGVkXG5cdCAqIGJhY2tzbGFzaCBzZXF1ZW5jZXMgYXJlIFxcLSwgXFxeIG9yIFxcXFwuIFRoZSBiYWNrc2xhc2ggbXVzdCBiZSBhbiBhY3R1YWxcblx0ICogY2hhcmFjdGVyIGluIHRoZSBzdHJpbmcsIHNvIHdoZW4gc3BlY2lmaWVkIGluIEFjdGlvblNjcmlwdCwgYSBkb3VibGVcblx0ICogYmFja3NsYXNoIG11c3QgYmUgdXNlZC4gRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgY29kZSBpbmNsdWRlcyBvbmx5IHRoZVxuXHQgKiBkYXNoKC0pIGFuZCBjYXJldCheKTo8L3A+XG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gbXlfdHh0LnJlc3RyaWN0ID0gXCJcXFxcLVxcXFxeXCI7IDwvcHJlPlxuXHQgKlxuXHQgKiA8cD5UaGUgXiBjYW4gYmUgdXNlZCBhbnl3aGVyZSBpbiB0aGUgc3RyaW5nIHRvIHRvZ2dsZSBiZXR3ZWVuIGluY2x1ZGluZ1xuXHQgKiBjaGFyYWN0ZXJzIGFuZCBleGNsdWRpbmcgY2hhcmFjdGVycy4gVGhlIGZvbGxvd2luZyBjb2RlIGluY2x1ZGVzIG9ubHlcblx0ICogdXBwZXJjYXNlIGxldHRlcnMsIGJ1dCBleGNsdWRlcyB0aGUgdXBwZXJjYXNlIGxldHRlciBROjwvcD5cblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPiBteV90eHQucmVzdHJpY3QgPSBcIkEtWl5RXCI7IDwvcHJlPlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIHVzZSB0aGUgPGNvZGU+XFx1PC9jb2RlPiBlc2NhcGUgc2VxdWVuY2UgdG8gY29uc3RydWN0XG5cdCAqIDxjb2RlPnJlc3RyaWN0PC9jb2RlPiBzdHJpbmdzLiBUaGUgZm9sbG93aW5nIGNvZGUgaW5jbHVkZXMgb25seSB0aGVcblx0ICogY2hhcmFjdGVycyBmcm9tIEFTQ0lJIDMyKHNwYWNlKSB0byBBU0NJSSAxMjYodGlsZGUpLjwvcD5cblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPiBteV90eHQucmVzdHJpY3QgPSBcIlxcdTAwMjAtXFx1MDA3RVwiOyA8L3ByZT5cblx0ICogXG5cdCAqIEBkZWZhdWx0IG51bGxcblx0ICovXG5cdHB1YmxpYyByZXN0cmljdDpzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBjdXJyZW50IGhvcml6b250YWwgc2Nyb2xsaW5nIHBvc2l0aW9uLiBJZiB0aGUgPGNvZGU+c2Nyb2xsSDwvY29kZT5cblx0ICogcHJvcGVydHkgaXMgMCwgdGhlIHRleHQgaXMgbm90IGhvcml6b250YWxseSBzY3JvbGxlZC4gVGhpcyBwcm9wZXJ0eSB2YWx1ZVxuXHQgKiBpcyBhbiBpbnRlZ2VyIHRoYXQgcmVwcmVzZW50cyB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbiBpbiBwaXhlbHMuXG5cdCAqXG5cdCAqIDxwPlRoZSB1bml0cyBvZiBob3Jpem9udGFsIHNjcm9sbGluZyBhcmUgcGl4ZWxzLCB3aGVyZWFzIHRoZSB1bml0cyBvZlxuXHQgKiB2ZXJ0aWNhbCBzY3JvbGxpbmcgYXJlIGxpbmVzLiBIb3Jpem9udGFsIHNjcm9sbGluZyBpcyBtZWFzdXJlZCBpbiBwaXhlbHNcblx0ICogYmVjYXVzZSBtb3N0IGZvbnRzIHlvdSB0eXBpY2FsbHkgdXNlIGFyZSBwcm9wb3J0aW9uYWxseSBzcGFjZWQ7IHRoYXQgaXMsXG5cdCAqIHRoZSBjaGFyYWN0ZXJzIGNhbiBoYXZlIGRpZmZlcmVudCB3aWR0aHMuIEZsYXNoIFBsYXllciBwZXJmb3JtcyB2ZXJ0aWNhbFxuXHQgKiBzY3JvbGxpbmcgYnkgbGluZSBiZWNhdXNlIHVzZXJzIHVzdWFsbHkgd2FudCB0byBzZWUgYSBjb21wbGV0ZSBsaW5lIG9mXG5cdCAqIHRleHQgcmF0aGVyIHRoYW4gYSBwYXJ0aWFsIGxpbmUuIEV2ZW4gaWYgYSBsaW5lIHVzZXMgbXVsdGlwbGUgZm9udHMsIHRoZVxuXHQgKiBoZWlnaHQgb2YgdGhlIGxpbmUgYWRqdXN0cyB0byBmaXQgdGhlIGxhcmdlc3QgZm9udCBpbiB1c2UuPC9wPlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOiA8L2I+VGhlIDxjb2RlPnNjcm9sbEg8L2NvZGU+IHByb3BlcnR5IGlzIHplcm8tYmFzZWQsIG5vdFxuXHQgKiAxLWJhc2VkIGxpa2UgdGhlIDxjb2RlPnNjcm9sbFY8L2NvZGU+IHZlcnRpY2FsIHNjcm9sbGluZyBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgc2Nyb2xsSDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiBvZiB0ZXh0IGluIGEgdGV4dCBmaWVsZC4gVGhlIDxjb2RlPnNjcm9sbFY8L2NvZGU+XG5cdCAqIHByb3BlcnR5IGlzIHVzZWZ1bCBmb3IgZGlyZWN0aW5nIHVzZXJzIHRvIGEgc3BlY2lmaWMgcGFyYWdyYXBoIGluIGEgbG9uZ1xuXHQgKiBwYXNzYWdlLCBvciBjcmVhdGluZyBzY3JvbGxpbmcgdGV4dCBmaWVsZHMuXG5cdCAqXG5cdCAqIDxwPlRoZSB1bml0cyBvZiB2ZXJ0aWNhbCBzY3JvbGxpbmcgYXJlIGxpbmVzLCB3aGVyZWFzIHRoZSB1bml0cyBvZlxuXHQgKiBob3Jpem9udGFsIHNjcm9sbGluZyBhcmUgcGl4ZWxzLiBJZiB0aGUgZmlyc3QgbGluZSBkaXNwbGF5ZWQgaXMgdGhlIGZpcnN0XG5cdCAqIGxpbmUgaW4gdGhlIHRleHQgZmllbGQsIHNjcm9sbFYgaXMgc2V0IHRvIDEobm90IDApLiBIb3Jpem9udGFsIHNjcm9sbGluZ1xuXHQgKiBpcyBtZWFzdXJlZCBpbiBwaXhlbHMgYmVjYXVzZSBtb3N0IGZvbnRzIGFyZSBwcm9wb3J0aW9uYWxseSBzcGFjZWQ7IHRoYXRcblx0ICogaXMsIHRoZSBjaGFyYWN0ZXJzIGNhbiBoYXZlIGRpZmZlcmVudCB3aWR0aHMuIEZsYXNoIHBlcmZvcm1zIHZlcnRpY2FsXG5cdCAqIHNjcm9sbGluZyBieSBsaW5lIGJlY2F1c2UgdXNlcnMgdXN1YWxseSB3YW50IHRvIHNlZSBhIGNvbXBsZXRlIGxpbmUgb2Zcblx0ICogdGV4dCByYXRoZXIgdGhhbiBhIHBhcnRpYWwgbGluZS4gRXZlbiBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgZm9udHMgb24gYVxuXHQgKiBsaW5lLCB0aGUgaGVpZ2h0IG9mIHRoZSBsaW5lIGFkanVzdHMgdG8gZml0IHRoZSBsYXJnZXN0IGZvbnQgaW4gdXNlLjwvcD5cblx0ICovXG5cdHB1YmxpYyBzY3JvbGxWOm51bWJlcjtcblxuXHQvKipcblx0ICogQSBCb29sZWFuIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRleHQgZmllbGQgaXMgc2VsZWN0YWJsZS4gVGhlXG5cdCAqIHZhbHVlIDxjb2RlPnRydWU8L2NvZGU+IGluZGljYXRlcyB0aGF0IHRoZSB0ZXh0IGlzIHNlbGVjdGFibGUuIFRoZVxuXHQgKiA8Y29kZT5zZWxlY3RhYmxlPC9jb2RlPiBwcm9wZXJ0eSBjb250cm9scyB3aGV0aGVyIGEgdGV4dCBmaWVsZCBpc1xuXHQgKiBzZWxlY3RhYmxlLCBub3Qgd2hldGhlciBhIHRleHQgZmllbGQgaXMgZWRpdGFibGUuIEEgZHluYW1pYyB0ZXh0IGZpZWxkIGNhblxuXHQgKiBiZSBzZWxlY3RhYmxlIGV2ZW4gaWYgaXQgaXMgbm90IGVkaXRhYmxlLiBJZiBhIGR5bmFtaWMgdGV4dCBmaWVsZCBpcyBub3Rcblx0ICogc2VsZWN0YWJsZSwgdGhlIHVzZXIgY2Fubm90IHNlbGVjdCBpdHMgdGV4dC5cblx0ICpcblx0ICogPHA+SWYgPGNvZGU+c2VsZWN0YWJsZTwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHRleHQgaW5cblx0ICogdGhlIHRleHQgZmllbGQgZG9lcyBub3QgcmVzcG9uZCB0byBzZWxlY3Rpb24gY29tbWFuZHMgZnJvbSB0aGUgbW91c2Ugb3Jcblx0ICoga2V5Ym9hcmQsIGFuZCB0aGUgdGV4dCBjYW5ub3QgYmUgY29waWVkIHdpdGggdGhlIENvcHkgY29tbWFuZC4gSWZcblx0ICogPGNvZGU+c2VsZWN0YWJsZTwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgdGV4dCBpbiB0aGUgdGV4dFxuXHQgKiBmaWVsZCBjYW4gYmUgc2VsZWN0ZWQgd2l0aCB0aGUgbW91c2Ugb3Iga2V5Ym9hcmQsIGFuZCB0aGUgdGV4dCBjYW4gYmVcblx0ICogY29waWVkIHdpdGggdGhlIENvcHkgY29tbWFuZC4gWW91IGNhbiBzZWxlY3QgdGV4dCB0aGlzIHdheSBldmVuIGlmIHRoZVxuXHQgKiB0ZXh0IGZpZWxkIGlzIGEgZHluYW1pYyB0ZXh0IGZpZWxkIGluc3RlYWQgb2YgYW4gaW5wdXQgdGV4dCBmaWVsZC4gPC9wPlxuXHQgKiBcblx0ICogQGRlZmF1bHQgdHJ1ZVxuXHQgKi9cblx0cHVibGljIHNlbGVjdGFibGU6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIHplcm8tYmFzZWQgY2hhcmFjdGVyIGluZGV4IHZhbHVlIG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlIGN1cnJlbnRcblx0ICogc2VsZWN0aW9uLiBGb3IgZXhhbXBsZSwgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyAwLCB0aGUgc2Vjb25kIGNoYXJhY3RlciBpc1xuXHQgKiAxLCBhbmQgc28gb24uIElmIG5vIHRleHQgaXMgc2VsZWN0ZWQsIHRoaXMgcHJvcGVydHkgaXMgdGhlIHZhbHVlIG9mXG5cdCAqIDxjb2RlPmNhcmV0SW5kZXg8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGdldCBzZWxlY3Rpb25CZWdpbkluZGV4KCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9zZWxlY3Rpb25CZWdpbkluZGV4O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB6ZXJvLWJhc2VkIGNoYXJhY3RlciBpbmRleCB2YWx1ZSBvZiB0aGUgbGFzdCBjaGFyYWN0ZXIgaW4gdGhlIGN1cnJlbnRcblx0ICogc2VsZWN0aW9uLiBGb3IgZXhhbXBsZSwgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyAwLCB0aGUgc2Vjb25kIGNoYXJhY3RlciBpc1xuXHQgKiAxLCBhbmQgc28gb24uIElmIG5vIHRleHQgaXMgc2VsZWN0ZWQsIHRoaXMgcHJvcGVydHkgaXMgdGhlIHZhbHVlIG9mXG5cdCAqIDxjb2RlPmNhcmV0SW5kZXg8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGdldCBzZWxlY3Rpb25FbmRJbmRleCgpOm51bWJlciAvKmludCovXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0aW9uRW5kSW5kZXg7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHNoYXJwbmVzcyBvZiB0aGUgZ2x5cGggZWRnZXMgaW4gdGhpcyB0ZXh0IGZpZWxkLiBUaGlzIHByb3BlcnR5IGFwcGxpZXNcblx0ICogb25seSBpZiB0aGUgPGNvZGU+Zmxhc2gudGV4dC5BbnRpQWxpYXNUeXBlPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgdGV4dFxuXHQgKiBmaWVsZCBpcyBzZXQgdG8gPGNvZGU+Zmxhc2gudGV4dC5BbnRpQWxpYXNUeXBlLkFEVkFOQ0VEPC9jb2RlPi4gVGhlIHJhbmdlXG5cdCAqIGZvciA8Y29kZT5zaGFycG5lc3M8L2NvZGU+IGlzIGEgbnVtYmVyIGZyb20gLTQwMCB0byA0MDAuIElmIHlvdSBhdHRlbXB0IHRvXG5cdCAqIHNldCA8Y29kZT5zaGFycG5lc3M8L2NvZGU+IHRvIGEgdmFsdWUgb3V0c2lkZSB0aGF0IHJhbmdlLCBGbGFzaCBzZXRzIHRoZVxuXHQgKiBwcm9wZXJ0eSB0byB0aGUgbmVhcmVzdCB2YWx1ZSBpbiB0aGUgcmFuZ2UoZWl0aGVyIC00MDAgb3IgNDAwKS5cblx0ICogXG5cdCAqIEBkZWZhdWx0IDBcblx0ICovXG5cdHB1YmxpYyBzaGFycG5lc3M6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBBdHRhY2hlcyBhIHN0eWxlIHNoZWV0IHRvIHRoZSB0ZXh0IGZpZWxkLiBGb3IgaW5mb3JtYXRpb24gb24gY3JlYXRpbmdcblx0ICogc3R5bGUgc2hlZXRzLCBzZWUgdGhlIFN0eWxlU2hlZXQgY2xhc3MgYW5kIHRoZSA8aT5BY3Rpb25TY3JpcHQgMy4wXG5cdCAqIERldmVsb3BlcidzIEd1aWRlPC9pPi5cblx0ICpcblx0ICogPHA+WW91IGNhbiBjaGFuZ2UgdGhlIHN0eWxlIHNoZWV0IGFzc29jaWF0ZWQgd2l0aCBhIHRleHQgZmllbGQgYXQgYW55XG5cdCAqIHRpbWUuIElmIHlvdSBjaGFuZ2UgdGhlIHN0eWxlIHNoZWV0IGluIHVzZSwgdGhlIHRleHQgZmllbGQgaXMgcmVkcmF3biB3aXRoXG5cdCAqIHRoZSBuZXcgc3R5bGUgc2hlZXQuIFlvdSBjYW4gc2V0IHRoZSBzdHlsZSBzaGVldCB0byA8Y29kZT5udWxsPC9jb2RlPiBvclxuXHQgKiA8Y29kZT51bmRlZmluZWQ8L2NvZGU+IHRvIHJlbW92ZSB0aGUgc3R5bGUgc2hlZXQuIElmIHRoZSBzdHlsZSBzaGVldCBpblxuXHQgKiB1c2UgaXMgcmVtb3ZlZCwgdGhlIHRleHQgZmllbGQgaXMgcmVkcmF3biB3aXRob3V0IGEgc3R5bGUgc2hlZXQuIDwvcD5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IElmIHRoZSBzdHlsZSBzaGVldCBpcyByZW1vdmVkLCB0aGUgY29udGVudHMgb2YgYm90aFxuXHQgKiA8Y29kZT5UZXh0RmllbGQudGV4dDwvY29kZT4gYW5kIDxjb2RlPiBUZXh0RmllbGQuaHRtbFRleHQ8L2NvZGU+IGNoYW5nZSB0b1xuXHQgKiBpbmNvcnBvcmF0ZSB0aGUgZm9ybWF0dGluZyBwcmV2aW91c2x5IGFwcGxpZWQgYnkgdGhlIHN0eWxlIHNoZWV0LiBUb1xuXHQgKiBwcmVzZXJ2ZSB0aGUgb3JpZ2luYWwgPGNvZGU+VGV4dEZpZWxkLmh0bWxUZXh0PC9jb2RlPiBjb250ZW50cyB3aXRob3V0IHRoZVxuXHQgKiBmb3JtYXR0aW5nLCBzYXZlIHRoZSB2YWx1ZSBpbiBhIHZhcmlhYmxlIGJlZm9yZSByZW1vdmluZyB0aGUgc3R5bGVcblx0ICogc2hlZXQuPC9wPlxuXHQgKi9cblx0cHVibGljIHN0eWxlU2hlZXQ6U3R5bGVTaGVldDtcblxuXHQvKipcblx0ICogQSBzdHJpbmcgdGhhdCBpcyB0aGUgY3VycmVudCB0ZXh0IGluIHRoZSB0ZXh0IGZpZWxkLiBMaW5lcyBhcmUgc2VwYXJhdGVkXG5cdCAqIGJ5IHRoZSBjYXJyaWFnZSByZXR1cm4gY2hhcmFjdGVyKDxjb2RlPidcXHInPC9jb2RlPiwgQVNDSUkgMTMpLiBUaGlzXG5cdCAqIHByb3BlcnR5IGNvbnRhaW5zIHVuZm9ybWF0dGVkIHRleHQgaW4gdGhlIHRleHQgZmllbGQsIHdpdGhvdXQgSFRNTCB0YWdzLlxuXHQgKlxuXHQgKiA8cD5UbyBnZXQgdGhlIHRleHQgaW4gSFRNTCBmb3JtLCB1c2UgdGhlIDxjb2RlPmh0bWxUZXh0PC9jb2RlPlxuXHQgKiBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRleHQoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl90ZXh0O1xuXHR9XG5cblx0cHVibGljIHNldCB0ZXh0KHZhbHVlOnN0cmluZylcblx0e1xuXHRcdGlmICh0aGlzLl90ZXh0ID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fdGV4dCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBjb2xvciBvZiB0aGUgdGV4dCBpbiBhIHRleHQgZmllbGQsIGluIGhleGFkZWNpbWFsIGZvcm1hdC4gVGhlXG5cdCAqIGhleGFkZWNpbWFsIGNvbG9yIHN5c3RlbSB1c2VzIHNpeCBkaWdpdHMgdG8gcmVwcmVzZW50IGNvbG9yIHZhbHVlcy4gRWFjaFxuXHQgKiBkaWdpdCBoYXMgMTYgcG9zc2libGUgdmFsdWVzIG9yIGNoYXJhY3RlcnMuIFRoZSBjaGFyYWN0ZXJzIHJhbmdlIGZyb20gMC05XG5cdCAqIGFuZCB0aGVuIEEtRi4gRm9yIGV4YW1wbGUsIGJsYWNrIGlzIDxjb2RlPjB4MDAwMDAwPC9jb2RlPjsgd2hpdGUgaXNcblx0ICogPGNvZGU+MHhGRkZGRkY8L2NvZGU+LlxuXHQgKiBcblx0ICogQGRlZmF1bHQgMCgweDAwMDAwMClcblx0ICovXG5cdHB1YmxpYyB0ZXh0Q29sb3I6bnVtYmVyIC8qaW50Ki87XG5cblx0LyoqXG5cdCAqIFRoZSBoZWlnaHQgb2YgdGhlIHRleHQgaW4gcGl4ZWxzLlxuXHQgKi9cblx0cHVibGljIGdldCB0ZXh0SGVpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdGV4dEhlaWdodDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgaW50ZXJhY3Rpb24gbW9kZSBwcm9wZXJ0eSwgRGVmYXVsdCB2YWx1ZSBpc1xuXHQgKiBUZXh0SW50ZXJhY3Rpb25Nb2RlLk5PUk1BTC4gT24gbW9iaWxlIHBsYXRmb3JtcywgdGhlIG5vcm1hbCBtb2RlIGltcGxpZXNcblx0ICogdGhhdCB0aGUgdGV4dCBjYW4gYmUgc2Nyb2xsZWQgYnV0IG5vdCBzZWxlY3RlZC4gT25lIGNhbiBzd2l0Y2ggdG8gdGhlXG5cdCAqIHNlbGVjdGFibGUgbW9kZSB0aHJvdWdoIHRoZSBpbi1idWlsdCBjb250ZXh0IG1lbnUgb24gdGhlIHRleHQgZmllbGQuIE9uXG5cdCAqIERlc2t0b3AsIHRoZSBub3JtYWwgbW9kZSBpbXBsaWVzIHRoYXQgdGhlIHRleHQgaXMgaW4gc2Nyb2xsYWJsZSBhcyB3ZWxsIGFzXG5cdCAqIHNlbGVjdGlvbiBtb2RlLlxuXHQgKi9cblx0cHVibGljIGdldCB0ZXh0SW50ZXJhY3Rpb25Nb2RlKCk6VGV4dEludGVyYWN0aW9uTW9kZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3RleHRJbnRlcmFjdGlvbk1vZGU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHdpZHRoIG9mIHRoZSB0ZXh0IGluIHBpeGVscy5cblx0ICovXG5cdHB1YmxpYyBnZXQgdGV4dFdpZHRoKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdGV4dFdpZHRoO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB0aGlja25lc3Mgb2YgdGhlIGdseXBoIGVkZ2VzIGluIHRoaXMgdGV4dCBmaWVsZC4gVGhpcyBwcm9wZXJ0eSBhcHBsaWVzXG5cdCAqIG9ubHkgd2hlbiA8Y29kZT5BbnRpQWxpYXNUeXBlPC9jb2RlPiBpcyBzZXQgdG9cblx0ICogPGNvZGU+QW50aUFsaWFzVHlwZS5BRFZBTkNFRDwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPlRoZSByYW5nZSBmb3IgPGNvZGU+dGhpY2tuZXNzPC9jb2RlPiBpcyBhIG51bWJlciBmcm9tIC0yMDAgdG8gMjAwLiBJZlxuXHQgKiB5b3UgYXR0ZW1wdCB0byBzZXQgPGNvZGU+dGhpY2tuZXNzPC9jb2RlPiB0byBhIHZhbHVlIG91dHNpZGUgdGhhdCByYW5nZSxcblx0ICogdGhlIHByb3BlcnR5IGlzIHNldCB0byB0aGUgbmVhcmVzdCB2YWx1ZSBpbiB0aGUgcmFuZ2UoZWl0aGVyIC0yMDAgb3Jcblx0ICogMjAwKS48L3A+XG5cdCAqIFxuXHQgKiBAZGVmYXVsdCAwXG5cdCAqL1xuXHRwdWJsaWMgdGhpY2tuZXNzOm51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIHR5cGUgb2YgdGhlIHRleHQgZmllbGQuIEVpdGhlciBvbmUgb2YgdGhlIGZvbGxvd2luZyBUZXh0RmllbGRUeXBlXG5cdCAqIGNvbnN0YW50czogPGNvZGU+VGV4dEZpZWxkVHlwZS5EWU5BTUlDPC9jb2RlPiwgd2hpY2ggc3BlY2lmaWVzIGEgZHluYW1pY1xuXHQgKiB0ZXh0IGZpZWxkLCB3aGljaCBhIHVzZXIgY2Fubm90IGVkaXQsIG9yIDxjb2RlPlRleHRGaWVsZFR5cGUuSU5QVVQ8L2NvZGU+LFxuXHQgKiB3aGljaCBzcGVjaWZpZXMgYW4gaW5wdXQgdGV4dCBmaWVsZCwgd2hpY2ggYSB1c2VyIGNhbiBlZGl0LlxuXHQgKiBcblx0ICogQGRlZmF1bHQgZHluYW1pY1xuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhlIDxjb2RlPnR5cGU8L2NvZGU+IHNwZWNpZmllZCBpcyBub3QgYSBtZW1iZXIgb2Zcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGZsYXNoLnRleHQuVGV4dEZpZWxkVHlwZS5cblx0ICovXG5cdHB1YmxpYyB0eXBlOlRleHRGaWVsZFR5cGU7XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIHRvIGNvcHkgYW5kIHBhc3RlIHRoZSB0ZXh0IGZvcm1hdHRpbmcgYWxvbmcgd2l0aCB0aGVcblx0ICogdGV4dC4gV2hlbiBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIEZsYXNoIFBsYXllciBjb3BpZXMgYW5kIHBhc3Rlc1xuXHQgKiBmb3JtYXR0aW5nKHN1Y2ggYXMgYWxpZ25tZW50LCBib2xkLCBhbmQgaXRhbGljcykgd2hlbiB5b3UgY29weSBhbmQgcGFzdGVcblx0ICogYmV0d2VlbiB0ZXh0IGZpZWxkcy4gQm90aCB0aGUgb3JpZ2luIGFuZCBkZXN0aW5hdGlvbiB0ZXh0IGZpZWxkcyBmb3IgdGhlXG5cdCAqIGNvcHkgYW5kIHBhc3RlIHByb2NlZHVyZSBtdXN0IGhhdmUgPGNvZGU+dXNlUmljaFRleHRDbGlwYm9hcmQ8L2NvZGU+IHNldFxuXHQgKiB0byA8Y29kZT50cnVlPC9jb2RlPi4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIHVzZVJpY2hUZXh0Q2xpcGJvYXJkOmJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEEgQm9vbGVhbiB2YWx1ZSB0aGF0IGluZGljYXRlcyB3aGV0aGVyIHRoZSB0ZXh0IGZpZWxkIGhhcyB3b3JkIHdyYXAuIElmXG5cdCAqIHRoZSB2YWx1ZSBvZiA8Y29kZT53b3JkV3JhcDwvY29kZT4gaXMgPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSB0ZXh0IGZpZWxkXG5cdCAqIGhhcyB3b3JkIHdyYXA7IGlmIHRoZSB2YWx1ZSBpcyA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSB0ZXh0IGZpZWxkIGRvZXMgbm90XG5cdCAqIGhhdmUgd29yZCB3cmFwLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyA8Y29kZT5mYWxzZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgd29yZFdyYXA6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBUZXh0RmllbGQgaW5zdGFuY2UuIEFmdGVyIHlvdSBjcmVhdGUgdGhlIFRleHRGaWVsZCBpbnN0YW5jZSxcblx0ICogY2FsbCB0aGUgPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4gb3IgPGNvZGU+YWRkQ2hpbGRBdCgpPC9jb2RlPiBtZXRob2Qgb2Zcblx0ICogdGhlIHBhcmVudCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdCB0byBhZGQgdGhlIFRleHRGaWVsZCBpbnN0YW5jZSB0b1xuXHQgKiB0aGUgZGlzcGxheSBsaXN0LlxuXHQgKlxuXHQgKiA8cD5UaGUgZGVmYXVsdCBzaXplIGZvciBhIHRleHQgZmllbGQgaXMgMTAwIHggMTAwIHBpeGVscy48L3A+XG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGVuZHMgdGhlIHN0cmluZyBzcGVjaWZpZWQgYnkgdGhlIDxjb2RlPm5ld1RleHQ8L2NvZGU+IHBhcmFtZXRlciB0byB0aGVcblx0ICogZW5kIG9mIHRoZSB0ZXh0IG9mIHRoZSB0ZXh0IGZpZWxkLiBUaGlzIG1ldGhvZCBpcyBtb3JlIGVmZmljaWVudCB0aGFuIGFuXG5cdCAqIGFkZGl0aW9uIGFzc2lnbm1lbnQoPGNvZGU+Kz08L2NvZGU+KSBvbiBhIDxjb2RlPnRleHQ8L2NvZGU+IHByb3BlcnR5XG5cdCAqIChzdWNoIGFzIDxjb2RlPnNvbWVUZXh0RmllbGQudGV4dCArPSBtb3JlVGV4dDwvY29kZT4pLCBwYXJ0aWN1bGFybHkgZm9yIGFcblx0ICogdGV4dCBmaWVsZCB0aGF0IGNvbnRhaW5zIGEgc2lnbmlmaWNhbnQgYW1vdW50IG9mIGNvbnRlbnQuXG5cdCAqIFxuXHQgKiBAcGFyYW0gbmV3VGV4dCBUaGUgc3RyaW5nIHRvIGFwcGVuZCB0byB0aGUgZXhpc3RpbmcgdGV4dC5cblx0ICovXG5cdHB1YmxpYyBhcHBlbmRUZXh0KG5ld1RleHQ6c3RyaW5nKVxuXHR7XG5cdFx0Ly9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHJlY3RhbmdsZSB0aGF0IGlzIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIGNoYXJhY3Rlci5cblx0ICogXG5cdCAqIEBwYXJhbSBjaGFySW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgZm9yIHRoZSBjaGFyYWN0ZXIoZm9yXG5cdCAqICAgICAgICAgICAgICAgICAgZXhhbXBsZSwgdGhlIGZpcnN0IHBvc2l0aW9uIGlzIDAsIHRoZSBzZWNvbmQgcG9zaXRpb24gaXNcblx0ICogICAgICAgICAgICAgICAgICAxLCBhbmQgc28gb24pLlxuXHQgKiBAcmV0dXJuIEEgcmVjdGFuZ2xlIHdpdGggPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IG1pbmltdW0gYW5kXG5cdCAqICAgICAgICAgbWF4aW11bSB2YWx1ZXMgZGVmaW5pbmcgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgY2hhcmFjdGVyLlxuXHQgKi9cblx0cHVibGljIGdldENoYXJCb3VuZGFyaWVzKGNoYXJJbmRleDpudW1iZXIpOlJlY3RhbmdsZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2NoYXJCb3VuZGFyaWVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGNoYXJhY3RlciBhdCB0aGUgcG9pbnQgc3BlY2lmaWVkXG5cdCAqIGJ5IHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcGFyYW1ldGVycy5cblx0ICogXG5cdCAqIEBwYXJhbSB4IFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSBjaGFyYWN0ZXIuXG5cdCAqIEBwYXJhbSB5IFRoZSA8aT55PC9pPiBjb29yZGluYXRlIG9mIHRoZSBjaGFyYWN0ZXIuXG5cdCAqIEByZXR1cm4gVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGNoYXJhY3Rlcihmb3IgZXhhbXBsZSwgdGhlXG5cdCAqICAgICAgICAgZmlyc3QgcG9zaXRpb24gaXMgMCwgdGhlIHNlY29uZCBwb3NpdGlvbiBpcyAxLCBhbmQgc28gb24pLiBSZXR1cm5zXG5cdCAqICAgICAgICAgLTEgaWYgdGhlIHBvaW50IGlzIG5vdCBvdmVyIGFueSBjaGFyYWN0ZXIuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0Q2hhckluZGV4QXRQb2ludCh4Om51bWJlciwgeTpudW1iZXIpOm51bWJlciAvKmludCovXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY2hhckluZGV4QXRQb2ludDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHaXZlbiBhIGNoYXJhY3RlciBpbmRleCwgcmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGVcblx0ICogc2FtZSBwYXJhZ3JhcGguXG5cdCAqIFxuXHQgKiBAcGFyYW0gY2hhckluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBjaGFyYWN0ZXIoZm9yIGV4YW1wbGUsXG5cdCAqICAgICAgICAgICAgICAgICAgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyAwLCB0aGUgc2Vjb25kIGNoYXJhY3RlciBpcyAxLCBhbmRcblx0ICogICAgICAgICAgICAgICAgICBzbyBvbikuXG5cdCAqIEByZXR1cm4gVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGUgc2FtZVxuXHQgKiAgICAgICAgIHBhcmFncmFwaC5cblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBjaGFyYWN0ZXIgaW5kZXggc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBnZXRGaXJzdENoYXJJblBhcmFncmFwaChjaGFySW5kZXg6bnVtYmVyIC8qaW50Ki8pOm51bWJlciAvKmludCovXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZmlyc3RDaGFySW5QYXJhZ3JhcGg7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIERpc3BsYXlPYmplY3QgcmVmZXJlbmNlIGZvciB0aGUgZ2l2ZW4gPGNvZGU+aWQ8L2NvZGU+LCBmb3IgYW5cblx0ICogaW1hZ2Ugb3IgU1dGIGZpbGUgdGhhdCBoYXMgYmVlbiBhZGRlZCB0byBhbiBIVE1MLWZvcm1hdHRlZCB0ZXh0IGZpZWxkIGJ5XG5cdCAqIHVzaW5nIGFuIDxjb2RlPjxpbWc+PC9jb2RlPiB0YWcuIFRoZSA8Y29kZT48aW1nPjwvY29kZT4gdGFnIGlzIGluIHRoZVxuXHQgKiBmb2xsb3dpbmcgZm9ybWF0OlxuXHQgKlxuXHQgKiA8cD48cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PGNvZGU+IDxpbWcgc3JjID0gJ2ZpbGVuYW1lLmpwZycgaWQgPVxuXHQgKiAnaW5zdGFuY2VOYW1lJyA+PC9jb2RlPjwvcHJlPjwvcD5cblx0ICogXG5cdCAqIEBwYXJhbSBpZCBUaGUgPGNvZGU+aWQ8L2NvZGU+IHRvIG1hdGNoKGluIHRoZSA8Y29kZT5pZDwvY29kZT4gYXR0cmlidXRlXG5cdCAqICAgICAgICAgICBvZiB0aGUgPGNvZGU+PGltZz48L2NvZGU+IHRhZykuXG5cdCAqIEByZXR1cm4gVGhlIGRpc3BsYXkgb2JqZWN0IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGltYWdlIG9yIFNXRiBmaWxlIHdpdGggdGhlXG5cdCAqICAgICAgICAgbWF0Y2hpbmcgPGNvZGU+aWQ8L2NvZGU+IGF0dHJpYnV0ZSBpbiB0aGUgPGNvZGU+PGltZz48L2NvZGU+IHRhZ1xuXHQgKiAgICAgICAgIG9mIHRoZSB0ZXh0IGZpZWxkLiBGb3IgbWVkaWEgbG9hZGVkIGZyb20gYW4gZXh0ZXJuYWwgc291cmNlLCB0aGlzXG5cdCAqICAgICAgICAgb2JqZWN0IGlzIGEgTG9hZGVyIG9iamVjdCwgYW5kLCBvbmNlIGxvYWRlZCwgdGhlIG1lZGlhIG9iamVjdCBpcyBhXG5cdCAqICAgICAgICAgY2hpbGQgb2YgdGhhdCBMb2FkZXIgb2JqZWN0LiBGb3IgbWVkaWEgZW1iZWRkZWQgaW4gdGhlIFNXRiBmaWxlLFxuXHQgKiAgICAgICAgIGl0IGlzIHRoZSBsb2FkZWQgb2JqZWN0LiBJZiBubyA8Y29kZT48aW1nPjwvY29kZT4gdGFnIHdpdGggdGhlXG5cdCAqICAgICAgICAgbWF0Y2hpbmcgPGNvZGU+aWQ8L2NvZGU+IGV4aXN0cywgdGhlIG1ldGhvZCByZXR1cm5zXG5cdCAqICAgICAgICAgPGNvZGU+bnVsbDwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0SW1hZ2VSZWZlcmVuY2UoaWQ6c3RyaW5nKTpEaXNwbGF5T2JqZWN0XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faW1hZ2VSZWZlcmVuY2U7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGluZSBhdCB0aGUgcG9pbnQgc3BlY2lmaWVkIGJ5XG5cdCAqIHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcGFyYW1ldGVycy5cblx0ICogXG5cdCAqIEBwYXJhbSB4IFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSBsaW5lLlxuXHQgKiBAcGFyYW0geSBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgbGluZS5cblx0ICogQHJldHVybiBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGluZShmb3IgZXhhbXBsZSwgdGhlIGZpcnN0XG5cdCAqICAgICAgICAgbGluZSBpcyAwLCB0aGUgc2Vjb25kIGxpbmUgaXMgMSwgYW5kIHNvIG9uKS4gUmV0dXJucyAtMSBpZiB0aGVcblx0ICogICAgICAgICBwb2ludCBpcyBub3Qgb3ZlciBhbnkgbGluZS5cblx0ICovXG5cdHB1YmxpYyBnZXRMaW5lSW5kZXhBdFBvaW50KHg6bnVtYmVyLCB5Om51bWJlcik6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9saW5lSW5kZXhBdFBvaW50O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUgY29udGFpbmluZyB0aGUgY2hhcmFjdGVyXG5cdCAqIHNwZWNpZmllZCBieSB0aGUgPGNvZGU+Y2hhckluZGV4PC9jb2RlPiBwYXJhbWV0ZXIuXG5cdCAqIFxuXHQgKiBAcGFyYW0gY2hhckluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBjaGFyYWN0ZXIoZm9yIGV4YW1wbGUsXG5cdCAqICAgICAgICAgICAgICAgICAgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyAwLCB0aGUgc2Vjb25kIGNoYXJhY3RlciBpcyAxLCBhbmRcblx0ICogICAgICAgICAgICAgICAgICBzbyBvbikuXG5cdCAqIEByZXR1cm4gVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUuXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgY2hhcmFjdGVyIGluZGV4IHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0TGluZUluZGV4T2ZDaGFyKGNoYXJJbmRleDpudW1iZXIgLyppbnQqLyk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9saW5lSW5kZXhPZkNoYXI7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gYSBzcGVjaWZpYyB0ZXh0IGxpbmUuXG5cdCAqIFxuXHQgKiBAcGFyYW0gbGluZUluZGV4IFRoZSBsaW5lIG51bWJlciBmb3Igd2hpY2ggeW91IHdhbnQgdGhlIGxlbmd0aC5cblx0ICogQHJldHVybiBUaGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gdGhlIGxpbmUuXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgbGluZSBudW1iZXIgc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBnZXRMaW5lTGVuZ3RoKGxpbmVJbmRleDpudW1iZXIgLyppbnQqLyk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9saW5lTGVuZ3RoO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgbWV0cmljcyBpbmZvcm1hdGlvbiBhYm91dCBhIGdpdmVuIHRleHQgbGluZS5cblx0ICogXG5cdCAqIEBwYXJhbSBsaW5lSW5kZXggVGhlIGxpbmUgbnVtYmVyIGZvciB3aGljaCB5b3Ugd2FudCBtZXRyaWNzIGluZm9ybWF0aW9uLlxuXHQgKiBAcmV0dXJuIEEgVGV4dExpbmVNZXRyaWNzIG9iamVjdC5cblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBsaW5lIG51bWJlciBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIGdldExpbmVNZXRyaWNzKGxpbmVJbmRleDpudW1iZXIgLyppbnQqLyk6VGV4dExpbmVNZXRyaWNzXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbGluZU1ldHJpY3M7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgY2hhcmFjdGVyIGluZGV4IG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlIGxpbmUgdGhhdCB0aGVcblx0ICogPGNvZGU+bGluZUluZGV4PC9jb2RlPiBwYXJhbWV0ZXIgc3BlY2lmaWVzLlxuXHQgKiBcblx0ICogQHBhcmFtIGxpbmVJbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGluZShmb3IgZXhhbXBsZSwgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgZmlyc3QgbGluZSBpcyAwLCB0aGUgc2Vjb25kIGxpbmUgaXMgMSwgYW5kIHNvIG9uKS5cblx0ICogQHJldHVybiBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZSBsaW5lLlxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIGxpbmUgbnVtYmVyIHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0TGluZU9mZnNldChsaW5lSW5kZXg6bnVtYmVyIC8qaW50Ki8pOm51bWJlciAvKmludCovXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbGluZU9mZnNldDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB0ZXh0IG9mIHRoZSBsaW5lIHNwZWNpZmllZCBieSB0aGUgPGNvZGU+bGluZUluZGV4PC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXIuXG5cdCAqIFxuXHQgKiBAcGFyYW0gbGluZUluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBsaW5lKGZvciBleGFtcGxlLCB0aGVcblx0ICogICAgICAgICAgICAgICAgICBmaXJzdCBsaW5lIGlzIDAsIHRoZSBzZWNvbmQgbGluZSBpcyAxLCBhbmQgc28gb24pLlxuXHQgKiBAcmV0dXJuIFRoZSB0ZXh0IHN0cmluZyBjb250YWluZWQgaW4gdGhlIHNwZWNpZmllZCBsaW5lLlxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIGxpbmUgbnVtYmVyIHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0TGluZVRleHQobGluZUluZGV4Om51bWJlciAvKmludCovKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl9saW5lVGV4dDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHaXZlbiBhIGNoYXJhY3RlciBpbmRleCwgcmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoZSBwYXJhZ3JhcGggY29udGFpbmluZ1xuXHQgKiB0aGUgZ2l2ZW4gY2hhcmFjdGVyLiBUaGUgbGVuZ3RoIGlzIHJlbGF0aXZlIHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlXG5cdCAqIHBhcmFncmFwaChhcyByZXR1cm5lZCBieSA8Y29kZT5nZXRGaXJzdENoYXJJblBhcmFncmFwaCgpPC9jb2RlPiksIG5vdCB0b1xuXHQgKiB0aGUgY2hhcmFjdGVyIGluZGV4IHBhc3NlZCBpbi5cblx0ICogXG5cdCAqIEBwYXJhbSBjaGFySW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGNoYXJhY3Rlcihmb3IgZXhhbXBsZSxcblx0ICogICAgICAgICAgICAgICAgICB0aGUgZmlyc3QgY2hhcmFjdGVyIGlzIDAsIHRoZSBzZWNvbmQgY2hhcmFjdGVyIGlzIDEsIGFuZFxuXHQgKiAgICAgICAgICAgICAgICAgIHNvIG9uKS5cblx0ICogQHJldHVybiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBpbiB0aGUgcGFyYWdyYXBoLlxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIGNoYXJhY3RlciBpbmRleCBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIGdldFBhcmFncmFwaExlbmd0aChjaGFySW5kZXg6bnVtYmVyIC8qaW50Ki8pOm51bWJlciAvKmludCovXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyYWdyYXBoTGVuZ3RoO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBUZXh0Rm9ybWF0IG9iamVjdCB0aGF0IGNvbnRhaW5zIGZvcm1hdHRpbmcgaW5mb3JtYXRpb24gZm9yIHRoZVxuXHQgKiByYW5nZSBvZiB0ZXh0IHRoYXQgdGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IGFuZCA8Y29kZT5lbmRJbmRleDwvY29kZT5cblx0ICogcGFyYW1ldGVycyBzcGVjaWZ5LiBPbmx5IHByb3BlcnRpZXMgdGhhdCBhcmUgY29tbW9uIHRvIHRoZSBlbnRpcmUgdGV4dFxuXHQgKiBzcGVjaWZpZWQgYXJlIHNldCBpbiB0aGUgcmVzdWx0aW5nIFRleHRGb3JtYXQgb2JqZWN0LiBBbnkgcHJvcGVydHkgdGhhdCBpc1xuXHQgKiA8aT5taXhlZDwvaT4sIG1lYW5pbmcgdGhhdCBpdCBoYXMgZGlmZmVyZW50IHZhbHVlcyBhdCBkaWZmZXJlbnQgcG9pbnRzIGluXG5cdCAqIHRoZSB0ZXh0LCBoYXMgYSB2YWx1ZSBvZiA8Y29kZT5udWxsPC9jb2RlPi5cblx0ICpcblx0ICogPHA+SWYgeW91IGRvIG5vdCBzcGVjaWZ5IHZhbHVlcyBmb3IgdGhlc2UgcGFyYW1ldGVycywgdGhpcyBtZXRob2QgaXNcblx0ICogYXBwbGllZCB0byBhbGwgdGhlIHRleHQgaW4gdGhlIHRleHQgZmllbGQuIDwvcD5cblx0ICpcblx0ICogPHA+VGhlIGZvbGxvd2luZyB0YWJsZSBkZXNjcmliZXMgdGhyZWUgcG9zc2libGUgdXNhZ2VzOjwvcD5cblx0ICogXG5cdCAqIEByZXR1cm4gVGhlIFRleHRGb3JtYXQgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGUgZm9ybWF0dGluZyBwcm9wZXJ0aWVzXG5cdCAqICAgICAgICAgZm9yIHRoZSBzcGVjaWZpZWQgdGV4dC5cblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSA8Y29kZT5iZWdpbkluZGV4PC9jb2RlPiBvciA8Y29kZT5lbmRJbmRleDwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgIHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0VGV4dEZvcm1hdChiZWdpbkluZGV4Om51bWJlciAvKmludCovID0gLTEsIGVuZEluZGV4Om51bWJlciAvKmludCovID0gLTEpOlRleHRGb3JtYXRcblx0e1xuXHRcdHJldHVybiB0aGlzLl90ZXh0Rm9ybWF0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlcGxhY2VzIHRoZSBjdXJyZW50IHNlbGVjdGlvbiB3aXRoIHRoZSBjb250ZW50cyBvZiB0aGUgPGNvZGU+dmFsdWU8L2NvZGU+XG5cdCAqIHBhcmFtZXRlci4gVGhlIHRleHQgaXMgaW5zZXJ0ZWQgYXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbixcblx0ICogdXNpbmcgdGhlIGN1cnJlbnQgZGVmYXVsdCBjaGFyYWN0ZXIgZm9ybWF0IGFuZCBkZWZhdWx0IHBhcmFncmFwaCBmb3JtYXQuXG5cdCAqIFRoZSB0ZXh0IGlzIG5vdCB0cmVhdGVkIGFzIEhUTUwuXG5cdCAqXG5cdCAqIDxwPllvdSBjYW4gdXNlIHRoZSA8Y29kZT5yZXBsYWNlU2VsZWN0ZWRUZXh0KCk8L2NvZGU+IG1ldGhvZCB0byBpbnNlcnQgYW5kXG5cdCAqIGRlbGV0ZSB0ZXh0IHdpdGhvdXQgZGlzcnVwdGluZyB0aGUgY2hhcmFjdGVyIGFuZCBwYXJhZ3JhcGggZm9ybWF0dGluZyBvZlxuXHQgKiB0aGUgcmVzdCBvZiB0aGUgdGV4dC48L3A+XG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBUaGlzIG1ldGhvZCBkb2VzIG5vdCB3b3JrIGlmIGEgc3R5bGUgc2hlZXQgaXMgYXBwbGllZCB0b1xuXHQgKiB0aGUgdGV4dCBmaWVsZC48L3A+XG5cdCAqIFxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIHN0cmluZyB0byByZXBsYWNlIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgdGV4dC5cblx0ICogQHRocm93cyBFcnJvciBUaGlzIG1ldGhvZCBjYW5ub3QgYmUgdXNlZCBvbiBhIHRleHQgZmllbGQgd2l0aCBhIHN0eWxlXG5cdCAqICAgICAgICAgICAgICAgc2hlZXQuXG5cdCAqL1xuXHRwdWJsaWMgcmVwbGFjZVNlbGVjdGVkVGV4dCh2YWx1ZTpzdHJpbmcpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFJlcGxhY2VzIHRoZSByYW5nZSBvZiBjaGFyYWN0ZXJzIHRoYXQgdGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT5lbmRJbmRleDwvY29kZT4gcGFyYW1ldGVycyBzcGVjaWZ5IHdpdGggdGhlIGNvbnRlbnRzIG9mIHRoZVxuXHQgKiA8Y29kZT5uZXdUZXh0PC9jb2RlPiBwYXJhbWV0ZXIuIEFzIGRlc2lnbmVkLCB0aGUgdGV4dCBmcm9tXG5cdCAqIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IHRvIDxjb2RlPmVuZEluZGV4LTE8L2NvZGU+IGlzIHJlcGxhY2VkLlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVGhpcyBtZXRob2QgZG9lcyBub3Qgd29yayBpZiBhIHN0eWxlIHNoZWV0IGlzIGFwcGxpZWQgdG9cblx0ICogdGhlIHRleHQgZmllbGQuPC9wPlxuXHQgKiBcblx0ICogQHBhcmFtIGJlZ2luSW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgZm9yIHRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQgcmFuZ2UuXG5cdCAqIEBwYXJhbSBlbmRJbmRleCAgIFRoZSB6ZXJvLWJhc2VkIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXJcblx0ICogICAgICAgICAgICAgICAgICAgYWZ0ZXIgdGhlIGRlc2lyZWQgdGV4dCBzcGFuLlxuXHQgKiBAcGFyYW0gbmV3VGV4dCAgICBUaGUgdGV4dCB0byB1c2UgdG8gcmVwbGFjZSB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mXG5cdCAqICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlcnMuXG5cdCAqIEB0aHJvd3MgRXJyb3IgVGhpcyBtZXRob2QgY2Fubm90IGJlIHVzZWQgb24gYSB0ZXh0IGZpZWxkIHdpdGggYSBzdHlsZVxuXHQgKiAgICAgICAgICAgICAgIHNoZWV0LlxuXHQgKi9cblx0cHVibGljIHJlcGxhY2VUZXh0KGJlZ2luSW5kZXg6bnVtYmVyIC8qaW50Ki8sIGVuZEluZGV4Om51bWJlciAvKmludCovLCBuZXdUZXh0OnN0cmluZylcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogU2V0cyBhcyBzZWxlY3RlZCB0aGUgdGV4dCBkZXNpZ25hdGVkIGJ5IHRoZSBpbmRleCB2YWx1ZXMgb2YgdGhlIGZpcnN0IGFuZFxuXHQgKiBsYXN0IGNoYXJhY3RlcnMsIHdoaWNoIGFyZSBzcGVjaWZpZWQgd2l0aCB0aGUgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPmVuZEluZGV4PC9jb2RlPiBwYXJhbWV0ZXJzLiBJZiB0aGUgdHdvIHBhcmFtZXRlciB2YWx1ZXMgYXJlIHRoZVxuXHQgKiBzYW1lLCB0aGlzIG1ldGhvZCBzZXRzIHRoZSBpbnNlcnRpb24gcG9pbnQsIGFzIGlmIHlvdSBzZXQgdGhlXG5cdCAqIDxjb2RlPmNhcmV0SW5kZXg8L2NvZGU+IHByb3BlcnR5LlxuXHQgKiBcblx0ICogQHBhcmFtIGJlZ2luSW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uKGZvciBleGFtcGxlLCB0aGUgZmlyc3QgY2hhcmFjdGVyIGlzIDAsIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICBzZWNvbmQgY2hhcmFjdGVyIGlzIDEsIGFuZCBzbyBvbikuXG5cdCAqIEBwYXJhbSBlbmRJbmRleCAgIFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBsYXN0IGNoYXJhY3RlciBpbiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLlxuXHQgKi9cblx0cHVibGljIHNldFNlbGVjdGlvbihiZWdpbkluZGV4Om51bWJlciAvKmludCovLCBlbmRJbmRleDpudW1iZXIgLyppbnQqLylcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogQXBwbGllcyB0aGUgdGV4dCBmb3JtYXR0aW5nIHRoYXQgdGhlIDxjb2RlPmZvcm1hdDwvY29kZT4gcGFyYW1ldGVyXG5cdCAqIHNwZWNpZmllcyB0byB0aGUgc3BlY2lmaWVkIHRleHQgaW4gYSB0ZXh0IGZpZWxkLiBUaGUgdmFsdWUgb2Zcblx0ICogPGNvZGU+Zm9ybWF0PC9jb2RlPiBtdXN0IGJlIGEgVGV4dEZvcm1hdCBvYmplY3QgdGhhdCBzcGVjaWZpZXMgdGhlIGRlc2lyZWRcblx0ICogdGV4dCBmb3JtYXR0aW5nIGNoYW5nZXMuIE9ubHkgdGhlIG5vbi1udWxsIHByb3BlcnRpZXMgb2Zcblx0ICogPGNvZGU+Zm9ybWF0PC9jb2RlPiBhcmUgYXBwbGllZCB0byB0aGUgdGV4dCBmaWVsZC4gQW55IHByb3BlcnR5IG9mXG5cdCAqIDxjb2RlPmZvcm1hdDwvY29kZT4gdGhhdCBpcyBzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4gaXMgbm90IGFwcGxpZWQuIEJ5XG5cdCAqIGRlZmF1bHQsIGFsbCBvZiB0aGUgcHJvcGVydGllcyBvZiBhIG5ld2x5IGNyZWF0ZWQgVGV4dEZvcm1hdCBvYmplY3QgYXJlXG5cdCAqIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPi5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFRoaXMgbWV0aG9kIGRvZXMgbm90IHdvcmsgaWYgYSBzdHlsZSBzaGVldCBpcyBhcHBsaWVkIHRvXG5cdCAqIHRoZSB0ZXh0IGZpZWxkLjwvcD5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPnNldFRleHRGb3JtYXQoKTwvY29kZT4gbWV0aG9kIGNoYW5nZXMgdGhlIHRleHQgZm9ybWF0dGluZ1xuXHQgKiBhcHBsaWVkIHRvIGEgcmFuZ2Ugb2YgY2hhcmFjdGVycyBvciB0byB0aGUgZW50aXJlIGJvZHkgb2YgdGV4dCBpbiBhIHRleHRcblx0ICogZmllbGQuIFRvIGFwcGx5IHRoZSBwcm9wZXJ0aWVzIG9mIGZvcm1hdCB0byBhbGwgdGV4dCBpbiB0aGUgdGV4dCBmaWVsZCwgZG9cblx0ICogbm90IHNwZWNpZnkgdmFsdWVzIGZvciA8Y29kZT5iZWdpbkluZGV4PC9jb2RlPiBhbmQgPGNvZGU+ZW5kSW5kZXg8L2NvZGU+LlxuXHQgKiBUbyBhcHBseSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZm9ybWF0IHRvIGEgcmFuZ2Ugb2YgdGV4dCwgc3BlY2lmeSB2YWx1ZXNcblx0ICogZm9yIHRoZSA8Y29kZT5iZWdpbkluZGV4PC9jb2RlPiBhbmQgdGhlIDxjb2RlPmVuZEluZGV4PC9jb2RlPiBwYXJhbWV0ZXJzLlxuXHQgKiBZb3UgY2FuIHVzZSB0aGUgPGNvZGU+bGVuZ3RoPC9jb2RlPiBwcm9wZXJ0eSB0byBkZXRlcm1pbmUgdGhlIGluZGV4XG5cdCAqIHZhbHVlcy48L3A+XG5cdCAqXG5cdCAqIDxwPlRoZSB0d28gdHlwZXMgb2YgZm9ybWF0dGluZyBpbmZvcm1hdGlvbiBpbiBhIFRleHRGb3JtYXQgb2JqZWN0IGFyZVxuXHQgKiBjaGFyYWN0ZXIgbGV2ZWwgZm9ybWF0dGluZyBhbmQgcGFyYWdyYXBoIGxldmVsIGZvcm1hdHRpbmcuIEVhY2ggY2hhcmFjdGVyXG5cdCAqIGluIGEgdGV4dCBmaWVsZCBjYW4gaGF2ZSBpdHMgb3duIGNoYXJhY3RlciBmb3JtYXR0aW5nIHNldHRpbmdzLCBzdWNoIGFzXG5cdCAqIGZvbnQgbmFtZSwgZm9udCBzaXplLCBib2xkLCBhbmQgaXRhbGljLjwvcD5cblx0ICpcblx0ICogPHA+Rm9yIHBhcmFncmFwaHMsIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIHBhcmFncmFwaCBpcyBleGFtaW5lZCBmb3Jcblx0ICogdGhlIHBhcmFncmFwaCBmb3JtYXR0aW5nIHNldHRpbmdzIGZvciB0aGUgZW50aXJlIHBhcmFncmFwaC4gRXhhbXBsZXMgb2Zcblx0ICogcGFyYWdyYXBoIGZvcm1hdHRpbmcgc2V0dGluZ3MgYXJlIGxlZnQgbWFyZ2luLCByaWdodCBtYXJnaW4sIGFuZFxuXHQgKiBpbmRlbnRhdGlvbi48L3A+XG5cdCAqXG5cdCAqIDxwPkFueSB0ZXh0IGluc2VydGVkIG1hbnVhbGx5IGJ5IHRoZSB1c2VyLCBvciByZXBsYWNlZCBieSB0aGVcblx0ICogPGNvZGU+cmVwbGFjZVNlbGVjdGVkVGV4dCgpPC9jb2RlPiBtZXRob2QsIHJlY2VpdmVzIHRoZSBkZWZhdWx0IHRleHQgZmllbGRcblx0ICogZm9ybWF0dGluZyBmb3IgbmV3IHRleHQsIGFuZCBub3QgdGhlIGZvcm1hdHRpbmcgc3BlY2lmaWVkIGZvciB0aGUgdGV4dFxuXHQgKiBpbnNlcnRpb24gcG9pbnQuIFRvIHNldCB0aGUgZGVmYXVsdCBmb3JtYXR0aW5nIGZvciBuZXcgdGV4dCwgdXNlXG5cdCAqIDxjb2RlPmRlZmF1bHRUZXh0Rm9ybWF0PC9jb2RlPi48L3A+XG5cdCAqIFxuXHQgKiBAcGFyYW0gZm9ybWF0IEEgVGV4dEZvcm1hdCBvYmplY3QgdGhhdCBjb250YWlucyBjaGFyYWN0ZXIgYW5kIHBhcmFncmFwaFxuXHQgKiAgICAgICAgICAgICAgIGZvcm1hdHRpbmcgaW5mb3JtYXRpb24uXG5cdCAqIEB0aHJvd3MgRXJyb3IgICAgICBUaGlzIG1ldGhvZCBjYW5ub3QgYmUgdXNlZCBvbiBhIHRleHQgZmllbGQgd2l0aCBhIHN0eWxlXG5cdCAqICAgICAgICAgICAgICAgICAgICBzaGVldC5cblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSA8Y29kZT5iZWdpbkluZGV4PC9jb2RlPiBvciA8Y29kZT5lbmRJbmRleDwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgIHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgc2V0VGV4dEZvcm1hdChmb3JtYXQ6VGV4dEZvcm1hdCwgYmVnaW5JbmRleDpudW1iZXIgLyppbnQqLyA9IC0xLCBlbmRJbmRleDpudW1iZXIgLyppbnQqLyA9IC0xKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgYW4gZW1iZWRkZWQgZm9udCBpcyBhdmFpbGFibGUgd2l0aCB0aGUgc3BlY2lmaWVkXG5cdCAqIDxjb2RlPmZvbnROYW1lPC9jb2RlPiBhbmQgPGNvZGU+Zm9udFN0eWxlPC9jb2RlPiB3aGVyZVxuXHQgKiA8Y29kZT5Gb250LmZvbnRUeXBlPC9jb2RlPiBpcyA8Y29kZT5mbGFzaC50ZXh0LkZvbnRUeXBlLkVNQkVEREVEPC9jb2RlPi5cblx0ICogU3RhcnRpbmcgd2l0aCBGbGFzaCBQbGF5ZXIgMTAsIHR3byBraW5kcyBvZiBlbWJlZGRlZCBmb250cyBjYW4gYXBwZWFyIGluIGFcblx0ICogU1dGIGZpbGUuIE5vcm1hbCBlbWJlZGRlZCBmb250cyBhcmUgb25seSB1c2VkIHdpdGggVGV4dEZpZWxkIG9iamVjdHMuIENGRlxuXHQgKiBlbWJlZGRlZCBmb250cyBhcmUgb25seSB1c2VkIHdpdGggdGhlIGZsYXNoLnRleHQuZW5naW5lIGNsYXNzZXMuIFRoZSB0d29cblx0ICogdHlwZXMgYXJlIGRpc3Rpbmd1aXNoZWQgYnkgdGhlIDxjb2RlPmZvbnRUeXBlPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGVcblx0ICogPGNvZGU+Rm9udDwvY29kZT4gY2xhc3MsIGFzIHJldHVybmVkIGJ5IHRoZSA8Y29kZT5lbnVtZXJhdGVGb250cygpPC9jb2RlPlxuXHQgKiBmdW5jdGlvbi5cblx0ICpcblx0ICogPHA+VGV4dEZpZWxkIGNhbm5vdCB1c2UgYSBmb250IG9mIHR5cGUgPGNvZGU+RU1CRURERURfQ0ZGPC9jb2RlPi4gSWZcblx0ICogPGNvZGU+ZW1iZWRGb250czwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuZCB0aGUgb25seSBmb250XG5cdCAqIGF2YWlsYWJsZSBhdCBydW4gdGltZSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhbmQgc3R5bGUgaXMgb2YgdHlwZVxuXHQgKiA8Y29kZT5FTUJFRERFRF9DRkY8L2NvZGU+LCBGbGFzaCBQbGF5ZXIgZmFpbHMgdG8gcmVuZGVyIHRoZSB0ZXh0LCBhcyBpZiBub1xuXHQgKiBlbWJlZGRlZCBmb250IHdlcmUgYXZhaWxhYmxlIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGFuZCBzdHlsZS48L3A+XG5cdCAqXG5cdCAqIDxwPklmIGJvdGggPGNvZGU+RU1CRURERUQ8L2NvZGU+IGFuZCA8Y29kZT5FTUJFRERFRF9DRkY8L2NvZGU+IGZvbnRzIGFyZVxuXHQgKiBhdmFpbGFibGUgd2l0aCB0aGUgc2FtZSBuYW1lIGFuZCBzdHlsZSwgdGhlIDxjb2RlPkVNQkVEREVEPC9jb2RlPiBmb250IGlzXG5cdCAqIHNlbGVjdGVkIGFuZCB0ZXh0IHJlbmRlcnMgd2l0aCB0aGUgPGNvZGU+RU1CRURERUQ8L2NvZGU+IGZvbnQuPC9wPlxuXHQgKiBcblx0ICogQHBhcmFtIGZvbnROYW1lICBUaGUgbmFtZSBvZiB0aGUgZW1iZWRkZWQgZm9udCB0byBjaGVjay5cblx0ICogQHBhcmFtIGZvbnRTdHlsZSBTcGVjaWZpZXMgdGhlIGZvbnQgc3R5bGUgdG8gY2hlY2suIFVzZVxuXHQgKiAgICAgICAgICAgICAgICAgIDxjb2RlPmZsYXNoLnRleHQuRm9udFN0eWxlPC9jb2RlPlxuXHQgKiBAcmV0dXJuIDxjb2RlPnRydWU8L2NvZGU+IGlmIGEgY29tcGF0aWJsZSBlbWJlZGRlZCBmb250IGlzIGF2YWlsYWJsZSxcblx0ICogICAgICAgICBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhlIDxjb2RlPmZvbnRTdHlsZTwvY29kZT4gc3BlY2lmaWVkIGlzIG5vdCBhIG1lbWJlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2YgPGNvZGU+Zmxhc2gudGV4dC5Gb250U3R5bGU8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBpc0ZvbnRDb21wYXRpYmxlKGZvbnROYW1lOnN0cmluZywgZm9udFN0eWxlOnN0cmluZyk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCA9IFRleHRGaWVsZDsiXX0=