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
var VegEnrollmentController_1;
const common_1 = require("@nestjs/common");
const VegEnrollment_1 = require("./entities/VegEnrollment");
const User_1 = require("./entities/User");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
let VegEnrollmentController = VegEnrollmentController_1 = class VegEnrollmentController {
    constructor() { }
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            switch (user.adminLevel) {
                case User_1.UserAdminType.Super:
                    return yield VegEnrollment_1.VegEnrollment.createQueryBuilder().getMany();
                case User_1.UserAdminType.Normal:
                    return yield VegEnrollment_1.VegEnrollment.createQueryBuilder()
                        .where('creatorId = :id', user)
                        .getMany();
                case User_1.UserAdminType.Street:
                    return yield VegEnrollment_1.VegEnrollment.createQueryBuilder()
                        .where('creatorId = :id OR street = :street', user)
                        .getMany();
                case User_1.UserAdminType.Town:
                    return yield VegEnrollment_1.VegEnrollment.createQueryBuilder()
                        .orWhere('creatorId = :id OR (street = :street AND town = :town)', user)
                        .getMany();
            }
        });
    }
    getById(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            id = parseInt(id, 10);
            const enrollment = yield VegEnrollment_1.VegEnrollment.findOne(id);
            if (!enrollment)
                throw new common_1.NotFoundException();
            const user = req.user;
            if (yield VegEnrollmentController_1.hasPolicy(user, enrollment))
                return enrollment;
            throw new common_1.ForbiddenException();
        });
    }
    create(req, input) {
        return __awaiter(this, void 0, void 0, function* () {
            let enrollment = new VegEnrollment_1.VegEnrollment(input);
            enrollment.creator = req.user;
            return yield enrollment.save();
        });
    }
    put(req, id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            id = parseInt(id, 10);
            let enrollment = yield VegEnrollment_1.VegEnrollment.findOne(id);
            if (!enrollment)
                throw new common_1.NotFoundException();
            if (yield VegEnrollmentController_1.hasPolicy(req.user, enrollment)) {
                Object.assign(enrollment, input);
                return yield enrollment.save();
            }
            throw new common_1.ForbiddenException();
        });
    }
    delete(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            id = parseInt(id, 10);
            let enrollment = yield VegEnrollment_1.VegEnrollment.findOne(id);
            if (!enrollment)
                throw new common_1.NotFoundException();
            if (yield VegEnrollmentController_1.hasPolicy(req.user, enrollment)) {
                yield enrollment.remove();
                return 'deleted';
            }
            throw new common_1.ForbiddenException();
        });
    }
    static hasPolicy(user, enrollment) {
        return __awaiter(this, void 0, void 0, function* () {
            return (user.adminLevel === User_1.UserAdminType.Super) ||
                (user.adminLevel === User_1.UserAdminType.Town && enrollment.town === user.town) ||
                (user.adminLevel === User_1.UserAdminType.Street && enrollment.town === user.town && enrollment.street === user.street) ||
                user.id === (yield enrollment.creator).id;
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ title: "获取所有产方登记情况(全部信息，包括敏感信息)", description: "adminLevel为super可以获得所有信息,town可以获得所在town的订单，以此类推" }),
    swagger_1.ApiOkResponse({ description: "登记信息" }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VegEnrollmentController.prototype, "getAll", null);
__decorate([
    swagger_1.ApiOperation({ title: "获取产方登记情况(全部信息，包括敏感信息)", description: "权限控制同上" }),
    swagger_1.ApiResponse({ status: 404, description: "不存在的id" }),
    swagger_1.ApiForbiddenResponse({ description: "无权查看" }),
    swagger_1.ApiImplicitParam({ name: "Id", type: Number }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get('/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VegEnrollmentController.prototype, "getById", null);
__decorate([
    swagger_1.ApiOperation({ title: "新增登记" }),
    swagger_1.ApiCreatedResponse({ description: "登记信息" }),
    swagger_1.ApiImplicitBody({ name: "VegEnrollemnt", type: VegEnrollment_1.VegEnrollment }),
    common_1.UsePipes(new common_1.ValidationPipe({
        forbidUnknownValues: true,
        transform: true,
    })),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post(),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VegEnrollmentController.prototype, "create", null);
__decorate([
    swagger_1.ApiOperation({ title: "修改登记", description: "权限控制同上" }),
    swagger_1.ApiOkResponse({ description: "修改后的登记信息" }),
    swagger_1.ApiForbiddenResponse({ description: "无权修改" }),
    swagger_1.ApiImplicitBody({ name: "VegEnrollment", type: VegEnrollment_1.VegEnrollment }),
    swagger_1.ApiImplicitParam({ name: "Id", type: Number }),
    common_1.UsePipes(new common_1.ValidationPipe({
        forbidUnknownValues: true,
        transform: true,
        skipMissingProperties: true
    })),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Put('/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], VegEnrollmentController.prototype, "put", null);
__decorate([
    swagger_1.ApiOperation({ title: "删除登记", description: "权限控制同上" }),
    swagger_1.ApiOkResponse({ description: "deleted" }),
    swagger_1.ApiForbiddenResponse({ description: "无权删除" }),
    swagger_1.ApiImplicitParam({ name: "Id", type: Number }),
    common_1.Delete('/:id'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VegEnrollmentController.prototype, "delete", null);
VegEnrollmentController = VegEnrollmentController_1 = __decorate([
    swagger_1.ApiUseTags("蔬果产方登记订单管理"),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('vegEnrollment'),
    __metadata("design:paramtypes", [])
], VegEnrollmentController);
exports.VegEnrollmentController = VegEnrollmentController;
//# sourceMappingURL=veg-enrollment-order.controller.js.map