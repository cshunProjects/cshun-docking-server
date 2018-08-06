import { Get, Controller, Param, Post, Body, UseGuards, Req } from '@nestjs/common';
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
    // @Get("/:id")
    // async getById(@Param('id') id) {
    //     return await MainBody.findOne(id);
    // }

    // @Post()
    // async create(@Body() input) {
    //     const mainBody = new MainBody(input);
    //     console.log(mainBody);
    //     return await mainBody.save();
    // }
}
