import { BaseEntity, Entity, PrimaryGeneratedColumn , Column } from "typeorm";


@Entity()
export class Profile extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: Number;

    @Column({type: 'text'})
    bio: String
    
    @Column()
    imageURL: String;
}