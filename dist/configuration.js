"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewXtplConfiguration = void 0;
const core_1 = require("@midwayjs/core");
const View = require("@midwayjs/view");
const DefaultConfig = require("./config/config.default");
const LocalConfig = require("./config/config.local");
const view_1 = require("./view");
let ViewXtplConfiguration = class ViewXtplConfiguration {
    async onReady() {
        this.viewManager.use("xtpl", view_1.XtplView);
    }
};
exports.ViewXtplConfiguration = ViewXtplConfiguration;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", View.ViewManager)
], ViewXtplConfiguration.prototype, "viewManager", void 0);
exports.ViewXtplConfiguration = ViewXtplConfiguration = __decorate([
    (0, core_1.Configuration)({
        namespace: "view-xtpl",
        importConfigs: [
            {
                default: DefaultConfig,
                local: LocalConfig,
            },
        ],
        imports: [View],
    })
], ViewXtplConfiguration);
//# sourceMappingURL=configuration.js.map