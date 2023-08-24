import {BaseEntity , Entity , Column, PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn, ManyToMany, ManyToOne, JoinTable, JoinColumn, Index  } from "typeorm";
import { User } from './User.js'
import { Agent } from "http";
import { Tag } from './Tag.js'
import { title } from "process";

@Index("Id and title" , ['id' , 'title'])
@Entity()
export class ToDo extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ManyToOne(() => User, user => user.todos, {
            eager : true
        }
    )
    @JoinColumn()
    user: number


    @Column({
        length:50,
        nullable:false // Requried
    })
    title: string;

    @Column({
        default:"noDescription"
    })
    description: string;
    //Create index 
    // You can add Unique: True the column should be Unique
    @Index("Status")
    @Column({
        type: 'enum',
        enum: ['new' , 'done'],
        default: 'new'
    })
    status: 'new' | 'done';
    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createDate: Date;

    @ManyToMany(() => Tag , {eager: true})
    @JoinTable()
    Tags: Tag[]
}

