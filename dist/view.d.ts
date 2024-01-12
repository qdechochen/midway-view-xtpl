import { XtplEngine } from "./xtpl";
import { IViewEngine } from "@midwayjs/view";
export declare class XtplView implements IViewEngine {
    protected xtpl: XtplEngine;
    xtplConfig: any;
    protected init(): Promise<void>;
    render(name: any, locals: any, config: any): Promise<string>;
    renderString(tpl: any, locals: any, config: any): Promise<string>;
}
//# sourceMappingURL=view.d.ts.map