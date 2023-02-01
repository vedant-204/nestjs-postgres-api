import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.ts';
import

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
      } throw new HttpException("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string){
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error)d {
      throw new HttpException("Wrong Credentials", HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string){
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword, hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException("Wrong Credentials", HttpStatus.BAD_REQUEST);
    }
  }
}
