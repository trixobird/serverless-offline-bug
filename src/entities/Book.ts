import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class Book {

    @PrimaryKey()
    id!: number; // string is also supported

    @Property({type: 'string'})
    title!: string;

    constructor(title: string) {
        this.title = title;
    }
}