import {Entity, PrimaryGeneratedColumn,UpdateDateColumn,CreateDateColumn, Column, BaseEntity,ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class MainBody extends BaseEntity {

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

    @ManyToOne(type => User, user => user.mainBodies,{nullable : false})
    creator:User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(init?:Partial<MainBody>) {
        super();
        Object.assign(this, init);
    }

}