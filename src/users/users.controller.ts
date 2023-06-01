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
  UseGuards,
  Session,
} from '@nestjs/common';
import { AuthGuard } from 'src/Guards/auth.guards';
import { CreateUserDto } from './dtos/create-user.dtos';
import { UsersService } from './users.service';
import { updateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptor/serialize-interceptor';
import { UserDto } from './dtos/user.dtos';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorators';
import { User } from './user.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @UseGuards(AuthGuard)
  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
  @Post('/signout')
  signoutUser(@Session() session: any) {
    session.userId = null;
  }
  @ApiCreatedResponse({
    description: 'Signed Up Succesfully',
    type: UserDto,
  })
  @ApiBadRequestResponse({
    description: 'Signed Up failed',
  })
  @Post('/signup')
  async createuser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Get('/byEmail')
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
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
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: updateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
