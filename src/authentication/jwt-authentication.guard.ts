import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default calss JwtAuthenticationGuard extends AuthGuard('jwt'){}
