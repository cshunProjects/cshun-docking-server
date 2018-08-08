import { Get, Controller, Post, Body, BadRequestException, UseGuards, Query,Req } from '@nestjs/common';
import { AppService } from 'app.service';
import { AuthService } from "auth.service";
import { User } from './entities/User';
import { AuthGuard } from '@nestjs/passport';
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
    if(!user) throw new BadRequestException('用户不存在或密码错误');
    return {'token':await this.authService.createToken(user)};
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async me(@Req() req){
    return req.user;
  }
}
