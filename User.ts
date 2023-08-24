import exp from "constants";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ToDo } from "./Todo.js";
import { Profile } from "./Profile.js";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id : number

    @Column({length: 50, nullable: false})
    userName: string

    @Column({default: 10000})
    tokens: number
    @OneToMany(() => ToDo, todo => todo.user )
    @JoinColumn()
    todos: ToDo[]

    @OneToOne(() => Profile, {eager: true})
    @JoinColumn()
    Profile: Profile
}

