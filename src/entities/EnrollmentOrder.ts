import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity ,OneToMany, ManyToOne} from "typeorm";
import { Options } from "@nestjs/common";
import {IsAlphanumeric,Length,IsString,MaxLength, IsNumberString} from "class-validator";
import { ApiModelProperty,ApiModelPropertyOptional } from '@nestjs/swagger';

export enum EnrollmentType {
    VegAndFruit = "VegAndFruit",
    Animal = "Animal"
}

export enum SaleMode {
    Fixed = "Fixed", // 固定价格
    Market = "Market", // 市场价格
    SafeMarket = "SafeMarket" // 保底价格+市场价格
}

@Entity()
export class EnrollmentOrder extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: EnrollmentType;

    @Column('int')
    enrollmentId:number;

    @ApiModelProperty({description:"销售地址(规范到地级市)"})
    @Column()
    address:string;

    @ApiModelPropertyOptional({description:"每斤价格"})
    @Column('double')
    price: number;

    @ApiModelProperty({description:"销售模式"})
    @Column({enum:SaleMode})
    saleMode: SaleMode;


}