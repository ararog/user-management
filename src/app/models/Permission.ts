import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}