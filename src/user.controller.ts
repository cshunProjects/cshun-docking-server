import {
  Get,
  Controller,
  Param,
  Post,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
  NotFoundException,
  Put,
  ValidationPipe,
  UsePipes,
  Delete,
} from '@nestjs/common';
import { User, UserAdminType } from './entities/User';
import { Connection, EntityManager } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiResponse,
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiImplicitParam,
  ApiForbiddenResponse ,
  ApiImplicitBody,

} from '@nestjs/swagger';
@ApiUseTags('用户管理')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly manager: EntityManager) {
    /**
     * Always print the SuperAdmin User's username & password.
     */
    User.findOne(
      { adminLevel: UserAdminType.Super },
      { select: ['username', 'password'] },
    )
      .then(user => {
        if (!user) {
          console.log('Admin user not exists.create one!');
          const adminUser = new User({
            username: 'admin',
            password: 'admin',
            adminLevel: UserAdminType.Super,
          });
          return adminUser.save();
        }
        return user;
      })
      .then(user => {
        console.log(`admin username:${user.username}`);
        console.log(`admin password:${user.password}`);
      });
  }

  @ApiOperation({
    title: '获取用户列表',
    description: '只有超级管理员拥有该接口权限且可以查看他们的密码',
  })
  @ApiResponse({ status: 200, type: User, isArray: true })
  @ApiResponse({ status: 403 })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@Req() req): Promise<User[]> {
    if (req.user.adminLevel !== UserAdminType.Super)
      throw new ForbiddenException('Permission denied');
    return await User.createQueryBuilder()
      .addSelect('password')
      .getMany();
  }

  @ApiOperation({
    title: '创建用户',
    description: '只有超级管理员拥有该接口权限',
  })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 403 })
  @ApiImplicitBody({name:"User",type:User})
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      transform: true,
    }),
  )
  @Post()
  async create(@Req() req, @Body() body: User): Promise<User> {
    console.log(body);
    if (req.user.adminLevel !== UserAdminType.Super)
      throw new ForbiddenException('Permission denied');
    const newUser = new User(body);
    return await newUser.save();
  }

  
  @ApiOperation({
    title: '修改用户信息(包括更新密码)',
    description: '无需提供所有字段.',
  })
  @ApiResponse({
    status: 200,
    description: '成功修改用户信息',
  })
  @ApiResponse({
    status: 403,
    description: '只有超级管理员和用户本身可以修改用户信息',
  })
  @ApiImplicitBody({name:"User",type:User})
  @ApiImplicitParam({name:"id",type:Number})
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      transform: true,
      skipMissingProperties:true
    }),
  )
  @Put(':id')
  async replace(
    @Req() req,
    @Param('id') id: number,
    @Body() body: User,
  ): Promise<User> {
    if (req.user.adminLevel === UserAdminType.Super || req.user.id === id) {
      let user = await User.findOne(id);
      Object.assign(user, body);
      return await user.save();
    } else throw new ForbiddenException('Permission denied');
  }

  @ApiOperation({title:"删除用户"})
  @ApiOkResponse({description:"删除成功"})
  @ApiForbiddenResponse({description:"只有超级管理员拥有删除权限"})
  @ApiResponse({status:404,description:"用户id不存在"})
  @ApiImplicitParam({name:"id",type:Number})
  @UseGuards(AuthGuard('jwt'))
  @Delete("/:id")
  async remove(@Req() req,@Param("id") id) {
    if(req.user.adminLevel !== UserAdminType.Super) throw new ForbiddenException("Permission denied");
    let user =await User.findOne(id);
    if(!user) throw new NotFoundException();
    await user.remove();
    return "deleted";
  }
}
