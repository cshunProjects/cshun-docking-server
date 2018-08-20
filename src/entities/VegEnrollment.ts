import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity ,OneToMany, ManyToOne} from "typeorm";
import { Options } from "@nestjs/common";
import { User } from "./User";
import {IsAlphanumeric,Length,IsString,MaxLength, IsNumberString} from "class-validator";
import { ApiModelProperty,ApiModelPropertyOptional } from '@nestjs/swagger';

@Entity()
export class VegEnrollment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty({description:"乡镇"})
    @Column({ nullable: false })
    town: string;

    @ApiModelProperty({description:"街道(村)"})
    @Column({ nullable: false })
    street: string;

    @ApiModelProperty({description:"主体"})
    @Column({ nullable: false })
    mainBody: string;

    @ApiModelProperty({description:"主体负责人"})
    @Column({ nullable: false })
    principal: string;

    @ApiModelProperty({description:"主题负责人联系方式"})
    @Column({ nullable: false })
    contacts: string;

    @ApiModelProperty({description:"品种(葡萄，香蕉...)"})
    @Column({ nullable: false })
    category: string;

    @ApiModelProperty({description:"二级品种(水晶葡萄，玉米3号...)"})
    @Column({ nullable: false })
    categorySecondary: string;

    @ApiModelProperty({description:"种植时间"})
    @Column({ nullable: false })
    plantDate: Date;   


    @ApiModelProperty({description:"预计上市时间"})
    @Column({ nullable: false })
    marketBeginDate: Date;   

    @ApiModelProperty({description:"预计上市结束时间"})
    @Column({ nullable: false })
    marketEndDate: Date;  

    @ApiModelProperty({description:"是否有冷链仓储"})
    @Column({ nullable: false })
    hasCoolStore: boolean; 

    @ApiModelProperty({description:"是否有订单"})
    @Column({ nullable: false })
    hasOrder: boolean;  

    @ApiModelProperty({description:"最低销售价格(每斤)"})
    @Column("double",{ nullable: false })
    minPrice: number;  

    @ApiModelPropertyOptional({description:"地理位置"})
    @Column("simple-json",{ nullable: true })
    location: object;

    @Column("simple-array",{ nullable: true })
    orderIds: number[];


    @ApiModelProperty({description:"面积(亩)"})
    @Column("double",{ nullable: false })
    area: number;  

    @ApiModelProperty({description:"产量(斤))"})
    @Column("double",{ nullable: false })
    yield: number;  

    


    @ManyToOne(type => User, user => user.vegEnrollments,{nullable : false})
    creator: Promise<User>

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(init?: Partial<VegEnrollment>) {
        super();
        Object.assign(this, init);
    }

}