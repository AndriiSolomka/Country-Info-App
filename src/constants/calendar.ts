export const API_URLS = {
  DATE_NAGER: 'DATE_NAGER_API_URL',
};

export const ENDPOINTS = {
  PUBLIC_HOLIDAYS: (year: number, countryCode: string) =>
    `/PublicHolidays/${year}/${countryCode}`,
};
