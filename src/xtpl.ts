import XTemplate from "xtemplate";
import { LRUCache } from "lru-cache";
import { IXtplConfig, RenderOptions } from "./interface";
import * as fs from "fs";

// var fs = require("fs");
const path = require("path");

export class XtplEngine {
  protected config: IXtplConfig;
  protected instanceCache = new LRUCache({ max: 500 });
  protected fnCache = new LRUCache({ max: 500 });

  constructor(config: IXtplConfig) {
    this.config = config;
  }

  protected loader(tpl, callback) {
    let pathName;
    if (!tpl.parent) {
      pathName = tpl.name = tpl.originalName;
    } else {
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
    fs.readFile(
      pathName,
      { encoding: "utf-8" },
      (err, data: string | Buffer) => {
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
      }
    );
  }

  async render(name: string, data: any, options: RenderOptions) {
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
      fn = new XTemplate(cfg);
      this.instanceCache.set(name, fn);
    }

    return await new Promise<string>((resolve, reject) => {
      fn.render(data, { commands: options.commands }, (e, content: string) => {
        if (e) {
          reject(e);
        }
        resolve(content);
      });
    });
  }
  async renderString(str: string, data: any, options: RenderOptions) {
    const fn = new XTemplate(str);

    return await new Promise<string>((resolve, reject) => {
      fn.render(data, { commands: options.commands }, (e, content: string) => {
        if (e) {
          reject(e);
        }
        resolve(content);
      });
    });
  }
}
