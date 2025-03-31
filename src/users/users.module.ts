import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CalendarModule } from 'src/calendar/calendar.module';

@Module({
  imports: [PrismaModule, CalendarModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
