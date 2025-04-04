import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('available')
  async getAvailableCountries() {
    return await this.countryService.getAvailable();
  }

  @Get(':countryCode/info')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    return await this.countryService.getCountryInfo(countryCode);
  }
}
