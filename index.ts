import * as attributes				from "awayjs-core/lib/attributes";
import * as audio					from "awayjs-core/lib/audio";
import * as errors					from "awayjs-core/lib/errors";
import * as events					from "awayjs-core/lib/events";
import * as geom					from "awayjs-core/lib/geom";
import * as image					from "awayjs-core/lib/image";
import * as library					from "awayjs-core/lib/library";
import * as managers				from "awayjs-core/lib/managers";
import * as net						from "awayjs-core/lib/net";
import * as parsers					from "awayjs-core/lib/parsers";
import * as projections				from "awayjs-core/lib/projections";
import * as ui						from "awayjs-core/lib/ui";
import * as utils					from "awayjs-core/lib/utils";

library.Loader.enableParser(parsers.Image2DParser);
library.Loader.enableParser(parsers.ImageCubeParser);
library.Loader.enableParser(parsers.TextureAtlasParser);
library.Loader.enableParser(parsers.WaveAudioParser);

export {
	attributes,
	audio,
	errors,
	events,
	geom,
	image,
	library,
	managers,
	net,
	parsers,
	projections,
	ui,
	utils
}