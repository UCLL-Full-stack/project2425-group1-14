export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DomainError';
        Object.setPrototypeOf(this, DomainError.prototype);
    }
}

export class RepositoryError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'RepositoryError';
        Object.setPrototypeOf(this, RepositoryError.prototype);
    }
}

export class ServiceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ServiceError';
        Object.setPrototypeOf(this, ServiceError.prototype);
    }
}

export class ControllerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ControllerError';
        Object.setPrototypeOf(this, ControllerError.prototype);
    }
}

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedError';
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
