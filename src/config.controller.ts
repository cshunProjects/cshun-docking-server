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
  BadRequestException,
} from '@nestjs/common';
import { User, UserAdminType } from './entities/User';
import { Config } from './entities/Config';
import { Connection, EntityManager } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiResponse,
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiImplicitParam,
  ApiForbiddenResponse,
  ApiImplicitBody,
  ApiModelProperty,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiUseTags('配置设置')
@ApiBearerAuth()
@Controller('configs')
export class ConfigController {
  @ApiOperation({
    title: '设置蔬果类种类',
    description: '只有超级管理员拥有该接口权限',
  })
  @ApiImplicitBody({
    name: '种类',
    type: String,
    isArray: true,
    required:false
  })
  @ApiResponse({ status: 200, type: String, isArray: true })
  @ApiBadRequestResponse({ description: '输入异常' })
  @ApiForbiddenResponse({ description: '只有超级管理员拥有该接口权限' })
  @UseGuards(AuthGuard('jwt'))
  @Post('VegCategories')
  async setVegCategories(@Req() req, @Body() input): Promise<string[]> {
    if (!Array.isArray(input)) throw new BadRequestException();
    if (req.user.adminLevel !== UserAdminType.Super)
      throw new ForbiddenException('Permission denied');
    let config =
      (await Config.findOne({ key: 'VegCategories' })) ||
      new Config({ key: 'VegCategories' });
    config.value = input;
    return (await config.save()).value as string[];
  }
  @ApiOperation({
    title: '设置畜类种类',
    description: '只有超级管理员拥有该接口权限',
  })
  @ApiImplicitBody({
    name: '种类',
    type: String,
    required: false,
    isArray: true,
  })
  @ApiResponse({ status: 200, type: String, isArray: true })
  @ApiBadRequestResponse({ description: '输入异常' })
  @ApiForbiddenResponse({ description: '只有超级管理员拥有该接口权限' })
  @UseGuards(AuthGuard('jwt'))
  @Post('AnimalCategories')
  async setAnimalCategories(@Req() req, @Body() input): Promise<string[]> {
    if (!Array.isArray(input)) throw new BadRequestException();
    if (req.user.adminLevel !== UserAdminType.Super)
      throw new ForbiddenException('Permission denied');
    let config =
      (await Config.findOne({ key: 'AnimalCategories' })) ||
      new Config({ key: 'AnimalCategories' });
    config.value = input;
    return (await config.save()).value as string[];
  }

  @ApiOperation({
    title: '获取畜类种类',
  })
  @ApiResponse({ status: 200, type: String, isArray: true })
  @Get('AnimalCategories')
  async getAnimalCategories(): Promise<string[]> {
    let config = await Config.findOne({ key: 'AnimalCategories' });
    return config ? (config.value as string[]) : [];
  }

  @ApiOperation({
    title: '获取蔬果类种类',
  })
  @ApiResponse({ status: 200, type: String, isArray: true })
  @Get('VegCategories')
  async getVegCategories(): Promise<string[]> {
    let config = await Config.findOne({ key: 'VegCategories' });
    return config ? (config.value as string[]) : [];
  }
}
