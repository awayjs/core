import LookAtController			= require("awayjs-core/lib/controllers/LookAtController");
import DisplayObject			= require("awayjs-core/lib/core/base/DisplayObject");
import Vector3D					= require("awayjs-core/lib/core/geom/Vector3D");

/**
 * Uses spring physics to animate the target object towards a position that is
 * defined as the lookAtTarget object's position plus the vector defined by the
 * positionOffset property.
 */
class SpringController extends LookAtController
{
	private _velocity:Vector3D;
	private _dv:Vector3D;
	private _stretch:Vector3D;
	private _force:Vector3D;
	private _acceleration:Vector3D;
	private _desiredPosition:Vector3D;

	/**
	 * Stiffness of the spring, how hard is it to extend. The higher it is, the more "fixed" the cam will be.
	 * A number between 1 and 20 is recommended.
	 */
	public stiffness:number;

	/**
	 * Damping is the spring internal friction, or how much it resists the "boinggggg" effect. Too high and you'll lose it!
	 * A number between 1 and 20 is recommended.
	 */
	public damping:number;

	/**
	 * Mass of the camera, if over 120 and it'll be very heavy to move.
	 */
	public mass:number;

	/**
	 * Offset of spring center from target in target object space, ie: Where the camera should ideally be in the target object space.
	 */
	public positionOffset:Vector3D = new Vector3D(0, 500, -1000);

	constructor(targetObject:DisplayObject = null, lookAtObject:DisplayObject = null, stiffness:number = 1, mass:number = 40, damping:number = 4)
	{
		super(targetObject, lookAtObject);

		this.stiffness = stiffness;
		this.damping = damping;
		this.mass = mass;

		this._velocity = new Vector3D();
		this._dv = new Vector3D();
		this._stretch = new Vector3D();
		this._force = new Vector3D();
		this._acceleration = new Vector3D();
		this._desiredPosition = new Vector3D();

	}

	public update(interpolate:boolean = true)
	{
		var offs:Vector3D;

		if (!this._pLookAtObject || !this._pTargetObject)
			return;

		offs = this._pLookAtObject.transform.matrix3D.deltaTransformVector(this.positionOffset);
		this._desiredPosition.x = this._pLookAtObject.x + offs.x;
		this._desiredPosition.y = this._pLookAtObject.y + offs.y;
		this._desiredPosition.z = this._pLookAtObject.z + offs.z;

		this._stretch = this._pTargetObject.transform.position.add(this._desiredPosition);
		this._stretch.scaleBy(-this.stiffness);

		this._dv.copyFrom(this._velocity);
		this._dv.scaleBy(this.damping);

		this._force.x = this._stretch.x - this._dv.x;
		this._force.y = this._stretch.y - this._dv.y;
		this._force.z = this._stretch.z - this._dv.z;

		this._acceleration.copyFrom(this._force);
		this._acceleration.scaleBy(1/this.mass);

		this._velocity.incrementBy(this._acceleration);

		this._pTargetObject.transform.position = this._pTargetObject.transform.position.add(this._velocity);

		super.update();
	}
}

export = SpringController;