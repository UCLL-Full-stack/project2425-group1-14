import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../types/error";


const permsAdmin = (data?: JwtPayload): void => {
    if (data == undefined) {
        throw new UnauthorizedError("Authorization was not provided");
    }
    if (data.role != "admin" || !data.username) {
        throw new UnauthorizedError("You are not authorized to access this resource.");
    }
}

const permsManager = (data?: JwtPayload): void => {
    if (data == undefined) {
        throw new UnauthorizedError("Authorization was not provided");
    }
    if (!(data.role === "manager" || data.role === "admin") || !data.username) {
        throw new UnauthorizedError("You are not authorized to access this resource.");
    }
}

const permsVoter = (data?: JwtPayload): void => {
    if (data == undefined) {
        throw new UnauthorizedError("Authorization was not provided");
    }
    if (data.role != "voter" || !data.username) {
        throw new UnauthorizedError("You are not authorized to access this resource.");
    }
}

const permsAll = (data?: JwtPayload): void => {
    if (data == undefined) {
        throw new UnauthorizedError("Authorization was not provided");
    }
    if (!data.username) {
        throw new UnauthorizedError("You are not authorized to access this resource.");
    }
}

export {
    permsAdmin,
    permsManager,
    permsVoter,
    permsAll,
}

