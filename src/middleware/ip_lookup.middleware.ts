import { Request, Response, NextFunction } from 'express';
import debug from 'debug';
import { ipVersion } from 'ip-address-validator';

const debugLog: debug.IDebugger = debug('app:ip_lookup.controller');

class QueryParamsMiddleware {
  async validateIP(req: Request, res: Response, next: NextFunction) {
    const ipAddr: string = req.params.ipAddr;
    const version = +ipVersion(ipAddr);
    if (version === 4 || version === 6) next();
    else {
      res.status(400).send({
        error: "ipAddr param must be either IPv4 or IPv6"
      });
    }
  }
}
export default new QueryParamsMiddleware();
