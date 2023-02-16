import { AuthenticationService } from '../authentication.service';
import { UserService }from '../../users/users.service.ts';
import { Repository } from 'typeorm';
import User from '../../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../database/database.module.ts';
import mockedJwtService from '../../utils/mock/jwt.service.ts';
import mockedConfigService from '../../utils/mock/config.service.ts';

describe('The AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        UsersModule,
        ConfigModule.forRoot({
          validationSchema: Joi.object({
            POSTGRES_HOST: Joi.string().required(),
            POSTGRES_PORT: Joi.number().required(),
            POSTGRES_USER: Joi.string().required(),
            POSTGRES_PASSWORD: Joi.string().required(),
            POSTGRES_DB: Joi.string().required(),
            JWT_SECRET: Joi.string().required(),
            JWT_EXPIRATION_TIME: Joi.string().required(),
            PORT: Joi.number(),
          })
        }),
        DatabaseModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: {
              expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
            },
          }),
        }),
      ],
      providers: [
        UserService,
        AuthenticationService,
        {
          provide: ConfigService,
          userValue: mockedConfigService
        },
        {
          provide: JwtService,
          userValue: mockedJwtService
        },
        {
          provide:getRepositoryToken(User),
          useValue: [],
        }
      ],
    }).compile();
    authenticationService = await module.get<AuthenticationService>(AuthenticationService);
  })
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(
        typeof authenticationService.getCookieWithJwtToken(userId)
      ).toEqual('string')
    })
  })
});
