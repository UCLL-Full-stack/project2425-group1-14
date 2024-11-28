import { Role } from "../types";
import { UnauthorizedError } from "../types/error";

const permsAdmin = (data: {role: Role}): void => {
    if (data.role != "admin") {
        throw new UnauthorizedError("You are not authorized to access this resource.");
    }
}

const permsManager = (data: {role: Role}): void => {
    if (!(data.role === "manager" || data.role === "admin")) {
        throw new UnauthorizedError("You are not authorized to access this resource.");
    }
}

const permsVoter = (data: {role: Role}): void => {
    if (data.role != "voter") {
        throw new UnauthorizedError("You are not authorized to access this resource.");
    }
}

export {
    permsAdmin,
    permsManager,
    permsVoter,
}

