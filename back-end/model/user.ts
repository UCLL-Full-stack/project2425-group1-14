import { User as UserPrisma, Region as RegionPrisma, Type as TypePrisma } from '@prisma/client';
import { Role } from '../types';
import { DomainError } from '../types/error';
import { Region } from './region';

export class User {
    readonly id?: number;
    readonly username: string;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role;
    readonly location: Region;

    constructor(user: {
        username: string;
        name: string;
        email: string;
        password: string;
        role: Role;
        location: Region;
        id?: number;
    }) {
        this.validate(user);
        this.id = user.id;
        this.username = user.username;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.location = user.location
    }

    validate(user: { username: string, name: string, email: string, password: string, role: Role }): void {
        if (user.username.trim() == '') {
            throw new DomainError('Username cannot be empty');
        }
        if (user.name.trim() == '') {
            throw new DomainError('Name cannot be empty');
        }
        if (user.email.trim() == '') {
            throw new DomainError("Email cannot be empty")
        }
        if (user.password.trim() == '') {
            throw new DomainError("Password cannot be empty")
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
        // RFC 5322
        // Sourced from https://emailregex.com/
        const emailRegex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])");
        if (!emailRegex.test(user.email)) {
            throw new DomainError("Email is of invalid format")
        }
    }

    equals(user: User): boolean {
        return (
            this.username === user.username &&
            this.name === user.name &&
            this.email === user.email &&
            this.password === user.password &&
            this.role === user.role &&
            this.location === user.location
        );
    }

    static from(data: UserPrisma & { location: RegionPrisma & { type: TypePrisma } }): User {
        return new User({
            id: data.id,
            username: data.username,
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role as Role,
            location: Region.from(data.location),
        });
    }
}
