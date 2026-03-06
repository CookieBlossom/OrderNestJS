import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user.interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: User[] = [];
  finById: any;
  async createUser(dto: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser: User = {
      id: Date.now(),
      email: dto.email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  findById(id: number) {
    return this.users.find((user) => user.id == id);
  }
}
