import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { API_URLS, ENDPOINTS } from 'src/constants/country';
import { FetchService } from 'src/fetch/fetch.service';
import {
  ICountryInfo,
  IFlagApiResponse,
  IPopulationApiResponse,
  IPopulationCount,
} from 'src/types/country.interface';

@Injectable()
export class CountryService {
  constructor(
    private readonly configService: ConfigService,
    private readonly fetchService: FetchService,
  ) {}

  private getApiUrl(apiKey: string, endpoint: string): string {
    return `${this.configService.get<string>(apiKey)}${endpoint}`;
  }

  async getAvailable(): Promise<string[]> {
    const url = this.getApiUrl(
      API_URLS.DATE_NAGER,
      ENDPOINTS.AVAILABLE_COUNTRIES,
    );
    return this.fetchService.fetchData<string[]>(url);
  }

  async getBorder(countryCode: string): Promise<string[]> {
    const url = this.getApiUrl(
      API_URLS.DATE_NAGER,
      ENDPOINTS.COUNTRY_INFO(countryCode),
    );
    const data = await this.fetchService.fetchData<{ borders: string[] }>(url);
    return data.borders || [];
  }

  async getPopulationData(countryCode: string): Promise<IPopulationCount[]> {
    const url = this.getApiUrl(API_URLS.COUNTRIES_NOW, ENDPOINTS.POPULATION);
    const data = await this.fetchService.fetchData<IPopulationApiResponse>(url);
    const populationItem = data.data.find((item) => item.code === countryCode);

    return populationItem?.populationCounts || [];
  }

  async getFlag(countryCode: string): Promise<string> {
    const url = this.getApiUrl(API_URLS.COUNTRIES_NOW, ENDPOINTS.FLAG_IMAGES);
    const data = await this.fetchService.fetchData<IFlagApiResponse>(url);
    const flagItem = data.data.find(
      (item) => item.iso2 === countryCode || item.iso3 === countryCode,
    );

    return flagItem?.flag || '';
  }

  async getCountryInfo(countryCode: string): Promise<ICountryInfo> {
    const borderCountries = await this.getBorder(countryCode);
    const population = await this.getPopulationData(countryCode);
    const flag = await this.getFlag(countryCode);

    return {
      borderCountries,
      population,
      flag,
    };
  }
}
