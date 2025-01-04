import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"
import { Permission } from "@/models/Permission"

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    password: string

    confirmPassword: string

    @Column()
    salt: string

    @Column()
    hash: string

    @ManyToMany(() => Permission)
    @JoinTable()
    permissions: Permission[]
}

