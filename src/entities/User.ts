import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity ,OneToMany} from "typeorm";
import { Options } from "@nestjs/common";
import { MainBody } from "./MainBody";
import { Enrollment } from "./Enrollment";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    username: string;


    @Column({ nullable: false ,select: false})
    password: string;

    @Column("simple-array", { nullable: false })
    districtsRW: Array<string> = [];

    @Column({ nullable: false })
    isAdmin: boolean = false;

    @OneToMany(type => MainBody, mainBody => mainBody.creator)
    mainBodies: Promise<MainBody[]>

    @OneToMany(type => Enrollment, enrollment => enrollment.creator)
    enrollments: Promise<Enrollment[]>
    

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(init?: Partial<User>) {
        super();
        Object.assign(this, init);
    }

}