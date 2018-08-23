import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity ,OneToMany} from "typeorm";
import {IsAlphanumeric,Length,IsString,MaxLength, IsNumberString} from "class-validator";

@Entity()
export class Config extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsAlphanumeric()
    @Column({ nullable: false ,unique:true})
    key: string;

    @Column('simple-json',{ nullable: false })
    value: Object;
    

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(init?: Partial<Config>) {
        super();
        Object.assign(this, init);
    }

}