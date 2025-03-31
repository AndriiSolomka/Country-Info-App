import { Controller, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CalendarService } from 'src/calendar/calendar.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddHolidaysDto } from 'src/calendar/dto/add-holidays.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly calendarService: CalendarService,
  ) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/:userId/calendar/holidays')
  async addHolidays(
    @Param('userId') userId: string,
    @Body() addHolidaysDto: AddHolidaysDto,
  ) {
    return this.calendarService.addHolidaysToCalendar(userId, addHolidaysDto);
  }
}
