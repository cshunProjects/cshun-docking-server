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
let VegEnrollment = class VegEnrollment extends typeorm_1.BaseEntity {
    constructor(init) {
        super();
        Object.assign(this, init);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], VegEnrollment.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "乡镇" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], VegEnrollment.prototype, "town", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "街道(村)" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], VegEnrollment.prototype, "street", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "主体" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], VegEnrollment.prototype, "mainBody", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "主体负责人" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], VegEnrollment.prototype, "principal", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "主题负责人联系方式" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], VegEnrollment.prototype, "contacts", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "品种(葡萄，香蕉...)" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], VegEnrollment.prototype, "category", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "二级品种(水晶葡萄，玉米3号...)" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], VegEnrollment.prototype, "categorySecondary", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "种植时间" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Date)
], VegEnrollment.prototype, "plantDate", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "预计上市时间" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Date)
], VegEnrollment.prototype, "marketBeginDate", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "预计上市结束时间" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Date)
], VegEnrollment.prototype, "marketEndDate", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "是否有冷链仓储" }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], VegEnrollment.prototype, "hasCoolStore", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "最低销售价格(每斤)" }),
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], VegEnrollment.prototype, "minPrice", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ description: "地理位置" }),
    typeorm_1.Column("simple-json", { nullable: true }),
    __metadata("design:type", Object)
], VegEnrollment.prototype, "location", void 0);
__decorate([
    typeorm_1.Column("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], VegEnrollment.prototype, "orderIds", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "面积(亩)" }),
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], VegEnrollment.prototype, "area", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "产量(斤))" }),
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], VegEnrollment.prototype, "yield", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.vegEnrollments, { nullable: false }),
    __metadata("design:type", Promise)
], VegEnrollment.prototype, "creator", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], VegEnrollment.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], VegEnrollment.prototype, "updatedAt", void 0);
VegEnrollment = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], VegEnrollment);
exports.VegEnrollment = VegEnrollment;
//# sourceMappingURL=VegEnrollment.js.map