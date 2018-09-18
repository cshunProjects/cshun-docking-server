import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { User } from './entities/User';
import { IJwtPayload } from './interfaces/IJwtPayload';

@Injectable()
export class AuthService {
    constructor() { }

    async createToken(user:User) {
        const payload: IJwtPayload = { id: user.id };
        return jwt.sign(payload, process.env['JWT_SECRET_KEY'], { expiresIn: 36000000 });
    }

    async validateUser(payload: IJwtPayload): Promise<any> {
        return await User.findOne(payload.id);
    }
}