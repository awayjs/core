import { ConfigManager } from './managers/ConfigManager';

export interface ICoreSettings {
	ENABLE_POSITION_CACHING: boolean;
}

export const Settings: ICoreSettings = ConfigManager.instance.addStore<any>('core', {
	/**
	 * @description When true (default), a Transform with separatePositionInvalidation
	 * set fires INVALIDATE_POSITION for translation-only changes, so caches can skip
	 * a content redraw. When false, those changes fire INVALIDATE_MATRIX3D instead,
	 * matching previous behaviour.
	 * @default true
	 */
	ENABLE_POSITION_CACHING: true,
});
