import { LRUCache } from "lru-cache";
import { IXtplConfig, RenderOptions } from "./interface";
export declare class XtplEngine {
    protected config: IXtplConfig;
    protected instanceCache: LRUCache<{}, {}, unknown>;
    protected fnCache: LRUCache<{}, {}, unknown>;
    constructor(config: IXtplConfig);
    protected loader(tpl: any, callback: any): any;
    render(name: string, data: any, options: RenderOptions): Promise<string>;
    renderString(str: string, data: any, options: RenderOptions): Promise<string>;
}
//# sourceMappingURL=xtpl.d.ts.map