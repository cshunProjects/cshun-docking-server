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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const VegEnrollment_1 = require("./VegEnrollment");
const AnimalEnrollment_1 = require("./AnimalEnrollment");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var UserAdminType;
(function (UserAdminType) {
    UserAdminType["Super"] = "Super";
    UserAdminType["Town"] = "Town";
    UserAdminType["Street"] = "Street";
    UserAdminType["Normal"] = "Normal";
})(UserAdminType = exports.UserAdminType || (exports.UserAdminType = {}));
let User = class User extends typeorm_1.BaseEntity {
    constructor(init) {
        super();
        this.adminLevel = UserAdminType.Normal;
        Object.assign(this, init);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "用户名" }),
    class_validator_1.IsAlphanumeric(),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "密码" }),
    class_validator_1.Length(6, 30),
    class_validator_1.IsString(),
    typeorm_1.Column({ nullable: false, select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "所在乡镇" }),
    class_validator_1.MaxLength(30),
    class_validator_1.IsString(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "town", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "所在街道(村)" }),
    class_validator_1.MaxLength(30),
    class_validator_1.IsString(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "street", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "姓名" }),
    class_validator_1.MaxLength(5),
    class_validator_1.IsString(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "联系方式" }),
    class_validator_1.IsNumberString(),
    class_validator_1.Length(8, 11),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "管理员等级", enum: UserAdminType, default: UserAdminType.Normal }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "adminLevel", void 0);
__decorate([
    typeorm_1.OneToMany(type => VegEnrollment_1.VegEnrollment, enrollment => enrollment.creator),
    __metadata("design:type", Promise)
], User.prototype, "vegEnrollments", void 0);
__decorate([
    typeorm_1.OneToMany(type => AnimalEnrollment_1.AnimalEnrollment, enrollment => enrollment.creator),
    __metadata("design:type", Promise)
], User.prototype, "animalEnrollments", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map