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
exports.XtplView = void 0;
const xtpl_1 = require("./xtpl");
const core_1 = require("@midwayjs/core");
let XtplView = class XtplView {
    async init() {
        this.xtpl = new xtpl_1.XtplEngine(this.xtplConfig);
    }
    async render(name, locals, config) {
        return await this.xtpl.render(name, locals, {
            ...this.xtplConfig,
            ...(config || {}),
        });
    }
    async renderString(tpl, locals, config) {
        return await this.xtpl.renderString(tpl, locals, {
            ...this.xtplConfig,
            ...config,
        });
    }
};
exports.XtplView = XtplView;
__decorate([
    (0, core_1.Config)("xtpl"),
    __metadata("design:type", Object)
], XtplView.prototype, "xtplConfig", void 0);
__decorate([
    (0, core_1.Init)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], XtplView.prototype, "init", null);
exports.XtplView = XtplView = __decorate([
    (0, core_1.Provide)()
], XtplView);
//# sourceMappingURL=view.js.map