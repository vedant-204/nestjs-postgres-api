import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { SubscribersController } from './subscribers.controller';

@Module({
  imports: [ConfigModule],
  controllers: [SubscribersController],
  providers: [
    {
      provide: 'SUBSCRIBERS_SERVICE',
      useFactory: (configService: ConfigService) => (
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('SUBSCRIBERS_SERVICE_HOST'),
            port: configService.get('SUBSCRIBERS_SERVICE_PORT')
          }
        })
      ),
      inject: [ConfigService]
    }
  ]
})
export class SubscribersModule { }
