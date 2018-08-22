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
  Delete,
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { VegEnrollment } from './entities/VegEnrollment';
import { User, UserAdminType } from './entities/User';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiResponse,
    ApiUseTags,
    ApiBearerAuth,
    ApiOperation,
    ApiOkResponse,
    ApiImplicitParam,
    ApiForbiddenResponse,
    ApiCreatedResponse,
    ApiImplicitBody
  
  } from '@nestjs/swagger';

@ApiUseTags("蔬果产方登记")
@ApiBearerAuth()
@Controller('vegEnrollment')
export class VegEnrollmentController {
  constructor() {}

  @ApiOperation({title:"获取所有产方登记情况(全部信息，包括敏感信息)",description:"adminLevel为super可以获得所有信息,town可以获得所在town的订单，以此类推"})
  @ApiOkResponse({description:"登记信息"})
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@Req() req) {
    const user: User = req.user;
    switch (user.adminLevel) {
      case UserAdminType.Super:
        return await VegEnrollment.createQueryBuilder().getMany();
      case UserAdminType.Normal:
        return await VegEnrollment.createQueryBuilder()
          .where('creatorId = :id', user)
          .getMany();
      case UserAdminType.Street:
        return await VegEnrollment.createQueryBuilder()
          .where('creatorId = :id OR street = :street', user)
          .getMany();
      case UserAdminType.Town:
        return await VegEnrollment.createQueryBuilder()
          .orWhere(
            'creatorId = :id OR (street = :street AND town = :town)',
            user,
          )
          .getMany();
    }
  }
  @ApiOperation({title:"获取产方登记情况(全部信息，包括敏感信息)",description:"权限控制同上"})
  @ApiResponse({status:404,description:"不存在的id"})
  @ApiForbiddenResponse({description:"无权查看"})
  @ApiImplicitParam({name:"Id",type:Number})
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getById(@Req() req, @Param('id') id) {
    const enrollment = await VegEnrollment.findOne(id);
    if (!enrollment) throw new NotFoundException();
    const user:User = req.user;
    if (await VegEnrollmentController.hasPolicy(user,enrollment))
      return enrollment;
    throw new ForbiddenException();
  }

  
 
  @ApiOperation({title:"新增登记"})
  @ApiCreatedResponse({description:"登记信息"})
  @ApiImplicitBody({name:"VegEnrollemnt",type:VegEnrollment})
  @UsePipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      transform: true,
    }),
  )
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Req() req, @Body() input) {
    let enrollment = new VegEnrollment(input);
    enrollment.creator = req.user;
    return await enrollment.save();
  }

  

  @ApiOperation({title:"修改登记",description:"权限控制同上"})
  @ApiOkResponse({description:"修改后的登记信息"})
  @ApiForbiddenResponse({description:"无权修改"})
  @ApiImplicitBody({name:"VegEnrollment",type:VegEnrollment})
  @ApiImplicitParam({name:"Id",type:Number})
  @UsePipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      transform: true,
      skipMissingProperties:true
    }),
  )
  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async put(@Req() req, @Param('id') id, @Body() input) {
    let enrollment = await VegEnrollment.findOne(id);
    if (!enrollment) throw new NotFoundException();
    if (await VegEnrollmentController.hasPolicy(req.user,enrollment)){
      Object.assign(enrollment, input);
      return await enrollment.save();
    }
    throw new ForbiddenException();
  }

  @ApiOperation({title:"删除登记",description:"权限控制同上"})
  @ApiOkResponse({description:"deleted"})
  @ApiForbiddenResponse({description:"无权删除"})
  @ApiImplicitParam({name:"Id",type:Number})
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Req() req, @Param('id') id) {
    let enrollment = await VegEnrollment.findOne(id);
    if (!enrollment) throw new NotFoundException();
    if (await VegEnrollmentController.hasPolicy(req.user,enrollment)) {
      await enrollment.remove();
      return 'deleted';
    }
    throw new ForbiddenException();
  }
  static async hasPolicy(user:User,enrollment:VegEnrollment){
    return (user.adminLevel === UserAdminType.Super) ||
        (user.adminLevel === UserAdminType.Town && enrollment.town === user.town)||
        (user.adminLevel === UserAdminType.Street && enrollment.town === user.town && enrollment.street === user.street )||
         user.id === (await enrollment.creator).id
  }
}
