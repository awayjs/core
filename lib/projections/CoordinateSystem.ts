/**
 * Provides constant values for camera lens projection options use the the <code>coordinateSystem</code> property
 *
 * @see away.projections.PerspectiveLens#coordinateSystem
 */
export enum CoordinateSystem
	{
	/**
	 * Default option, projects to a left-handed coordinate system
	 */
	LEFT_HANDED,

	/**
	 * Projects to a right-handed coordinate system
	 */
	RIGHT_HANDED
}