"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = appInfo => {
    return {
        xtpl: {
            root: path.join(appInfo.appDir, 'view'),
            cache: false,
            catchError: true,
            encoding: 'utf-8',
        },
    };
};
//# sourceMappingURL=config.local.js.map