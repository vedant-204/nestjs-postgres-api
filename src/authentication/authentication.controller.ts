import { Body, Get, Req, Controller, HttpCode, Post, UseGuards, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersService } from '../users/users.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { ref } from '@hapi/joi';
import JwtRefreshGuard from './jwtRefresh.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService
  ) { }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  autheticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return request.user;
  }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authenticationService.getCookieWithJwtRefreshToken(request.user.id);
    request.res.setHeader('Set-Header', accessTokenCookie);
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(user.id);
    const refreshTokenCookie = this.authenticationService.getCookieWithJwtRefreshToken(user.id);
    await this.usersService.setCurrentRefreshToken(refreshTokenCookie, user.id);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie])
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogout());
  }
}
