import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Fileupload {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    pdf: string;

    @Column()
    image: string;

    @Column()
    subject: string;

    @Column()
    sem: string;

    @Column()
    unit: string;

    @Column()
    catagory: string;

}
