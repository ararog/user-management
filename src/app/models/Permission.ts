import { Entity } from "typeorm"

@Entity()
export class Permission {
    id: number

    name: string
}