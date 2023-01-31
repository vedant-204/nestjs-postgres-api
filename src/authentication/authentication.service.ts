import { HttpStatus, HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: userService
  ) {}

  public async register(registrationData: RegisterDto){
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword
      });
      createdUser.password = undefined;
      return createdUser;
    } catch(error){
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException("User with that email already exists", HttpStatus.BAD_REQUEST);
      } throw new HttpsException("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
