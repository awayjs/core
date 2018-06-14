
// helper class for places that needs different behaviour based on if we are building for AVM1 or not
// hopefully in future this will no longer be needed, but for now its the best we can do to make adjustments per project easier / clearer

export class BuildMode {
	// used when building AwayJS to use with AVM1
	public static AVM1:string = "avm1";
	
	// used when building AwayJS to use with AS2 Framescript that have been converted to js
	public static AS2_AS_JS:string = "as2asjs";

	// used when building standart AwayJS (not for AVM1)
	public static STANDART:string = "standart";

	public static mode:string=BuildMode.STANDART;

}