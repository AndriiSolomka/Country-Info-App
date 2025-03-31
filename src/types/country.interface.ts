export interface ICountryInfo {
  borderCountries: string[];
  population: IPopulationCount[];
  flag: string;
}

interface IFlagData {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

export interface IFlagApiResponse {
  data: IFlagData[];
}

export interface IPopulationCount {
  year: number;
  value: number;
}

interface ICountryPopulationData {
  country: string;
  code: string;
  iso3: string;
  populationCounts: IPopulationCount[];
}

export interface IPopulationApiResponse {
  error: boolean;
  msg: string;
  data: ICountryPopulationData[];
}
