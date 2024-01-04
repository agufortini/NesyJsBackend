import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcryptjs from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User> /* Property that contain a decorator */) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    
    try {     
    // 1.- Encrypt password with a one way Hash
    const { password, ...userData } = createUserDto;
    const user = new this.userModel({
      password: bcryptjs.hashSync(password, 10),
      ...userData
    });
    
    await user.save();
    const { password: _, ...newUser } = user.toJSON();

    return user;

    // 2.- Save user

    // 3.- Generate the Jason Web Token (JWT)

      
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${ createUserDto.email } already exists`);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
