import {ConflictStrategyBase}			from "../library/ConflictStrategyBase";
import {ErrorConflictStrategy}		from "../library/ErrorConflictStrategy";
import {IgnoreConflictStrategy}		from "../library/IgnoreConflictStrategy";
import {NumSuffixConflictStrategy}	from "../library/NumSuffixConflictStrategy";

/**
 * Enumeration export class for bundled conflict strategies. Set one of these values (or an
 * instance of a self-defined sub-export class of ConflictStrategyBase) to the conflictStrategy
 * property on an AssetLibrary to define how that library resolves naming conflicts.
 *
 * The value of the <code>AssetLibrary.conflictPrecedence</code> property defines which
 * of the conflicting assets will get to keep it's name, and which is renamed (if any.)
 *
 * @see away.library.AssetLibrary.conflictStrategy
 * @see away.library.naming.ConflictStrategyBase
 */
export class ConflictStrategy
{
	/**
	 * Specifies that in case of a naming conflict, one of the assets will be renamed and
	 * a numeric suffix appended to the base name.
	 */
	public static APPEND_NUM_SUFFIX:ConflictStrategyBase = new NumSuffixConflictStrategy();

	/**
	 * Specifies that naming conflicts should be ignored. This is not recommended in most
	 * cases, unless it can be 100% guaranteed that the application does not cause naming
	 * conflicts in the library (i.e. when an app-level system is in place to prevent this.)
	 */
	public static IGNORE:ConflictStrategyBase = new IgnoreConflictStrategy();

	/**
	 * Specifies that an error should be thrown if a naming conflict is discovered. Use this
	 * to be 100% sure that naming conflicts never occur unnoticed, and when it's undesirable
	 * to have the library automatically rename assets to avoid such conflicts.
	 */
	public static THROW_ERROR:ConflictStrategyBase = new ErrorConflictStrategy();

	constructor(include?:ConflictStrategyBase)
	{
		//TODO: find out why typescript d.ts files do not include this class
	}
}