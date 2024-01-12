"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = appInfo => {
    return {
        xtpl: {
            root: path.join(appInfo.appDir, 'view'),
            cache: true,
            catchError: false,
            encoding: 'utf-8',
        },
    };
};
//# sourceMappingURL=config.default.js.map