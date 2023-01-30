import { Request, Response } from 'express';
import debug from 'debug'
import IpLookupService from '../service/ip_lookup.service';
import IpInfoService from '../service/ip_info.service';
import { IPInfoDto } from '../db/ip_info.dto'

const debugLog: debug.IDebugger = debug('app:ip_lookup.controller');

class IpLookupController {
  async saveIPInfo(req: Request, res: Response) {
    try {
      const ip: string = req.params.ipAddr;
      const ipInfo: IPInfoDto = await IpInfoService.getIpInfo(ip);
      if (ipInfo) return res.status(200).send(ipInfo);
      const info: IPInfoDto = await IpLookupService.getIpInfo(ip);
      const successful = await IpInfoService.saveIpInfo(info);
      if (successful) return res.status(201).send(info);
      res.status(409).send({
        error: 'Failed to save ip info'
      })
    } catch (err) {
      debugLog(err);
      res.status(500).send();
    }

  }

  async delete(req: Request, res: Response) {
    try {
      const ip: string = req.params.ipAddr;
      const successful = await IpInfoService.deleteIpInfo(ip);
      if (successful) return res.status(200).send();
      res.status(409).send({
        error: "IP is not found"
      })
    } catch(err) {
      debugLog(err)
      res.status(500).send();
    }
    
  }
}

export default new IpLookupController();
