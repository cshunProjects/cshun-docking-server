import { Get, Controller, Post, Body } from '@nestjs/common';
import { AppService } from 'app.service';
import { AuthService } from "auth.service";
import { User } from './entities/User';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) { }

  @Get()
  root(): string {
    return this.appService.root();
  }
  @Post('login')
  async login(@Body('username') username, @Body('password') password) {
    const user = await User.createQueryBuilder()
      .where('username = :username',{username})
      .andWhere('password = :password',{password})
      .getOne();
    return {'token':await this.authService.createToken(user)}
  }
}
