import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity ,OneToMany, ManyToOne} from "typeorm";
import { Options } from "@nestjs/common";
import { MainBody } from "./MainBody";
import { User } from "./User";

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

    @Column({ nullable: false })
    category: string;

    /**
     * 规模
     */
    @Column()
    scale: string;

    /**
     * 产量
     */
    @Column()
    production: string;
    
    @Column()
    marketDateBegin: Date;

    @Column()
    marketDateEnd: Date;

    @Column()
    salesRatio: number;

    @Column()
    salesRoute: string;

    @Column()
    rawDemand: string;

    @Column()
    rawDemandDate: string;

    @Column()
    purchaseRatio: number;

    @Column("simple-json")
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