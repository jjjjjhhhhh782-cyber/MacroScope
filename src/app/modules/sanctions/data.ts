// Curated sanction events per country. Years drive chart markers
// and the before and after comparison.

export interface SanctionEvent {
  year: number
  title: string
  description: string
}

export const SANCTIONED_COUNTRIES = ['RUS', 'IRN', 'BLR', 'VEN']

export const SANCTION_EVENTS: Record<string, SanctionEvent[]> = {
  RUS: [
    {
      year: 2014,
      title: 'Crimea sanctions',
      description:
        'US and EU sanctions after the annexation of Crimea: asset freezes and restrictions on finance, energy and defense sectors.',
    },
    {
      year: 2022,
      title: 'Invasion sanctions',
      description:
        'Sweeping measures after the invasion of Ukraine: frozen central bank reserves, SWIFT cutoff for major banks, an oil price cap and export controls.',
    },
  ],
  IRN: [
    {
      year: 2012,
      title: 'Oil embargo',
      description:
        'The EU oil embargo and US financial measures cut Iran off from oil buyers and much of the global banking system.',
    },
    {
      year: 2018,
      title: 'US exit from the nuclear deal',
      description:
        'The US reimposed sanctions on oil exports, banking and shipping after leaving the JCPOA agreement.',
    },
  ],
  BLR: [
    {
      year: 2020,
      title: 'Post election sanctions',
      description:
        'EU and US sanctions after the disputed presidential election: travel bans, asset freezes and sector restrictions.',
    },
    {
      year: 2022,
      title: 'War related sanctions',
      description:
        'New measures for supporting the invasion of Ukraine: banking restrictions and export bans on key industries.',
    },
  ],
  VEN: [
    {
      year: 2017,
      title: 'Financial sanctions',
      description:
        'US ban on new debt and equity dealings with the government and the state oil company PDVSA.',
    },
    {
      year: 2019,
      title: 'Oil sanctions',
      description:
        'The US blocked PDVSA assets and oil exports, cutting the main source of state revenue.',
    },
  ],
}
