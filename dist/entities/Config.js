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
const class_validator_1 = require("class-validator");
let Config = class Config extends typeorm_1.BaseEntity {
    constructor(init) {
        super();
        Object.assign(this, init);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Config.prototype, "id", void 0);
__decorate([
    class_validator_1.IsAlphanumeric(),
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Config.prototype, "key", void 0);
__decorate([
    typeorm_1.Column('simple-json', { nullable: false }),
    __metadata("design:type", Object)
], Config.prototype, "value", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Config.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Config.prototype, "updatedAt", void 0);
Config = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Config);
exports.Config = Config;
//# sourceMappingURL=Config.js.map