// World Bank indicator codes and the country list used across modules.

export const INDICATORS = {
  gdpGrowth: 'NY.GDP.MKTP.KD.ZG',
  gdpPerCapita: 'NY.GDP.PCAP.CD',
  inflation: 'FP.CPI.TOTL.ZG',
  unemployment: 'SL.UEM.TOTL.ZS',
  lifeExpectancy: 'SP.DYN.LE00.IN',
  tradePercentGdp: 'NE.TRD.GNFS.ZS',
  fdiInflows: 'BX.KLT.DINV.WD.GD.ZS',
} as const

export type IndicatorKey = keyof typeof INDICATORS

export interface Country {
  code: string
  name: string
}

export const COUNTRIES: Country[] = [
  { code: 'KAZ', name: 'Kazakhstan' },
  { code: 'RUS', name: 'Russia' },
  { code: 'USA', name: 'United States' },
  { code: 'CHN', name: 'China' },
  { code: 'DEU', name: 'Germany' },
  { code: 'FRA', name: 'France' },
  { code: 'GBR', name: 'United Kingdom' },
  { code: 'JPN', name: 'Japan' },
  { code: 'TUR', name: 'Turkiye' },
  { code: 'IRN', name: 'Iran' },
  { code: 'BRA', name: 'Brazil' },
  { code: 'IND', name: 'India' },
  { code: 'POL', name: 'Poland' },
  { code: 'UZB', name: 'Uzbekistan' },
  { code: 'UKR', name: 'Ukraine' },
  { code: 'KOR', name: 'South Korea' },
  { code: 'ITA', name: 'Italy' },
  { code: 'ESP', name: 'Spain' },
  { code: 'CHE', name: 'Switzerland' },
  { code: 'NOR', name: 'Norway' },
  { code: 'BLR', name: 'Belarus' },
  { code: 'VEN', name: 'Venezuela' },
]

export function countryName(code: string): string {
  return COUNTRIES.find((country) => country.code === code)?.name ?? code
}
