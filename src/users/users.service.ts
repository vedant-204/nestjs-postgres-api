import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository }from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/createUser.dto'
import user from './users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(user)
    private userRepository: Repository<user>
  ) {}

  async getById(id: number){
    const user = await this.userRepository.findOne({
      where: {id,}
    })
    if (user) {
      return user
    } throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }
  
  async getByEmail(email: string){
    const user = await this.userRepository.findOne({
      where: {email,}
    })
    if (user) {
      return user;
    } throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto){
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }
}
