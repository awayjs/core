"use strict";
/**
 * An enumeration providing values to describe the data format of parsed data.
 */
var ParserDataFormat = (function () {
    function ParserDataFormat() {
    }
    /**
     * Describes the format of a binary file.
     */
    ParserDataFormat.BINARY = "binary";
    /**
     * Describes the format of a plain text file.
     */
    ParserDataFormat.PLAIN_TEXT = "plainText";
    /**
     * Describes the format of an image file
     */
    ParserDataFormat.IMAGE = "image";
    return ParserDataFormat;
}());
exports.ParserDataFormat = ParserDataFormat;
