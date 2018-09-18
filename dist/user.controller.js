"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const User_1 = require("./entities/User");
const typeorm_1 = require("typeorm");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(manager) {
        this.manager = manager;
        User_1.User.findOne({ adminLevel: User_1.UserAdminType.Super }, { select: ['username', 'password'] })
            .then(user => {
            if (!user) {
                console.log('Admin user not exists.create one!');
                const adminUser = new User_1.User({
                    username: 'admin',
                    password: 'admin',
                    adminLevel: User_1.UserAdminType.Street,
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
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user.adminLevel !== User_1.UserAdminType.Super)
                throw new common_1.ForbiddenException('Permission denied');
            return yield User_1.User.createQueryBuilder()
                .addSelect('password')
                .getMany();
        });
    }
    create(req, body) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(body);
            if (req.user.adminLevel !== User_1.UserAdminType.Super)
                throw new common_1.ForbiddenException('Permission denied');
            const newUser = new User_1.User(body);
            return yield newUser.save();
        });
    }
    replace(req, id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            id = parseInt(id, 10);
            if (req.user.adminLevel === User_1.UserAdminType.Super || req.user.id === id) {
                let user = yield User_1.User.findOne(id);
                Object.assign(user, body);
                return yield user.save();
            }
            else
                throw new common_1.ForbiddenException('Permission denied');
        });
    }
    remove(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            id = parseInt(id, 10);
            if (req.user.adminLevel !== User_1.UserAdminType.Super)
                throw new common_1.ForbiddenException("Permission denied");
            let user = yield User_1.User.findOne(id);
            if (!user)
                throw new common_1.NotFoundException();
            yield user.remove();
            return "deleted";
        });
    }
};
__decorate([
    swagger_1.ApiOperation({
        title: '获取用户列表',
        description: '只有超级管理员拥有该接口权限且可以查看他们的密码',
    }),
    swagger_1.ApiResponse({ status: 200, type: User_1.User, isArray: true }),
    swagger_1.ApiResponse({ status: 403 }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    swagger_1.ApiOperation({
        title: '创建用户',
        description: '只有超级管理员拥有该接口权限',
    }),
    swagger_1.ApiResponse({ status: 200, type: User_1.User }),
    swagger_1.ApiResponse({ status: 403 }),
    swagger_1.ApiImplicitBody({ name: "User", type: User_1.User }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.UsePipes(new common_1.ValidationPipe({
        forbidUnknownValues: true,
        transform: true,
    })),
    common_1.Post(),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, User_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    swagger_1.ApiOperation({
        title: '修改用户信息(包括更新密码)',
        description: '无需提供所有字段.',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: '成功修改用户信息',
    }),
    swagger_1.ApiResponse({
        status: 403,
        description: '只有超级管理员和用户本身可以修改用户信息',
    }),
    swagger_1.ApiImplicitBody({ name: "User", type: User_1.User }),
    swagger_1.ApiImplicitParam({ name: "id", type: Number }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.UsePipes(new common_1.ValidationPipe({
        forbidUnknownValues: true,
        transform: true,
        skipMissingProperties: true
    })),
    common_1.Put(':id'),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, User_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "replace", null);
__decorate([
    swagger_1.ApiOperation({ title: "删除用户" }),
    swagger_1.ApiOkResponse({ description: "删除成功" }),
    swagger_1.ApiForbiddenResponse({ description: "只有超级管理员拥有删除权限" }),
    swagger_1.ApiResponse({ status: 404, description: "用户id不存在" }),
    swagger_1.ApiImplicitParam({ name: "id", type: Number }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Delete("/:id"),
    __param(0, common_1.Req()), __param(1, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
UserController = __decorate([
    swagger_1.ApiUseTags('用户管理'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [typeorm_1.EntityManager])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map