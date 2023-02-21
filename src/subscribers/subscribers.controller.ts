import { ClassSerializerInterceptor, Controller, Get, Inject, UseGuards, UseInterceptors, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import CreateSubscribersDto from './dto/createSubscriber.dto';

@Controller('subscribers')
@UseInterceptors(ClassSerializerInterceptor)
export class SubscribersController {
  constructor(
    @Inject('SUBSCRIBERS_SERVICE') private subscribersService: ClientProxy,
  ) { }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getSubscribers() {
    return this.subscribersService.emit({
      cmd: 'get-all-subscribers'
    }, '')
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() subscriber: CreateSubscribersDto) {
    return this.subscribersService.emit({
      cmd: 'add-subscirber'
    }, subscriber)
  }
}




