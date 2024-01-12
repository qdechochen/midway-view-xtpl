import { XtplEngine } from "./xtpl";
import { IViewEngine } from "@midwayjs/view";
import { Config, Init, Provide } from "@midwayjs/core";

@Provide()
export class XtplView implements IViewEngine {
  protected xtpl: XtplEngine;
  @Config("xtpl")
  xtplConfig;

  @Init()
  protected async init() {
    this.xtpl = new XtplEngine(this.xtplConfig);
  }

  async render(name, locals, config): Promise<string> {
    return await this.xtpl.render(name, locals, {
      ...this.xtplConfig,
      ...(config || {}),
    });
  }

  async renderString(tpl, locals, config): Promise<string> {
    return await this.xtpl.renderString(tpl, locals, {
      ...this.xtplConfig,
      ...config,
    });
  }
}
