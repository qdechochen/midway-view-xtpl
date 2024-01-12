import { Configuration, Inject } from "@midwayjs/core";
import * as View from "@midwayjs/view";
import * as DefaultConfig from "./config/config.default";
import * as LocalConfig from "./config/config.local";
import { XtplView } from "./view";

@Configuration({
  namespace: "view-xtpl",
  importConfigs: [
    {
      default: DefaultConfig,
      local: LocalConfig,
    },
  ],
  imports: [View],
})
export class ViewXtplConfiguration {
  @Inject()
  viewManager: View.ViewManager;

  async onReady() {
    this.viewManager.use("xtpl", XtplView);
  }
}
