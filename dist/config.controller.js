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
const Config_1 = require("./entities/Config");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
let ConfigController = class ConfigController {
    setVegCategories(req, input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(input))
                throw new common_1.BadRequestException();
            if (req.user.adminLevel !== User_1.UserAdminType.Super)
                throw new common_1.ForbiddenException('Permission denied');
            let config = (yield Config_1.Config.findOne({ key: 'VegCategories' })) ||
                new Config_1.Config({ key: 'VegCategories' });
            config.value = input;
            return (yield config.save()).value;
        });
    }
    setAnimalCategories(req, input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(input))
                throw new common_1.BadRequestException();
            if (req.user.adminLevel !== User_1.UserAdminType.Super)
                throw new common_1.ForbiddenException('Permission denied');
            let config = (yield Config_1.Config.findOne({ key: 'AnimalCategories' })) ||
                new Config_1.Config({ key: 'AnimalCategories' });
            config.value = input;
            return (yield config.save()).value;
        });
    }
    getAnimalCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            let config = yield Config_1.Config.findOne({ key: 'AnimalCategories' });
            return config ? config.value : [];
        });
    }
    getVegCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            let config = yield Config_1.Config.findOne({ key: 'VegCategories' });
            return config ? config.value : [];
        });
    }
};
__decorate([
    swagger_1.ApiOperation({
        title: '设置蔬果类种类',
        description: '只有超级管理员拥有该接口权限',
    }),
    swagger_1.ApiImplicitBody({
        name: '种类',
        type: String,
        isArray: true,
        required: false
    }),
    swagger_1.ApiResponse({ status: 200, type: String, isArray: true }),
    swagger_1.ApiBadRequestResponse({ description: '输入异常' }),
    swagger_1.ApiForbiddenResponse({ description: '只有超级管理员拥有该接口权限' }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post('VegCategories'),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "setVegCategories", null);
__decorate([
    swagger_1.ApiOperation({
        title: '设置畜类种类',
        description: '只有超级管理员拥有该接口权限',
    }),
    swagger_1.ApiImplicitBody({
        name: '种类',
        type: String,
        required: false,
        isArray: true,
    }),
    swagger_1.ApiResponse({ status: 200, type: String, isArray: true }),
    swagger_1.ApiBadRequestResponse({ description: '输入异常' }),
    swagger_1.ApiForbiddenResponse({ description: '只有超级管理员拥有该接口权限' }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post('AnimalCategories'),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "setAnimalCategories", null);
__decorate([
    swagger_1.ApiOperation({
        title: '获取畜类种类',
    }),
    swagger_1.ApiResponse({ status: 200, type: String, isArray: true }),
    common_1.Get('AnimalCategories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "getAnimalCategories", null);
__decorate([
    swagger_1.ApiOperation({
        title: '获取蔬果类种类',
    }),
    swagger_1.ApiResponse({ status: 200, type: String, isArray: true }),
    common_1.Get('VegCategories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "getVegCategories", null);
ConfigController = __decorate([
    swagger_1.ApiUseTags('配置设置'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('configs')
], ConfigController);
exports.ConfigController = ConfigController;
//# sourceMappingURL=config.controller.js.map