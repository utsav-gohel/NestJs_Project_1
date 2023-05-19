import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos';
import { UsersService } from './users.service';
import { updateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptor/serialize-interceptor';
import { UserDto } from './dtos/user.dtos';
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  createuser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: updateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
