import { Body, Req, Controller, HttpCode, Post, UseGuards, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService<AuthenticationService>
  ) {}

  @UseGuards(JwtAutheticationGuard)
  @Get()
  autheticate(@Req() request: RequestWithUser){
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @Post('register')
  async register (@Body() registrationData: RegisterDto){
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async login(@Req() request: RequestWithUser, @Res response: Response){
    const {user} = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAutheticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response){
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200),
  }
}
