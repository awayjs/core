export class CSS
{
	public static setElementSize(element:HTMLElement, width:number, height:number):void
	{
		if(!element) return;
		element.style.width = width + "px";
		element.style.height = height + "px";
		element["width"] = width;
		element["height"] = height;
	}

	public static setElementWidth(element:HTMLElement, width:number):void
	{
		if(!element) return;
		element.style.width = width + "px";
		element["width"] = width;
	}

	public static setElementHeight(element:HTMLElement, height:number):void
	{
		if(!element) return;
		element.style.height = height + "px";
		element["height"] = height;
	}

	public static setElementX(element:HTMLElement, x:number):void
	{
		if(!element) return;
		element.style.position = 'absolute';
		element.style.left = x + "px";
	}

	public static setElementY(element:HTMLElement, y:number):void
	{
		if(!element) return;
		element.style.position = 'absolute';
		element.style.top = y + "px";
	}

	public static getElementVisibility(element:HTMLElement):boolean
	{
		if(!element) return false;
		return element.style.visibility == 'visible';
	}

	public static setElementVisibility(element:HTMLElement, visible:boolean):void
	{
		if(!element) return;
		if (visible) {
			element.style.visibility = 'visible';
		} else {
			element.style.visibility = 'hidden';
		}
	}

	public static setElementAlpha(element:HTMLElement, alpha:number):void
	{
		if (element instanceof HTMLCanvasElement) {
			var context = (<HTMLCanvasElement> element).getContext("2d");
			context.globalAlpha = alpha;
		}
	}

	public static setElementPosition(element:HTMLElement, x:number, y:number, absolute:boolean = false):void
	{
		if(!element) return;
		if (absolute) {
			element.style.position = "absolute";
		} else {
			element.style.position = "relative";
		}

		element.style.left = x + "px";
		element.style.top = y + "px";
	}
}