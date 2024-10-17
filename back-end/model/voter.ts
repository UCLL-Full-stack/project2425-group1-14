import {Region} from "./region";

export class Voter {
    private id?: number;
    private name: string;
    private email: string;
    private phone: string;
    private key: string;
    private home: Region;

    constructor(voter: { name: string; email: string; phone: string; key: string; home: Region; id?: number }) {
        this.id = voter.id;
        this.name = voter.name;
        this.email = voter.email;
        this.phone = voter.phone;
        this.key = voter.key;
        this.home = voter.home;
    }

    getId(): number | undefined { return this.id; }
    getName(): string { return this.name; }
    getEmail(): string { return this.email; }
    getPhone(): string { return this.phone; }
    getKey(): string { return this.key; }
    getHome(): Region { return this.home; }

    equals(voter: Voter): boolean {
        return (
            this.id === voter.getId() &&
            this.name === voter.getName() &&
            this.email === voter.getEmail() &&
            this.phone === voter.getPhone() &&
            this.key === voter.getKey() &&
            this.home === voter.getHome()
        );
    }
}
