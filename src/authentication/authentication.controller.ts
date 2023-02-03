import { Body, Get, Req, Controller, HttpCode, Post, UseGuards, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard'

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  autheticate(@Req() request: RequestWithUser){
    const user = request.user;
    user.password = undefined;
    return request.user;
  }

  @Post('register')
  async register (@Body() registrationData: RegisterDto){
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async login(@Req() request: RequestWithUser){
    const {user} = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser){
    request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogout());
  }
}
