export const API_URLS = {
  DATE_NAGER: 'DATE_NAGER_API_URL',
  COUNTRIES_NOW: 'COUNTRIES_NOW_API_URL',
};

export const ENDPOINTS = {
  AVAILABLE_COUNTRIES: '/AvailableCountries',
  COUNTRY_INFO: (countryCode: string) => `/CountryInfo/${countryCode}`,
  POPULATION: '/countries/population',
  FLAG_IMAGES: '/countries/flag/images',
};
