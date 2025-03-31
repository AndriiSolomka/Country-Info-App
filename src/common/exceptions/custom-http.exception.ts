import { HttpException, HttpStatus } from '@nestjs/common';

export class CountryHttpException extends HttpException {
  constructor() {
    super('Failed to fetch available countries:', HttpStatus.BAD_GATEWAY);
  }
}
