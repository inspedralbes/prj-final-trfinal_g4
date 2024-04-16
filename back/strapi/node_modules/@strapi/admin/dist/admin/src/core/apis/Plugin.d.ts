/// <reference types="react" />
import { Plugin as IPlugin } from '@strapi/helper-plugin';
export interface PluginConfig extends Pick<IPlugin, 'apis' | 'initializer' | 'injectionZones' | 'isReady' | 'name'> {
    id: string;
}
export declare class Plugin implements IPlugin {
    apis: PluginConfig['apis'];
    initializer: PluginConfig['initializer'];
    injectionZones: PluginConfig['injectionZones'];
    isReady: PluginConfig['isReady'];
    name: PluginConfig['name'];
    pluginId: PluginConfig['id'];
    constructor(pluginConf: PluginConfig);
    getInjectedComponents(containerName: string, blockName: string): {
        name: string;
        Component: import("react").ComponentType<{}>;
    }[];
    injectComponent(containerName: string, blockName: string, component: ReturnType<IPlugin['getInjectedComponents']>[number]): void;
}
