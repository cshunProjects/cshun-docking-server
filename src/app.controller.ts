import { Get, Controller, Post, Body, BadRequestException, UseGuards, Query,Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from "./auth.service";
import { User } from './entities/User';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiResponse,
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiImplicitBody,
  ApiOkResponse,
  ApiBadGatewayResponse,
  ApiModelProperty
} from '@nestjs/swagger';

export class LoginInput {
  @ApiModelProperty()
  username:string;
  @ApiModelProperty()
  password:string;
}

@ApiUseTags("认证")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) { }

  @Get()
  root(): string {
    return this.appService.root();
  }

  @ApiOperation({title:"登录"})
  @ApiImplicitBody({name:"用户名&密码",type:LoginInput})
  @ApiOkResponse({type:{token:'string'}})
  @ApiBadGatewayResponse({description:"用户不存在或密码错误"})
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async me(@Req() req){
    return req.user;
  }
}
