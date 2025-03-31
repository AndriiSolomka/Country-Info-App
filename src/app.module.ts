import { Module } from '@nestjs/common';
import { CountryModule } from './country/country.module';
import { ConfigModule } from '@nestjs/config';
import { FetchModule } from './fetch/fetch.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CountryModule,
    FetchModule,
    CalendarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
