/**
 * Provides constant values for camera lens projection options use the the <code>coordinateSystem</code> property
 *
 * @see away.projections.PerspectiveLens#coordinateSystem
 */
export class CoordinateSystem
{
	/**
	 * Default option, projects to a left-handed coordinate system
	 */
	public static LEFT_HANDED:string = "leftHanded";

	/**
	 * Projects to a right-handed coordinate system
	 */
	public static RIGHT_HANDED:string = "rightHanded";
}