import DisplayObject			= require("awayjs-core/lib/core/base/DisplayObject");
import Event					= require("awayjs-core/lib/events/Event");

class DisplayObjectEvent extends Event
{
	public static VISIBLITY_UPDATED:string = "visiblityUpdated";
	public static SCENETRANSFORM_CHANGED:string = "scenetransformChanged";
	public static SCENE_CHANGED:string = "sceneChanged";
	public static POSITION_CHANGED:string = "positionChanged";
	public static ROTATION_CHANGED:string = "rotationChanged";
	public static SCALE_CHANGED:string = "scaleChanged";

	public object:DisplayObject;

	constructor(type:string, object:DisplayObject)
	{
		super(type);
		this.object = object;
	}
}

export = DisplayObjectEvent;