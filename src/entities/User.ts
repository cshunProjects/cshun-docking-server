import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity ,OneToMany} from "typeorm";
import { Options } from "@nestjs/common";
import { VegEnrollment } from "./VegEnrollment";
import {IsAlphanumeric,Length,IsString,MaxLength, IsNumberString} from "class-validator";
import { ApiModelProperty,ApiModelPropertyOptional } from '@nestjs/swagger';
export enum UserAdminType {
    Super = "Super",
    Town = "Town",
    Street = "Street",
    Normal = "Normal",
}
@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty({description:"用户名"})
    @IsAlphanumeric()
    @Column({ nullable: false })
    username: string;

    @ApiModelProperty({description:"密码"})
    @Length(6,30)
    @IsString()
    @Column({ nullable: false ,select: false})
    password: string;

    @ApiModelProperty({description:"所在乡镇"})
    @MaxLength(30)
    @IsString()
    @Column({ nullable: true})
    town: string;

    @ApiModelProperty({description:"所在街道(村)"})
    @MaxLength(30)
    @IsString()
    @Column({ nullable: true})
    street: string;

    @ApiModelProperty({description:"姓名"})
    @MaxLength(5)
    @IsString()
    @Column({ nullable: true})
    name: string;

    @ApiModelProperty({description:"联系方式"})
    @IsNumberString()
    @Length(8,11)
    @Column({ nullable: true})
    phone: string;

    @ApiModelProperty({description:"管理员等级",enum:UserAdminType,default:UserAdminType.Normal})
    @Column()
    adminLevel:UserAdminType = UserAdminType.Normal;

    @OneToMany(type => VegEnrollment, enrollment => enrollment.creator)
    vegEnrollments: Promise<VegEnrollment[]>
    

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(init?: Partial<User>) {
        super();
        Object.assign(this, init);
    }

}