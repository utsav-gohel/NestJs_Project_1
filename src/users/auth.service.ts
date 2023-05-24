import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    //See if email in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }
    //Hash users pwd and Generate salt
    const salt = randomBytes(8).toString('hex');

    //Hash the salt and pwd together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //join the hashed result and the salt
    const result = salt + '.' + hash.toString('hex');

    //create new user and save it
    const user = await this.usersService.create(email, result);

    //return user
    return user;
  }
  async signin(email: string, password: string) {
    //we are destructuring user from find method
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad Password');
    }
    return user;
  }
}
