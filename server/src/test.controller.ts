/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { TestGetQueryParams } from './dto/Test.dto';

@Controller('test')
export class TestController {
  @Post('/post')
  async test(@Body() body: TestGetQueryParams) {
    return { response: body };
  }
}
