import { Get, Controller, Param, Post, Body, UseGuards, Req, ForbiddenException, Put } from '@nestjs/common';
import { User } from 'entities/User';
import { Connection, EntityManager } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
export class UserController {
    constructor(private readonly manager: EntityManager) { 
        User.findOne({isAdmin:true}).then(user=>{
            if(!user){
                console.log('Admin user not exists.create one!');
                const adminUser = new User({username:'admin',password:"admin",isAdmin:true});
                return adminUser.save();
            } return user;
        }).then(user=>{
            console.log(`admin username:${user.username}`);
            console.log(`admin password:${user.password}`);
        })
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAll(@Req() req) {
        console.log(req.user);
        return await User.find({});
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Req() req,@Body() body) {
        if(!req.user.isAdmin) throw new ForbiddenException("Only admin can add a user.");
        const newUser = new User(body);
        return await newUser.save();
    }

    @Put(":id")
    @UseGuards(AuthGuard('jwt'))
    async put(@Req() req,@Param('id') id,@Body() body) {
        if(!req.user.isAdmin) throw new ForbiddenException("Only admin can put a user.");
        let user = await User.findOne(id);
        Object.assign(user,body);
        return await user.save();
    }
}
