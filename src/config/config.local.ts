import * as path from 'path';
import { IXtplConfig } from '../interface';

export default appInfo => {
  return {
    xtpl: {
      root: path.join(appInfo.appDir, 'view'),
      cache: false,
      catchError: true,
      encoding: 'utf-8',
    },
  } as {
    xtpl: IXtplConfig;
  };
};
