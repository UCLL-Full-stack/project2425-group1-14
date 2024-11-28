class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DomainError';
        Object.setPrototypeOf(this, DomainError.prototype);
    }
}

class RepositoryError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'RepositoryError';
        Object.setPrototypeOf(this, RepositoryError.prototype);
    }
}

class ServiceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ServiceError';
        Object.setPrototypeOf(this, ServiceError.prototype);
    }
}

class ControllerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ControllerError';
        Object.setPrototypeOf(this, ControllerError.prototype);
    }
}

class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedError';
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export {
    DomainError,
    RepositoryError,
    ServiceError,
    ControllerError,
    UnauthorizedError,
}