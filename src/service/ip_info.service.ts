import { collections } from '../db/db'
import { IPInfoDto } from '../db/ip_info.dto';

class IpInfoService {
  async getIpInfo(ip: string): Promise<IPInfoDto | undefined> {
    const ipInfoCollection = collections.ipInfo;
    const ipInfo = (await ipInfoCollection.findOne({ ip }, { projection: { _id: 0 } })) as IPInfoDto;
    if (!ipInfo) return;
    return ipInfo;
  }

  async saveIpInfo(ipInfo: IPInfoDto): Promise<boolean> {
    const ipInfoCollection = collections.ipInfo;
    const result = await ipInfoCollection.insertOne(ipInfo as IPInfoDto);
    if (result) return true;
    return false;
  }

  async deleteIpInfo(ip: string): Promise<boolean> {
    const ipInfoCollection = collections.ipInfo;
    const result = await ipInfoCollection.deleteOne({ ip })
    return result.deletedCount == 1;
  }
}

export default new IpInfoService();
