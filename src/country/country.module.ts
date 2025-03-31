import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { FetchModule } from 'src/fetch/fetch.module';

@Module({
  imports: [FetchModule],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
