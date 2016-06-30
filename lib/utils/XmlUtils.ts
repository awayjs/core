export class XmlUtils {

	public static getChildrenWithTag(node:Node, tag:string):NodeList {

		var fragment:DocumentFragment = document.createDocumentFragment();

		if(node) {
			var num:number = node.childNodes.length;
			for(var i:number = 0; i < num; i++) {
				var child:Node = node.childNodes[i];
				if(child != null) {
					if(child.nodeName == tag) {
						fragment.appendChild(child);
					}
				}
			}
		}

		return fragment.childNodes;
	}

	public static filterListByParam(nodes:NodeList, paramName:string, paramValue):NodeList {

		var fragment:DocumentFragment = document.createDocumentFragment();

		if(nodes) {
			var num:number = nodes.length;
			for(var i:number = 0; i < num; i++) {
				var child:Node = nodes[i];
				if(child != null) {
					if(child.attributes.getNamedItem(paramName).value == paramValue) {
						fragment.appendChild(child);
					}
				}
			}
		}

		return fragment.childNodes;
	}

	public static strToXml(str:string):Node {
		var parser:DOMParser = new DOMParser();
		var node:Node = parser.parseFromString(str, "text/xml");
		return node;
	}

	public static nodeToString(node:Node):string {
		if(!node) return "";
		var str = (new XMLSerializer()).serializeToString(node);
		return str;
	}

	public static readAttributeValue(node:Node, attrName:string):string {
		var attrs = node.attributes;
		if(attrs == undefined) {
			return "";
		}
		var attribute:Attr = attrs.getNamedItem(attrName);
		if(!attribute) {
			//console.log("XmlUltils - readAttributeValue() - name: " + attrName + ", attribute does not exist.";
			return "";
		}
		//console.log("XmlUltils - readAttributeValue() - name: " + attrName + ", value: " + attribute.value);
		return attribute.value;
	}

	public static writeAttributeValue(node:Node, attrName:string, attrValue:string) {
		var attribute:Attr = document.createAttribute(attrName);
		attribute.value = attrValue;
		attribute = node.attributes.setNamedItem(attribute);
		console.log("XmlUltils - writeAttributeValue() - name: " + attribute.name + ", value: " + attribute.value);
	}

	public static hasAttribute(node:Node, attrName:string):boolean {
		var attrs = node.attributes;
		if(attrs == undefined) {
			return false;
		}
		var attribute:Attr = attrs.getNamedItem(attrName);
		return attribute != null;
	}
}
export default XmlUtils;

















