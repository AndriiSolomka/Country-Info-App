import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { FetchModule } from 'src/fetch/fetch.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [FetchModule, PrismaModule],
  providers: [CalendarService],
  exports: [CalendarService],
})
export class CalendarModule {}
