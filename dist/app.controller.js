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
const app_service_1 = require("./app.service");
const auth_service_1 = require("./auth.service");
const User_1 = require("./entities/User");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
class LoginInput {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], LoginInput.prototype, "username", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
exports.LoginInput = LoginInput;
let AppController = class AppController {
    constructor(appService, authService) {
        this.appService = appService;
        this.authService = authService;
    }
    root() {
        return this.appService.root();
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.createQueryBuilder()
                .where('username = :username', { username })
                .andWhere('password = :password', { password })
                .getOne();
            if (!user)
                throw new common_1.BadRequestException('用户不存在或密码错误');
            return { 'token': yield this.authService.createToken(user) };
        });
    }
    me(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return req.user;
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "root", null);
__decorate([
    swagger_1.ApiOperation({ title: "登录" }),
    swagger_1.ApiImplicitBody({ name: "用户名&密码", type: LoginInput }),
    swagger_1.ApiOkResponse({ type: { token: 'string' } }),
    swagger_1.ApiBadGatewayResponse({ description: "用户不存在或密码错误" }),
    common_1.Post('login'),
    __param(0, common_1.Body('username')), __param(1, common_1.Body('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    common_1.Get('me'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "me", null);
AppController = __decorate([
    swagger_1.ApiUseTags("认证"),
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        auth_service_1.AuthService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map