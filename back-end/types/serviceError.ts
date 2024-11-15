export class ServiceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ServiceError";
        Object.setPrototypeOf(this, ServiceError.prototype);
    }
}