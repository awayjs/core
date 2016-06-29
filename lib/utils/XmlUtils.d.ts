export declare class XmlUtils {
    static getChildrenWithTag(node: Node, tag: string): NodeList;
    static filterListByParam(nodes: NodeList, paramName: string, paramValue: any): NodeList;
    static strToXml(str: string): Node;
    static nodeToString(node: Node): string;
    static readAttributeValue(node: Node, attrName: string): string;
    static writeAttributeValue(node: Node, attrName: string, attrValue: string): void;
    static hasAttribute(node: Node, attrName: string): boolean;
}
export default XmlUtils;
