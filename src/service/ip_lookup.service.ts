import axios from 'axios';
import { IPInfoDto } from '../db/ip_info.dto';
import debug from 'debug';

const debugLog: debug.IDebugger = debug('app:ip_lookup.service');

class IpLookupService {
  async getIpInfo(ip: string): Promise<IPInfoDto> {
    const lookupUrl = process.env.IP_LOOKUP_URL;
    const { data } = await axios.get(
      `${lookupUrl}${ip}`,
      {
        headers: {
          'Accept-Encoding': 'application/json'
        }
      })
    this.transformData(data)
    return data as IPInfoDto;
  }
  private transformData(data): void {
    data.continentCode = data.continent_code;
    data.countryCode = data.country_code;
    data.isEu = data.is_eu;
    data.callingCode = data.calling_code;
    data.flag.emoji_unicode = data.flag.emoji_unicode;
    data.timezone.isDst = data.timezone.is_dst;
    data.timezone.currentTime = data.timezone.current_time;
    delete data.continent_code;
    delete data.country_code;
    delete data.is_eu;
    delete data.calling_code;
    delete data.flag.emoji_unicode;
    delete data.timezone.is_dst;
    delete data.timezone.current_time;
    return data
  }
}

export default new IpLookupService();
