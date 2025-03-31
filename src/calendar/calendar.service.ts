import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FetchService } from '../fetch/fetch.service';
import { ConfigService } from '@nestjs/config';
import { AddHolidaysDto } from './dto/add-holidays.dto';
import { Holiday } from 'src/types/calendar.interface';
import { API_URLS, ENDPOINTS } from 'src/constants/calendar';

@Injectable()
export class CalendarService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly fetchService: FetchService,
  ) {}

  private getApiUrl(apiKey: string, endpoint: string): string {
    return `${this.configService.get<string>(apiKey)}${endpoint}`;
  }

  async addHolidaysToCalendar(userId: string, dto: AddHolidaysDto) {
    const allHolidays = await this.fetchHolidays(dto.countryCode, dto.year);
    const selectedHolidays = this.filterHolidays(allHolidays, dto.holidays);
    return this.saveHolidays(userId, selectedHolidays);
  }

  async fetchHolidays(countryCode: string, year: number): Promise<Holiday[]> {
    const url = this.getApiUrl(
      API_URLS.DATE_NAGER,
      ENDPOINTS.PUBLIC_HOLIDAYS(year, countryCode),
    );
    return this.fetchService.fetchData<Holiday[]>(url);
  }

  private filterHolidays(
    allHolidays: Holiday[],
    requestedHolidays: string[],
  ): Holiday[] {
    const selectedHolidays = allHolidays.filter((h) =>
      requestedHolidays.includes(h.localName),
    );

    if (!selectedHolidays.length) {
      throw new NotFoundException('Requested holidays not found.');
    }
    return selectedHolidays;
  }

  async saveHolidays(userId: string, holidays: Holiday[]) {
    const events = await this.prisma.calendarEvent.createMany({
      data: holidays.map((holiday) => ({
        userId: Number(userId),
        title: holiday.localName,
        date: new Date(holiday.date),
      })),
    });

    return { message: 'Holidays added successfully', events };
  }
}
