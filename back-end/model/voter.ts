import {Region} from "./region";

export class Voter {
    readonly  id?: number;
    readonly  name: string;
    readonly  email: string;
    readonly  phone: string;
    readonly  key: string;
    readonly  home: Region;

    constructor(voter: { name: string; email: string; phone: string; key: string; home: Region; id?: number }) {
        this.id = voter.id;
        this.name = voter.name;
        this.email = voter.email;
        this.phone = voter.phone;
        this.key = voter.key;
        this.home = voter.home;
    }

    equals(voter: Voter): boolean {
        return (
            this.id === voter.id &&
            this.name === voter.name &&
            this.email === voter.email &&
            this.phone === voter.phone &&
            this.key === voter.key &&
            this.home === voter.home
        );
    }
}
