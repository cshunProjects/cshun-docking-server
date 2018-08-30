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
const User_1 = require("./User");
const swagger_1 = require("@nestjs/swagger");
let AnimalEnrollment = class AnimalEnrollment extends typeorm_1.BaseEntity {
    constructor(init) {
        super();
        Object.assign(this, init);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AnimalEnrollment.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "乡镇" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], AnimalEnrollment.prototype, "town", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "街道(村)" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], AnimalEnrollment.prototype, "street", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "主体" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], AnimalEnrollment.prototype, "mainBody", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "主体负责人" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], AnimalEnrollment.prototype, "principal", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "主题负责人联系方式" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], AnimalEnrollment.prototype, "contacts", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "品种(鸡、鸭、鱼...)" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], AnimalEnrollment.prototype, "category", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "二级品种(大公鸡、小公鸡...)" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], AnimalEnrollment.prototype, "categorySecondary", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "投苗时间" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Date)
], AnimalEnrollment.prototype, "seedlingDate", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "出栏时间" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Date)
], AnimalEnrollment.prototype, "outOfBarDate", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "出栏数量" }),
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], AnimalEnrollment.prototype, "outOfBarCount", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "是否有冷链仓储" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], AnimalEnrollment.prototype, "hasCoolStore", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "最低销售价格(每个)" }),
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], AnimalEnrollment.prototype, "minPrice", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ description: "地理位置" }),
    typeorm_1.Column("simple-json", { nullable: true }),
    __metadata("design:type", Object)
], AnimalEnrollment.prototype, "location", void 0);
__decorate([
    typeorm_1.Column("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], AnimalEnrollment.prototype, "orderIds", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "规模数量(个)" }),
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], AnimalEnrollment.prototype, "area", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "产量(个)" }),
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], AnimalEnrollment.prototype, "yield", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.animalEnrollments, { nullable: false }),
    __metadata("design:type", Promise)
], AnimalEnrollment.prototype, "creator", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], AnimalEnrollment.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], AnimalEnrollment.prototype, "updatedAt", void 0);
AnimalEnrollment = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], AnimalEnrollment);
exports.AnimalEnrollment = AnimalEnrollment;
//# sourceMappingURL=AnimalEnrollment.js.map