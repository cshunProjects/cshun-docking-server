import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity ,OneToMany, ManyToOne} from "typeorm";
import { Options } from "@nestjs/common";
import { User } from "./User";
import {IsAlphanumeric,Length,IsString,MaxLength, IsNumberString} from "class-validator";
import { ApiModelProperty,ApiModelPropertyOptional } from '@nestjs/swagger';

@Entity()
export class AnimalEnrollment extends BaseEntity {

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

    @ApiModelProperty({description:"品种(鸡、鸭、鱼...)"})
    @Column({ nullable: false })
    category: string;

    @ApiModelProperty({description:"二级品种(大公鸡、小公鸡...)"})
    @Column({ nullable: false })
    categorySecondary: string;

    @ApiModelProperty({description:"投苗时间"})
    @Column({ nullable: false })
    seedlingDate: Date;   


    @ApiModelProperty({description:"出栏时间"})
    @Column({ nullable: false })
    outOfBarDate: Date;   

    @ApiModelProperty({description:"出栏数量"})
    @Column("float",{ nullable: false })
    outOfBarCount: number;  

    @ApiModelProperty({description:"是否有冷链仓储"})
    @Column({ nullable: false })
    hasCoolStore: boolean; 

    // @ApiModelProperty({description:"是否有订单"})
    // @Column({ nullable: false })
    // hasOrder: boolean;  

    @ApiModelProperty({description:"最低销售价格(每个)"})
    @Column("float",{ nullable: false })
    minPrice: number;  

    @ApiModelPropertyOptional({description:"地理位置"})
    @Column("simple-json",{ nullable: true })
    location: object;

    @Column("simple-array",{ nullable: true })
    orderIds: number[];


    @ApiModelProperty({description:"规模数量(个)"})
    @Column("float",{ nullable: false })
    area: number;  

    @ApiModelProperty({description:"产量(个)"})
    @Column("float",{ nullable: false })
    yield: number;  



    @ManyToOne(type => User, user => user.animalEnrollments,{nullable : false})
    creator: Promise<User>

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(init?: Partial<AnimalEnrollment>) {
        super();
        Object.assign(this, init);
    }

}