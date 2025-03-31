import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

  async getAvailable(): Promise<string[]> {
    const url = `${this.configService.get<string>('DATE_NAGER_API_URL')}/AvailableCountries`;
    return this.fetchService.fetchData<string[]>(url);
  }

  async getBorder(countryCode: string): Promise<string[]> {
    const url = `${this.configService.get<string>('DATE_NAGER_API_URL')}/CountryInfo/${countryCode}`;
    const data = await this.fetchService.fetchData<{ borders: string[] }>(url);
    return data.borders || [];
  }

  async getPopulationData(countryCode: string): Promise<IPopulationCount[]> {
    const url = `${this.configService.get<string>('COUNTRIES_NOW_API_URL')}/countries/population`;
    const data = await this.fetchService.fetchData<IPopulationApiResponse>(url);
    const populationItem = data.data.find((item) => item.code === countryCode);

    return populationItem?.populationCounts || [];
  }

  async getFlag(countryCode: string): Promise<string> {
    const url = `${this.configService.get<string>('COUNTRIES_NOW_API_URL')}/countries/flag/images`;
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
