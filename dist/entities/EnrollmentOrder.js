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
const swagger_1 = require("@nestjs/swagger");
var EnrollmentType;
(function (EnrollmentType) {
    EnrollmentType["VegAndFruit"] = "VegAndFruit";
    EnrollmentType["Animal"] = "Animal";
})(EnrollmentType = exports.EnrollmentType || (exports.EnrollmentType = {}));
var SaleMode;
(function (SaleMode) {
    SaleMode["Fixed"] = "Fixed";
    SaleMode["Market"] = "Market";
    SaleMode["SafeMarket"] = "SafeMarket";
})(SaleMode = exports.SaleMode || (exports.SaleMode = {}));
let EnrollmentOrder = class EnrollmentOrder extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], EnrollmentOrder.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], EnrollmentOrder.prototype, "type", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], EnrollmentOrder.prototype, "enrollmentId", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "销售地址(规范到地级市)" }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], EnrollmentOrder.prototype, "address", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ description: "每斤价格" }),
    typeorm_1.Column('double'),
    __metadata("design:type", Number)
], EnrollmentOrder.prototype, "price", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "销售模式" }),
    typeorm_1.Column({ enum: SaleMode }),
    __metadata("design:type", String)
], EnrollmentOrder.prototype, "saleMode", void 0);
EnrollmentOrder = __decorate([
    typeorm_1.Entity()
], EnrollmentOrder);
exports.EnrollmentOrder = EnrollmentOrder;
//# sourceMappingURL=EnrollmentOrder.js.map