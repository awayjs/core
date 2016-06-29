"use strict";
var XmlUtils = (function () {
    function XmlUtils() {
    }
    XmlUtils.getChildrenWithTag = function (node, tag) {
        var fragment = document.createDocumentFragment();
        if (node) {
            var num = node.childNodes.length;
            for (var i = 0; i < num; i++) {
                var child = node.childNodes[i];
                if (child != null) {
                    if (child.nodeName == tag) {
                        fragment.appendChild(child);
                    }
                }
            }
        }
        return fragment.childNodes;
    };
    XmlUtils.filterListByParam = function (nodes, paramName, paramValue) {
        var fragment = document.createDocumentFragment();
        if (nodes) {
            var num = nodes.length;
            for (var i = 0; i < num; i++) {
                var child = nodes[i];
                if (child != null) {
                    if (child.attributes.getNamedItem(paramName).value == paramValue) {
                        fragment.appendChild(child);
                    }
                }
            }
        }
        return fragment.childNodes;
    };
    XmlUtils.strToXml = function (str) {
        var parser = new DOMParser();
        var node = parser.parseFromString(str, "text/xml");
        return node;
    };
    XmlUtils.nodeToString = function (node) {
        if (!node)
            return "";
        var str = (new XMLSerializer()).serializeToString(node);
        return str;
    };
    XmlUtils.readAttributeValue = function (node, attrName) {
        var attrs = node.attributes;
        if (attrs == undefined) {
            return "";
        }
        var attribute = attrs.getNamedItem(attrName);
        if (!attribute) {
            //console.log("XmlUltils - readAttributeValue() - name: " + attrName + ", attribute does not exist.";
            return "";
        }
        //console.log("XmlUltils - readAttributeValue() - name: " + attrName + ", value: " + attribute.value);
        return attribute.value;
    };
    XmlUtils.writeAttributeValue = function (node, attrName, attrValue) {
        var attribute = document.createAttribute(attrName);
        attribute.value = attrValue;
        attribute = node.attributes.setNamedItem(attribute);
        console.log("XmlUltils - writeAttributeValue() - name: " + attribute.name + ", value: " + attribute.value);
    };
    XmlUtils.hasAttribute = function (node, attrName) {
        var attrs = node.attributes;
        if (attrs == undefined) {
            return false;
        }
        var attribute = attrs.getNamedItem(attrName);
        return attribute != null;
    };
    return XmlUtils;
}());
exports.XmlUtils = XmlUtils;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = XmlUtils;
