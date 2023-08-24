import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: Number

    @Column({length: 255})
    tag: String

}