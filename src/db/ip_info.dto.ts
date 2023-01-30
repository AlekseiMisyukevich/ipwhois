export interface IPInfoDto {
  ip: string,
  success: boolean,
  message?: string,
  type: string,
  continent: string,
  continent_code: string,
  region: string,
  region_code: string,
  city: string,
  latitude: number,
  longitude: number,
  isEu: boolean,
  postal: string,
  calling_code: string,
  capital: string,
  borders: string,
  flag: Flag,
  connection: Connection,
  timezone: Timezone,
  currency: Currency,
  security: Security
}

interface Flag {
  img: string,
  emoji: string,
  emojiEncode: string
}

interface Connection {
  asn: number,
  org: string,
  isp: string,
  domain: string
}

interface Timezone {
  id: string,
  abbr: string,
  isDst: boolean,
  offset: number,
  utc: string,
  currentTime: string
}

interface Currency {
  name: string,
  code: string,
  symbol: string,
  plural: string,
  exchangeRate: number
}

interface Security {
  anonymous: boolean,
  proxy: boolean,
  vpn: boolean,
  tor: boolean,
  hosting: boolean
}
