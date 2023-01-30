export type IPInfoDao = {
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
  is_eu: boolean,
  postal: string,
  calling_code: string,
  capital: string,
  borders: string,
  flag: Flag,
  connection: Connection,
  timezone: Timezone
}

type Flag = {
  img: string,
  emoji: string,
  emojiEncode: string
}

type Connection = {
  asn: number,
  org: string,
  isp: string,
  domain: string
}

type Timezone = {
  id: string,
  abbr: string,
  isDst: boolean,
  offset: number,
  utc: string,
  currentTime: string
}
