import { Type as TypePrisma } from '@prisma/client';

export class Type {
    readonly  id?: number;
    readonly  name: string;

    constructor(type: { name: string; id?: number }) {
        this.id = type.id;
        this.name = type.name;
    }

    getId(): number | undefined { return this.id; }
    getName(): string { return this.name; }

    equals(type: Type): boolean {
        return (
            this.id === type.getId() &&
            this.name === type.getName()
        );
    }

    static from({ id, name }: TypePrisma) {
        return new Type({name: name, id: id});
    }
}
