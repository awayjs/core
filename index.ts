import * as attributes				from "./lib/attributes";
import * as audio					from "./lib/audio";
import * as errors					from "./lib/errors";
import * as events					from "./lib/events";
import * as geom					from "./lib/geom";
import * as image					from "./lib/image";
import * as library					from "./lib/library";
import * as managers				from "./lib/managers";
import * as net						from "./lib/net";
import * as parsers					from "./lib/parsers";
import * as projections				from "./lib/projections";
import * as ui						from "./lib/ui";
import * as utils					from "./lib/utils";

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