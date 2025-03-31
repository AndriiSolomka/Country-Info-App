import { Module } from '@nestjs/common';
import { CountryModule } from './country/country.module';
import { ConfigModule } from '@nestjs/config';
import { FetchModule } from './fetch/fetch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CountryModule,
    FetchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
