import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity ,OneToMany, ManyToOne} from "typeorm";
import { Options } from "@nestjs/common";
import { MainBody } from "./MainBody";
import { User } from "./User";
export enum EnrollmentType {
    FruitAndVeg = "FruitAndVeg",
    Bird = "Bird",
    Animal = "Animal",
    Product = "Product",
}
@Entity()
export class Enrollment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    district: string;

    @Column({ nullable: false })
    mainBody: string;

    @Column({ nullable: false })
    principal: string;

    @Column("simple-json",{ nullable: false })
    contacts: Array<{name:string,phone:string}>

    @Column({nullable:false})
    type: EnrollmentType;

    @Column({ nullable: false })
    category: string;

    /**
     * 规模
     */
    @Column({ nullable: true })
    scale: string;

    /**
     * 产量
     */
    @Column({ nullable: true })
    production: string;
    
    /**
     * 种植时间
     */
    @Column({nullable: true})
    plantDate: string;

    @Column({ nullable: true })
    marketDateBegin: string;

    @Column({ nullable: true })
    marketDateEnd: string;

    @Column({ nullable: true })
    salesRatio: number;

    @Column({ nullable: true })
    salesRoute: string;

    @Column({ nullable: true })
    rawDemand: string;

    @Column({ nullable: true })
    rawDemandDate: string;

    @Column({ nullable: true })
    purchaseRatio: number;

    @Column("simple-json",{ nullable: true })
    more: string;

    @ManyToOne(type => User, user => user.enrollments,{nullable : false})
    creator: Promise<User>

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(init?: Partial<Enrollment>) {
        super();
        Object.assign(this, init);
    }

}