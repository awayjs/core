/**
 *
 *
 * @returns {number}
 */
export function getTimer():number
{
	// number milliseconds of 1970/01/01
	// this different to AS3 implementation which gets the number of milliseconds
	// since instance of Flash player was initialised
	return Date.now();
}