import { Type as TypePrisma } from '@prisma/client';
import { DomainError } from '../types/error';

export class Type {
    readonly id?: number;
    readonly name: string;

    constructor(type: { name: string; id?: number }) {
        this.validate(type);
        this.id = type.id;
        this.name = type.name;
    }

    validate(type: { name: string }): void {
        if (type.name.trim() == '') {
            throw new DomainError('Name cannot be empty');
        }
    }

    equals(type: Type): boolean {
        return this.id === type.id && this.name === type.name;
    }

    static from(data: TypePrisma) {
        return new Type({ name: data.name, id: data.id });
    }
}
