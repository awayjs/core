import MaterialBase					= require("awayjs-core/lib/materials/MaterialBase");
import ImageTexture					= require("awayjs-core/lib/textures/ImageTexture");
import Texture2DBase				= require("awayjs-core/lib/textures/Texture2DBase");

/**
 * MaterialBase forms an abstract base class for any material.
 * A material consists of several passes, each of which constitutes at least one render call. Several passes could
 * be used for special effects (render lighting for many lights in several passes, render an outline in a separate
 * pass) or to provide additional render-to-texture passes (rendering diffuse light to texture for texture-space
 * subsurface scattering, or rendering a depth map for specialized self-shadowing).
 *
 * Away3D provides default materials trough SinglePassMaterialBase and MultiPassMaterialBase, which use modular
 * methods to build the shader code. MaterialBase can be extended to build specific and high-performant custom
 * shaders, or entire new material frameworks.
 */
class CSSMaterialBase extends MaterialBase
{
	private _imageElement:HTMLImageElement;
	private _imageStyle:MSStyleCSSProperties;


	public get imageElement():HTMLImageElement
	{
		return this._imageElement;
	}

	public get imageStyle():MSStyleCSSProperties
	{
		return this._imageStyle;
	}

	/**
	 * The texture object to use for the albedo colour.
	 */
	public get texture():Texture2DBase
	{
		return this._pTexture;
	}

	public set texture(value:Texture2DBase)
	{
		if (this._pTexture == value)
			return;

		this._pTexture = value;

		if (value instanceof ImageTexture) {
			this._imageElement = (<ImageTexture> value).htmlImageElement;

			var node:HTMLStyleElement = document.createElement("style");
			node.type = "text/css";
			document.getElementsByTagName("head")[0].appendChild(node);

			var sheet:CSSStyleSheet = <CSSStyleSheet> document.styleSheets[document.styleSheets.length - 1];
			sheet.insertRule(".material" + this.id + "{ }", 0);
			var style:MSStyleCSSProperties = (<CSSStyleRule> sheet.cssRules[0]).style;

			style.backgroundImage = "url(" + this._imageElement.src + ")";
			style.backgroundSize = "100% 100%";
			style.position = "absolute";
			style.width = this._imageElement.width + "px";
			style.height = this._imageElement.height + "px";
			style.transformOrigin
				= style["-webkit-transform-origin"]
				= style["-moz-transform-origin"]
				= style["-o-transform-origin"]
				= style["-ms-transform-origin"] = "0% 0%";

			this._pHeight = this._imageElement.height;
			this._pWidth = this._imageElement.width;

			this._pNotifySizeChanged();
		}
	}

	/**
	 * Creates a new MaterialBase object.
	 */
	constructor(texture:Texture2DBase = null, smooth:boolean = true, repeat:boolean = false)
	{
		super();

		this._iMaterialId = Number(this.id);

		this.texture = texture;

		this.smooth = smooth;
		this.repeat = repeat;
	}
}

export = CSSMaterialBase;