export class Type {
    private id?: number;
    private name: string;

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
}
