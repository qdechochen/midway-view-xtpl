"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XtplEngine = void 0;
const xtemplate_1 = require("xtemplate");
const lru_cache_1 = require("lru-cache");
const fs = require("fs");
// var fs = require("fs");
const path = require("path");
class XtplEngine {
    constructor(config) {
        this.instanceCache = new lru_cache_1.LRUCache({ max: 500 });
        this.fnCache = new lru_cache_1.LRUCache({ max: 500 });
        this.config = config;
    }
    loader(tpl, callback) {
        let pathName;
        if (!tpl.parent) {
            pathName = tpl.name = tpl.originalName;
        }
        else {
            const parentPath = tpl.parent.name;
            const originalName = tpl.originalName;
            pathName = path.join(path.dirname(parentPath), originalName);
            tpl.name = pathName;
        }
        console.log("path:::", pathName);
        const template = tpl.root;
        const rootConfig = template.config;
        const cache = rootConfig.cache;
        let cached;
        if (cache && (cached = this.fnCache.peek(pathName))) {
            return callback(null, cached);
        }
        fs.readFile(pathName, { encoding: "utf-8" }, (err, data) => {
            let content = data;
            // if (Buffer.isEncoding(rootConfig.encoding)) {
            //   content = data.toString(this.config.encoding);
            // } else {
            //   content = require("iconv-lite").decode(content, rootConfig.encoding);
            // }
            // const config = self.app.config.security;
            // // auto inject `_csrf` attr to form field, rely on `app.injectCsrf` provided by `security` plugin
            // if (!(config.csrf === false || config.csrf.enable === false)) {
            //   content = self.app.injectCsrf(content);
            // }
            // // auto inject `nonce` attr to script tag, rely on `app.injectNonce` provided by `security` plugin
            // if (!(config.csp === false || config.csp.enable === false)) {
            //   content = self.app.injectNonce(content);
            // }
            const fn = template.compile(content, pathName);
            if (cache) {
                this.fnCache.set(pathName, fn);
            }
            callback(null, fn);
        });
    }
    async render(name, data, options) {
        const cfg = {
            name: name,
            loader: {
                load: (tpl, callback) => this.loader(tpl, callback),
            },
            strict: options.strict,
            catchError: options.catchError,
            cache: options.cache,
            encoding: options.encoding,
        };
        let fn;
        if (!options.cache || !(fn = this.instanceCache.peek(name))) {
            fn = new xtemplate_1.default(cfg);
            this.instanceCache.set(name, fn);
        }
        return await new Promise((resolve, reject) => {
            fn.render(data, { commands: options.commands }, (e, content) => {
                if (e) {
                    reject(e);
                }
                resolve(content);
            });
        });
    }
    async renderString(str, data, options) {
        const fn = new xtemplate_1.default(str);
        return await new Promise((resolve, reject) => {
            fn.render(data, { commands: options.commands }, (e, content) => {
                if (e) {
                    reject(e);
                }
                resolve(content);
            });
        });
    }
}
exports.XtplEngine = XtplEngine;
//# sourceMappingURL=xtpl.js.map