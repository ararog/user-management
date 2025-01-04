import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"
import { Permission } from "@/models/Permission"
import { User } from "@/models/User"

@Entity()
export class UserPermission {
    @PrimaryGeneratedColumn()
    id: number

    user: User

    permission: Permission
}